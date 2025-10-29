use axum::{
    extract::State,
    Json,
};
use crate::error::AppError;
use crate::modules::models::user::{RegisterRequest, RegisterResponse, LoginRequest, LoginResponse};
use crate::state::AppState;

pub async fn register(
    State(state): State<AppState>,
    Json(payload): Json<RegisterRequest>,
) -> Result<Json<RegisterResponse>, AppError> {
    let response = state
        .user_service
        .register(payload)
        .await
        .map_err(|e| {
            if e.to_string().contains("already exists") {
                AppError::BadRequest(e.to_string())
            } else {
                AppError::InternalError(e.to_string())
            }
        })?;

    Ok(Json(response))
}

pub async fn login(
    State(state): State<AppState>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, AppError> {
    let response = state
        .user_service
        .login(payload)
        .await
        .map_err(|e| {
            if e.to_string().contains("Invalid username or password") {
                AppError::Unauthorized(e.to_string())
            } else {
                AppError::InternalError(e.to_string())
            }
        })?;

    Ok(Json(response))
}
