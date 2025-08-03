import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperhash.ai'
  
  const routes = [
    '',
    '/about',
    '/contact', 
    '/privacy',
    '/terms',
    '/faq',
    '/pricing',
    '/blog',
    '/guides',
    '/guides/instagram-hashtags',
    '/trends',
    '/case-studies',
    '/tools',
    '/tools/instagram',
    '/tools/tiktok', 
    '/tools/twitter',
    '/tools/youtube',
    '/tools/linkedin',
    '/tools/analytics',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 
                     route === '/trends' ? 'hourly' :
                     route.startsWith('/tools') ? 'weekly' : 
                     route.startsWith('/blog') ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 
              route.startsWith('/tools') ? 0.9 : 
              route === '/trends' ? 0.8 :
              route === '/guides' ? 0.8 : 0.7,
  }))
}
