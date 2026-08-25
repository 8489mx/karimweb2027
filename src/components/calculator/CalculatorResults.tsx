import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/Button";
import { useLanguage } from "../../context/LanguageContext";
import { useSettings } from "../../context/SettingsContext";
import { trackCalculatorWhatsAppClick } from "../../utils/tracking";
import { Info, AlertCircle } from "lucide-react";

export function CalculatorResults({
  results, age, isPregnantOrNursing, gender, goalLevel, goal, bodyFat, activity, clearResults,
  resistanceTraining, weight, unitSystem, heightCm, heightFt, heightIn, getActivityLabel, setGoal, setActiveHelp, setGoalLevel
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
      whatsappText += `سعرات الحفاظ التقديرية: ${maintenanceRounded} kcal
السعرات المستهدفة: ${minTdeeRounded} - ${maxTdeeRounded} kcal
`;
      if (hasLowCarbWarning) {
        whatsappText += `البروتين: ${protein}g | الدهون: ${fats}g | الكارب: سالب (السعرات غير كافية)\n`;
      } else {
        whatsappText += `البروتين: ${protein}g | الدهون: ${fats}g | الكارب: ${carbs}g\n`;
      }
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
            <div
              className="flex flex-wrap justify-center gap-3 mb-10 w-full"
              dir="ltr"
            >
              {" "}
              <button
                onClick={() => setGoal("maintain")}
                className={`flex-1 sm:flex-none min-w-[120px] px-4 sm:px-6 md:px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${goal === "maintain" ? "bg-brand-primary text-white border border-brand-primary " : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50 "}`}
              >
                {" "}
                {t.calculator.maintain || "المحافظة على الوزن"}{" "}
              </button>{" "}
              <button
                onClick={() => setGoal("cut")}
                className={`flex-1 sm:flex-none min-w-[120px] px-4 sm:px-6 md:px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${goal === "cut" ? "bg-brand-primary text-white border border-brand-primary " : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50 "}`}
              >
                {" "}
                {t.calculator.lose || "خسارة الدهون"}{" "}
              </button>{" "}
              <button
                onClick={() => setGoal("bulk")}
                className={`flex-1 sm:flex-none min-w-[120px] px-4 sm:px-6 md:px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${goal === "bulk" ? "bg-brand-primary text-white border border-brand-primary " : "bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50 "}`}
              >
                {" "}
                {t.calculator.gain || "بناء العضلات"}{" "}
              </button>{" "}
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
                  onClick={() => setGoalLevel("light")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${goalLevel === "light" ? "bg-brand-primary text-white" : "bg-white border border-slate-200 text-brand-muted"}`}
                >
                  خفيف
                </button>
                <button
                  onClick={() => setGoalLevel("moderate")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${goalLevel === "moderate" ? "bg-brand-primary text-white" : "bg-white border border-slate-200 text-brand-muted"}`}
                >
                  متوسط
                </button>
                
                  <button
                    onClick={() => setGoalLevel("aggressive")}
                    disabled={ageNum >= 16 && ageNum <= 18}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${goalLevel === "aggressive" ? "bg-red-500 text-white" : "bg-white border border-slate-200 text-brand-muted"} ${(ageNum >= 16 && ageNum <= 18) ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    قوي
                  </button>

              </div>
              {goalLevel === "aggressive" && !(ageNum >= 16 && ageNum <= 18) && (
                <p className="text-red-500 text-xs mt-2 text-center font-medium">
                  تحذير: المستوى القوي قد يكون صعب الاستدامة ويجب متابعته بحذر.
                </p>
              )}
              {(ageNum >= 16 && ageNum <= 18) && (
                 <p className="text-amber-600 text-xs mt-2 text-center font-medium bg-amber-50 rounded-lg p-2 border border-amber-100">
                  المستوى القوي غير متاح في هذه المرحلة العمرية لضمان النمو الصحي، يرجى الالتزام بالمستوى المتوسط كحد أقصى.
                 </p>
              )}
            </div>
          )}
          <div className="text-center mb-10">
            {" "}
            <h3 className="text-lg font-bold text-brand-muted mb-2 uppercase">
              {isTeen
                ? t.calculator.dailyNeed || "الاحتياج اليومي التقديري"
                : t.calculator.macrosTitle || "السعرات اليومية المستهدفة"}
            </h3>{" "}
            <div
              className="text-5xl md:text-7xl font-black text-brand-primary font-en tracking-tighter mb-2"
              dir="ltr"
            >
              {minTdeeRounded} - {maxTdeeRounded}
              <span className="text-2xl text-brand-muted font-sans font-bold ms-2 tracking-wider block md:inline mt-2 md:mt-0">
                kcal
              </span>
            </div>
            <p className="text-brand-text/70 text-sm mt-3 font-medium max-w-md mx-auto">
              هذا الرقم هو نقطة بداية تقديرية، الدقة الحقيقية تعتمد على استجابة
              جسمك ويتم ضبطها مع المتابعة.
            </p>{" "}
            {!isTeen && goal !== "maintain" && (
              <p
                className="text-brand-muted font-medium mt-2 flex items-center justify-center gap-1 flex-wrap"
                dir="rtl"
              >
                <span>{t.calculator.maintenanceCaloriesText || "سعرات الحفاظ التقديرية"}:</span>
                <strong className="text-brand-text font-en" dir="ltr">
                  {maintenanceRounded} kcal
                </strong>
              </p>
            )}
            <p
              className="text-brand-muted/70 text-sm font-medium mt-1 flex items-center justify-center gap-1 flex-wrap"
              dir="rtl"
            >
              <span>{t.calculator.bmrLabel || "معدل الحرق التقديري (RMR)"}:</span>
              <strong className="text-brand-muted font-en" dir="ltr">
                {bmrRounded} kcal
              </strong>
            </p>{" "}
          </div>{" "}

          <div className="flex flex-wrap gap-3 justify-center mb-8 text-center" dir="rtl">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-full px-4 py-2 shadow-sm">
              <span className="text-xs text-brand-muted font-bold">BMI:</span>
              <span className="text-sm font-en font-black text-slate-700">{currentBmi.toFixed(1)}</span>
              {!isTeen && !isUnder13 && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentBmi >= 30 ? 'bg-brand-primary/10 text-brand-primary' : currentBmi >= 25 ? 'bg-amber-100 text-amber-700' : currentBmi < 18.5 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{bmiCategory}</span>
              )}
            </div>
            {ffmi && !isTeen && !isUnder13 && (
              <div className="flex items-center gap-2 bg-brand-primary/5 border border-brand-primary/10 rounded-full px-4 py-2 shadow-sm">
                <span className="text-xs text-brand-primary font-bold">FFMI (عضلات):</span>
                <span className="text-sm font-en font-black text-slate-700">{ffmi.toFixed(1)}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary">{ffmiCategory}</span>
              </div>
            )}
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
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8" dir="rtl">
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
            {" "}
            <p className="text-sm md:text-base text-brand-text font-medium leading-relaxed px-4">
              {" "}
              {isTeen
                ? "هذه الأرقام نقطة بداية تقديرية، يفضل متابعة الأداء والنمو مع مدرب أو مختص."
                : t.calculator.macrosEstimateNote ||
                  "هذه الأرقام نقطة بداية تقديرية. تابع متوسط الوزن والأداء والجوع لمدة أسبوعين، ثم عدّل السعرات حسب استجابة جسمك."}{" "}
            </p>{" "}
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
            <div className="text-center mt-6 mb-8 px-4 py-3 bg-amber-50 rounded-xl border border-amber-100 mx-auto max-w-2xl">
              <p className="text-amber-800 font-medium text-sm">
                السعرات دي نقطة بداية تقديرية، راقب وزنك وقياساتك في أول أسبوعين وعدل بناءً على استجابة جسمك.
              </p>
            </div>
          )}
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-sm text-center">
            <p className="text-brand-text font-bold mb-6 text-lg">
              هل أنت مستعد للوصول لهدفك الحقيقي؟ <br />
              {isTeen ? (
                <span className="text-sm text-brand-muted/80 mt-1 block">لو حابب خطة مخصصة لعمر المراهقة بإشراف، تواصل معانا مباشرة</span>
              ) : (
                <span className="text-sm text-brand-muted/80 mt-1 block">لنتائج أفضل: احصل على خطة مخصصة ومتابعة أسبوعية لتحديث هذه الأرقام بدقة</span>
              )}
            </p>
            <Button
              variant="primary"
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`}
              className="!px-8 min-w-[280px]"
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
          <p className="text-xs text-brand-muted/60 mt-6 text-center max-w-lg mx-auto leading-relaxed">
            * النتائج تقديرية وتعليمية، وليست تشخيصًا طبيًا أو خطة علاجية، وقد تختلف الاحتياجات الفعلية حسب الحالة الصحية والاستجابة والمتابعة العملية.
          </p>
        </motion.div>
      );
    }

  return content;
}
