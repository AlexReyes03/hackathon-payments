# API Endpoints - Wallet Backend

**Base URL:** `http://localhost:4000/api`

## Índice
- [Autenticación y Usuarios](#autenticación-y-usuarios)
- [Wallets](#wallets)
- [Transacciones](#transacciones)
- [Reputación](#reputación)
- [Conversión de Divisas](#conversión-de-divisas)
- [Transferencias Bancarias](#transferencias-bancarias)
- [Administración](#administración)
- [Account Abstraction (AA)](#account-abstraction-aa)
- [Health Check](#health-check)

---

## Autenticación y Usuarios

### 1. Registrar Usuario
Crea una nueva cuenta de usuario con wallet automática.

**Endpoint:** `POST /api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name_paternal": "Doe",
  "last_name_maternal": "Smith",
  "birth_date": "1990-01-15",
  "aa_mode": false,
  "role": "user"
}
```

**Campos:**
- `username` (string, requerido): Nombre de usuario único
- `email` (string, requerido): Email válido
- `password` (string, requerido): Mínimo 8 caracteres
- `first_name` (string, requerido): Primer nombre
- `last_name_paternal` (string, requerido): Apellido paterno
- `last_name_maternal` (string, requerido): Apellido materno
- `birth_date` (string, requerido): Fecha de nacimiento (YYYY-MM-DD)
- `aa_mode` (boolean, opcional): Crear wallet con Account Abstraction (default: false)
- `role` (string, opcional): Rol del usuario (default: "user")

**Respuesta exitosa (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "first_name": "John",
  "last_name_paternal": "Doe",
  "last_name_maternal": "Smith",
  "birth_date": "1990-01-15",
  "wallet_id": "wallet_123abc",
  "wallet_public_key": "GAXYZ...",
  "created_at": "2025-10-29 23:00:00"
}
```

**Errores:**
- `400 Bad Request`: Username o email ya existe, formato inválido
- `500 Internal Server Error`: Error al crear wallet o guardar usuario

---

### 2. Iniciar Sesión
Autentica al usuario y obtiene un token JWT.

**Endpoint:** `POST /api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "johndoe",
  "password": "SecurePass123!"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "first_name": "John",
    "last_name_paternal": "Doe",
    "last_name_maternal": "Smith",
    "birth_date": "1990-01-15",
    "wallet_id": "wallet_123abc",
    "role_id": "role_admin",
    "created_at": "2025-10-29 23:00:00"
  }
}
```

**Token JWT incluye:**
- `user_id`: ID del usuario
- `username`: Nombre de usuario
- `role_id`: Rol del usuario
- `exp`: Expiración (30 días desde el login)

**Errores:**
- `401 Unauthorized`: Usuario o contraseña incorrectos
- `500 Internal Server Error`: Error del servidor

---

## Wallets

### 3. Generar Wallet
Crea una nueva wallet de Stellar.

**Endpoint:** `POST /api/wallet/generate`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "aa_mode": false,
  "fund": false
}
```

**Campos:**
- `aa_mode` (boolean, opcional): Usar Account Abstraction (default: false)
- `fund` (boolean, opcional): Fondear wallet desde friendbot (default: false)

**Respuesta exitosa (200):**
```json
{
  "id": "wallet_abc123",
  "public_key": "GCXYZ...",
  "secret_key": "SXYZ...",
  "is_aa_wallet": false,
  "funded": true,
  "balance": "10000.0000000",
  "message": "Wallet generated and funded with 10000 XLM from friendbot"
}
```

**Errores:**
- `500 Internal Server Error`: Error al generar wallet

---

### 4. Fondear Wallet
Añade fondos a una wallet desde el friendbot de Stellar testnet.

**Endpoint:** `POST /api/wallet/fund`

**Body:**
```json
{
  "public_key": "GAXYZ..."
}
```

**Respuesta exitosa (200):**
```json
{
  "public_key": "GAXYZ...",
  "success": true,
  "message": "Wallet funded successfully with testnet XLM",
  "balance": "10000.0000000"
}
```

---

### 5. Consultar Balance
Obtiene el balance de una wallet.

**Endpoint:** `GET /api/wallet/:pubkey/balance`

**Parámetros:**
- `pubkey`: Public key de la wallet

**Respuesta exitosa (200):**
```json
{
  "public_key": "GAXYZ...",
  "balances": [
    {
      "asset_type": "native",
      "asset_code": "XLM",
      "balance": "9995.0000000"
    },
    {
      "asset_type": "credit_alphanum4",
      "asset_code": "USDC",
      "asset_issuer": "GBXYZ...",
      "balance": "100.0000000"
    }
  ]
}
```

---

### 6. Listar Wallets
Obtiene todas las wallets registradas.

**Endpoint:** `GET /api/wallets`

**Respuesta exitosa (200):**
```json
[
  {
    "id": "wallet_123",
    "public_key": "GAXYZ...",
    "is_aa_wallet": false,
    "created_at": "2025-10-29T23:00:00Z",
    "updated_at": "2025-10-29T23:00:00Z"
  }
]
```

---

### 7. Enviar Transacción
Envía tokens desde una wallet a otra.

**Endpoint:** `POST /api/wallet/:pubkey/send`

**Parámetros:**
- `pubkey`: Public key de la wallet emisora

**Body:**
```json
{
  "destination": "GDEST...",
  "amount": "100.50",
  "asset": "USDC:GISSUER...",
  "secret_key": "SXYZ...",
  "memo": "Payment for services"
}
```

**Campos:**
- `destination` (string, requerido): Public key del destinatario
- `amount` (string, requerido): Cantidad a enviar
- `asset` (string, requerido): Asset en formato "CODE:ISSUER" o "native" para XLM
- `secret_key` (string, requerido): Secret key de la wallet emisora
- `memo` (string, opcional): Memo de la transacción

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "tx_hash": "abc123...",
  "from": "GAXYZ...",
  "to": "GDEST...",
  "amount": "100.50",
  "asset": "USDC:GISSUER...",
  "message": "Transaction sent successfully"
}
```

**Errores:**
- `400 Bad Request`: Parámetros inválidos
- `404 Not Found`: Wallet no encontrada
- `502 Bad Gateway`: Error de red con Stellar

---

## Transacciones

Las transacciones se registran automáticamente al enviar pagos. Se puede consultar el historial mediante los endpoints de wallet.

---

## Reputación

### 8. Obtener Reputación
Calcula y obtiene el score de reputación de una wallet.

**Endpoint:** `GET /api/reputation/:pubkey`

**Parámetros:**
- `pubkey`: Public key de la wallet

**Respuesta exitosa (200):**
```json
{
  "public_key": "GAXYZ...",
  "trust_score": 85,
  "level": "EXCELLENT",
  "tx_count": 15,
  "total_volume": 15000.50,
  "last_calculated": "2025-10-29T23:00:00Z"
}
```

**Niveles de reputación:**
- `EXCELLENT`: 80-100
- `GOOD`: 60-79
- `FAIR`: 40-59
- `POOR`: 0-39

---

## Conversión de Divisas

### 9. Convertir a USDC
Convierte tokens a USDC (mock).

**Endpoint:** `POST /api/convert/to-usdc`

**Body:**
```json
{
  "from_asset": "MXN",
  "from_amount": "1000",
  "public_key": "GAXYZ..."
}
```

**Respuesta exitosa (200):**
```json
{
  "from_asset": "MXN",
  "from_amount": "1000",
  "to_asset": "USDC",
  "to_amount": "58.82",
  "rate": 17.0,
  "public_key": "GAXYZ..."
}
```

---

### 10. Obtener Tasas de Cambio
Obtiene las tasas de cambio actuales.

**Endpoint:** `GET /api/rates`

**Respuesta exitosa (200):**
```json
{
  "rates": {
    "MXN": 17.0,
    "USD": 1.0,
    "EUR": 0.92
  },
  "base": "USD",
  "timestamp": "2025-10-29T23:00:00Z"
}
```

---

## Transferencias Bancarias

### 11. Crear Transferencia Bancaria
Simula una transferencia bancaria con validación de reputación.

**Endpoint:** `POST /api/bank/transfer`

**Body:**
```json
{
  "public_key": "GAXYZ...",
  "wallet_id": "wallet_123",
  "amount_fiat": 5000.00,
  "currency": "MXN",
  "bank_account_masked": "****1234"
}
```

**Campos:**
- `public_key` (string, requerido): Public key de la wallet
- `wallet_id` (string, requerido): ID de la wallet
- `amount_fiat` (number, requerido): Cantidad en moneda fiat
- `currency` (string, opcional): Código de moneda (default: "MXN")
- `bank_account_masked` (string, requerido): Cuenta bancaria enmascarada

**Respuesta exitosa (200):**
```json
{
  "id": "transfer_abc123",
  "wallet_id": "wallet_123",
  "public_key": "GAXYZ...",
  "amount_fiat": 5000.00,
  "currency": "MXN",
  "bank_account_masked": "****1234",
  "status": "APPROVED",
  "reputation_score": 85,
  "created_at": "2025-10-29T23:00:00Z",
  "message": "Transfer approved"
}
```

**Estados posibles:**
- `APPROVED`: Transferencia aprobada (reputación >= threshold)
- `REJECTED`: Transferencia rechazada (reputación < threshold)
- `PENDING`: En revisión
- `COMPLETED`: Completada
- `FAILED`: Fallida

**Errores:**
- `400 Bad Request`: Parámetros inválidos
- `403 Forbidden`: Reputación insuficiente
- `404 Not Found`: Wallet no encontrada

---

### 12. Listar Transferencias (Admin)
Lista todas las transferencias bancarias.

**Endpoint:** `GET /api/admin/transfers`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": "transfer_123",
    "wallet_id": "wallet_abc",
    "public_key": "GAXYZ...",
    "amount_fiat": 5000.00,
    "currency": "MXN",
    "bank_account_masked": "****1234",
    "status": "APPROVED",
    "reputation_score": 85,
    "created_at": "2025-10-29T23:00:00Z",
    "completed_at": null
  }
]
```

---

## Administración

### 13. Obtener Estadísticas
Obtiene estadísticas del sistema.

**Endpoint:** `GET /api/admin/stats`

**Respuesta exitosa (200):**
```json
{
  "total_wallets": 150,
  "total_transactions": 1250,
  "total_bank_transfers": 85,
  "aa_wallets_count": 12
}
```

---

### 14. Obtener Detalles de Salud
Información detallada del estado del sistema.

**Endpoint:** `GET /api/admin/health-details`

**Respuesta exitosa (200):**
```json
{
  "status": "ok",
  "version": "0.1.0",
  "database_connected": true,
  "stellar_horizon_url": "https://horizon-testnet.stellar.org",
  "reputation_threshold": 50
}
```

---

### 15. Listar Cuentas AA
Lista todas las cuentas con Account Abstraction registradas.

**Endpoint:** `GET /api/admin/aa-accounts`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Respuesta exitosa (200):**
```json
[
  "GAXYZ...",
  "GBABC...",
  "GCDEF..."
]
```

---

### 16. Obtener Secret de Cuenta AA
Obtiene el secret key de una cuenta AA (Admin only).

**Endpoint:** `GET /api/admin/aa-accounts/:pubkey/secret`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Parámetros:**
- `pubkey`: Public key de la cuenta AA

**Respuesta exitosa (200):**
```json
{
  "public_key": "GAXYZ...",
  "secret_key": "SXYZ..."
}
```

**Errores:**
- `401 Unauthorized`: Token admin inválido o faltante
- `404 Not Found`: Cuenta AA no encontrada

---

### 17. Registrar Signer AA (Admin)
Registra manualmente un signer para Account Abstraction.

**Endpoint:** `POST /api/admin/aa-accounts/register`

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Body:**
```json
{
  "public_key": "GAXYZ...",
  "secret_key": "SXYZ..."
}
```

**Respuesta exitosa (200):**
```json
{
  "public_key": "GAXYZ...",
  "secret_key": "SXYZ..."
}
```

---

## Account Abstraction (AA)

### 18. Relay de Transacción AA
Envía una transacción en nombre del usuario usando Account Abstraction.

**Endpoint:** `POST /api/aa/relayer`

**Body:**
```json
{
  "public_key": "GAXYZ...",
  "destination": "GDEST...",
  "amount": "50.00",
  "asset": "USDC:GISSUER...",
  "memo": "AA Payment"
}
```

**Campos:**
- `public_key` (string, requerido): Public key de la wallet AA
- `destination` (string, requerido): Public key del destinatario
- `amount` (string, requerido): Cantidad a enviar
- `asset` (string, requerido): Asset en formato "CODE:ISSUER" o "native"
- `memo` (string, opcional): Memo de la transacción

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "tx_hash": "abc123...",
  "from": "GAXYZ...",
  "to": "GDEST...",
  "amount": "50.00",
  "asset": "USDC:GISSUER...",
  "relayed": true,
  "message": "Transaction relayed successfully via AA"
}
```

---

## Health Check

### 19. Health Check
Verifica que el servidor esté funcionando.

**Endpoint:** `GET /api/health`

**Respuesta exitosa (200):**
```json
{
  "status": "ok",
  "timestamp": "2025-10-29T23:00:00Z"
}
```

---

## Códigos de Estado HTTP

- `200 OK`: Operación exitosa
- `400 Bad Request`: Parámetros inválidos o solicitud incorrecta
- `401 Unauthorized`: Autenticación fallida o token inválido
- `403 Forbidden`: Acceso denegado (ej: reputación insuficiente)
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error interno del servidor
- `502 Bad Gateway`: Error al comunicarse con servicios externos (Stellar)

---

## Formato de Errores

Todas las respuestas de error siguen este formato:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Descripción del error"
  }
}
```

**Códigos de error comunes:**
- `WALLET_NOT_FOUND`: Wallet no encontrada
- `UNAUTHORIZED`: No autorizado
- `INVALID_PUBLIC_KEY`: Clave pública inválida
- `INSUFFICIENT_BALANCE`: Balance insuficiente
- `REPUTATION_TOO_LOW`: Reputación muy baja
- `BAD_REQUEST`: Solicitud incorrecta
- `AA_ERROR`: Error de Account Abstraction
- `STELLAR_ERROR`: Error de la red Stellar
- `DATABASE_ERROR`: Error de base de datos
- `INTERNAL_ERROR`: Error interno del servidor

---

## Notas de Autenticación

### JWT Token
Los endpoints de usuario reciben un token JWT al hacer login. Este token debe incluirse en las peticiones protegidas:

```
Authorization: Bearer {token}
```

El token expira en 30 días desde su emisión.

### Admin Token
Los endpoints de administración requieren un token especial configurado en el servidor:

```
Authorization: Bearer {admin_token}
```

Por defecto en desarrollo: `dev-admin-token`

---

## Ejemplos de Uso con cURL

### Registrar Usuario
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "SecurePass123!",
    "first_name": "John",
    "last_name_paternal": "Doe",
    "last_name_maternal": "Smith",
    "birth_date": "1990-01-15",
    "aa_mode": false
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "SecurePass123!"
  }'
```

### Generar Wallet
```bash
curl -X POST http://localhost:4000/api/wallet/generate \
  -H "Content-Type: application/json" \
  -d '{
    "aa_mode": false,
    "fund": true
  }'
```

### Consultar Balance
```bash
curl http://localhost:4000/api/wallet/GAXYZ.../balance
```

### Enviar Transacción
```bash
curl -X POST http://localhost:4000/api/wallet/GAXYZ.../send \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "GDEST...",
    "amount": "100.50",
    "asset": "native",
    "secret_key": "SXYZ...",
    "memo": "Payment"
  }'
```

### Obtener Reputación
```bash
curl http://localhost:4000/api/reputation/GAXYZ...
```

### Crear Transferencia Bancaria
```bash
curl -X POST http://localhost:4000/api/bank/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "public_key": "GAXYZ...",
    "wallet_id": "wallet_123",
    "amount_fiat": 5000.00,
    "currency": "MXN",
    "bank_account_masked": "****1234"
  }'
```

### Estadísticas (requiere autenticación)
```bash
curl http://localhost:4000/api/admin/stats
```

---

## Variables de Entorno

Configuración recomendada en `.env`:

```env
# Server
SERVER_PORT=4000
SERVER_HOST=0.0.0.0
SERVER_FRONTEND_URL=http://localhost:3000
SERVER_ADMIN_TOKEN=your-secure-admin-token

# Database
DATABASE_URL=sqlite://./wallet.db

# Stellar
STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
STELLAR_FRIENDBOT_URL=https://friendbot.stellar.org

# Account Abstraction
AA_BUNDLER_URL=http://localhost:4100
AA_SIGNER_MEMORY=true

# Reputation
REPUTATION_THRESHOLD=50

# External APIs
EXTERNAL_APIS_CIRCLE_API_KEY=your-circle-api-key
EXTERNAL_APIS_STRIPE_SECRET_KEY=your-stripe-secret-key
EXTERNAL_APIS_COINGECKO_API_URL=https://api.coingecko.com/api/v3

# JWT
JWT_SECRET=your-jwt-secret-key-here
```

---

## Flujo de Uso Completo

### 1. Registro e Inicio de Sesión
```
1. POST /api/auth/register → Crear cuenta y wallet automática
2. POST /api/auth/login → Obtener token JWT
3. Guardar token para futuras peticiones
```

### 2. Uso de Wallet
```
1. GET /api/wallet/:pubkey/balance → Verificar balance
2. POST /api/wallet/fund → Fondear wallet (testnet)
3. POST /api/wallet/:pubkey/send → Enviar transacción
4. GET /api/reputation/:pubkey → Verificar reputación
```

### 3. Transferencia Bancaria
```
1. GET /api/reputation/:pubkey → Verificar score de reputación
2. POST /api/bank/transfer → Crear transferencia
3. GET /api/admin/transfers → Revisar estado (admin)
```

### 4. Account Abstraction
```
1. POST /api/wallet/generate (aa_mode: true) → Crear wallet AA
2. POST /api/aa/relayer → Enviar transacción sin secret key
```

---

**Última actualización:** 29 de Octubre, 2025
**Versión del API:** 0.1.0
