import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingWhatsApp } from '../components/ui/FloatingWhatsApp';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function PrivacyPolicy() {
  const { settings } = useSettings();
  return (
    <div className="min-h-screen text-brand-text font-sans selection:bg-brand-primary selection:text-white pb-20 md:pb-0 relative w-full flex flex-col">
      <SEO 
        title="سياسة الخصوصية | كابتن كريم زكريا" 
        description="تعرف على سياسة الخصوصية الخاصة بكابتن كريم زكريا، وكيفية جمع واستخدام وحماية بياناتك الشخصية."
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            سياسة الخصوصية وسرية البيانات
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
                خصوصيتك وثقتك فينا مهمين جدًا.
              </p>
              <p className="text-slate-600 max-w-3xl mx-auto text-[15px] md:text-[17px] leading-relaxed md:leading-loose">
                أي بيانات أو صور أو معلومات بتشاركها معانا بنستخدمها فقط عشان نقدر نقدم لك خدمة تدريب، تغذية، ومتابعة مناسبة ليك، وبنتعامل معاها بسرية واحترام كامل.
              </p>
            </div>
            
            {/* Section 1 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                البيانات التي قد نطلبها
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
                  قد نطلب بعض البيانات التي تقدمها بنفسك، مثل:
                </p>
                <ul className="list-disc list-inside space-y-3 mt-4 marker:text-brand-primary">
                  <li>الاسم ووسائل التواصل.</li>
                  <li>العمر والطول والوزن والقياسات.</li>
                  <li>هدفك ومستوى نشاطك وطبيعة يومك.</li>
                  <li>معلومات عن التدريب والتغذية والنوم والعادات اليومية.</li>
                  <li>أي إصابة أو حالة صحية أو حساسية أو أدوية تفصح عنها.</li>
                  <li>صور المتابعة التي تختار إرسالها.</li>
                </ul>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                استخدام البيانات
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
                  تُستخدم البيانات من أجل:
                </p>
                <ul className="list-disc list-inside space-y-3 mt-4 marker:text-brand-primary">
                  <li>إعداد البرنامج ومتابعة تقدمك.</li>
                  <li>تعديل البرنامج وفق البيانات التي ترسلها.</li>
                  <li>التواصل معك بشأن الاشتراك والمتابعة.</li>
                  <li>إدارة سجلات الخدمة وتحسين جودتها.</li>
                </ul>
                <p>
                  لا يتم بيع بياناتك أو إتاحتها لأشخاص غير مخولين بالاطلاع عليها.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                البيانات الصحية
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
                  قد نحتاج إلى بعض المعلومات الصحية المرتبطة بسلامة التدريب أو التغذية.
                </p>
                <p>
                  يتم استخدام هذه المعلومات فقط لأغراض إعداد ومتابعة البرنامج، ولا تعتبر الخدمة تشخيصًا أو علاجًا طبيًا.
                </p>
                <p>
                  ويتحمل العميل مسؤولية صحة البيانات التي يقدمها والإفصاح عن أي حالة أو دواء أو إصابة قد تؤثر على البرنامج.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                صور المتابعة
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
                  تخضع صور المتابعة للقواعد التالية:
                </p>
                <ul className="list-disc list-inside space-y-3 mt-4 marker:text-brand-primary">
                  <li>إرسال صور المتابعة <strong>اختياري بالكامل</strong>.</li>
                  <li>يمكنك الاكتفاء بالوزن والقياسات والملاحظات، وعدم إرسال الصور لا يمنعك من الحصول على المتابعة وفق نظام باقتك.</li>
                  <li>لا يتم نشر صورك أو نتائجك أو محادثاتك لأغراض تسويقية إلا بعد الحصول على موافقتك الصريحة.</li>
                  <li>في حالة الموافقة على النشر، يتم استخدام المحتوى في النطاق المتفق عليه، مع إخفاء الوجه أو البيانات الشخصية.</li>
                </ul>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                حماية البيانات
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
                  يتم اتخاذ إجراءات مناسبة ومعقولة لحماية البيانات من الوصول أو الاستخدام أو الإفصاح غير المصرح به.
                </p>
                <p>
                  ويقتصر الاطلاع عليها على الأشخاص الذين يحتاجون إليها لتقديم أو إدارة الخدمة.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                المدفوعات
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
                  طرق الدفع المتاحة يتم توضيحها للعميل قبل إتمام الاشتراك.
                </p>
                <p>
                  تتم عمليات الدفع من خلال مزود دفع إلكتروني خارجي، ولا يقوم الموقع بطلب أو تخزين بيانات البطاقات البنكية أو الحسابات المالية الحساسة.
                </p>
                <p>
                  وتخضع معالجة بيانات الدفع لأنظمة وسياسات الأمان والخصوصية الخاصة بمزود الدفع.
                </p>
              </div></div>
            </section>

            {/* Section 6 */}
            

            {/* Section 7 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                الكوكيز والتحليلات
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
                  الموقع ممكن يستخدم ملفات تعريف الارتباط وأدوات تحليل وإعلانات زي Google Analytics أو Meta Pixel بهدف تحسين تجربة الموقع وقياس أداء الحملات.
                </p>
                <p>
                  البيانات دي ممكن تشمل نوع الجهاز، نوع المتصفح، الصفحات اللي زرتها، ومدة بقائك داخل الموقع.
                </p>
                <p>
                  البيانات دي لا تُستخدم للتعرف عليك داخل برنامج المتابعة الشخصي.
                </p>
              </div></div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                حقوقك
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
                  تقدر تتواصل معانا في أي وقت لو حبيت:
                </p>
                <ul className="list-disc list-inside space-y-3 mt-4 marker:text-brand-primary">
                  <li>تعرف البيانات اللي محتفظين بيها عنك.</li>
                  <li>تعدّل أو تصحح بياناتك.</li>
                  <li>تطلب حذف بياناتك الشخصية لما ميبقاش وجودها ضروري لتقديم الخدمة.</li>
                  <li>تسحب موافقتك على استخدام صور أو نتائج قبل نشرها.</li>
                  <li>تسأل عن طريقة استخدام أو حماية بياناتك.</li>
                </ul>
              </div></div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                الاحتفاظ بالبيانات
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
                  يتم الاحتفاظ ببيانات وسجل المتابعة طوال مدة الاشتراك، وقد يتم الاحتفاظ بها بعد انتهاء الاشتراك للمدة اللازمة لتسهيل عودة العميل للمتابعة أو للوفاء بأي التزامات مرتبطة بالخدمة.
                </p>
                <p>
                  ولا يتم الاحتفاظ بالبيانات لمدة أطول من اللازم للغرض الذي جُمعت من أجله، ما لم يوجد سبب قانوني يقتضي الاحتفاظ بها لمدة أطول.
                </p>
              </div></div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold mb-3 flex items-start gap-3 text-slate-900">
                تحديث سياسة الخصوصية
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
                  ممكن نحدّث سياسة الخصوصية من وقت للتاني حسب تطوير الخدمة أو المتطلبات المتعلقة بها.
                </p>
                <p>
                  أي تحديث يتم نشره على نفس الصفحة، ولا يتم تطبيق أي تعديل جوهري بأثر رجعي على حقوق العميل السابقة إلا وفقًا للقانون.
                </p>
              </div></div>
            </section>

            {/* Disclaimer */}
            <section>
              <div className="bg-brand-secondary/30 rounded-2xl p-5 md:p-6 border border-brand-primary/20 shadow-sm space-y-4 text-[15px] md:text-base text-slate-700 leading-relaxed md:leading-loose text-start">
                <p className="font-medium text-slate-900">
                  تنبيه مهم:
                </p>
                <p>
                  برامج التدريب والتغذية لا تُعد تشخيصًا أو علاجًا طبيًا، ولا تغني عن استشارة الطبيب أو المختص.
                </p>
                <p>
                  لو عندك إصابة، سكر، ضغط، مشاكل قلب، مشاكل كلى، حمل، حساسية، أو بتستخدم أدوية، لازم ترجع لطبيب أو مختص قبل بدء أي برنامج تدريبي أو غذائي.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="mt-6">
              <div className="bg-gradient-to-br from-slate-900/90 to-brand-primary/80 backdrop-blur-xl border border-white/20 text-white rounded-xl p-5 md:p-6 shadow-xl text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-primary/30 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
                
                <h3 className="text-lg font-bold mb-2 relative z-10">
                  للتواصل والاستفسارات
                </h3>
                <p className="text-slate-200 mb-4 text-sm relative z-10 leading-relaxed md:leading-loose">
                  لو عندك أي استفسار يتعلق بسياسة الخصوصية أو بطريقة التعامل مع بياناتك الشخصية،<br />تقدر تتواصل معانا في أي وقت عبر الواتساب.
                </p>
                <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366]/90 hover:bg-[#25D366] text-white backdrop-blur-md border border-white/20 transition-all px-6 py-2.5 rounded-lg font-medium tracking-wide text-sm relative z-10 shadow-sm hover:scale-105">
                  تواصل معنا عبر الواتساب
                </a>
              </div>
            </section>

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
