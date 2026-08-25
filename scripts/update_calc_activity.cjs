const fs = require('fs');

const tsPath = 'src/components/sections/CalorieCalculator.tsx';
let tsContent = fs.readFileSync(tsPath, 'utf8');

tsContent = tsContent.replace(
  `  const getActivityLabel = (val: number | '') => {
    switch (val) {
      case 1.2: return 'قليل جداً';
      case 1.375: return 'خفيف';
      case 1.55: return 'متوسط';
      case 1.725: return 'مرتفع';
      case 1.9: return 'مرتفع جداً';
      default: return 'غير محدد';
    }
  };`,
  `  const getActivityLabel = (val: number | '') => {
    switch (val) {
      case 1.2: return 'قليل النشاط';
      case 1.375: return 'نشاط خفيف';
      case 1.55: return 'نشاط متوسط';
      case 1.725: return 'نشاط عالي';
      case 1.9: return 'نشاط شاق';
      default: return 'غير محدد';
    }
  };`
);

fs.writeFileSync(tsPath, tsContent);
