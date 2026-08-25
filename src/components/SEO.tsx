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
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
