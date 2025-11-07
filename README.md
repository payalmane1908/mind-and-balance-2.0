# Mental Wellbeing App

A comprehensive mental health and wellbeing platform built with Next.js and Express.

## Features

- 🧘 Mood Tracking
- 📝 Journal Entries
- 💪 Wellness Exercises
- ✨ Daily Affirmations
- 🤖 AI Chatbot Support
- 📊 Dashboard Analytics

## Quick Start

### Option 1: Using Startup Scripts (Recommended)

**Windows (Batch):**
```bash
start.bat
```

**Windows (PowerShell):**
```powershell
.\start.ps1
```

### Option 2: Manual Start

1. **Start Backend:**
   ```bash
   cd backend
   set USE_IN_MEMORY_DB=true
   set PORT=5000
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## Access

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## Environment Setup

### Backend
Create `backend/.env` (optional - uses in-memory DB by default):
```
MONGO_URI=your_mongodb_connection_string
USE_IN_MEMORY_DB=true
PORT=5000
```

### Frontend
Create `frontend/.env.local` (optional):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Project Structure

```
mental wellbeing/
├── backend/          # Express.js API server
│   ├── routes/       # API routes
│   ├── models/       # MongoDB models
│   ├── middleware/   # Auth middleware
│   └── utils/        # Utilities and seed data
├── frontend/         # Next.js frontend
│   ├── pages/        # Next.js pages
│   ├── components/   # React components
│   ├── context/      # React context providers
│   └── styles/       # CSS modules
└── start.bat         # Windows startup script
```

## Deployment

See `frontend/DEPLOYMENT.md` for deployment instructions.

## License

ISC

