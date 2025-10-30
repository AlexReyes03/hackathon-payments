-- Crear tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insertar roles por defecto
INSERT INTO roles (id, name, description) VALUES
    ('ADMIN', 'admin', 'Administrator with full access'),
    ('USER', 'user', 'Regular user with standard access'),
    ('MERCHANT', 'merchant', 'Merchant user with business features');

-- Agregar columna role_id a la tabla users
ALTER TABLE users ADD COLUMN role_id TEXT DEFAULT 'USER' NOT NULL;

-- Crear índice para role_id
CREATE INDEX idx_users_role_id ON users(role_id);

