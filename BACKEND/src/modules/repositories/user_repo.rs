use anyhow::Result;
use sqlx::SqlitePool;
use crate::modules::models::user::User;

#[derive(Clone)]
pub struct UserRepository {
    pool: SqlitePool,
}

impl UserRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn create(&self, user: &User) -> Result<()> {
        sqlx::query!(
            r#"
            INSERT INTO users (id, username, email, password_hash, first_name, last_name_paternal, last_name_maternal, birth_date, wallet_id, role_id, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            "#,
            user.id,
            user.username,
            user.email,
            user.password_hash,
            user.first_name,
            user.last_name_paternal,
            user.last_name_maternal,
            user.birth_date,
            user.wallet_id,
            user.role_id,
            user.created_at,
            user.updated_at
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn find_by_username(&self, username: &str) -> Result<Option<User>> {
        let user = sqlx::query_as!(
            User,
            r#"
            SELECT id, username, email, password_hash, first_name, last_name_paternal, last_name_maternal, birth_date, wallet_id, role_id, created_at, updated_at
            FROM users
            WHERE username = ?
            "#,
            username
        )
        .fetch_optional(&self.pool)
        .await?;
        Ok(user)
    }

    pub async fn find_by_email(&self, email: &str) -> Result<Option<User>> {
        let user = sqlx::query_as!(
            User,
            r#"
            SELECT id, username, email, password_hash, first_name, last_name_paternal, last_name_maternal, birth_date, wallet_id, role_id, created_at, updated_at
            FROM users
            WHERE email = ?
            "#,
            email
        )
        .fetch_optional(&self.pool)
        .await?;
        Ok(user)
    }

    pub async fn find_by_id(&self, id: &str) -> Result<Option<User>> {
        let user = sqlx::query_as!(
            User,
            r#"
            SELECT id, username, email, password_hash, first_name, last_name_paternal, last_name_maternal, birth_date, wallet_id, role_id, created_at, updated_at
            FROM users
            WHERE id = ?
            "#,
            id
        )
        .fetch_optional(&self.pool)
        .await?;
        Ok(user)
    }

    pub async fn update_wallet_id(&self, user_id: &str, wallet_id: &str) -> Result<()> {
        let now = chrono::Utc::now().naive_utc();
        sqlx::query!(
            r#"
            UPDATE users
            SET wallet_id = ?, updated_at = ?
            WHERE id = ?
            "#,
            wallet_id,
            now,
            user_id
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn check_username_exists(&self, username: &str) -> Result<bool> {
        let result: i32 = sqlx::query_scalar!(
            "SELECT COUNT(*) FROM users WHERE username = ?",
            username
        )
        .fetch_one(&self.pool)
        .await?;
        Ok(result > 0)
    }

    pub async fn check_email_exists(&self, email: &str) -> Result<bool> {
        let result: i32 = sqlx::query_scalar!(
            "SELECT COUNT(*) FROM users WHERE email = ?",
            email
        )
        .fetch_one(&self.pool)
        .await?;
        Ok(result > 0)
    }
}
