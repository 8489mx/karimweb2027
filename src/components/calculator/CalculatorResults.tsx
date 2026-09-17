import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/Button";
import { useLanguage } from "../../context/LanguageContext";
import { useSettings } from "../../context/SettingsContext";
import { trackCalculatorWhatsAppClick } from "../../utils/tracking";
import { Info, AlertCircle, Droplets } from "lucide-react";

export function CalculatorResults({
  results, age, isPregnantOrNursing, gender, goalLevel, goal, bodyFat, activity, clearResults,
  resistanceTraining, weight, unitSystem, heightCm, heightFt, heightIn, getActivityLabel, setGoal, setActiveHelp, setGoalLevel,
  workoutFrequency, dailyActivity
}: any) {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const roundCalories = (val: number) => Math.round(val / 10) * 10;
  const roundMacro = (val: number) => Math.round(val / 5) * 5;

    const ageNum = parseInt(age);
    const isUnder13 = ageNum < 13;
    const isTeen = ageNum >= 13 && ageNum <= 18;
    const isAdult = ageNum > 18;
  let content;
    if (isUnder13) {
      content = (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-sm"
        >
          <p className="text-brand-text font-medium mb-6 leading-relaxed">
            {t.calculator.under13Warning ||
              "هذه الحاسبة غير مصممة لهذه المرحلة العمرية، لأن احتياجات النمو تختلف حسب العمر ومراحل التطور."}
          </p>
          <Button
            variant="primary"
            href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("أريد تقييم تغذية ونشاط طفل: العمر " + ageNum + " سنة، " + (gender === "male" ? "ذكر" : "أنثى") + "، الوزن " + Math.round(results.weightKg) + " كجم، الطول " + Math.round(results.heightCm) + " سم.")}`}
            className="!px-8"
          >
            {t.calculator.whatsappUnder18 ||
              "إرسال البيانات لتقييم المراهق/الطفل"}
          </Button>
        </motion.div>
      );
    } else if (gender === "female" && isPregnantOrNursing === "yes") {
      content = (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-sm"
        >
          <p className="text-brand-text font-medium mb-6 leading-relaxed">
            هذه الحاسبة غير مصممة لحالات الحمل والرضاعة، حيث تتطلب هذه المراحل
            احتياجات غذائية خاصة للحفاظ على صحة الأم والجنين/الطفل.
          </p>
          <Button
            variant="primary"
            href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("أريد استشارة لحالة حمل/رضاعة: العمر " + ageNum + " سنة، الوزن " + Math.round(results.weightKg) + " كجم، الطول " + Math.round(results.heightCm) + " سم.")}`}
            className="!px-8"
          >
            التواصل للمتابعة الخاصة
          </Button>
        </motion.div>
      );
    } else {
      let targetCalories = results.baseTdee;
      let minCalories = results.baseTdee;
      let maxCalories = results.baseTdee;

      let effectiveGoalLevel = goalLevel;
      if (isTeen && goalLevel === "aggressive") {
        effectiveGoalLevel = "moderate";
      }

      if (goal === "cut") {
        const factor =
          effectiveGoalLevel === "light"
            ? 0.9
            : effectiveGoalLevel === "aggressive"
              ? 0.8
              : 0.85;
        targetCalories = results.baseTdee * factor;
      } else if (goal === "bulk") {
        const factor =
          effectiveGoalLevel === "light"
            ? 1.05
            : effectiveGoalLevel === "aggressive"
              ? 1.10
              : 1.07;
        targetCalories = results.baseTdee * factor;
      } else {
        targetCalories = results.baseTdee;
      }
      minCalories = targetCalories - 50;
      maxCalories = targetCalories + 50;

      const minTdeeRounded = roundCalories(minCalories);
      const maxTdeeRounded = roundCalories(maxCalories);
      const finalTdeeRounded = roundCalories(targetCalories);
      const maintenanceRounded = roundCalories(results.baseTdee);
      const bmrRounded = roundCalories(results.bmr);

      /* Macros */ let proteinMultiplier = 1.6;
      /* Default */ if (resistanceTraining === "yes") {
        proteinMultiplier = goal === "cut" ? (isTeen ? 1.8 : 2.0) : 1.8;
      } else {
        proteinMultiplier = goal === "cut" ? (isTeen ? 1.5 : 1.6) : 1.4;
      }
      const proteinGramsRaw = results.proteinWeightKg * proteinMultiplier;
      const proteinCalories = proteinGramsRaw * 4;

      // Fat max of 25% or 0.6g/kg
      const fatGramsRaw = Math.max(
        (targetCalories * 0.25) / 9,
        0.6 * results.proteinWeightKg,
      );
      const fatCalories = fatGramsRaw * 9;

      const carbsCalories = targetCalories - proteinCalories - fatCalories;
      const carbsGramsRaw = carbsCalories / 4;
      const protein = roundMacro(proteinGramsRaw);
      const fats = roundMacro(fatGramsRaw);
      const carbs = carbsGramsRaw > 0 ? roundMacro(carbsGramsRaw) : 0;
      const hasLowCarbWarning = carbsCalories < 0;
      const heightMForBmi = results.heightCm / 100;
      const currentBmi = results.weightKg / (heightMForBmi * heightMForBmi);
      const isUnderweight = !isTeen && currentBmi < 18.5;

      let bmiCategory = "";
      const isMuscularUser = bodyFat && ((gender === "male" && parseFloat(bodyFat) <= 20) || (gender === "female" && parseFloat(bodyFat) <= 28));
      
      if (currentBmi < 18.5) {
        bmiCategory = "وزن محتاج بناء وتغذية مخصصة";
      } else if (currentBmi < 25) {
        bmiCategory = "وزن طبيعي وصحي";
      } else if (currentBmi < 30) {
        bmiCategory = isMuscularUser ? "وزن رياضي (كتلة عضلية)" : "قابل للتحسين بسهولة";
      } else {
        bmiCategory = isMuscularUser ? "رياضي ذو كتلة عضلية عالية" : "في نطاق هنبني عليه خطة واضحة ومدروسة";
      }

      let ffmi: number | null = null;
      let ffmiCategory = "";
      const bf = parseFloat(bodyFat);
      if (!isNaN(bf) && bf > 0) {
        const lbm = results.weightKg * (1 - bf / 100);
        const ffmiRaw = lbm / (heightMForBmi * heightMForBmi);
        ffmi = ffmiRaw + 6.1 * (1.8 - heightMForBmi); // Normalized FFMI
        
        if (gender === 'male') {
          if (ffmi < 18) ffmiCategory = "أقل من المتوسط";
          else if (ffmi < 20) ffmiCategory = "متوسط";
          else if (ffmi < 22) ffmiCategory = "أعلى من المتوسط";
          else if (ffmi < 23) ffmiCategory = "ممتاز";
          else if (ffmi < 26) ffmiCategory = "عضلي جداً";
          else ffmiCategory = "بناء عضلي استثنائي";
        } else {
          if (ffmi < 14) ffmiCategory = "أقل من المتوسط";
          else if (ffmi < 16) ffmiCategory = "متوسط";
          else if (ffmi < 18) ffmiCategory = "أعلى من المتوسط";
          else if (ffmi < 19) ffmiCategory = "ممتاز";
          else if (ffmi < 21) ffmiCategory = "عضلية جداً";
          else ffmiCategory = "بناء عضلي استثنائي";
        }
      }

      const hasLowCaloriesWarning =
        !isTeen &&
        ((gender === "male" && finalTdeeRounded < 1500) ||
          (gender === "female" && finalTdeeRounded < 1200));

      // Dynamic Water Intake Formula (ACSM & Sports Nutrition Guidelines)
      // 1. Base hydration: ~33ml per kg bodyweight
      // 2. Training sweat addition: 0ml for sedentary, ~350ml for 1-2 workouts, ~550ml for 3-5 workouts, ~800ml for 6+ workouts
      // 3. Active job addition: ~200ml - 400ml extra for standing/physical jobs
      const baseHydrationLiters = results.weightKg * 0.033;
      
      let exerciseLiters = 0;
      const wf = Number(workoutFrequency);
      if (wf >= 0.25) {
        exerciseLiters = 0.8; // 6+ workouts or heavy
      } else if (wf >= 0.15) {
        exerciseLiters = 0.55; // 3-5 workouts
      } else if (wf >= 0.075) {
        exerciseLiters = 0.35; // 1-2 workouts
      } else {
        exerciseLiters = 0.1; // sedentary
      }

      let occupationalLiters = 0;
      const da = Number(dailyActivity);
      if (da >= 1.6) {
        occupationalLiters = 0.4; // physical labor
      } else if (da >= 1.45) {
        occupationalLiters = 0.25; // standing/walking all day
      }

      const totalTargetLiters = baseHydrationLiters + exerciseLiters + occupationalLiters;
      
      // Strict tight range with exactly 0.3L difference
      const minWaterLiters = Math.max(2.0, Math.round(totalTargetLiters * 10) / 10);
      const maxWaterLiters = Math.round((minWaterLiters + 0.3) * 10) / 10;
      const waterIntakeDisplay = `${minWaterLiters.toFixed(1)} - ${maxWaterLiters.toFixed(1)}`;

      let whatsappText = `مرحباً، أريد استشارة ومتابعة بناءً على نتيجتي في الحاسبة:
العمر: ${age}
الجنس: ${gender === 'male' ? 'ذكر' : 'أنثى'}
الوزن: ${weight} ${unitSystem === 'metric' ? 'كجم' : 'باوند'}
الطول: ${unitSystem === 'metric' ? heightCm + ' سم' : heightFt + ' قدم و ' + heightIn + ' بوصة'}
النظام: ${unitSystem === 'metric' ? 'متري' : 'إمبراطوري'}
النشاط: محسوب تلقائياً بناءً على اليوم والتمرين
يتمرن مقاومة: ${resistanceTraining === 'yes' ? 'نعم' : 'لا'}
`;
      if (bodyFat) {
        whatsappText += `نسبة الدهون: ${bodyFat}%\n`;
      }
      if (gender === "female" && ageNum >= 16) {
        whatsappText += `حمل/رضاعة: ${isPregnantOrNursing === 'yes' ? 'نعم' : isPregnantOrNursing === 'no' ? 'لا' : 'غير محدد'}\n`;
      }
      whatsappText += `الهدف: ${goal === "maintain" ? "ثبات" : goal === "cut" ? "تنشيف" : "تضخيم"}\n`;
      if (goal !== 'maintain') {
        whatsappText += `المستوى: ${goalLevel === 'light' ? 'خفيف' : goalLevel === 'moderate' ? 'متوسط' : 'قوي'}\n`;
      }
      whatsappText += `السعرات المستهدفة: ${finalTdeeRounded} kcal\n`;
      if (hasLowCarbWarning) {
        whatsappText += `البروتين: ${protein}g | الدهون: ${fats}g | الكارب: سالب (السعرات غير كافية)\n`;
      } else {
        whatsappText += `البروتين: ${protein}g | الدهون: ${fats}g | الكارب: ${carbs}g\n`;
      }
      whatsappText += `احتياج الماء التقريبي: ${waterIntakeDisplay} لتر يومياً\n`;
      whatsappText += `BMI: ${currentBmi.toFixed(1)}\n`;
      if (ffmi) {
         whatsappText += `FFMI: ${ffmi.toFixed(1)}\n`;
      }
      content = (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-12 pt-12 border-t border-brand-border/40 overflow-hidden"
        >
          {" "}
          {!(ageNum >= 13 && ageNum <= 15) && (
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 w-full max-w-md sm:max-w-lg mx-auto px-1">
              <button
                onClick={() => setGoal("bulk")}
                className={`w-full h-12 sm:h-14 px-1 rounded-xl text-[11px] sm:text-sm font-bold transition-all duration-300 flex items-center justify-center text-center leading-tight ${goal === "bulk" ? "bg-brand-primary text-white border border-brand-primary shadow-sm" : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50"}`}
              >
                {t.calculator.gain || "بناء العضلات"}
              </button>
              <button
                onClick={() => setGoal("cut")}
                className={`w-full h-12 sm:h-14 px-1 rounded-xl text-[11px] sm:text-sm font-bold transition-all duration-300 flex items-center justify-center text-center leading-tight ${goal === "cut" ? "bg-brand-primary text-white border border-brand-primary shadow-sm" : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50"}`}
              >
                {t.calculator.lose || "خسارة الدهون"}
              </button>
              <button
                onClick={() => setGoal("maintain")}
                className={`w-full h-12 sm:h-14 px-1 rounded-xl text-[11px] sm:text-sm font-bold transition-all duration-300 flex items-center justify-center text-center leading-tight ${goal === "maintain" ? "bg-brand-primary text-white border border-brand-primary shadow-sm" : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50"}`}
              >
                {t.calculator.maintain || "المحافظة على الوزن"}
              </button>
            </div>
          )}
          {goal !== "maintain" && (
            <div className="mb-10 w-full max-w-lg mx-auto">
              <div className="flex items-center justify-center gap-2 px-1 mb-3">
                <label className="text-sm font-bold text-brand-text">
                  مستوى {goal === "cut" ? "التنشيف" : "التضخيم"}
                </label>
                <button type="button" aria-label="مساعدة" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveHelp('goal'); }} className="cursor-pointer relative z-10 text-amber-500 hover:text-amber-600 p-2 -m-1 rounded-full transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-500/40">
                  <AlertCircle className="w-4 h-4 pointer-events-none" />
                </button>
              </div>
              <div className="flex gap-2 justify-center" dir="ltr">
                <button
                  onClick={() => setGoalLevel("aggressive")}
                  disabled={ageNum >= 16 && ageNum <= 18}
                  className={`flex-1 py-3 rounded-xl text-[13px] sm:text-sm font-bold transition-all duration-300 ${goalLevel === "aggressive" ? "bg-brand-primary text-white shadow-sm" : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50"} ${(ageNum >= 16 && ageNum <= 18) ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  قوي
                </button>
                <button
                  onClick={() => setGoalLevel("moderate")}
                  className={`flex-1 py-3 rounded-xl text-[13px] sm:text-sm font-bold transition-all duration-300 ${goalLevel === "moderate" ? "bg-brand-primary text-white shadow-sm" : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50"}`}
                >
                  متوسط
                </button>
                <button
                  onClick={() => setGoalLevel("light")}
                  className={`flex-1 py-3 rounded-xl text-[13px] sm:text-sm font-bold transition-all duration-300 ${goalLevel === "light" ? "bg-brand-primary text-white shadow-sm" : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50"}`}
                >
                  خفيف
                </button>
              </div>
              {(ageNum >= 16 && ageNum <= 18) && (
                 <p className="text-amber-600 text-xs mt-2 text-center font-medium bg-amber-50 rounded-lg p-2 border border-amber-100">
                  المستوى القوي غير متاح في هذه المرحلة العمرية لضمان النمو الصحي، يرجى الالتزام بالمستوى المتوسط كحد أقصى.
                 </p>
              )}
            </div>
          )}
          <div className="text-center mb-10">
            {" "}
            <h3 className="text-lg font-bold text-slate-900 mb-2 uppercase">
              {isTeen
                ? t.calculator.dailyNeed || "الاحتياج اليومي التقديري"
                : t.calculator.macrosTitle || "السعرات اليومية المستهدفة"}
            </h3>{" "}
            <div
              className="text-5xl md:text-7xl font-black text-brand-primary font-en tracking-tighter mb-2"
              dir="ltr"
            >
              {finalTdeeRounded}
              <span className="text-2xl text-brand-muted font-sans font-bold ml-2 md:ml-3 tracking-wider block md:inline mt-2 md:mt-0">
                kcal
              </span>
            </div>
          </div>

          {ageNum >= 60 && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center mb-6">
              <p className="text-slate-700 font-medium text-sm">ملحوظة: لعمرك الحالي، هذه الأرقام هي نقطة بداية تقديرية، وسيتم ضبطها بدقة أكبر بناءً على استجابة جسمك خلال المتابعة.</p>
            </div>
          )}
          {isUnderweight && goal === "cut" && (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center mb-6">
              <p className="text-amber-800 font-bold text-sm">وزنك الحالي أقل من المعدل الطبيعي (نحافة). التنشيف في هذه المرحلة قد يؤثر سلباً على صحتك وعضلاتك. يُفضل التركيز على بناء العضلات أو المحافظة.</p>
            </div>
          )}
          {hasLowCaloriesWarning && (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center mb-6">
              <p className="text-amber-800 font-bold text-sm">تنبيه: السعرات المستهدفة قليلة جداً. قد يكون من الصعب تغطية احتياجاتك من الفيتامينات والمعادن، ويُفضل زيادة نشاطك الحركي بدلاً من تقليل السعرات بهذا الحد.</p>
            </div>
          )}
          {!hasLowCarbWarning ? (
            <div className="space-y-4 md:space-y-5 mb-8" dir="rtl">
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="bg-rose-50/60 backdrop-blur-sm p-4 md:p-5 rounded-[20px] border border-rose-100/50 shadow-sm flex flex-col items-center justify-center text-center space-y-1">
                  <p className="text-rose-600/80 text-sm md:text-base font-bold whitespace-nowrap">
                    {t.calculator.protein || "بروتين"}
                  </p>
                  <p className="text-slate-700 text-lg md:text-xl font-bold font-en leading-none">
                    {protein}g
                  </p>
                </div>
                <div className="bg-emerald-50/60 backdrop-blur-sm p-4 md:p-5 rounded-[20px] border border-emerald-100/50 shadow-sm flex flex-col items-center justify-center text-center space-y-1">
                  <p className="text-emerald-600/80 text-sm md:text-base font-bold whitespace-nowrap">
                    {t.calculator.carbs || "كارب"}
                  </p>
                  <p className="text-slate-700 text-lg md:text-xl font-bold font-en leading-none">
                    {carbs}g
                  </p>
                </div>
                <div className="bg-amber-50/60 backdrop-blur-sm p-4 md:p-5 rounded-[20px] border border-amber-100/50 shadow-sm flex flex-col items-center justify-center text-center space-y-1">
                  <p className="text-amber-600/80 text-sm md:text-base font-bold whitespace-nowrap">
                    {t.calculator.fats || "دهون"}
                  </p>
                  <p className="text-slate-700 text-lg md:text-xl font-bold font-en leading-none">
                    {fats}g
                  </p>
                </div>
              </div>

              {/* Water Intake Box */}
              <div className="bg-sky-50/70 backdrop-blur-sm p-4 md:p-5 rounded-[20px] border border-sky-100/80 shadow-sm flex items-center justify-between gap-4 px-5 md:px-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                    <Droplets className="w-4 h-4 fill-brand-primary/20" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-800 text-xs md:text-sm font-bold">
                      احتياج الماء اليومي المقترح
                    </p>
                    <p className="text-[11px] md:text-xs text-slate-500 font-medium hidden sm:block">
                      يحافظ على نشاط الحرق والأداء الرياضي وصحة المفاصل
                    </p>
                  </div>
                </div>
                <div className="text-end shrink-0">
                  <span className="text-base md:text-xl font-black font-en text-brand-primary" dir="ltr">
                    {waterIntakeDisplay}
                  </span>
                  <span className="text-xs font-bold text-slate-600 ms-1.5">لتر / يوم</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 text-center mb-8 mx-auto max-w-md shadow-sm">
               <p className="text-amber-800 font-bold mb-4 leading-relaxed text-sm">هذا الهدف يقلل سعراتك لمستوى غير كافي لتغطية الاحتياج الأساسي من البروتين والدهون الصحية، مما قد يؤثر على الكتلة العضلية وصحتك العامة.</p>
               <Button
                 variant="primary"
                 href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`}
                 className="!px-6 !py-2.5 w-auto inline-flex"
                 onClick={() => trackCalculatorWhatsAppClick({ goal, target_calories: minTdeeRounded })}
               >
                 تواصل لضبط الخطة
               </Button>
            </div>
          )}
          
          
          
          <div className="text-center mb-10 max-w-2xl mx-auto space-y-3">
            {isAdult && (
              <p className="text-[13px] md:text-sm text-brand-muted px-4 mt-4">
                {goal === "cut" &&
                  goalLevel === "light" &&
                  "تم تقليل السعرات بنسبة 10% (تنشيف خفيف). مناسب لمن يريد النزول ببطء مع الحفاظ على الأداء الرياضي."}
                {goal === "cut" &&
                  goalLevel === "moderate" &&
                  "تم تقليل السعرات بنسبة 15% (تنشيف متوسط). المعدل الآمن والأكثر شيوعاً للنزول."}
                {goal === "cut" &&
                  goalLevel === "aggressive" &&
                  "تم تقليل السعرات بنسبة 20% (تنشيف قوي). يُفضل أن يكون لفترة قصيرة فقط."}

                {goal === "bulk" &&
                  goalLevel === "light" &&
                  "تم زيادة السعرات بنسبة 5% (تضخيم خفيف/صافي). للحد من اكتساب الدهون أثناء بناء العضلات."}
                {goal === "bulk" &&
                  goalLevel === "moderate" &&
                  "تم زيادة السعرات بنسبة 7% (تضخيم متوسط). التوازن الجيد لزيادة الوزن والحجم."}
                {goal === "bulk" &&
                  goalLevel === "aggressive" &&
                  "تم زيادة السعرات بنسبة 10% (تضخيم قوي). قد تزيد نسبة الدهون بشكل أسرع."}
              </p>
            )}{" "}
          </div>{" "}
          


          
          {!(hasLowCaloriesWarning || hasLowCarbWarning) && (
            <div className="text-center mt-6 mb-8 px-4 py-3.5 bg-amber-50 rounded-xl border border-amber-100 mx-auto max-w-2xl">
              <p className="text-amber-800 font-medium text-sm leading-relaxed">
                <span className="block">دي نقطة البداية ليك. راقب وزنك وأدائك أول أسبوعين، وعدّل السعرات حسب استجابة جسمك،</span>
                <span className="block font-bold mt-1">أو خلي المتابعة علينا!</span>
              </p>
            </div>
          )}
          <div className="bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/60 shadow-sm text-center w-full max-w-lg mx-auto">
            <p className="text-brand-text font-bold mb-5 sm:mb-6 text-base sm:text-lg">
              هل أنت مستعد للوصول لهدفك الحقيقي؟ <br />
              {isTeen ? (
                <span className="text-xs sm:text-sm text-brand-muted/80 mt-1.5 block leading-relaxed">لو حابب خطة مخصصة لعمر المراهقة بإشراف، تواصل معانا مباشرة</span>
              ) : (
                <span className="text-xs sm:text-sm text-brand-muted/80 mt-1.5 block leading-relaxed">الأرقام دي مجرد بداية.. عشان توصل لنتيجة أسرع وأضمن، ابدأ خطتك المخصصة بمتابعة مستمرة</span>
              )}
            </p>
            <div className="px-2 sm:px-0">
              <Button
                variant="primary"
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`}
                className="w-full sm:w-auto sm:!px-8 sm:min-w-[280px]"
                onClick={() =>
                  trackCalculatorWhatsAppClick({
                    goal,
                    target_calories: finalTdeeRounded,
                  })
                }
              >
                ابعت نتيجتي على واتساب
              </Button>
            </div>
          </div>
        </motion.div>
      );
    }

  return content;
}
