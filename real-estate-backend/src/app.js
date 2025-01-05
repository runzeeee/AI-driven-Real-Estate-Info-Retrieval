// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
const indexRoutes = require('./routes/index');
app.use('/api', indexRoutes);

module.exports = app;
