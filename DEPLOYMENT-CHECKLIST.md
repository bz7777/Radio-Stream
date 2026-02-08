# ✅ Pre-Deployment Checklist

Complete this checklist before deploying to production.

## 🔧 Configuration

- [ ] Replace all placeholder stream URLs in `src/data/stations.js`
- [ ] Test each stream URL to ensure it works
- [ ] Update app name in `index.html`
- [ ] Update app name in `public/manifest.json`
- [ ] Change theme color if desired (`tailwind.config.js`)
- [ ] Replace `public/icon-192.png` with your logo
- [ ] Replace `public/icon-512.png` with your logo
- [ ] Update `public/radio-icon.svg` if needed

## 🎨 Customization (Optional)

- [ ] Customize primary color in `tailwind.config.js`
- [ ] Add custom fonts in `index.html`
- [ ] Update station logos with high-quality images
- [ ] Add more stations if needed (max recommended: 50)
- [ ] Adjust category names to match your content

## 🧪 Testing

- [ ] Test play/pause functionality
- [ ] Test volume controls
- [ ] Test search functionality
- [ ] Test category filters
- [ ] Test favorites add/remove
- [ ] Test dark mode toggle
- [ ] Test sleep timer
- [ ] Test random play
- [ ] Test on Chrome desktop
- [ ] Test on Firefox desktop
- [ ] Test on Safari desktop
- [ ] Test on Chrome mobile
- [ ] Test on Safari iOS
- [ ] Test PWA installation on mobile
- [ ] Test background playback
- [ ] Test with screen locked

## 🔒 Security

- [ ] All streams use HTTPS (if hosting on HTTPS)
- [ ] No sensitive data in code
- [ ] Service worker configured correctly
- [ ] CSP headers configured (in hosting platform)
- [ ] CORS issues resolved for all streams

## 📱 PWA

- [ ] Test PWA installation
- [ ] Verify icons display correctly
- [ ] Check splash screen appearance
- [ ] Test offline functionality (app shell loads)
- [ ] Verify theme color on mobile

## 🚀 Build & Deploy

- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`
- [ ] Check bundle size (should be < 500KB)
- [ ] Verify no console errors in production
- [ ] Test all features in production build
- [ ] Choose deployment platform (Netlify/Vercel/etc.)
- [ ] Configure custom domain (optional)
- [ ] Enable HTTPS on deployment platform
- [ ] Test deployed version on mobile
- [ ] Test deployed version on desktop

## 📊 Analytics (Optional)

- [ ] Add Google Analytics or similar
- [ ] Set up error tracking (Sentry)
- [ ] Configure performance monitoring
- [ ] Set up uptime monitoring

## 📝 Documentation

- [ ] Update README with any custom features
- [ ] Document any API changes
- [ ] Add deployment URL to README
- [ ] Create user guide if needed

## 🎯 Performance

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] No console warnings
- [ ] Images optimized (WebP if possible)

## 🌐 SEO (Optional)

- [ ] Add meta description in `index.html`
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Create `robots.txt`
- [ ] Create `sitemap.xml`

## 📧 Post-Deployment

- [ ] Test all features on live site
- [ ] Share with beta testers
- [ ] Monitor error logs
- [ ] Check analytics data
- [ ] Plan for maintenance updates
- [ ] Set up backup strategy
- [ ] Document any issues found

## 🎉 Launch

- [ ] Announce on social media
- [ ] Share with users
- [ ] Collect feedback
- [ ] Plan future updates
- [ ] Monitor user reports

---

## 📝 Notes

Use this space for deployment-specific notes:

**Deployment Date:** _______________

**Platform:** _______________

**URL:** _______________

**Issues Found:** 


**Next Steps:**


---

**Happy Launching!** 🚀
