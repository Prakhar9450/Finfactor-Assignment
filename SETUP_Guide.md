# 🛠️ NASA APOD Explorer - Complete Setup Guide

This guide will walk you through setting up the NASA APOD Explorer from scratch, whether you're a beginner or an experienced developer.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Configuration](#configuration)
4. [Getting Your NASA API Key](#getting-your-nasa-api-key)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Development Tips](#development-tips)
8. [Production Deployment](#production-deployment)

---

## Prerequisites

### Required Software

Before you begin, ensure you have the following installed on your system:

#### 1. Node.js (v18.0.0 or higher)

**Check if installed:**

```bash
node --version
```

**Installation:**

- **Windows/Mac:** Download from [nodejs.org](https://nodejs.org/)
- **Linux (Ubuntu/Debian):**
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **macOS (Homebrew):**
  ```bash
  brew install node
  ```

#### 2. Package Manager (npm/yarn/pnpm)

npm comes with Node.js. Optionally install yarn or pnpm:

```bash
# Yarn
npm install -g yarn

# pnpm (recommended for faster installs)
npm install -g pnpm
```

#### 3. Git

**Check if installed:**

```bash
git --version
```

**Installation:**

- **Windows:** Download from [git-scm.com](https://git-scm.com/)
- **Mac:** `brew install git`
- **Linux:** `sudo apt-get install git`

#### 4. Code Editor

Recommended: [Visual Studio Code](https://code.visualstudio.com/)

**Recommended VS Code Extensions:**

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

---

## Installation Steps

### Step 1: Clone or Download the Project

**Option A: Clone with Git**

```bash
git clone <repository-url>
cd nasa-apod-explorer
```

**Option B: Download ZIP**

1. Download the project ZIP file
2. Extract to your desired location
3. Open terminal in the extracted folder

### Step 2: Install Dependencies

Choose one package manager and stick with it throughout the project:

**Using npm:**

```bash
npm install
```

**Using yarn:**

```bash
yarn install
```

**Using pnpm:**

```bash
pnpm install
```

This process will:

- Install all required dependencies (~300MB)
- Set up TypeScript
- Configure Next.js
- Install UI components (ShadCN)
- Setup TailwindCSS

**Expected Time:** 2-5 minutes depending on your internet speed

### Step 3: Verify Installation

Check that dependencies are installed correctly:

```bash
# Check if Next.js is available
npx next --version

# List installed packages
npm list --depth=0
```

---

## Configuration

### Step 1: Create Environment File

Create a `.env.local` file in the root directory:

```bash
# On Mac/Linux
touch .env.local

# On Windows (PowerShell)
New-Item .env.local -ItemType File

# Or simply create it in your editor
```

### Step 2: Add Environment Variables

Edit `.env.local` and add:

```env
# NASA API Configuration
NASA_API_KEY=DEMO_KEY

# Base URL (for development)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> ⚠️ **Important:** The file must be named exactly `.env.local` (with the dot at the start)

> 💡 **Note:** `DEMO_KEY` works but has rate limits. Get your own key (next section) for better performance.

---

## Getting Your NASA API Key

### Why You Need It

- **DEMO_KEY** has strict rate limits (30 requests per hour, 50 per day)
- **Personal API key** gives you 1,000 requests per hour
- It's completely **FREE** and takes 2 minutes!

### Step-by-Step Process

1. **Visit NASA API Portal**

   Go to: [https://api.nasa.gov/](https://api.nasa.gov/)

2. **Find the API Key Section**

   Scroll down to "Generate API Key"

3. **Fill Out the Form**

   - First Name
   - Last Name
   - Email Address
   - Application Name: "NASA APOD Explorer" (or any name)
   - Purpose: "Personal Project" or "Learning"

4. **Submit and Check Email**

   You'll receive an email instantly with your API key

5. **Update `.env.local`**

   Replace `DEMO_KEY` with your new key:

   ```env
   NASA_API_KEY=your_actual_api_key_here
   ```

6. **Restart Development Server**

   If it's running, stop (Ctrl+C) and start again

---

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

You should see:

```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

### Access the Application

1. Open your browser
2. Navigate to: [http://localhost:3000](http://localhost:3000)
3. You should see the NASA APOD Explorer homepage

### Testing All Features

**Test Today's APOD:**

- Homepage should show today's astronomy picture
- Check that image loads correctly
- Read the explanation

**Test Browse Feature:**

1. Click "Browse" in navigation
2. Select a date from the calendar
3. Verify APOD loads for that date

**Test Gallery:**

1. Click "Gallery" in navigation
2. Should see 20 recent APODs in a grid
3. Click any card to view details

**Test Detail Page:**

- Click any APOD card
- Should navigate to `/apod/YYYY-MM-DD`
- Check HD download button (if available)

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port 3000 Already in Use

**Error:**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

```bash
# Option A: Use a different port
PORT=3001 npm run dev

# Option B: Kill process on port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

#### 2. NASA API Rate Limit Exceeded

**Error in console:**

```
Failed to fetch APOD: NASA API error: 429 Too Many Requests
```

**Solution:**

1. Get your personal API key (see above)
2. Wait 1 hour for rate limit to reset
3. Enable caching (already enabled by default)

#### 3. Module Not Found Errors

**Error:**

```
Module not found: Can't resolve '@/components/...'
```

**Solution:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

#### 4. TypeScript Errors

**Error:**

```
Type error: Cannot find module '...' or its corresponding type declarations
```

**Solution:**

```bash
# Reinstall with exact dependencies
npm ci

# Restart TypeScript server (in VS Code)
# Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

#### 5. Images Not Loading

**Symptoms:** Gray boxes instead of images

**Solution:**

1. Check your internet connection
2. Verify NASA API key is correct
3. Check browser console for CORS errors
4. Ensure `next.config.js` has correct image domains

#### 6. Styling Not Applied

**Symptoms:** Unstyled or plain HTML

**Solution:**

```bash
# Rebuild Tailwind styles
npm run dev

# Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Or open in Incognito mode
```

---

## Development Tips

### Hot Reload

Next.js automatically reloads when you save files:

- **Component changes:** Instant refresh
- **API routes:** Instant refresh
- **Config files:** Requires manual restart

### Viewing API Responses

Test API endpoints directly in browser:

```
http://localhost:3000/api/apod/today
http://localhost:3000/api/apod/date?date=2024-01-15
http://localhost:3000/api/apod/range?start=2024-01-01&end=2024-01-10
```

### Debugging

1. **Browser DevTools:**

   - Press F12
   - Check Console tab for errors
   - Network tab to see API calls

2. **Server Logs:**

   - Look at terminal where `npm run dev` is running
   - Server-side errors appear here

3. **VS Code Debugging:**
   - Use built-in debugger
   - Set breakpoints in code
   - Press F5 to start debugging

### Useful Commands

```bash
# Check for linting errors
npm run lint

# Build for production (test before deployment)
npm run build

# Start production server
npm run build && npm start

# Type check without building
npx tsc --noEmit

# Clear all caches and reinstall
rm -rf node_modules .next package-lock.json && npm install
```

---

## Production Deployment

### Build for Production

```bash
# Test production build locally
npm run build
npm start
```

The build will:

- Optimize code
- Compress images
- Generate static pages
- Tree-shake unused code

### Deploy to Vercel (Recommended)

**Step 1: Install Vercel CLI**

```bash
npm install -g vercel
```

**Step 2: Deploy**

```bash
vercel
```

**Step 3: Set Environment Variables**

In Vercel dashboard:

1. Go to your project settings
2. Environment Variables section
3. Add:
   - `NASA_API_KEY` = your_key
   - `NEXT_PUBLIC_BASE_URL` = your_production_url

**Step 4: Deploy to Production**

```bash
vercel --prod
```

### Alternative: Deploy to Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod`

### Environment-Specific URLs

Update `NEXT_PUBLIC_BASE_URL`:

```env
# Development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Production
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

---

## 📚 Additional Resources

### Official Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [NASA API Docs](https://api.nasa.gov/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Video Tutorials

- Next.js 14 App Router Tutorial
- TailwindCSS Crash Course
- TypeScript for Beginners

### Community

- [Next.js Discord](https://discord.gg/nextjs)
- [Stack Overflow - Next.js Tag](https://stackoverflow.com/questions/tagged/next.js)

---

## ✅ Setup Checklist

Use this checklist to ensure everything is set up correctly:

- [ ] Node.js 18+ installed
- [ ] Project dependencies installed (`npm install`)
- [ ] `.env.local` file created
- [ ] NASA API key obtained and added
- [ ] Development server starts without errors
- [ ] Homepage loads and shows today's APOD
- [ ] Browse page works with date picker
- [ ] Gallery displays recent APODs
- [ ] Detail pages load correctly
- [ ] No console errors in browser DevTools
- [ ] Images load properly
- [ ] Responsive design works on mobile (test with DevTools)

---

## 🎉 Success!

If you've completed all steps and the checklist, your NASA APOD Explorer is ready!

**Next Steps:**

- Explore the codebase
- Customize the design
- Add new features
- Deploy to production

**Need Help?**

- Check the [README.md](README.md) for more details
- Review the [INTERVIEW_PREP.md](INTERVIEW_PREP.md) to understand the architecture
- Open an issue on GitHub

Happy coding! 🚀✨
