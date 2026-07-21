const fs = require('fs');
let content = fs.readFileSync('src/translations.ts', 'utf8');

// We will inject missing keys into the 'calculator' block
const calcInjection = `
      weightImperial: 'الوزن (باوند)',
      heightImperial: 'الطول (قدم وبوصة)',
      bodyFat: 'نسبة الدهون %',
      bodyFatOptional: '(اختياري)',
      bodyFatNote: 'استخدم نسبة الدهون فقط لو عندك قياس موثوق. لو مش متأكد، سيبها فاضية.',
      ageDisclaimer: 'الحاسبة مخصصة بشكل أساسي للبالغين. لو السن أقل من 18 سنة، لازم يكون أي نظام تدريب أو تغذية تحت إشراف ولي الأمر ومختص.',
      resultNote: 'الرقم ده نقطة بداية تقريبية، والخطة الفعلية بتتحدد بعد تقييم الوزن والقياسات والنشاط والحالة الصحية والهدف.',
      macrosTitle: 'السعرات اليومية',
      bmrLabel: 'معدل الحرق الأساسي (BMR):',
      macrosEstimateNote: 'دي أرقام تقديرية كبداية. الأفضل متابعة الوزن، القياسات، الأداء في التمرين، الجوع والطاقة لمدة 2–3 أسابيع، وبعدها يتم تعديل السعرات حسب استجابة جسمك.',
      cutNote: 'تم تقليل السعرات بنسبة 15% كبداية آمنة للتنشيف. (النسبة الشائعة بين 10–20% حسب استجابتك)',
      bulkNote: 'تم زيادة السعرات بنسبة 7% لزيادة عضلية بأقل نسبة دهون. (النسبة الشائعة بين 5–10%)',
      maintainNote: 'دي السعرات المقدرة للحفاظ على وزنك الحالي.',
      whatsappResultTitle: 'عرفت أرقامك؟',
      whatsappResultSubtitle: 'ابعت نتيجتك ونشوف أنسب باقة وبداية ليك حسب هدفك.',
      sendResultBtn: 'ابعت نتيجتي على واتساب',
      errors: {
        weightMetric: 'برجاء إدخال وزن صحيح بين 35 و 250 كجم.',
        weightImperial: 'برجاء إدخال وزن صحيح بين 77 و 550 باوند.',
        age: 'برجاء إدخال عمر صحيح بين 14 و 80 سنة.',
        height: 'برجاء إدخال طول صحيح بين 120 و 230 سم.',
        bodyFat: 'برجاء إدخال نسبة دهون صحيحة بين 3% و 60%.'
      },
      whatsappTemplate: {
        hello: 'أهلاً، حسبت سعراتي من الموقع ودي نتيجتي:',
        goal: '- الهدف: ',
        age: '- السن: ',
        years: 'سنة',
        height: '- الطول: ',
        cm: 'سم',
        weight: '- الوزن: ',
        kg: 'كجم',
        activity: '- النشاط: ',
        suggestedCals: '- السعرات المقترحة: ',
        cals: 'سعر حراري',
        bmr: '- معدل الحرق الأساسي BMR: ',
        macrosHeader: 'تقسيمة الماكروز:',
        protein: '- البروتين: ',
        grams: 'جم',
        fats: '- الدهون: ',
        carbs: '- الكارب: ',
        footer: 'وعايز أبدأ خطة مناسبة ليا.'
      },
`;

content = content.replace("ctaBtn: 'صمم خطتك الآن',", "ctaBtn: 'صمم خطتك الآن',\n" + calcInjection);

fs.writeFileSync('src/translations.ts', content);
