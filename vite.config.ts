import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Path to the @designcodeio/threeui bundled assets directory
const threeUiAssetsDir = path.resolve(
  __dirname,
  'node_modules/@designcodeio/threeui/lib-dist/assets',
);
// Note: /public/threeui/ (glass-ai-button.html) is served automatically by
// Vite's built-in static file handler — no extra middleware required for it.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Serve ThreeUI landing-page assets so that the SylvaHero <iframe>
    // can resolve its sourceUrl="/landing-pages/inner-green-3d.html"
    {
      name: 'threeui-assets',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Match /landing-pages/... → threeui lib-dist/assets/landing-pages/...
          const prefix = '/landing-pages/';
          if (req.url && req.url.startsWith(prefix)) {
            const relativePath = req.url.slice(prefix.length).split('?')[0];
            const filePath = path.join(threeUiAssetsDir, 'landing-pages', relativePath);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              // Determine content-type
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.html': 'text/html; charset=utf-8',
                '.js':   'application/javascript; charset=utf-8',
                '.css':  'text/css; charset=utf-8',
                '.jpg':  'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png':  'image/png',
                '.woff2': 'font/woff2',
                '.woff': 'font/woff',
                '.ttf':  'font/ttf',
              };
              res.setHeader('Content-Type', mimeMap[ext] ?? 'application/octet-stream');
              res.setHeader('Cache-Control', 'public, max-age=3600');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});

