import { NextSeo, ArticleJsonLd, BreadcrumbJsonLd, FAQPageJsonLd } from 'next-seo';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faq?: FAQItem[];
  article?: {
    title: string;
    description: string;
    publishedAt: string;
    updatedAt?: string;
    author: string;
    section: string;
    tags: string[];
  };
  images?: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }>;
}

export default function SEO({
  title,
  description,
  canonical,
  noindex = false,
  breadcrumbs,
  faq,
  article,
  images,
}: SEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperhash.ai';
  const pageCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  
  const defaultImages = [
    {
      url: `${baseUrl}/images/og-default.jpg`,
      width: 1200,
      height: 630,
      alt: title || 'HyperHash - AI Hashtag Generator',
    }
  ];

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={pageCanonical}
        noindex={noindex}
        openGraph={{
          url: pageCanonical,
          title: title,
          description: description,
          images: images || defaultImages,
          site_name: 'HyperHash',
        }}
        twitter={{
          handle: '@hyperhash_ai',
          site: '@hyperhash_ai',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'hashtag generator, AI hashtags, Instagram hashtags, TikTok hashtags, Twitter hashtags, YouTube hashtags, social media tools, content marketing, viral hashtags, trending hashtags',
          },
          {
            name: 'author',
            content: 'HyperHash Team',
          },
          {
            property: 'article:author',
            content: 'HyperHash Team',
          }
        ]}
      />

      {/* Breadcrumb JSON-LD */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbJsonLd
          itemListElements={breadcrumbs.map((item, index) => ({
            position: index + 1,
            name: item.name,
            item: `${baseUrl}${item.url}`,
          }))}
        />
      )}

      {/* FAQ JSON-LD */}
      {faq && faq.length > 0 && (
        <FAQPageJsonLd
          mainEntity={faq.map((item) => ({
            questionName: item.question,
            acceptedAnswerText: item.answer,
          }))}
        />
      )}

      {/* Article JSON-LD */}
      {article && (
        <ArticleJsonLd
          url={pageCanonical}
          title={article.title}
          images={images?.map(img => img.url) || [defaultImages[0].url]}
          datePublished={article.publishedAt}
          dateModified={article.updatedAt || article.publishedAt}
          authorName={article.author}
          publisherName="HyperHash"
          publisherLogo={`${baseUrl}/images/logo.png`}
          description={article.description}
        />
      )}
    </>
  );
}
