import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  image?: string;
  url?: string;
}

export function SEO({ title, description, type = 'website', image, url }: SEOProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelBlog',
    name: title,
    description,
    url: url || 'https://travelscott.com',
    image: image || 'https://travelscott.com/default-og.jpg'
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
