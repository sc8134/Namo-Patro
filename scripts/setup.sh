#!/bin/bash
echo "Setting up Nepali Calendar App..."

# Install dependencies
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Setup DB
psql -U postgres -c "CREATE DATABASE nepali_calendar;" 2>/dev/null || echo "DB may already exist"
psql -U postgres -d nepali_calendar -f database/migrations/001_init.sql
psql -U postgres -d nepali_calendar -f database/seed/festivals.sql

echo "Setup complete! Copy backend/.env.example to backend/.env and update credentials."
