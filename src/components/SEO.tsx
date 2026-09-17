import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '../context/SettingsContext';

interface SEOProps {
  title?: string;
  description?: string;
  noindex?: boolean;
  structuredData?: any;
}

export function SEO({ 
  title, 
  description,
  noindex = false,
  structuredData
}: SEOProps) {
  const { settings } = useSettings();
  const finalTitle = title || settings?.seo?.title || "Karim Zakaria | مدرب شخصي";
  const finalDescription = description || settings?.seo?.description || "حقق هدفك مع كابتن كريم زكريا. خطط تدريب وتغذية مخصصة لتحقيق أفضل النتائج.";

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content="كريم زكريا, كريم ذكريا, كريم دوت كوم, مدرب شخصي, Karim Zakaria, Krimzkria, karim zakria, krim zkria, كابتن كريم, تدريب اونلاين, تغذية, دايت, كمال اجسام, فتنس, SST, Salah Seleem Team, coach karim, karim zakarya, karim zakaria store" />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Geographic (GEO) SEO */}
      <meta name="geo.region" content="EG" />
      <meta name="geo.placename" content="Cairo, Egypt" />
      <meta name="geo.position" content="30.0444;31.2357" />
      <meta name="ICBM" content="30.0444, 31.2357" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />

      {/* Structured Data (AEO & Local SEO) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
