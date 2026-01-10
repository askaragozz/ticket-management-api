Tech Stack

Runtime: Node.js + Express
Language: TypeScript (ESM / NodeNext)
Database: PostgreSQL (Docker)
ORM: Prisma v7
DB Driver: pg via Prisma adapter
Dev Runner: tsx
Containerization: Docker + Docker Compose

Project Status (Current)

✅ Docker setup (WSL compatible)
✅ PostgreSQL running in Docker
✅ Prisma v7 configured with Postgres adapter
✅ Database connection validated over TCP
✅ Initial migration applied
✅ Health check endpoint working

Prerequisites

Docker Desktop (with WSL integration enabled)
Node.js (18+ recommended)
npm

Environment Variables
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/ticketdb?schema=public

Docker (Postgres)
docker compose up -d
Stop and reset database (removes data)
docker compose down -v

Prisma
npx prisma generate
npx prisma migrate dev --name init

Running the API (Development)
npm run dev

Health Check
GET /health

Example response => { "ok": true, "db": "up" }

Notes on Prisma v7 Setup
schema.prisma does not contain the database URL
Connection is handled via:
prisma.config.ts
Prisma Postgres adapter (@prisma/adapter-pg)
Prisma Client is initialized with an explicit adapter