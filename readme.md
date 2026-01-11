# Ticket API (Node.js + TypeScript)

A backend-only REST API project built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **Prisma**. This project is designed as a portfolio-grade backend application focusing on clean architecture, validation, authentication, and real-world API patterns.

---

## 🎯 Project Goals

* Build a production-style REST API using modern Node.js tooling
* Practice **TypeScript-first backend development**
* Implement **schema validation**, **authentication**, and **authorization**
* Use **Prisma ORM** with PostgreSQL for relational data modeling
* Follow clean, incremental development (day-by-day milestones)

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **TypeScript**
* **PostgreSQL**
* **Prisma ORM**
* **Zod** – runtime schema validation
* **JWT** – authentication
* **tsx** – TypeScript execution & watch mode

---

## 📦 Installed Packages (So Far)

### Runtime

* `express`
* `zod`
* `@prisma/client`
* `jsonwebtoken`
* `pg`

### Dev / Tooling

* `typescript`
* `tsx`
* `prisma`
* `@types/express`
* `@types/jsonwebtoken`
* `@types/node`
* `@types/pg`

---

## 🧠 Key Concepts Used

### Zod

* Request **query**, **params**, and **body** validation
* Centralized validation middleware
* Early request rejection with meaningful errors

### Prisma

* Type-safe database access
* Schema-based data modeling
* Clear separation between database and business logic

---

## 🔐 Authentication

* JWT-based authentication
* `requireAuth` middleware protects private routes
* Auth context injected into `req.user`

---

## 🧩 Middleware

* `requireAuth` – blocks unauthenticated access
* `validateQuery` – validates query parameters using Zod
* `validateBody` - validates body parameters using Zod
* `validateParams` - validates params using Zod

---

## 📂 Project Structure

```
src/
 ├─ server.ts
 ├─ app.ts
 ├─ routes/
 ├─ controllers/
 ├─ middleware/
 ├─ prisma/
 │   └─ schema.prisma
 └─ utils/
```

---

## 🚀 Running the Project

```bash
npm install
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

## 📆 Progress Log

### Day 1

* Project setup
* Express + TypeScript configuration
* Prisma + PostgreSQL connection

### Day 2

* Auth middleware
* Zod validation middleware
* First protected routes

### Day 3 (Starting)

* README update
* Deeper validation patterns
* Feature expansion

---

## 🔜 Next Steps

* Request body & param validation middleware
* Error handling standardization
* Ticket domain modeling
* Pagination & filtering

---

## 📌 Notes

This project is intentionally backend-only and focused on demonstrating **backend engineering skills** rather than UI or frontend concerns.
