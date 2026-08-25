const fs = require('fs');
let content = fs.readFileSync('src/components/admin/AdminOrders.tsx', 'utf8');

// Remove the injected code inside useMemo
content = content.replace(/const orders = useMemo\(\(\) => \{\s*const \[dbOrders, setDbOrders\] = React\.useState<any\[\]>\(\[\]\);\s*React\.useEffect\(\(\) => \{\s*fetch\('\/api\/orders\.php', \{\s*headers: \{ 'Authorization': `Bearer \$\{localStorage\.getItem\('adminToken'\)\}` \}\s*\}\)\.then\(r => r\.json\(\)\)\.then\(d => \{\s*if \(Array\.isArray\(d\)\) setDbOrders\(d\);\s*\}\);\s*\}, \[\]\);\s*let arr = \[\.\.\.dbOrders\];\s*arr\.sort\(\(a, b\) => new Date\(b\.date\)\.getTime\(\) - new Date\(a\.date\)\.getTime\(\)\);\s*return arr;\s*\}, \[dbOrders\]\);/g, `
  const [dbOrders, setDbOrders] = React.useState<any[]>([]);
  React.useEffect(() => {
    fetch('/api/orders.php', {
      headers: { 'Authorization': \`Bearer \${localStorage.getItem('adminToken')}\` }
    }).then(r => r.json()).then(d => {
       if (Array.isArray(d)) setDbOrders(d);
    });
  }, []);

  const orders = useMemo(() => {
    let arr = [...dbOrders];
    arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return arr;
  }, [dbOrders]);
`);

fs.writeFileSync('src/components/admin/AdminOrders.tsx', content);
