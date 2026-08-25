import DOMPurify from "dompurify";
import React, { useState, useEffect } from 'react';
import { Section } from '../ui/Section';
import { SectionHeading } from "../ui/SectionHeading";

import { motion } from 'framer-motion';
import { ShoppingCart, Check, Dumbbell, BookOpen, FileText } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

interface Product {
  id: string;
  type: 'program' | 'book';
  title: string;
  description: string;
  priceUSD: number;
  priceEGP: number;
  originalPriceEGP?: number;
  originalPriceUSD?: number;
  features: string[];
  imageUrl?: string;
  createdAt: string;
}

export function StoreSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();
  const [isEGP, setIsEGP] = useState(false);
  
  useEffect(() => {
    if (settings && Array.isArray(settings.products) && settings.products.length > 0) {
      setProducts(settings.products as any);
    }
    setLoading(false);
  }, [settings.products]);

  const handleBuy = (product: Product) => {
    const price = isEGP ? product.priceEGP : product.priceUSD;
    const curr = isEGP ? 'ج.م' : '$';
    
    const message = `أهلاً كابتن كريم،%0Aأنا مهتم بشراء "${product.title}"%0Aالسعر: ${price} ${curr}%0Aممكن تفاصيل الدفع للنسخة الرقمية؟`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
  };

  if (!settings.enableStore) return null;

  const displayProducts = products.length > 0 ? products : [
    {
      id: 'demo-1',
      type: 'program',
      title: 'برنامج التضخيم الشامل',
      description: 'برنامج تدريبي متكامل لمدة 12 أسبوع مصمم لزيادة الكتلة العضلية بأقصى كفاءة مع خطة تغذية مرنة.',
      priceUSD: 49,
      priceEGP: 1500,
      features: ['جدول تدريبي 5 أيام في الأسبوع', 'فيديوهات توضيحية لكل تمرين', 'خطة تغذية لزيادة الوزن', 'ملف متابعة الأوزان'],
      imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1000',
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo-2',
      type: 'book',
      title: 'دليل الوصفات الصحية',
      description: 'أكثر من 50 وصفة صحية محسوبة السعرات والماكروز لمساعدتك في تحقيق هدفك بدون حرمان.',
      priceUSD: 19,
      priceEGP: 600,
      features: ['50+ وصفة سهلة التحضير', 'حساب السعرات والماكروز لكل وجبة', 'بدائل صحية للحلويات', 'قائمة مشتريات أسبوعية'],
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000',
      createdAt: new Date().toISOString()
    }
  ] as Product[];

  const programs = displayProducts.filter(p => p.type === 'program');
  const books = displayProducts.filter(p => p.type === 'book');

  return (
    <Section id="store" className="bg-transparent relative overflow-hidden py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center mb-12 md:mb-16 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading className="mb-2">
              البرامج الجاهزة
            </SectionHeading>
            <p className="text-base sm:text-[1.1rem] md:text-xl lg:text-2xl text-brand-muted max-w-3xl mx-auto leading-relaxed text-center px-2 font-medium mb-6">
              عزز نتائجك ببرامج تدريبية وملفات متخصصة جاهزة للتحميل الفوري بعد الدفع.
            </p>
          </motion.div>

          {/* Currency Toggle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex items-center justify-center w-full"
          >
            <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm p-1.5 rounded-full flex items-center relative z-20">
              <button
                onClick={() => setIsEGP(false)}
                className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${!isEGP ? 'text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {!isEGP && (
                  <motion.div 
                    layoutId="currency-active"
                    className="absolute inset-0 bg-slate-900 rounded-full shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span dir="ltr">USD</span>
                  <span>دولار أمريكي</span>
                </span>
              </button>

              <button
                onClick={() => setIsEGP(true)}
                className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${isEGP ? 'text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {isEGP && (
                  <motion.div 
                    layoutId="currency-active"
                    className="absolute inset-0 bg-slate-900 rounded-full shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span dir="ltr">EGP</span>
                  <span>جنيه مصري</span>
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} isEGP={isEGP} onBuy={() => handleBuy(product)} index={idx} />
          ))}
        </div>
      </div>
    </Section>
  );
}

const ProductCard: React.FC<{ product: Product; isEGP: boolean; onBuy: () => void; index: number }> = ({ product, isEGP, onBuy, index }) => {
  const isProgram = product.type === 'program';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group relative flex flex-col bg-white rounded-[24px] border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-slate-300/80 transition-all duration-500 overflow-hidden"
    >
      {/* Premium Image Container with Nested Radius */}
      <div className="p-2.5 pb-0">
        <div className="relative h-[220px] w-full rounded-[18px] overflow-hidden bg-slate-50 flex items-center justify-center">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:rotate-1"
            />
          ) : (
            <div className="text-slate-300 group-hover:text-slate-400 group-hover:scale-110 transition-all duration-700">
              {isProgram ? <Dumbbell className="w-16 h-16" /> : <BookOpen className="w-16 h-16" />}
            </div>
          )}
          
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-slate-900 shadow-sm flex items-center gap-1.5 uppercase tracking-widest">
            <FileText className="w-3 h-3 text-brand-primary" />
            <span>PDF</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6">
        <h4 className="text-xl font-black text-slate-900 mb-2 leading-snug group-hover:text-brand-primary transition-colors text-center">
          {product.title}
        </h4>
        <div className="text-sm text-slate-500 mb-4 line-clamp-3 leading-relaxed text-right [&>p]:inline" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description || "") }} />

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Learn More button on the right */}
          <button
            onClick={onBuy}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-primary hover:bg-brand-primary/90 transition-all shadow-sm hover:shadow-md shrink-0"
          >
            إعرف المزيد
          </button>

          {/* Price and Cart button together on the left */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end justify-center h-full">
              {(() => {
                const oldPrice = isEGP ? product.originalPriceEGP : product.originalPriceUSD;
                if (typeof oldPrice === 'number' && oldPrice > (isEGP ? product.priceEGP : product.priceUSD)) {
                  return (
                    <div className="flex items-center gap-1.5 mb-0.5" dir="ltr">
                      <span className="line-through decoration-slate-300/80 text-slate-400 text-[11px] font-bold tracking-tight">
                        {oldPrice} {isEGP ? 'EGP' : 'USD'}
                      </span>
                      <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-sm">عرض</span>
                    </div>
                  );
                }
                return null;
              })()}
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
                  {isEGP ? product.priceEGP : product.priceUSD}
                </span>
                <span className="text-[11px] font-bold text-slate-500">{isEGP ? 'EGP' : 'USD'}</span>
              </div>
            </div>
            
            <button
              onClick={onBuy}
              className="group/btn relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 shadow-sm bg-brand-primary/10 text-brand-primary hover:shadow-xl hover:shadow-brand-primary/20 shrink-0"
              aria-label="إضافة إلى السلة"
            >
              <div className="absolute inset-0 transition-transform duration-500 translate-y-[100%] group-hover/btn:translate-y-0 bg-brand-primary"></div>
              <ShoppingCart className="w-4 h-4 relative z-10 transition-colors duration-500 group-hover/btn:text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
