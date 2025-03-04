# GTD Microservice System

pip install -e .
pip install -e '.[dev]'

## Core Architecture
- **Framework**: FastAPI (ASGI)
- **Database**: PostgreSQL + asyncpg
- **Storage**: MinIO (S3-compatible)
- **Cache**: Redis (Session store + future caching)
- **Auth**: Authentik + FastAPI-Users
- **Monitoring**: Prometheus + Grafana
- **Logging**: Structlog + JSON formatting

## Service Structure

src/
├── core/
│ ├── security/ # Auth, CSRF, Session mgmt
│ ├── storage/ # MinIO/S3 abstraction
│ └── config/ # Pydantic settings
├── modules/
│ └── inbox/ # First feature module
│ ├── routes/ # API endpoints
│ ├── services/ # Business logic
│ └── repos/ # DB repositories
└── tests/
├── factories/ # Factory Boy models
└── e2e/ # Testcontainers tests


## Authentication Flow
1. Mobile app initiates OIDC flow with Authentik
2. User authenticates (password/webauthn/etc)
3. Authentik issues auth code to mobile
4. Mobile exchanges code for session cookie
5. Subsequent requests include:
   - Session cookie (HTTP-only, Secure)
   - CSRF token in header
   - CORS preflight for web app

## Development Setup

Using Docker compose
docker compose -f docker-compose.dev.yml up
Includes:
- Postgres:5432
- Redis:6379
- MinIO:9000
- Authentik:9001 (optional)



## Key Packages
| Package              | Purpose                     |
|----------------------|-----------------------------|
| fastapi-users        | Auth management             |
| asyncpg              | Async Postgres              |
| aioboto3             | Async MinIO/S3              |
| redis                | Async Redis client          |
| factory-boy          | Test data generation        |
| testcontainers       | Integration testing         |
| fastapi-csrf-protect | CSRF protection             |


## migration commands
alembic revision --autogenerate -m "migration message"
alembic upgrade head
alembic downgrade -1