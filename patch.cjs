const fs = require('fs');
let code = fs.readFileSync('src/components/sections/ClientResults.tsx', 'utf8');

const startIdx = code.indexOf('const transformations = [');
const endIdx = code.indexOf('];', startIdx) + 2;

const newCode = `const beforeAfterModules = import.meta.glob('/public/assets/images/before_after/*.{jpg,jpeg,png,webp,gif}', { eager: true });
const beforeAfterImages = Object.keys(beforeAfterModules)
  .map(path => path.replace('/public', ''))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\\d+/) ? a.match(/\\d+/)[0] : "0", 10);
    const numB = parseInt(b.match(/\\d+/) ? b.match(/\\d+/)[0] : "0", 10);
    return numA - numB;
  });

const baseTransformations = [
  { 
    id: 1, 
    name: "Ahmed Mahmoud",
    nameAr: "أحمد محمود",
    result: "Lost 15KG Fat",
    resultAr: "خسارة 15 كجم دهون صافية",
    duration: "In 3 Months",
    durationAr: "في 3 أشهـر",
    quote: "Captain Karim changed my concept of dieting. I reached this result without feeling deprived.",
    quoteAr: "كابتن كريم غير مفهومي عن الدايت، وصلت للنتيجة دي من غير ما أحس بأي حرمان أو تعب في يومي.",
    beforeImage: "/assets/images/before_after/before_after-15.jpg", 
    afterImage: "/assets/images/before_after/before_after-16.jpg",
  },
  { 
    id: 3, 
    name: "Tarek Ziad",
    nameAr: "طارق زياد",
    result: "Shredding (5% Fat)",
    resultAr: "تنشيف للبطولات (5% دهون)",
    duration: "In 2 Months",
    durationAr: "في شهرين",
    quote: "The accuracy of macros and calories helped me reach the shape of my life.",
    quoteAr: "دقة حاسبة السعرات والماكروز اللي كابتن كريم بيعملها خلتني أوصل لفورمة عمري ما تخيلت أوصلها.",
    beforeImage: "/assets/images/before_after/before_after-19.jpg", 
    afterImage: "/assets/images/before_after/before_after-20.jpg" 
  },
  { 
    id: 4, 
    name: "Omar Farouk",
    nameAr: "عمر فاروق",
    result: "Lost 20KG",
    resultAr: "خسارة 20 كجم",
    duration: "In 5 Months",
    durationAr: "في 5 أشهـر",
    quote: "Changed my whole lifestyle. Fitness is no longer a burden thanks to right guidance.",
    quoteAr: "غيرت أسلوب حياتي بالكامل، الفتنس مابقاش عبء، بقى جزء من يومي بفضل التوجيه الصح.",
    beforeImage: "/assets/images/before_after/before_after-21.jpg", 
    afterImage: "/assets/images/before_after/before_after-22.jpg"
  },
  { 
    id: 5, 
    name: "Mohamed Ali",
    nameAr: "محمد علي",
    result: "Gained Muscle Mass",
    resultAr: "زيادة كتلة عضلية",
    duration: "In 4 Months",
    durationAr: "في 4 أشهـر",
    quote: "The personalized program helped me break my plateau and see real muscle growth.",
    quoteAr: "البرنامج المخصص ساعدني أكسر ثبات الوزن وأشوف زيادة حقيقية في العضلات.",
    beforeImage: "/assets/images/before_after/before_after-23.jpg", 
    afterImage: "/assets/images/before_after/before_after-24.jpg"
  }
];

const transformations: any[] = [];
for (let i = 0; i < beforeAfterImages.length; i += 2) {
  if (i + 1 < beforeAfterImages.length) {
    const bImg = beforeAfterImages[i];
    const aImg = beforeAfterImages[i + 1];
    const existing = baseTransformations.find(t => t.beforeImage === bImg && t.afterImage === aImg);
    
    if (existing) {
      transformations.push(existing);
    } else {
      transformations.push({
        id: i / 2 + 100,
        name: "Client",
        nameAr: "عميل",
        result: "Great Transformation",
        resultAr: "تغيير ممتاز",
        duration: "In 3 Months",
        durationAr: "في 3 أشهـر",
        quote: "A great transformation with proper guidance and commitment.",
        quoteAr: "نتيجة ممتازة من الالتزام والمتابعة المستمرة.",
        beforeImage: bImg,
        afterImage: aImg
      });
    }
  }
}`;

code = code.substring(0, startIdx) + newCode + code.substring(endIdx);
fs.writeFileSync('src/components/sections/ClientResults.tsx', code);
