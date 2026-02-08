/* eslint-disable @typescript-eslint/no-require-imports */
/*
  cPanel Node.js Selector için Entry Point
  Bu dosya Next.js uygulamasını başlatmak için kullanılır.

  Kurulum Notları:
  1. cPanel "Setup Node.js App" kısmında "Application startup file" olarak bu dosyayı (server.js) seçin.
  2. "Application Mode" kısmını "Production" olarak ayarlayın.
  3. Environment variables (DATABASE_URL vb.) cPanel üzerinden eklenmelidir.
*/

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Next.js uygulamasını başlat
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    })
        .once('error', (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
