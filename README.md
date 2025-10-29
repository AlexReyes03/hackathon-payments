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

### Health & Admin
- `GET /api/health` - Health check
- `GET /api/admin/stats` - Estadísticas del sistema
- `GET /api/admin/health-details` - Detalles del sistema

### Wallets
- `POST /api/wallet/generate` - Generar nueva wallet
- `POST /api/wallet/fund` - Fondear wallet

### Transferencias
- `POST /api/bank/transfer` - Transferencia bancaria
- `GET /api/bank/transfers/{wallet_id}` - Historial de transferencias

### Reputación
- `GET /api/reputation/{public_key}` - Obtener score de reputación
- `POST /api/reputation/calculate` - Recalcular reputación

### Conversión
- `POST /api/convert` - Convertir entre monedas

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

## 🚀 Despliegue

### Desarrollo
```bash
# Backend
cd BACKEND && cargo run

# Frontend
cd FRONTEND/hackathon && npm run dev
```

### Producción
```bash
# Backend
cd BACKEND && cargo run --release

# Frontend
cd FRONTEND/hackathon && npm run build && npm run start
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