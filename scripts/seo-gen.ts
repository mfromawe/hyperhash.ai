#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BlogPostData {
  title: string;
  description: string;
  keywords: string[];
  category: string;
  slug: string;
}

const generateBlogPost = (topic: string): BlogPostData => {
  const slug = topic.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const title = `${topic.charAt(0).toUpperCase() + topic.slice(1)} - Complete Guide 2025`;
  const description = `Discover the best ${topic.toLowerCase()} strategies, tips, and tools to boost your social media presence in 2025.`;
  
  const keywords = [
    topic.toLowerCase(),
    `${topic.toLowerCase()} 2025`,
    `best ${topic.toLowerCase()}`,
    `${topic.toLowerCase()} guide`,
    `${topic.toLowerCase()} tips`,
    'social media marketing',
    'hashtag strategy',
    'content marketing'
  ];

  const category = determineCategory(topic);

  return { title, description, keywords, category, slug };
};

const determineCategory = (topic: string): string => {
  const lowerTopic = topic.toLowerCase();
  if (lowerTopic.includes('instagram')) return 'Instagram Marketing';
  if (lowerTopic.includes('tiktok')) return 'TikTok Marketing';
  if (lowerTopic.includes('twitter')) return 'Twitter Marketing';
  if (lowerTopic.includes('youtube')) return 'YouTube Marketing';
  if (lowerTopic.includes('hashtag')) return 'Hashtag Strategy';
  return 'Social Media Marketing';
};

const createMDXTemplate = (data: BlogPostData, topic: string): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `---
title: "${data.title}"
description: "${data.description}"
publishedAt: "${currentDate}"
updatedAt: "${currentDate}"
author: "HyperHash Team"
category: "${data.category}"
tags: [${data.keywords.map(k => `"${k}"`).join(', ')}]
featured: false
seo:
  title: "${data.title} | HyperHash"
  description: "${data.description}"
  keywords: [${data.keywords.map(k => `"${k}"`).join(', ')}]
  canonical: "/blog/${data.slug}"
---

# ${data.title}

## Introduction

${topic} has become essential for social media success in 2025. This comprehensive guide covers everything you need to know about ${topic.toLowerCase()}, from basic strategies to advanced techniques.

## Why ${topic} Matters in 2025

The social media landscape continues to evolve, and ${topic.toLowerCase()} plays a crucial role in:

- **Increased Visibility**: Proper ${topic.toLowerCase()} can boost your content reach by up to 70%
- **Better Engagement**: Strategic implementation leads to higher interaction rates
- **Brand Growth**: Consistent ${topic.toLowerCase()} helps build brand awareness and community

## Best Practices for ${topic}

### 1. Research and Planning
Before implementing any ${topic.toLowerCase()} strategy, thorough research is essential:
- Analyze your target audience
- Study competitor strategies
- Identify trending patterns
- Set clear, measurable goals

### 2. Content Optimization
Optimize your content for maximum impact:
- Use relevant and specific terms
- Maintain consistency across platforms
- Focus on quality over quantity
- Regular performance analysis

### 3. Platform-Specific Strategies

#### Instagram
- Focus on visual appeal
- Use Stories and Reels effectively
- Leverage user-generated content
- Engage with your community

#### TikTok
- Follow trending formats
- Create original content
- Use popular sounds strategically
- Post consistently

#### Twitter
- Join conversations
- Use trending topics wisely
- Share valuable insights
- Build relationships

#### YouTube
- Optimize video titles and descriptions
- Create compelling thumbnails
- Use end screens and cards
- Build playlists strategically

## Common Mistakes to Avoid

- **Over-optimization**: Don't force unnatural patterns
- **Ignoring analytics**: Always track performance metrics
- **Inconsistent posting**: Maintain regular content schedule
- **Following outdated strategies**: Stay updated with platform changes

## Tools and Resources

### Free Tools
1. **[HyperHash](/)** - AI-powered optimization
2. **Platform Analytics** - Native insights
3. **Google Trends** - Trending topics research
4. **Canva** - Visual content creation

### Advanced Tools
1. **Hootsuite** - Social media management
2. **Buffer** - Content scheduling
3. **Sprout Social** - Analytics and engagement
4. **BuzzSumo** - Content research

## Measuring Success

Track these key metrics to measure your ${topic.toLowerCase()} success:

- **Reach and Impressions**: How many people see your content
- **Engagement Rate**: Likes, comments, shares, and saves
- **Follower Growth**: New followers from your strategy
- **Click-through Rate**: Traffic to your website or profile
- **Conversion Rate**: Actions taken by your audience

## Advanced Strategies

### AI-Powered Optimization
Use artificial intelligence to enhance your ${topic.toLowerCase()} strategy:
- Automated content analysis
- Predictive trending identification
- Performance optimization
- Audience behavior insights

### Cross-Platform Integration
Maximize your impact across multiple platforms:
- Repurpose content strategically
- Maintain consistent branding
- Adapt content for each platform
- Cross-promote effectively

## Frequently Asked Questions

### Q: How often should I update my ${topic.toLowerCase()} strategy?
**A:** Review and update your strategy monthly, with weekly performance checks to stay current with trends.

### Q: What's the best time to implement new ${topic.toLowerCase()} techniques?
**A:** Start implementing gradually, testing small changes before major strategy shifts.

### Q: How long does it take to see results?
**A:** Most strategies show initial results within 2-4 weeks, with significant improvements after 2-3 months of consistent implementation.

### Q: Should I focus on one platform or multiple platforms?
**A:** Start with 1-2 platforms where your audience is most active, then expand once you've mastered those.

## Conclusion

Mastering ${topic.toLowerCase()} in 2025 requires staying informed about platform updates, understanding your audience, and consistently analyzing performance. Use tools like **[HyperHash](/)** to streamline your strategy and achieve better results faster.

Remember: success comes from consistent effort, continuous learning, and adapting to the ever-changing social media landscape.

---

*Ready to optimize your ${topic.toLowerCase()} strategy? Try [HyperHash's AI-powered tools](/) for personalized recommendations and insights.*`;
};

const main = () => {
  const topic = process.argv[2];
  
  if (!topic) {
    console.log('Usage: node seo-gen.ts "your topic here"');
    console.log('Example: node seo-gen.ts "best instagram hashtags for sneakers"');
    process.exit(1);
  }

  const blogData = generateBlogPost(topic);
  const mdxContent = createMDXTemplate(blogData, topic);
  
  const contentDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  const filePath = path.join(contentDir, `${blogData.slug}.mdx`);
  
  // Ensure content directory exists
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  
  // Write the file
  fs.writeFileSync(filePath, mdxContent);
  
  console.log(`✅ Blog post created: ${filePath}`);
  console.log(`📝 Title: ${blogData.title}`);
  console.log(`🔗 Slug: ${blogData.slug}`);
  console.log(`📊 Keywords: ${blogData.keywords.join(', ')}`);
  console.log(`\n🚀 Next steps:`);
  console.log(`1. Review and edit the generated content`);
  console.log(`2. Add specific examples and data`);
  console.log(`3. Create accompanying images`);
  console.log(`4. Test the content before publishing`);
};

main();
