# Guía de Testing - Módulo de Usuarios

Esta guía te ayudará a probar el nuevo módulo de autenticación y usuarios.

## Prerequisitos

1. Servidor corriendo en `http://localhost:4000`
2. Base de datos migrada correctamente
3. Herramienta para testing (Postman, Thunder Client, curl, etc.)

---

## Pruebas Paso a Paso

### Test 1: Registrar Nuevo Usuario

**Endpoint:** `POST http://localhost:4000/api/auth/register`

**Body (JSON):**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Password123!",
  "first_name": "Test",
  "last_name_paternal": "User",
  "last_name_maternal": "Example",
  "birth_date": "1995-06-15",
  "aa_mode": false
}
```

**Respuesta esperada (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "testuser",
  "email": "test@example.com",
  "first_name": "Test",
  "last_name_paternal": "User",
  "last_name_maternal": "Example",
  "birth_date": "1995-06-15",
  "wallet_id": "wallet_xxx",
  "wallet_public_key": "GAXYZ...",
  "created_at": "2025-10-29 23:00:00"
}
```

**Notas:**
- Se crea automáticamente una wallet Stellar para el usuario
- El wallet puede fondearse con `aa_mode: false, fund: true` en la generación
- La contraseña se hashea con bcrypt antes de guardarse
- Por defecto, todos los usuarios nuevos tienen rol ADMIN

---

### Test 2: Intentar Registrar con Username Duplicado

**Endpoint:** `POST http://localhost:4000/api/auth/register`

**Body (mismo username que Test 1):**
```json
{
  "username": "testuser",
  "email": "different@example.com",
  "password": "Password123!",
  "first_name": "Another",
  "last_name_paternal": "User",
  "last_name_maternal": "Test",
  "birth_date": "1990-01-01"
}
```

**Respuesta esperada (400):**
```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Username already exists"
  }
}
```

---

### Test 3: Intentar Registrar con Email Duplicado

**Endpoint:** `POST http://localhost:4000/api/auth/register`

**Body (mismo email que Test 1):**
```json
{
  "username": "anotheruser",
  "email": "test@example.com",
  "password": "Password123!",
  "first_name": "Another",
  "last_name_paternal": "User",
  "last_name_maternal": "Test",
  "birth_date": "1990-01-01"
}
```

**Respuesta esperada (400):**
```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Email already exists"
  }
}
```

---

### Test 4: Registrar con Contraseña Corta

**Endpoint:** `POST http://localhost:4000/api/auth/register`

**Body:**
```json
{
  "username": "shortpass",
  "email": "short@example.com",
  "password": "1234567",
  "first_name": "Short",
  "last_name_paternal": "Pass",
  "last_name_maternal": "User",
  "birth_date": "1990-01-01"
}
```

**Respuesta esperada (400):**
```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Password must be at least 8 characters"
  }
}
```

---

### Test 5: Registrar con Email Inválido

**Endpoint:** `POST http://localhost:4000/api/auth/register`

**Body:**
```json
{
  "username": "invalidemail",
  "email": "notanemail",
  "password": "Password123!",
  "first_name": "Invalid",
  "last_name_paternal": "Email",
  "last_name_maternal": "User",
  "birth_date": "1990-01-01"
}
```

**Respuesta esperada (400):**
```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid email format"
  }
}
```

---

### Test 6: Registrar con Fecha Inválida

**Endpoint:** `POST http://localhost:4000/api/auth/register`

**Body:**
```json
{
  "username": "invaliddate",
  "email": "date@example.com",
  "password": "Password123!",
  "first_name": "Invalid",
  "last_name_paternal": "Date",
  "last_name_maternal": "User",
  "birth_date": "1990/01/01"
}
```

**Respuesta esperada (400):**
```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid birth date format. Use YYYY-MM-DD"
  }
}
```

---

### Test 7: Iniciar Sesión Exitoso

**Endpoint:** `POST http://localhost:4000/api/auth/login`

**Body:**
```json
{
  "username": "testuser",
  "password": "Password123!"
}
```

**Respuesta esperada (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsInJvbGVfaWQiOiJyb2xlX2FkbWluIiwiZXhwIjoxNzMyODM2MDAwfQ.abc123xyz...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "testuser",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name_paternal": "User",
    "last_name_maternal": "Example",
    "birth_date": "1995-06-15",
    "wallet_id": "wallet_xxx",
    "role_id": "role_admin",
    "created_at": "2025-10-29 23:00:00"
  }
}
```

**Notas:**
- Guarda el `token` para usarlo en futuras peticiones protegidas
- El token expira en 30 días
- El token JWT incluye: user_id, username, role_id, exp

---

### Test 8: Iniciar Sesión con Contraseña Incorrecta

**Endpoint:** `POST http://localhost:4000/api/auth/login`

**Body:**
```json
{
  "username": "testuser",
  "password": "WrongPassword123!"
}
```

**Respuesta esperada (401):**
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid username or password"
  }
}
```

---

### Test 9: Iniciar Sesión con Usuario Inexistente

**Endpoint:** `POST http://localhost:4000/api/auth/login`

**Body:**
```json
{
  "username": "nonexistent",
  "password": "Password123!"
}
```

**Respuesta esperada (401):**
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid username or password"
  }
}
```

---

### Test 10: Registrar Usuario con Wallet AA

**Endpoint:** `POST http://localhost:4000/api/auth/register`

**Body:**
```json
{
  "username": "aauser",
  "email": "aa@example.com",
  "password": "Password123!",
  "first_name": "AA",
  "last_name_paternal": "User",
  "last_name_maternal": "Test",
  "birth_date": "1992-03-20",
  "aa_mode": true
}
```

**Respuesta esperada (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "username": "aauser",
  "email": "aa@example.com",
  "first_name": "AA",
  "last_name_paternal": "User",
  "last_name_maternal": "Test",
  "birth_date": "1992-03-20",
  "wallet_id": "wallet_yyy",
  "wallet_public_key": "GABC...",
  "created_at": "2025-10-29 23:05:00"
}
```

**Notas:**
- La wallet creada con `aa_mode: true` usará Account Abstraction
- No necesitarás el secret key para transacciones futuras
- El signer AA se registra automáticamente

---

## Integración con Otros Endpoints

### Ejemplo: Flujo Completo de Usuario

#### 1. Registro
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "first_name": "John",
    "last_name_paternal": "Doe",
    "last_name_maternal": "Smith",
    "birth_date": "1990-05-15",
    "aa_mode": false
  }'
```

**Respuesta:**
```json
{
  "wallet_public_key": "GAXYZ123..."
}
```

#### 2. Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "SecurePass123!"
  }'
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "wallet_id": "wallet_abc123"
  }
}
```

#### 3. Verificar Balance de la Wallet
```bash
curl http://localhost:4000/api/wallet/GAXYZ123.../balance
```

#### 4. Fondear Wallet (Testnet)
```bash
curl -X POST http://localhost:4000/api/wallet/fund \
  -H "Content-Type: application/json" \
  -d '{
    "public_key": "GAXYZ123..."
  }'
```

#### 5. Verificar Reputación
```bash
curl http://localhost:4000/api/reputation/GAXYZ123...
```

#### 6. Crear Transferencia Bancaria
```bash
curl -X POST http://localhost:4000/api/bank/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "public_key": "GAXYZ123...",
    "wallet_id": "wallet_abc123",
    "amount_fiat": 5000.00,
    "currency": "MXN",
    "bank_account_masked": "****1234"
  }'
```

---

## Verificación del Token JWT

Puedes verificar el contenido del JWT en [jwt.io](https://jwt.io).

**Ejemplo de Claims:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "testuser",
  "role_id": "role_admin",
  "exp": 1732836000
}
```

---

## Testing con Postman/Thunder Client

### Colección de Tests

Importa esta colección en Postman:

```json
{
  "info": {
    "name": "Wallet Backend - Users",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register User",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"username\": \"testuser\",\n  \"email\": \"test@example.com\",\n  \"password\": \"Password123!\",\n  \"first_name\": \"Test\",\n  \"last_name_paternal\": \"User\",\n  \"last_name_maternal\": \"Example\",\n  \"birth_date\": \"1995-06-15\",\n  \"aa_mode\": false\n}"
        },
        "url": {
          "raw": "http://localhost:4000/api/auth/register",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4000",
          "path": ["api", "auth", "register"]
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"username\": \"testuser\",\n  \"password\": \"Password123!\"\n}"
        },
        "url": {
          "raw": "http://localhost:4000/api/auth/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4000",
          "path": ["api", "auth", "login"]
        }
      }
    }
  ]
}
```

---

## Scripts de Testing Automatizado

### Script Bash para Testing

Guarda como `test_users.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:4000/api"

echo "=== Test 1: Register User ==="
curl -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser'$(date +%s)'",
    "email": "test'$(date +%s)'@example.com",
    "password": "Password123!",
    "first_name": "Test",
    "last_name_paternal": "User",
    "last_name_maternal": "Example",
    "birth_date": "1995-06-15",
    "aa_mode": false
  }' | jq .

echo -e "\n\n=== Test 2: Login ==="
TOKEN=$(curl -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Password123!"
  }' | jq -r .token)

echo "Token: $TOKEN"

echo -e "\n\n=== Test 3: Check Health ==="
curl "$BASE_URL/health" | jq .
```

### Script PowerShell para Testing

Guarda como `test_users.ps1`:

```powershell
$BaseUrl = "http://localhost:4000/api"

Write-Host "=== Test 1: Register User ===" -ForegroundColor Green
$timestamp = [DateTimeOffset]::Now.ToUnixTimeSeconds()
$registerBody = @{
    username = "testuser$timestamp"
    email = "test$timestamp@example.com"
    password = "Password123!"
    first_name = "Test"
    last_name_paternal = "User"
    last_name_maternal = "Example"
    birth_date = "1995-06-15"
    aa_mode = $false
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "$BaseUrl/auth/register" -Method Post -Body $registerBody -ContentType "application/json"
$response | ConvertTo-Json

Write-Host "`n=== Test 2: Login ===" -ForegroundColor Green
$loginBody = @{
    username = "testuser"
    password = "Password123!"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "$BaseUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
$token = $loginResponse.token
Write-Host "Token: $token"

Write-Host "`n=== Test 3: Check Health ===" -ForegroundColor Green
Invoke-RestMethod -Uri "$BaseUrl/health" | ConvertTo-Json
```

---

## Base de Datos

### Verificar Usuarios en SQLite

```bash
sqlite3 wallet.db "SELECT username, email, role_id, created_at FROM users;"
```

### Verificar Roles

```bash
sqlite3 wallet.db "SELECT * FROM roles;"
```

### Verificar Relación Usuario-Wallet

```bash
sqlite3 wallet.db "SELECT u.username, u.email, w.public_key FROM users u JOIN wallets w ON u.wallet_id = w.id;"
```

---

## Troubleshooting

### Error: "Username already exists"
**Solución:** Usa un username diferente o elimina el usuario existente de la base de datos.

### Error: "Failed to create wallet"
**Solución:** Verifica que el servicio de Stellar esté funcionando y el friendbot esté disponible.

### Error: "Database error"
**Solución:** Verifica que las migraciones se hayan ejecutado correctamente:
```bash
cargo sqlx migrate run
```

### Error: "Invalid token"
**Solución:** Asegúrate de que el JWT_SECRET esté configurado y sea consistente.

---

**Última actualización:** 29 de Octubre, 2025
