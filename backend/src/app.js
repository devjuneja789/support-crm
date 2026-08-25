const express = require('express');
const cors = require('cors');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes prefix[cite: 1]
app.use('/api', ticketRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

module.exports = app;