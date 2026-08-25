const fs = require('fs');

const tsPath = 'src/translations.ts';
let tsContent = fs.readFileSync(tsPath, 'utf8');

const newActivities = `activities: {
        sedentary: 'قليل جداً (عمل مكتبي، أقل من 5,000 خطوة، ولا يوجد تمرين منتظم)',
        light: 'خفيف (حركة بسيطة أو تمرين من يوم إلى 3 أيام أسبوعيًا)',
        moderate: 'متوسط (حركة يومية جيدة وتمرين من 3 إلى 5 أيام أسبوعيًا)',
        active: 'مرتفع (عمل متحرك أو تمرين قوي من 5 إلى 6 أيام أسبوعيًا)',
        veryActive: 'مرتفع جدًا (عمل بدني شاق مع تدريب يومي قوي)',
      },`;

const newTexts = `
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

// Replace activities block
tsContent = tsContent.replace(/activities:\s*\{[\s\S]*?\},/, newActivities);

// Replace BMR label
tsContent = tsContent.replace(/bmrLabel:.*?,/, "bmrLabel: 'معدل الحرق التقديري أثناء الراحة (RMR):',");

// Replace macrosEstimateNote
tsContent = tsContent.replace(/macrosEstimateNote:.*?,/, "macrosEstimateNote: 'هذه الأرقام نقطة بداية تقديرية. تابع متوسط الوزن والأداء والجوع لمدة أسبوعين، ثم عدّل السعرات حسب استجابة جسمك.',");

// Replace cutNote
tsContent = tsContent.replace(/cutNote:.*?,/, "cutNote: 'تم تقليل السعرات بنسبة 15% كبداية آمنة للتنشيف. لا تعدّل السعرات بناءً على تغير وزن يوم أو يومين.',");

// Replace bulkNote
tsContent = tsContent.replace(/bulkNote:.*?,/, "bulkNote: 'تم زيادة السعرات بنسبة 7% كبداية للتضخيم. راقب متوسط الوزن والأداء لتجنب زيادة السعرات أسرع من المطلوب.',");

// Replace maintainNote
tsContent = tsContent.replace(/maintainNote:.*?,/, "maintainNote: 'سعرات الثبات هي مجرد تقدير. قد تحتاج لتعديلها لو لاحظت تغير في الوزن بمرور الوقت.',");

// Insert new additions right before the end of the calculator block
tsContent = tsContent.replace(/(\s+)(},)(\s+hero:)/, `$1${newTexts}$1$2$3`);

fs.writeFileSync(tsPath, tsContent);
console.log('Translations updated.');
