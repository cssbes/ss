# Auth App

A production-ready authentication and user management application built with Next.js 15, TypeScript, TailwindCSS, Prisma, and PostgreSQL.

## Features

- **Authentication** - Login, register, forgot password, reset password, email verification
- **Role Management** - Admin and user roles with route protection
- **Admin Dashboard** - Full CRUD management with soft delete, bulk actions, and CSV export
- **User Settings** - Profile editing, password change, theme switching
- **Modern UI** - shadcn/ui components, dark mode, responsive design
- **Docker Ready** - Full Docker Compose setup for local development
- **Render Deploy** - One-click deployment with included render.yaml

## Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd auth-app

# Start the application
docker compose up --build
```

Visit http://localhost:3000

### Default Accounts

| Role  | Email              | Password   |
|-------|--------------------|------------|
| Admin | admin@authapp.com  | Admin123!  |
| User  | user@authapp.com   | User1234!  |

## Deploy to Render

1. Push this repository to GitHub
2. In Render dashboard, click **New +** > **Blueprint**
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Click **Apply**

The database will be provisioned automatically.

## Environment Variables

| Variable              | Description              | Default                        |
|-----------------------|--------------------------|--------------------------------|
| `DATABASE_URL`        | PostgreSQL connection    | `postgresql://postgres:postgres@db:5432/auth_app` |
| `AUTH_SECRET`         | NextAuth secret          | (auto-generated in production) |
| `AUTH_URL`            | Auth URL                 | `http://localhost:3000`        |
| `SMTP_HOST`           | SMTP server              | `smtp.gmail.com`               |
| `SMTP_PORT`           | SMTP port                | `587`                          |
| `SMTP_USER`           | SMTP username            |                                |
| `SMTP_PASS`           | SMTP password            |                                |
| `EMAIL_FROM`          | From address             | `noreply@authapp.com`          |
| `NEXT_PUBLIC_APP_URL` | Public app URL           | `http://localhost:3000`        |

## Project Structure

```
auth-app/
├── prisma/                # Database schema and migrations
├── src/
│   ├── app/               # Next.js App Router pages and API
│   │   ├── (auth)/        # Authentication pages
│   │   ├── (dashboard)/   # Dashboard pages
│   │   └── api/           # API routes
│   ├── components/        # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── auth/          # Auth form components
│   │   ├── landing/       # Landing page components
│   │   ├── layout/        # Layout components
│   │   └── shared/        # Shared components (DataTable, etc.)
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilities, auth config, validations
│   ├── actions/           # Server actions
│   ├── types/             # TypeScript types
│   └── middleware.ts      # Route protection
├── Dockerfile
├── docker-compose.yml
└── render.yaml
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: TailwindCSS
- **UI**: shadcn/ui + Radix Primitives
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v5 (Auth.js)
- **Validation**: Zod
- **Container**: Docker
- **Deploy**: Render
