import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { seoConfig, structuredData } from "@/lib/seo-config";
import { Analytics } from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import AuthInitializer from "@/components/auth/AuthInitializer";
import { ToastProvider } from "@/components/ui/Toast";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.description,
  keywords: [
    'hashtag generator',
    'AI hashtags',
    'Instagram hashtags',
    'TikTok hashtags',
    'Twitter hashtags',
    'YouTube hashtags',
    'social media tools',
    'content marketing',
    'viral hashtags',
    'trending hashtags',
    'hashtag finder',
    'hashtag tool',
    'social media marketing',
    'content creation',
    'AI hashtag generator',
    'free hashtag generator',
    'best hashtag generator',
    'hashtag suggestions',
    'social media growth',
    'Instagram growth',
    'TikTok growth',
    'viral content'
  ],
  authors: [{ name: 'HyperHash Team' }],
  creator: 'HyperHash',
  publisher: 'HyperHash',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(seoConfig.canonical),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'tr-TR': '/tr-TR',
      'es-ES': '/es-ES',
      'fr-FR': '/fr-FR',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    url: seoConfig.canonical,
    siteName: seoConfig.openGraph.siteName,
    images: seoConfig.openGraph.images,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    site: seoConfig.twitter.site,
    creator: seoConfig.twitter.handle,
    images: seoConfig.openGraph.images,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': '/browserconfig.xml',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon-64x64.svg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const t = localStorage.getItem('theme'); const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; const next = t || (prefersDark ? 'dark' : 'light'); document.documentElement.setAttribute('data-theme', next); } catch (e) {} })();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.website),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization),
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://hyperhash-production-2512.up.railway.app" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to content for keyboard users */}
        <a href="#main-content" className="skip-link">Skip to content</a>
        <div className="app-backdrop" aria-hidden="true" />
        <AuthInitializer />
        <ToastProvider>
          {/* Global NavBar */}
          <NavBar />
          {/* Main content */}
          <main id="main-content" role="main" tabIndex={-1}>{children}</main>
          {/* Global Footer */}
          <Footer />
        </ToastProvider>
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
