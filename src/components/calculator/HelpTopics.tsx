import React from "react";
import { Info } from "lucide-react";

export const getHelpTopics = () => {
  return {
    dailyActivity: {
      title: "يومك العادي عامل إزاي؟",
      content: (
        <div className="space-y-4 text-sm leading-relaxed text-slate-700 text-right text-base">
          <p>اختار الوصف الأقرب لمتوسط يومك بعيدًا عن وقت التمرين. احسب طبيعة شغلك، الدراسة، المشاوير، الوقوف والمشي اليومي.</p>
          <p className="font-bold">لو بتتابع خطواتك، استخدمها كدليل تقريبي:</p>
          <ul className="space-y-3 list-disc list-inside">
            <li><strong>أغلب اليوم قاعد:</strong> شغل مكتبي، دراسة أو سواقة، وغالبًا أقل من 5,000 خطوة يوميًا.</li>
            <li><strong>حركة بسيطة ومتقطعة:</strong> مشاوير أو شغل بيت وحركة على فترات، وغالبًا من 5,000 إلى 7,500 خطوة.</li>
            <li><strong>واقف أو ماشي معظم اليوم:</strong> مثل التدريس، التمريض، المبيعات أو العمل بالمطاعم، وغالبًا من 7,500 إلى 10,000 خطوة.</li>
            <li><strong>مجهود بدني قوي:</strong> مثل البناء، التحميل، الزراعة أو حمل الأشياء لساعات، وقد تتجاوز خطواتك 10,000 خطوة.</li>
          </ul>
          <p className="font-bold text-amber-600 mt-2 bg-amber-50 p-3 rounded-lg border border-amber-100/50">
            مهم: الخطوات مؤشر مساعد فقط، وطبيعة المجهود أهم من الرقم وحده. ما تحسبش وقت التمرين هنا؛ هنحسبه في السؤال التالي.
          </p>
        </div>
      )
    },
    workoutFrequency: {
      title: "متوسط تمرينك خلال الأسبوع؟",
      content: (
        <div className="space-y-4 text-sm leading-relaxed text-slate-700 text-right text-base">
          <p>اختار على أساس متوسط التزامك خلال <strong>آخر 4 أسابيع</strong>، مش أفضل أسبوع عندك.</p>
          <p>المقصود هنا التمرين المقصود والمنتظم، مثل الجيم، الكارديو، الجري، السباحة، الرياضات الجماعية أو التمارين المنزلية.</p>
          <p>المشي العادي والمشاوير اليومية ما تتحسبش هنا؛ لأنها محسوبة ضمن حركة يومك في السؤال السابق.</p>
          <p className="font-bold bg-slate-50 p-3 rounded-lg border border-slate-100">
            مثال: لو بتتمرن 6 أيام لكن باقي يومك شغل مكتبي وقعدة، اختار «أغلب اليوم قاعد» في السؤال الأول و«6 مرات أو أكثر» هنا.
          </p>
        </div>
      )
    },
    resistance: {
      title: "إيه المقصود بتمارين المقاومة؟",
      content: (
        <div className="space-y-4 text-sm leading-relaxed text-slate-700 text-right text-base">
          <p>اختار <strong>«نعم»</strong> لو بتمارس بانتظام تمارين هدفها تقوية أو بناء العضلات، مثل:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>الأوزان الحرة أو أجهزة الجيم.</li>
            <li>تمارين وزن الجسم مثل الضغط والعقلة وغيرها.</li>
            <li>أربطة المقاومة أو التمارين المشابهة.</li>
          </ul>
          <p>اختار <strong>«لا»</strong> لو نشاطك الأساسي مشي، جري، دراجة، سباحة أو كارديو فقط، أو لو بتمارس تمارين المقاومة بشكل نادر وغير منتظم.</p>
          <p className="font-medium text-brand-primary">بنستخدم إجابتك لتحديد احتياجك من البروتين بشكل أنسب.</p>
        </div>
      )
    },
    bodyFat: {
      title: "ليه بنسألك عن نسبة الدهون؟",
      content: (
        <div className="space-y-4 text-sm leading-relaxed text-slate-700 text-right text-base">
          <p>مؤشر كتلة الجسم BMI بيعتمد على الوزن والطول، لكنه ما بيفرقش بين وزن الدهون والعضلات والعظام.</p>
          <p>لو عندك قياس حديث وموثوق لنسبة الدهون، إدخاله بيساعدنا نحسب الكتلة الخالية من الدهون ومؤشر FFMI، وقد يجعل تقدير احتياجك من السعرات والبروتين أنسب لحالتك.</p>
          <p>لكن لو النسبة مجرد تخمين أو مأخوذة من جهاز مش واثق في دقته، الأفضل تسيب الخانة فاضية؛ الحاسبة هتشتغل بشكل طبيعي من غيرها.</p>
          <p className="bg-emerald-50 text-emerald-700 p-3 rounded-lg border border-emerald-100/50 font-bold">
            أدخل نسبة الدهون فقط لو عندك قياس حديث وموثوق؛ إدخال رقم غير دقيق ممكن يقلل دقة النتيجة بدل ما يحسنها.
          </p>
        </div>
      )
    },
    goal: {
      title: "كيف تختار معدل النزول/الزيادة؟",
      content: (
        <div className="space-y-3 text-sm leading-relaxed text-slate-700 text-right text-base">
          <p><strong>في التنشيف (خسارة الدهون):</strong></p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-brand-text">عجز خفيف:</strong> ينزل الوزن ببطء، ممتاز للحفاظ على الأداء العالي في التمرين وأكبر قدر من العضلات.</li>
            <li><strong className="text-brand-text">عجز متوسط:</strong> الحل الأمثل والأكثر توازناً وشيوعاً لنتيجة ملحوظة وبناء عضلي مستمر.</li>
            <li><strong className="text-brand-text">عجز قوي:</strong> يستعمل لفترات قصيرة جداً للنزول السريع، ولا يُنصح بالاستمرار عليه طويلاً.</li>
          </ul>
          <p className="pt-3 border-t border-slate-100"><strong>في التضخيم:</strong> الفائض البسيط هو الأفضل لبناء عضلات صافية بدون تراكم نسبة دهون عالية.</p>
        </div>
      )
    },
    disclaimer: {
      title: "إخلاء مسؤولية طبية",
      content: (
        <div className="space-y-4 text-sm leading-relaxed text-slate-700 text-right text-base">
          <p>
            هذه الحاسبة تقدم تقديرات عامة مبنية على معادلات علمية والبيانات التي تدخلها، ولا تُعد تشخيصًا طبيًا أو وصفة علاجية. قد يختلف احتياجك الفعلي حسب حالتك الصحية ونمط حياتك.
          </p>
          <p>
            استشر طبيبًا أو أخصائي تغذية قبل اتباع النتيجة إذا كنت أقل من 18 عامًا، حاملًا أو مرضعًا، أو لديك مرض مزمن — خصوصًا أمراض الكلى أو الكبد أو السكري — أو تاريخ مع اضطرابات الأكل، أو تتناول أدوية تؤثر في الوزن أو الشهية.
          </p>
          <p className="font-bold text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
            لا تغيّر علاجك أو نظامك الغذائي بشكل كبير اعتمادًا على الحاسبة وحدها.
          </p>
        </div>
      )
    }
  };
};
