# QuantumGuard - Digital Trust Score System

## Overview

QuantumGuard is an advanced AI-powered system integrated into TrustNet that provides a **Digital Trust Score (0-100)** for any digital identity. Think of it as a "CIBIL score for online safety."

## Features

### 1. Digital Trust Score Analyzer
**Route:** `/quantumguard/trust-score`

Analyze any digital identity and get an instant trust score:
- URLs and web links
- Email addresses
- Phone numbers
- Social media usernames
- UPI IDs
- Any online identifier

**Key Features:**
- 0-100 trust score with visual indicators
- Risk level classification (Safe, Low Risk, Medium Risk, High Risk, Critical)
- Detailed factor analysis showing positive and negative indicators
- Comprehensive explanations for each score

### 2. Identity Checker
**Route:** `/quantumguard/identity-checker`

Verify the authenticity of:
- Email addresses
- Phone numbers
- Social media usernames

**Analysis Includes:**
- Format validation
- Risk probability calculation
- Security warnings for suspicious patterns
- Actionable recommendations

### 3. UPI / Payment Risk Scanner
**Route:** `/quantumguard/upi-scanner`

Scan UPI IDs before making payments:
- Format validation
- Suspicious pattern detection
- Provider verification
- Trust score calculation

**Detects:**
- Invalid UPI formats
- Auto-generated account patterns
- Unknown payment providers
- Unusual character usage

### 4. WhatsApp / SMS Scam Analyzer
**Route:** `/quantumguard/message-analyzer`

Advanced NLP-based scam detection for messages:
- Psychological manipulation detection
- Scam probability scoring
- Manipulation level assessment

**Detects:**
- Urgency manipulation
- Fear tactics
- False authority claims
- Greed exploitation
- Information phishing attempts

**Psychology Analysis:**
- Urgency score
- Fear score
- Authority score
- Greed score
- Social proof score

### 5. Screenshot Authenticity Checker
**Route:** `/quantumguard/screenshot-checker`

Verify if screenshots are genuine or manipulated:
- Metadata analysis
- Compression pattern detection
- Visual artifact identification
- Resolution verification

**Technical Analysis:**
- Metadata presence/absence
- Image resolution
- Compression artifacts
- File properties

## What Makes QuantumGuard Unique

### 1. Universal Coverage
First system to provide a universal Digital Trust Score (0-100) across ALL types of digital identities - not just URLs or emails.

### 2. Psychology Detection
Advanced AI that detects psychological manipulation patterns:
- Urgency tactics
- Fear-based manipulation
- Authority impersonation
- Greed exploitation
- Social proof manipulation

### 3. Multi-Layer AI Analysis
Uses sophisticated machine learning with 50+ feature analysis:
- Pattern recognition
- Behavioral analysis
- Historical data comparison
- Real-time threat intelligence

### 4. Simple Explanations
Complex AI analysis presented in easy-to-understand language with actionable recommendations.

### 5. All-in-One Platform
Single platform for checking:
- Links
- Emails
- Phone numbers
- UPI IDs
- Messages
- Screenshots

## User Benefits

✅ **More Accurate Fraud Detection** - Multi-layer AI analysis catches threats others miss

✅ **Simple Explanations** - No technical jargon, just clear guidance

✅ **All-in-One Safety Checker** - One platform for all digital identity verification

✅ **Protection from Online Scams** - Proactive defense against phishing, fraud, and manipulation

✅ **Peace of Mind** - Verify before you click, pay, or respond

## Navigation

QuantumGuard is accessible through:

1. **Navbar Dropdown** - "QuantumGuard" menu with all 5 tools
2. **Homepage Section** - Dedicated section with feature cards
3. **Direct URLs** - All pages accessible via `/quantumguard/*` routes

## Design Features

### Modern UI/UX
- Glassmorphism cards with backdrop blur
- Smooth Framer Motion animations
- Gradient accents and neon effects
- Dark mode compatible
- Fully responsive (mobile, tablet, desktop)

### Interactive Elements
- Real-time analysis animations
- Progress bars with smooth transitions
- Color-coded risk indicators
- Hover effects and micro-interactions
- Wavy text animations on homepage section

### Consistent Branding
- Matches TrustNet's existing design language
- Uses same color palette and typography
- Seamless integration with existing features

## Technical Implementation

### Tech Stack
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 3.4**
- **Framer Motion** for animations
- **Motion** library for advanced animations
- **Lucide React** for icons

### Components
- `QuantumGuardLayout.tsx` - Shared layout for all QuantumGuard pages
- `QuantumGuardSection.tsx` - Homepage section component
- Individual page components for each tool

### Routing Structure
```
/quantumguard
  ├── /trust-score
  ├── /identity-checker
  ├── /upi-scanner
  ├── /message-analyzer
  └── /screenshot-checker
```

## Usage Examples

### Trust Score Analyzer
```
Input: https://suspicious-site.xyz
Output: Trust Score 25/100 - High Risk
```

### Identity Checker
```
Input: user123456@randomdomain.tk
Output: 65% Risk Probability - Suspicious Domain
```

### UPI Scanner
```
Input: merchant@unknownbank
Output: Trust Score 45/100 - Unknown Provider
```

### Message Analyzer
```
Input: "URGENT! Your account will be blocked. Click here immediately!"
Output: 85% Scam Probability - Critical Manipulation
```

### Screenshot Checker
```
Input: payment_screenshot.jpg
Output: Authenticity Score 35/100 - Likely Fake
```

## Future Enhancements

- Real-time database integration for known threats
- Machine learning model training on user feedback
- API endpoints for third-party integration
- Browser extension for instant verification
- Mobile app for on-the-go scanning
- Community reporting system
- Historical analysis and trends

## Support

For questions or issues with QuantumGuard:
1. Check the in-app recommendations
2. Review the detailed explanations provided
3. Contact TrustNet support
4. Report false positives/negatives for improvement

---

**Remember:** QuantumGuard is a tool to help you make informed decisions. Always use common sense and verify important information through multiple sources.
