# QuantumGuard Quick Start Guide

## 🚀 Getting Started

QuantumGuard is now fully integrated into your TrustNet website! Here's how to use it:

## 📍 Access Points

### 1. Navigation Bar
Click on the **"QuantumGuard"** dropdown in the navbar to access all 5 tools:
- Digital Trust Score Analyzer
- Identity Checker (Email / Phone / Username)
- UPI / Payment Risk Scanner
- WhatsApp / SMS Scam Analyzer
- Screenshot Authenticity Checker

### 2. Homepage Section
Scroll down on the homepage to find the dedicated **QuantumGuard section** with:
- Animated wavy title
- Feature cards for each tool
- "Why QuantumGuard is Unique" section
- Direct links to all tools

### 3. Direct URLs
Navigate directly to any tool:
```
http://localhost:3000/quantumguard/trust-score
http://localhost:3000/quantumguard/identity-checker
http://localhost:3000/quantumguard/upi-scanner
http://localhost:3000/quantumguard/message-analyzer
http://localhost:3000/quantumguard/screenshot-checker
```

## 🎯 Quick Usage Examples

### Trust Score Analyzer
1. Go to `/quantumguard/trust-score`
2. Enter any digital identity (URL, email, phone, username, UPI ID)
3. Click "Analyze Trust Score"
4. View your 0-100 trust score with detailed explanations

**Try these examples:**
- `https://secure-bank.com` (should score high)
- `http://suspicious-site.xyz` (should score low)
- `user@email.com` (normal email)
- `user123456@randomdomain.tk` (suspicious email)

### Identity Checker
1. Go to `/quantumguard/identity-checker`
2. Enter an email, phone number, OR username
3. Click "Check Identity"
4. See risk probability and security warnings

**Try these examples:**
- Email: `support@company.com`
- Phone: `+1 234 567 8900`
- Username: `@realuser123`

### UPI Scanner
1. Go to `/quantumguard/upi-scanner`
2. Enter a UPI ID
3. Click "Scan UPI ID"
4. View trust score and detected issues

**Try these examples:**
- `merchant@paytm` (legitimate)
- `user123456789@unknownbank` (suspicious)

### Message Analyzer
1. Go to `/quantumguard/message-analyzer`
2. Paste a WhatsApp or SMS message
3. Click "Analyze Message"
4. See scam probability and manipulation tactics

**Try this example:**
```
URGENT! Your bank account has been suspended due to suspicious activity. 
Click this link immediately to verify your identity or your account will 
be permanently blocked: http://fake-bank-verify.com
```

### Screenshot Checker
1. Go to `/quantumguard/screenshot-checker`
2. Upload a screenshot image
3. Click "Analyze Authenticity"
4. View authenticity score and technical analysis

## 🎨 Features You'll Love

### Beautiful UI
- ✨ Glassmorphism design with backdrop blur
- 🌊 Smooth animations and transitions
- 🎨 Color-coded risk indicators
- 📱 Fully responsive on all devices

### Smart Analysis
- 🧠 AI-powered detection
- 📊 Visual progress bars
- 🎯 Detailed explanations
- 💡 Actionable recommendations

### Easy to Understand
- 🔢 Simple 0-100 scoring system
- 🚦 Color-coded risk levels (Green/Yellow/Red)
- 📝 Plain language explanations
- ✅ Clear next steps

## 🛠️ Development

### Run Development Server
```bash
cd trustnet
npm run dev
```

Visit `http://localhost:3000` and navigate to QuantumGuard features.

### Build for Production
```bash
npm run build
npm start
```

## 📦 What's Included

### New Components
- `QuantumGuardLayout.tsx` - Shared layout component
- `QuantumGuardSection.tsx` - Homepage section
- `glowing-effect.tsx` - Animated glow effects
- `wavy-text-block.tsx` - Wavy text animations

### New Pages
- `/quantumguard/trust-score/page.tsx`
- `/quantumguard/identity-checker/page.tsx`
- `/quantumguard/upi-scanner/page.tsx`
- `/quantumguard/message-analyzer/page.tsx`
- `/quantumguard/screenshot-checker/page.tsx`

### Updated Components
- `Navbar.tsx` - Added QuantumGuard dropdown menu
- `page.tsx` - Added QuantumGuard section to homepage

## 🎯 Key Concepts

### Digital Trust Score
A 0-100 score that indicates how trustworthy a digital identity is:
- **80-100**: Safe (Green)
- **60-79**: Low Risk (Blue)
- **40-59**: Medium Risk (Yellow)
- **20-39**: High Risk (Orange)
- **0-19**: Critical (Red)

### Risk Levels
- **Safe**: Appears legitimate, proceed with normal caution
- **Suspicious**: Shows concerning patterns, verify before proceeding
- **Dangerous**: Multiple red flags, avoid interaction

### Manipulation Detection
QuantumGuard detects psychological tactics:
- **Urgency**: "Act now!" "Limited time!"
- **Fear**: "Account blocked!" "Security alert!"
- **Authority**: Impersonating banks, police, government
- **Greed**: "You won!" "Free prize!"
- **Social Proof**: "Everyone is doing it"

## 🔒 Privacy & Security

- ✅ All analysis happens client-side when possible
- ✅ No data is stored or shared
- ✅ Privacy-first approach
- ✅ Secure by design

## 📚 Learn More

- Read the full guide: `QUANTUMGUARD_GUIDE.md`
- Check the main README: `README.md`
- Explore the code in `/src/app/quantumguard/`

## 🎉 You're Ready!

Start protecting yourself from online scams with QuantumGuard. Remember:
- **Verify before you trust**
- **Check before you click**
- **Analyze before you pay**

Happy scanning! 🛡️
