<div align="center">

<img src="https://img.shields.io/badge/नमो_पात्रो-Namo_Patro-FF6B00?style=for-the-badge&labelColor=0D0500&color=FF6B00" alt="Namo Patro" height="40"/>

# नमो पात्रो — Namo Patro

**Nepal's premier digital calendar, panchang & lifestyle platform**

*Bikram Sambat · Panchang · Festivals · Astrology · Finance · Radio · Health · Wallet*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-C0392B?style=flat-square)](./LICENSE.md)

<br/>

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Screenshots](#-project-structure) · [License](#-license)

<br/>

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

**Calendar & Panchang**
- Bikram Sambat ↔ AD date conversion
- Full monthly calendar with Nepali dates
- Daily Panchang — Tithi, Vara, Nakshatra, Yoga, Karana
- Public holiday & festival markers

</td>
<td width="50%">

**Astrology & Culture**
- Daily Rashifal for all 12 rashis
- Rashi compatibility checker
- 300+ festival & event listings
- Panchang-based lunar calendar

</td>
</tr>
<tr>
<td width="50%">

**Finance & Economy**
- NRB Forex rates (live)
- NEPSE share market
- Gold & silver bullion prices
- Kalimati vegetable market rates

</td>
<td width="50%">

**Lifestyle & Services**
- Live Nepali FM radio streaming
- Telehealth — book doctor consultations
- Namo Pay digital wallet
- CharGhare Guff — WebRTC video calls
- Nepali dictionary & keyboard

</td>
</tr>
</table>

---

## 🛠 Tech Stack

| Layer | Technology |
|:------|:-----------|
| **Frontend** | Next.js 14, TypeScript 5, Tailwind CSS 3, Axios, lucide-react |
| **Backend** | Node.js 18, Express 4, JWT, bcryptjs, node-postgres |
| **Database** | PostgreSQL 14+, `pg` connection pool |
| **Auth** | JSON Web Tokens + bcrypt password hashing |
| **Icons** | Custom SVG NamoIcons library + lucide-react |
| **Dev Tools** | nodemon, TypeScript compiler |

---

## 📁 Project Structure

```
Namo-Patro/
├── backend/
│   └── src/
│       ├── api/
│       │   ├── astrology/        # Rashifal & compatibility
│       │   ├── calendar/         # BS/AD conversion, Panchang
│       │   ├── festivals/        # Festival listings
│       │   ├── finance/          # Forex, NEPSE, metals, vegetables
│       │   ├── radio/            # FM stations & bhajans
│       │   ├── users/            # Auth — register, login, profile
│       │   └── utilities/        # Dictionary, recharge, news portals
│       ├── config/db.js          # PostgreSQL connection pool
│       ├── services/             # Auth middleware, calendar logic
│       └── index.js              # Express entry point — port 5000
│
├── frontend/
│   ├── components/
│   │   ├── icons/index.tsx       # Custom NamoIcons SVG library
│   │   ├── CalendarGrid.tsx
│   │   ├── Navbar.tsx
│   │   ├── PanchangIcons.tsx
│   │   ├── SacredBackground.tsx
│   │   └── ZodiacIcon.tsx
│   ├── pages/                    # 14 app pages (see Frontend Pages)
│   ├── utils/dateFormatter.ts    # Nepali digit helpers
│   ├── styles/globals.css
│   ├── tailwind.config.js
│   └── next.config.js
│
├── database/
│   ├── migrations/001_init.sql   # Full schema — 12 tables
│   └── seed/                     # Festival & sample data
│
├── docs/README.md
├── LICENSE.md                    # Proprietary license
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

| Tool | Version | Download |
|:-----|:--------|:---------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| npm | 9+ | Bundled with Node.js |
| PostgreSQL | 14+ | [postgresql.org](https://www.postgresql.org/download) |
| Git | Any | [git-scm.com](https://git-scm.com) |

---

### 1 — Clone

```bash
git clone https://github.com/sc8134/Namo-Patro.git
cd Namo-Patro
```

---

### 2 — Database

```bash
# Create the database
psql -U postgres -c "CREATE DATABASE nepali_calendar;"

# Run migrations
psql -U postgres -d nepali_calendar -f database/migrations/001_init.sql

# Seed festival data
psql -U postgres -d nepali_calendar -f database/seed/festivals.sql
```

> **Windows:** Run these in PowerShell after adding `psql` to your PATH, or open it from the PostgreSQL Start Menu entry.

---

### 3 — Backend

```bash
cd backend
npm install
```

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=nepali_calendar
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret_here
```

---

### 4 — Frontend

```bash
cd frontend
npm install
```

> No `.env` needed by default. If your backend runs on a custom port, create `frontend/.env.local`:
> ```env
> NEXT_PUBLIC_API_URL=http://localhost:5000
> ```

---

### 5 — Run

Open **two terminals**:

```bash
# Terminal 1 — Backend
cd backend && npm run dev
```

```bash
# Terminal 2 — Frontend
cd frontend && npm run dev
```

| Service | URL |
|:--------|:----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Health check | http://localhost:5000/health |

---

## 🔑 Environment Variables

| Variable | Description | Default |
|:---------|:------------|:--------|
| `PORT` | Express server port | `5000` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `nepali_calendar` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | **required** |
| `JWT_SECRET` | JWT signing secret | **required** |

---

## 📡 API Reference

<details>
<summary><strong>Calendar</strong></summary>

| Method | Endpoint | Params | Description |
|:-------|:---------|:-------|:------------|
| `GET` | `/api/calendar/convert` | `ad=YYYY-MM-DD` | AD → BS |
| `GET` | `/api/calendar/convert-bs` | `year=&month=&day=` | BS → AD |
| `GET` | `/api/calendar/panchang` | `date=YYYY-MM-DD` | Daily Panchang |

```
GET /api/calendar/convert?ad=2024-04-14
→ { "bs": "2081-01-01" }

GET /api/calendar/panchang?date=2024-04-14
→ { "tithi": "Panchami", "vara": "Somavar", "nakshatra": "Rohini", ... }
```

</details>

<details>
<summary><strong>Festivals</strong></summary>

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/festivals` | All festivals |
| `GET` | `/api/festivals/all` | Full event list with Panchang data |
| `GET` | `/api/festivals/month/:month` | Events for a given month |

</details>

<details>
<summary><strong>Users & Auth</strong></summary>

| Method | Endpoint | Auth | Description |
|:-------|:---------|:----:|:------------|
| `POST` | `/api/users/register` | — | Create account |
| `POST` | `/api/users/login` | — | Login → receive JWT |
| `GET` | `/api/users/profile` | Bearer token | Get profile |

```json
POST /api/users/login
{ "email": "ram@example.com", "password": "secret" }

→ { "token": "<jwt>", "user": { "id": 1, "name": "Ram Sharma" } }
```

All protected routes require: `Authorization: Bearer <token>`

</details>

<details>
<summary><strong>Finance</strong></summary>

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/finance/forex` | NRB exchange rates |
| `GET` | `/api/finance/metals` | Gold & silver prices |
| `GET` | `/api/finance/vegetables` | Kalimati market rates |
| `GET` | `/api/finance/shares` | NEPSE stock data |

</details>

<details>
<summary><strong>Astrology · Radio · Utilities</strong></summary>

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/astrology/rashifal` | Daily Rashifal (all 12 rashis) |
| `GET` | `/api/astrology/compatibility` | Rashi compatibility score |
| `GET` | `/api/radio/stations` | Active FM stations |
| `GET` | `/api/radio/bhajans` | Bhajan stream list |
| `GET` | `/api/utilities/dictionary` | Nepali dictionary lookup |

</details>

---

## 🗄 Database Schema

<details>
<summary><strong>View all 12 tables</strong></summary>

| Table | Purpose |
|:------|:--------|
| `users` | Registered users with bcrypt passwords |
| `festivals` | Panchang-based festival & holiday data |
| `panchang` | Daily Tithi, Vara, Nakshatra, Yoga, Karana |
| `forex_rates` | NRB currency exchange rates |
| `metal_prices` | Gold & silver bullion prices |
| `vegetable_rates` | Kalimati daily market prices |
| `share_market` | NEPSE listed company stock data |
| `news_articles` | Aggregated Nepali news |
| `rashifal` | Daily horoscope per rashi |
| `radio_stations` | FM station details & stream URLs |
| `events` | User-created reminders (linked to users) |
| `wallet_transactions` | Namo Pay transaction ledger |
| `dictionary` | Nepali–English word definitions |

</details>

---

## 📄 Frontend Pages

| Route | Page | Description |
|:------|:-----|:------------|
| `/` | Home | Nepali calendar with Panchang |
| `/converter` | Converter | BS ↔ AD date conversion |
| `/panchang` | Panchang | Daily five-limb Panchang |
| `/festivals` | Festivals | Festival & holiday grid |
| `/astrology` | Jyotish | Rashifal & compatibility |
| `/finance` | Finance | Forex, NEPSE, metals, veggies |
| `/radio` | Radio | Live FM & Bhajan streaming |
| `/news` | News | Curated Nepali news portals |
| `/health` | Health | Telehealth consultations |
| `/utilities` | Utilities | Dictionary, keyboard, recharge |
| `/wallet` | Namo Pay | Digital wallet & payments |
| `/meet` | CharGhare | WebRTC video conferencing |
| `/entertainment` | Fun | IPL, Nepal Quiz, E-Cards |
| `/pricing` | Pricing | Subscription plans |

---

## 🔐 Auth Flow

```
Register  →  POST /api/users/register  →  bcrypt hash stored
Login     →  POST /api/users/login     →  7-day JWT returned
Request   →  Authorization: Bearer <token>
Middleware →  authMiddleware.js verifies token → attaches req.user
```

---

## 🌱 Seeded Festivals

| Festival | BS Date | AD Date |
|:---------|:--------|:--------|
| Dashain | 2081-06-15 | 2024-10-02 |
| Tihar | 2081-07-01 | 2024-10-17 |
| Holi | 2080-11-29 | 2024-03-25 |
| Teej | 2081-05-18 | 2024-09-06 |
| Buddha Jayanti | 2081-01-30 | 2024-05-23 |
| Indra Jatra | 2081-05-29 | 2024-09-17 |
| Losar | 2080-10-01 | 2024-02-10 |
| Maghe Sankranti | 2080-09-01 | 2024-01-15 |

---

## 📜 Available Scripts

**Backend**

```bash
npm run dev    # nodemon hot-reload
npm start      # production
```

**Frontend**

```bash
npm run dev    # Next.js dev server
npm run build  # production build
npm start      # serve production build
```

---

## 📃 License

This project is proprietary software. All rights reserved.

**Copyright © 2024–2026 Sagar RC**

You may view the source code for personal evaluation only.  
Any use, modification, distribution, or deployment requires **prior written permission** from the author.

See [LICENSE.md](./LICENSE.md) for the full terms.

---

<div align="center">

Made with ❤️ for Nepal — preserving culture through technology

**[sc81341@gmail.com](mailto:sc81341@gmail.com) · [github.com/sc8134](https://github.com/sc8134)**

</div>
