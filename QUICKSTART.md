# ⚡ Quick Start Guide

Get your radio app running in 3 minutes!

## 🚀 Installation & Run

```bash
# 1. Navigate to project
cd radio-stream-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 🎵 Add Your Radio Streams

### Option 1: Edit stations.js directly

**File:** `src/data/stations.js`

```javascript
{
  id: 1,
  name: "Your Station Name",
  streamUrl: "YOUR_STREAM_URL_HERE", // ← Change this
  logo: "https://your-logo-url.png",
  category: "Pop",
  country: "USA",
  playCount: 0
}
```

### Option 2: Use these working test streams

Replace URLs in `stations.js` with these tested streams:

```javascript
// BBC World Service
"http://stream.live.vc.bbcmedia.co.uk/bbc_world_service"

// 181.FM - The Buzz
"http://listen.181fm.com/181-buzz_128k.mp3"

// Radio Swiss Jazz
"http://stream.srg-ssr.ch/m/rsj/mp3_128"

// KEXP 90.3 Seattle
"http://live-mp3-128.kexp.org/kexp128.mp3"

// SomaFM Groove Salad
"http://ice1.somafm.com/groovesalad-128-mp3"
```

---

## 🎨 Quick Customization

### Change App Name

**`index.html`** - Line 8:
```html
<title>Your Radio App</title>
```

### Change Primary Color

**`tailwind.config.js`** - Line 14:
```javascript
500: '#YOUR_HEX_COLOR', // e.g., '#ff6b6b'
```

### Add Your Logo/Icons

Replace these files:
- `public/icon-192.png`
- `public/icon-512.png`

---

## 📱 Test on Mobile

1. Find your computer's local IP:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Open on your phone:
   ```
   http://YOUR_IP:3000
   ```
   Example: `http://192.168.1.100:3000`

---

## 🚀 Build for Production

```bash
# Build optimized version
npm run build

# Preview the build
npm run preview
```

Files will be in the `dist/` folder.

---

## 📦 Deploy (Choose One)

### Netlify (Easiest)
1. Run `npm run build`
2. Drag `dist` folder to https://app.netlify.com/drop
3. Done! ✨

### Vercel
```bash
npm run build
npx vercel --prod
```

### GitHub Pages
```bash
npm install -D gh-pages
npm run build
npx gh-pages -d dist
```

---

## ✅ Features Ready to Use

- ✅ **10 station slots** - Just add your URLs
- ✅ **Search & filter** - Works immediately
- ✅ **Dark mode** - Toggle in header
- ✅ **Favorites** - Click heart icons
- ✅ **Sleep timer** - Click timer in player
- ✅ **Random play** - Click shuffle button
- ✅ **Stats tracking** - Auto-enabled
- ✅ **PWA ready** - Install on mobile
- ✅ **Responsive** - Mobile-first design

---

## 🆘 Troubleshooting

### Streams won't play?
- Check URL is correct
- Try HTTP instead of HTTPS (or vice versa)
- Some streams need CORS proxy

### Dark mode not working?
- Clear browser cache
- Check localStorage is enabled

### Mobile install not showing?
- Must use HTTPS (use Netlify for easy HTTPS)
- Try in Chrome or Safari

---

## 📖 More Information

- **Full docs**: See `README.md`
- **Setup guide**: See `SETUP.md`
- **All features**: See `FEATURES.md`

---

## 💡 Pro Tips

1. **Find streams**: Use https://www.radio-browser.info/
2. **Test streams**: Play in VLC first to verify they work
3. **Logo images**: Use square images (1:1 ratio)
4. **Categories**: Create any category name you want
5. **Performance**: App is already optimized!

---

**Need help?** Check the other documentation files or open an issue.

**Enjoy your radio app!** 🎵
