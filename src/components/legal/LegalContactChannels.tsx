import React from 'react';
import { Phone, Mail, MapPin, ArrowUpLeft } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

interface LegalContactChannelsProps {
  title?: string;
  whatsappMessage?: string;
}

export function LegalContactChannels({
  title = "للتواصل والاستفسارات",
  whatsappMessage = "مرحباً كابتن كريم، لدي استفسار بخصوص البرامج وسياسات الاشتراك."
}: LegalContactChannelsProps) {
  const { settings } = useSettings();
  const whatsappNumber = settings?.whatsappNumber || '201001060503';
  const displayWhatsapp = whatsappNumber === '201001060503' ? '+20 100 106 0503' : `+${whatsappNumber}`;

  return (
    <div className="space-y-4 pt-2">
      {/* Modern 3-Column Bento Cards for Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {/* WhatsApp Card */}
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-white rounded-[16px] md:rounded-[20px] p-4 border border-slate-100 shadow-2xs hover:shadow-xs transition-all duration-300 relative group overflow-hidden flex items-center gap-3 text-start"
        >
          <div 
            className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-40 group-hover:opacity-100 z-0"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 120px)',
              maskImage: 'radial-gradient(circle at top right, black 0%, transparent 120px)'
            }}
          />
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-slate-200/80 transition-all relative z-10">
            <Phone size={18} />
          </div>
          <div className="min-w-0 flex-1 relative z-10">
            <div className="text-[11px] font-semibold text-slate-400 mb-0.5">
              واتساب
            </div>
            <div className="text-xs sm:text-[13px] font-bold text-slate-900 font-en whitespace-nowrap text-right" dir="ltr">
              {displayWhatsapp}
            </div>
          </div>
          <ArrowUpLeft size={16} className="text-slate-300 group-hover:text-slate-600 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 relative z-10" />
        </a>

        {/* Email Card */}
        <a 
          href="mailto:info@karimzakaria.com" 
          className="bg-white rounded-[16px] md:rounded-[20px] p-4 border border-slate-100 shadow-2xs hover:shadow-xs transition-all duration-300 relative group overflow-hidden flex items-center gap-3 text-start"
        >
          <div 
            className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-40 group-hover:opacity-100 z-0"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 120px)',
              maskImage: 'radial-gradient(circle at top right, black 0%, transparent 120px)'
            }}
          />
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-slate-200/80 transition-all relative z-10">
            <Mail size={18} />
          </div>
          <div className="min-w-0 flex-1 relative z-10">
            <div className="text-[11px] font-semibold text-slate-400 mb-0.5">
              البريد الإلكتروني
            </div>
            <div className="text-xs sm:text-[13px] font-bold text-slate-900 font-en whitespace-nowrap truncate text-right" dir="ltr" title="info@karimzakaria.com">
              info@karimzakaria.com
            </div>
          </div>
          <ArrowUpLeft size={16} className="text-slate-300 group-hover:text-slate-600 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 relative z-10" />
        </a>

        {/* Location Card */}
        <div className="bg-white rounded-[16px] md:rounded-[20px] p-4 border border-slate-100 shadow-2xs transition-all duration-300 relative group overflow-hidden flex items-center gap-3 text-start">
          <div 
            className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-40 group-hover:opacity-100 z-0"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 120px)',
              maskImage: 'radial-gradient(circle at top right, black 0%, transparent 120px)'
            }}
          />
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 relative z-10">
            <MapPin size={18} />
          </div>
          <div className="min-w-0 flex-1 relative z-10">
            <div className="text-[11px] font-semibold text-slate-400 mb-0.5">
              المقر الرئيسي
            </div>
            <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug whitespace-normal">
              القاهرة، جمهورية مصر العربية
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-br from-slate-900/95 to-brand-primary/85 backdrop-blur-xl border border-white/20 text-white rounded-2xl p-6 md:p-8 shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-primary/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        
        <h3 className="text-lg md:text-xl font-bold mb-4 relative z-10">
          {title}
        </h3>
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all duration-200 px-6 py-3 rounded-xl font-bold text-sm md:text-base relative z-10 shadow-lg hover:shadow-xl active:scale-95"
        >
          تواصل معنا عبر الواتساب
        </a>
      </div>
    </div>
  );
}
