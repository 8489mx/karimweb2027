import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingWhatsApp } from '../components/ui/FloatingWhatsApp';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function PrivacyPolicy() {
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
      <main className="flex-1 relative z-10 pt-32 pb-24 container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="mb-6 flex justify-start">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/80 border border-white shadow-sm rounded-full transition-all text-slate-800 font-medium group text-sm">
            <ArrowRight size={16} className="group-hover:-translate-x-1 transition-transform" />
            العودة للصفحة الرئيسية
          </Link>
        </div>
        
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-xl md:text-3xl font-bold mb-4 tracking-tight text-slate-900">
            سياسة الخصوصية وسرية البيانات
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-[17px] md:text-xl leading-relaxed md:leading-loose">
            <>خصوصيتك وثقتك فينا مهمين جدًا.<br />أي بيانات أو صور أو معلومات بتشاركها معانا بنستخدمها فقط عشان نقدر نقدم لك خدمة تدريب، تغذية، ومتابعة مناسبة ليك، وبنتعامل معاها بسرية واحترام كامل.</>
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
                البيانات اللي ممكن نطلبها منك
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
                  عشان نقدر نفهم هدفك ونصمم لك برنامج مناسب، ممكن نطلب بعض البيانات اللي بتقدمها بنفسك، زي:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>الاسم ووسائل التواصل.</li>
                  <li>العمر، الطول، الوزن، والقياسات.</li>
                  <li>هدفك من البرنامج.</li>
                  <li>مستوى نشاطك وطبيعة يومك وأسلوب حياتك.</li>
                  <li>معلومات عن أكلك، تمرينك، نومك، وعاداتك اليومية.</li>
                  <li>أي إصابة، حالة صحية، أو أدوية تختار إنك تشاركها معانا.</li>
                  <li>صور المتابعة أو صور التحول لو حبيت تبعتها بنفسك.</li>
                </ul>
              </div></div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                بنستخدم بياناتك إزاي؟
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
                  بنستخدم البيانات دي عشان:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2 mb-4">
                  <li>نصمم لك برنامج تدريب وتغذية مناسب لهدفك وجسمك.</li>
                  <li>نتابع تقدمك ونعدّل خطتك حسب احتياجك.</li>
                  <li>نتواصل معاك بخصوص الاشتراك أو المتابعة.</li>
                  <li>نحسن جودة الخدمة وتجربة المتابعة.</li>
                </ul>
                <p>
                  بياناتك مش للبيع، ومش بنشاركها مع أي جهة غير مخوّلة.
                </p>
                <p>
                  وكمان صورك، قياساتك، محادثاتك، أو أي تفاصيل خاصة بيك مش بتُستخدم في أي محتوى تسويقي إلا بعد موافقتك الصريحة.
                </p>
              </div></div>
            </section>

            {/* Section 3 (خصوصية المشتركات) */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                خصوصية المشتركات
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
                  إرسال صور المتابعة للمشتركات اختياري بالكامل.
                </p>
                <p>
                  تقدري تكتفي بإرسال القياسات والملاحظات فقط، من غير أي إلزام بإرسال صور.
                </p>
                <p>
                  عدم إرسال الصور لا يقلل من جودة المتابعة، وبيتم التعامل مع أي بيانات أو صور يتم إرسالها بسرية تامة.
                </p>
              </div></div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                حماية بياناتك
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
                  بنحرص على حماية بياناتك قدر الإمكان من أي وصول أو استخدام غير مصرح به.
                </p>
                <p>
                  سجلات المتابعة والمحادثات بيتم الاحتفاظ بها فقط عشان:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2 mb-4">
                  <li>نتابع تقدمك بدقة.</li>
                  <li>نقدر نرجع لتاريخك لو حبيت ترجع تتمرن معانا بعد فترة.</li>
                  <li>نحسن جودة المتابعة والخدمة.</li>
                </ul>
                <p>
                  ولا يتم إتاحة بياناتك لأي شخص غير مخوّل بالاطلاع عليها.
                </p>
              </div></div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
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
                  طرق الدفع المتاحة بيتم توضيحها للعميل قبل الاشتراك.
                </p>
                <p>
                  الموقع لا يطلب ولا يخزن بيانات بطاقات بنكية أو حسابات مالية حساسة.
                </p>
                <p>
                  ولو تم استخدام مزود دفع خارجي مستقبلًا، فبيتم الدفع من خلاله وفقًا لسياساته ومعايير الأمان الخاصة به.
                </p>
              </div></div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                مشاركة صور ونتائج التحول
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
                  بنفتخر بنتائج عملائنا، لكن خصوصيتك دايمًا أهم.
                </p>
                <p>
                  مش هننشر أي صور قبل وبعد، نتائج، لقطات شاشة، أو أجزاء من المحادثات على الموقع أو السوشيال ميديا إلا بعد موافقتك الصريحة.
                </p>
                <p>
                  ولو وافقت على النشر، بنخفي ملامح الوجه أو أي بيانات شخصية ظاهرة، إلا لو طلبت غير كده بنفسك.
                </p>
                <p className="font-medium text-slate-900">
                  ومن حقك ترفض النشر أو تطلب عدم استخدام صورك أو نتائجك، وده مش هيأثر على جودة المتابعة أو مستوى الخدمة.
                </p>
              </div></div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
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
                <p>
                  تقدر تقبل أو ترفض الكوكيز غير الضرورية، وتقدر تعدّل اختيارك من إعدادات الكوكيز في أي وقت.
                </p>
              </div></div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
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
                <ul className="list-disc list-inside space-y-2 mt-2">
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
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
                مدة الاحتفاظ بالبيانات
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
                  ممكن نحتفظ بسجل متابعتك بعد انتهاء الاشتراك عشان لو حبيت ترجع تتمرن معانا مستقبلًا، نقدر نكمل من تاريخك السابق بدل ما نبدأ من الصفر.
                </p>
                <p>
                  بياناتك تفضل محفوظة بسرية، ولا تُستخدم إلا لتقديم الخدمة أو تحسينها.
                </p>
                <p>
                  وتقدر تطلب حذف بياناتك الشخصية لما ميبقاش الاحتفاظ بها ضروري.
                </p>
              </div></div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-start gap-3 text-slate-900">
                <span className="flex items-center justify-center w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-3"></span>
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
                  ممكن نحدّث سياسة الخصوصية من وقت للتاني حسب تطوير الخدمة أو تحسينها.
                </p>
                <p>
                  أي تحديث هيتم نشره على نفس الصفحة، واستمرار استخدامك للموقع أو الخدمة بعد التحديث يعني موافقتك على النسخة الجديدة.
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
                <p className="text-slate-200 mb-4 text-sm relative z-10">
                  لو عندك أي استفسار يتعلق بسياسة الخصوصية أو بطريقة التعامل مع بياناتك الشخصية،<br />تقدر تتواصل معانا في أي وقت عبر الواتساب.
                </p>
                <a href="https://wa.me/201001060503" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366]/90 hover:bg-[#25D366] text-white backdrop-blur-md border border-white/20 transition-all px-6 py-2.5 rounded-lg font-medium tracking-wide text-sm relative z-10 shadow-sm hover:scale-105">
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
