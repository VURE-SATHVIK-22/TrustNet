# QuantumGuard & QR Code ML Backend Guide

## 🚀 Overview

Complete ML backend implementation for:
1. **QuantumGuard** - Digital identity verification
2. **QR Code Analysis** - Intelligent QR code scanning with website identification

## 📁 Files Created

### Backend Files
```
ml-backend/
├── quantumguard_backend.py      # QuantumGuard ML API
├── qr_analysis_backend.py       # QR Code Analysis API
└── requirements-quantumguard.txt # Python dependencies

Startup Scripts:
├── START_QUANTUMGUARD_BACKEND.bat  # Start QuantumGuard backend
└── START_QR_ANALYSIS_BACKEND.bat   # Start QR Analysis backend
```

## 🎯 Features

### QuantumGuard Backend (Port 8001)

#### 1. Trust Score Analyzer
**Endpoint:** `POST /api/trust-score`

**Features:**
- Comprehensive domain whitelist (100+ legitimate sites)
- Pattern-based analysis for unknown domains
- Phishing keyword detection
- TLD risk assessment
- URL obfuscation detection
- Random pattern detection

**Example Request:**
```json
{
  "input": "https://www.amazon.in"
}
```

**Example Response:**
```json
{
  "score": 95,
  "risk_level": "Safe",
  "category": "Trusted",
  "explanation": "Based on multi-layer AI analysis...",
  "factors": [
    {
      "name": "Verified Domain",
      "impact": "positive",
      "description": "Recognized legitimate website: amazon.in"
    }
  ]
}
```

#### 2. Identity Checker
**Endpoint:** `POST /api/identity-check`

Validates emails, phone numbers, and usernames.

#### 3. UPI Scanner
**Endpoint:** `POST /api/upi-check`

Validates UPI IDs and checks for legitimacy.

#### 4. Message Analyzer
**Endpoint:** `POST /api/message-analysis`

Detects scam patterns in messages.

#### 5. Screenshot Analyzer
**Endpoint:** `POST /api/screenshot-analysis`

Analyzes screenshot authenticity.

### QR Code Analysis Backend (Port 8002)

#### QR Code Scanning with Website Identification
**Endpoint:** `POST /api/analyze-qr`

**Features:**
- **QR Code Decoding** - Extracts content from QR codes
- **Website Identification** - Recognizes 50+ popular websites
- **Security Analysis** - Checks for phishing and malicious content
- **Trust Scoring** - 0-100 score based on analysis

**Supported Websites:**
- Social Media: Wikipedia, YouTube, Facebook, Instagram, Twitter, LinkedIn, WhatsApp
- E-commerce: Amazon, Flipkart, eBay
- Payment: PayPal, Paytm, PhonePe, Google Pay
- Tech: Google, Microsoft, Apple, GitHub
- Streaming: Netflix, Spotify, Hotstar
- Education: Coursera, Udemy
- News: BBC, CNN

**Example Request:**
```json
{
  "image_data": "data:image/png;base64,iVBORw0KG..."
}
```

**Example Response (Wikipedia QR Code):**
```json
{
  "success": true,
  "decoded_text": "https://en.wikipedia.org/wiki/Main_Page",
  "qr_type": "URL",
  "website_name": "Wikipedia",
  "trust_score": 95,
  "risk_category": "Safe",
  "analysis": {
    "decoded_content": "https://en.wikipedia.org/wiki/Main_Page",
    "content_type": "URL",
    "website_info": {
      "identified": true,
      "name": "Wikipedia",
      "category": "Education",
      "trust_score": 95,
      "description": "Free online encyclopedia"
    },
    "security_analysis": {
      "trust_score": 95,
      "risk_category": "Safe",
      "risk_factors": []
    }
  },
  "recommendations": [
    "✅ QR code appears safe to use",
    "✅ Verified as Wikipedia"
  ]
}
```

## 🔧 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Step 1: Install Dependencies

**Option 1: Using Batch File (Windows)**
```bash
# The batch files will automatically install dependencies
START_QUANTUMGUARD_BACKEND.bat
```

**Option 2: Manual Installation**
```bash
cd trustnet/ml-backend
pip install -r requirements-quantumguard.txt
```

### Step 2: Start Backends

#### Start QuantumGuard Backend
```bash
# Windows
START_QUANTUMGUARD_BACKEND.bat

# Or manually
cd ml-backend
python quantumguard_backend.py
```

**Backend will run on:** http://localhost:8001

#### Start QR Analysis Backend
```bash
# Windows
START_QR_ANALYSIS_BACKEND.bat

# Or manually
cd ml-backend
python qr_analysis_backend.py
```

**Backend will run on:** http://localhost:8002

## 🧪 Testing

### Test QuantumGuard Backend

**1. Health Check:**
```bash
curl http://localhost:8001/health
```

**2. Test Trust Score:**
```bash
curl -X POST http://localhost:8001/api/trust-score \
  -H "Content-Type: application/json" \
  -d '{"input": "https://www.amazon.in"}'
```

**3. API Documentation:**
Visit: http://localhost:8001/docs

### Test QR Analysis Backend

**1. Health Check:**
```bash
curl http://localhost:8002/health
```

**2. API Documentation:**
Visit: http://localhost:8002/docs

**3. Test with QR Code:**
- Create a QR code for Wikipedia: https://en.wikipedia.org
- Upload to: http://localhost:3000/scan/qr-code
- Should identify as "Wikipedia" with 95/100 trust score

## 📊 Website Identification Examples

### Example 1: Wikipedia QR Code
```
Input: QR code containing "https://en.wikipedia.org"
Output:
  - Website Name: Wikipedia
  - Category: Education
  - Trust Score: 95/100
  - Description: Free online encyclopedia
```

### Example 2: YouTube QR Code
```
Input: QR code containing "https://youtube.com/watch?v=..."
Output:
  - Website Name: YouTube
  - Category: Video Streaming
  - Trust Score: 95/100
  - Description: Video sharing platform by Google
```

### Example 3: Amazon QR Code
```
Input: QR code containing "https://www.amazon.in/product/..."
Output:
  - Website Name: Amazon
  - Category: E-commerce
  - Trust Score: 95/100
  - Description: Online shopping platform
```

### Example 4: Unknown Website
```
Input: QR code containing "https://random-site.xyz"
Output:
  - Website Name: Unknown Website
  - Category: Unknown
  - Trust Score: 30/100 (suspicious TLD)
  - Risk Factors: Suspicious domain extension
```

## 🎨 Integration with Frontend

### Update Frontend API Calls

**For QuantumGuard:**
```typescript
// src/app/quantumguard/trust-score/page.tsx
const response = await fetch('http://localhost:8001/api/trust-score', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ input: userInput })
})
```

**For QR Code:**
```typescript
// src/app/scan/qr-code/page.tsx
const response = await fetch('http://localhost:8002/api/analyze-qr', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ image_data: base64Image })
})
```

## 🔍 How It Works

### QuantumGuard Trust Score Algorithm

1. **Domain Extraction** - Extract domain from URL/email
2. **Whitelist Check** - Check against 100+ legitimate domains
3. **Pattern Analysis** - Analyze for suspicious patterns:
   - Suspicious TLDs (.tk, .ml, .xyz, etc.)
   - Phishing keywords (verify, login, secure, etc.)
   - IP addresses
   - URL obfuscation
   - Random patterns
   - Excessive subdomains
4. **Scoring** - Calculate 0-100 trust score
5. **Risk Classification** - Categorize as Safe/Suspicious/Dangerous

### QR Code Website Identification

1. **QR Decoding** - Extract text from QR code using OpenCV + pyzbar
2. **Content Type Detection** - Identify if URL, email, phone, etc.
3. **Website Matching** - Match against 50+ website patterns
4. **Security Analysis** - Check for:
   - HTTPS protocol
   - Suspicious TLDs
   - IP addresses
   - Phishing keywords
5. **Trust Scoring** - Calculate based on identification and security
6. **Response** - Return website name, category, and recommendations

## 📝 API Endpoints Summary

### QuantumGuard Backend (Port 8001)
```
GET  /                      - API info
GET  /health                - Health check
POST /api/trust-score       - Analyze trust score
POST /api/identity-check    - Check identity
POST /api/upi-check         - Check UPI ID
POST /api/message-analysis  - Analyze message
POST /api/screenshot-analysis - Analyze screenshot
```

### QR Analysis Backend (Port 8002)
```
GET  /                      - API info
GET  /health                - Health check
POST /api/analyze-qr        - Analyze QR code
```

## 🎉 Features Summary

### QuantumGuard
- ✅ 100+ legitimate domains in whitelist
- ✅ Comprehensive pattern analysis
- ✅ Phishing detection
- ✅ TLD risk assessment
- ✅ Real-time scoring

### QR Code Analysis
- ✅ QR code decoding
- ✅ 50+ website identification
- ✅ Security analysis
- ✅ Trust scoring
- ✅ Intelligent recommendations
- ✅ **Identifies what the QR code is for** (Wikipedia, YouTube, etc.)

## 🚀 Next Steps

1. **Start both backends:**
   ```bash
   START_QUANTUMGUARD_BACKEND.bat
   START_QR_ANALYSIS_BACKEND.bat
   ```

2. **Test with frontend:**
   - Visit http://localhost:3000
   - Try QuantumGuard features
   - Upload QR codes

3. **Test website identification:**
   - Create QR codes for Wikipedia, YouTube, Amazon
   - Upload and see them identified correctly!

Your ML backends are now ready with intelligent website identification! 🎉
