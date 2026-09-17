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
          <p className="font-medium text-slate-600">بنستخدم إجابتك لتحديد احتياجك من البروتين بشكل أنسب.</p>
        </div>
      )
    },
    bodyFatVisual: {
      title: "دليل تقدير نسبة الدهون التقريبية",
      content: (
        <div className="space-y-6 text-sm leading-relaxed text-slate-700 text-right text-base" dir="rtl">
          <p className="text-slate-500 font-medium">تقدر تقارن شكل جسمك في المراية بالدليل التقريبي ده لتسهيل الحساب:</p>
          
          <div className="relative">
            <h4 className="font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-cyan-500 mb-4 flex items-center gap-2 text-lg">
              <span className="w-2 h-6 rounded-full bg-blue-500 block shrink-0"></span> للرجال
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <div className="group relative bg-white/50 backdrop-blur-sm border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 text-right">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-transparent rounded-tr-2xl rounded-bl-3xl opacity-50 pointer-events-none"></div>
                <div className="relative z-10 flex items-baseline gap-1.5 mb-2.5">
                  <span className="font-black text-xl sm:text-2xl text-slate-800 tracking-tight leading-none">10-12</span>
                  <span className="text-sm sm:text-base text-slate-400 font-bold">%</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-[13px] sm:text-[15px]">تقسيمات البطن الستة (Six-pack) واضحة جداً، وعضلات الجسم بارزة ومفصلة بقوة.</p>
              </div>
              <div className="group relative bg-white/50 backdrop-blur-sm border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 text-right">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-transparent rounded-tr-2xl rounded-bl-3xl opacity-50 pointer-events-none"></div>
                <div className="relative z-10 flex items-baseline gap-1.5 mb-2.5">
                  <span className="font-black text-xl sm:text-2xl text-slate-800 tracking-tight leading-none">15</span>
                  <span className="text-sm sm:text-base text-slate-400 font-bold">%</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-[13px] sm:text-[15px]">تحديد بسيط لعضلات البطن العلوية، جسم رياضي ومشدود بشكل عام.</p>
              </div>
              <div className="group relative bg-white/50 backdrop-blur-sm border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 text-right">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-transparent rounded-tr-2xl rounded-bl-3xl opacity-50 pointer-events-none"></div>
                <div className="relative z-10 flex items-baseline gap-1.5 mb-2.5">
                  <span className="font-black text-xl sm:text-2xl text-slate-800 tracking-tight leading-none">20</span>
                  <span className="text-sm sm:text-base text-slate-400 font-bold">%</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-[13px] sm:text-[15px]">بدون تقسيمات للبطن، بداية ظهور الكرش البسيط وتخزين دهون في الخصر.</p>
              </div>
              <div className="group relative bg-white/50 backdrop-blur-sm border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 text-right">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-transparent rounded-tr-2xl rounded-bl-3xl opacity-50 pointer-events-none"></div>
                <div className="relative z-10 flex items-baseline gap-1.5 mb-2.5">
                  <span className="font-black text-xl sm:text-2xl text-slate-800 tracking-tight leading-none">25-30</span>
                  <span className="text-sm sm:text-base text-slate-400 font-bold">%+</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-[13px] sm:text-[15px]">كرش واضح، وزن زائد ملحوظ وتراكم كبير للدهون في الجناب والصدر.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 relative">
            <h4 className="font-black text-transparent bg-clip-text bg-gradient-to-l from-pink-500 to-rose-400 mb-4 flex items-center gap-2 text-lg">
              <span className="w-2 h-6 rounded-full bg-pink-500 block shrink-0"></span> للنساء
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <div className="group relative bg-white/50 backdrop-blur-sm border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-pink-200 transition-all duration-300 text-right">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-pink-100 to-transparent rounded-tr-2xl rounded-bl-3xl opacity-50 pointer-events-none"></div>
                <div className="relative z-10 flex items-baseline gap-1.5 mb-2.5">
                  <span className="font-black text-xl sm:text-2xl text-slate-800 tracking-tight leading-none">18-20</span>
                  <span className="text-sm sm:text-base text-slate-400 font-bold">%</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-[13px] sm:text-[15px]">جسم رياضي جداً وناشف، تقسيمات خفيفة في البطن (شكل الفيتنس).</p>
              </div>
              <div className="group relative bg-white/50 backdrop-blur-sm border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-pink-200 transition-all duration-300 text-right">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-pink-100 to-transparent rounded-tr-2xl rounded-bl-3xl opacity-50 pointer-events-none"></div>
                <div className="relative z-10 flex items-baseline gap-1.5 mb-2.5">
                  <span className="font-black text-xl sm:text-2xl text-slate-800 tracking-tight leading-none">25</span>
                  <span className="text-sm sm:text-base text-slate-400 font-bold">%</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-[13px] sm:text-[15px]">جسم مشدود ورفيع، بدون تقسيمات عضلية واضحة (النسبة المثالية).</p>
              </div>
              <div className="group relative bg-white/50 backdrop-blur-sm border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-pink-200 transition-all duration-300 text-right">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-pink-100 to-transparent rounded-tr-2xl rounded-bl-3xl opacity-50 pointer-events-none"></div>
                <div className="relative z-10 flex items-baseline gap-1.5 mb-2.5">
                  <span className="font-black text-xl sm:text-2xl text-slate-800 tracking-tight leading-none">30</span>
                  <span className="text-sm sm:text-base text-slate-400 font-bold">%</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-[13px] sm:text-[15px]">بداية تخزين الدهون بشكل ملحوظ في الأرداف، الفخذين، والبطن السفلية.</p>
              </div>
              <div className="group relative bg-white/50 backdrop-blur-sm border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-pink-200 transition-all duration-300 text-right">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-pink-100 to-transparent rounded-tr-2xl rounded-bl-3xl opacity-50 pointer-events-none"></div>
                <div className="relative z-10 flex items-baseline gap-1.5 mb-2.5">
                  <span className="font-black text-xl sm:text-2xl text-slate-800 tracking-tight leading-none">35-40</span>
                  <span className="text-sm sm:text-base text-slate-400 font-bold">%+</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-[13px] sm:text-[15px]">وزن زائد وممتلئ، توزيع كبير للدهون في أغلب مناطق الجسم.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-l from-slate-900 to-slate-800 p-4 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <p className="relative z-10 text-white font-medium text-sm text-center leading-relaxed">
              اختر النسبة الأقرب لشكل جسمك واكتبها في الخانة، وسنحسب لك السعرات بدقة عالية.
            </p>
          </div>
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
