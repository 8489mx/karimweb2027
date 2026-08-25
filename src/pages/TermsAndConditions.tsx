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
      <main className="flex-1 relative z-10 pt-28 pb-16 container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="mb-6 flex justify-start">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/80 border border-white shadow-sm rounded-full transition-all text-slate-800 font-medium group text-sm">
            <ArrowRight size={16} className="group-hover:-translate-x-1 transition-transform" />
            العودة للصفحة الرئيسية
          </Link>
        </div>
        
        <div className="mb-8 md:mb-10 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-normal">
            الشروط والأحكام وسياسات الاشتراك
          </h1>
        </div>

        <div 
          className="relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden group/main"
        >
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-slate-900/10 rounded-full blur-[80px]"></div>

          <div className="relative z-10 space-y-6 md:space-y-8">
            
            <div className="text-center space-y-3 pb-2">
              <p className="text-[17px] md:text-[19px] font-medium text-slate-700">
                تهدف هذه الشروط إلى توضيح طريقة تقديم الخدمة، وتنظيم العلاقة بين العميل وفريق المتابعة، وحفظ حقوق جميع الأطراف.
              </p>
              <p className="text-slate-600 max-w-3xl mx-auto text-[15px] md:text-[17px] leading-relaxed md:leading-loose">
                بإتمام الاشتراك وسداد قيمة الباقة، يؤكد العميل اطلاعه على تفاصيل الباقة والشروط والأحكام وسياسة الخصوصية المعروضة بالموقع وتعاقده على أساسها.
              </p>
            </div>

            {/* Section 1 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                طبيعة الخدمة
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  يقدم كابتن كريم زكريا خدمات تدريب وتغذية غير علاجية ومتابعة أونلاين يتم إعدادها وفق البيانات والهدف والمستوى وأسلوب الحياة الذي يقدمه العميل.
                </p>
                <p>
                  الخدمة مخصصة للعميل المشترك، ولا تعتبر تشخيصًا أو علاجًا طبيًا أو بديلًا عن الطبيب أو المختص الصحي.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                تسليم البرنامج
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  يتم إعداد وإرسال البرنامج خلال مدة تصل إلى 3 إلى 7 أيام عمل من تاريخ تأكيد الاشتراك واستلام جميع البيانات المطلوبة.
                </p>
                <p>
                  ولا تبدأ مدة التجهيز إلا بعد اكتمال البيانات المطلوبة من العميل.
                </p>
                <p>
                  وتختلف طريقة وسرعة ومواعيد المتابعة وفق الباقة التي اختارها العميل والتفاصيل الموضحة قبل الاشتراك.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                النتائج
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  لا يتم ضمان نتيجة محددة أو مقدار معين من فقدان الوزن أو زيادة العضلات أو تغير القياسات.
                </p>
                <p>
                  تختلف النتائج من شخص لآخر حسب الالتزام والحالة الصحية والنوم والتغذية ومستوى النشاط وطبيعة واستجابة الجسم وغيرها من العوامل الفردية.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                المتابعة والانقطاع
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  تعتمد جودة المتابعة على التزام العميل بإرسال التحديثات المطلوبة في مواعيدها.
                </p>
                <p>
                  وفي حالة انقطاع العميل عن المتابعة دون إبلاغ مسبق، لا يتم تلقائيًا تمديد مدة الاشتراك أو تعويض الأيام الناتجة عن عدم تواصل العميل، إلا إذا كانت شروط الباقة تنص على غير ذلك.
                </p>
                <p>
                  وقد يحتاج العميل إلى إعادة تقييم حالته عند العودة بعد انقطاع طويل.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                التزامات العميل
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>يلتزم العميل بما يلي:</p>
                <ul className="list-disc list-inside space-y-3 mt-4 marker:text-brand-primary">
                  <li>تقديم بيانات صحيحة ودقيقة.</li>
                  <li>الإفصاح عن الإصابات والحالات الصحية والحساسية والأدوية وأي معلومات مؤثرة.</li>
                  <li>اتباع التعليمات المقدمة.</li>
                  <li>إرسال المتابعات المطلوبة وفق نظام الباقة.</li>
                  <li>إبلاغ فريق المتابعة بأي تغيير صحي مهم.</li>
                  <li>عدم مشاركة البرنامج مع أي شخص آخر.</li>
                </ul>
                <p>
                  ويتحمل العميل مسؤولية النتائج أو الأضرار الناتجة عن تقديم معلومات غير صحيحة أو إخفاء معلومات مهمة أو مخالفة التعليمات أو إساءة استخدام البرنامج، وذلك في الحدود التي يسمح بها القانون.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                الإلغاء والاسترداد
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  نظرًا لأن البرامج يتم إعدادها بصورة مخصصة بناءً على بيانات كل عميل، تتم مراجعة طلبات الإلغاء والاسترداد وفق مرحلة تنفيذ الخدمة وما تم تقديمه أو الانتفاع به، وبما يتفق مع الحقوق والالتزامات المقررة قانونًا.
                </p>
                <p>
                  في حالة طلب الإلغاء قبل بدء تنفيذ الخدمة، يتم التعامل مع الطلب وفقًا للقانون.
                </p>
                <p>
                  وبعد بدء تقديم الخدمة أو الانتفاع بها، يتم تقييم أي طلب استرداد وفق الجزء الذي تم تنفيذه وطبيعة الخدمة والحالات التي يسمح فيها القانون بالرجوع أو الاسترداد.
                </p>
                <p>
                  ولا يُفسر أي بند في هذه الشروط على أنه إلغاء لحق إلزامي يقرره القانون للعميل.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
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
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
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
                <ul className="list-disc list-inside space-y-3 mt-4 marker:text-brand-primary">
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
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
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
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
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
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
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
                  لا يتحمل مقدم الخدمة مسؤولية الأضرار الناتجة عن سوء تنفيذ التمارين، أو تجاهل الإرشادات، أو إخفاء معلومات صحية، أو استخدام البرنامج بطريقة غير صحيحة، وذلك في الحدود التي يسمح بها القانون.
                </p>
              </div></div>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                الملكية الفكرية
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  جميع البرامج والخطط والشروحات والمواد المقدمة للعميل مخصصة لاستخدامه الشخصي فقط، وتظل حقوقها مملوكة لكابتن كريم زكريا.
                </p>
                <p>يُمنع دون إذن مسبق:</p>
                <ul className="list-disc list-inside space-y-3 mt-4 marker:text-brand-primary">
                  <li>إعادة بيع البرنامج.</li>
                  <li>نشره أو توزيعه.</li>
                  <li>مشاركته مع شخص آخر.</li>
                  <li>نسخه أو استخدامه لأغراض تجارية.</li>
                </ul>
                <p>
                  ولا يمنح دفع قيمة الاشتراك العميل حق ملكية أو استغلال تجاري للمحتوى.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
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
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                السلوك والتواصل
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-50 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                <p>
                  يجب أن يكون التواصل قائمًا على الاحترام المتبادل.
                </p>
                <p>
                  وفي حالة الإساءة أو التهديد أو التحرش أو التجاوز المتكرر أو أي سلوك يجعل استمرار المتابعة غير ممكن بشكل معقول، يحق لإدارة الخدمة تعليق أو إنهاء المتابعة.
                </p>
                <p>
                  ويتم التعامل مع أي مستحقات مالية مرتبطة بإنهاء الخدمة وفق ظروف الحالة وما تم تقديمه من الخدمة وفي الحدود التي يسمح بها القانون.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
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
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
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
                  يتم نشر أي تحديث على هذه الصفحة، ولا يتم تطبيق أي تعديل جوهري بأثر رجعي على اشتراك تم تأكيده وسداد قيمته بالفعل، إلا إذا كان ذلك مطلوبًا قانونًا أو تم الاتفاق عليه مع العميل.
                </p>
              </div></div>
            </section>

            {/* Final note */}
            <div className="bg-brand-secondary/30 rounded-2xl p-6 md:p-8 border border-brand-primary/20 shadow-sm text-center">
              <h3 className="font-bold text-slate-900 text-[18px] md:text-[20px] mb-3">
                ملاحظة مهمة
              </h3>
              <p className="text-slate-700 text-[15px] md:text-[16px] leading-relaxed md:leading-loose max-w-3xl mx-auto">
                هدف البرنامج هو مساعدتك على تحسين التدريب، التغذية، والعادات الصحية بطريقة مناسبة لهدفك وأسلوب حياتك لكن النتائج تختلف من شخص لآخر، ولا يمكن اعتبار البرنامج بديلًا عن الاستشارة أو التشخيص أو العلاج الطبي.
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
