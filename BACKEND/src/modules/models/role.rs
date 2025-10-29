use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Role {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum UserRole {
    Admin,
    User,
    Merchant,
}

impl UserRole {
    pub fn as_str(&self) -> &str {
        match self {
            UserRole::Admin => "admin",
            UserRole::User => "user",
            UserRole::Merchant => "merchant",
        }
    }

    pub fn to_id(&self) -> String {
        match self {
            UserRole::Admin => "ADMIN".to_string(),
            UserRole::User => "USER".to_string(),
            UserRole::Merchant => "MERCHANT".to_string(),
        }
    }

    pub fn from_str(s: &str) -> Option<Self> {
        match s {
            "admin" => Some(UserRole::Admin),
            "user" => Some(UserRole::User),
            "merchant" => Some(UserRole::Merchant),
            _ => None,
        }
    }
}

impl Default for UserRole {
    fn default() -> Self {
        UserRole::User
    }
}

