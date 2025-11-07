# 🎬 TrustNet Scroll Animations Guide

## Overview

TrustNet now features high-end, cinematic scroll-based motion effects powered by:
- **Lenis** - Buttery-smooth, physics-based scrolling
- **GSAP ScrollTrigger** - Professional scroll-triggered animations
- **Custom Cursor** - Premium magnetic cursor interactions
- **GPU Acceleration** - Optimized for 60fps performance

---

## 🚀 Features Implemented

### 1. Smooth Scrolling (Lenis)
- Inertia-based scrolling with natural physics
- Custom easing curves for premium feel
- Seamless integration with GSAP ScrollTrigger
- Optimized for both mouse wheel and trackpad

### 2. Scroll-Triggered Animations

#### Available Animation Attributes:

**Parallax Effects**
```html
<div data-parallax data-parallax-speed="0.5">
  <!-- Elements move at different speeds creating depth -->
</div>
```

**Fade & Scale**
```html
<div data-fade-scale>
  <!-- Smooth fade in with subtle scale -->
</div>
```

**Text Reveal**
```html
<h2 data-text-reveal>
  <!-- Lines animate in with 3D rotation -->
</h2>
```

**Word-by-Word Reveal**
```html
<h1 data-word-reveal>
  <!-- Each word animates individually -->
</h1>
```

**Image Reveal**
```html
<img data-image-reveal src="..." />
<!-- Clip-path reveal with scale -->
```

**Cards Stagger**
```html
<div data-cards-stagger>
  <div data-card>Card 1</div>
  <div data-card>Card 2</div>
  <div data-card>Card 3</div>
</div>
```

**Slide Animations**
```html
<div data-slide-left>Slides from left</div>
<div data-slide-right>Slides from right</div>
```

**Blur Fade**
```html
<div data-blur-fade>
  <!-- Fades in while removing blur -->
</div>
```

**Magnetic Elements**
```html
<button data-magnetic data-magnetic-strength="0.3">
  <!-- Follows cursor with magnetic effect -->
</button>
```

**Rotate on Scroll**
```html
<div data-rotate-scroll data-rotate-amount="360">
  <!-- Rotates as you scroll -->
</div>
```

**Animated Counters**
```html
<div data-counter data-counter-target="15847" data-counter-duration="2">
  0
</div>
```

### 3. Custom Cursor
- Smooth cursor follow with delay
- Interactive hover states
- Magnetic attraction to buttons/links
- Automatically disabled on touch devices

### 4. Scroll Progress Indicator
- Top progress bar showing scroll position
- Circular percentage indicator (bottom-right)
- Gradient styling matching brand colors

---

## 📝 Usage Examples

### Basic Section with Animations

```tsx
<section className="py-20">
  <div className="container mx-auto">
    <h2 data-word-reveal className="text-4xl font-bold mb-8">
      Amazing Features
    </h2>
    
    <div data-cards-stagger className="grid grid-cols-3 gap-6">
      <div data-card data-magnetic>
        <h3>Feature 1</h3>
        <p>Description</p>
      </div>
      <div data-card data-magnetic>
        <h3>Feature 2</h3>
        <p>Description</p>
      </div>
      <div data-card data-magnetic>
        <h3>Feature 3</h3>
        <p>Description</p>
      </div>
    </div>
  </div>
</section>
```

### Parallax Background

```tsx
<section className="relative">
  <div 
    data-parallax 
    data-parallax-speed="0.3"
    className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500"
  />
  <div className="relative z-10">
    {/* Content */}
  </div>
</section>
```

### Stats Counter

```tsx
<div className="grid grid-cols-4 gap-6" data-cards-stagger>
  <div data-card data-magnetic>
    <div 
      data-counter 
      data-counter-target="15847"
      className="text-4xl font-bold"
    >
      0
    </div>
    <p>Total Scans</p>
  </div>
</div>
```

---

## ⚙️ Configuration

### Smooth Scroll Settings

Edit `src/lib/smooth-scroll.ts`:

```typescript
this.lenis = new Lenis({
  duration: 1.2,        // Scroll duration (higher = slower)
  easing: (t) => ...,   // Custom easing function
  wheelMultiplier: 1,   // Mouse wheel sensitivity
  touchMultiplier: 2,   // Touch scroll sensitivity
})
```

### Animation Timing

Edit `src/lib/scroll-animations.ts`:

```typescript
// Adjust trigger points
scrollTrigger: {
  trigger: element,
  start: 'top 80%',    // When animation starts
  end: 'top 60%',      // When animation ends
  scrub: 1,            // Smooth scrubbing (0-3)
  toggleActions: 'play none none reverse',
}
```

---

## 🎨 Styling

All animation styles are in `src/app/globals.css`:

- Smooth scroll styles
- Animation attribute styles
- Custom cursor styles
- GPU acceleration optimizations
- Accessibility (reduced motion support)

---

## 🔧 Performance Optimization

### Already Implemented:

1. **GPU Acceleration**
   - `transform: translateZ(0)`
   - `backface-visibility: hidden`
   - `will-change` properties

2. **Lazy Loading**
   - Heavy components load on demand
   - Animations initialize after content loads

3. **Mobile Optimization**
   - Parallax disabled on mobile
   - Magnetic effects disabled on touch
   - Blur effects reduced on mobile

4. **Accessibility**
   - Respects `prefers-reduced-motion`
   - All animations can be disabled
   - Keyboard navigation maintained

---

## 🎯 Best Practices

### DO:
✅ Use `data-fade-scale` for general content
✅ Use `data-cards-stagger` for card grids
✅ Use `data-parallax` sparingly for depth
✅ Use `data-magnetic` on interactive elements
✅ Test on different devices and browsers

### DON'T:
❌ Overuse parallax (causes motion sickness)
❌ Animate too many elements at once
❌ Use heavy blur effects on large elements
❌ Forget to test with reduced motion settings
❌ Nest too many animated elements

---

## 🐛 Troubleshooting

### Animations not working?

1. Check if ScrollAnimations is initialized:
   ```typescript
   ScrollAnimations.initAll()
   ```

2. Verify element has correct attribute:
   ```html
   <div data-fade-scale>Content</div>
   ```

3. Check browser console for errors

4. Refresh ScrollTrigger:
   ```typescript
   ScrollAnimations.refresh()
   ```

### Smooth scroll not smooth?

1. Check Lenis initialization:
   ```typescript
   SmoothScroll.initialize()
   ```

2. Verify no conflicting CSS:
   ```css
   html { scroll-behavior: auto; }
   ```

3. Check for JavaScript errors blocking execution

### Custom cursor not showing?

1. Only works on devices with mouse (not touch)
2. Check if `CustomCursor` component is rendered
3. Verify CSS is loaded (check `.custom-cursor` styles)

---

## 📱 Mobile Considerations

Automatically handled:
- Parallax effects disabled
- Magnetic interactions disabled
- Blur effects reduced
- Custom cursor hidden
- Touch-optimized scrolling

---

## 🎬 Animation Timeline

1. **Page Load** (0-4.5s)
   - Preloader animation
   - Content fade in

2. **Initial View** (4.5-6s)
   - Hero text reveal
   - Card animations
   - Smooth scroll activation

3. **On Scroll**
   - Section transitions
   - Parallax movements
   - Counter animations
   - Image reveals

---

## 🔄 Cleanup

Animations are automatically cleaned up on:
- Component unmount
- Page navigation
- Route changes

Manual cleanup:
```typescript
SmoothScroll.destroy()
ScrollAnimations.cleanup()
```

---

## 🎨 Customization

### Add New Animation Type

1. Add to `scroll-animations.ts`:
```typescript
static initMyAnimation() {
  const elements = gsap.utils.toArray('[data-my-animation]')
  elements.forEach((element: any) => {
    gsap.fromTo(element, {...}, {...})
  })
}
```

2. Call in `initAll()`:
```typescript
static initAll() {
  // ... existing
  this.initMyAnimation()
}
```

3. Use in components:
```html
<div data-my-animation>Content</div>
```

---

## 📊 Performance Metrics

Target Performance:
- **60 FPS** during scroll
- **< 100ms** animation start
- **< 50ms** interaction response
- **< 5% CPU** idle state

Monitor with:
```javascript
// Chrome DevTools > Performance
// Check for dropped frames
// Monitor CPU usage
```

---

## 🌟 Examples in TrustNet

1. **Hero Section** - Word reveal, parallax backgrounds
2. **Stats Section** - Counter animations, magnetic cards
3. **Features Section** - Card stagger, slide animations
4. **Timeline** - Scroll-triggered reveals
5. **ML Dashboard** - Blur fade, image reveals

---

## 📚 Resources

- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [Web Animation Best Practices](https://web.dev/animations/)

---

## 🎉 Result

Your TrustNet website now has:
- ✨ Buttery-smooth scrolling
- 🎬 Cinematic section transitions
- 🎯 Premium cursor interactions
- 📊 Animated statistics
- 🚀 60fps performance
- ♿ Full accessibility support

Enjoy the award-winning scroll experience! 🏆
