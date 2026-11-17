const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function handler(req, res) {
  const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);

  // Root or index.html
  if (cleanUrl === '/' || cleanUrl === '/index.html') {
    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
      });
      return fs.createReadStream(indexPath).pipe(res);
    }
  }

  // Attempt to serve exact file from disk
  const safePath = path.normalize(cleanUrl).replace(/^(\.\.[\/\\])+/, '');
  const rootFile = path.resolve(__dirname, '.' + (safePath.startsWith('/') ? safePath : '/' + safePath));
  const publicFile = path.resolve(__dirname, 'public', '.' + (safePath.startsWith('/') ? safePath : '/' + safePath));
  const filePath = [rootFile, path.join(rootFile, 'index.html'), publicFile]
    .find(p => (p === __dirname || p.startsWith(__dirname + path.sep)) && fs.existsSync(p) && fs.statSync(p).isFile());

  try {
    if (filePath) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
      });
      return fs.createReadStream(filePath).pipe(res);
    }
  } catch (err) {}

  // Known routes already have dedicated static pages. Unknown routes are proper 404s.
  const notFound = path.join(__dirname, '404.html');
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
  if (fs.existsSync(notFound)) return fs.createReadStream(notFound).pipe(res);
  res.end('404 Not Found');
}

// Standalone execution for localhost
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  http.createServer(handler).listen(PORT, '0.0.0.0', () => {
    console.log(`======================================================`);
    console.log(`  AB Studio Web activo en http://localhost:${PORT}`);
    console.log(`======================================================`);
  });
}

module.exports = handler;
