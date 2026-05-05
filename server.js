// ============================================================
// FUEGO Restaurant - Express Server (NO DATABASE)
// ============================================================

const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit    = require('express-rate-limit');

require('dotenv').config();

const app = express();

// ── Security Middleware ───────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// ── Body Parser ───────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Rate Limiter ──────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// ============================================================
// 🔥 SAMPLE API (NO DATABASE)
// ============================================================

// Fake login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "1234") {
    return res.json({
      success: true,
      message: "Login successful 🔥",
      token: "fake-jwt-token"
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

// Fake register
app.post('/api/auth/register', (req, res) => {
  const { name, email } = req.body;

  res.json({
    success: true,
    message: `User ${name} registered successfully 🔥`,
    user: { name, email }
  });
});

// Booking API (for your form)
app.post('/api/book', (req, res) => {
  const { name, phone, date, guests } = req.body;

  if (!name || !phone || !date) {
    return res.status(400).json({
      success: false,
      message: "Missing fields"
    });
  }

  res.json({
    success: true,
    message: "Table booked successfully 🔥",
    data: { name, phone, date, guests }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'FUEGO API running (No DB) 🔥',
    time: new Date()
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ============================================================
// 🚀 SERVER START
// ============================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
