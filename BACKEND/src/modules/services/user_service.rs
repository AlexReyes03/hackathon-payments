use anyhow::{Context, Result};
use std::sync::Arc;
use bcrypt::{hash, verify};
use jsonwebtoken::{encode, decode, Header, Algorithm, EncodingKey, DecodingKey, Validation};
use chrono::Utc;
use uuid::Uuid;

// Use cost 10 for better compatibility across different systems
const BCRYPT_COST: u32 = 10;

use crate::modules::models::user::{User, RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, UserResponse, Claims};
use crate::modules::models::role::UserRole;
use crate::modules::repositories::user_repo::UserRepository;
use crate::modules::services::wallet_service::WalletService;

#[derive(Clone)]
pub struct UserService {
    user_repo: Arc<UserRepository>,
    wallet_service: Arc<WalletService>,
    jwt_secret: String,
}

impl UserService {
    pub fn new(
        user_repo: Arc<UserRepository>,
        wallet_service: Arc<WalletService>,
        jwt_secret: String,
    ) -> Self {
        Self {
            user_repo,
            wallet_service,
            jwt_secret,
        }
    }

    pub async fn register(&self, request: RegisterRequest) -> Result<RegisterResponse> {
        // Validate email format
        if !request.email.contains('@') {
            return Err(anyhow::anyhow!("Invalid email format"));
        }

        // Check if username already exists
        if self.user_repo.check_username_exists(&request.username).await? {
            return Err(anyhow::anyhow!("Username already exists"));
        }

        // Check if email already exists
        if self.user_repo.check_email_exists(&request.email).await? {
            return Err(anyhow::anyhow!("Email already exists"));
        }

        // Validate password length
        if request.password.len() < 6 {
            return Err(anyhow::anyhow!("Password must be at least 6 characters"));
        }

        // Validate PIN format (exactly 6 digits)
        if request.pin.len() != 6 || !request.pin.chars().all(|c| c.is_numeric()) {
            return Err(anyhow::anyhow!("PIN must be exactly 6 digits"));
        }

        // Validate birth date format (YYYY-MM-DD)
        let _ = chrono::NaiveDate::parse_from_str(&request.birth_date, "%Y-%m-%d")
            .context("Invalid birth date format. Use YYYY-MM-DD")?;

        // Hash password
        let password_hash = hash(&request.password, BCRYPT_COST)
            .context("Failed to hash password")?;

        // Hash PIN
        let pin_hash = hash(&request.pin, BCRYPT_COST)
            .context("Failed to hash PIN")?;

        // Create user
        let user_id = Uuid::new_v4().to_string();
        let now = Utc::now().naive_utc();

        // Generate wallet first
        let aa_mode = request.aa_mode.unwrap_or(false);
        let wallet_response = self.wallet_service.generate_wallet(aa_mode, false).await
            .context("Failed to create wallet for user")?;

        // Automatically assign ADMIN role to all new users
        let role = UserRole::Admin;
        let role_id = role.to_id();

        let user = User {
            id: user_id.clone(),
            username: request.username.clone(),
            email: request.email.clone(),
            password_hash,
            pin_hash,
            first_name: request.first_name.clone(),
            last_name_paternal: request.last_name_paternal.clone(),
            last_name_maternal: request.last_name_maternal.clone(),
            birth_date: request.birth_date.clone(),
            wallet_id: Some(wallet_response.id.clone()),
            role_id,
            created_at: now,
            updated_at: now,
        };

        // Save user to database
        self.user_repo.create(&user).await
            .context("Failed to save user to database")?;

        tracing::info!("Registered new user: {}", request.username);

        Ok(RegisterResponse {
            id: user_id,
            username: request.username,
            email: request.email,
            first_name: request.first_name,
            last_name_paternal: request.last_name_paternal,
            last_name_maternal: request.last_name_maternal,
            birth_date: request.birth_date,
            wallet_id: wallet_response.id,
            wallet_public_key: wallet_response.public_key,
            created_at: now.format("%Y-%m-%d %H:%M:%S").to_string(),
        })
    }

    pub async fn login(&self, request: LoginRequest) -> Result<LoginResponse> {
        // Find user by username
        let user = self.user_repo.find_by_username(&request.username).await?
            .ok_or_else(|| anyhow::anyhow!("Invalid credentials"))?;

        // Verify either password or PIN
        let is_valid = if let Some(password) = &request.password {
            // Login with password
            verify(password, &user.password_hash).unwrap_or(false)
        } else if let Some(pin) = &request.pin {
            // Login with PIN
            verify(pin, &user.pin_hash).unwrap_or(false)
        } else {
            // Neither password nor PIN provided
            return Err(anyhow::anyhow!("Password or PIN required"));
        };

        if !is_valid {
            return Err(anyhow::anyhow!("Invalid credentials"));
        }

        // Generate JWT token
        let token = self.generate_token(&user.id, &user.username, &user.role_id)?;

        tracing::info!("User logged in: {}", user.username);

        Ok(LoginResponse {
            token,
            user: UserResponse::from(user),
        })
    }

    pub async fn get_user_by_id(&self, user_id: &str) -> Result<User> {
        self.user_repo.find_by_id(user_id).await?
            .ok_or_else(|| anyhow::anyhow!("User not found"))
    }

    pub async fn get_user_by_username(&self, username: &str) -> Result<User> {
        self.user_repo.find_by_username(username).await?
            .ok_or_else(|| anyhow::anyhow!("User not found"))
    }

    fn generate_token(&self, user_id: &str, username: &str, role_id: &str) -> Result<String> {
        let expiration = Utc::now()
            .checked_add_signed(chrono::Duration::days(30))
            .expect("valid timestamp")
            .timestamp() as usize;

        let claims = Claims {
            user_id: user_id.to_string(),
            username: username.to_string(),
            role_id: role_id.to_string(),
            exp: expiration,
        };

        encode(
            &Header::new(Algorithm::HS256),
            &claims,
            &EncodingKey::from_secret(self.jwt_secret.as_ref()),
        )
        .context("Failed to generate token")
    }

    pub fn verify_token(&self, token: &str) -> Result<Claims> {
        let validation = Validation::new(Algorithm::HS256);
        let token_data = decode::<Claims>(
            token,
            &DecodingKey::from_secret(self.jwt_secret.as_ref()),
            &validation,
        )
        .context("Invalid token")?;

        Ok(token_data.claims)
    }
}