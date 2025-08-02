# HyperHash - AI Powered Hashtag Generator

AI-powered hashtag generator. Enter your content, get viral hashtags tailored to your language and location.

## Features

- 🤖 **AI-Powered**: Hashtag generation using Google Gemini
- 🎯 **Platform-Specific**: Optimized for Instagram, Twitter, YouTube
- 🎨 **Style Options**: Organic, trending, and branded hashtag styles
- 🌍 **Multi-Language**: Supports multiple languages with auto-detection
- 🗺️ **Location-Aware**: Generate hashtags relevant to specific regions
- 📱 **Responsive**: Mobile and desktop compatible
- 🌙 **Dark Mode**: Light and dark theme support
- 📋 **Easy Copying**: One-click hashtag copying
- 🔥 **Future Ready**: Google Trends API integration planned

## Technologies

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend API**: Railway.app hosted API
- **AI**: Google Gemini 1.5 Flash
- **Future**: Google Trends API integration

## Installation

```bash
# Clone the repository
git clone https://github.com/username/hyperhash.ai.git

# Navigate to directory
cd hyperhash.ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Application will run at [http://localhost:3000](http://localhost:3000).

## Usage

1. Enter your content in the text area
2. Select platform (Instagram, Twitter, YouTube, General)
3. Choose hashtag style (Organic, Trending, Branded)
4. Select language (auto-detect or specific language)
5. Choose location for regional hashtags
6. Click "Generate Hashtags"
7. Copy hashtags individually or all at once

## API Information

The app uses the API at `hyperhash-production-2512.up.railway.app`.

### API Endpoint
```
POST /api/generate-hashtags
```

### Request Body
```json
{
  "title": "string",
  "description": "string", 
  "keywords": ["string"],
  "style": "organic | trending | branded",
  "platform": "instagram | twitter | youtube | general",
  "language": "auto | en | tr | es | fr | de | it | pt | ar | ja | ko | zh",
  "location": "global | us | uk | tr | de | fr | es | it | br | mx | ca | au | jp | kr | in | sa | ae",
  "limit": 20
}
```

### Language Support
- Auto-detection
- English, Turkish, Spanish, French, German
- Italian, Portuguese, Arabic, Japanese, Korean, Chinese
- More languages can be added upon request

### Location Support
- Global hashtags
- Country-specific hashtags for major markets
- Regional trends and cultural relevance

## Future Features

- 📊 **Google Trends Integration**: Real-time trending hashtags
- 📈 **Analytics**: Hashtag performance tracking
- 🎯 **Smart Suggestions**: AI-powered recommendations
- 🔄 **Bulk Processing**: Multiple content processing
- 📅 **Scheduling**: Optimal posting time suggestions

## Deployment

### Vercel
```bash
npm run build
```

### Railway
```bash
railway deploy
```

## License

MIT License

## Contact

Use GitHub Issues for questions and feedback.

---

© 2025 HyperHash - AI Powered Hashtag Generator
