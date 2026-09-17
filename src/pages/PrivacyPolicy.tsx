import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingWhatsApp } from '../components/ui/FloatingWhatsApp';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function PrivacyPolicy() {
  const { isRTL } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-brand-text font-sans selection:bg-brand-primary selection:text-white pb-0 relative w-full flex flex-col">
      <SEO 
        title="سياسة الخصوصية وسرية البيانات | كابتن كريم زكريا" 
        description="تعرف على سياسة الخصوصية وسرية البيانات الخاصة بكابتن كريم زكريا، وكيفية جمع واستخدام وحماية بياناتك الشخصية والصحية."
      />

      {/* Subtle Radial Gradient Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, rgba(88, 180, 229, 0.15) 100%)",
        }}
      />

      <Header />

      <main className="flex-1 relative z-10 pt-24 md:pt-32 pb-20 md:pb-24 container mx-auto px-4 md:px-8 max-w-5xl">
        {/* Back Button */}
        <div className="mb-6 md:mb-8 flex justify-start">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white border border-white/80 shadow-2xs hover:shadow-xs rounded-full transition-all text-slate-700 hover:text-slate-900 font-medium text-sm group"
          >
            {isRTL ? (
              <ArrowRight size={16} className="group-hover:-translate-x-1 transition-transform text-slate-400 group-hover:text-slate-600" />
            ) : (
              <ArrowLeft size={16} className="group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-slate-600" />
            )}
            العودة للصفحة الرئيسية
          </Link>
        </div>
        
        {/* Page Title */}
        <div className="mb-10 md:mb-12 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            سياسة الخصوصية وسرية البيانات
          </h1>
        </div>

        {/* Main Content Container */}
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/90 rounded-3xl p-6 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-primary/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-slate-900/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 space-y-10 md:space-y-14">
            
            {/* Intro Lead */}
            <div className="bg-gradient-to-br from-brand-primary/10 to-transparent border-r-4 border-brand-primary rounded-l-[16px] p-5 md:p-6 mb-10 md:mb-12 text-right space-y-3 md:space-y-4">
              <p className="text-[16px] md:text-[18px] font-bold text-slate-900 leading-snug">
                خصوصيتك وسرية بياناتك التزام مهني وقانوني أساسي لدينا.
              </p>
              <p className="text-slate-600 text-[14px] md:text-[16px] leading-relaxed">
                تهدف هذه السياسة إلى توضيح نوعية البيانات التي نجمعها، وكيفية استخدامها، والضمانات المتبعة لحمايتها عند استخدامك لخدماتنا وموقعنا الإلكتروني.
              </p>
            </div>
            
            {/* Section 1 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                البيانات التي نقوم بجمعها
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-8 border border-slate-100 shadow-2xs hover:shadow-xs transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed text-right">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-40 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                  <ul className="list-disc list-outside pr-5 space-y-3 marker:text-brand-primary">
                    <li><strong className="font-semibold text-slate-900">البيانات الشخصية وبيانات التواصل:</strong> تشمل الاسم الكامل، رقم الهاتف المسجل به تطبيق واتساب، والبريد الإلكتروني لإنشاء الملف التدريبي والتواصل الفني والإداري معك.</li>
                    <li><strong className="font-semibold text-slate-900">القياسات والبيانات البدنية:</strong> تشمل العمر، الطول، الوزن، القياسات بالمتر، مستوى النشاط اليومي، طبيعة العمل، ونمط التغذية والنوم، وذلك لحساب السعرات ومعدلات الأيض بدقة.</li>
                    <li><strong className="font-semibold text-slate-900">البيانات الصحية والبدنية العامة:</strong> تشمل التاريخ الرياضي، الإصابات السابقة، الحساسيات الغذائية، وأي أدوية أو عوارض صحية يُفصح عنها المشترك لضمان تصميم برنامج آمن ومناسب لحالته.</li>
                    <li><strong className="font-semibold text-slate-900">صور المتابعة (اختيارية بالكامل):</strong> صور دورية للمقارنة البدنية وفق رغبة المشترك فقط.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                أوجه استخدام البيانات
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-8 border border-slate-100 shadow-2xs hover:shadow-xs transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed text-right">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-40 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                  <ul className="list-disc list-outside pr-5 space-y-3 marker:text-brand-primary">
                    <li>إعداد الجداول الرياضية والخطط الغذائية المخصصة وتحديثها دوريًا بناءً على استجابتك.</li>
                    <li>الرد على الاستفسارات الفنية والمتابعة المستمرة عبر قنوات التواصل المعتمدة.</li>
                    <li>إدارة السجلات الرقمية وضمان استمرارية الخدمة.</li>
                  </ul>
                  <p className="font-semibold text-slate-900 pt-3 mt-3 border-t border-slate-100">
                    تعهد بعدم المشاركة: نؤكد بشكل قاطع أننا لا نبيع، ولا نؤجر، ولا نشارك أي بيانات شخصية أو صحية أو صور مع أي أطراف تجارية أو إعلانية أو جهات خارجية إطلاقًا.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                ضوابط وسرية صور التطور البدني
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-8 border border-slate-100 shadow-2xs hover:shadow-xs transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed text-right">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-40 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                  <ul className="list-disc list-outside pr-5 space-y-3 marker:text-brand-primary">
                    <li>إرسال الصور اختياري بنسبة 100%، ولا يترتب على عدم إرسالها أي تأثير على جودة واهتمام المتابعة.</li>
                    <li>يُحظر تمامًا نشر أي صورة، أو نتيجة تدريبية، أو محادثة خاصة عبر منصات التواصل الاجتماعي أو المنصات الإعلانية إلا بموافقة كتابية مسبقة وصريحة من المشترك.</li>
                    <li>في حال موافقة المشترك على عرض قصة نجاحه، نلتزم التزامًا تامًا بطمس الوجه، والملامح، والوشوم، وأي علامات تعريفية بالكامل لضمان سرية الهوية.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                أمان المدفوعات والعمليات المالية
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-8 border border-slate-100 shadow-2xs hover:shadow-xs transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed text-right">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-40 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                  <ul className="list-disc list-outside pr-5 space-y-3 marker:text-brand-primary">
                    <li>تتم كافة عمليات السداد عبر بوابات دفع إلكترونية مرخصة ومعتمدة ومشفرة بأعلى المعايير العالمية (PCI-DSS).</li>
                    <li>لا يقوم الموقع بتسجيل، أو حفظ، أو الاطلاع على بيانات البطاقات الائتمانية أو كلمات المرور المصرفية الخاصة بك إطلاقًا.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                ملفات تعريف الارتباط وأدوات التحليل (Cookies)
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-8 border border-slate-100 shadow-2xs hover:shadow-xs transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed text-right">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-40 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                  <p>
                    قد يستخدم الموقع ملفات تعريف ارتباط مجهولة الهوية وأدوات تحليلية (مثل Google Analytics) لتحسين سرعة التصفح وتطوير تجربة المستخدم فقط، دون ربط هذه الإحصاءات الفنية بملفك التدريبي أو هويتك الشخصية.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                حقوقك في إدارة بياناتك والاحتفاظ بها
              </h2>
              <div className="bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-8 border border-slate-100 shadow-2xs hover:shadow-xs transition-all duration-300 relative group text-[15px] md:text-base text-slate-700 leading-relaxed text-right">
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-40 group-hover:opacity-100 z-0"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)',
                    maskImage: 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                  }}
                />
                <div className="relative z-10 space-y-4">
                  <ul className="list-disc list-outside pr-5 space-y-3 marker:text-brand-primary">
                    <li>يحق لك طلب الاطلاع على ملخص بياناتك، أو تحديثها، أو تصحيحها في أي وقت.</li>
                    <li>يحق لك طلب حذف بياناتك وسجلاتك التدريبية نهائيًا بعد انتهاء مدة الاشتراك.</li>
                    <li>لا نحتفظ بأي بيانات لفترة أطول من اللازم لتحقيق الأغراض التدريبية التي جُمعت من أجلها.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Information & Channels */}
            <section>
              
            </section>

          </div>
        </div>
        
        {/* Bottom Home Link */}
        <div className="mt-10 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 hover:bg-white border border-white shadow-2xs hover:shadow-xs rounded-full transition-all text-slate-800 font-semibold text-sm group"
          >
            العودة للصفحة الرئيسية
            {isRTL ? (
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-slate-500" />
            ) : (
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-slate-500" />
            )}
          </Link>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
