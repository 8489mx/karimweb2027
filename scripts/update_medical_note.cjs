const fs = require('fs');

const tsPath = 'src/translations.ts';
let tsContent = fs.readFileSync(tsPath, 'utf8');

tsContent = tsContent.replace(
  `medicalNote: 'في حالة أمراض الكلى أو الكبد، السكري، اضطرابات الأكل، جراحات السمنة أو استخدام أدوية تؤثر في الوزن، يُرجى مراجعة مختص قبل تطبيق النتيجة.',`,
  `medicalNote: 'هذه الحاسبة العامة غير مخصصة للحمل أو الرضاعة، لأن الاحتياجات تختلف حسب المرحلة. وفي حالة أمراض الكلى أو الكبد، السكري، اضطرابات الأكل، أو جراحات السمنة، يُرجى مراجعة مختص.',`
);

fs.writeFileSync(tsPath, tsContent);
