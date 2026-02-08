# 🔧 Setup Guide - Radio Stream App

## Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
cd radio-stream-app
npm install
```

This installs:
- React 18.2
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)

### Step 2: Configure Radio Streams

Open `src/data/stations.js` and replace placeholder URLs:

```javascript
{
  id: 1,
  name: "Your Station Name",
  streamUrl: "https://your-stream-url.com/live", // ← REPLACE THIS
  logo: "https://your-logo.png",
  category: "Pop",
  country: "USA",
  playCount: 0
}
```

### Step 3: Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🎯 Finding Radio Stream URLs

### Method 1: Free Radio Directories

- **Radio Garden**: https://radio.garden/
- **Radio Browser**: https://www.radio-browser.info/
- **TuneIn**: https://tunein.com/

### Method 2: Extract from Existing Players

1. Open browser DevTools (F12)
2. Go to Network tab
3. Play a station
4. Look for .m3u8 or streaming URLs

### Method 3: Use Direct Stream URLs

Example working streams for testing:

```javascript
// BBC World Service
streamUrl: "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service"

// 181.FM - The Buzz
streamUrl: "http://listen.181fm.com/181-buzz_128k.mp3"

// Radio Swiss Jazz
streamUrl: "http://stream.srg-ssr.ch/m/rsj/mp3_128"
```

---

## 🎨 Customization Guide

### Change App Name

**File: `index.html`**
```html
<title>Your App Name</title>
```

**File: `public/manifest.json`**
```json
{
  "name": "Your App Name",
  "short_name": "Your App"
}
```

### Change Primary Color

**File: `tailwind.config.js`**
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#YOUR_COLOR', // e.g., '#ff6b6b'
        600: '#YOUR_DARKER_COLOR',
      }
    }
  }
}
```

### Add More Stations

**File: `src/data/stations.js`**

```javascript
export const radioStations = [
  // ... existing stations
  {
    id: 11, // increment ID
    name: "New Station",
    streamUrl: "https://stream-url.com",
    logo: "https://logo-url.png",
    category: "Rock", // or create new category
    country: "Spain",
    playCount: 0
  }
];
```

### Add New Categories

Categories are auto-generated from stations. Just add stations with new category names.

---

## 📱 PWA Setup

### Generate App Icons

1. **Use online tool**: https://www.pwabuilder.com/imageGenerator
2. Upload your logo
3. Download generated icons
4. Replace:
   - `public/icon-192.png`
   - `public/icon-512.png`

### Customize Theme Color

**File: `public/manifest.json`**
```json
{
  "theme_color": "#0ea5e9", // ← Your brand color
  "background_color": "#0f172a"
}
```

**File: `index.html`**
```html
<meta name="theme-color" content="#0ea5e9">
```

---

## 🚀 Production Build

### Build for Production

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deployment Options

### Option 1: Netlify (Easiest)

1. Build the project:
   ```bash
   npm run build
   ```

2. Drag the `dist` folder to https://app.netlify.com/drop

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   npm run build
   vercel --prod
   ```

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Option 4: Self-Hosted

1. Build:
   ```bash
   npm run build
   ```

2. Upload `dist/` folder to your server

3. Configure server to serve `index.html` for all routes

---

## 🔧 Advanced Configuration

### Add Custom Fonts

**File: `index.html`**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**File: `src/index.css`**
```css
body {
  font-family: 'Inter', sans-serif;
}
```

### Enable Analytics

**File: `index.html` (before closing `</head>`)**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Add Environment Variables

1. Create `.env` file:
   ```
   VITE_API_URL=https://api.example.com
   VITE_APP_NAME=My Radio App
   ```

2. Use in code:
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

---

## 🐛 Common Issues

### Issue: Streams Won't Play

**Solution 1: CORS Proxy**

Some streams block browser requests. Use a CORS proxy:

```javascript
streamUrl: "https://cors-anywhere.herokuapp.com/http://stream-url.com"
```

**Solution 2: Server-Side Proxy**

Set up a backend proxy server to fetch streams.

### Issue: HTTPS Required

Modern browsers require HTTPS for many features. Use:
- Netlify (auto HTTPS)
- Vercel (auto HTTPS)
- Let's Encrypt for self-hosted

### Issue: iOS Not Playing

Add to audio element:

```javascript
audioRef.current.playsInline = true;
```

Already included in `useAudioPlayer.js`.

---

## 📊 Performance Optimization

### Enable Code Splitting

Already configured in Vite automatically.

### Optimize Images

Use WebP format for logos:

```javascript
logo: "https://example.com/logo.webp"
```

### Lazy Load Components

```javascript
const SleepTimerModal = lazy(() => import('./components/SleepTimerModal'));
```

---

## 🔒 Security Best Practices

1. **Validate Stream URLs**: Only add trusted sources
2. **Use HTTPS**: Always in production
3. **CSP Headers**: Add Content Security Policy
4. **Rate Limiting**: Prevent abuse if using backend

---

## 📱 Mobile Optimization Tips

1. **Test on real devices**: iOS Safari, Android Chrome
2. **Touch targets**: Minimum 44x44px (already implemented)
3. **Viewport**: Configured in `index.html`
4. **No zoom on input**: Already configured

---

## 🧪 Testing Checklist

- [ ] All streams play correctly
- [ ] Dark mode switches properly
- [ ] Favorites persist after refresh
- [ ] Search works with all filters
- [ ] Sleep timer stops playback
- [ ] Random button works
- [ ] Stats track correctly
- [ ] Responsive on mobile
- [ ] PWA installs properly
- [ ] Background playback works

---

## 💡 Feature Ideas

Want to extend the app? Consider adding:

- 🎵 **Equalizer Controls**: Bass, treble adjustments
- 📻 **Recording**: Record live streams
- 🌍 **Geolocation**: Show nearby stations
- 💬 **Social Sharing**: Share stations
- 📊 **Advanced Stats**: Charts, graphs
- 🔔 **Notifications**: When favorite station plays
- 🎨 **Themes**: Multiple color schemes
- 🌐 **i18n**: Multi-language support

---

## 📞 Need Help?

- Check the main README.md
- Open an issue on GitHub
- Review code comments in source files

**Happy streaming! 🎵**
