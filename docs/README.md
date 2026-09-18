# Namo Patro 🗓️

> Nepal's premier digital calendar, panchang, and lifestyle platform — built with Next.js, Node.js, and PostgreSQL.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue?logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Database Setup](#2-database-setup)
  - [3. Backend Setup](#3-backend-setup)
  - [4. Frontend Setup](#4-frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Frontend Pages](#frontend-pages)
- [Authentication Flow](#authentication-flow)
- [Seeded Data](#seeded-data)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

---

## Overview

Namo Patro is a full-stack Nepali digital calendar and lifestyle application that offers:

- 📅 **Bikram Sambat (BS) ↔ AD date conversion**
- 🌙 **Daily Panchang** — Tithi, Vara, Nakshatra, Yoga, Karana
- 🎉 **Festival listings** with BS and AD dates
- 🔭 **Astrology & Rashifal** (daily horoscope)
- 💹 **Finance tools** — Forex, NEPSE, gold/silver prices, vegetable rates
- 📻 **Live Radio** streaming
- 📰 **News aggregation**
- 🏥 **Health & Utilities**
- 💰 **Wallet & reminders**
- 🔐 **JWT-based user authentication**

---

## Tech Stack

| Layer    | Technology                                  |
|----------|---------------------------------------------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Axios |
| Backend  | Node.js, Express 4, JWT, bcryptjs           |
| Database | PostgreSQL 14+, `pg` (node-postgres)        |
| Auth     | JWT (jsonwebtoken) + bcryptjs               |
| Dev Tools| nodemon, TypeScript 5                       |

---

## Project Structure

```
Namo-Patro/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── astrology/          # Rashifal endpoints
│   │   │   ├── calendar/           # BS/AD conversion & Panchang
│   │   │   ├── festivals/          # Festival listing endpoints
│   │   │   ├── finance/            # Forex, NEPSE, metal prices
│   │   │   ├── radio/              # Radio station endpoints
│   │   │   ├── users/              # Auth (register / login / profile)
│   │   │   └── utilities/          # Dictionary, unit converter, etc.
│   │   ├── config/
│   │   │   └── db.js               # PostgreSQL connection pool
│   │   ├── services/
│   │   │   ├── authMiddleware.js   # JWT verification middleware
│   │   │   ├── calendarService.js  # BS/AD conversion logic
│   │   │   └── festivalService.js  # Festival data helpers
│   │   └── index.js                # Express app entry point (port 5000)
│   └── package.json
│
├── frontend/
│   ├── components/
│   │   ├── CalendarGrid.tsx
│   │   ├── DateCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── PanchangIcons.tsx
│   │   ├── SacredBackground.tsx
│   │   └── ZodiacIcon.tsx
│   ├── pages/
│   │   ├── index.tsx               # Home — Nepali calendar view
│   │   ├── converter.tsx           # BS ↔ AD date converter
│   │   ├── festivals.tsx           # Festival grid
│   │   ├── panchang.tsx            # Daily Panchang
│   │   ├── astrology.tsx           # Rashifal / horoscope
│   │   ├── finance.tsx             # Forex, NEPSE, prices
│   │   ├── entertainment.tsx       # Entertainment hub
│   │   ├── radio.tsx               # Live radio player
│   │   ├── news.tsx                # News feed
│   │   ├── health.tsx              # Health & wellness
│   │   ├── utilities.tsx           # Dictionary, tools
│   │   ├── wallet.tsx              # Wallet & transactions
│   │   ├── meet.tsx                # Meet / connect
│   │   └── pricing.tsx             # Pricing plans
│   ├── utils/
│   │   └── dateFormatter.ts        # Nepali digit formatting helpers
│   ├── styles/
│   │   └── globals.css
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── database/
│   ├── migrations/
│   │   └── 001_init.sql            # Creates all tables
│   └── seed/
│       ├── festivals.sql           # Seeds major Nepali festivals
│       └── seed_all.sql            # Full seed runner
│
└── docs/
    └── README.md
```

---

## Prerequisites

Make sure you have the following installed before starting:

| Tool | Minimum Version | Download |
|------|----------------|----------|
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | Bundled with Node.js |
| PostgreSQL | 14+ | https://www.postgresql.org/download |
| Git | Any | https://git-scm.com |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Namo-Patro.git
cd Namo-Patro
```

---

### 2. Database Setup

#### Create the database

```bash
psql -U postgres -c "CREATE DATABASE nepali_calendar;"
```

#### Run migrations (creates all tables)

```bash
psql -U postgres -d nepali_calendar -f database/migrations/001_init.sql
```

#### Seed initial data

```bash
# Seed festivals only
psql -U postgres -d nepali_calendar -f database/seed/festivals.sql

# Or run the full seed
psql -U postgres -d nepali_calendar -f database/seed/seed_all.sql
```

> **Windows users:** Open `psql` via the PostgreSQL application or add it to your PATH, then run the commands above in PowerShell or Command Prompt.

> **Tip:** If your PostgreSQL user is not `postgres`, replace `-U postgres` with your actual username.

---

### 3. Backend Setup

```bash
cd backend
npm install
```

Create the environment file:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

Then open `backend/.env` and fill in your values (see [Environment Variables](#environment-variables)).

---

### 4. Frontend Setup

```bash
cd frontend
npm install
```

No additional environment configuration is required for the frontend by default. If your backend runs on a different port, create a `frontend/.env.local` and set:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Environment Variables

Create `backend/.env` with the following keys:

```env
# Server
PORT=5000

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nepali_calendar
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
```

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Express server port | `5000` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `nepali_calendar` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | _(required)_ |
| `JWT_SECRET` | Secret key for JWT signing | _(required)_ |

---

## Running the App

Open **two separate terminals** and run:

**Terminal 1 — Backend**

```bash
cd backend
npm run dev
```

> Server starts at **http://localhost:5000**

**Terminal 2 — Frontend**

```bash
cd frontend
npm run dev
```

> App opens at **http://localhost:3000**

### Quick Health Check

```bash
curl http://localhost:5000/health
# → { "status": "ok", "timestamp": "..." }
```

| Service  | URL                              |
|----------|----------------------------------|
| Frontend | http://localhost:3000            |
| Backend  | http://localhost:5000            |
| Health   | http://localhost:5000/health     |

---

## API Reference

### Calendar

| Method | Endpoint | Query Params | Description |
|--------|----------|--------------|-------------|
| `GET` | `/api/calendar/convert` | `ad=YYYY-MM-DD` | Convert AD date → BS |
| `GET` | `/api/calendar/convert-bs` | `year=&month=&day=` | Convert BS date → AD |
| `GET` | `/api/calendar/panchang` | `date=YYYY-MM-DD` | Daily Panchang data |

**Examples:**

```
GET /api/calendar/convert?ad=2024-04-14
→ { "bs": "2081-01-01" }

GET /api/calendar/convert-bs?year=2081&month=1&day=1
→ { "ad": "2024-04-14" }

GET /api/calendar/panchang?date=2024-04-14
→ { "tithi": "Panchami", "vara": "Somavar", "nakshatra": "Rohini", "yoga": "Siddha", "karana": "Bava" }
```

---

### Festivals

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/festivals` | All festivals ordered by date |
| `GET` | `/api/festivals/month/:month` | Festivals for a given month (1–12) |

```
GET /api/festivals/month/10
→ [{ "id": 1, "name": "Dashain", "bs_date": "2081-06-15", "ad_date": "2024-10-02", ... }]
```

---

### Users (Authentication)

| Method | Endpoint | Auth Required | Description |
|--------|----------|:-------------:|-------------|
| `POST` | `/api/users/register` | ❌ | Register a new user |
| `POST` | `/api/users/login` | ❌ | Login and receive JWT |
| `GET` | `/api/users/profile` | ✅ Bearer token | Get authenticated user profile |

**Register:**
```json
POST /api/users/register
{
  "name": "Ram Sharma",
  "email": "ram@example.com",
  "password": "secret"
}
```

**Login:**
```json
POST /api/users/login
{
  "email": "ram@example.com",
  "password": "secret"
}

→ { "token": "<jwt>", "user": { "id": 1, "name": "Ram Sharma", "email": "ram@example.com" } }
```

**Authenticated request:**
```
Authorization: Bearer <token>
```

---

### Finance

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/finance/forex` | Foreign exchange rates |
| `GET` | `/api/finance/metals` | Gold & silver prices |
| `GET` | `/api/finance/vegetables` | Kalimati vegetable rates |
| `GET` | `/api/finance/shares` | NEPSE share market data |

---

### Astrology

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/astrology/rashifal` | Daily horoscope for all rashis |

---

### Radio

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/radio/stations` | List all active radio stations |

---

### Utilities

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/utilities/dictionary` | Nepali dictionary lookup |

---

## Database Schema

The full schema is defined in `database/migrations/001_init.sql`. Key tables:

### `users`
| Column | Type | Notes |
|--------|------|-------|
| `id` | `SERIAL` | Primary key |
| `name` | `VARCHAR(100)` | |
| `email` | `VARCHAR(150)` | Unique |
| `password_hash` | `TEXT` | bcrypt hashed |
| `created_at` | `TIMESTAMP` | Default `NOW()` |

### `festivals`
| Column | Type | Notes |
|--------|------|-------|
| `id` | `SERIAL` | Primary key |
| `name` | `VARCHAR(200)` | English name |
| `name_np` | `VARCHAR(200)` | Nepali name |
| `bs_date` | `VARCHAR(20)` | e.g. `2081-06-15` |
| `ad_date` | `DATE` | |
| `category` | `VARCHAR(50)` | `major`, `cultural`, `religious` |
| `is_holiday` | `BOOLEAN` | Default `false` |

### `panchang`
| Column | Type | Notes |
|--------|------|-------|
| `ad_date` | `DATE` | Unique |
| `tithi` | `VARCHAR(100)` | |
| `vara` | `VARCHAR(50)` | Day of week |
| `nakshatra` | `VARCHAR(100)` | |
| `yoga` | `VARCHAR(100)` | |
| `karana` | `VARCHAR(100)` | |
| `sunrise` / `sunset` | `VARCHAR(20)` | |

### `forex_rates`
| Column | Type | Notes |
|--------|------|-------|
| `currency_code` | `VARCHAR(10)` | e.g. `USD` |
| `buy_rate` | `DECIMAL(12,4)` | |
| `sell_rate` | `DECIMAL(12,4)` | |
| `fetched_at` | `TIMESTAMP` | |

### `events`
| Column | Type | Notes |
|--------|------|-------|
| `user_id` | `INTEGER` | FK → `users(id)` CASCADE |
| `title` | `VARCHAR(200)` | |
| `bs_date` / `ad_date` | | |
| `reminder_at` | `TIMESTAMP` | |

> Additional tables: `metal_prices`, `vegetable_rates`, `share_market`, `news_articles`, `rashifal`, `radio_stations`, `wallet_transactions`, `dictionary`

---

## Frontend Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.tsx` | Home — Nepali calendar view |
| `/converter` | `converter.tsx` | BS ↔ AD date converter |
| `/festivals` | `festivals.tsx` | Festival grid with BS/AD dates |
| `/panchang` | `panchang.tsx` | Daily Panchang (Tithi, Vara, Nakshatra…) |
| `/astrology` | `astrology.tsx` | Rashifal / horoscope |
| `/finance` | `finance.tsx` | Forex, NEPSE, gold, vegetables |
| `/radio` | `radio.tsx` | Live radio player |
| `/news` | `news.tsx` | News feed |
| `/health` | `health.tsx` | Health & wellness |
| `/utilities` | `utilities.tsx` | Dictionary, unit tools |
| `/wallet` | `wallet.tsx` | Wallet & transactions |
| `/entertainment` | `entertainment.tsx` | Entertainment hub |
| `/meet` | `meet.tsx` | Meet / connect |
| `/pricing` | `pricing.tsx` | Pricing plans |

### Utility — `dateFormatter.ts`

```ts
toNepaliDigits(num)              // "2081" → "२०८१"
formatBsDate(year, month, day)   // Devanagari formatted BS date
formatAdDate(date)               // "April 14, 2024"
```

---

## Authentication Flow

```
1. POST /api/users/register   →  Creates user with bcrypt-hashed password
2. POST /api/users/login       →  Verifies credentials, returns 7-day JWT
3. Client stores token         →  Sent as Authorization: Bearer <token>
4. authMiddleware.js           →  Verifies token, attaches req.user to request
5. Protected routes            →  Use req.user.id for scoped data access
```

---

## Seeded Data

Eight major Nepali festivals are seeded out of the box:

| Festival | BS Date | AD Date | Category |
|----------|---------|---------|----------|
| Dashain | 2081-06-15 | 2024-10-02 | major |
| Tihar | 2081-07-01 | 2024-10-17 | major |
| Holi | 2080-11-29 | 2024-03-25 | major |
| Teej | 2081-05-18 | 2024-09-06 | cultural |
| Buddha Jayanti | 2081-01-30 | 2024-05-23 | religious |
| Indra Jatra | 2081-05-29 | 2024-09-17 | cultural |
| Losar | 2080-10-01 | 2024-02-10 | cultural |
| Maghe Sankranti | 2080-09-01 | 2024-01-15 | religious |

---

## Available Scripts

### Backend (`/backend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Express server with nodemon (hot reload) |
| `npm start` | Start Express server in production mode |

### Frontend (`/frontend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

> Built with ❤️ for Nepal — preserving culture through technology.
