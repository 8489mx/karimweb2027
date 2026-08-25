const fs = require('fs');
let content = fs.readFileSync('src/components/admin/AdminOrders.tsx', 'utf8');

content = content.replace(/React\.useState<Order\[\]>/g, 'React.useState<any[]>');
fs.writeFileSync('src/components/admin/AdminOrders.tsx', content);
