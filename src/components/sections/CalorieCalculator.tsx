import React, { useState } from 'react';
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
  const [activity, setActivity] = useState<number>(1.2);
  const [bodyFat, setBodyFat] = useState<string>('');
  
  const [results, setResults] = useState<{ baseTdee: number; bmr: number; weightKg: number; heightCm: number } | null>(null);
  const [goal, setGoal] = useState<'maintain' | 'cut' | 'bulk'>('maintain');
  const [errorMsg, setErrorMsg] = useState<string>('');

  let finalTdee = 0;
  let protein = 0;
  let fats = 0;
  let carbs = 0;

  if (results) {
    let adjustedTdee = results.baseTdee;
    let proteinMultiplier = 1.8;

    if (goal === 'cut') {
      adjustedTdee = results.baseTdee * 0.85; // 15% deficit
      proteinMultiplier = 2.0;
    } else if (goal === 'bulk') {
      adjustedTdee = results.baseTdee * 1.07; // 7% surplus
      proteinMultiplier = 1.8;
    }

    finalTdee = Math.round(adjustedTdee);
    
    protein = Math.round(results.weightKg * proteinMultiplier);
    fats = Math.round((finalTdee * 0.25) / 9); // 25% of target calories
    
    const remainingCalories = finalTdee - (protein * 4) - (fats * 9);
    carbs = Math.max(0, Math.round(remainingCalories / 4));
  }

  const getGoalText = (g: string) => {
    if (g === 'cut') return t.calculator.lose;
    if (g === 'bulk') return t.calculator.gain;
    return t.calculator.maintain;
  }

  const getActivityText = (a: number) => {
    if (a === 1.2) return t.calculator.activities.sedentary.split('(')[0].trim();
    if (a === 1.375) return t.calculator.activities.light.split('(')[0].trim();
    if (a === 1.55) return t.calculator.activities.moderate.split('(')[0].trim();
    if (a === 1.725) return t.calculator.activities.active.split('(')[0].trim();
    if (a === 1.9) return t.calculator.activities.veryActive.split('(')[0].trim();
    return '';
  }

  const generateWhatsAppLink = () => {
    if (!results) return "https://wa.me/201001060503";

    const rlm = '\u200F';
    const lines = [
      rlm + "أهلاً، حسبت سعراتي من الموقع ودي نتيجتي:",
      "",
      rlm + "- الهدف: " + getGoalText(goal),
      rlm + "- السن: " + age + " سنة",
      rlm + "- الطول: " + results.heightCm + " سم",
      rlm + "- الوزن: " + Math.round(results.weightKg) + " كجم",
      rlm + "- النشاط: " + getActivityText(activity),
      "",
      rlm + "- السعرات المقترحة: " + finalTdee + " سعر حراري",
      rlm + "- معدل الحرق الأساسي BMR: " + results.bmr,
      "",
      rlm + "تقسيمة الماكروز:",
      rlm + "- البروتين: " + protein + " جم",
      rlm + "- الدهون: " + fats + " جم",
      rlm + "- الكارب: " + carbs + " جم",
      "",
      rlm + "وعايز أبدأ خطة مناسبة ليا."
    ];

    const message = lines.join('\r\n');
    return `https://wa.me/201001060503?text=${encodeURIComponent(message)}`;
  }

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Weight to kg
    const w = unitSystem === 'metric' ? parseFloat(weight) : parseFloat(weight) * 0.453592;
    const a = parseInt(age);

    if (!w || !a) return;

    if (w < 35 || w > 250) {
      if (unitSystem === 'metric') {
        setErrorMsg(t.calculator.errors.weightMetric);
      } else {
        setErrorMsg(t.calculator.errors.weightImperial);
      }
      return;
    }

    if (a < 18 || a > 80) {
      // Allow it but we'll show a warning later if < 18, so just limit extreme values
      if (a <= 0 || a > 120) {
        setErrorMsg(t.calculator.errors.age);
        return;
      }
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
    
    if (!h) return;

    if (h < 120 || h > 230) {
      setErrorMsg(t.calculator.errors.height);
      return;
    }

    let bmr = 0;

    if (bodyFat && parseFloat(bodyFat) > 0) {
      const bf = parseFloat(bodyFat);
      if (bf < 3 || bf > 60) {
        setErrorMsg(t.calculator.errors.bodyFat);
        return;
      }
      // Katch-McArdle Equation
      const leanBodyMass = w * (1 - (bf / 100));
      bmr = 370 + (21.6 * leanBodyMass);
    } else {
      // Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
      } else {
        bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
      }
    }

    const tdee = bmr * activity;

    let adjustedTdee = tdee;
    if (goal === 'cut') {
      adjustedTdee = tdee * 0.85;
    } else if (goal === 'bulk') {
      adjustedTdee = tdee * 1.07;
    }

    trackCalculatorCompleted({
      goal,
      gender,
      activity_level: getActivityText(activity),
      target_calories: Math.round(adjustedTdee)
    });

    setResults({
      baseTdee: tdee,
      bmr: Math.round(bmr),
      weightKg: w,
      heightCm: Math.round(h)
    });
  };

  return (
    <Section id="calculator" className="relative flex justify-center items-center z-10" dir="rtl">
      {/* Background radial gradient removed to keep it uniform */}

      <div className="max-w-4xl mx-auto relative z-10 w-full px-6 md:px-12">
        <div className="text-center mb-12">
          <SectionHeading className="mb-3 text-brand-text">
            {t.calculator.title}
          </SectionHeading>
          <p className="text-base sm:text-[1.1rem] md:text-xl lg:text-2xl font-medium text-brand-muted max-w-none mx-auto">
            {t.calculator.description}
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-white/50 shadow-sm relative z-20">
          {/* Unit System Tabs */}
          <div className="flex flex-col sm:flex-row w-full md:w-fit bg-white/50 backdrop-blur-md p-1.5 rounded-xl mb-8 mx-auto border border-white/60 shadow-sm gap-1 sm:gap-0" dir="ltr">
            <button
              aria-pressed={unitSystem === 'metric'}
              aria-label="Metric System"
              onClick={() => setUnitSystem('metric')}
              className={`flex-1 px-3 sm:px-4 md:px-8 py-2 md:py-2.5 rounded-lg text-[13px] md:text-sm font-bold whitespace-nowrap transition-all ${
                unitSystem === 'metric' 
                  ? 'bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Metric (kg, cm)
            </button>
            <button
              aria-pressed={unitSystem === 'imperial'}
              aria-label="Imperial System"
              onClick={() => setUnitSystem('imperial')}
              className={`flex-1 px-3 sm:px-4 md:px-8 py-2 md:py-2.5 rounded-lg text-[13px] md:text-sm font-bold whitespace-nowrap transition-all ${
                unitSystem === 'imperial' 
                  ? 'bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Imperial (lbs, ft)
            </button>
          </div>

          <form onSubmit={calculate} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-text mb-1 block">{t.calculator.gender}</label>
                <div className="flex bg-white/50 backdrop-blur-md rounded-xl border border-white/60 p-1 shadow-sm">
                  <button
                    type="button"
                    aria-pressed={gender === 'male'}
                    aria-label="Male"
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${gender === 'male' ? 'bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] text-brand-primary' : 'text-brand-muted hover:text-brand-text'}`}
                    onClick={() => setGender('male')}
                  >
                    ذكر
                  </button>
                  <button
                    type="button"
                    aria-pressed={gender === 'female'}
                    aria-label="Female"
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${gender === 'female' ? 'bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] text-brand-primary' : 'text-brand-muted hover:text-brand-text'}`}
                    onClick={() => setGender('female')}
                  >
                    أنثى
                  </button>
                </div>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-medium text-brand-text mb-1 block">{t.calculator.age}</label>
                <input id="age"
                  type="number"
                  min="1"
                  max="120"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-sm rounded-xl px-4 py-3 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-left"
                  placeholder="25"
                  dir="ltr"
                />
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-text mb-1 block">
                  {unitSystem === 'metric' ? t.calculator.weight : t.calculator.weightImperial}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="500"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-sm rounded-xl px-4 py-3 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-left"
                  placeholder={unitSystem === 'metric' ? "70" : "154"}
                  dir="ltr"
                />
              </div>

              {/* Height */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-text mb-1 block">
                  {unitSystem === 'metric' ? t.calculator.height : t.calculator.heightImperial}
                </label>
                {unitSystem === 'metric' ? (
                  <input
                    type="number"
                    required
                    min="50"
                    max="300"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-sm rounded-xl px-4 py-3 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-left"
                    placeholder="175"
                    dir="ltr"
                  />
                ) : (
                  <div className="flex gap-4">
                    <input
                      type="number"
                      required
                      min="1"
                      max="9"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="flex-1 bg-white/60 backdrop-blur-md border border-white/60 shadow-sm rounded-xl px-4 py-3 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-left"
                      placeholder="5 ft"
                      dir="ltr"
                    />
                    <input
                      type="number"
                      required
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="flex-1 bg-white/60 backdrop-blur-md border border-white/60 shadow-sm rounded-xl px-4 py-3 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-left"
                      placeholder="9 in"
                      dir="ltr"
                    />
                  </div>
                )}
              </div>

              {/* Activity Level */}
              <div className="space-y-2 md:col-span-1">
                <label id="activity-label" className="text-sm font-medium text-brand-text mb-1 block">{t.calculator.activity}</label>
                <div className="relative">
                  <CustomSelect aria-labelledby="activity-label"
                    value={activity}
                    onChange={setActivity}
                    lang={lang}
                    options={[
                      { value: 1.2, label: t.calculator.activities.sedentary },
                      { value: 1.375, label: t.calculator.activities.light },
                      { value: 1.55, label: t.calculator.activities.moderate },
                      { value: 1.725, label: t.calculator.activities.active },
                      { value: 1.9, label: t.calculator.activities.veryActive },
                    ]}
                  />
                </div>
              </div>

              {/* Body Fat % (Optional) */}
              <div className="space-y-2 md:col-span-1">
                <label className="flex flex-col md:flex-row md:items-center items-start gap-0 md:gap-1 text-sm font-medium text-brand-text mb-1 relative">
                  <span>{t.calculator.bodyFat}</span>
                  <span className="text-brand-muted font-normal text-[10px] md:text-xs whitespace-nowrap mt-0.5 md:mt-0" dir="rtl">{t.calculator.bodyFatOptional}</span>
                </label>
                <input
                  type="number"
                  min="3"
                  max="60"
                  step="0.1"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-sm rounded-xl px-4 py-3 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-left"
                  placeholder="15"
                  dir="ltr"
                />
                <p className="text-[11px] text-brand-muted mt-1" dir="rtl">{t.calculator.bodyFatNote}</p>
              </div>
            </div>

            {errorMsg && (
              <div className="text-red-500 text-sm font-medium mt-4 text-center bg-red-50/50 p-3 rounded-lg border border-red-100">
                {errorMsg}
              </div>
            )}
            {parseInt(age) < 18 && (
              <div className="text-amber-600 text-sm font-medium mt-4 text-center bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                الحاسبة مخصصة بشكل أساسي للبالغين. لو السن أقل من 18 سنة، لازم يكون أي نظام تدريب أو تغذية تحت إشراف ولي الأمر ومختص.
              </div>
            )}
            <div className="flex justify-center mt-10">
              <Button type="submit" size="lg">
                احسب السعرات
              </Button>
            </div>
          </form>

          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-12 pt-12 border-t border-brand-border/40 overflow-hidden"
              >
                <div className="text-center mb-8 bg-brand-primary/5 rounded-xl p-4 border border-brand-primary/10">
                  <p className="text-[14px] md:text-[15px] font-medium text-brand-text leading-relaxed">
                    الرقم ده نقطة بداية تقريبية، والخطة الفعلية بتتحدد بعد تقييم الوزن والقياسات والنشاط والحالة الصحية والهدف.
                  </p>
                </div>
                
                <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-xl mb-10 w-full sm:w-fit mx-auto border border-white/60 shadow-sm overflow-x-auto hide-scrollbar" dir="ltr">
                  <button
                    onClick={() => setGoal('maintain')}
                    className={`flex-1 sm:flex-none px-3 sm:px-6 md:px-8 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                      goal === 'maintain' 
                        ? 'bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] text-brand-primary' 
                        : 'text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    ثبات وزن
                  </button>
                  <button
                    onClick={() => setGoal('cut')}
                    className={`flex-1 sm:flex-none px-3 sm:px-6 md:px-8 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                      goal === 'cut' 
                        ? 'bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] text-brand-primary' 
                        : 'text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    تنشيف
                  </button>
                  <button
                    onClick={() => setGoal('bulk')}
                    className={`flex-1 sm:flex-none px-3 sm:px-6 md:px-8 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                      goal === 'bulk' 
                        ? 'bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] text-brand-primary' 
                        : 'text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    تضخيم
                  </button>
                </div>

                <div className="text-center mb-10">
                  <h3 className="text-lg font-bold text-brand-muted mb-2 uppercase">{t.calculator.macrosTitle}</h3>
                  <div className="text-5xl md:text-7xl font-black text-brand-primary font-en tracking-tighter mb-2" dir="ltr">
                    {finalTdee} <span className="text-2xl text-brand-muted font-sans font-bold ms-2 tracking-wider">kcal</span>
                  </div>
                  <p className="text-brand-muted font-medium font-en" dir="ltr">
                    {t.calculator.bmrLabel} <strong className="text-brand-text">{results.bmr} kcal</strong>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8" dir="ltr">
                  <div className="bg-emerald-50/60 backdrop-blur-sm p-4 md:p-5 rounded-[20px] border border-emerald-100/50 shadow-sm flex flex-col items-center justify-center text-center space-y-1">
                    <p className="text-emerald-600/80 text-sm md:text-base font-bold whitespace-nowrap">{t.calculator.carbs}</p>
                    <p className="text-slate-700 text-lg md:text-xl font-bold font-en leading-none">{carbs}g</p>
                  </div>
                  <div className="bg-amber-50/60 backdrop-blur-sm p-4 md:p-5 rounded-[20px] border border-amber-100/50 shadow-sm flex flex-col items-center justify-center text-center space-y-1">
                    <p className="text-amber-600/80 text-sm md:text-base font-bold whitespace-nowrap">{t.calculator.fats}</p>
                    <p className="text-slate-700 text-lg md:text-xl font-bold font-en leading-none">{fats}g</p>
                  </div>
                  <div className="bg-rose-50/60 backdrop-blur-sm p-4 md:p-5 rounded-[20px] border border-rose-100/50 shadow-sm flex flex-col items-center justify-center text-center space-y-1">
                    <p className="text-rose-600/80 text-sm md:text-base font-bold whitespace-nowrap">{t.calculator.protein}</p>
                    <p className="text-slate-700 text-lg md:text-xl font-bold font-en leading-none">{protein}g</p>
                  </div>
                </div>

                <div className="text-center mb-10 max-w-2xl mx-auto space-y-3">
                  <p className="text-sm md:text-base text-brand-text font-medium leading-relaxed px-4">
                    دي أرقام تقديرية كبداية. الأفضل متابعة الوزن، القياسات، الأداء في التمرين، الجوع والطاقة لمدة 2–3 أسابيع، وبعدها يتم تعديل السعرات حسب استجابة جسمك.
                  </p>
                  <p className="text-[13px] md:text-sm text-brand-muted px-4">
                    {goal === 'cut' && t.calculator.cutNote}
                    {goal === 'bulk' && t.calculator.bulkNote}
                    {goal === 'maintain' && t.calculator.maintainNote}
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-sm text-center">
                  <p className="text-brand-text font-bold mb-6 text-lg">
                    عرفت أرقامك؟
                    <br />
                    ابعت نتيجتك ونشوف أنسب باقة وبداية ليك حسب هدفك.
                  </p>
                  <Button variant="primary" href={generateWhatsAppLink()} className="!px-8" onClick={() => trackCalculatorWhatsAppClick({ goal, target_calories: finalTdee })}>
                    ابعت نتيجتي على واتساب
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
