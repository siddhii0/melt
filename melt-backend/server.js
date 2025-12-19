const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const aiRoutes = require('./routes/ai');


const app = express();
app.use(express.json());
// Simple request logger (shows method, URL, status, time)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  });
  next();
});

app.use(cors());



// Health route
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/melt';

// 1) Start the HTTP server immediately
app.listen(PORT, () => {
  console.log(`API running on http://0.0.0.0:${PORT}`);
});

// 2) Connect to Mongo in the background (won’t block the server)
(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Mongo connected');
  } catch (err) {
    console.error('Mongo connection failed:', err.message);
  }
})();

// Optional: log future disconnects/errors
mongoose.connection.on('disconnected', () => console.error('Mongo disconnected'));
mongoose.connection.on('error', (e) => console.error('Mongo error:', e.message));
