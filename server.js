/**
 * TGVIS development server
 *
 * This small, dependency-free server serves every HTML page, stylesheet,
 * script, and image from the project root. Keeping it in plain Node.js makes
 * the imported static site easy to run on Replit without changing its stack.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 5000;
const HOST = '0.0.0.0';
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function contentType(filePath, contents) {
  // The imported placeholder artwork is SVG content kept under .png paths.
  // Detecting it here preserves existing references while serving valid media.
  if (path.extname(filePath).toLowerCase() === '.png' &&
      contents.subarray(0, 200).toString('utf8').trimStart().startsWith('<')) {
    return 'image/svg+xml';
  }
  // The approved school crest may be stored at the legacy .png URL while its
  // binary content is WebP. Returning the real media type keeps strict browsers
  // happy when X-Content-Type-Options is enabled.
  if (path.extname(filePath).toLowerCase() === '.png' &&
      contents.subarray(0, 12).toString('ascii').startsWith('RIFF') &&
      contents.subarray(8, 12).toString('ascii') === 'WEBP') {
    return 'image/webp';
  }
  return MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function safePath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.resolve(ROOT, `.${requested}`);
  return filePath.startsWith(ROOT) ? filePath : null;
}

const server = http.createServer((request, response) => {
  const filePath = safePath(request.url);

  if (!filePath) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, contents) => {
    if (error) {
      if (error.code === 'ENOENT') {
        const notFoundPath = path.join(ROOT, '404.html');
        return fs.readFile(notFoundPath, (notFoundError, notFoundContents) => {
          if (notFoundError) {
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.end('Not found');
            return;
          }
          response.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache',
            'X-Content-Type-Options': 'nosniff',
          });
          response.end(notFoundContents);
        });
      }
      response.writeHead(error.code === 'ENOENT' ? 404 : 500, {
        'Content-Type': 'text/plain; charset=utf-8',
      });
      response.end('Server error');
      return;
    }

    response.writeHead(200, {
      'Content-Type': contentType(filePath, contents),
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    if (request.method !== 'HEAD') response.end(contents);
    else response.end();
  });
});

server.listen(PORT, HOST, () => {
  console.log(`TGVIS static server listening on http://${HOST}:${PORT}`);
});