const fs = require('fs');
let content = fs.readFileSync('src/components/admin/AdminOrders.tsx', 'utf8');

content = content.replace(/\{amt\} \{curr\}/g, '{Number(amt)} {curr}');
fs.writeFileSync('src/components/admin/AdminOrders.tsx', content);
