# 🎨 Animation Attributes - Quick Reference Card

## 📋 Copy-Paste Ready Attributes

### Basic Animations

```html
<!-- Fade in with scale -->
<div data-fade-scale>Content</div>

<!-- Slide from left -->
<div data-slide-left>Content</div>

<!-- Slide from right -->
<div data-slide-right>Content</div>

<!-- Blur fade in -->
<div data-blur-fade>Content</div>
```

---

### Text Animations

```html
<!-- Word-by-word reveal -->
<h1 data-word-reveal>Amazing Title Here</h1>

<!-- Line-by-line reveal -->
<div data-text-reveal>
  <p>First paragraph</p>
  <p>Second paragraph</p>
</div>
```

---

### Parallax Effects

```html
<!-- Slow parallax -->
<div data-parallax data-parallax-speed="0.2">Background</div>

<!-- Medium parallax -->
<div data-parallax data-parallax-speed="0.5">Background</div>

<!-- Fast parallax -->
<div data-parallax data-parallax-speed="0.8">Background</div>
```

---

### Card Animations

```html
<!-- Card grid with stagger -->
<div data-cards-stagger class="grid grid-cols-3 gap-6">
  <div data-card>Card 1</div>
  <div data-card>Card 2</div>
  <div data-card>Card 3</div>
</div>

<!-- Card with magnetic effect -->
<div data-card data-magnetic data-magnetic-strength="0.3">
  Interactive Card
</div>
```

---

### Interactive Elements

```html
<!-- Magnetic button (subtle) -->
<button data-magnetic data-magnetic-strength="0.2">
  Click Me
</button>

<!-- Magnetic button (strong) -->
<button data-magnetic data-magnetic-strength="0.5">
  Click Me
</button>

<!-- Rotating icon -->
<div data-rotate-scroll data-rotate-amount="360">
  <Icon />
</div>
```

---

### Counters

```html
<!-- Basic counter -->
<div data-counter data-counter-target="1000">0</div>

<!-- Counter with custom duration -->
<div data-counter data-counter-target="15847" data-counter-duration="3">
  0
</div>

<!-- Counter in stats card -->
<div data-card>
  <div data-counter data-counter-target="99">0</div>
  <p>Success Rate</p>
</div>
```

---

### Image Reveals

```html
<!-- Image with clip-path reveal -->
<div data-image-reveal class="rounded-lg overflow-hidden">
  <img src="image.jpg" alt="Description" />
</div>

<!-- Image with parallax -->
<div class="relative h-96">
  <img 
    data-parallax 
    data-parallax-speed="0.3"
    src="background.jpg" 
    class="absolute inset-0 w-full h-full object-cover"
  />
</div>
```

---

### Section Layouts

```html
<!-- Full section with animations -->
<section class="py-20">
  <div class="container mx-auto">
    <h2 data-word-reveal class="text-4xl font-bold mb-8">
      Section Title
    </h2>
    
    <p data-fade-scale class="text-lg mb-12">
      Description text
    </p>
    
    <div data-cards-stagger class="grid grid-cols-3 gap-6">
      <div data-card data-magnetic>Feature 1</div>
      <div data-card data-magnetic>Feature 2</div>
      <div data-card data-magnetic>Feature 3</div>
    </div>
  </div>
</section>
```

---

### Hero Section Pattern

```html
<section class="relative min-h-screen">
  <!-- Parallax background -->
  <div data-parallax data-parallax-speed="0.3" 
       class="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500">
  </div>
  
  <!-- Content -->
  <div class="relative z-10 container mx-auto">
    <h1 data-word-reveal class="text-6xl font-bold">
      Amazing Hero Title
    </h1>
    
    <p data-fade-scale class="text-xl">
      Subtitle text
    </p>
    
    <button data-magnetic data-magnetic-strength="0.3">
      Get Started
    </button>
  </div>
</section>
```

---

### Stats Section Pattern

```html
<section class="py-20">
  <div data-cards-stagger class="grid grid-cols-4 gap-6">
    <div data-card data-magnetic>
      <div data-counter data-counter-target="15847" 
           class="text-4xl font-bold">
        0
      </div>
      <p>Total Scans</p>
    </div>
    
    <div data-card data-magnetic>
      <div data-counter data-counter-target="2341" 
           class="text-4xl font-bold">
        0
      </div>
      <p>Threats Blocked</p>
    </div>
    
    <!-- More stats... -->
  </div>
</section>
```

---

### Feature Cards Pattern

```html
<div data-cards-stagger class="grid grid-cols-3 gap-8">
  <div data-card data-magnetic data-magnetic-strength="0.2"
       class="p-8 bg-white rounded-xl shadow-lg">
    <div data-rotate-scroll data-rotate-amount="15"
         class="w-16 h-16 bg-blue-500 rounded-lg mb-4">
      <Icon />
    </div>
    <h3 class="text-2xl font-bold mb-3">Feature Title</h3>
    <p>Feature description</p>
  </div>
  
  <!-- More cards... -->
</div>
```

---

### Timeline Pattern

```html
<div class="space-y-12">
  <div data-slide-left class="flex gap-6">
    <div class="w-1/2">
      <h3 class="text-2xl font-bold">Step 1</h3>
      <p>Description</p>
    </div>
    <div data-image-reveal class="w-1/2">
      <img src="step1.jpg" />
    </div>
  </div>
  
  <div data-slide-right class="flex gap-6">
    <div data-image-reveal class="w-1/2">
      <img src="step2.jpg" />
    </div>
    <div class="w-1/2">
      <h3 class="text-2xl font-bold">Step 2</h3>
      <p>Description</p>
    </div>
  </div>
</div>
```

---

## 🎯 Combination Patterns

### Premium Card
```html
<div data-card 
     data-magnetic 
     data-magnetic-strength="0.3"
     class="p-8 bg-white rounded-xl">
  <div data-rotate-scroll data-rotate-amount="15">
    <Icon />
  </div>
  <h3>Title</h3>
  <p>Description</p>
</div>
```

### Animated Stat
```html
<div data-card data-magnetic>
  <div data-counter 
       data-counter-target="99" 
       data-counter-duration="2"
       class="text-5xl font-bold">
    0
  </div>
  <p>Label</p>
</div>
```

### Hero CTA
```html
<div data-fade-scale>
  <button data-magnetic 
          data-magnetic-strength="0.4"
          class="px-8 py-4 bg-blue-600 text-white rounded-lg">
    Get Started
  </button>
</div>
```

---

## 📊 Speed Reference

### Parallax Speeds
- `0.1-0.2` - Very slow (subtle depth)
- `0.3-0.4` - Medium (noticeable)
- `0.5-0.7` - Fast (dramatic)
- `0.8-1.0` - Very fast (extreme)

### Magnetic Strengths
- `0.1-0.2` - Subtle (professional)
- `0.3-0.4` - Medium (noticeable)
- `0.5+` - Strong (playful)

### Counter Durations
- `1s` - Fast count
- `2s` - Standard (recommended)
- `3s+` - Slow, dramatic

---

## ✅ Best Practices

### DO ✓
```html
<!-- Good: Subtle, professional -->
<div data-fade-scale>
  <h2 data-word-reveal>Title</h2>
  <div data-cards-stagger>
    <div data-card data-magnetic>Card</div>
  </div>
</div>
```

### DON'T ✗
```html
<!-- Bad: Too many effects -->
<div data-fade-scale data-blur-fade data-slide-left>
  <h2 data-word-reveal data-text-reveal>Title</h2>
  <div data-cards-stagger data-parallax>
    <div data-card data-magnetic data-rotate-scroll>Card</div>
  </div>
</div>
```

---

## 🎨 Common Combinations

| Use Case | Attributes |
|----------|-----------|
| Hero Title | `data-word-reveal` |
| Hero Subtitle | `data-fade-scale` |
| Hero Button | `data-magnetic` |
| Feature Cards | `data-cards-stagger` + `data-card` + `data-magnetic` |
| Stats | `data-card` + `data-counter` |
| Background | `data-parallax` |
| Images | `data-image-reveal` |
| Icons | `data-rotate-scroll` |
| Sections | `data-fade-scale` or `data-blur-fade` |

---

## 🚀 Quick Start Template

```html
<!DOCTYPE html>
<html>
<body>
  <!-- Hero -->
  <section class="hero">
    <h1 data-word-reveal>Title</h1>
    <p data-fade-scale>Subtitle</p>
    <button data-magnetic>CTA</button>
  </section>
  
  <!-- Features -->
  <section>
    <div data-cards-stagger>
      <div data-card data-magnetic>Feature 1</div>
      <div data-card data-magnetic>Feature 2</div>
      <div data-card data-magnetic>Feature 3</div>
    </div>
  </section>
  
  <!-- Stats -->
  <section>
    <div data-cards-stagger>
      <div data-card>
        <div data-counter data-counter-target="1000">0</div>
        <p>Stat Label</p>
      </div>
    </div>
  </section>
</body>
</html>
```

---

## 📱 Mobile Considerations

These attributes automatically optimize for mobile:
- ✅ `data-parallax` - Disabled on mobile
- ✅ `data-magnetic` - Disabled on touch
- ✅ `data-blur-fade` - Reduced on mobile
- ✅ All others - Work on all devices

---

## 🎯 Performance Tips

1. **Limit parallax** - Max 3-4 elements per page
2. **Avoid blur on large elements** - Use on small elements only
3. **Don't nest animations** - One animation per element
4. **Use magnetic sparingly** - Only on key interactive elements
5. **Test on mobile** - Always verify performance

---

**Copy, paste, and customize! 🎨**
