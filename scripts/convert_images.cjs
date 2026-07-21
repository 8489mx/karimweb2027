const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// Find all tsx files
const { execSync } = require('child_process');

function getAllTsxFiles() {
  const result = execSync('find src -name "*.tsx"').toString();
  return result.split('\n').filter(f => f.trim().length > 0);
}

const files = getAllTsxFiles();
let urls = [];

// Regex to find external image URLs
const urlRegex = /https:\/\/(i\.postimg\.cc|plain-eeur-prod-public\.komododecks\.com|i\.ibb\.co)\/[^\s"']+/g;

const urlMap = {};

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[0]);
  }
});

urls = [...new Set(urls)]; // deduplicate

console.log(`Found ${urls.length} unique external image URLs.`);

const downloadAndConvert = (url, index) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url} - status ${res.statusCode}`));
        return;
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        try {
          const filename = `img_${index}.webp`;
          const outputPath = path.join(__dirname, '../public/images', filename);
          
          await sharp(buffer)
            .webp({ quality: 80 })
            .toFile(outputPath);
          
          urlMap[url] = `/images/${filename}`;
          resolve();
        } catch (err) {
          console.error(`Error converting ${url}:`, err);
          resolve(); // don't reject, just skip
        }
      });
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
  
  console.log("Done!");
}

run();
