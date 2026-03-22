import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flexiberry.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${siteUrl}/products`,          lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${siteUrl}/about`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`,           lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/auth/login`,        lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/auth/register`,     lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Product category pages
  const categories = ['electronics', 'vehicles', 'furniture', 'energy', 'business', 'appliances']
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${siteUrl}/products?category=${cat}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...categoryRoutes]
}