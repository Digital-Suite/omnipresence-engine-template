require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Catch-all endpoint acts as the SPA for the Omnipresence Engine
app.use((req, res) => {
  // Pass through /api routes
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });

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
          min-width: 400px;
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
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.5;
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
        .page-title {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #8b5cf6;
          margin-bottom: 0.5rem;
          display: block;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container" id="app">
        <!-- SPA content injected here -->
      </div>

      <script>
        function renderPage() {
          const path = window.location.pathname;
          const app = document.getElementById('app');
          
          let pageName = 'Dashboard';
          let description = 'Your dedicated cloud intelligence server is live and fully operational.';
          
          if (path === '/schedules') {
            pageName = 'Schedules';
            description = 'Manage your automated posting schedules across 9 social platforms.';
          } else if (path === '/accounts') {
            pageName = 'Accounts';
            description = 'Connect and manage your social media accounts securely.';
          } else if (path === '/settings') {
            pageName = 'Settings';
            description = 'Configure engine parameters and webhook integrations.';
          } else if (path !== '/') {
            pageName = '404';
            description = 'The requested page does not exist.';
          }
          
          app.innerHTML = \`
            <span class="page-title">\${pageName}</span>
            <h1>Omnipresence Engine</h1>
            <p>\${description}</p>
            <div class="status">
              <div class="status-dot"></div>
              SYSTEM ONLINE
            </div>
          \`;
        }

        window.addEventListener('popstate', renderPage);
        renderPage();
      </script>
    </body>
    </html>
  `);
});

// API endpoint for Digital Suite to communicate with
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'omnipresence-engine', version: '1.0.0' });
});

io.on('connection', (socket) => {
  // A simple status emission on connect to prove health
  socket.emit('health', { status: 'Online', version: '1.0.4' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Omnipresence Engine running on port ${PORT}`);
});
