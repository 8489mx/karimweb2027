const fs = require('fs');

let path = 'src/translations.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'مدرب لياقة بدنية معتمد، متخصص في تصميم برامج التدريب والتغذية. هدفنا نساعدك توصل لأفضل نسخة من نفسك بأسلوب علمي ومستدام.',
  'مدرب لياقة بدنية معتمد، متخصص في تصميم برامج التدريب والتغذية. هدفنا نساعدك توصل لأفضل نسخة من نفسك بأسلوب علمي وعملي'
);

fs.writeFileSync(path, content);
