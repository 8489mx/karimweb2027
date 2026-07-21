import React, { useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../lib/utils';
import { SectionHeading } from '../ui/SectionHeading';
import { motion } from 'framer-motion';

function useAutoScrollMarquee(speed: number = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  React.useEffect(() => {
    let animationFrameId: number;
    let isHovered = false;

    const handleMouseEnter = () => isHovered = true;
    const handleMouseLeave = () => {
      isHovered = false;
      if (dragState.current.isDragging) {
        dragState.current.isDragging = false;
        setIsDragging(false);
      }
    };

    const container = ref.current;
    if (container) {
       container.addEventListener('mouseenter', handleMouseEnter);
       container.addEventListener('mouseleave', handleMouseLeave);
       container.addEventListener('touchstart', () => { isHovered = true; }, { passive: true });
       container.addEventListener('touchend', () => { 
         isHovered = false;
         if (dragState.current.isDragging) {
           dragState.current.isDragging = false;
           setIsDragging(false);
         }
       }, { passive: true });
    }

    const scroll = () => {
      if (ref.current) {
        if (!dragState.current.isDragging && !isHovered) {
          ref.current.scrollLeft += speed;
        }
        
        // Loop seamlessly for both auto-scroll and manual drag
        if (ref.current.scrollLeft >= ref.current.scrollWidth / 2) {
           ref.current.scrollLeft -= ref.current.scrollWidth / 2;
        } else if (ref.current.scrollLeft <= 0) {
           ref.current.scrollLeft += ref.current.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
         container.removeEventListener('mouseenter', handleMouseEnter);
         container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [speed]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    dragState.current.isDragging = true;
    setIsDragging(true);
    dragState.current.startX = e.pageX - ref.current.offsetLeft;
    dragState.current.scrollLeft = ref.current.scrollLeft;
    e.preventDefault();
  };

  const onMouseUp = () => {
    dragState.current.isDragging = false;
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - dragState.current.startX) * 2; 
    let newScrollLeft = dragState.current.scrollLeft - walk;

    const halfWidth = ref.current.scrollWidth / 2;
    if (newScrollLeft >= halfWidth) {
      newScrollLeft -= halfWidth;
      dragState.current.scrollLeft -= halfWidth;
    } else if (newScrollLeft <= 0) {
      newScrollLeft += halfWidth;
      dragState.current.scrollLeft += halfWidth;
    }
    
    ref.current.scrollLeft = newScrollLeft;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!ref.current) return;
    dragState.current.isDragging = true;
    setIsDragging(true);
    dragState.current.startX = e.touches[0].pageX - ref.current.offsetLeft;
    dragState.current.scrollLeft = ref.current.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragState.current.isDragging || !ref.current) return;
    const x = e.touches[0].pageX - ref.current.offsetLeft;
    const walk = (x - dragState.current.startX) * 2; 
    let newScrollLeft = dragState.current.scrollLeft - walk;

    const halfWidth = ref.current.scrollWidth / 2;
    if (newScrollLeft >= halfWidth) {
      newScrollLeft -= halfWidth;
      dragState.current.scrollLeft -= halfWidth;
    } else if (newScrollLeft <= 0) {
      newScrollLeft += halfWidth;
      dragState.current.scrollLeft += halfWidth;
    }

    ref.current.scrollLeft = newScrollLeft;
  };

  const onTouchEnd = () => {
    dragState.current.isDragging = false;
    setIsDragging(false);
  };

  return {
    ref,
    isDragging,
    events: {
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    }
  };
}

// مصفوفة صور الشات (روابط خارجية من ImgBB)
// يرجى وضع روابط الصور المباشرة هنا
const whatsappScreenshots = [
  "https://i.ibb.co/pvVGJj4x/2.jpg",
  "https://i.ibb.co/DgT1PGCH/4.jpg",
  "https://i.ibb.co/Xfdg3nbY/05.jpg",
  "https://i.ibb.co/xqsW9TsM/5.jpg",
  "https://i.ibb.co/RGKZYr5j/6.jpg",
  "https://i.ibb.co/LdLtPxN2/7.jpg",
  "https://i.ibb.co/PzxknxCn/8.jpg",
  "https://i.ibb.co/BxSbXKF/9.jpg",
  "https://i.ibb.co/cStv1Rw6/10.jpg",
  "https://i.ibb.co/MD6C8jvD/11.jpg",
  "https://i.ibb.co/HLxn4hwk/12.jpg",
  "https://i.ibb.co/ycBgJjCS/13.jpg",
  "https://i.ibb.co/fdyPM9s7/14.jpg",
  "https://i.ibb.co/s947tRST/15.jpg",
  "https://i.ibb.co/bRFGcpc5/16.jpg",
  "https://i.ibb.co/4wSh2pvR/17.jpg",
  "https://i.ibb.co/gFwy8C7G/18.jpg",
  "https://i.ibb.co/Q3FXQ3wg/20.jpg"
];

// بيانات التحولات (صور قبل وبعد من روابط خارجية من ImgBB)
const transformations = [
  {
    id: 1,
    name: 'Ahmed Mahmoud',
    nameAr: 'أحمد محمود',
    result: 'Lost 15KG Fat',
    resultAr: 'خسارة 15 كجم دهون صافية',
    duration: 'In 3 Months',
    durationAr: 'في 3 أشهـر',
    quote: 'Captain Karim changed my concept of dieting. I reached this result without feeling deprived.',
    quoteAr: 'كابتن كريم غير مفهومي عن الدايت، وصلت للنتيجة دي من غير ما أحس بأي حرمان أو تعب في يومي.',
    beforeImage: "https://i.ibb.co/RGHBt1DR/before-after-1.jpg",
    afterImage: "https://i.ibb.co/dsz5rD8Z/before-after-2.jpg"
  },
  {
    id: 2,
    name: 'Tarek Ziad',
    nameAr: 'طارق زياد',
    result: 'Shredding (5% Fat)',
    resultAr: 'تنشيف للبطولات (5% دهون)',
    duration: 'In 2 Months',
    durationAr: 'في شهرين',
    quote: 'The accuracy of macros and calories helped me reach the shape of my life.',
    quoteAr: 'دقة حاسبة السعرات والماكروز اللي كابتن كريم بيعملها خلتني أوصل لفورمة عمري ما تخيلت أوصلها.',
    beforeImage: "https://i.ibb.co/rf2npW6z/before-after-3.jpg",
    afterImage: "https://i.ibb.co/PsHzWzwk/before-after-4.jpg"
  },
  {
    id: 3,
    name: 'Omar Farouk',
    nameAr: 'عمر فاروق',
    result: 'Lost 20KG',
    resultAr: 'خسارة 20 كجم',
    duration: 'In 5 Months',
    durationAr: 'في 5 أشهـر',
    quote: 'Changed my whole lifestyle. Fitness is no longer a burden thanks to right guidance.',
    quoteAr: 'غيرت أسلوب حياتي بالكامل، الفتنس مابقاش عبء، بقى جزء من يومي بفضل التوجيه الصح.',
    beforeImage: "https://i.ibb.co/8gxj26P8/before-after-5.jpg",
    afterImage: "https://i.ibb.co/bMGX2vZ4/before-after-6.jpg"
  },
  {
    id: 4,
    name: 'Mohamed Ali',
    nameAr: 'محمد علي',
    result: 'Gained Muscle Mass',
    resultAr: 'زيادة كتلة عضلية',
    duration: 'In 4 Months',
    durationAr: 'في 4 أشهـر',
    quote: 'The personalized program helped me break my plateau and see real muscle growth.',
    quoteAr: 'البرنامج المخصص ساعدني أكسر ثبات الوزن وأشوف زيادة حقيقية في العضلات.',
    beforeImage: "https://i.ibb.co/WWp9y0rm/before-after-7.jpg",
    afterImage: "https://i.ibb.co/XZ7qr3Bk/before-after-8.jpg"
  },
  {
    id: 5,
    name: 'Client',
    nameAr: 'عميل',
    result: 'Great Transformation',
    resultAr: 'تغيير ممتاز',
    duration: 'In 3 Months',
    durationAr: 'في 3 أشهـر',
    quote: 'A great transformation with proper guidance and commitment.',
    quoteAr: 'نتيجة ممتازة من الالتزام والمتابعة المستمرة.',
    beforeImage: "https://i.ibb.co/wNWppYgg/before-after-9.jpg",
    afterImage: "https://i.ibb.co/0RnJyWn3/before-after-10.jpg"
  },
  {
    id: 6,
    name: 'Client',
    nameAr: 'عميل',
    result: 'Great Transformation',
    resultAr: 'تغيير ممتاز',
    duration: 'In 3 Months',
    durationAr: 'في 3 أشهـر',
    quote: 'A great transformation with proper guidance and commitment.',
    quoteAr: 'نتيجة ممتازة من الالتزام والمتابعة المستمرة.',
    beforeImage: "https://i.ibb.co/gL2PbY0d/before-after-11.jpg",
    afterImage: "https://i.ibb.co/zVvsSh0R/before-after-12.jpg"
  },
  {
    id: 7,
    name: 'Client',
    nameAr: 'عميل',
    result: 'Great Transformation',
    resultAr: 'تغيير ممتاز',
    duration: 'In 3 Months',
    durationAr: 'في 3 أشهـر',
    quote: 'A great transformation with proper guidance and commitment.',
    quoteAr: 'نتيجة ممتازة من الالتزام والمتابعة المستمرة.',
    beforeImage: "https://i.ibb.co/Nnk4gHr1/before-after-0013.jpg",
    afterImage: "https://i.ibb.co/VYB7DP95/before-after-013.jpg"
  },
  {
    id: 8,
    name: 'Client',
    nameAr: 'عميل',
    result: 'Great Transformation',
    resultAr: 'تغيير ممتاز',
    duration: 'In 3 Months',
    durationAr: 'في 3 أشهـر',
    quote: 'A great transformation with proper guidance and commitment.',
    quoteAr: 'نتيجة ممتازة من الالتزام والمتابعة المستمرة.',
    beforeImage: "https://i.ibb.co/mdpBG5s/before-after-13.jpg",
    afterImage: "https://i.ibb.co/Hfv97j8n/before-after-14.jpg"
  },
  {
    id: 9,
    name: 'Client',
    nameAr: 'عميل',
    result: 'Great Transformation',
    resultAr: 'تغيير ممتاز',
    duration: 'In 3 Months',
    durationAr: 'في 3 أشهـر',
    quote: 'A great transformation with proper guidance and commitment.',
    quoteAr: 'نتيجة ممتازة من الالتزام والمتابعة المستمرة.',
    beforeImage: "https://i.ibb.co/twQsfcL8/before-after-15.jpg",
    afterImage: "https://i.ibb.co/RpVpxLng/before-after-16.jpg"
  },
  {
    id: 10,
    name: 'Client',
    nameAr: 'عميل',
    result: 'Great Transformation',
    resultAr: 'تغيير ممتاز',
    duration: 'In 3 Months',
    durationAr: 'في 3 أشهـر',
    quote: 'A great transformation with proper guidance and commitment.',
    quoteAr: 'نتيجة ممتازة من الالتزام والمتابعة المستمرة.',
    beforeImage: "https://i.ibb.co/4wwQ6mP5/before-after-17.jpg",
    afterImage: "https://i.ibb.co/MDXKt8xq/before-after-18.jpg"
  },
  {
    id: 11,
    name: 'Client',
    nameAr: 'عميل',
    result: 'Great Transformation',
    resultAr: 'تغيير ممتاز',
    duration: 'In 3 Months',
    durationAr: 'في 3 أشهـر',
    quote: 'A great transformation with proper guidance and commitment.',
    quoteAr: 'نتيجة ممتازة من الالتزام والمتابعة المستمرة.',
    beforeImage: "https://i.ibb.co/rRTyRbMX/before-after-0019.jpg",
    afterImage: "https://i.ibb.co/My73QTR3/before-after-019.jpg"
  },
  {
    id: 12,
    name: 'Client',
    nameAr: 'عميل',
    result: 'Great Transformation',
    resultAr: 'تغيير ممتاز',
    duration: 'In 3 Months',
    durationAr: 'في 3 أشهـر',
    quote: 'A great transformation with proper guidance and commitment.',
    quoteAr: 'نتيجة ممتازة من الالتزام والمتابعة المستمرة.',
    beforeImage: "https://i.ibb.co/QFzkMJbG/before-after-19.jpg",
    afterImage: "https://i.ibb.co/TDBq2M3G/before-after-20.jpg"
  }
];

const TransformationCard: React.FC<{ item: any, t: any, lang: string }> = ({ item, t, lang }) => {
  return (
    <div className="relative w-[320px] sm:w-[380px] md:w-[420px] h-[400px] rounded-2xl overflow-hidden shrink-0 flex group shadow-lg border border-white/10 bg-brand-surface cursor-pointer select-none">
      {/* Left Half: Before (Black and White) */}
      <div className="relative w-1/2 h-full border-r border-white/20 overflow-hidden">
        {/* Logo Overlay */}
        <div className="absolute top-4 left-4 z-30 w-6 sm:w-8 opacity-80 drop-shadow-md">
          <img loading="lazy" referrerPolicy="no-referrer" src="/assets/images/logo/2.png" alt="Logo" width="180" height="45" draggable={false} className="w-full h-auto brightness-0 invert select-none pointer-events-none" />
        </div>
        <img loading="lazy" referrerPolicy="no-referrer"
          src={item.beforeImage} onError={(e) => { e.currentTarget.src = "https://placehold.co/600x800/1e293b/ffffff?text=Not+Found"; }}
          alt={t.results.before}
          width="600"
          height="800"
          draggable={false}
          style={{ 
            objectPosition: item.beforeObjectPosition || item.objectPosition || 'center center',
            transform: item.beforeTransform || item.imageTransform || '',
            objectFit: item.beforeObjectFit || 'cover'
          }}
          className={cn(
            "w-full h-full grayscale opacity-90 transition-transform duration-700 pointer-events-none select-none",
            !(item.beforeTransform || item.imageTransform) && "group-hover:scale-110"
          )}
        />
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-bold border border-white/20 transition-opacity duration-300">
          {t.results.before}
        </div>
      </div>

      {/* Right Half: After (Full Color) */}
      <div className="relative w-1/2 h-full overflow-hidden bg-slate-900/40">
        <img loading="lazy" referrerPolicy="no-referrer"
          src={item.afterImage} onError={(e) => { e.currentTarget.src = "https://placehold.co/600x800/1e293b/ffffff?text=Not+Found"; }}
          alt={t.results.after}
          width="600"
          height="800"
          draggable={false}
          style={{ 
            objectPosition: item.afterObjectPosition || item.objectPosition || 'center center',
            transform: item.afterTransform || item.imageTransform || '',
            objectFit: item.afterObjectFit || 'cover'
          }}
          className={cn(
            "w-full h-full transition-transform duration-700 relative z-10 pointer-events-none select-none",
            !(item.afterTransform || item.imageTransform) && "group-hover:scale-110"
          )}
        />
        
        {/* Gradient shadow for extra depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/80 via-transparent to-transparent z-20 pointer-events-none" />

        <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-bold border border-white/40 shadow-sm transition-opacity duration-300 z-30">
          {t.results.after}
        </div>
      </div>
    </div>
  );
};

export function ClientResults() {
  const { t, lang: language } = useLanguage();
  const drag1 = useAutoScrollMarquee(1);
  const drag2 = useAutoScrollMarquee(-1);

  return (
    <section className="py-12 md:py-20 overflow-hidden bg-transparent text-brand-text relative max-w-[100vw]" id="results">
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      {/* Light effect for Glassmorphism */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 mb-12 text-center relative z-10">
        <SectionHeading className="mb-4 text-slate-900">
          {language === 'ar' ? (
            <>
              <span className="sm:hidden block leading-tight"><span className="text-brand-primary">{t.results.realTransformations}</span><br/>{t.results.calculatedPlan}</span>
              <span className="hidden sm:inline">
                {t.results.title.split(t.results.realTransformations).map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {i < arr.length - 1 && <span className="text-brand-primary" dir="auto">{t.results.realTransformations}</span>}
                    {part}
                  </React.Fragment>
                ))}
              </span>
            </>
          ) : (
            <>
              <span className="sm:hidden block leading-tight">
                <span className="text-brand-primary">Real Transformations</span><br/>from a Calculated Plan
              </span>
              <span className="hidden sm:inline">
                {t.results.title.split('Real Transformations').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {i < arr.length - 1 && <span className="text-brand-primary" dir="auto">Real Transformations</span>}
                    {part}
                  </React.Fragment>
                ))}
              </span>
            </>
          )}
        </SectionHeading>
        {t.results.subtitle && (
          <p 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 bg-clip-text text-transparent bg-[linear-gradient(110deg,var(--color-brand-primary)_48.5%,#fff_50%,var(--color-brand-primary)_51.5%)] bg-[length:250%_auto] animate-shimmer-gold pb-2" 
            style={{ animationDuration: '6s' }}
          >
            {t.results.subtitle}
          </p>
        )}
      </div>

      {/* Draggable Scroll 1 */}
      <div 
        ref={drag1.ref}
        {...drag1.events}
        className={cn(
          "flex w-full overflow-x-auto hide-scrollbar relative z-10 pb-6 cursor-grab active:cursor-grabbing select-none"
        )} 
        dir="ltr"
      >
        <div className={cn("flex w-max px-4 sm:px-6", drag1.isDragging && "pointer-events-none")}>
          <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0">
            {transformations.map((item) => (
              <TransformationCard key={`set1-${item.id}`} item={item} t={t} lang={language} />
            ))}
          </div>
          <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0">
            {transformations.map((item) => (
              <TransformationCard key={`set2-${item.id}`} item={item} t={t} lang={language} />
            ))}
          </div>
        </div>
      </div>

      {/* Draggable Scroll 2 for WhatsApp Screenshots */}
      <div 
        ref={drag2.ref}
        {...drag2.events}
        className={cn(
          "flex w-full overflow-x-auto hide-scrollbar relative z-10 pb-6 cursor-grab active:cursor-grabbing mt-2 select-none"
        )} 
        dir="ltr"
      >
        <div className={cn("flex w-max px-4 sm:px-6", drag2.isDragging && "pointer-events-none")}>
          <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0">
            {whatsappScreenshots.map((item, index) => (
              <div key={`wa1-${index}`} className="relative w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] h-auto aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 bg-slate-900 shadow-xl shrink-0 pointer-events-none">
                <img loading="lazy" referrerPolicy="no-referrer" src={item} alt="WhatsApp Testimonial" onError={(e) => { e.currentTarget.src = "https://placehold.co/1080x1920/1e293b/ffffff?text=Chat+Not+Found"; }} width="1080" height="1920" draggable={false} className="w-full h-full object-contain pointer-events-none select-none" />
              </div>
            ))}
          </div>
          <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0">
            {whatsappScreenshots.map((item, index) => (
              <div key={`wa2-${index}`} className="relative w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] h-auto aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 bg-slate-900 shadow-xl shrink-0 pointer-events-none">
                <img loading="lazy" referrerPolicy="no-referrer" src={item} alt="WhatsApp Testimonial" onError={(e) => { e.currentTarget.src = "https://placehold.co/1080x1920/1e293b/ffffff?text=Chat+Not+Found"; }} width="1080" height="1920" draggable={false} className="w-full h-full object-contain pointer-events-none select-none" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

