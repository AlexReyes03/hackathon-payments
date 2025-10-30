# 🚀 Hackathon Payments - Sistema de Pagos con Stellar

Un sistema completo de pagos que integra wallets de Stellar, Account Abstraction, transferencias bancarias y sistema de reputación para hackathons.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Prerrequisitos](#-prerrequisitos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Troubleshooting](#-troubleshooting)

## ✨ Características

- **🔐 Wallets Stellar**: Generación de wallets con claves públicas y privadas
- **🏦 Account Abstraction**: Wallets con capacidades avanzadas
- **💸 Transferencias Bancarias**: Simulación de transferencias fiat
- **⭐ Sistema de Reputación**: Scoring basado en actividad
- **🔄 Conversión de Monedas**: API de conversión de divisas
- **📊 Dashboard Admin**: Estadísticas y monitoreo
- **🛡️ Middleware de Seguridad**: Logging y validación

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Rust/Axum)   │◄──►│   (SQLite)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Stellar       │
                       │   Network       │
                       └─────────────────┘
```

## 🔧 Prerrequisitos

### Backend (Rust)
- **Rust**: >= 1.70.0
- **Cargo**: Incluido con Rust
- **SQLx CLI**: Para migraciones de base de datos

### Frontend (React)
- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd hackathon-payments
```

### 2. Instalar Rust (si no está instalado)

#### macOS/Linux:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

#### Windows:
Descargar desde [rustup.rs](https://rustup.rs/)

### 3. Instalar SQLx CLI

```bash
cargo install sqlx-cli
```

### 4. Instalar dependencias del frontend

```bash
cd FRONTEND/hackathon
npm install
```

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```bash
# Base de datos
DATABASE_URL=sqlite://./wallet.db

# Servidor
SERVER_PORT=4000
SERVER_HOST=0.0.0.0

# JWT para autenticación de usuarios
JWT_SECRET=mi_secreto_jwt_super_seguro_cambiar_en_produccion

# Stellar
STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

# Reputación
REPUTATION_THRESHOLD=50

# Account Abstraction
AA_BUNDLER_URL=https://bundler.example.com
AA_SIGNER_MEMORY=true

# APIs Externas (opcional)
CIRCLE_API_KEY=your_circle_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 🚀 Ejecución

### Backend

1. **Navegar al directorio del backend:**
```bash
cd BACKEND
```

2. **Configurar variables de entorno:**
```bash
export DATABASE_URL="sqlite://./wallet.db"
export SERVER_PORT=4000
export JWT_SECRET="mi_secreto_jwt_super_seguro_cambiar_en_produccion"
```

3. **Ejecutar migraciones:**
```bash
sqlx migrate run
```

4. **Compilar y ejecutar:**
```bash
cargo run
```

El servidor estará disponible en: `http://localhost:4000`

### Frontend

1. **Navegar al directorio del frontend:**
```bash
cd FRONTEND/hackathon
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:3000`

## 📡 API Endpoints

**Base URL (Desarrollo):** `http://localhost:4000/api`  
**Base URL (Producción):** `http://YOUR_SERVER_IP:4000/api`

---

## 🎯 Orden Recomendado para Probar

1. ✅ **Health Check** - Verificar que el servidor responde
2. 👤 **Register User** - Crear tu primer usuario (automáticamente crea una wallet)
3. 🔐 **Login** - Obtener tu JWT token
4. 💵 **Get Balance** - Ver el balance de tu wallet
5. 💸 **Fund Wallet** - Fondear tu wallet en testnet
6. 📤 **Send Transaction** - Enviar XLM a otra cuenta
7. ⭐ **Get Reputation** - Ver tu score de reputación
8. 💱 **Get Rates** - Ver tasas de cambio
9. 💲 **Convert to USDC** - Convertir MXN a USDC

---

## 🏥 1. HEALTH CHECK

### ✅ Health Check
```http
GET /api/health
```

**Respuesta:**
```json
{
  "service": "wallet-backend",
  "status": "ok",
  "version": "0.1.0"
}
```

**Ejemplo cURL:**
```bash
curl http://localhost:4000/api/health
```

---

## 👤 2. AUTENTICACIÓN DE USUARIOS

### 📝 Registrar Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "juan_admin",
  "email": "juan@example.com",
  "password": "password123",
  "pin": "123456",
  "first_name": "Juan",
  "last_name_paternal": "Chavez",
  "last_name_maternal": "Manuel",
  "birth_date": "1995-06-15"
}
```

**Respuesta exitosa:**
```json
{
  "user": {
    "id": "uuid-del-usuario",
    "username": "juan_admin",
    "email": "juan@example.com",
    "first_name": "Juan",
    "last_name_paternal": "Chavez",
    "last_name_maternal": "Manuel",
    "birth_date": "1995-06-15",
    "wallet_id": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "role_id": "ADMIN",
    "created_at": "2025-10-30 18:35:04"
  },
  "message": "User registered successfully"
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "email": "test@example.com",
    "password": "password123",
    "pin": "123456",
    "first_name": "Test",
    "last_name_paternal": "User",
    "last_name_maternal": "Demo",
    "birth_date": "1995-06-15"
  }'
```

**Características:**
- ✅ Cada usuario obtiene automáticamente una wallet al registrarse
- ✅ Todos los usuarios nuevos reciben el rol `ADMIN` por defecto
- ✅ Las contraseñas se hashean con bcrypt (costo: 10)
- ✅ El PIN se hashea con bcrypt para seguridad adicional
- ✅ Validación de formato de fecha de nacimiento (YYYY-MM-DD)
- ✅ Username y email deben ser únicos

**Roles disponibles:**
- `ADMIN` - Administrador con acceso completo (asignado automáticamente)
- `USER` - Usuario regular
- `MERCHANT` - Usuario comerciante

---

### 🔐 Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "juan_admin",
  "password": "password123"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": "uuid-del-usuario",
    "username": "juan_admin",
    "email": "juan@example.com",
    "first_name": "Juan",
    "last_name_paternal": "Chavez",
    "last_name_maternal": "Manuel",
    "birth_date": "1995-06-15",
    "wallet_id": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "role_id": "ADMIN",
    "created_at": "2025-10-30 18:35:04"
  }
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "password": "password123"
  }'
```

**JWT Claims incluye:**
- `user_id`: ID único del usuario
- `username`: Nombre de usuario
- `role_id`: Rol del usuario (ADMIN, USER, MERCHANT)
- `exp`: Expiración del token (30 días)

**Errores comunes:**
```json
// Usuario no encontrado
{
  "error": "User not found"
}

// Contraseña incorrecta
{
  "error": "Invalid password"
}
```

---

## 💰 3. WALLETS (BILLETERAS STELLAR)

### 🔑 Generar Wallet
```http
POST /api/wallet/generate
```

**Respuesta:**
```json
{
  "public_key": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "secret_key": "SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:4000/api/wallet/generate
```

**⚠️ IMPORTANTE:** Guarda el `secret_key` de forma segura. No se puede recuperar después.

---

### 💸 Fondear Wallet (Solo Testnet)
```http
POST /api/wallet/fund
Content-Type: application/json

{
  "public_key": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Wallet funded successfully",
  "transaction_id": "abc123..."
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:4000/api/wallet/fund \
  -H "Content-Type: application/json" \
  -d '{
    "public_key": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }'
```

**Nota:** Este endpoint usa el Friendbot de Stellar Testnet para fondear con 10,000 XLM.

---

### 💵 Ver Balance de Wallet
```http
GET /api/wallet/{public_key}/balance
```

**Respuesta:**
```json
{
  "public_key": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "balances": [
    {
      "asset_type": "native",
      "balance": "10000.0000000"
    },
    {
      "asset_type": "credit_alphanum4",
      "asset_code": "USDC",
      "asset_issuer": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "balance": "500.0000000"
    }
  ],
  "total_xlm": "10000.0000000"
}
```

**Ejemplo cURL:**
```bash
curl http://localhost:4000/api/wallet/GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/balance
```

---

### 📤 Enviar Transacción
```http
POST /api/wallet/{public_key}/send
Content-Type: application/json

{
  "secret_key": "SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "destination": "GDESTINATIONXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "amount": "100.50"
}
```

**Respuesta:**
```json
{
  "success": true,
  "transaction_hash": "abc123...",
  "ledger": 12345,
  "source": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "destination": "GDESTINATIONXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "amount": "100.50"
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:4000/api/wallet/GXXX.../send \
  -H "Content-Type: application/json" \
  -d '{
    "secret_key": "SXXX...",
    "destination": "GDEST...",
    "amount": "100.50"
  }'
```

---

## ⭐ 4. SISTEMA DE REPUTACIÓN

### 📊 Ver Reputación de Usuario
```http
GET /api/reputation/{public_key}
```

**Respuesta:**
```json
{
  "public_key": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "score": 85.5,
  "total_transactions": 42,
  "successful_transactions": 40,
  "failed_transactions": 2,
  "success_rate": 95.24,
  "last_updated": "2025-10-30T18:35:04Z"
}
```

**Ejemplo cURL:**
```bash
curl http://localhost:4000/api/reputation/GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Cálculo del Score:**
- Base: 50 puntos
- +1 punto por transacción exitosa
- -5 puntos por transacción fallida
- Rango: 0-100

---

## 💱 5. CONVERSIÓN DE DIVISAS

### 💲 Convertir a USDC
```http
POST /api/convert/to-usdc
Content-Type: application/json

{
  "from_currency": "MXN",
  "amount": 1000.00
}
```

**Respuesta:**
```json
{
  "from_currency": "MXN",
  "to_currency": "USDC",
  "original_amount": 1000.00,
  "converted_amount": 58.82,
  "exchange_rate": 0.05882,
  "timestamp": "2025-10-30T18:35:04Z"
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:4000/api/convert/to-usdc \
  -H "Content-Type: application/json" \
  -d '{
    "from_currency": "MXN",
    "amount": 1000.00
  }'
```

**Monedas soportadas:**
- `MXN` - Peso Mexicano
- `USD` - Dólar Estadounidense
- `EUR` - Euro
- `USDC` - USD Coin

---

### 📈 Ver Tasas de Cambio
```http
GET /api/rates
```

**Respuesta:**
```json
{
  "base": "USDC",
  "rates": {
    "MXN": 17.00,
    "USD": 1.00,
    "EUR": 0.85
  },
  "timestamp": "2025-10-30T18:35:04Z"
}
```

**Ejemplo cURL:**
```bash
curl http://localhost:4000/api/rates
```

---

## 🏦 6. TRANSFERENCIAS BANCARIAS

### 💳 Crear Transferencia
```http
POST /api/bank/transfer
Content-Type: application/json

{
  "from_account": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "to_account": "GYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
  "amount": 500.00,
  "currency": "MXN",
  "reference": "Pago de servicios",
  "description": "Transferencia bancaria"
}
```

**Respuesta:**
```json
{
  "transfer_id": "uuid-transferencia",
  "status": "pending",
  "from_account": "GXXX...",
  "to_account": "GYYY...",
  "amount": 500.00,
  "currency": "MXN",
  "created_at": "2025-10-30T18:35:04Z"
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:4000/api/bank/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "from_account": "GXXX...",
    "to_account": "GYYY...",
    "amount": 500.00,
    "currency": "MXN",
    "reference": "Pago de servicios"
  }'
```

---

### 📋 Listar Transferencias (Admin)
```http
GET /api/admin/transfers
```

**Respuesta:**
```json
{
  "transfers": [
    {
      "id": "uuid-1",
      "from_account": "GXXX...",
      "to_account": "GYYY...",
      "amount": 500.00,
      "currency": "MXN",
      "status": "completed",
      "created_at": "2025-10-30T18:35:04Z"
    }
  ],
  "total": 42
}
```

**Ejemplo cURL:**
```bash
curl http://localhost:4000/api/admin/transfers
```

---

## 🔧 7. ENDPOINTS DE ADMINISTRACIÓN

### 📊 Estadísticas del Sistema
```http
GET /api/admin/stats
```

**Respuesta:**
```json
{
  "total_users": 150,
  "total_wallets": 150,
  "total_transactions": 1250,
  "total_volume": "125000.00",
  "active_users_24h": 45,
  "system_health": "healthy"
}
```

**Ejemplo cURL:**
```bash
curl http://localhost:4000/api/admin/stats
```

---

### 🏥 Health Details (Admin)
```http
GET /api/admin/health-details
```

**Respuesta:**
```json
{
  "status": "healthy",
  "uptime_seconds": 3600,
  "database": "connected",
  "stellar_network": "testnet",
  "horizon_status": "operational",
  "memory_usage_mb": 125.5,
  "cpu_usage_percent": 12.3
}
```

**Ejemplo cURL:**
```bash
curl http://localhost:4000/api/admin/health-details
```

---

### 🔐 Listar Cuentas AA (Account Abstraction)
```http
GET /api/admin/aa-accounts
```

**Respuesta:**
```json
{
  "aa_accounts": [
    {
      "id": "uuid-1",
      "public_key": "GXXX...",
      "user_id": "uuid-user",
      "created_at": "2025-10-30T18:35:04Z"
    }
  ],
  "total": 25
}
```

**Ejemplo cURL:**
```bash
curl http://localhost:4000/api/admin/aa-accounts
```

---

## 🤖 8. ACCOUNT ABSTRACTION (AA)

### 🚀 AA Relay Transaction
```http
POST /api/aa/relayer
Content-Type: application/json

{
  "sponsor_secret": "SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "user_pubkey": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "destination": "GYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
  "amount": "10.00"
}
```

**Respuesta:**
```json
{
  "success": true,
  "transaction_hash": "abc123...",
  "sponsor": "GXXX...",
  "user": "GXXX...",
  "destination": "GYYY...",
  "amount": "10.00",
  "gas_paid_by_sponsor": true
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:4000/api/aa/relayer \
  -H "Content-Type: application/json" \
  -d '{
    "sponsor_secret": "SXXX...",
    "user_pubkey": "GXXX...",
    "destination": "GYYY...",
    "amount": "10.00"
  }'
```

**Nota:** El sponsor paga las fees de la transacción del usuario.

## 🧪 Testing

### Backend (Rust)
```bash
cd BACKEND
cargo test
```

### Frontend (React)
```bash
cd FRONTEND/hackathon
npm test
```

### API con Postman

1. **Importar colección**: Usar la colección de Postman incluida
2. **Configurar variables**:
   - `base_url`: `http://localhost:4000/api`
3. **Ejecutar tests**: Usar el runner de Postman

## 📁 Estructura del Proyecto

```
hackathon-payments/
├── BACKEND/                    # Backend en Rust
│   ├── src/
│   │   ├── modules/
│   │   │   ├── controllers/    # Controladores de API
│   │   │   ├── models/         # Modelos de datos
│   │   │   ├── repositories/   # Acceso a datos
│   │   │   └── services/       # Lógica de negocio
│   │   ├── middleware/         # Middleware personalizado
│   │   ├── utils/              # Utilidades
│   │   └── main.rs             # Punto de entrada
│   ├── migrations/             # Migraciones de DB
│   ├── Cargo.toml              # Dependencias Rust
│   └── .env.example            # Variables de entorno
├── FRONTEND/                   # Frontend en React
│   └── hackathon/
│       ├── src/
│       ├── package.json
│       └── README.md
├── docs/                       # Documentación
└── README.md                   # Este archivo
```

## 🔧 Troubleshooting

### Error: "Address already in use"
```bash
# Encontrar proceso usando el puerto
lsof -i :4000

# Terminar proceso
kill <PID>
```

### Error: "DATABASE_URL not set"
```bash
export DATABASE_URL="sqlite://./wallet.db"
```

### Error: "sqlx command not found"
```bash
cargo install sqlx-cli
```

### Error: "Failed to compile"
```bash
# Limpiar cache de Cargo
cargo clean

# Recompilar
cargo build
```

### Error: "Migration failed"
```bash
# Verificar migraciones
sqlx migrate info

# Aplicar migraciones manualmente
sqlx migrate run
```

### Error: "table users has no column named pin_hash"

Este error ocurre cuando la base de datos fue creada con una versión anterior del esquema. **Solución:**

```bash
# Eliminar la base de datos existente
rm wallet.db

# Recrear la base de datos
sqlx database create

# Aplicar todas las migraciones
sqlx migrate run

# Verificar que las migraciones se aplicaron correctamente
sqlx migrate info
```

**⚠️ IMPORTANTE:** Esto eliminará todos los datos existentes. En producción, crear una migración adicional para agregar la columna.

### Error: "error returned from database: no such table: users"

Esto ocurre cuando `DATABASE_URL` no está configurado durante la compilación. **Solución:**

```bash
# Asegúrate de que DATABASE_URL esté configurado
export DATABASE_URL="sqlite://./wallet.db"

# Aplica las migraciones antes de compilar
sqlx migrate run

# Ahora compila
cargo build --release
```

### Error: "failed to parse lock file at Cargo.lock"

El archivo `Cargo.lock` está corrupto. **Solución:**

```bash
# Eliminar Cargo.lock
rm Cargo.lock

# Regenerar el archivo
cargo build --release
```

### Error: Firewall bloqueando el puerto 4000

En Google Cloud, necesitas abrir el puerto en el firewall:

1. Ve a **VPC Network → Firewall** en Google Cloud Console
2. Click en **"CREATE FIREWALL RULE"**
3. Configura:
   - **Name:** `allow-backend-4000`
   - **Direction:** Ingress
   - **Source IP ranges:** `0.0.0.0/0`
   - **Protocols and ports:** `tcp:4000`
4. Click **"CREATE"**

## 🚀 Despliegue

### Desarrollo Local
```bash
# Backend
cd BACKEND && cargo run

# Frontend
cd FRONTEND/hackathon && npm run dev
```

### Google Cloud VM (Producción)

#### 1. Crear VM en Google Cloud Console

**Características recomendadas:**
- **Tipo de máquina:** e2-medium (2 vCPUs, 4 GB RAM)
- **Sistema operativo:** Ubuntu 22.04 LTS o superior
- **Disco de arranque:** 10 GB SSD persistente
- **Firewall:**
  - ☑️ Permitir tráfico HTTP
  - ☑️ Permitir tráfico HTTPS
  - Agregar regla personalizada para puerto 4000 (backend)
  - Agregar regla personalizada para puerto 5173 (frontend Vite)

#### 2. Conectar a la VM

```bash
# Desde Google Cloud Console, usar SSH en el navegador
# O desde tu terminal:
gcloud compute ssh [NOMBRE-INSTANCIA] --zone [ZONA]
```

#### 3. Instalar dependencias en la VM

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Instalar SQLx CLI
cargo install sqlx-cli --no-default-features --features sqlite

# Instalar Node.js (para frontend)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Git
sudo apt install -y git
```

#### 4. Clonar y configurar el proyecto

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/hackathon-payments.git
cd hackathon-payments

# Ir al directorio del backend
cd BACKEND

# Configurar variables de entorno
export DATABASE_URL="sqlite://./wallet.db"
export JWT_SECRET="tu_secreto_jwt_super_seguro_produccion_cambiar_este_valor"
export SERVER_PORT=4000

# Crear y migrar la base de datos
sqlx database create
sqlx migrate run
```

#### 5. Compilar en modo release

```bash
# Desde BACKEND/
cargo build --release
```

**Nota:** La primera compilación puede tardar 10-15 minutos.

#### 6. Ejecutar el backend en producción

```bash
# Ejecutar en segundo plano con nohup
nohup cargo run --release > ~/backend.log 2>&1 &

# Ver logs en tiempo real
tail -f ~/backend.log

# Detener el proceso si es necesario
ps aux | grep wallet-backend
kill [PID]
```

#### 7. Configurar Firewall en Google Cloud

1. Ve a **VPC Network → Firewall** en Google Cloud Console
2. Crea las siguientes reglas:

**Regla para Backend (Puerto 4000):**
```
Name: allow-backend-4000
Direction: Ingress
Targets: All instances in the network
Source IP ranges: 0.0.0.0/0
Protocols and ports: tcp:4000
```

**Regla para Frontend (Puerto 5173):**
```
Name: allow-frontend-5173
Direction: Ingress
Targets: All instances in the network
Source IP ranges: 0.0.0.0/0
Protocols and ports: tcp:5173
```

#### 8. Verificar el despliegue

```bash
# Obtener la IP externa de tu VM
curl ifconfig.me

# Probar el endpoint de health
curl http://[IP-EXTERNA]:4000/api/health

# Deberías ver:
# {"service":"wallet-backend","status":"ok","version":"0.1.0"}
```

#### 9. Actualizar el código en la VM

```bash
cd ~/hackathon-payments
git pull origin main

cd BACKEND
cargo build --release

# Reiniciar el servidor
ps aux | grep wallet-backend
kill [PID]
nohup cargo run --release > ~/backend.log 2>&1 &
```

#### 10. (Opcional) Configurar servicio systemd

Para que el backend se inicie automáticamente al reiniciar la VM:

```bash
# Crear archivo de servicio
sudo nano /etc/systemd/system/hackathon-backend.service
```

Contenido del archivo:
```ini
[Unit]
Description=Hackathon Backend Service
After=network.target

[Service]
Type=simple
User=TU_USUARIO
WorkingDirectory=/home/TU_USUARIO/hackathon-payments/BACKEND
Environment="DATABASE_URL=sqlite://./wallet.db"
Environment="JWT_SECRET=tu_secreto_jwt_super_seguro"
Environment="SERVER_PORT=4000"
ExecStart=/home/TU_USUARIO/.cargo/bin/cargo run --release
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# Activar el servicio
sudo systemctl daemon-reload
sudo systemctl enable hackathon-backend
sudo systemctl start hackathon-backend

# Ver estado
sudo systemctl status hackathon-backend

# Ver logs
sudo journalctl -u hackathon-backend -f
```

## 📝 Notas de Desarrollo

- **Base de datos**: SQLite para desarrollo, PostgreSQL para producción
- **Red Stellar**: Testnet por defecto, cambiar a mainnet para producción
- **Logging**: Configurado con `tracing` para debugging
- **Seguridad**: Validación de inputs y manejo de errores

## 🤝 Contribución

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Para soporte, crear un issue en el repositorio o contactar al equipo de desarrollo.

---

**¡Happy Hacking! 🚀**