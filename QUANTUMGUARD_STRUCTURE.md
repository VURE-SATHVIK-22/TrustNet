# QuantumGuard System Architecture

## 🏗️ Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                        TrustNet Website                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─── Navbar (Modified)
                              │    └─── QuantumGuard Dropdown
                              │         ├─── Trust Score Analyzer
                              │         ├─── Identity Checker
                              │         ├─── UPI Scanner
                              │         ├─── Message Analyzer
                              │         └─── Screenshot Checker
                              │
                              ├─── Homepage (Modified)
                              │    └─── QuantumGuardSection
                              │         ├─── Wavy Title Animation
                              │         ├─── Unique Features Grid
                              │         ├─── Feature Cards (5)
                              │         └─── CTA Button
                              │
                              └─── QuantumGuard Pages
                                   │
                                   ├─── /quantumguard/trust-score
                                   │    └─── QuantumGuardLayout
                                   │         ├─── Hero Section
                                   │         ├─── Input Form
                                   │         ├─── Trust Score Display
                                   │         ├─── Factor Analysis
                                   │         └─── Recommendations
                                   │
                                   ├─── /quantumguard/identity-checker
                                   │    └─── QuantumGuardLayout
                                   │         ├─── Hero Section
                                   │         ├─── Multi-Input Form
                                   │         ├─── Risk Assessment
                                   │         ├─── Warnings
                                   │         └─── Recommendations
                                   │
                                   ├─── /quantumguard/upi-scanner
                                   │    └─── QuantumGuardLayout
                                   │         ├─── Hero Section
                                   │         ├─── UPI Input
                                   │         ├─── Trust Score
                                   │         ├─── Issues Detected
                                   │         └─── Safety Tips
                                   │
                                   ├─── /quantumguard/message-analyzer
                                   │    └─── QuantumGuardLayout
                                   │         ├─── Hero Section
                                   │         ├─── Message Input
                                   │         ├─── Scam Probability
                                   │         ├─── Manipulation Tactics
                                   │         ├─── Psychology Analysis
                                   │         └─── Recommendations
                                   │
                                   └─── /quantumguard/screenshot-checker
                                        └─── QuantumGuardLayout
                                             ├─── Hero Section
                                             ├─── Image Upload
                                             ├─── Authenticity Score
                                             ├─── Technical Analysis
                                             ├─── Issues Detected
                                             └─── Recommendations
```

## 📦 Component Hierarchy

```
src/
├── app/
│   ├── page.tsx
│   │   └── Uses: QuantumGuardSection
│   │
│   └── quantumguard/
│       ├── trust-score/page.tsx
│       ├── identity-checker/page.tsx
│       ├── upi-scanner/page.tsx
│       ├── message-analyzer/page.tsx
│       └── screenshot-checker/page.tsx
│           └── All use: QuantumGuardLayout
│
└── components/
    ├── Navbar.tsx (Modified)
    │   └── Includes: QuantumGuard Dropdown
    │
    ├── QuantumGuardSection.tsx
    │   └── Uses: WavyBlock, WavyBlockItem
    │
    ├── quantumguard/
    │   └── QuantumGuardLayout.tsx
    │       └── Shared layout for all pages
    │
    └── ui/
        ├── glowing-effect.tsx
        │   └── Interactive glow animations
        │
        └── wavy-text-block.tsx
            └── Scroll-based wavy text
```

## 🔄 Data Flow

```
User Input
    │
    ├─── Trust Score Analyzer
    │    ├─── Validate Format
    │    ├─── Analyze Patterns
    │    ├─── Calculate Score (0-100)
    │    ├─── Determine Risk Level
    │    ├─── Generate Factors
    │    └─── Display Results
    │
    ├─── Identity Checker
    │    ├─── Detect Type (Email/Phone/Username)
    │    ├─── Validate Format
    │    ├─── Check Patterns
    │    ├─── Calculate Risk (%)
    │    ├─── Generate Warnings
    │    └─── Display Results
    │
    ├─── UPI Scanner
    │    ├─── Validate UPI Format
    │    ├─── Check Provider
    │    ├─── Detect Patterns
    │    ├─── Calculate Trust Score
    │    ├─── Identify Issues
    │    └─── Display Results
    │
    ├─── Message Analyzer
    │    ├─── NLP Analysis
    │    ├─── Detect Keywords
    │    ├─── Calculate Psychology Scores
    │    ├─── Identify Tactics
    │    ├─── Calculate Scam Probability
    │    └─── Display Results
    │
    └─── Screenshot Checker
         ├─── Read File Properties
         ├─── Analyze Metadata
         ├─── Check Resolution
         ├─── Detect Artifacts
         ├─── Calculate Authenticity
         └─── Display Results
```

## 🎨 UI Component Tree

```
QuantumGuardLayout
├── Hero Section
│   ├── Animated Background
│   │   ├── Blur Circle 1
│   │   ├── Blur Circle 2
│   │   └── Blur Circle 3
│   │
│   ├── Badge
│   │   ├── Shield Icon
│   │   ├── "QuantumGuard AI" Text
│   │   └── Sparkles Icon
│   │
│   ├── Title (Gradient)
│   ├── Description
│   │
│   └── Info Card
│       ├── "What is QuantumGuard?"
│       ├── Description
│       └── Feature Grid
│           ├── What's Unique
│           ├── What You Get
│           └── Why Advanced
│
└── Main Content (Children)
    └── Page-Specific Content
        ├── Input Section
        │   ├── Form Fields
        │   └── Submit Button
        │
        └── Results Section
            ├── Score Display
            ├── Visual Indicators
            ├── Detailed Analysis
            └── Recommendations
```

## 🎯 Feature Matrix

| Feature | Trust Score | Identity | UPI | Message | Screenshot |
|---------|------------|----------|-----|---------|------------|
| Input Type | Any | Email/Phone/Username | UPI ID | Text | Image |
| Score Type | 0-100 | Risk % | 0-100 | Scam % | 0-100 |
| Risk Levels | 5 | 3 | 3 | 4 | 3 |
| Analysis Depth | Multi-factor | Format + Pattern | Format + Provider | NLP + Psychology | Metadata + Visual |
| Recommendations | ✅ | ✅ | ✅ | ✅ | ✅ |
| Visual Progress | ✅ | ✅ | ✅ | ✅ | ✅ |
| Color Coding | ✅ | ✅ | ✅ | ✅ | ✅ |
| Animations | ✅ | ✅ | ✅ | ✅ | ✅ |

## 🔐 Security Analysis Flow

```
Input Received
    │
    ├─── Sanitization
    │    └─── Remove malicious code
    │
    ├─── Validation
    │    └─── Check format
    │
    ├─── Pattern Analysis
    │    ├─── Known threats
    │    ├─── Suspicious patterns
    │    └─── Anomaly detection
    │
    ├─── Risk Calculation
    │    ├─── Base score
    │    ├─── Factor adjustments
    │    └─── Final score
    │
    ├─── Explanation Generation
    │    ├─── Identify factors
    │    ├─── Generate descriptions
    │    └─── Create recommendations
    │
    └─── Result Display
         ├─── Visual score
         ├─── Risk level
         ├─── Detailed analysis
         └─── Action items
```

## 🎭 Animation Layers

```
Page Load
    │
    ├─── Hero Section
    │    ├─── Fade in (0.6s)
    │    ├─── Slide up (0.6s)
    │    └─── Stagger children (0.1s each)
    │
    ├─── Input Section
    │    ├─── Fade in (0.6s, delay 0.6s)
    │    └─── Scale up (0.3s)
    │
    └─── Results Section
         ├─── Scale up (0.5s)
         ├─── Progress bar (1s)
         ├─── Stagger items (0.1s each)
         └─── Hover effects (0.3s)

Interactions
    │
    ├─── Button Hover
    │    ├─── Scale (1.05)
    │    └─── Glow effect
    │
    ├─── Card Hover
    │    ├─── Translate Y (-4px)
    │    ├─── Scale (1.05)
    │    └─── Shadow increase
    │
    └─── Input Focus
         ├─── Ring (2px)
         └─── Border color change
```

## 📱 Responsive Breakpoints

```
Mobile (< 768px)
├── Single column layout
├── Stacked cards
├── Full-width inputs
└── Simplified animations

Tablet (768px - 1024px)
├── Two column grid
├── Side-by-side cards
├── Optimized spacing
└── Full animations

Desktop (> 1024px)
├── Three column grid
├── Maximum width containers
├── Enhanced spacing
└── All animations enabled
```

## 🚀 Performance Optimization

```
Build Process
    │
    ├─── Code Splitting
    │    ├─── Route-based
    │    ├─── Component-based
    │    └─── Dynamic imports
    │
    ├─── Tree Shaking
    │    ├─── Remove unused code
    │    └─── Optimize imports
    │
    ├─── Minification
    │    ├─── JavaScript
    │    ├─── CSS
    │    └─── HTML
    │
    └─── Static Generation
         ├─── Pre-render pages
         ├─── Optimize images
         └─── Generate metadata
```

## 🎨 Design System

```
Colors
├── Primary: Blue (600-700)
├── Secondary: Indigo (600-700)
├── Accent: Purple (600-700)
├── Success: Green (500-600)
├── Warning: Yellow (500-600)
└── Danger: Red (500-600)

Typography
├── Headings: Bold, Gradient
├── Body: Regular, Gray-700
├── Labels: Medium, Gray-600
└── Captions: Regular, Gray-500

Spacing
├── Container: max-w-4xl
├── Section: py-20
├── Card: p-8
└── Gap: space-y-6

Effects
├── Glassmorphism: bg-white/80 backdrop-blur-sm
├── Shadows: shadow-xl
├── Borders: border border-blue-100
└── Gradients: from-blue-600 to-indigo-600
```

---

This architecture ensures:
- ✅ Scalability
- ✅ Maintainability
- ✅ Performance
- ✅ Consistency
- ✅ User Experience
