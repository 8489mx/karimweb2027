const fs = require('fs');
let content = fs.readFileSync('src/components/admin/AdminOrders.tsx', 'utf8');

content = content.replace(/React\.useEffect\(\(\) => \{\n\s*fetch\('\/api\/orders\.php', \{([\s\S]*?)\}\)\.then\(r => r\.json\(\)\)\.then\(d => \{\s*if \(Array\.isArray\(d\)\) setDbOrders\(d\);\s*\}\);\n\s*\}, \[\]\);/g, `
  React.useEffect(() => {
    fetch('/api/orders.php', {
      headers: { 'Authorization': \`Bearer \${localStorage.getItem('adminToken')}\` }
    })
    .then(r => r.headers.get("content-type")?.includes("application/json") ? r.json() : [])
    .then(d => {
       if (Array.isArray(d)) setDbOrders(d);
    })
    .catch(e => {
       console.log("Mock orders fetched", e);
       setDbOrders([]);
    });
  }, []);
`);

fs.writeFileSync('src/components/admin/AdminOrders.tsx', content);
