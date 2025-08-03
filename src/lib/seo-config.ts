export interface SEOConfig {
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  canonical: string;
  openGraph: {
    type: string;
    locale: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    handle: string;
    site: string;
    cardType: string;
  };
  additionalMetaTags: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

export const seoConfig: SEOConfig = {
  defaultTitle: process.env.NEXT_PUBLIC_DEFAULT_TITLE || 'HyperHash - AI Hashtag Generator Tool',
  titleTemplate: '%s | HyperHash - AI Hashtag Generator',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'AI-powered hashtag generator. Generate viral hashtags for Instagram, TikTok, Twitter, and YouTube with multi-language support and location targeting.',
  canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperhash.ai',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperhash.ai',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'HyperHash',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'HyperHash - AI Hashtag Generator Tool',
      },
    ],
  },
  twitter: {
    handle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@hyperhash_ai',
    site: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@hyperhash_ai',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'robots',
      content: 'index,follow',
    },
    {
      name: 'author',
      content: 'HyperHash Team',
    },
    {
      name: 'keywords',
      content: 'hashtag generator, AI hashtags, Instagram hashtags, TikTok hashtags, Twitter hashtags, YouTube hashtags, social media tools, content marketing, viral hashtags, trending hashtags',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'theme-color',
      content: '#2563eb',
    },
  ],
};

export const structuredData = {
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HyperHash',
    description: 'AI-powered hashtag generator for social media platforms',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HyperHash',
    description: 'AI-powered hashtag generator company',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
    sameAs: [
      'https://twitter.com/hyperhash_ai',
      'https://github.com/mfromawe/hyperhash.ai',
    ],
  },
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
  faq: (questions: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
      },
    })),
  }),
};
