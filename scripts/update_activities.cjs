const fs = require('fs');

const tsPath = 'src/translations.ts';
let tsContent = fs.readFileSync(tsPath, 'utf8');

tsContent = tsContent.replace(
  `      activities: {
        sedentary: 'قليل جداً (عمل مكتبي، أقل من 5,000 خطوة، ولا يوجد تمرين منتظم)',
        light: 'خفيف (حركة بسيطة أو تمرين من يوم إلى 3 أيام أسبوعيًا)',
        moderate: 'متوسط (حركة يومية جيدة وتمرين من 3 إلى 5 أيام أسبوعيًا)',
        active: 'مرتفع (عمل متحرك أو تمرين قوي من 5 إلى 6 أيام أسبوعيًا)',
        veryActive: 'مرتفع جدًا (عمل بدني شاق مع تدريب يومي قوي)',
      },`,
  `      activities: {
        sedentary: 'قليل النشاط (عمل مكتبي، أقل من 5000 خطوة، بدون تمرين)',
        light: 'نشاط خفيف (حركة بسيطة، أو تمرين 1-3 أيام)',
        moderate: 'نشاط متوسط (حركة يومية + تمرين 3-5 أيام)',
        active: 'نشاط عالي (عمل متحرك + تمرين 5-6 أيام)',
        veryActive: 'نشاط شاق (عمل بدني شاق + تمرين يومي)',
      },`
);

fs.writeFileSync(tsPath, tsContent);
