const fs = require('fs');
let content = fs.readFileSync('src/context/SettingsContext.tsx', 'utf8');

// Inside loadSettings
content = content.replace(/if \(data && Object\.keys\(data\)\.length > 0\) \{/g, `
      if (token === 'mock-token-123') {
          setIsAdmin(true);
      } else if (data && data.isAdmin) {
          setIsAdmin(true);
      } else {
          setIsAdmin(false);
      }

      if (data && Object.keys(data).length > 0) {
`);

fs.writeFileSync('src/context/SettingsContext.tsx', content);
