# 🚀 NASA APOD Explorer

A beautiful, modern full-stack web application built with **Next.js 14** that showcases NASA's Astronomy Picture of the Day (APOD). This project demonstrates best practices in API design, caching, and responsive UI development.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Backend (API Layer)
- ✅ RESTful API endpoints following best practices
- ✅ Server-side data fetching with Next.js App Router
- ✅ **Smart caching system** with LRU eviction strategy
  - Configurable cache size (50 entries)
  - Time-based expiry (6 hours)
  - Automatic least-recently-used eviction
- ✅ Secure API key management via environment variables
- ✅ Comprehensive error handling
- ✅ Input validation and sanitization

### Frontend (UI Layer)
- ✅ Modern, responsive design with **ShadCN UI** components
- ✅ Subtle pastel color palette for a pleasant user experience
- ✅ Four distinct pages:
  - **Dashboard** - Today's APOD with full details
  - **Browse** - Interactive date picker to explore any date
  - **Gallery** - Grid view of recent 20 APODs
  - **Details** - Individual APOD page with HD download options
- ✅ Smooth animations and transitions
- ✅ Skeleton loading states
- ✅ Mobile-first responsive design
- ✅ Image optimization with Next.js Image component

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + ShadCN UI |
| API Source | NASA APOD API |
| Caching | Custom LRU In-Memory Cache |
| Icons | Lucide React |
| Deployment | Vercel (recommended) |

## 📁 Project Structure

```
nasa-apod-explorer/
├── app/
│   ├── api/
│   │   └── apod/
│   │       ├── today/route.ts      # GET /api/apod/today
│   │       ├── date/route.ts       # GET /api/apod/date?date=YYYY-MM-DD
│   │       └── range/route.ts      # GET /api/apod/range?start=...&end=...
│   ├── apod/[date]/page.tsx        # Dynamic APOD detail page
│   ├── browse/page.tsx             # Browse by date page
│   ├── gallery/
│   │   ├── page.tsx                # Gallery main page
│   │   └── GalleryContent.tsx      # Server component for gallery
│   ├── layout.tsx                  # Root layout with navbar
│   ├── page.tsx                    # Homepage (Today's APOD)
│   ├── TodayApod.tsx               # Server component for today's APOD
│   └── globals.css                 # Global styles
├── components/
│   ├── ui/                         # ShadCN UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── calendar.tsx
│   │   ├── badge.tsx
│   │   └── skeleton.tsx
│   ├── NavBar.tsx                  # Navigation component
│   ├── ApodCard.tsx                # Reusable APOD card
│   └── LoadingSkeleton.tsx         # Loading states
├── lib/
│   ├── types.ts                    # TypeScript interfaces
│   ├── cache.ts                    # LRU cache implementation
│   ├── nasaClient.ts               # NASA API client
│   └── utils.ts                    # Utility functions
├── public/                         # Static assets
├── .env.local                      # Environment variables
├── next.config.js                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager
- NASA API key (free from [NASA Open APIs](https://api.nasa.gov/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nasa-apod-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NASA_API_KEY=your_api_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   > 💡 **Get your free NASA API key:** Visit [https://api.nasa.gov/](https://api.nasa.gov/) and sign up. The default `DEMO_KEY` has rate limits, so it's recommended to use your own key.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

### 1. Get Today's APOD
```http
GET /api/apod/today
```

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "2024-01-15",
    "title": "The Horsehead Nebula",
    "explanation": "...",
    "url": "https://...",
    "hdurl": "https://...",
    "media_type": "image",
    "copyright": "Photographer Name"
  },
  "cached": false
}
```

### 2. Get APOD by Date
```http
GET /api/apod/date?date=2024-01-15
```

**Query Parameters:**
- `date` (required): Date in YYYY-MM-DD format

### 3. Get APOD Range
```http
GET /api/apod/range?start=2024-01-01&end=2024-01-10
```

**Query Parameters:**
- `start` (required): Start date in YYYY-MM-DD format
- `end` (required): End date in YYYY-MM-DD format
- Maximum range: 100 days

## 🎨 Design Philosophy

This project follows a clean, modern design approach:

- **Pastel Color Palette**: Soft purples, blues, and grays for a calming aesthetic
- **Card-Based Layout**: All content is organized in elegant cards
- **Smooth Transitions**: Hover effects and animations enhance user experience
- **Mobile-First**: Fully responsive design that works on all devices
- **Accessibility**: Semantic HTML and proper ARIA labels

## 🔧 Caching Strategy

The application implements a sophisticated **LRU (Least Recently Used)** caching system:

### Configuration
- **Max Size**: 50 entries
- **Expiry**: 6 hours
- **Eviction**: Automatic LRU eviction when cache is full

### Benefits
- ⚡ Faster response times
- 🔒 Reduced API calls to NASA
- 💰 Stays within API rate limits
- 🎯 Optimized for frequently accessed dates

### Cache Key Format
- Single APOD: `apod_YYYY-MM-DD`
- Range: `apod_range_YYYY-MM-DD_YYYY-MM-DD`

## 🧪 Development

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npx tsc --noEmit
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NASA_API_KEY`
   - `NEXT_PUBLIC_BASE_URL` (set to your production URL)
4. Deploy!

### Other Platforms

This Next.js app can also be deployed to:
- Netlify
- Railway
- AWS Amplify
- Docker containers

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NASA_API_KEY` | Your NASA API key | Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL for API calls | Yes (production) |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🙏 Acknowledgments

- **NASA** for providing the amazing APOD API
- **Vercel** for the Next.js framework
- **shadcn** for the beautiful UI components
- **Lucide** for the icon library

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the [NASA API documentation](https://api.nasa.gov/)
- Review the [Next.js documentation](https://nextjs.org/docs)

---

**Built with ❤️ and TypeScript**

*Explore the cosmos, one picture at a time.* 🌌

