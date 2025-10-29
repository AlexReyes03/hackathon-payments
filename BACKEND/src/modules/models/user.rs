use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: String,
    pub username: String,
    pub email: String,
    #[serde(skip_serializing)]
    pub password_hash: String,
    #[serde(skip_serializing)]
    pub pin_hash: String,
    pub first_name: String,
    pub last_name_paternal: String,
    pub last_name_maternal: String,
    pub birth_date: String, // Stored as TEXT in SQLite (YYYY-MM-DD format)
    pub wallet_id: Option<String>,
    pub role_id: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RegisterRequest {
    pub username: String,
    pub email: String,
    pub password: String,
    pub pin: String, // 6 digit PIN
    pub first_name: String,
    pub last_name_paternal: String,
    pub last_name_maternal: String,
    pub birth_date: String, // YYYY-MM-DD format
    pub aa_mode: Option<bool>, // Whether to create AA wallet
    pub role: Option<String>, // "ADMIN", "USER"
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RegisterResponse {
    pub id: String,
    pub username: String,
    pub email: String,
    pub first_name: String,
    pub last_name_paternal: String,
    pub last_name_maternal: String,
    pub birth_date: String,
    pub wallet_id: String,
    pub wallet_public_key: String,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LoginRequest {
    pub username: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub password: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub pin: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LoginResponse {
    pub token: String,
    pub user: UserResponse,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserResponse {
    pub id: String,
    pub username: String,
    pub email: String,
    pub first_name: String,
    pub last_name_paternal: String,
    pub last_name_maternal: String,
    pub birth_date: String,
    pub wallet_id: Option<String>,
    pub role_id: String,
    pub created_at: String,
}

impl From<User> for UserResponse {
    fn from(user: User) -> Self {
        Self {
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name_paternal: user.last_name_paternal,
            last_name_maternal: user.last_name_maternal,
            birth_date: user.birth_date.clone(),
            wallet_id: user.wallet_id,
            role_id: user.role_id,
            created_at: user.created_at.format("%Y-%m-%d %H:%M:%S").to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Claims {
    pub user_id: String,
    pub username: String,
    pub role_id: String,
    pub exp: usize,
}