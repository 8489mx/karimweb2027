import { HelperModal } from "../ui/HelperModal";
import { Info, AlertCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { CustomSelect } from "../ui/CustomSelect";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import { SectionHeading } from "../ui/SectionHeading";
import { Helmet } from "react-helmet-async";
import { CalculatorResults } from "../calculator/CalculatorResults";
import { getHelpTopics } from "../calculator/HelpTopics";
import {
  trackCalculatorCompleted,
  trackCalculatorWhatsAppClick,
} from "../../utils/tracking";
/**
 * Automatically converts Eastern Arabic / Persian numerals and Arabic commas
 * to standard English ASCII numbers, filtering out non-digit characters.
 */
function cleanAndConvertNumber(val: string, allowDecimal = true): string {
  if (!val) return "";
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  let converted = val;
  for (let i = 0; i < 10; i++) {
    converted = converted.split(arabicDigits[i]).join(i.toString());
    converted = converted.split(persianDigits[i]).join(i.toString());
  }
  converted = converted.replace(/[،,٫]/g, ".");

  if (allowDecimal) {
    let result = "";
    let hasDot = false;
    for (const char of converted) {
      if (char >= "0" && char <= "9") {
        result += char;
      } else if (char === "." && !hasDot) {
        result += ".";
        hasDot = true;
      }
    }
    return result;
  } else {
    return converted.replace(/[^0-9]/g, "");
  }
}

export function CalorieCalculator() {
  const { t, lang } = useLanguage();
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("");
  const [heightCm, setHeightCm] = useState<string>("");
  const [heightFt, setHeightFt] = useState<string>("");
  const [heightIn, setHeightIn] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [dailyActivity, setDailyActivity] = useState<number | "">("");
  const [workoutFrequency, setWorkoutFrequency] = useState<number | "">("");
  const [bodyFat, setBodyFat] = useState<string>("");
  const [resistanceTraining, setResistanceTraining] = useState<
    "yes" | "no" | ""
  >("");
  const [results, setResults] = useState<{
    baseTdee: number;
    bmr: number;
    weightKg: number;
    heightCm: number;
    proteinWeightKg: number;
  } | null>(null);
  const [goal, setGoal] = useState<"maintain" | "cut" | "bulk">("maintain");
  const [goalLevel, setGoalLevel] = useState<
    "light" | "moderate" | "aggressive"
  >("moderate");
  const [isPregnantOrNursing, setIsPregnantOrNursing] = useState<
    "yes" | "no" | ""
  >("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  useEffect(() => {
    const ageNum = parseInt(age);
    if (ageNum >= 16 && ageNum <= 18 && goalLevel === "aggressive") {
      setGoalLevel("moderate");
    }
  }, [age, goalLevel]);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [activeHelp, setActiveHelp] = useState<'dailyActivity' | 'workoutFrequency' | 'resistance' | 'bodyFat' | 'bodyFatVisual' | 'goal' | 'disclaimer' | null>(null);

  const helpTopics = getHelpTopics();
  const clearResults = () => {
    if (results) setResults(null);
  };
  const handleGenderChange = (val: "male" | "female") => {
    setGender(val);
    clearResults();
  };
  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    /* Weight to kg */ const w =
      unitSystem === "metric"
        ? parseFloat(weight)
        : parseFloat(weight) * 0.453592;
    const a = parseInt(age);
    if (!w || !a) return;
    if (a >= 13 && a <= 15) {
      if (goal !== "maintain") setGoal("maintain"); // force maintenance
    }
    if (w < 35 || w > 250) {
      setErrorMsg(
        unitSystem === "metric"
          ? "يرجى إدخال وزن صحيح بين 35 و 250 كجم"
          : "يرجى إدخال وزن صحيح",
      );
      return;
    }
    if (a < 5 || a > 119) {
      setErrorMsg("العمر يجب أن يكون بين 5 و 119 سنة");
      return;
    }
    /* Height to cm */ let h = 0;
    if (unitSystem === "metric") {
      h = parseFloat(heightCm);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      h = ft * 30.48 + inch * 2.54;
    }
    if (!h || h < 120 || h > 230) {
      setErrorMsg("يرجى إدخال طول صحيح بين 120 و 230 سم");
      return;
    }
    if (a >= 13) {
      if (dailyActivity === "" || workoutFrequency === "") {
        setErrorMsg("يرجى الإجابة على أسئلة النشاط الرياضي واليومي");
        return;
      }
      if (resistanceTraining === "") {
        setErrorMsg("يرجى تحديد ما إذا كنت تمارس تمارين مقاومة");
        return;
      }
    }

    if (gender === "female" && a >= 16 && isPregnantOrNursing === "") {
      setErrorMsg("يرجى تحديد هل يوجد حمل أو رضاعة");
      return;
    }
    const bf = parseFloat(bodyFat);
    if (bodyFat && (isNaN(bf) || bf < 3 || bf > 60)) {
      setErrorMsg("نسبة الدهون يجب أن تكون بين 3 و 60");
      return;
    }
    /* BMR Calculation */ let bmr = 0;
    if (bf) {
      /* Katch-McArdle */ const lbm = w * (1 - bf / 100);
      bmr = 370 + 21.6 * lbm;
    } else {
      /* Mifflin-St Jeor */ if (gender === "male") {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }
    }
    /* Protein calculation weight (BMI Cap) */ const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    
    // Check if the user is lean/muscular based on entered body fat
    const isMuscular = bf && ((gender === "male" && bf <= 20) || (gender === "female" && bf <= 28));
    
    // Disable BMI capping for < 19, OR if the person is muscular (we use their actual heavy weight for protein)
    const proteinWeightKg = (a >= 19 && bmi >= 30 && !isMuscular) ? 30 * heightM * heightM : w;
    /* Default if not selected (youth cases < 13) */ const act =
      a >= 13 && dailyActivity !== "" && workoutFrequency !== "" 
      ? Number(dailyActivity) + Number(workoutFrequency) 
      : 1.2;
    const baseTdee = bmr * act;

    setResults({ baseTdee, bmr, weightKg: w, heightCm: h, proteinWeightKg });
    trackCalculatorCompleted({
      goal,
      gender,
      activity_level: "محسوب تلقائياً",
      target_calories: baseTdee,
    });
  };
  const roundCalories = (val: number) => Math.round(val / 10) * 10;
  const roundMacro = (val: number) => Math.round(val / 5) * 5;
  let content = null;
  if (results) {
    content = <CalculatorResults 
      results={results} 
      age={age} 
      isPregnantOrNursing={isPregnantOrNursing} 
      gender={gender} 
      goalLevel={goalLevel} 
      goal={goal} 
      bodyFat={bodyFat} 
      workoutFrequency={workoutFrequency}
      dailyActivity={dailyActivity}
      clearResults={clearResults}
      resistanceTraining={resistanceTraining}
      weight={weight}
      unitSystem={unitSystem}
      heightCm={heightCm}
      heightFt={heightFt}
      heightIn={heightIn}
      setGoal={setGoal}
      setActiveHelp={setActiveHelp}
      setGoalLevel={setGoalLevel}
    />;
  }

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "أدق حاسبة سعرات حرارية - كابتن كريم زكريا",
    "alternateName": ["حاسبة السعرات", "حساب الماكروز", "حاسبة التنشيف والتضخيم", "Calorie Calculator"],
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "description": "أدق حاسبة سعرات حرارية مجانية لحساب احتياجك اليومي من السعرات والماكروز لإنقاص الوزن، التنشيف، أو التضخيم بناءً على وزنك، طولك، ومستوى نشاطك.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "حساب السعرات الحرارية للتخسيس",
      "حساب الماكروز",
      "حاسبة التنشيف والتضخيم",
      "حساب نسبة الدهون"
    ]
  };

  return (
    <Section id="calculator" className="relative overflow-hidden">
      <Helmet>
        <title>حاسبة السعرات الحرارية والماكروز | كابتن كريم زكريا</title>
        <meta name="description" content="استخدم أدق حاسبة سعرات حرارية مجانية لحساب احتياجك اليومي من الكارب والبروتين والدهون لإنقاص الوزن أو بناء العضلات." />
        <meta name="keywords" content="حاسبة السعرات, حاسبة السعرات الحرارية, حساب الماكروز, كم سعرة حرارية احتاج, حاسبة التنشيف, حاسبة التضخيم, حساب نسبة الدهون, كابتن كريم زكريا" />
        <script type="application/ld+json">
          {JSON.stringify(calculatorSchema)}
        </script>
      </Helmet>
      {" "}
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        {" "}
        <div className="text-center mb-10">
          {" "}
          <SectionHeading>{t.calculator.title}</SectionHeading>{" "}
          <p className="mt-4 text-base sm:text-[1.1rem] md:text-xl lg:text-2xl text-brand-muted leading-relaxed px-2 font-medium max-w-2xl mx-auto">
            {t.calculator.description}
          </p>{" "}
        </div>{" "}
        <div className="relative rounded-[32px] p-3 sm:p-4 md:p-10 shadow-2xl border border-brand-primary/10 overflow-hidden bg-white">
          {/* Background Slanted Effect (Light Blue & White) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Diagonal Stripes */}
            <div 
              className="absolute -inset-[100%] opacity-[0.05] rotate-[15deg]"
              style={{
                backgroundImage: 'repeating-linear-gradient(-45deg, var(--color-brand-primary) 0, var(--color-brand-primary) 80px, transparent 80px, transparent 160px)'
              }}
            ></div>
            <div 
              className="absolute -inset-[100%] opacity-[0.03] -rotate-[5deg]"
              style={{
                backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0, transparent 100px, var(--color-brand-primary) 100px, var(--color-brand-primary) 200px)'
              }}
            ></div>
            {/* Gradient overlays to soften the stripes and add depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/95"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/5 to-transparent"></div>
          </div>
          
          <div className="relative z-10">
            <form onSubmit={calculate} className="space-y-4 md:space-y-8">
            {" "}
            {/* Unit Toggle */}{" "}
            <div className="flex gap-3 w-fit mx-auto">
              {" "}
              <button
                type="button"
                onClick={() => {
                  setUnitSystem("metric");
                  clearResults();
                }}
                className={`px-4 h-[44px] md:h-[50px] md:px-8 rounded-xl text-[13px] md:text-sm font-bold transition-all duration-300 ${unitSystem === "metric" ? "bg-brand-primary text-white border border-brand-primary " : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50 "}`}
              >
                {" "}
                Metric{" "}
              </button>{" "}
              <button
                type="button"
                onClick={() => {
                  setUnitSystem("imperial");
                  clearResults();
                }}
                className={`px-4 h-[44px] md:h-[50px] md:px-8 rounded-xl text-[13px] md:text-sm font-bold transition-all duration-300 ${unitSystem === "imperial" ? "bg-brand-primary text-white border border-brand-primary " : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50 "}`}
              >
                {" "}
                Imperial{" "}
              </button>{" "}
            </div>{" "}
            <div className="grid grid-cols-2 gap-2.5 md:gap-8">
              {" "}
              {/* Gender */} <div className="space-y-1 md:space-y-3 ">
                {" "}
                <label className="text-[13px] md:text-sm font-bold text-brand-text px-1 block">
                  {t.calculator.gender}
                </label>{" "}
                <div className="flex gap-2">
                  {" "}
                  <button
                    type="button"
                    onClick={() => handleGenderChange("male")}
                    className={`flex-1 h-[44px] md:h-[50px] rounded-xl text-[13px] md:text-sm font-bold transition-all duration-300 ${gender === "male" ? "bg-brand-primary text-white border border-brand-primary " : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50 "}`}
                  >
                    {" "}
                    {t.calculator.male}{" "}
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() => handleGenderChange("female")}
                    className={`flex-1 h-[44px] md:h-[50px] rounded-xl text-[13px] md:text-sm font-bold transition-all duration-300 ${gender === "female" ? "bg-brand-primary text-white border border-brand-primary " : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50 "}`}
                  >
                    {" "}
                    {t.calculator.female}{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              {/* Age */}{" "}
              <div className="space-y-1 md:space-y-3">
                {" "}
                <label className="text-[13px] md:text-sm font-bold text-brand-text px-1 block">
                  {t.calculator.age}
                </label>{" "}
                <input
                  type="text"
                  inputMode="numeric"
                  value={age}
                  onChange={(e) => {
                    setAge(cleanAndConvertNumber(e.target.value, false));
                    clearResults();
                  }}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 h-[44px] md:h-[50px] md:px-4 text-brand-text focus:outline-none focus:bg-white focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all font-en text-center text-base md:text-lg"
                  placeholder="25"
                  dir="ltr"
                />{" "}
              </div>{" "}
              {/* Weight */}{" "}
              <div className="space-y-1 md:space-y-3">
                {" "}
                <label className="text-[13px] md:text-sm font-bold text-brand-text px-1 block">
                  {" "}
                  {unitSystem === "metric"
                    ? t.calculator.weight
                    : t.calculator.weightImperial}{" "}
                </label>{" "}
                <input
                  type="text"
                  inputMode="decimal"
                  value={weight}
                  onChange={(e) => {
                    setWeight(cleanAndConvertNumber(e.target.value, true));
                    clearResults();
                  }}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 h-[44px] md:h-[50px] md:px-4 text-brand-text focus:outline-none focus:bg-white focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all font-en text-center text-base md:text-lg"
                  placeholder={unitSystem === "metric" ? "75" : "165"}
                  dir="ltr"
                />{" "}
              </div>{" "}
              {/* Height */} <div className="space-y-1 md:space-y-3 ">
                {" "}
                <label className="text-[13px] md:text-sm font-bold text-brand-text px-1 block">
                  {" "}
                  {unitSystem === "metric"
                    ? t.calculator.height
                    : t.calculator.heightImperial}{" "}
                </label>{" "}
                {unitSystem === "metric" ? (
                  <input
                    type="text"
                    inputMode="decimal"
                    value={heightCm}
                    onChange={(e) => {
                      setHeightCm(cleanAndConvertNumber(e.target.value, true));
                      clearResults();
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 h-[44px] md:h-[50px] md:px-4 text-brand-text focus:outline-none focus:bg-white focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all font-en text-center text-base md:text-lg"
                    placeholder="175"
                    dir="ltr"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {" "}
                    <input
                      type="text"
                      inputMode="numeric"
                      value={heightFt}
                      onChange={(e) => {
                        setHeightFt(cleanAndConvertNumber(e.target.value, false));
                        clearResults();
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 h-[44px] md:h-[50px] md:px-4 text-brand-text focus:outline-none focus:bg-white focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all font-en text-center text-base md:text-lg"
                      placeholder="ft (5)"
                      dir="ltr"
                    />{" "}
                    <input
                      type="text"
                      inputMode="decimal"
                      value={heightIn}
                      onChange={(e) => {
                        setHeightIn(cleanAndConvertNumber(e.target.value, true));
                        clearResults();
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 h-[44px] md:h-[50px] md:px-4 text-brand-text focus:outline-none focus:bg-white focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all font-en text-center text-base md:text-lg"
                      placeholder="in (9)"
                      dir="ltr"
                    />{" "}
                  </div>
                )}{" "}
              </div>{" "}
              {/* Activity Level - only for 13+ */}{" "}
              {(!age || parseInt(age) >= 13) && (
                <>
                  <div className="space-y-1 md:space-y-3 col-span-2">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-[13px] md:text-sm font-bold text-brand-text">
                        يومك العادي عامل إزاي؟
                      </label>
                      <button type="button" aria-label="مساعدة" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveHelp('dailyActivity'); }} className="cursor-pointer relative z-10 text-amber-500 hover:text-amber-600 p-1 md:p-2 md:-m-1 rounded-full transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-500/40">
                        <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 pointer-events-none" /></button>
                    </div>
                    <CustomSelect
                      value={dailyActivity === "" ? 0 : (dailyActivity as number)}
                      onChange={(val) => {
                        setDailyActivity(val === 0 ? "" : val);
                        clearResults();
                      }}
                      options={[
                        {
                          value: 0,
                          label: "اختر مستوى حركتك اليومية",
                        },
                        {
                          value: 1.2,
                          label: (
                            <span className="flex flex-col items-center">
                              <span className="font-bold">أغلب اليوم قاعد</span>
                              <span className="text-xs md:text-[13px] opacity-80 mt-0.5 font-normal">(شغل مكتبي، حركة قليلة جدًا)</span>
                            </span>
                          ),
                          shortLabel: "أغلب اليوم قاعد (شغل مكتبي، حركة قليلة جدًا)",
                        },
                        {
                          value: 1.3,
                          label: (
                            <span className="flex flex-col items-center">
                              <span className="font-bold">بتحرك على فترات خلال اليوم</span>
                              <span className="text-xs md:text-[13px] opacity-80 mt-0.5 font-normal">(شغل بيت، مشاوير بسيطة)</span>
                            </span>
                          ),
                          shortLabel: "بتحرك على فترات خلال اليوم (شغل بيت، مشاوير بسيطة)",
                        },
                        {
                          value: 1.45,
                          label: (
                            <span className="flex flex-col items-center">
                              <span className="font-bold">واقف أو ماشي معظم اليوم</span>
                              <span className="text-xs md:text-[13px] opacity-80 mt-0.5 font-normal">(مدرس، بائع، ممرض)</span>
                            </span>
                          ),
                          shortLabel: "واقف أو ماشي معظم اليوم (مدرس، بائع، ممرض)",
                        },
                        {
                          value: 1.6,
                          label: (
                            <span className="flex flex-col items-center">
                              <span className="font-bold">شغلك فيه مجهود بدني قوي</span>
                              <span className="text-xs md:text-[13px] opacity-80 mt-0.5 font-normal">(بناء، زراعة، تحميل)</span>
                            </span>
                          ),
                          shortLabel: "شغلك فيه مجهود بدني قوي (بناء، زراعة، تحميل)",
                        },
                      ]}
                    />
                  </div>
                  <div className="space-y-1 md:space-y-3 col-span-2">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-[13px] md:text-sm font-bold text-brand-text">
                        متوسط تمرينك خلال الأسبوع؟
                      </label>
                      <button type="button" aria-label="مساعدة" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveHelp('workoutFrequency'); }} className="cursor-pointer relative z-10 text-amber-500 hover:text-amber-600 p-1 md:p-2 md:-m-1 rounded-full transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-500/40">
                        <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 pointer-events-none" /></button>
                    </div>
                    <CustomSelect
                      value={workoutFrequency === "" ? -1 : (workoutFrequency as number)}
                      onChange={(val) => {
                        setWorkoutFrequency(val === -1 ? "" : val);
                        clearResults();
                      }}
                      options={[
                        {
                          value: -1,
                          label: "اختر عدد مرات تمرينك أسبوعيًا",
                        },
                        {
                          value: 0.0,
                          label: "لا أتمرن بانتظام",
                        },
                        {
                          value: 0.075,
                          label: "1 إلى 2 مرة أسبوعياً",
                        },
                        {
                          value: 0.15,
                          label: "3 إلى 5 مرات أسبوعياً",
                        },
                        {
                          value: 0.25,
                          label: "6 مرات أو أكثر أو تمرين شاق جداً",
                        },
                      ]}
                    />
                  </div>
                  {dailyActivity !== "" && workoutFrequency !== "" && (
                    <div className="md:col-span-2 px-1">
                      <p className="text-[12px] md:text-sm font-medium text-slate-600">
                        تم تحديد مستوى نشاطك بناءً على يومك وتمرينك.
                      </p>
                    </div>
                  )}
                </>
              )}{" "}
              {/* Resistance Training - only for 13+ */} {(!age || parseInt(age) >= 13) && ( <div className="space-y-1 md:space-y-3 col-span-2">
                  {" "}
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[13px] md:text-sm font-bold text-brand-text">
                      {t.calculator.resistanceTraining || "هل تمارس تمارين مقاومة بانتظام؟"}
                    </label>
                    <button type="button" aria-label="مساعدة" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveHelp('resistance'); }} className="cursor-pointer relative z-10 text-amber-500 hover:text-amber-600 p-1 md:p-2 md:-m-1 rounded-full transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-500/40">
                      <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 pointer-events-none" />
</button>
                  </div>{" "}
                  <div className="flex gap-2">
                    {" "}
                    <button
                      type="button"
                      onClick={() => {
                        setResistanceTraining("yes");
                        clearResults();
                      }}
                      className={`flex-1 h-[44px] md:h-[50px] rounded-xl text-[13px] md:text-sm font-bold transition-all duration-300 ${resistanceTraining === "yes" ? "bg-brand-primary text-white border border-brand-primary " : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50 "}`}
                    >
                      {" "}
                      {t.calculator.yes || "نعم"}{" "}
                    </button>{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setResistanceTraining("no");
                        clearResults();
                      }}
                      className={`flex-1 h-[44px] md:h-[50px] rounded-xl text-[13px] md:text-sm font-bold transition-all duration-300 ${resistanceTraining === "no" ? "bg-brand-primary text-white border border-brand-primary " : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50 "}`}
                    >
                      {" "}
                      {t.calculator.no || "لا"}{" "}
                    </button>{" "}
                  </div>{" "}
                </div>
              )}{" "}

              {/* Body Fat (Optional) */} <div className="space-y-1 md:space-y-3 col-span-2">
                {" "}
                <div className="flex items-center justify-between px-1">
                    <label className="flex items-center gap-1.5 text-[13px] md:text-sm font-bold text-brand-text">
                      <span>{t.calculator.bodyFat} <span className="text-slate-400 font-normal text-xs">(اختياري)</span></span>
                    </label>
                    <button type="button" aria-label="مساعدة" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveHelp('bodyFat'); }} className="cursor-pointer relative z-10 text-amber-500 hover:text-amber-600 p-1 md:p-2 md:-m-1 rounded-full transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-500/40">
                      <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 pointer-events-none" />
</button>
                  </div>{" "}
                <input
                  type="text"
                  inputMode="decimal"
                  value={bodyFat}
                  onChange={(e) => {
                    setBodyFat(cleanAndConvertNumber(e.target.value, true));
                    clearResults();
                  }}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 h-[44px] md:h-[50px] md:px-4 text-brand-text focus:outline-none focus:bg-white focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all font-en text-center text-base md:text-lg"
                  placeholder="15"
                  dir="ltr"
                />{" "}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2 px-1">
                  <p className="text-[12px] text-slate-500">
                    {t.calculator.bodyFatNote}
                  </p>
                  <button 
                    type="button" 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveHelp('bodyFatVisual'); }} 
                    className="text-[12px] font-bold text-brand-primary hover:text-brand-secondary transition-colors text-right flex items-center gap-1 w-fit"
                  >
                    📸 مش عارف نسبتك؟ شوف الدليل بالصور
                  </button>
                </div>
              </div>{" "}
              {/* Pregnancy / Nursing */}
              {gender === "female" && parseInt(age) >= 16 && (
                <div className="space-y-3 col-span-1 md:col-span-2 mt-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[13px] md:text-sm font-bold text-brand-text">
                      هل توجد حالة حمل أو رضاعة؟
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPregnantOrNursing("yes");
                        clearResults();
                      }}
                      className={`flex-1 h-[44px] md:h-[50px] rounded-xl text-[13px] md:text-sm font-bold transition-all duration-300 ${isPregnantOrNursing === "yes" ? "bg-brand-primary text-white border border-brand-primary " : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50 "}`}
                    >
                      نعم
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPregnantOrNursing("no");
                        clearResults();
                      }}
                      className={`flex-1 h-[44px] md:h-[50px] rounded-xl text-[13px] md:text-sm font-bold transition-all duration-300 ${isPregnantOrNursing === "no" ? "bg-brand-primary text-white border border-brand-primary " : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50 "}`}
                    >
                      لا
                    </button>
                  </div>
                </div>
              )}
            </div>{" "}
            {errorMsg && (
              <div className="text-red-500 text-[12px] md:text-sm font-medium mt-6 text-center bg-red-50/50 p-4 rounded-xl border border-red-100">
                {" "}
                {errorMsg}{" "}
              </div>
            )}{" "}
            <div className="flex justify-center mt-6 md:mt-12 mb-2 md:mb-6">
              {" "}
              <Button
                type="submit"
                size="lg"
                className="px-12 md:px-16 text-base md:text-lg py-2.5 md:py-4 rounded-xl"
              >
                {" "}
                {t.calculator.calculate}{" "}
              </Button>{" "}
            </div>{" "}
          </form>{" "}
          <AnimatePresence> {content} </AnimatePresence>{" "}
          <HelperModal 
            isOpen={activeHelp !== null}
            onClose={() => setActiveHelp(null)}
            title={activeHelp ? helpTopics[activeHelp].title : ""}
            content={activeHelp ? helpTopics[activeHelp].content : null}
          />
          </div>
          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveHelp('disclaimer'); }}
            className="absolute bottom-3 left-3 md:bottom-4 md:left-4 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 z-20 text-amber-500 hover:text-amber-600 rounded-full transition-colors cursor-pointer group focus:outline-none focus:ring-2 focus:ring-amber-500/40" 
            title="إخلاء مسؤولية طبي"
          >
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>{" "}
      </div>{" "}
    </Section>
  );
}
