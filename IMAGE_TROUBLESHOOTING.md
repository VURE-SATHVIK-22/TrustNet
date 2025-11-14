# Image Troubleshooting Guide

## Common Issues & Solutions

### Issue 1: Images Not Loading
**Symptoms**: Blank spaces where images should be, or placeholder text showing

**Solutions**:
1. **Check Internet Connection**: Unsplash images require internet access
   ```bash
   # Test connectivity
   ping images.unsplash.com
   ```

2. **Check Browser Console**: Look for CORS or network errors
   - Open DevTools (F12)
   - Go to Console tab
   - Look for red error messages

3. **Verify URLs**: Ensure Unsplash URLs are correct
   - Current URLs in `src/app/page.tsx` lines 220-240
   - Should start with `https://images.unsplash.com/`

4. **Clear Browser Cache**:
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Edge: Ctrl+Shift+Delete

### Issue 2: Images Load Slowly
**Symptoms**: Long wait time before images appear

**Solutions**:
1. **Check Network Speed**: Slow connection affects image loading
2. **Verify Image Parameters**: URLs should include:
   - `q=80` (quality)
   - `w=2070` (width)
   - `auto=format` (optimization)
   - `fit=crop` (proper sizing)

3. **Enable Lazy Loading**: Already implemented in code
   ```tsx
   loading="lazy"
   ```

### Issue 3: Broken Image Icons
**Symptoms**: 🖼️ icon or "broken image" symbol

**Solutions**:
1. **Fallback is Working**: The component has error handling
2. **Check Unsplash Status**: Visit https://status.unsplash.com
3. **Use Alternative URLs**: See IMAGE_UPDATES.md for backup URLs

### Issue 4: Images Don't Match Theme
**Symptoms**: Images look out of place or irrelevant

**Solutions**:
1. **Replace with Better Images**: 
   - Go to https://unsplash.com
   - Search: "cybersecurity", "artificial intelligence", "data security"
   - Copy image URL
   - Update in `src/app/page.tsx`

2. **Example Replacement**:
   ```tsx
   // Old
   image: 'https://images.unsplash.com/photo-OLD-ID'
   
   // New
   image: 'https://images.unsplash.com/photo-NEW-ID?q=80&w=2070&auto=format&fit=crop'
   ```

## Quick Fixes

### Fix 1: Replace All Images at Once
```tsx
// In src/app/page.tsx, update the trustnetFeatures array:

const trustnetFeatures = [
  {
    step: 'Step 1',
    title: 'Input Analysis',
    content: '...',
    image: 'YOUR_NEW_IMAGE_URL_1'
  },
  {
    step: 'Step 2',
    title: 'AI Processing',
    content: '...',
    image: 'YOUR_NEW_IMAGE_URL_2'
  },
  {
    step: 'Step 3',
    title: 'Instant Results',
    content: '...',
    image: 'YOUR_NEW_IMAGE_URL_3'
  }
]
```

### Fix 2: Use Local Images Instead
If you prefer local images:

1. **Add images to public folder**:
   ```
   trustnet/public/images/
   ├── step1.jpg
   ├── step2.jpg
   └── step3.jpg
   ```

2. **Update image paths**:
   ```tsx
   image: '/images/step1.jpg'
   image: '/images/step2.jpg'
   image: '/images/step3.jpg'
   ```

3. **Recommended image specs**:
   - Format: JPG or WebP
   - Size: 2000x1000px
   - Quality: 80%
   - Max file size: 500KB each

### Fix 3: Disable Images Temporarily
If images are causing issues, you can hide them:

```tsx
// In src/components/ui/feature-section.tsx
// Add this style to the image container:
style={{ display: 'none' }}
```

## Verification Checklist

After making changes, verify:

- [ ] Images load on homepage
- [ ] No console errors
- [ ] Images are relevant to content
- [ ] Loading is smooth (no flickering)
- [ ] Fallback works if image fails
- [ ] Mobile view looks good
- [ ] Images auto-rotate every 5 seconds

## Testing Commands

```bash
# Start development server
cd trustnet
npm run dev

# Open in browser
# Navigate to: http://localhost:3000

# Check specific section
# Scroll to "How TrustNet Protects You"

# Test image loading
# Open DevTools > Network tab
# Filter by "Img"
# Refresh page
# Verify images load successfully
```

## Getting Help

If issues persist:

1. **Check Documentation**:
   - IMAGE_UPDATES.md - What was changed
   - VISUAL_GUIDE.md - Where images are used

2. **Verify File Integrity**:
   ```bash
   # Check if files exist
   ls src/app/page.tsx
   ls src/components/ui/feature-section.tsx
   ```

3. **Check for Syntax Errors**:
   ```bash
   npm run build
   ```

4. **Review Recent Changes**:
   - Check git history
   - Compare with working version

## Emergency Rollback

If you need to revert changes:

```bash
# Using git
git checkout HEAD~1 src/app/page.tsx

# Or restore from backup
# Copy from IMAGE_UPDATES.md backup section
```

## Contact & Support

For additional help:
- Review project documentation
- Check console for specific error messages
- Test in different browsers
- Verify network connectivity

---

**Last Updated**: November 14, 2025
**Status**: ✅ All known issues documented
