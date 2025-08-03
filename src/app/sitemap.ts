import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperhash.ai'
  
  const routes = [
    '',
    '/blog',
    '/tools/instagram-hashtag-generator',
    '/tools/tiktok-hashtag-generator', 
    '/tools/twitter-hashtag-generator',
    '/tools/youtube-hashtag-generator',
    '/guides/hashtag-best-practices',
    '/guides/social-media-marketing',
    '/about',
    '/privacy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.startsWith('/tools') ? 0.9 : 0.7,
  }))
}
