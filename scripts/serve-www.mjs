// Minimal static file server for the www/ build output.
// Used by Playwright webServer so tests don't depend on external packages.
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const WWW = join(__dirname, '..', 'www');
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.map':  'application/json',
};

createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const file = join(WWW, urlPath);
  if (existsSync(file)) {
    const ext = extname(file);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(readFileSync(file));
  } else {
    // SPA fallback — serve index.html for all unknown paths
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(readFileSync(join(WWW, 'index.html')));
  }
}).listen(PORT, () => {
  console.log(`serving www/ on http://localhost:${PORT}`);
});
