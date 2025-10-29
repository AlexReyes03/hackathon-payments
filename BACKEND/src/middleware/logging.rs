use axum::{
    extract::Request,
    http::StatusCode,
    middleware::Next,
    response::{IntoResponse, Response},
};
use std::time::Instant;

pub async fn log_request(req: Request, next: Next) -> Response {
    let method = req.method().clone();
    let uri = req.uri().clone();
    let start = Instant::now();

    tracing::info!("--> {} {}", method, uri);

    let response = next.run(req).await;

    let duration = start.elapsed();
    let status = response.status();

    let status_code = status.as_u16();
    let duration_ms = duration.as_millis();

    match status_code {
        200..=299 => {
            tracing::info!(
                "<-- {} {} {} ({:.2}ms)",
                method,
                uri,
                status_code,
                duration_ms
            );
        }
        400..=499 => {
            tracing::warn!(
                "<-- {} {} {} ({:.2}ms)",
                method,
                uri,
                status_code,
                duration_ms
            );
        }
        500..=599 => {
            tracing::error!(
                "<-- {} {} {} ({:.2}ms)",
                method,
                uri,
                status_code,
                duration_ms
            );
        }
        _ => {
            tracing::info!(
                "<-- {} {} {} ({:.2}ms)",
                method,
                uri,
                status_code,
                duration_ms
            );
        }
    }

    response
}

pub async fn handle_timeout_error(err: std::io::Error) -> impl IntoResponse {
    tracing::error!("Request timeout: {}", err);
    (
        StatusCode::REQUEST_TIMEOUT,
        "Request took too long to process",
    )
}