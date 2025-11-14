# 🔧 TrustNet - Troubleshooting Guide

## ✅ Server is Running!

Your dev server is now running at:
- **Local**: http://localhost:3001
- **Network**: http://192.168.0.105:3001

---

## 🐛 Common Issues & Fixes

### Issue: "Internal Server Error"

#### Fix 1: Remove SplitText Plugin
The issue was caused by GSAP's SplitText plugin (premium feature).

**Already Fixed!** ✅
- Removed SplitText import
- Using standard GSAP plugins only

#### Fix 2: Clear Next.js Cache
```bash
# Stop the server (Ctrl+C)
# Then run:
Remove-Item -Recurse -Force .next
npm run dev
```

#### Fix 3: Reinstall Dependencies
```bash
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

---

### Issue: "Port Already in Use"

**Current Status**: Server running on port 3001 (3000 was busy)

#### To Use Port 3000:
```bash
# Find and kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Restart server
npm run dev
```

---

### Issue: "Lock File Error"

```bash
# Remove lock file
Remove-Item -Path ".next\dev\lock" -Force

# Restart server
npm run dev
```

---

### Issue: Cursor Not Showing

#### Check 1: Desktop Only
- Custom cursor only works on desktop (not mobile/touch)
- Check if you're using a mouse (not trackpad in touch mode)

#### Check 2: Browser Cache
```bash
# Clear cache
Ctrl + Shift + Delete (in browser)
# Or hard reload
Ctrl + Shift + R
```

#### Check 3: Console Errors
- Open DevTools (F12)
- Check Console tab for errors
- Look for cursor-related errors

---

### Issue: Animations Not Working

#### Fix 1: Refresh ScrollTrigger
Open browser console and run:
```javascript
ScrollTrigger.refresh()
```

#### Fix 2: Check Data Attributes
Make sure elements have correct attributes:
```html
<div data-fade-scale>Content</div>
<h1 data-word-reveal>Title</h1>
```

#### Fix 3: Wait for Page Load
Animations initialize after preloader (4.5 seconds)

---

### Issue: Smooth Scroll Not Smooth

#### Fix 1: Check Lenis Installation
```bash
npm list lenis
# Should show: lenis@1.x.x
```

#### Fix 2: Reinstall Lenis
```bash
npm uninstall lenis
npm install lenis
npm run dev
```

#### Fix 3: Check Browser
- Works best in Chrome/Edge
- Firefox and Safari also supported
- Clear cache if issues persist

---

## 🔍 Debugging Steps

### 1. Check Server Status
```bash
# Server should show:
✓ Ready in X.Xs
```

### 2. Check Browser Console
- Open DevTools (F12)
- Look for errors in Console
- Check Network tab for failed requests

### 3. Check File Changes
```bash
# If files were auto-formatted, re-read them
# Kiro IDE may have updated:
- src/components/custom-cursor.tsx
- src/app/globals.css
- src/lib/scroll-animations.ts
```

### 4. Verify Build
```bash
npm run build
# Should complete without errors
```

---

## 🚀 Quick Fixes

### Reset Everything
```bash
# Stop server (Ctrl+C)
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

### Clear Browser Data
1. Open DevTools (F12)
2. Right-click Refresh button
3. Select "Empty Cache and Hard Reload"

### Restart Dev Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## ✅ Current Status

### What's Working
- ✅ Dev server running on port 3001
- ✅ No TypeScript errors
- ✅ Build successful
- ✅ All animations configured
- ✅ Enhanced cursor ready

### What Was Fixed
- ✅ Removed SplitText plugin (premium)
- ✅ Cleared lock file
- ✅ Server restarted successfully

---

## 🎯 Test Your Site

### 1. Homepage
Visit: http://localhost:3001
- Should load without errors
- Smooth scrolling active
- Animations trigger on scroll

### 2. Cursor Demo
Visit: http://localhost:3001/cursor-demo
- Custom cursor visible (desktop only)
- Hover effects working
- Click animations active

### 3. Other Pages
- /dashboard
- /demo
- /scan/email
- /scan/link

---

## 📊 Performance Check

### Browser DevTools
1. Open DevTools (F12)
2. Go to Performance tab
3. Record while scrolling
4. Check for:
   - 60fps maintained
   - No dropped frames
   - Smooth animations

### Console Messages
Should see:
```
✨ Smooth scroll initialized
🎬 Scroll animations initialized
```

---

## 🆘 Still Having Issues?

### Check These Files
1. `src/lib/scroll-animations.ts` - No SplitText import
2. `src/components/custom-cursor.tsx` - No syntax errors
3. `src/app/globals.css` - Cursor styles present

### Verify Installation
```bash
npm list gsap
npm list lenis
npm list framer-motion
```

### Check Node Version
```bash
node --version
# Should be v18+ or v20+
```

---

## 🎉 Success Checklist

- [ ] Server running without errors
- [ ] Homepage loads correctly
- [ ] Smooth scrolling works
- [ ] Animations trigger on scroll
- [ ] Custom cursor visible (desktop)
- [ ] No console errors
- [ ] Build completes successfully

---

## 📞 Quick Commands

```bash
# Start server
npm run dev

# Build for production
npm run build

# Clear cache
Remove-Item -Recurse -Force .next

# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install

# Check for errors
npm run build
```

---

## 🎯 Current Server Info

**URL**: http://localhost:3001
**Status**: ✅ Running
**Port**: 3001 (3000 was in use)
**Ready**: Yes

**Open your browser and visit the URL above!** 🚀

---

**Last Updated**: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
**Status**: ✅ All Issues Resolved
