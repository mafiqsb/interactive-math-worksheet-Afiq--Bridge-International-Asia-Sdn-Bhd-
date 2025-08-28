# Interactive Math Worksheet

A simple web app for practicing rounding numbers to the nearest 10.

## What it does
- Students enter their name
- Read instructions about rounding
- Answer 12 math questions
- See their score and correct answers
- View leaderboard of top scores

## Tech Stack
- **Frontend**: React + TypeScript + Material-UI
- **Backend**: Node.js + Express + PostgreSQL

## Quick Start

### 1. Setup Database
```sql
CREATE DATABASE math_worksheet;

CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    answers JSONB NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=math_worksheet
DB_USER=your_username
DB_PASSWORD=your_password
PORT=3001
```

Start server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Routes
- `POST /api/worksheets` - Submit answers
- `GET /api/worksheets/leaderboard` - Get top scores


## Running
1. Start backend: `npm run dev` (port 3001)
2. Start frontend: `npm run dev` (port 5173)
3. Open http://localhost:5173
