import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const rootDir = process.cwd();

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-root-images',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && req.method === 'GET') {
              // Never intercept Vite JS module imports, internal files, or src assets
              if (
                req.url.includes('import') ||
                req.url.includes('?raw') ||
                req.url.includes('?url') ||
                req.url.startsWith('/src/') ||
                req.url.startsWith('/@') ||
                req.url.startsWith('/node_modules/')
              ) {
                return next();
              }

              try {
                const cleanUrl = decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '');
                // Only serve root-level files directly under root directory
                if (cleanUrl && !cleanUrl.includes('/') && !cleanUrl.includes('..') && /\.(jpeg|jpg|png|webp|svg|pdf)$/i.test(cleanUrl)) {
                  const rootFile = path.resolve(rootDir, cleanUrl);
                  if (fs.existsSync(rootFile) && fs.statSync(rootFile).isFile()) {
                    const ext = path.extname(rootFile).toLowerCase();
                    const mime =
                      ext === '.png'
                        ? 'image/png'
                        : ext === '.svg'
                        ? 'image/svg+xml'
                        : ext === '.webp'
                        ? 'image/webp'
                        : ext === '.pdf'
                        ? 'application/pdf'
                        : 'image/jpeg';
                    res.setHeader('Content-Type', mime);
                    fs.createReadStream(rootFile).pipe(res);
                    return;
                  }
                }
              } catch {
                // pass to next
              }
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
