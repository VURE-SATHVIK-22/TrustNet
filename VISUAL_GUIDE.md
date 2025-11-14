# TrustNet Visual Guide

## Image Locations & Themes

### Homepage Feature Section
Located at: `src/app/page.tsx` (lines 220-240)

#### Step 1: Input Analysis
- **Image**: Technology/Code workspace
- **URL**: `photo-1550751827-4bd374c3f58b`
- **Theme**: Clean desk with laptop and code
- **Purpose**: Represents the input and analysis phase

#### Step 2: AI Processing  
- **Image**: Programming/Development
- **URL**: `photo-1555949963-aa79dcee981c`
- **Theme**: Code on screens, development environment
- **Purpose**: Represents AI and machine learning processing

#### Step 3: Instant Results
- **Image**: Data Analytics/Charts
- **URL**: `photo-1551288049-bebda4e38f71`
- **Theme**: Dashboard with charts and analytics
- **Purpose**: Represents results, insights, and data visualization

## Icon Usage

### Lucide React Icons
All icons are from the Lucide React library (no image files needed):

**Security & Protection:**
- `Shield` - Main security icon
- `Lock` - Privacy and encryption
- `AlertTriangle` - Warnings and threats
- `XCircle` - Dangerous/Phishing

**AI & Technology:**
- `Brain` - AI and machine learning
- `Zap` - Speed and instant processing
- `Eye` - Visibility and transparency
- `Sparkles` - Advanced features

**Data & Analysis:**
- `BarChart3` - Statistics
- `TrendingUp` - Trends and growth
- `Target` - Accuracy
- `CheckCircle` - Safe/Verified

**Actions:**
- `Scan` - Scanning functionality
- `Upload` - File uploads
- `Download` - Export data
- `Play` - Try examples

## Color Scheme

### Status Colors
- **Safe**: Green (`text-green-600`, `bg-green-50`)
- **Suspicious**: Yellow (`text-yellow-600`, `bg-yellow-50`)
- **Dangerous**: Red (`text-red-600`, `bg-red-50`)
- **Info**: Blue (`text-blue-600`, `bg-blue-50`)

### Brand Colors
- **Primary**: Blue-600 to Indigo-600 gradient
- **Accent**: Purple-500 to Purple-600
- **Background**: White to Blue-50 gradient

## Component Visuals

### Hero Section
- Floating gradient orbs (blue, indigo, purple)
- Glass-morphism card with backdrop blur
- Animated text reveals
- Magnetic button effects

### Glass Cards
- Frosted glass effect with backdrop blur
- Gradient borders
- Hover animations with scale transforms
- Icon-based feature cards

### Timeline
- Radial orbital design
- Color-coded by status (completed, in-progress, pending)
- Animated connections between nodes
- Interactive hover states

### ML Dashboard
- Real-time statistics cards
- Progress bars with gradient fills
- Color-coded threat levels
- Animated counters

## No Local Images Needed

The project uses:
1. **External URLs**: Unsplash for feature images
2. **SVG Icons**: Lucide React icon library
3. **CSS Gradients**: For backgrounds and effects
4. **Animations**: GSAP and Framer Motion

**Result**: Zero local image files required in `public/images/`

## Performance Optimizations

1. **Lazy Loading**: All images use `loading="lazy"`
2. **Error Handling**: Fallback placeholders for failed loads
3. **Optimized URLs**: Unsplash with quality and size parameters
4. **Icon Library**: SVG icons load instantly, no HTTP requests
5. **Suspense Boundaries**: Heavy components lazy-loaded

## Accessibility

- All images have proper `alt` attributes
- Icons have descriptive labels
- Color contrast meets WCAG AA standards
- Focus states visible on interactive elements
- Screen reader friendly

---

**Last Updated**: November 14, 2025
**Status**: ✅ All visuals working correctly
