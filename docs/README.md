# Namo Patro

Nepal's premier digital calendar, panchang, and lifestyle platform — BS/AD conversion, festivals, astrology, finance, health, radio, wallet, and more.

## Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS |
| Backend  | Node.js + Express                   |
| Database | PostgreSQL                          |
| Auth     | JWT + bcryptjs                      |

---

## Project Structure

```
my-nepali-calendar-app/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── calendar/       # BS/AD conversion & Panchang endpoints
│   │   │   ├── festivals/      # Festival listing endpoints
│   │   │   └── users/          # Auth endpoints (register/login/profile)
│   │   ├── config/
│   │   │   └── db.js           # PostgreSQL connection pool
│   │   ├── services/
│   │   │   ├── authMiddleware.js   # JWT verification middleware
│   │   │   └── calendarService.js  # BS/AD conversion logic
│   │   └── index.js            # Express app entry point (port 5000)
│   └── .env.example
├── frontend/
│   ├── pages/
│   │   ├── index.tsx           # Home / calendar view
│   │   ├── converter.tsx       # BS ↔ AD date converter UI
│   │   ├── festivals.tsx       # Festival listing UI
│   │   └── panchang.tsx        # Daily Panchang UI
│   ├── components/
│   │   ├── CalendarGrid.tsx
│   │   └── DateCard.tsx
│   └── utils/
│       └── dateFormatter.ts    # Nepali digit formatting helpers
├── database/
│   ├── migrations/001_init.sql # Creates users, festivals, events tables
│   └── seed/festivals.sql      # Seeds 8 major Nepali festivals
├── tests/
│   └── calendar.test.js        # BS/AD conversion unit tests
└── scripts/
    └── setup.sh                # One-shot setup script
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm

### 1. Clone & Install

```bash
git clone <repo-url>
cd my-nepali-calendar-app
npm run install:all
```

### 2. Setup Database

```bash
psql -U postgres -c "CREATE DATABASE nepali_calendar;"
psql -U postgres -d nepali_calendar -f database/migrations/001_init.sql
psql -U postgres -d nepali_calendar -f database/seed/festivals.sql
```

Or use the setup script (Linux/macOS):

```bash
bash scripts/setup.sh
```

### 3. Configure Environment

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nepali_calendar
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your_jwt_secret_here
```

### 4. Run

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:3000  |
| Backend  | http://localhost:5000  |
| Health   | http://localhost:5000/health |

---

## API Reference

### Calendar

| Method | Endpoint | Query Params | Description |
|--------|----------|--------------|-------------|
| GET | `/api/calendar/convert` | `ad=YYYY-MM-DD` | Convert AD date to BS |
| GET | `/api/calendar/convert-bs` | `year=&month=&day=` | Convert BS date to AD |
| GET | `/api/calendar/panchang` | `date=YYYY-MM-DD` | Get Panchang for a date |

**Example — AD to BS:**
```
GET /api/calendar/convert?ad=2024-04-14
→ { "bs": "2081-01-01" }
```

**Example — BS to AD:**
```
GET /api/calendar/convert-bs?year=2081&month=1&day=1
→ { "ad": "2024-04-14" }
```

**Example — Panchang:**
```
GET /api/calendar/panchang?date=2024-04-14
→ { "tithi": "Panchami", "vara": "Somavar", "nakshatra": "Rohini", "yoga": "Siddha", "karana": "Bava" }
```

### Festivals

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/festivals` | List all festivals ordered by date |
| GET | `/api/festivals/month/:month` | Festivals for a given month (1–12) |

**Example:**
```
GET /api/festivals/month/10
→ [{ "id": 1, "name": "Dashain", "bs_date": "2081-06-15", "ad_date": "2024-10-02", ... }]
```

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/users/register` | — | Register a new user |
| POST | `/api/users/login` | — | Login and receive JWT |
| GET | `/api/users/profile` | Bearer token | Get authenticated user profile |

**Register body:**
```json
{ "name": "Ram Sharma", "email": "ram@example.com", "password": "secret" }
```

**Login body:**
```json
{ "email": "ram@example.com", "password": "secret" }
```

**Login response:**
```json
{ "token": "<jwt>", "user": { "id": 1, "name": "Ram Sharma", "email": "ram@example.com" } }
```

**Authenticated request:**
```
Authorization: Bearer <token>
```

---

## Database Schema

### `users`
| Column | Type | Notes |
|--------|------|-------|
| id | SERIAL | Primary key |
| name | VARCHAR(100) | |
| email | VARCHAR(150) | Unique |
| password_hash | TEXT | bcrypt hashed |
| created_at | TIMESTAMP | Default NOW() |

### `festivals`
| Column | Type | Notes |
|--------|------|-------|
| id | SERIAL | Primary key |
| name | VARCHAR(200) | |
| bs_date | VARCHAR(20) | e.g. `2081-06-15` |
| ad_date | DATE | |
| description | TEXT | |
| category | VARCHAR(50) | `major`, `cultural`, `religious` |

### `events`
| Column | Type | Notes |
|--------|------|-------|
| id | SERIAL | Primary key |
| user_id | INTEGER | FK → users(id), CASCADE delete |
| title | VARCHAR(200) | |
| bs_date | VARCHAR(20) | |
| ad_date | DATE | |
| reminder_at | TIMESTAMP | |
| created_at | TIMESTAMP | Default NOW() |

---

## Seeded Festivals

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

## Frontend Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `pages/index.tsx` | Home — Nepali calendar view |
| `/converter` | `pages/converter.tsx` | BS ↔ AD date converter |
| `/festivals` | `pages/festivals.tsx` | Festival grid with BS/AD dates |
| `/panchang` | `pages/panchang.tsx` | Daily Panchang (Tithi, Vara, Nakshatra, Yoga, Karana) |

### Utility — `dateFormatter.ts`

```ts
toNepaliDigits(num)              // converts "2081" → "२०८१"
formatBsDate(year, month, day)   // returns Devanagari formatted BS date
formatAdDate(date)               // returns "April 14, 2024"
```

---

## Authentication Flow

1. `POST /api/users/register` — creates user with bcrypt-hashed password
2. `POST /api/users/login` — verifies credentials, returns a 7-day JWT
3. Include the token as `Authorization: Bearer <token>` on protected routes
4. `authMiddleware.js` verifies the token and attaches `req.user` for downstream handlers

---

## Running Tests

```bash
# From project root
npx jest tests/calendar.test.js
```

Tests cover:
- AD `2024-04-14` → BS `2081-01-01`
- BS `2081-01-01` → AD `2024-04-14`

---

## Available Scripts

From the project root:

| Script | Description |
|--------|-------------|
| `npm run install:all` | Install frontend + backend dependencies |
| `npm run dev:frontend` | Start Next.js dev server |
| `npm run dev:backend` | Start Express dev server with nodemon |

---

## Notes

- The Panchang endpoint currently returns placeholder data. Integrate an astrology library or external data source to provide real Tithi/Nakshatra calculations.
- The `CalendarGrid` and `DateCard` components are scaffolded and ready to be wired up on the home page.
- The `events` table supports per-user reminders — the API endpoints for events are not yet implemented.
