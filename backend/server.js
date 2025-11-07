const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
let MongoMemoryServerLib = null;

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/moods', require('./routes/mood.routes'));
app.use('/api/journal', require('./routes/journal.routes'));
app.use('/api/exercises', require('./routes/exercise.routes'));
app.use('/api/affirmations', require('./routes/affirmation.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));
app.use('/api/chatbot', require('./routes/chatbot.routes'));

// Default route
app.get('/', (req, res) => {
  res.send('BalanceMind API is running');
});

// Connect to MongoDB (with optional in-memory fallback for dev)
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  const useInMemory = process.env.USE_IN_MEMORY_DB === 'true';

  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
      return;
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      if (!useInMemory) {
        process.exit(1);
        return;
      }
    }
  } else if (!useInMemory) {
    console.error('MongoDB connection error: MONGO_URI is not set.');
    process.exit(1);
    return;
  }

  if (useInMemory) {
    try {
      // Lazy load to avoid dependency if not needed
      MongoMemoryServerLib = require('mongodb-memory-server');
      const { MongoMemoryServer } = MongoMemoryServerLib;
      const mem = await MongoMemoryServer.create();
      const uri = mem.getUri();
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to in-memory MongoDB');
      return;
    } catch (memErr) {
      console.error('Failed to start in-memory MongoDB:', memErr.message);
      process.exit(1);
    }
  }
};

// Connect to database then start server and seed data
(async () => {
  try {
    await connectDB();
    try {
      const { runAllSeeds } = require('./utils/seed');
      await runAllSeeds();
    } catch (e) {
      console.warn('Seeding skipped or failed:', e.message);
    }
    
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`✅ API available at http://localhost:${PORT}`);
    });

    // Handle server errors gracefully
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please stop the other process or use a different port.`);
        console.log(`💡 Try: netstat -ano | findstr :${PORT} to find the process using the port`);
      } else {
        console.error('❌ Server error:', error.message);
      }
      process.exit(1);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        mongoose.connection.close();
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('\nSIGINT received, shutting down gracefully...');
      server.close(() => {
        mongoose.connection.close();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
})();