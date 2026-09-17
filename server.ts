import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env if present
dotenv.config();

// Fix for CJS vs ESM when compiled with esbuild
const isESM = typeof import.meta !== 'undefined' && import.meta.url;
const currentFilename = isESM ? fileURLToPath(import.meta.url) : __filename;
const currentDirname = isESM ? path.dirname(currentFilename) : __dirname;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ==========================================
  // API Routes (Secure Backend)
  // ==========================================
  
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });


  // Secure Xpay integration
  app.post('/api/create-payment', async (req, res) => {
    try {
      const { orderId, name, phone, packageCode, durationCode, countryCode, amount, currency } = req.body;
      
      const XPAY_SECRET_KEY = process.env.XPAY_SECRET_KEY;
      const XPAY_COMMUNITY_ID = process.env.XPAY_COMMUNITY_ID;
      const XPAY_VARIABLE_AMOUNT_ID = process.env.XPAY_VARIABLE_AMOUNT_ID;

      if (!XPAY_SECRET_KEY || !XPAY_COMMUNITY_ID || !XPAY_VARIABLE_AMOUNT_ID) {
         console.error("Missing XPay credentials in environment.");
         return res.status(500).json({ 
            success: false, 
            message: 'بوابة الدفع غير مهيأة بالكامل، يرجى التأكد من إضافة XPAY_COMMUNITY_ID و XPAY_VARIABLE_AMOUNT_ID' 
         });
      }

      console.log(`Initiating XPay payment for order ${orderId}: ${amount} ${currency}`);

      // Example standard XPay request payload based on variable amount docs
      const xpayPayload = {
        billing_data: {
          name: name || "Customer",
          email: "customer@example.com", // Fallback email since we only collect phone
          phone_number: phone
        },
        amount: amount,
        currency: currency === 'جنيه' ? 'EGP' : currency === 'ر.س' ? 'SAR' : 'USD',
        community_id: XPAY_COMMUNITY_ID,
        variable_amount_id: parseInt(XPAY_VARIABLE_AMOUNT_ID, 10),
        pay_using: "card",
        custom_fields: [
           { field_label: "Order ID", field_value: orderId },
           { field_label: "Package", field_value: packageCode || "unknown" },
           { field_label: "Duration", field_value: durationCode || "unknown" }
        ]
      };

      // Call XPay Variable Amount API
      const xpayResponse = await fetch('https://community.xpay.app/api/v1/payments/pay/variable-amount', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'x-api-key': XPAY_SECRET_KEY
         },
         body: JSON.stringify(xpayPayload)
      });

      const xpayData = await xpayResponse.json() as any;

      if (!xpayResponse.ok) {
         console.error("XPay API Error:", JSON.stringify(xpayData, null, 2));
         return res.status(500).json({ 
            success: false, 
            message: 'حدث خطأ من بوابة الدفع', 
            details: xpayData 
         });
      }

      // XPay returns an iframe_url or payment_url usually
      const paymentUrl = xpayData?.data?.iframe_url || xpayData?.data?.payment_url;

      if (!paymentUrl) {
         console.error("XPay did not return a payment URL:", xpayData);
         return res.status(500).json({ success: false, message: 'لم يتم استلام رابط الدفع' });
      }

      res.json({ 
        success: true, 
        message: 'Payment initialized',
        url: paymentUrl
      });

    } catch (error) {
      console.error('Payment error:', error);
      res.status(500).json({ success: false, message: 'فشل في تهيئة الدفع' });
    }
  });

  // ==========================================
  // Vite Middleware / Static Serving
  // ==========================================
  
  if (process.env.NODE_ENV !== 'production') {
    // Development mode: Use Vite's development server as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve static files built by Vite
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('index.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        }
      }
    }));
    
    // SPA fallback
    app.get('*all', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
