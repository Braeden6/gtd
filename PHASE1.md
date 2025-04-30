# GTD Phase 1 - Detailed User Experience

## Core Workflow Overview
The Phase 1 experience focuses on the fundamental GTD principle: getting things out of your head and into a trusted system. The workflow follows three main stages: Capture → Process → Organize.

## Detailed User Flows

### 1. Capture Flow
The capture interface is always one click/tap away, designed to be as frictionless as possible.

#### Quick Capture Interface
- Large, prominent "+" button always visible in the corner
- Opens a simple text input box immediately
- No required fields initially - just start typing
- Optional quick buttons for common inputs:
  - Task (default)
  - Note
  - File Upload
  - Link

#### Capture Experience
- Users can write anything from a single line to multiple paragraphs
- No pressure to organize yet - just get it out of their head
- Each entry automatically timestamps and saves to Inbox
- Quick close button to return to previous activity
- Optional "Add Another" button for batch capture

### 2. Processing Flow
Processing happens either immediately after capture (if user chooses) or during dedicated processing time.

#### Inbox Processing
- Inbox shows all unprocessed items chronologically
- Each item has quick-action buttons:
  - "Do it now" (for 2-minute tasks)
  - "Process it" (opens processing flow)
  - "Process later" (keeps in inbox)

#### Processing Questions Flow
When "Process it" is clicked, user is guided through GTD decisions:
1. "Is this actionable?"
  - Yes → Continues to action flow
  - No → Options appear:
    - Reference (file it)
    - Someday/Maybe (incubate)
    - Trash (delete)

2. If actionable:
  - "Can it be done in 2 minutes?"
    - Yes → Mark as "Do Now"
    - No → Continue to organization

3. "Is this part of a project?"
  - Yes → Option to create/select project
  - No → Continue as single action

4. "What's the next action?"
  - Add clear next action description
  - Optional: Add due date
  - Optional: Add context (@home, @work, @errands)

### 3. Organization Views

#### Main Navigation
- Inbox (unprocessed items)
- Next Actions (all actionable tasks)
- Projects (grouped actions)
- Waiting For
- Someday/Maybe
- Reference

#### Projects View
- Simple list of projects
- Each project shows:
  - Project name
  - Number of next actions
  - Latest activity
  - Basic progress indicator

#### Next Actions View
- Shows all next actions
- Simple context filtering (@home, @work, etc.)
- Basic due date sorting
- Ability to mark complete

#### Reference View
- Simple list of reference items
- Basic search functionality
- Ability to attach files

### 4. Weekly Review
A guided checklist that walks through:
1. Process Inbox to zero
2. Review Next Actions
3. Review Projects
4. Review Waiting For
5. Review Someday/Maybe

## Key User Interface Elements

### Main Dashboard
- Inbox count (prominent if items need processing)
- Quick capture button (always accessible)
- Today's actions (if any due)
- Active projects summary
- Simple navigation menu

### Task Details
- Title
- Notes/details
- Project association (if any)
- Context tag
- Due date (optional)
- Status (Next Action, Waiting For, Reference, etc.)

### Project Details
- Project name
- Project notes
- List of associated next actions
- Simple status (Active/Complete)

## Important UX Principles for Phase 1
1. **Capture Speed**: Users should be able to capture thoughts in 2 seconds or less
2. **Processing Clarity**: Clear, guided decisions during processing
3. **Minimal Fields**: Only essential information required
4. **Quick Access**: Core views accessible in one click
5. **Trust Building**: Everything captured is easily findable
6. **Review Support**: Clear checklist for weekly review

## Phase 1 Limitations (Intentional)
- No recurring tasks
- No subtasks
- No priority levels
- No due times (only dates)
- No sharing/collaboration
- Basic file attachments only
- Simple search only


# GTD Application Technical Stack

## Backend Stack

### Core
- **Go 1.22+**: Backend language
- **Echo**: HTTP framework
- **GORM**: ORM with PostgreSQL
- **Air**: Hot reload for development

### Database
- **PostgreSQL**: Primary database
- **GORM Migrations**: Database schema management

### Project Structure
```
backend/
├── cmd/
│   └── server/         # Application entry point
│       └── main.go
├── internal/
│   ├── domain/         # Business entities & interfaces
│   │   ├── inbox.go
│   │   ├── project.go
│   │   └── task.go
│   ├── service/        # Business logic
│   │   ├── inbox.go
│   │   └── project.go
│   ├── repository/     # Data access
│   │   └── postgres/
│   │       ├── inbox.go
│   │       └── project.go
│   ├── api/           # HTTP handlers
│   │   ├── inbox.go
│   │   └── router.go
│   └── database/      # Database configuration
│       └── postgres.go
└── pkg/               # Shared utilities
```

### Key Components
- **Domain Layer**: Core business entities and repository interfaces
- **Service Layer**: Business logic implementation
- **Repository Layer**: Database operations
- **API Layer**: HTTP handlers and routing
- **Database Layer**: Connection and migrations

### Development Tools
- **golangci-lint**: Linting
- **Air**: Hot reload
- **Make/Task**: Build automation

### Development Commands
```makefile
# Backend
backend-dev:     # Run with Air
backend-build:   # Build binary
backend-test:    # Run tests
backend-lint:    # Run linter
```

### Local Development Setup
```bash
# Initial setup
go mod download
go install github.com/cosmtrek/air@latest

# Development
air            # localhost:3000
```

### Database Setup
```bash
# PostgreSQL via Docker Compose
docker-compose up -d postgres

# Migrations handled by GORM
# Auto-migrates on application startup
```

### API Endpoints
- `POST /api/inbox`: Create inbox item
- `GET /api/inbox`: List inbox items
- `GET /api/inbox/:id`: Get inbox item
- `PUT /api/inbox/:id`: Update inbox item
- `DELETE /api/inbox/:id`: Delete inbox item


## Frontend Stack

### Build & Development
- **Vite**: Modern build tool and dev server
- **pnpm**: Fast, disk-efficient package manager
- **TypeScript**: Type safety and better DX

### UI Framework & Components
- **React 18+**: UI framework
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **Lucide Icons**: Modern icon set

### State Management & Data Fetching
- **TanStack Query**: Data fetching, caching, and sync
- **Zustand**: Simple state management
- **Zod**: Runtime type validation

### Development Tools
- **ESLint**: Linting
- **Prettier**: Code formatting
- **Vitest**: Unit testing
- **Testing Library**: Component testing
- **MSW**: API mocking

## Backend Stack

### Core
- **Go 1.22+**: Backend language
- **Chi**: Lightweight router
- **Air**: Hot reload for development

### Database
- **SQLite**: Initial database (via SQLite3)
- **sqlc**: Type-safe SQL
- **golang-migrate**: Database migrations

### API & Middleware
- **CORS middleware**: Cross-origin support
- **go-chi/middleware**: Logging, recovery, etc.
- **golang-jwt**: JWT authentication
- **validator**: Request validation

### Development Tools
- **golangci-lint**: Linting
- **gotests**: Test generation
- **gomock**: Mocking for tests
- **zerolog**: Structured logging

## Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn components
│   │   └── features/    # feature components
│   ├── hooks/           # custom hooks
│   ├── lib/             # utilities
│   ├── api/             # API client
│   ├── stores/          # Zustand stores
│   ├── types/           # TypeScript types
│   └── styles/          # Global styles
├── public/              # Static assets
└── vite.config.ts
```

## Development Environment

### Required Tools
- Go 1.22+
- Node.js 18+
- pnpm
- SQLite3
- Docker (optional)
- Make or Task

### Development Commands
```makefile
# Frontend
frontend-dev:    # Run Vite dev server
frontend-build:  # Build for production
frontend-test:   # Run tests

# Backend
backend-dev:     # Run with Air
backend-build:   # Build binary
backend-test:    # Run tests
migrate:         # Run database migrations

# Combined
dev:            # Run both frontend and backend
build:          # Build all components
test:           # Test everything
```

## Local Development Setup

### Frontend
```bash
# Development
pnpm install
pnpm dev        # localhost:5173

# Production build
pnpm build
pnpm preview
```

### Backend
```bash
# Initial setup
go mod download
go install github.com/cosmtrek/air@latest

# Development
air            # localhost:3000

# Migration
migrate create -ext sql -dir migrations -seq add_users_table
migrate up
```

## Deployment (Phase 1)

### Simple Deployment
- **Frontend**: Static files served by Caddy
- **Backend**: Systemd service
- **Database**: SQLite file with backup strategy
- **Reverse Proxy**: Caddy (automatic HTTPS)

### Directory Structure
```
/opt/gtd/
├── frontend/        # Built static files
├── backend/         # Go binary
├── data/           # SQLite database
└── Caddyfile       # Reverse proxy config
```

### Systemd Service
```ini
[Unit]
Description=GTD Backend Service

[Service]
ExecStart=/opt/gtd/backend/gtd-server
WorkingDirectory=/opt/gtd
User=gtd
Restart=always

[Install]
WantedBy=multi-user.target
```

## Performance Considerations

### Early Optimizations
- **Frontend**:
  - Route-based code splitting
  - Asset optimization
  - Proper caching headers

- **Backend**:
  - Connection pooling
  - Query optimization
  - Basic caching
  - Proper indexing

### Scale Preparation
- Database abstraction for PostgreSQL migration
- Containerization ready
- Stateless design
- Monitoring hooks

## Security Measures
- HTTPS only
- JWT authentication
- SQL query parameterization
- Input validation
- CORS configuration
- Secure headers
- Rate limiting

## Monitoring & Logging
- Structured logging (zerolog)
- Basic metrics (requests, errors, latency)
- Error tracking
- Database query logging

## Future Considerations
1. PostgreSQL migration path
2. Redis for caching
3. Container deployment
4. Load balancing
5. CDN integration
6. Worker processes
7. Real-time updates
8. API versioning

This stack provides a solid foundation for Phase 1 while keeping the door open for future scaling and features. Would you like me to elaborate on any particular aspect?