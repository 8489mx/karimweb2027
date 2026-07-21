import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingWhatsApp } from '../components/ui/FloatingWhatsApp';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function TermsAndConditions() {
  return (
    <div className="min-h-screen text-brand-text font-sans selection:bg-brand-primary selection:text-white pb-20 md:pb-0 relative w-full flex flex-col">
      <SEO 
        title="الشروط والأحكام | كابتن كريم زكريا" 
        description="اقرأ الشروط والأحكام الخاصة بالاشتراك في برامج التدريب والتغذية مع كابتن كريم زكريا."
      />
      {/* Radial Gradient Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, rgba(88, 180, 229, 0.15) 100%)",
        }}
      />
      <Header />
      <main className="flex-1 relative z-10 pt-32 pb-24 container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="mb-6 flex justify-start">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/80 border border-white shadow-sm rounded-full transition-all text-slate-800 font-medium group text-sm">
            <ArrowRight size={16} className="group-hover:-translate-x-1 transition-transform" />
            العودة للصفحة الرئيسية
          </Link>
        </div>
        
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-xl md:text-3xl font-bold mb-4 tracking-tight text-slate-900 leading-tight">
            الشروط والأحكام وسياسات الاشتراك
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-[17px] md:text-xl leading-relaxed md:leading-loose">
            <>تهدف هذه الشروط إلى توضيح طريقة تقديم الخدمة، وتنظيم العلاقة بين العميل وفريق المتابعة، وحفظ حقوق جميع الأطراف.<br />بمجرد الاشتراك في أي من برامجنا، يُعد العميل موافقًا على البنود التالية.</>
          </p>
        </div>

        <div 
          className="relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden group/main"
        >
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-slate-900/10 rounded-full blur-[80px]"></div>

          <div className="relative z-10 space-y-10 md:space-y-12">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                طبيعة الخدمة
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  نقدم برامج تدريب وتغذية ومتابعة أونلاين يتم تصميمها حسب بيانات العميل، هدفه، مستواه، وأسلوب حياته.
                </p>
                <p>
                  الخدمة لا تعتمد على ملف جاهز واحد لكل الأشخاص، بل يتم إعداد الخطة بناءً على البيانات التي يرسلها العميل قبل بداية البرنامج.
                </p>
              </div></div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                تسليم البرنامج والمتابعة
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  يتم تصميم وإرسال البرنامج التدريبي والغذائي خلال مدة تصل إلى 7 أيام عمل من تاريخ استلام جميع البيانات المطلوبة وتأكيد الاشتراك.
                </p>
                <p>
                  قد تختلف مدة الرد وسرعة المتابعة حسب نوع الباقة المشترك بها، وفق تفاصيل كل باقة الموضحة قبل الاشتراك.
                </p>
                <p>
                  تختلف النتائج من شخص لآخر حسب الالتزام، الحالة الصحية، النوم، التغذية، مستوى النشاط، وطريقة استجابة الجسم.
                </p>
              </div></div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                التزام العميل بالمتابعة
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  جودة المتابعة تعتمد على التزام العميل بإرسال التحديثات المطلوبة في مواعيدها، مثل الوزن، القياسات، صور المتابعة إن وجدت، ومستوى الأداء والطاقة.
                </p>
                <p>
                  في حالة انقطاع العميل عن المتابعة لفترة بدون إبلاغ مسبق، قد يحتاج الفريق إلى إعادة تقييم الحالة أو تعديل الخطة قبل استكمال المتابعة.
                </p>
              </div></div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                التزامات العميل
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>يلتزم العميل بما يلي:</p>
                <ul className="list-disc list-inside space-y-2 mt-2 mb-4">
                  <li>تقديم بيانات صحيحة ودقيقة.</li>
                  <li>الإفصاح عن أي إصابة، حالة صحية، حساسية، أدوية، أو ظروف قد تؤثر على التدريب أو التغذية.</li>
                  <li>تنفيذ البرنامج وفق الإرشادات الموضحة.</li>
                  <li>إرسال المتابعات المطلوبة حسب نظام الباقة.</li>
                  <li>عدم مشاركة البرنامج مع أي شخص آخر.</li>
                </ul>
                <p>
                  ويتحمل العميل مسؤولية أي تأثيرات ناتجة عن تقديم معلومات غير صحيحة أو إخفاء معلومات مهمة.
                </p>
              </div></div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                سياسة الاشتراك والاسترداد
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  لأن البرامج يتم إعدادها بشكل مخصص لكل عميل، فهي تُعد خدمة شخصية غير جاهزة.
                </p>
                <p>
                  قبل بدء إعداد البرنامج، يمكن طلب إلغاء الاشتراك، ويتم مراجعة الطلب حسب مرحلة التجهيز.
                </p>
                <p>
                  بعد بدء إعداد البرنامج أو تسليمه، لا يمكن استرداد المبلغ المدفوع، لأن الخدمة تكون قد بدأت بالفعل وتم تخصيصها للعميل.
                </p>
              </div></div>
            </section>

            
            {/* Section 6 (New) */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                تجميد أو إيقاف الاشتراك
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  إمكانية إيقاف أو تجميد الاشتراك (Freeze) والمدة المسموح بها تعتمد بشكل كامل على نوع الباقة المشترك بها.
                </p>
                <p>
                  يتم توضيح تفاصيل وشروط التجميد المتاحة ضمن تفاصيل كل باقة قبل إتمام الاشتراك، ويجب طلب التجميد مسبقاً من خلال التواصل المباشر مع فريق المتابعة عبر الواتساب.
                </p>
              </div></div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                سياسة الدعم عند عدم التقدم
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  نحن لا نضمن نتائج ثابتة أو متطابقة لكل العملاء، لأن النتائج تختلف حسب عوامل كثيرة.
                </p>
                <p>
                  لكن في حالة عدم ظهور تقدم واضح رغم الالتزام الحقيقي بالخطة والمتابعة، يتم مراجعة الحالة وإجراء التعديلات المناسبة حسب البيانات المتاحة.
                </p>
                <p>
                  للاستفادة من هذه المراجعة، يجب توفر الآتي:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2 mb-4">
                  <li>الالتزام بالخطة قدر الإمكان.</li>
                  <li>إرسال المتابعات والقياسات في مواعيدها.</li>
                  <li>تنفيذ التعليمات بشكل صحيح.</li>
                  <li>عدم إخفاء أي معلومات صحية أو تغييرات مؤثرة.</li>
                  <li>عدم اتباع أنظمة أخرى بدون إبلاغ فريق المتابعة.</li>
                </ul>
                <p>
                  ولا تنطبق هذه السياسة في حالات الانقطاع عن المتابعة، عدم الالتزام، إخفاء معلومات صحية، أو تغيير الخطة بدون الرجوع لفريق المتابعة.
                </p>
              </div></div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                تعديل البرنامج
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  يجوز تعديل البرنامج التدريبي أو الغذائي أثناء مدة الاشتراك إذا تطلبت الحالة ذلك.
                </p>
                <p>
                  قد تشمل التعديلات تغيير السعرات، توزيع الوجبات، شدة التمرين، الكارديو، أو بعض التمارين حسب تقدم العميل واستجابته.
                </p>
              </div></div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                الحالات الصحية والإصابات
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  يجب على العميل الإفصاح عن أي حالة صحية أو إصابة أو أدوية قبل بدء البرنامج.
                </p>
                <p>
                  البرامج المقدمة لا تُعد تشخيصًا أو علاجًا طبيًا، ولا تغني عن استشارة الطبيب أو المختص.
                </p>
                <p>
                  في حالة وجود إصابة، سكر، ضغط، مشاكل قلب، مشاكل كلى، حمل، حساسية، أو استخدام أدوية، يجب الرجوع لطبيب أو مختص قبل بدء أي برنامج تدريبي أو غذائي.
                </p>
              </div></div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                تنفيذ التمارين والسلامة
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  يلتزم العميل بتنفيذ التمارين حسب الشرح والإرشادات المقدمة.
                </p>
                <p>
                  في حالة الشعور بألم غير طبيعي، دوخة، ضيق تنفس، أو أي أعراض غير معتادة، يجب إيقاف التمرين فورًا والرجوع لطبيب أو مختص عند الحاجة.
                </p>
                <p>
                  لا نتحمل مسؤولية أي ضرر ناتج عن سوء تنفيذ التمارين، تجاهل الإرشادات، إخفاء معلومات صحية، أو استخدام البرنامج بطريقة غير صحيحة.
                </p>
              </div></div>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                الملكية الفكرية
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  جميع البرامج، الخطط، المواد، الشروحات، وأي محتوى يتم تقديمه للعميل هي ملكية فكرية خاصة بكابتن كريم زكريا.
                </p>
                <p>يُمنع:</p>
                <ul className="list-disc list-inside space-y-2 mt-2 mb-4">
                  <li>نسخ المحتوى.</li>
                  <li>إعادة نشره.</li>
                  <li>بيعه أو مشاركته.</li>
                  <li>استخدامه لأي غرض تجاري.</li>
                  <li>إرساله لأي شخص غير مشترك في البرنامج.</li>
                </ul>
                <p>
                  الاشتراك شخصي ولا يجوز استخدامه من قبل أي شخص آخر.
                </p>
              </div></div>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                الخصوصية والبيانات
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  يتم التعامل مع بيانات العميل بسرية، ولا يتم نشر أي صور، نتائج، محادثات، أو لقطات شاشة إلا بعد الحصول على موافقة صريحة من العميل.
                </p>
                <p>
                  لمزيد من التفاصيل، يمكن الرجوع إلى سياسة الخصوصية وسرية البيانات الموجودة بالموقع.
                </p>
              </div></div>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                سياسة السلوك والتواصل
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  نحرص على أن تكون المتابعة مبنية على الاحترام المتبادل.
                </p>
                <p>
                  في حالة وجود إساءة، تهديد، تجاوز لفظي، أو سلوك غير لائق تجاه فريق المتابعة، يحق لإدارة البرنامج إيقاف الخدمة دون استرداد المبلغ المدفوع.
                </p>
              </div></div>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                تغيير الباقة أو تجديد الاشتراك
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  يمكن للعميل طلب تغيير الباقة أو تجديد الاشتراك بعد انتهاء المدة الحالية، حسب الباقات المتاحة وقت الطلب.
                </p>
                <p>
                  أي تغيير في الباقة أو مدة الاشتراك يتم تأكيده مع العميل قبل تطبيقه.
                </p>
              </div></div>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                تحديث الشروط والأحكام
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                {/* Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  قد يتم تحديث هذه الشروط من وقت لآخر حسب تطوير الخدمة أو تحسين طريقة تقديمها.
                </p>
                <p>
                  يتم نشر أي تحديث على هذه الصفحة، ويُعد استمرار استخدام الموقع أو الخدمة بعد نشر التحديث موافقة على النسخة المحدثة.
                </p>
              </div></div>
            </section>

            {/* Final note */}
            <div className="bg-brand-secondary/30 rounded-2xl p-5 md:p-6 border border-brand-primary/20 shadow-sm text-center space-y-3">
              <p className="font-medium text-slate-900 text-base md:text-lg">
                ملاحظة مهمة
              </p>
              <p className="text-slate-700 text-sm md:text-base">
                هدف البرنامج هو مساعدتك على تحسين التدريب، التغذية، والعادات الصحية بطريقة مناسبة لهدفك وأسلوب حياتك.<br />لكن النتائج تختلف من شخص لآخر، ولا يمكن اعتبار البرنامج بديلًا عن الاستشارة أو التشخيص أو العلاج الطبي.
              </p>
            </div>

          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 hover:bg-white/80 border border-white shadow-sm rounded-full transition-all text-slate-800 font-medium group">
            <ArrowRight size={18} className="group-hover:-translate-x-1 transition-transform" />
            العودة للصفحة الرئيسية
          </Link>
        </div>

      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
