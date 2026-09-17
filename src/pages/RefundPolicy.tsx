import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingWhatsApp } from '../components/ui/FloatingWhatsApp';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function RefundPolicy() {
  const { isRTL } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-brand-text font-sans selection:bg-brand-primary selection:text-white pb-0 relative w-full flex flex-col">
      <SEO 
        title="سياسة الاسترجاع واسترداد الأموال | كابتن كريم زكريا" 
        description="تعرف على الشروط والضوابط المنظمة لعمليات الاسترجاع واسترداد الأموال للخدمات التدريبية."
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
            سياسة الاسترجاع واسترداد الأموال
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
                تحدد هذه السياسة الشروط المالية الدقيقة المنظمة لعمليات الإلغاء والاسترجاع.
              </p>
              <p className="text-slate-600 text-[14px] md:text-[16px] leading-relaxed">
                تمت صياغة هذه السياسة بما يتماشى مع الأنظمة المصرفية وطبيعة الخدمات الاستشارية والمنتجات الرقمية المخصصة.
              </p>
            </div>

            {/* Section 1 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                طبيعة المنتجات الرقمية المصممة خصيصًا
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
                    <li>تندرج خدماتنا ضمن قطاع الخدمات الاستشارية والمنتجات الرقمية المعدة خصيصًا بناءً على طلب وقياسات العميل الفردية (Custom Digital Services).</li>
                    <li>بمجرد إعداد وإرسال البرنامج التدريبي أو الغذائي، يُعد المنتج قد تم تسليمه واستهلاكه بالكامل ولا يمكن استرجاعه أو إعادة بيعه لعميل آخر.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                شروط وأهلية استرداد الأموال
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
                    <li><strong className="font-semibold text-slate-900">استرداد كامل بنسبة 100%:</strong> يحق للمشترك طلب استرداد المبلغ بالكامل إذا قُدم الطلب خلال مدة لا تتجاوز 48 ساعة من لحظة الدفع، وبشرط عدم البدء في دراسة الاستبيان وتجهيز البرنامج من قِبل الفريق الفني.</li>
                    <li><strong className="font-semibold text-slate-900">استرداد جزئي بنسبة 80%:</strong> إذا قُدم طلب الإلغاء خلال فترة الـ 48 ساعة الأولى، ولكن بعد البدء الفعلي في مراجعة البيانات وتجهيز البرنامج، يتم خصم 20% فقط لتغطية رسوم بوابات الدفع الإلكتروني والمصاريف الإدارية، ورد النسبة المتبقية (80%).</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                الحالات غير القابلة للاسترداد نهائيًا (Non-Refundable)
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
                    <li><strong className="font-semibold text-slate-900">بعد استلام البرنامج:</strong> بمجرد إرسال جداول التدريب أو التغذية إلى المشترك عبر واتساب أو البريد الإلكتروني، يسقط الحق في طلب الاسترداد فورًا ونهائيًا، حتى وإن كان ذلك خلال الـ 48 ساعة الأولى من الشراء.</li>
                    <li><strong className="font-semibold text-slate-900">مضي أكثر من 48 ساعة:</strong> بعد مرور 48 ساعة على عملية الدفع يُعد الاشتراك نهائيًا وغير قابل للإلغاء لأي سبب، حتى لو تأخر المشترك في تقديم بيانات الاستبيان، نظرًا لحجز المقعد المخصص له في جدول المتابعة.</li>
                    <li><strong className="font-semibold text-slate-900">الظروف الشخصية بعد التسليم:</strong> حالات السفر، ضغط العمل، الامتحانات، أو انشغال المشترك لا تمنح الحق في استرداد مالي، ويمكن للمشترك الاستفادة حصرًا من ميزة "تجميد الاشتراك" وفق القواعد الموضحة في الشروط والأحكام.</li>
                    <li><strong className="font-semibold text-slate-900">عدم الالتزام بالبرنامج:</strong> لا يُعد تراخي المشترك في تنفيذ التمارين أو عدم تطبيق الوجبات مبررًا لأي مطالبة مالية.</li>
                    <li><strong className="font-semibold text-slate-900">المدد والعروض المجانية:</strong> أي شهور أو مدد إضافية تُمنح مجانًا ضمن العروض الترويجية ليس لها مقابل مالي ولا يُسترد عنها أي مبالغ.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                آلية ومدد رد المبالغ المالية
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
                    <li>التزامًا بالقوانين المصرفية ومكافحة الاحتيال، تتم جميع عمليات الاسترداد حصريًا عبر نفس وسيلة الدفع الأصلية التي استخدمها المشترك (نفس البطاقة الائتمانية، نفس المحفظة الإلكترونية، أو نفس الحساب المحول منه عبر InstaPay). يُحظر تمامًا تسليم المبالغ نقدًا "كاش" أو تحويلها لحساب شخص آخر.</li>
                    <li>تتم مراجعة واعتماد طلب الاسترداد من قِبل الإدارة المالية خلال 24 إلى 48 ساعة عمل.</li>
                    <li>يستغرق وصول المبلغ إلى كشف حسابك البنكي أو محفظتك من 5 إلى 14 يوم عمل، وذلك تبعًا لدورة عمل البنك المصدر لبطاقتك وبوابة الدفع المستخدمة.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                معالجة الخصم المكرر والأخطاء التقنية
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
                    في حال حدوث خطأ تقني أدى إلى سحب مكرر أو زيادة عن قيمة الاشتراك، يُرجى التواصل معنا فورًا عبر واتساب مع إرفاق إشعار السحب، وسيتم رد المبلغ الزائد كاملًا بنسبة 100% دون أي خصم إداري خلال 24 ساعة عمل.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-7 text-slate-900">
                البيانات المطلوبة لتقديم طلب الاسترداد
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
                    <li><strong className="font-semibold text-slate-900">الاسم الكامل:</strong> للمشترك المسجل بالاستمارة.</li>
                    <li><strong className="font-semibold text-slate-900">رقم الهاتف:</strong> المستخدم في عملية الدفع وتطبيق واتساب.</li>
                    <li><strong className="font-semibold text-slate-900">الإثبات:</strong> الرمز المرجعي للمعاملة (Transaction ID) أو لقطة شاشة واضحة لإشعار الدفع البنكي الناجح.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Channels Component */}
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
