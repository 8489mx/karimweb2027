import React, { useState, useRef } from 'react';
import { Section } from '../ui/Section';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import { SectionHeading } from '../ui/SectionHeading';
import { Play } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { trackStartNowClick } from '../../utils/tracking';

export function About() {
  const { lang } = useLanguage();
  const { settings } = useSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video URL (configurable via CMS, with fallback to responsive explainer video)
  const videoUrl = settings.cms?.aboutVideoUrl || "";
  const thumbnailUrl = settings.cms?.aboutVideoThumbnail || "/assets/images/about/profile-photo.jpg";

  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const isVimeo = videoUrl.includes('vimeo.com');

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (url.includes('vimeo.com/')) {
      const id = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    return url;
  };

  const handlePlayToggle = () => {
    if (videoUrl && !isYouTube && !isVimeo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <Section id="about" className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      {/* Background Soft Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[300px] bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header (Focused, Direct & Inspiring) */}
        <div className="text-center mb-8 sm:mb-12">
          <SectionHeading className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'ar' ? 'ليه تبدأ معايا' : 'Why Start With Me'}
          </SectionHeading>
          
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-2 font-medium">
            {lang === 'ar' 
              ? 'شوف إزاي بنبني خطتك وبنفصلها عليك بدون حرمان ولا تعقيد.. عشان توصل لهدفك وتقدر إنك تستمر عليه' 
              : 'See how we build and customize your plan without restriction, so you reach your goal and sustain it.'}
          </p>
        </div>

        {/* Masterclass Cinematic Video Container */}
        <div className="relative group mb-10 sm:mb-12">
          
          {/* Subtle Ambient Glow behind player */}
          <div className="absolute -inset-0.5 bg-brand-primary/15 rounded-2xl sm:rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />

          {/* Ambient Ground Reflection (انعكاس أرضي ناعم) */}
          <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-[88%] h-5 sm:h-7 bg-slate-900/15 rounded-[100%] blur-lg sm:blur-xl pointer-events-none -z-10 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Video Frame */}
          <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            
            {/* Top Glass Sheen on Video Frame (تأثير اللمعان الزجاجي) */}
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none z-15" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.07] pointer-events-none z-15" />
            
            {/* Playing State: Embed or Native Video */}
            {isPlaying && videoUrl ? (
              isYouTube || isVimeo ? (
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  title="Captain Karim Zakaria Explainer Video"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                  onEnded={() => setIsPlaying(false)}
                />
              )
            ) : (
              /* Thumbnail / Cover State */
              <div 
                onClick={handlePlayToggle}
                className="relative w-full h-full cursor-pointer select-none group/thumb"
              >
                {/* Background Cover Image */}
                <img
                  src={thumbnailUrl}
                  alt={lang === 'ar' ? "فيديو شرح برنامج كابتن كريم زكريا" : "Captain Karim Zakaria Explainer Video"}
                  width="1280"
                  height="720"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/thumb:scale-105"
                  onError={(e) => {
                    // Fallback to high quality workout background if custom image fails
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1280&auto=format&fit=crop";
                  }}
                />

                {/* Dark Cinematic Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/60 transition-opacity duration-300" />

                {/* Top Specular Glass Sheen Overlay on cover */}
                <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-white/20 via-white/[0.04] to-transparent pointer-events-none z-10" />

                {/* Centered Luxury Play Button matching site button theme */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="relative flex items-center justify-center">
                    {/* Main Button */}
                    <button
                      type="button"
                      aria-label="تشغيل فيديو الشرح"
                      className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white flex items-center justify-center shadow-[0_8px_25px_rgba(88,180,229,0.5)] group-hover/thumb:scale-110 group-hover/thumb:shadow-[0_10px_30px_rgba(88,180,229,0.7)] transition-all duration-300"
                    >
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-[2px] transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button under video */}
        <div className="text-center">
          <Button
            href="/#packages"
            variant="primary"
            size="lg"
            className="rounded-xl px-8 py-3 text-base sm:text-lg font-bold shadow-md hover:shadow-xl transition-all"
            showWhatsAppIcon={false}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
              }
              trackStartNowClick({ cta_location: 'about_video', button_text: 'اختار باقتك وابدأ دلوقتي' });
            }}
          >
            اختار باقتك وابدأ دلوقتي
          </Button>
        </div>

      </div>
    </Section>
  );
}
