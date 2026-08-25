const fs = require('fs');

const files = [
  'src/components/admin/AdminStore.tsx',
  'src/components/admin/AdminTestimonials.tsx',
  'src/components/admin/AdminResults.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/const data = await response\.json\(\);\n\s*if \(!response\.ok\) \{\n\s*throw new Error\(data\.error \|\| 'Unknown upload error'\);\n\s*\}\n\s*return data\.url;/g, `
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    
    if (isJson) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unknown upload error');
      }
      return data.url;
    } else {
      // Mock upload for preview environment
      return URL.createObjectURL(file);
    }
  `);
  fs.writeFileSync(file, content);
}

// AdminSettings.tsx is slightly different
let settingsContent = fs.readFileSync('src/components/admin/AdminSettings.tsx', 'utf8');
settingsContent = settingsContent.replace(/const data = await response\.json\(\);\n\s*if \(!response\.ok\) throw new Error\(data\.error\);\n\s*setSeo\(\{ \.\.\.seo, ogImage: data\.url \}\);/g, `
      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      
      let url = "";
      if (isJson) {
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          url = data.url;
      } else {
          url = URL.createObjectURL(file);
      }
      setSeo({ ...seo, ogImage: url });
`);
fs.writeFileSync('src/components/admin/AdminSettings.tsx', settingsContent);
