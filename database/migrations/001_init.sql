-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Festivals (Panchang-based, regional)
CREATE TABLE IF NOT EXISTS festivals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  name_np VARCHAR(200),
  bs_date VARCHAR(20),
  ad_date DATE,
  description TEXT,
  category VARCHAR(50),
  region VARCHAR(50) DEFAULT 'nationwide',
  is_holiday BOOLEAN DEFAULT false
);

-- Panchang daily data
CREATE TABLE IF NOT EXISTS panchang (
  id SERIAL PRIMARY KEY,
  ad_date DATE UNIQUE NOT NULL,
  bs_date VARCHAR(20),
  tithi VARCHAR(100),
  vara VARCHAR(50),
  nakshatra VARCHAR(100),
  yoga VARCHAR(100),
  karana VARCHAR(100),
  sunrise VARCHAR(20),
  sunset VARCHAR(20),
  moon_phase VARCHAR(50)
);

-- Forex rates
CREATE TABLE IF NOT EXISTS forex_rates (
  id SERIAL PRIMARY KEY,
  currency_code VARCHAR(10) NOT NULL,
  currency_name VARCHAR(100),
  flag VARCHAR(10),
  buy_rate DECIMAL(12,4),
  sell_rate DECIMAL(12,4),
  unit INTEGER DEFAULT 1,
  fetched_at TIMESTAMP DEFAULT NOW()
);

-- Metal prices
CREATE TABLE IF NOT EXISTS metal_prices (
  id SERIAL PRIMARY KEY,
  metal VARCHAR(50) NOT NULL,
  unit VARCHAR(50),
  price DECIMAL(12,2),
  change_amount DECIMAL(10,2),
  change_pct DECIMAL(6,2),
  fetched_at TIMESTAMP DEFAULT NOW()
);

-- Vegetable rates (Kalimati)
CREATE TABLE IF NOT EXISTS vegetable_rates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_np VARCHAR(100),
  unit VARCHAR(30),
  min_price DECIMAL(8,2),
  max_price DECIMAL(8,2),
  avg_price DECIMAL(8,2),
  fetched_at TIMESTAMP DEFAULT NOW()
);

-- Share market (NEPSE)
CREATE TABLE IF NOT EXISTS share_market (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(20) NOT NULL,
  company_name VARCHAR(200),
  sector VARCHAR(100),
  ltp DECIMAL(10,2),
  change_amount DECIMAL(8,2),
  change_pct DECIMAL(6,2),
  volume INTEGER,
  fetched_at TIMESTAMP DEFAULT NOW()
);

-- News articles
CREATE TABLE IF NOT EXISTS news_articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  url TEXT,
  source VARCHAR(100),
  category VARCHAR(50),
  published_at TIMESTAMP,
  fetched_at TIMESTAMP DEFAULT NOW()
);

-- Rashifal (daily horoscope)
CREATE TABLE IF NOT EXISTS rashifal (
  id SERIAL PRIMARY KEY,
  rashi VARCHAR(50) NOT NULL,
  rashi_np VARCHAR(50),
  date DATE NOT NULL,
  prediction TEXT,
  lucky_number VARCHAR(20),
  lucky_color VARCHAR(50),
  lucky_gem VARCHAR(50),
  UNIQUE(rashi, date)
);

-- Radio stations
CREATE TABLE IF NOT EXISTS radio_stations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  frequency VARCHAR(20),
  genre VARCHAR(50),
  stream_url TEXT,
  website VARCHAR(200),
  description TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Events / Reminders
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  bs_date VARCHAR(20),
  ad_date DATE,
  reminder_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Wallet transactions
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  description TEXT,
  ref_id VARCHAR(50),
  status VARCHAR(20) DEFAULT 'success',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Dictionary
CREATE TABLE IF NOT EXISTS dictionary (
  id SERIAL PRIMARY KEY,
  word_np VARCHAR(200) NOT NULL,
  word_en VARCHAR(200),
  definition TEXT,
  example TEXT,
  category VARCHAR(50)
);
