const fs = require('fs');
let path = 'src/translations.ts';
let content = fs.readFileSync(path, 'utf8');

const newFooter = `    footer: {
      caption: 'مدرب لياقة بدنية معتمد، متخصص في تصميم برامج التدريب والتغذية. هدفنا نساعدك توصل لأفضل نسخة من نفسك بأسلوب علمي ومستدام.',
      contact: 'تواصل معنا',
      quickLinks: 'روابط سريعة',
      about: 'عن كريم',
      programs: 'الباقات',
      calculator: 'حاسبة السعرات',
      faq: 'الأسئلة الشائعة',
      rights: 'Karim Zakaria. All rights reserved.',
      privacyPolicy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      altLogo: 'كريم زكريا',
    }`;

content = content.replace(/    footer: \{\s*caption:.*?\s*contact:.*?\s*rights:.*?\s*privacyPolicy:.*?\s*terms:.*?\s*altLogo:.*?,\s*\}/s, newFooter);

fs.writeFileSync(path, content);
