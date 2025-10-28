-- Initial schema for wallet backend

-- Wallets table
CREATE TABLE IF NOT EXISTS wallets (
    id TEXT PRIMARY KEY NOT NULL,
    public_key TEXT UNIQUE NOT NULL,
    is_aa_wallet BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wallets_public_key ON wallets(public_key);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY NOT NULL,
    wallet_id TEXT NOT NULL,
    tx_hash TEXT UNIQUE NOT NULL,
    tx_type TEXT NOT NULL,
    from_address TEXT,
    to_address TEXT,
    amount TEXT NOT NULL,
    asset TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE
);

CREATE INDEX idx_transactions_wallet_id ON transactions(wallet_id);
CREATE INDEX idx_transactions_tx_hash ON transactions(tx_hash);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

-- Bank transfers table (simulation)
CREATE TABLE IF NOT EXISTS bank_transfers (
    id TEXT PRIMARY KEY NOT NULL,
    wallet_id TEXT NOT NULL,
    public_key TEXT NOT NULL,
    amount_fiat REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'MXN',
    bank_account_masked TEXT NOT NULL,
    status TEXT NOT NULL,
    rejection_reason TEXT,
    reputation_score INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE
);

CREATE INDEX idx_bank_transfers_wallet_id ON bank_transfers(wallet_id);
CREATE INDEX idx_bank_transfers_public_key ON bank_transfers(public_key);
CREATE INDEX idx_bank_transfers_status ON bank_transfers(status);

-- Reputation cache table
CREATE TABLE IF NOT EXISTS reputation_cache (
    public_key TEXT PRIMARY KEY NOT NULL,
    trust_score INTEGER NOT NULL,
    level TEXT NOT NULL,
    tx_count INTEGER NOT NULL DEFAULT 0,
    total_volume REAL NOT NULL DEFAULT 0.0,
    last_calculated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reputation_cache_trust_score ON reputation_cache(trust_score);