-- Add users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    pin_hash TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name_paternal TEXT NOT NULL,
    last_name_maternal TEXT NOT NULL,
    birth_date TEXT NOT NULL,
    wallet_id TEXT UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE SET NULL
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_wallet_id ON users(wallet_id);

-- Update wallets table to include user_id (optional relationship)
-- We keep wallet_id in users as the primary relationship
ALTER TABLE wallets ADD COLUMN user_id TEXT;
CREATE INDEX idx_wallets_user_id ON wallets(user_id);

-- Update transactions to include user_id
ALTER TABLE transactions ADD COLUMN user_id TEXT;
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
