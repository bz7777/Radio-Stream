# 📻 Radio Stream - Modern Web Radio App

A premium, production-ready mobile-first web application for streaming online radio stations. Built with React, Vite, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61dafb.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)

## ✨ Features

### 🎵 Audio Player
- ✅ Play / Pause controls
- ✅ Volume control slider with mute toggle
- ✅ Live streaming indicator
- ✅ Stream metadata display (song titles)
- ✅ Auto-play next station on stream failure
- ✅ Sticky mini-player at bottom
- ✅ Animated equalizer visualization
- ✅ Background playback support

### 📱 User Interface
- ✅ Modern, Spotify-inspired design
- ✅ Fully responsive (mobile-first)
- ✅ Dark/Light mode with smooth transitions
- ✅ Station cards with logos and metadata
- ✅ Smooth hover and tap effects
- ✅ Loading states and error handling

### 🔍 Search & Filter
- ✅ Real-time search by station name
- ✅ Filter by category (Pop, News, Sport, etc.)
- ✅ Filter by country
- ✅ Multi-tab navigation (All, Favorites, Most Played)

### ❤️ Favorites System
- ✅ Add/remove stations to favorites
- ✅ Persistent storage with localStorage
- ✅ Favorites tab for quick access
- ✅ Auto-save last played station

### 🌙 Dark Mode
- ✅ Toggle between light and dark themes
- ✅ Preference saved in localStorage
- ✅ Smooth CSS transitions

### ⏰ Sleep Timer
- ✅ Pre-set timers (15, 30, 45, 60 minutes)
- ✅ Live countdown display
- ✅ Auto-stop playback when timer ends
- ✅ Beautiful modal interface

### 🎲 Additional Features
- ✅ Random station button
- ✅ Play count statistics
- ✅ Most played stations section
- ✅ Empty states for better UX
- ✅ Error handling and recovery

### 📲 PWA Support
- ✅ Progressive Web App
- ✅ Installable on mobile home screen
- ✅ Service Worker for offline support
- ✅ Custom app icon and splash screen
- ✅ Standalone app experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Modern web browser

### Installation

1. **Clone or download the project**
```bash
cd radio-stream-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📝 Configuration

### Replace Placeholder Radio Streams

Edit `/src/data/stations.js` and replace the placeholder `streamUrl` values with your actual radio stream URLs:

```javascript
export const radioStations = [
  {
    id: 1,
    name: "Your Station Name",
    streamUrl: "https://your-actual-stream-url.com/live", // ← Replace this
    logo: "https://your-logo-url.com/logo.png",
    category: "Pop",
    country: "USA",
    playCount: 0
  },
  // ... more stations
];
```

### Supported Stream Formats

- **HTTP/HTTPS Streams**: Most common (Icecast, Shoutcast)
- **HLS Streams**: `.m3u8` playlists
- **Direct MP3/AAC**: Direct audio file streams

### Add Custom Icons (PWA)

Replace these placeholder files:
- `/public/icon-192.png` - 192x192px PNG
- `/public/icon-512.png` - 512x512px PNG

Use the `/public/radio-icon.svg` as a design reference.

## 🏗️ Project Structure

```
radio-stream-app/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   ├── radio-icon.svg         # App icon (SVG)
│   ├── icon-192.png           # PWA icon 192px
│   └── icon-512.png           # PWA icon 512px
├── src/
│   ├── components/
│   │   ├── Header.jsx         # App header with dark mode toggle
│   │   ├── SearchBar.jsx      # Search input component
│   │   ├── FilterTabs.jsx     # Tab and category filters
│   │   ├── StationCard.jsx    # Individual station card
│   │   ├── MiniPlayer.jsx     # Sticky bottom player
│   │   ├── Equalizer.jsx      # Audio visualizer
│   │   ├── SleepTimerModal.jsx # Sleep timer modal
│   │   └── EmptyState.jsx     # Empty state displays
│   ├── hooks/
│   │   ├── useAudioPlayer.js  # Audio playback management
│   │   ├── useLocalStorage.js # localStorage utilities
│   │   └── useSleepTimer.js   # Sleep timer logic
│   ├── data/
│   │   └── stations.js        # Radio stations data
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles + Tailwind
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── README.md                 # This file
```

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#0ea5e9',  // Change primary color
        600: '#0284c7',
        // ...
      },
    },
  },
}
```

### Modify Animations

Edit `tailwind.config.js` to add custom animations:

```javascript
animation: {
  'custom-bounce': 'bounce 1s ease-in-out infinite',
},
```

## 📱 PWA Installation

### Mobile (iOS/Android)

1. Open the app in Safari (iOS) or Chrome (Android)
2. Tap the Share button
3. Select "Add to Home Screen"
4. Tap "Add"

### Desktop (Chrome/Edge)

1. Click the install icon in the address bar
2. Click "Install"

## 🧪 Testing

### Test Radio Streams

Use these free test streams:

```javascript
// Example working streams for testing
{
  id: 1,
  name: "Test Stream",
  streamUrl: "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
  // ... other properties
}
```

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🐛 Troubleshooting

### Stream Won't Play

1. **CORS Issues**: Some streams require server-side proxying
2. **HTTPS**: Mixing HTTP streams on HTTPS pages may be blocked
3. **Format**: Ensure stream format is supported (MP3/AAC/HLS)

### Dark Mode Not Persisting

- Check localStorage is enabled in browser
- Clear browser cache and try again

### PWA Not Installing

- Ensure you're using HTTPS (required for PWA)
- Check manifest.json is accessible
- Verify service worker is registered

## 🚀 Deployment

### Netlify

```bash
npm run build
# Drag 'dist' folder to Netlify
```

### Vercel

```bash
npm run build
vercel --prod
```

### GitHub Pages

```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

## 🔒 Security Considerations

- Always use HTTPS for production
- Validate stream URLs before adding
- Consider implementing rate limiting
- Use Content Security Policy headers

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

## 🙏 Credits

- Icons: [Lucide React](https://lucide.dev/)
- UI Framework: [Tailwind CSS](https://tailwindcss.com/)
- Build Tool: [Vite](https://vitejs.dev/)

---

**Made with ❤️ for radio lovers**
