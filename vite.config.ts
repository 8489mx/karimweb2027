import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function mockBackendPlugin(): Plugin {
  const ensureDirs = () => {
    const uploadsDir = path.resolve(__dirname, 'public/uploads');
    const dataDir = path.resolve(__dirname, 'public/data');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  };

  const getSettings = () => {
    ensureDirs();
    const settingsPath = path.resolve(__dirname, 'public/data/settings.json');
    const bakPath = path.resolve(__dirname, 'data/settings.json.bak');
    if (fs.existsSync(settingsPath)) {
      try {
        return JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      } catch (e) {}
    }
    if (fs.existsSync(bakPath)) {
      try {
        const bak = JSON.parse(fs.readFileSync(bakPath, 'utf8'));
        fs.writeFileSync(settingsPath, JSON.stringify(bak, null, 2));
        return bak;
      } catch (e) {}
    }
    return {};
  };

  const saveSettings = (newSettings: any) => {
    ensureDirs();
    const settingsPath = path.resolve(__dirname, 'public/data/settings.json');
    const current = getSettings();
    const updated = { ...current, ...newSettings };
    fs.writeFileSync(settingsPath, JSON.stringify(updated, null, 2));
    
    // Also backup to data/settings.json.bak
    const dataDir = path.resolve(__dirname, 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.resolve(dataDir, 'settings.json.bak'), JSON.stringify(updated, null, 2));
    return updated;
  };

  const getOrders = () => {
    ensureDirs();
    const ordersPath = path.resolve(__dirname, 'public/data/orders.json');
    if (fs.existsSync(ordersPath)) {
      try {
        return JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
      } catch (e) {}
    }
    return [];
  };

  const saveOrders = (orders: any[]) => {
    ensureDirs();
    const ordersPath = path.resolve(__dirname, 'public/data/orders.json');
    fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
  };

  const getAdminCredentials = () => {
    ensureDirs();
    const adminPath = path.resolve(__dirname, 'public/data/admin.json');
    if (fs.existsSync(adminPath)) {
      try {
        return JSON.parse(fs.readFileSync(adminPath, 'utf8'));
      } catch (e) {}
    }
    return { username: 'admin', password: 'admin123' };
  };

  const saveAdminCredentials = (creds: { username: string; password: string }) => {
    ensureDirs();
    const adminPath = path.resolve(__dirname, 'public/data/admin.json');
    fs.writeFileSync(adminPath, JSON.stringify(creds, null, 2));
    const dataDir = path.resolve(__dirname, 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.resolve(dataDir, 'admin.json.bak'), JSON.stringify(creds, null, 2));
  };

  return {
    name: 'mock-backend-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';

        // Universal CORS and no-cache for mock API endpoints
        if (url.startsWith('/api/') || url.startsWith('/data/')) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }
        }

        // 0. Explicit Uploads Static Serving
        if (url.startsWith('/uploads/')) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          const safePath = path.normalize(url.split('?')[0]).replace(/^(\.\.[\/\\])+/, '');
          const filePath = path.resolve(__dirname, 'public', safePath.replace(/^\//, ''));
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeMap: Record<string, string> = {
              '.webp': 'image/webp',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.gif': 'image/gif',
              '.svg': 'image/svg+xml'
            };
            res.statusCode = 200;
            res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }

        // 1. Upload API
        if (url.startsWith('/api/upload.php') && req.method === 'POST') {
          ensureDirs();
          const contentType = req.headers['content-type'] || '';
          const chunks: Buffer[] = [];
          
          req.on('data', chunk => {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          });

          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              let filename = `image_${Date.now()}.webp`;
              let fileData: Buffer | null = null;

              if (contentType.includes('multipart/form-data')) {
                const boundaryMatch = contentType.match(/boundary=([^;]+)/);
                if (boundaryMatch) {
                  const boundary = boundaryMatch[1].trim().replace(/^"|"$/g, '');
                  const boundaryBuffer = Buffer.from('--' + boundary);
                  const startIdx = buffer.indexOf(boundaryBuffer);
                  if (startIdx !== -1) {
                    const headerStart = startIdx + boundaryBuffer.length + 2;
                    const headerEnd = buffer.indexOf(Buffer.from('\r\n\r\n'), headerStart);
                    if (headerEnd !== -1) {
                      const headerStr = buffer.subarray(headerStart, headerEnd).toString('utf8');
                      const fnMatch = headerStr.match(/filename="([^"]+)"/);
                      if (fnMatch) filename = fnMatch[1];
                      const dataStart = headerEnd + 4;
                      const nextBoundary = buffer.indexOf(boundaryBuffer, dataStart);
                      const dataEnd = nextBoundary !== -1 ? nextBoundary - 2 : buffer.length;
                      fileData = buffer.subarray(dataStart, dataEnd);
                    }
                  }
                }
              }

              if (!fileData) {
                fileData = buffer;
              }

              const ext = path.extname(filename) || '.webp';
              const safeName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}${ext}`;
              const uploadsDir = path.resolve(__dirname, 'public/uploads');
              fs.writeFileSync(path.join(uploadsDir, safeName), fileData);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ url: `/uploads/${safeName}` }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Failed to process upload' }));
            }
          });
          return;
        }

        // 2. Settings API
        if (url.startsWith('/api/settings.php')) {
          if (req.method === 'GET') {
            const data = getSettings();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return;
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                saveSettings(parsed);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (e: any) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
              }
            });
            return;
          }
        }

        // 3. Orders API
        if (url.startsWith('/api/orders.php')) {
          if (req.method === 'GET') {
            const orders = getOrders();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(orders));
            return;
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const orders = getOrders();
                
                if (url.includes('action=update')) {
                  const updated = orders.map((o: any) => o.id === parsed.id ? { ...o, ...parsed } : o);
                  saveOrders(updated);
                } else {
                  if (!parsed.id) {
                    parsed.id = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
                  }
                  if (!parsed.date) {
                    parsed.date = new Date().toISOString();
                  }
                  const newOrders = [parsed, ...orders.filter((o: any) => o.id !== parsed.id)];
                  saveOrders(newOrders);
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, order: parsed }));
              } catch (e: any) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
              }
            });
            return;
          }
        }

        // 4. Promo API
        if (url.startsWith('/api/promo.php') || url.startsWith('/api/validate_coupon.php')) {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const { code } = JSON.parse(body || '{}');
              const settings = getSettings();
              const cleanCode = (code || '').trim().toUpperCase();
              const promo = settings.promos?.find((p: any) => p.code?.toUpperCase() === cleanCode && p.isActive);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              if (promo) {
                res.end(JSON.stringify({
                  isActive: true,
                  discountPercentage: promo.discountPercentage
                }));
              } else {
                res.end(JSON.stringify({
                  isActive: false,
                  error: 'كود الخصم غير صحيح أو منتهي الصلاحية'
                }));
              }
            } catch (e) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ isActive: false, error: 'حدث خطأ في كود الخصم' }));
            }
          });
          return;
        }

        // 5. Auth API
        if (url.startsWith('/api/login.php') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const { username, password } = JSON.parse(body || '{}');
              const admin = getAdminCredentials();
              if (username === admin.username && password === admin.password) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, token: 'mock-token-123', isAdmin: true }));
              } else {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'بيانات الدخول غير صحيحة' }));
              }
            } catch (e) {
              res.statusCode = 400;
              res.end();
            }
          });
          return;
        }

        if (url.startsWith('/api/change_password.php') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const { username, newPassword } = JSON.parse(body || '{}');
              if (username && newPassword) {
                saveAdminCredentials({ username, password: newPassword });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } else {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing username or new password' }));
              }
            } catch (e) {
              res.statusCode = 400;
              res.end();
            }
          });
          return;
        }

        if (url.startsWith('/api/logout.php') && req.method === 'POST') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true }));
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), mockBackendPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'motion': ['motion', 'framer-motion', 'motion/react'],
            'lucide': ['lucide-react']
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
