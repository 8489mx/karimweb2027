const fs = require('fs');

const tsPath = 'src/translations.ts';
let tsContent = fs.readFileSync(tsPath, 'utf8');

// Remove from nav
const toRemove = `          // New additions
      resistanceTraining: 'هل تمارس تمارين مقاومة بانتظام؟',
      yes: 'نعم',
      no: 'لا',
      pregnancy: 'هل يوجد حمل أو رضاعة حاليًا؟',
      medicalNote: 'في حالة أمراض الكلى أو الكبد، السكري، اضطرابات الأكل، جراحات السمنة أو استخدام أدوية تؤثر في الوزن، يُرجى مراجعة مختص قبل تطبيق النتيجة.',
      lowCaloriesWarning: 'السعرات الناتجة منخفضة وقد يصعب معها الحصول على احتياجات الجسم الغذائية. لا تبدأ بهذه النتيجة قبل مراجعة مختص.',
      lowCarbsWarning: 'السعرات الناتجة منخفضة جدًا مقارنة بالبروتين والدهون المقترحة، يحتاج توزيع الماكروز إلى مراجعة شخصية.',
      pregnancyWarning: 'هذه الحاسبة العامة غير مخصصة للحمل أو الرضاعة، لأن الاحتياجات تختلف حسب المرحلة والحالة الصحية.',
      under13Warning: 'هذه الحاسبة غير مصممة لهذه المرحلة العمرية، لأن احتياجات النمو تختلف حسب العمر ومراحل التطور.',
      age13to15Note: 'هذه الأرقام نقطة بداية تقديرية، يفضل متابعة الأداء والنمو مع مدرب أو مختص.',
      maintenanceCaloriesText: 'سعرات الحفاظ على الوزن التقديرية',
      targetCaloriesCut: 'سعرات هدف خفض الدهون',
      targetCaloriesBulk: 'سعرات هدف بناء العضلات',
      whatsappUnder18: 'إرسال البيانات لتقييم المراهق/الطفل',
      whatsappPregnancy: 'التواصل لتحديد الاحتياجات المناسبة',
      selectActivity: 'اختر مستوى نشاطك',`;

tsContent = tsContent.replace(toRemove, '');

// Append to calculator
const toAdd = `
      // New additions
      resistanceTraining: 'هل تمارس تمارين مقاومة بانتظام؟',
      yes: 'نعم',
      no: 'لا',
      pregnancy: 'هل يوجد حمل أو رضاعة حاليًا؟',
      medicalNote: 'في حالة أمراض الكلى أو الكبد، السكري، اضطرابات الأكل، جراحات السمنة أو استخدام أدوية تؤثر في الوزن، يُرجى مراجعة مختص قبل تطبيق النتيجة.',
      lowCaloriesWarning: 'السعرات الناتجة منخفضة وقد يصعب معها الحصول على احتياجات الجسم الغذائية. لا تبدأ بهذه النتيجة قبل مراجعة مختص.',
      lowCarbsWarning: 'السعرات الناتجة منخفضة جدًا مقارنة بالبروتين والدهون المقترحة، يحتاج توزيع الماكروز إلى مراجعة شخصية.',
      pregnancyWarning: 'هذه الحاسبة العامة غير مخصصة للحمل أو الرضاعة، لأن الاحتياجات تختلف حسب المرحلة والحالة الصحية.',
      under13Warning: 'هذه الحاسبة غير مصممة لهذه المرحلة العمرية، لأن احتياجات النمو تختلف حسب العمر ومراحل التطور.',
      age13to15Note: 'هذه الأرقام نقطة بداية تقديرية، يفضل متابعة الأداء والنمو مع مدرب أو مختص.',
      maintenanceCaloriesText: 'سعرات الحفاظ على الوزن التقديرية',
      targetCaloriesCut: 'سعرات هدف خفض الدهون',
      targetCaloriesBulk: 'سعرات هدف بناء العضلات',
      whatsappUnder18: 'إرسال البيانات لتقييم المراهق/الطفل',
      whatsappPregnancy: 'التواصل لتحديد الاحتياجات المناسبة',
      selectActivity: 'اختر مستوى نشاطك',
`;

// Insert it at the end of calculator
tsContent = tsContent.replace(/(\s+whatsappTemplate: {)/, `${toAdd}$1`);

fs.writeFileSync(tsPath, tsContent);
console.log('Fixed');
