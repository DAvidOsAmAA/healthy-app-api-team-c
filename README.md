# NestJS Enterprise Boilerplate

A progressive, production-ready NestJS starter template configured with enterprise-grade tooling, adhering strictly to **Clean Architecture**, **SOLID principles**, and industry best practices.

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)

### ⚙️ Installation

Clone the repository and install the development and production dependencies:

```bash
npm install
```

### 💻 Running the Application

You can spin up the application in different modes depending on your workflow:

```bash
# Start in watch/development mode (recommended for local development)
npm run start:dev

# Start in debug mode
npm run start:debug

# Compile and run production build
npm run start:prod
```

### 🧪 Running Tests

Ensure system reliability by running the test suites:

```bash
# Run unit tests
npm run test

# Run end-to-end (e2e) tests
npm run test:e2e

# Run test coverage report
npm run test:cov
```

### 🧹 Linting & Formatting

Keep the codebase clean, readable, and consistent:

```bash
# Run ESLint to check for syntax and style issues without making changes (used in Pre-commit hook)
npm run lint:check

# Run ESLint to find and automatically fix issues
npm run lint

# Run Prettier to format the codebase
npm run format
```

---

## 📂 Project Folder Structure

This repository follows a strict structure designed for maximum modularity, scalability, and ease of maintenance. Below is the workspace layout, including the configuration, documentation, and source directories:

```text
.
├── .github/            # GitHub configurations (workflows, templates)
│   ├── workflows/      # Automated CI/CD (branch checks, PR titles, linting)
│   └── pull_request_template.md
│
├── .husky/             # Git hooks (pre-commit lint verification)
│
├── docs/               # System and developer documentation (best practices, onboarding)
│   └── git_github_best_practices.md
│
├── src/                # Application source code
│   ├── common/         # Reusable, cross-cutting concerns (decorators, pipes, filters, interceptors)
│   │   ├── decorators/ # Custom NestJS decorators
│   │   ├── filters/    # Exception filters
│   │   ├── interceptors/ # Global and scoped interceptors
│   │   ├── pipes/      # Validation and transformation pipes
│   │   └── utils/      # Generic helper functions and shared types
│   │
│   ├── core/           # Global/Singleton layers (database, guards, configurations)
│   │   ├── config/     # Environment validation schemas and configuration module
│   │   ├── database/   # ORM setup, connections
│   │   ├── guards/     # Security and authorization guards
│   │   └── interceptors/ # Performance and core application interceptors
│   │
│   ├── modules/        # Feature-driven business domain slices
│   │   └── [feature]/  # Modular vertical slices (e.g. auth, users, products)
│   │       ├── dto/    # Data Transfer Ob§jects
│   │       ├── entities/ # Database schemas or domain models
│   │       ├── repositories/ # Database repositories (abstraction over entities)
│   │       ├── migrations/ # Database migrations
│   │       ├── controllers/ # HTTP route handlers
│   │       ├── services/ # Business logic
│   │       └── [feature].module.ts
│   │
│   ├── app.module.ts   # Root module of the application
│   └── main.ts         # Application entry point (bootstraps NestJS app)
│
├── .env                # Environment variables (not in git)
├── .env.example        # Environment variables example
├── eslint.config.mjs   # ESLint 9 configuration (Google standards + Prettier)
├── tsconfig.json       # TypeScript configuration (strict options)
├── docker-compose.yml  # Docker Compose configuration for local development
├── dockerfile          # Dockerfile for building the application
└── README.md
```

### 🧩 Architectural Layers & Responsibilities

- **`docs/`**:
  - Houses **all application documentation, onboarding guides, best practices, and system designs**.
  - Acts as the single source of truth for developer workflows, Git standards, and operational guidelines.
  - Keeping this directory accurate and updated is vital for seamless engineering onboarding and clean collaborative development.

- **`src/core/`**:
  - **Single Source of Truth** for configuration and external systems integrations.
  - Houses database initialization, global security configurations (guards, CORS, helmet), and base modules that must load once at application startup.
  - Direct dependencies on external infrastructure (like databases, Redis, etc.) are encapsulated here.

- **`src/common/`**:
  - Contains **stateless, independent utility logic** that is entirely decoupled from the business domain.
  - Holds reusable validation pipes, customized logging interceptors, global format decorators, and utility helper functions.
  - Logic inside `common/` must be highly testable, generic, and usable across multiple feature modules without introducing side effects.

- **`src/modules/`**:
  - The **heart of the application** containing dedicated, feature-driven business domains.
  - Follows a vertical slice structure: each module is self-contained and encapsulates its own routing (`controllers`), business rules (`services`), data validations (`dto`), and persistence schemas (`entities`).
  - This encapsulation ensures high cohesion, loose coupling, and a clear separation of concerns, complying directly with the **Single Responsibility Principle**.
