const fs = require('fs');
const tsPath = 'src/components/sections/CalorieCalculator.tsx';

const newContent = `import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { CustomSelect } from '../ui/CustomSelect';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { SectionHeading } from '../ui/SectionHeading';
import { trackCalculatorCompleted, trackCalculatorWhatsAppClick } from '../../utils/tracking';

export function CalorieCalculator() {
  const { t, lang } = useLanguage();
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');
  const [heightFt, setHeightFt] = useState<string>('');
  const [heightIn, setHeightIn] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [activity, setActivity] = useState<number | ''>('');
  const [bodyFat, setBodyFat] = useState<string>('');
  const [resistanceTraining, setResistanceTraining] = useState<'yes' | 'no' | ''>('');
  
  const [results, setResults] = useState<{ 
    baseTdee: number; 
    bmr: number; 
    weightKg: number; 
    heightCm: number;
    proteinWeightKg: number;
  } | null>(null);
  const [goal, setGoal] = useState<'maintain' | 'cut' | 'bulk'>('maintain');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const clearResults = () => {
    if (results) setResults(null);
  };

  const handleGenderChange = (val: 'male' | 'female') => {
    setGender(val);
    clearResults();
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Weight to kg
    const w = unitSystem === 'metric' ? parseFloat(weight) : parseFloat(weight) * 0.453592;
    const a = parseInt(age);

    if (!w || !a) return;

    if (w < 35 || w > 250) {
      setErrorMsg(unitSystem === 'metric' ? 'يرجى إدخال وزن صحيح بين 35 و 250 كجم' : 'يرجى إدخال وزن صحيح');
      return;
    }

    if (a < 5 || a > 119) {
      setErrorMsg('العمر يجب أن يكون بين 5 و 119 سنة');
      return;
    }

    // Height to cm
    let h = 0;
    if (unitSystem === 'metric') {
      h = parseFloat(heightCm);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      h = (ft * 30.48) + (inch * 2.54);
    }

    if (!h || h < 120 || h > 230) {
      setErrorMsg('يرجى إدخال طول صحيح بين 120 و 230 سم');
      return;
    }

    if (a >= 13) {
      if (activity === '') {
        setErrorMsg('يرجى اختيار مستوى النشاط');
        return;
      }
      if (resistanceTraining === '') {
        setErrorMsg('يرجى تحديد ما إذا كنت تمارس تمارين مقاومة');
        return;
      }
    }

    const bf = parseFloat(bodyFat);
    if (bodyFat && (isNaN(bf) || bf < 3 || bf > 60)) {
      setErrorMsg('نسبة الدهون يجب أن تكون بين 3 و 60');
      return;
    }

    // BMR Calculation
    let bmr = 0;
    if (bf) {
      // Katch-McArdle
      const lbm = w * (1 - bf / 100);
      bmr = 370 + (21.6 * lbm);
    } else {
      // Mifflin-St Jeor
      if (gender === 'male') {
        bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
      } else {
        bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
      }
    }

    // Protein calculation weight (BMI Cap)
    const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    const proteinWeightKg = bmi >= 30 ? 30 * heightM * heightM : w;

    // Default if not selected (youth cases < 13)
    const act = activity || 1.2; 
    const baseTdee = bmr * act;

    setResults({ baseTdee, bmr, weightKg: w, heightCm: h, proteinWeightKg });
    trackCalculatorCompleted({ goal, gender, activity_level: String(activity), target_calories: baseTdee });
  };

  const roundCalories = (val: number) => Math.round(val / 10) * 10;
  const roundMacro = (val: number) => Math.round(val / 5) * 5;

  const getActivityLabel = (val: number | '') => {
    switch (val) {
      case 1.2: return 'قليل جداً';
      case 1.375: return 'خفيف';
      case 1.55: return 'متوسط';
      case 1.725: return 'مرتفع';
      case 1.9: return 'مرتفع جداً';
      default: return 'غير محدد';
    }
  };

  let content = null;

  if (results) {
    const ageNum = parseInt(age);
    const isUnder13 = ageNum < 13;
    const is13to15 = ageNum >= 13 && ageNum <= 15;
    const is16to17 = ageNum >= 16 && ageNum <= 17;
    const isAdult = ageNum >= 18;

    if (isUnder13) {
      content = (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-sm">
          <p className="text-brand-text font-medium mb-6 leading-relaxed">
            {t.calculator.under13Warning || 'هذه الحاسبة غير مصممة لهذه المرحلة العمرية، لأن احتياجات النمو تختلف حسب العمر ومراحل التطور.'}
          </p>
          <Button variant="primary" href={\`https://wa.me/201210884617?text=\${encodeURIComponent('أريد تقييم تغذية ونشاط طفل: العمر ' + ageNum + ' سنة، ' + (gender === 'male' ? 'ذكر' : 'أنثى') + '، الوزن ' + Math.round(results.weightKg) + ' كجم، الطول ' + Math.round(results.heightCm) + ' سم.')}\`} className="!px-8">
            {t.calculator.whatsappUnder18 || 'إرسال البيانات لتقييم المراهق/الطفل'}
          </Button>
        </motion.div>
      );
    } else {
      let targetCalories = results.baseTdee;
      if (!is13to15) {
        if (goal === 'cut') targetCalories = results.baseTdee * 0.85;
        if (goal === 'bulk') targetCalories = results.baseTdee * 1.07;
      } else {
        // 13-15 years always maintain
        targetCalories = results.baseTdee;
      }

      const finalTdeeRounded = roundCalories(targetCalories);
      const maintenanceRounded = roundCalories(results.baseTdee);
      const bmrRounded = roundCalories(results.bmr);

      // Macros
      let proteinMultiplier = 1.6; // Default
      if (resistanceTraining === 'yes') {
        proteinMultiplier = (goal === 'cut' && !is13to15) ? 2.0 : 1.8;
      } else {
        proteinMultiplier = (goal === 'cut' && !is13to15) ? 1.6 : 1.4;
      }

      const proteinGramsRaw = results.proteinWeightKg * proteinMultiplier;
      const proteinCalories = proteinGramsRaw * 4;
      const fatCalories = targetCalories * 0.25;
      const fatGramsRaw = fatCalories / 9;
      const carbsCalories = targetCalories - proteinCalories - fatCalories;
      const carbsGramsRaw = carbsCalories / 4;

      const protein = roundMacro(proteinGramsRaw);
      const fats = roundMacro(fatGramsRaw);
      const carbs = carbsGramsRaw > 0 ? roundMacro(carbsGramsRaw) : 0;
      
      const hasLowCarbWarning = carbsCalories < 0;
      const hasLowCaloriesWarning = (!is13to15 && ((gender === 'male' && finalTdeeRounded < 1500) || (gender === 'female' && finalTdeeRounded < 1200)));

      let whatsappText = \`النتيجة من حاسبة السعرات:
العمر: \${ageNum}
الجنس: \${gender === 'male' ? 'ذكر' : 'أنثى'}
الوزن: \${Math.round(results.weightKg)} كجم
الطول: \${Math.round(results.heightCm)} سم
النشاط: \${getActivityLabel(activity)}
تمرين مقاومة: \${resistanceTraining === 'yes' ? 'نعم' : 'لا'}
\`;
      if (!is13to15) {
        whatsappText += \`الهدف: \${goal === 'maintain' ? 'ثبات' : goal === 'cut' ? 'تنشيف' : 'تضخيم'}
\`;
      }
      whatsappText += \`سعرات الحفاظ التقديرية: \${maintenanceRounded} kcal
السعرات المستهدفة: \${finalTdeeRounded} kcal
\`;
      if (is13to15) {
        whatsappText += \`البروتين المقترح: \${protein}g\`;
      } else if (!hasLowCarbWarning) {
        whatsappText += \`البروتين: \${protein}g | الدهون: \${fats}g | الكارب: \${carbs}g\`;
      }

      content = (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-12 pt-12 border-t border-brand-border/40 overflow-hidden">
          
          {!is13to15 && (
            <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-xl mb-10 w-full sm:w-fit mx-auto border border-white/60 shadow-sm overflow-x-auto hide-scrollbar" dir="ltr">
              <button onClick={() => setGoal('maintain')} className={\`flex-1 sm:flex-none px-3 sm:px-6 md:px-8 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap \${goal === 'maintain' ? 'bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] text-brand-primary' : 'text-brand-muted hover:text-brand-text'}\`}>
                {t.calculator.maintain || 'المحافظة على الوزن'}
              </button>
              <button onClick={() => setGoal('cut')} className={\`flex-1 sm:flex-none px-3 sm:px-6 md:px-8 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap \${goal === 'cut' ? 'bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] text-brand-primary' : 'text-brand-muted hover:text-brand-text'}\`}>
                {t.calculator.lose || 'خسارة الدهون'}
              </button>
              <button onClick={() => setGoal('bulk')} className={\`flex-1 sm:flex-none px-3 sm:px-6 md:px-8 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap \${goal === 'bulk' ? 'bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] text-brand-primary' : 'text-brand-muted hover:text-brand-text'}\`}>
                {t.calculator.gain || 'بناء العضلات'}
              </button>
            </div>
          )}

          <div className="text-center mb-10">
            <h3 className="text-lg font-bold text-brand-muted mb-2 uppercase">{is13to15 ? (t.calculator.dailyNeed || 'الاحتياج اليومي التقديري') : (t.calculator.macrosTitle || 'السعرات اليومية المستهدفة')}</h3>
            <div className="text-5xl md:text-7xl font-black text-brand-primary font-en tracking-tighter mb-2" dir="ltr">
              {finalTdeeRounded} <span className="text-2xl text-brand-muted font-sans font-bold ms-2 tracking-wider">kcal</span>
            </div>
            
            {!is13to15 && goal !== 'maintain' && (
              <p className="text-brand-muted font-medium font-en mt-2" dir="ltr">
                {t.calculator.maintenanceCaloriesText || 'سعرات الحفاظ التقديرية'}: <strong className="text-brand-text">{maintenanceRounded} kcal</strong>
              </p>
            )}
            
            <p className="text-brand-muted/70 text-sm font-medium font-en mt-1" dir="ltr">
              {t.calculator.bmrLabel || 'معدل الحرق التقديري (RMR):'} <strong className="text-brand-muted">{bmrRounded} kcal</strong>
            </p>
          </div>

          {is13to15 ? (
            <div className="flex justify-center mb-8" dir="ltr">
              <div className="bg-rose-50/60 backdrop-blur-sm p-4 md:p-5 rounded-[20px] border border-rose-100/50 shadow-sm flex flex-col items-center justify-center text-center space-y-1 w-full max-w-[200px]">
                <p className="text-rose-600/80 text-sm md:text-base font-bold whitespace-nowrap">{t.calculator.protein || 'البروتين المقترح'}</p>
                <p className="text-slate-700 text-lg md:text-xl font-bold font-en leading-none">{protein}g</p>
              </div>
            </div>
          ) : !hasLowCarbWarning ? (
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8" dir="ltr">
              <div className="bg-emerald-50/60 backdrop-blur-sm p-4 md:p-5 rounded-[20px] border border-emerald-100/50 shadow-sm flex flex-col items-center justify-center text-center space-y-1">
                <p className="text-emerald-600/80 text-sm md:text-base font-bold whitespace-nowrap">{t.calculator.carbs || 'كربوهيدرات'}</p>
                <p className="text-slate-700 text-lg md:text-xl font-bold font-en leading-none">{carbs}g</p>
              </div>
              <div className="bg-amber-50/60 backdrop-blur-sm p-4 md:p-5 rounded-[20px] border border-amber-100/50 shadow-sm flex flex-col items-center justify-center text-center space-y-1">
                <p className="text-amber-600/80 text-sm md:text-base font-bold whitespace-nowrap">{t.calculator.fats || 'دهون'}</p>
                <p className="text-slate-700 text-lg md:text-xl font-bold font-en leading-none">{fats}g</p>
              </div>
              <div className="bg-rose-50/60 backdrop-blur-sm p-4 md:p-5 rounded-[20px] border border-rose-100/50 shadow-sm flex flex-col items-center justify-center text-center space-y-1">
                <p className="text-rose-600/80 text-sm md:text-base font-bold whitespace-nowrap">{t.calculator.protein || 'بروتين'}</p>
                <p className="text-slate-700 text-lg md:text-xl font-bold font-en leading-none">{protein}g</p>
              </div>
            </div>
          ) : null}

          {hasLowCarbWarning && !is13to15 && (
            <div className="text-amber-600 text-sm font-medium mb-8 text-center bg-amber-50/50 p-4 rounded-xl border border-amber-100">
              {t.calculator.lowCarbsWarning || 'السعرات الناتجة منخفضة جدًا مقارنة بالبروتين والدهون المقترحة، يحتاج توزيع الماكروز إلى مراجعة شخصية.'}
            </div>
          )}

          {hasLowCaloriesWarning && (
            <div className="text-amber-600 text-sm font-medium mb-8 text-center bg-amber-50/50 p-4 rounded-xl border border-amber-100">
              {t.calculator.lowCaloriesWarning || 'السعرات الناتجة منخفضة وقد يصعب معها الحصول على احتياجات الجسم الغذائية. لا تبدأ بهذه النتيجة قبل مراجعة مختص.'}
            </div>
          )}

          <div className="text-center mb-10 max-w-2xl mx-auto space-y-3">
            <p className="text-sm md:text-base text-brand-text font-medium leading-relaxed px-4">
              {is13to15 
                ? (t.calculator.age13to15Note || 'هذه الأرقام نقطة بداية تقديرية، يفضل متابعة الأداء والنمو مع مدرب أو مختص.')
                : is16to17
                ? 'هذه الأرقام نقطة بداية تقديرية. تابع متوسط الوزن والأداء لمدة أسبوعين ثم عدّل السعرات.'
                : (t.calculator.macrosEstimateNote || 'هذه الأرقام نقطة بداية تقديرية. تابع متوسط الوزن والأداء والجوع لمدة أسبوعين، ثم عدّل السعرات حسب استجابة جسمك.')
              }
            </p>
            {isAdult && (
              <p className="text-[13px] md:text-sm text-brand-muted px-4">
                {goal === 'cut' && (t.calculator.cutNote || 'تم تقليل السعرات بنسبة 15% كبداية آمنة للتنشيف. لا تعدّل السعرات بناءً على تغير وزن يوم أو يومين.')}
                {goal === 'bulk' && (t.calculator.bulkNote || 'تم زيادة السعرات بنسبة 7% كبداية للتضخيم. راقب متوسط الوزن والأداء لتجنب زيادة السعرات أسرع من المطلوب.')}
              </p>
            )}
          </div>

          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-sm text-center">
            <p className="text-brand-text font-bold mb-6 text-lg">
              عرفت أرقامك؟
              <br />
              ابعت نتيجتك ونشوف أنسب باقة وبداية ليك حسب هدفك.
            </p>
            <Button variant="primary" href={\`https://wa.me/201210884617?text=\${encodeURIComponent(whatsappText)}\`} className="!px-8" onClick={() => trackCalculatorWhatsAppClick({ goal, target_calories: finalTdeeRounded })}>
              ابعت نتيجتي على واتساب
            </Button>
          </div>
          
          <p className="text-xs text-brand-muted/60 mt-6 text-center max-w-lg mx-auto leading-relaxed">
            {t.calculator.medicalNote || 'هذه الحاسبة العامة غير مخصصة للحمل أو الرضاعة، لأن الاحتياجات تختلف حسب المرحلة. وفي حالة أمراض الكلى أو الكبد، السكري، اضطرابات الأكل، أو جراحات السمنة، يُرجى مراجعة مختص.'}
          </p>
        </motion.div>
      );
    }
  }

  return (
    <Section id="calculator" className="bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10">
          <SectionHeading>{t.calculator.title}</SectionHeading>
          <p className="mt-4 text-brand-muted text-sm md:text-base font-medium max-w-xl mx-auto">{t.calculator.description}</p>
        </div>
        <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
          <form onSubmit={calculate} className="space-y-6 md:space-y-8">
            
            {/* Unit Toggle */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl w-fit mx-auto shadow-inner">
              <button type="button" onClick={() => { setUnitSystem('metric'); clearResults(); }} className={\`px-8 py-2 rounded-lg text-sm font-bold transition-all \${unitSystem === 'metric' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                Metric
              </button>
              <button type="button" onClick={() => { setUnitSystem('imperial'); clearResults(); }} className={\`px-8 py-2 rounded-lg text-sm font-bold transition-all \${unitSystem === 'imperial' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                Imperial
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Gender */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text px-1 block">{t.calculator.gender}</label>
                <div className="flex bg-slate-100 p-1.5 rounded-xl shadow-inner">
                  <button type="button" onClick={() => handleGenderChange('male')} className={\`flex-1 py-3 rounded-lg text-sm font-bold transition-all \${gender === 'male' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                    {t.calculator.male}
                  </button>
                  <button type="button" onClick={() => handleGenderChange('female')} className={\`flex-1 py-3 rounded-lg text-sm font-bold transition-all \${gender === 'female' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                    {t.calculator.female}
                  </button>
                </div>
              </div>

              {/* Age */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text px-1 block">{t.calculator.age}</label>
                <input
                  type="number"
                  min="5"
                  max="119"
                  value={age}
                  onChange={(e) => { setAge(e.target.value); clearResults(); }}
                  className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                  placeholder="25"
                  dir="ltr"
                />
              </div>

              {/* Weight */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text px-1 block">
                  {unitSystem === 'metric' ? t.calculator.weight : t.calculator.weightImperial}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => { setWeight(e.target.value); clearResults(); }}
                  className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                  placeholder={unitSystem === 'metric' ? "75" : "165"}
                  dir="ltr"
                />
              </div>

              {/* Height */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text px-1 block">
                  {unitSystem === 'metric' ? t.calculator.height : t.calculator.heightImperial}
                </label>
                {unitSystem === 'metric' ? (
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => { setHeightCm(e.target.value); clearResults(); }}
                    className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                    placeholder="175"
                    dir="ltr"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => { setHeightFt(e.target.value); clearResults(); }}
                      className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                      placeholder="ft (5)"
                      dir="ltr"
                    />
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => { setHeightIn(e.target.value); clearResults(); }}
                      className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                      placeholder="in (9)"
                      dir="ltr"
                    />
                  </div>
                )}
              </div>
              
              {/* Activity Level - only for 13+ */}
              {(!age || parseInt(age) >= 13) && (
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-bold text-brand-text px-1 block">{t.calculator.activity}</label>
                  <CustomSelect
                    value={activity === '' ? 0 : activity as number}
                    onChange={(val) => { setActivity(val === 0 ? '' : val); clearResults(); }}
                    options={[
                      { value: 0, label: t.calculator.selectActivity || 'اختر مستوى نشاطك' },
                      { value: 1.2, label: t.calculator.activities?.sedentary || 'قليل جداً' },
                      { value: 1.375, label: t.calculator.activities?.light || 'خفيف' },
                      { value: 1.55, label: t.calculator.activities?.moderate || 'متوسط' },
                      { value: 1.725, label: t.calculator.activities?.active || 'مرتفع' },
                      { value: 1.9, label: t.calculator.activities?.veryActive || 'مرتفع جداً' }
                    ]}
                  />
                </div>
              )}
              
              {/* Resistance Training - only for 13+ */}
              {(!age || parseInt(age) >= 13) && (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-brand-text px-1 block">{t.calculator.resistanceTraining || 'هل تمارس تمارين مقاومة بانتظام؟'}</label>
                  <div className="flex bg-slate-100 p-1.5 rounded-xl shadow-inner">
                    <button type="button" onClick={() => { setResistanceTraining('yes'); clearResults(); }} className={\`flex-1 py-3 rounded-lg text-sm font-bold transition-all \${resistanceTraining === 'yes' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                      {t.calculator.yes || 'نعم'}
                    </button>
                    <button type="button" onClick={() => { setResistanceTraining('no'); clearResults(); }} className={\`flex-1 py-3 rounded-lg text-sm font-bold transition-all \${resistanceTraining === 'no' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                      {t.calculator.no || 'لا'}
                    </button>
                  </div>
                </div>
              )}

              {/* Body Fat (Optional) */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm font-bold text-brand-text px-1">
                  <span>{t.calculator.bodyFat}</span>
                  <span className="text-slate-500 font-normal text-xs">{t.calculator.bodyFatOptional}</span>
                </label>
                <input
                  type="number"
                  min="3"
                  max="60"
                  step="0.1"
                  value={bodyFat}
                  onChange={(e) => { setBodyFat(e.target.value); clearResults(); }}
                  className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                  placeholder="15"
                  dir="ltr"
                />
                <p className="text-[11px] text-slate-500 mt-1 px-1">{t.calculator.bodyFatNote}</p>
              </div>
            </div>

            {errorMsg && (
              <div className="text-red-500 text-sm font-medium mt-6 text-center bg-red-50/50 p-4 rounded-xl border border-red-100">
                {errorMsg}
              </div>
            )}

            <div className="flex justify-center mt-12 mb-6">
              <Button type="submit" size="lg" className="w-full sm:w-auto min-w-[280px] shadow-lg shadow-brand-primary/20 text-lg py-4">
                {t.calculator.calculate}
              </Button>
            </div>
          </form>

          <AnimatePresence>
            {content}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
`;

fs.writeFileSync(tsPath, newContent);
console.log('Final calculator generated.');
