const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'VideoFlow resolve backend' });
});

app.get('/resolve', (req, res) => {
  const originalUrl = req.query.url;
  if (!originalUrl) {
    return res.status(400).json({ error: 'url query param required' });
  }

  try {
    const u = new URL(originalUrl);
    const parts = u.pathname.split('/').filter(Boolean);
    let fileName = parts.length ? parts[parts.length - 1] : 'video.mp4';

    if (!fileName.includes('.')) {
      fileName += '.mp4';
    }

    return res.json({
      downloadUrl: originalUrl,
      fileName
    });
  } catch (e) {
    return res.status(400).json({ error: 'invalid url' });
  }
});

app.listen(PORT, () => {
  console.log(`VideoFlow resolver listening on port ${PORT}`);
});
