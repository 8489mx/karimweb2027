const fs = require('fs');

// Fix SettingsContext
let settingsContent = fs.readFileSync('src/context/SettingsContext.tsx', 'utf8');
settingsContent = settingsContent.replace(/if \(token === 'mock-token-123'\) \{/g, `
      const currentToken = localStorage.getItem('adminToken');
      if (currentToken === 'mock-token-123') {`);
fs.writeFileSync('src/context/SettingsContext.tsx', settingsContent);

// Fix Admin.tsx
let adminContent = fs.readFileSync('src/pages/Admin.tsx', 'utf8');
adminContent = adminContent.replace(/const data = await res\.json\(\);\s*const contentType = res\.headers\.get\("content-type"\);\s*const isJson = contentType && contentType\.includes\("application\/json"\);\s*if \(res\.ok && isJson && data\.success\) \{/g, `
      const contentType = res.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      
      let data = null;
      if (isJson) {
         try { data = await res.json(); } catch(e) {}
      }

      if (res.ok && isJson && data && data.success) {
`);
fs.writeFileSync('src/pages/Admin.tsx', adminContent);

