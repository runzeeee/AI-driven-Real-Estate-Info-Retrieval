// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const propertyController = require('./controllers/propertyController');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://ai-driven-real-estate-info-retrieval.onrender.com',
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Routes
app.post('/api/property-details', propertyController.getPropertyDetails);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
