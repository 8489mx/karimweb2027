const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');
const { execSync } = require('child_process');

function getAllTsxFiles() {
  const result = execSync('find src -name "*.tsx"').toString();
  return result.split('\n').filter(f => f.trim().length > 0);
}

const files = getAllTsxFiles();
let urls = [];

// Also find Unsplash
const urlRegex = /https:\/\/(images\.unsplash\.com)\/[^\s"']+/g;

const urlMap = {};

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[0]);
  }
});

urls = [...new Set(urls)];

console.log(`Found ${urls.length} unique Unsplash URLs.`);

const downloadAndConvert = (url, index) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects if any (Unsplash sometimes redirects)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, handleResponse).on('error', reject);
      } else {
        handleResponse(res);
      }

      function handleResponse(res) {
        if (res.statusCode !== 200) {
          console.error(`Failed to fetch ${url} - status ${res.statusCode}`);
          resolve();
          return;
        }

        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', async () => {
          const buffer = Buffer.concat(chunks);
          try {
            const filename = `unsplash_${index}.webp`;
            const outputPath = path.join(__dirname, '../public/images', filename);
            
            await sharp(buffer)
              .webp({ quality: 80 })
              .toFile(outputPath);
            
            urlMap[url] = `/images/${filename}`;
            resolve();
          } catch (err) {
            console.error(`Error converting ${url}:`, err);
            resolve();
          }
        });
      }
    }).on('error', reject);
  });
};

async function run() {
  for (let i = 0; i < urls.length; i++) {
    console.log(`Processing ${i + 1}/${urls.length}: ${urls[i]}`);
    try {
      await downloadAndConvert(urls[i], i);
    } catch(e) {
      console.error(e);
    }
  }

  // Update source files
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const [oldUrl, newUrl] of Object.entries(urlMap)) {
      if (content.includes(oldUrl)) {
        content = content.split(oldUrl).join(newUrl);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    }
  });
  
  console.log("Done Unsplash!");
}

run();
