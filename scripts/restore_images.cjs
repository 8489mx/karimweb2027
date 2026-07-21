const fs = require('fs');
const urls = [
  "https://i.postimg.cc/wvwPbjRw/Social-Media.jpg",
  "https://i.postimg.cc/7hqy8Bbz/6e3be737-697a-45c4-a223-4194534d41bc.jpg",
  "https://i.postimg.cc/nz4CGw6L/Chat-2.jpg",
  "https://i.postimg.cc/525YJqWf/16.jpg",
  "https://i.postimg.cc/9QPR2tHh/15.jpg",
  "https://i.postimg.cc/g2yXpqb9/14.jpg",
  "https://i.postimg.cc/Mp0Mwb2C/13.jpg",
  "https://i.postimg.cc/cL7gWMyP/12.jpg",
  "https://i.postimg.cc/jSYwB3mt/11.jpg",
  "https://i.postimg.cc/3xQ4zfVQ/9.jpg",
  "https://i.postimg.cc/K8hkCpwy/8.jpg",
  "https://i.postimg.cc/RZx62p8k/7.jpg",
  "https://i.postimg.cc/cLGgPkjV/6.jpg",
  "https://i.postimg.cc/rw207ZbH/5.jpg",
  "https://i.postimg.cc/Njv9ZCVJ/4.jpg",
  "https://i.postimg.cc/L8FYGQ7v/3.jpg",
  "https://i.postimg.cc/FHXdwCqZ/03.jpg",
  "https://i.postimg.cc/vZwgC2j7/2.jpg",
  "https://i.postimg.cc/MpJMg34b/02.jpg",
  "https://i.postimg.cc/ncD9Rfd3/1.jpg",
  "https://i.postimg.cc/Dz8HqmzJ/b02c9e53-2fde-48dd-9be5-2388d20a807a.jpg",
  "https://i.postimg.cc/pTQJ6mgc/2026-06-29-195443.jpg",
  "https://i.postimg.cc/3JxFtJ9y/2026-06-29-195502.jpg",
  "https://i.postimg.cc/PqmdQWYQ/image.png",
  "https://i.postimg.cc/T2S7cZ9S/2026-07-01-174133.jpg",
  "https://plain-eeur-prod-public.komododecks.com/202606/30/0yzjtDvQm3evBk23KMhV/image.jpg",
  "https://plain-eeur-prod-public.komododecks.com/202606/30/80HoRVLzN0o1KQmxGnuZ/image.jpg",
  "https://plain-eeur-prod-public.komododecks.com/202606/30/d6vRy8e8o3r0MnAF27oD/image.jpg",
  "https://i.postimg.cc/SRJhRVzH/Generated-Image-June-30-2026-5-23PM.jpg",
  "https://i.postimg.cc/fWBPgx0V/2026-06-30-174422.jpg",
  "https://i.postimg.cc/QMGYWmv2/2026-06-30-174436.jpg",
  "https://i.postimg.cc/hty00tHX/2026-07-01-200648.jpg",
  "https://i.postimg.cc/LXfBRBhB/2026-07-01-200632.jpg",
  "https://i.postimg.cc/W4dxGKfT/2026-07-01-201825.jpg",
  "https://i.postimg.cc/vTsjdm81/2026-07-01-201839.jpg",
  "https://i.ibb.co/CsQp7dfk/logo.png"
];

const { execSync } = require('child_process');
function getAllTsxFiles() {
  const result = execSync('find src -name "*.tsx"').toString();
  return result.split('\n').filter(f => f.trim().length > 0);
}
const files = getAllTsxFiles();

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (let i = 0; i < urls.length; i++) {
    const newUrl = `/images/img_${i}.webp`;
    if (content.includes(newUrl)) {
      content = content.split(newUrl).join(urls[i]);
      changed = true;
    }
  }
  
  // Also restore unsplash
  const unsplashUrl = "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop";
  const newUnsplash = "/images/unsplash_0.webp";
  if (content.includes(newUnsplash)) {
      content = content.split(newUnsplash).join(unsplashUrl);
      changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Restored ${file}`);
  }
});
