# 🚀 NestJS + TypeORM Learning Plan

## 🎯 Obiectiv

Să învăț NestJS împreună cu TypeORM la nivel **production-ready**, construind un API real.

---

## ⏱️ Durată estimată

* Total: **2–3 săptămâni**
* Timp zilnic recomandat: **2–4h**

---

## 🧱 Setup inițial (Ziua 0)

* Instalează NestJS CLI
* Creează proiect:

```bash
npm i -g @nestjs/cli
nest new backend
```

* Instalează TypeORM:

```bash
npm install @nestjs/typeorm typeorm pg
```

---

## 📅 Săptămâna 1 — Fundamente NestJS + TypeORM

### Ziua 1 — Structura NestJS

* Module
* Controller
* Service

👉 Task:

* Creează un modul `users`
* Endpoint: `GET /users`

---

### Ziua 2 — TypeORM Setup

* Config DB (PostgreSQL)
* DataSource
* Prima entitate

👉 Task:

* Creează `User` entity:

```ts
id, email, createdAt
```

---

### Ziua 3 — CRUD basic

* Repository pattern
* Create / Read / Delete

👉 Task:

* `POST /users`
* `GET /users`
* `DELETE /users/:id`

---

### Ziua 4 — Relații

* OneToMany / ManyToOne

👉 Task:

* Creează `Post` entity
* User → Posts relation

---
 
### Ziua 5 — DTO + Validation

* class-validator
* Pipes

👉 Task:

* Validare email
* DTO pentru create user

---

### Ziua 6 — Error handling

* Exceptions
* Filters (basic)

---

### Ziua 7 — Recap + Mini proiect

👉 Creează:

* Users + Posts API complet

---

## 📅 Săptămâna 2 — NestJS Advanced

### Ziua 8 — Dependency Injection (deep)

* Providers
* Custom providers

---

### Ziua 9 — Guards (Auth)

* JWT Auth
* Protect routes

👉 Task:

* Login endpoint
* Protected `/users`

---

### Ziua 10 — Interceptors

* Logging
* Response transform

---

### Ziua 11 — Middleware vs Guards vs Interceptors

👉 Înțelege flow complet request

---

### Ziua 12 — Query Builder

* Query-uri complexe
* Joins

👉 Task:

* Filtrare users după post count

---

### Ziua 13 — Transactions

* Data consistency

---

### Ziua 14 — Refactor + Structură clean

* Modules organizate
* Separare logică

---

## 📅 Săptămâna 3 — Production Ready

### Ziua 15 — Config & Env

* ConfigModule
* Variabile de mediu

---

### Ziua 16 — Logging & Monitoring

* Logger custom

---

### Ziua 17 — Pagination

👉 Task:

* `GET /users?page=1&limit=10`

---

### Ziua 18 — Soft delete

* @DeleteDateColumn

---

### Ziua 19 — Best Practices

* Structură enterprise
* Naming conventions

---

### Ziua 20 — Final Project

👉 Construiește:

* Auth (JWT)
* Users
* Posts
* Pagination
* Relations
* Validation

---

## 🧠 Reguli importante

* ❌ Nu copia cod fără să înțelegi
* ❌ Nu sta în tutoriale mai mult de 30%
* ✅ Construiește în paralel cu învățarea
* ✅ Debug > memorare

---

## 💡 Bonus (pentru tine)

După ce termini:
👉 Integrează în proiectul tău real:

* AI app (interior design)
* Auth + upload + DB logic

---

## 🏁 Outcome final

După plan:

* Înțelegi NestJS architecture
* Știi TypeORM (relations + query builder)
* Poți construi API-uri scalabile
* Ești ready pentru interviuri backend

---

## 🚀 Next Step

După acest plan:

* Microservices (NestJS)
* Caching (Redis)
* Queues (BullMQ)

---
