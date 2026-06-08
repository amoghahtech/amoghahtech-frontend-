/* ═══════════════════════════════════════════
   frontend-server/server.js
   Railway पर HTML files serve करने के लिए
   Simple Express static server
   ═══════════════════════════════════════════ */

const express = require('express');
const path    = require('path');
const app     = express();

const PORT = process.env.PORT || 3000;

/* ── API calls को backend पर forward करो ── */
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/api', createProxyMiddleware({
  target:      BACKEND_URL,
  changeOrigin: true,
  pathRewrite:  { '^/api': '/api' },
  on: {
    error: (err, req, res) => {
      console.error('[Proxy Error]', err.message);
      res.status(502).json({ success: false, message: 'Backend unavailable' });
    }
  }
}));

/* ── Static files serve करो ── */
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],   /* /about → /about.html automatically */
  index:      'index.html',
}));

/* ── Clean URLs: /about → about.html ── */
app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  const file = path.join(__dirname, 'public', page + '.html');
  const fs   = require('fs');
  if (fs.existsSync(file)) {
    res.sendFile(file);
  } else {
    next();
  }
});

/* ── Service sub-pages ── */
app.get('/services/:page', (req, res, next) => {
  const page = req.params.page;
  const file = path.join(__dirname, 'public', 'services', page + '.html');
  const fs   = require('fs');
  if (fs.existsSync(file)) {
    res.sendFile(file);
  } else {
    next();
  }
});

/* ── 404 page ── */
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Frontend server running on port ${PORT}`);
  console.log(`   Backend URL: ${BACKEND_URL}`);
});
