require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Root endpoint acts as the UI/Dashboard for the Omnipresence Engine
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Omnipresence Engine</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, sans-serif;
          background-color: #0f1115;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background: rgba(255, 255, 255, 0.05);
          padding: 3rem;
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        h1 {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }
        p {
          color: #9ca3af;
          font-size: 1.1rem;
        }
        .status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-top: 2rem;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Omnipresence Engine</h1>
        <p>Your dedicated cloud intelligence server is live and fully operational.</p>
        <div class="status">
          <div class="status-dot"></div>
          SYSTEM ONLINE
        </div>
      </div>
    </body>
    </html>
  `);
});

// API endpoint for Digital Suite to communicate with
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'omnipresence-engine', version: '1.0.0' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Omnipresence Engine running on port ${PORT}`);
});
