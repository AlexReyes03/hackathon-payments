use anyhow::{Context, Result};
use std::sync::Arc;
use ed25519_dalek::{SigningKey, VerifyingKey};
use rand::{rngs::OsRng, Rng};
use stellar_strkey::{ed25519, Strkey};

use crate::modules::models::{
    wallet::{GenerateWalletResponse, Wallet},
    transaction::{Transaction, TransactionStatus, TransactionType},
};
use crate::modules::repositories::{
    wallet_repo::WalletRepository,
    transaction_repo::TransactionRepository,
};
use crate::modules::services::{
    aa_service::AaService,
    stellar_service::StellarService,
};

#[derive(Clone)]
pub struct WalletService {
    pub wallet_repo: Arc<WalletRepository>,
    transaction_repo: Arc<TransactionRepository>,
    aa_service: Arc<AaService>,
    stellar_service: Arc<StellarService>,
}

impl WalletService {
    pub fn new(
        wallet_repo: Arc<WalletRepository>,
        transaction_repo: Arc<TransactionRepository>,
        aa_service: Arc<AaService>,
        stellar_service: Arc<StellarService>,
    ) -> Self {
        Self {
            wallet_repo,
            transaction_repo,
            aa_service,
            stellar_service,
        }
    }

    pub async fn generate_wallet(
        &self,
        aa_mode: bool,
        reveal_secret: bool,
    ) -> Result<GenerateWalletResponse> {
        let (public_key, secret_key) = Self::generate_stellar_keypair()?;

        let wallet = Wallet {
            id: uuid::Uuid::new_v4().to_string(),
            public_key: public_key.clone(),
            is_aa_wallet: aa_mode,
            created_at: chrono::Utc::now().naive_utc(),
            updated_at: chrono::Utc::now().naive_utc(),
        };

        self.wallet_repo.create(&wallet).await
            .context("Failed to save wallet to database")?;

        if aa_mode {
            self.aa_service.register_signer(&public_key, &secret_key).await?;
            tracing::info!("Created AA wallet: {}", public_key);
        } else {
            tracing::info!("Created regular wallet: {}", public_key);
        }

        Ok(GenerateWalletResponse {
            id: wallet.id,
            public_key,
            secret_key: if reveal_secret { Some(secret_key) } else { None },
            aa_enabled: aa_mode,
        })
    }

    pub async fn fund_wallet(&self, public_key: &str) -> Result<String> {
        let wallet = self.wallet_repo.find_by_pubkey(public_key).await?
            .context("Wallet not found")?;

        let tx_hash = self.stellar_service.fund_account(public_key).await
            .context("Failed to fund account via Friendbot")?;

        let transaction = Transaction {
            id: uuid::Uuid::new_v4().to_string(),
            wallet_id: wallet.id.clone(),
            tx_hash: tx_hash.clone(),
            tx_type: TransactionType::Receive.to_string(),
            from_address: Some("Friendbot".to_string()),
            to_address: Some(public_key.to_string()),
            amount: "10000.0000000".to_string(),
            asset: "XLM".to_string(),
            status: TransactionStatus::Completed.to_string(),
            created_at: chrono::Utc::now().naive_utc(),
        };

        self.transaction_repo.create(&transaction).await
            .context("Failed to save transaction to database")?;

        Ok(tx_hash)
    }

    pub async fn get_balance(&self, public_key: &str) -> Result<(Vec<(String, String)>, Vec<String>)> {
        let wallet = self.wallet_repo.find_by_pubkey(public_key).await?
            .context("Wallet not found")?;

        let balances = self.stellar_service.get_account_balance(public_key).await
            .context("Failed to fetch balance from Stellar")?;

        let recent_txs = self.transaction_repo.find_by_wallet_id(&wallet.id, 10).await?
            .into_iter()
            .map(|tx| tx.tx_hash)
            .collect();

        Ok((balances, recent_txs))
    }

    pub async fn send_transaction(
        &self,
        from_pubkey: &str,
        to_pubkey: &str,
        amount: &str,
        asset_code: Option<&str>,
    ) -> Result<String> {
        let wallet = self.wallet_repo.find_by_pubkey(from_pubkey).await?
            .context("Wallet not found")?;

        let exists = self.stellar_service.check_account_exists(from_pubkey).await?;
        if !exists {
            return Err(anyhow::anyhow!("Source account does not exist on Stellar network"));
        }

        let mock_tx_hash = format!("tx_{}", uuid::Uuid::new_v4());

        let transaction = Transaction {
            id: uuid::Uuid::new_v4().to_string(),
            wallet_id: wallet.id.clone(),
            tx_hash: mock_tx_hash.clone(),
            tx_type: TransactionType::Send.to_string(),
            from_address: Some(from_pubkey.to_string()),
            to_address: Some(to_pubkey.to_string()),
            amount: amount.to_string(),
            asset: asset_code.unwrap_or("XLM").to_string(),
            status: TransactionStatus::Completed.to_string(),
            created_at: chrono::Utc::now().naive_utc(),
        };

        self.transaction_repo.create(&transaction).await
            .context("Failed to save transaction to database")?;

        tracing::info!(
            "Transaction recorded: {} -> {} ({} {})",
            from_pubkey,
            to_pubkey,
            amount,
            asset_code.unwrap_or("XLM")
        );

        Ok(mock_tx_hash)
    }

    fn generate_stellar_keypair() -> Result<(String, String)> {
        let mut csprng = OsRng{};
        let mut secret_bytes = [0u8; 32];
        csprng.fill(&mut secret_bytes);
        
        let signing_key = SigningKey::from_bytes(&secret_bytes);
        let verifying_key = signing_key.verifying_key();
        
        let public_key = Self::encode_stellar_public(&verifying_key);
        let secret_key = Self::encode_stellar_secret(&signing_key);
        
        Ok((public_key, secret_key))
    }

    fn encode_stellar_public(key: &VerifyingKey) -> String {
        // Use stellar-strkey to properly encode the public key (56 characters)
        let public_key_bytes: [u8; 32] = key.to_bytes();
        Strkey::PublicKeyEd25519(ed25519::PublicKey(public_key_bytes)).to_string()
    }

    fn encode_stellar_secret(key: &SigningKey) -> String {
        // Use stellar-strkey to properly encode the secret key (56 characters)
        let secret_key_bytes: [u8; 32] = key.to_bytes();
        Strkey::PrivateKeyEd25519(ed25519::PrivateKey(secret_key_bytes)).to_string()
    }
}