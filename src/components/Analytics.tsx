import Script from 'next/script';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
              'custom_parameter_1': 'hashtag_generation',
              'custom_parameter_2': 'user_engagement'
            }
          });
        `}
      </Script>
    </>
  );
}

export function trackEvent(eventName: string, parameters?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: eventName,
      ...parameters,
    });
  }
}

export function trackHashtagGeneration(platform: string, language: string, style: string) {
  trackEvent('hashtag_generation', {
    platform,
    language,
    style,
    event_category: 'tool_usage',
  });
}

export function trackCopyAction(type: 'single' | 'all', hashtag?: string) {
  trackEvent('copy_hashtag', {
    copy_type: type,
    hashtag_content: hashtag || 'all_hashtags',
    event_category: 'user_action',
  });
}
