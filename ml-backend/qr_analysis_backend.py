"""
QR Code Analysis Backend
Advanced QR code scanning with URL detection and identification
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import cv2
import numpy as np
from pyzbar import pyzbar
import urllib.parse
from typing import Dict, Any, Optional
from datetime import datetime
import re

app = FastAPI(
    title="QR Code Analysis API",
    description="Advanced QR code scanning with intelligent URL detection",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# REQUEST/RESPONSE MODELS
# ============================================

class QRCodeRequest(BaseModel):
    image_data: str  # base64 encoded image

class QRCodeResponse(BaseModel):
    success: bool
    decoded_text: str
    qr_type: str
    website_name: Optional[str]
    trust_score: int
    risk_category: str
    analysis: Dict[str, Any]
    recommendations: list

# ============================================
# WEBSITE IDENTIFICATION DATABASE
# ============================================

WEBSITE_PATTERNS = {
    # Social Media
    'wikipedia': {
        'patterns': ['wikipedia.org', 'wikipedia.com', 'wiki'],
        'name': 'Wikipedia',
        'category': 'Education',
        'trust_score': 95,
        'description': 'Free online encyclopedia'
    },
    'youtube': {
        'patterns': ['youtube.com', 'youtu.be'],
        'name': 'YouTube',
        'category': 'Video Streaming',
        'trust_score': 95,
        'description': 'Video sharing platform by Google'
    },
    'facebook': {
        'patterns': ['facebook.com', 'fb.com', 'fb.me'],
        'name': 'Facebook',
        'category': 'Social Media',
        'trust_score': 90,
        'description': 'Social networking platform'
    },
    'instagram': {
        'patterns': ['instagram.com', 'instagr.am'],
        'name': 'Instagram',
        'category': 'Social Media',
        'trust_score': 90,
        'description': 'Photo and video sharing platform'
    },
    'twitter': {
        'patterns': ['twitter.com', 't.co', 'x.com'],
        'name': 'Twitter/X',
        'category': 'Social Media',
        'trust_score': 90,
        'description': 'Microblogging platform'
    },
    'linkedin': {
        'patterns': ['linkedin.com', 'lnkd.in'],
        'name': 'LinkedIn',
        'category': 'Professional Network',
        'trust_score': 95,
        'description': 'Professional networking platform'
    },
    'whatsapp': {
        'patterns': ['whatsapp.com', 'wa.me', 'chat.whatsapp.com'],
        'name': 'WhatsApp',
        'category': 'Messaging',
        'trust_score': 95,
        'description': 'Messaging platform by Meta'
    },
    
    # E-commerce
    'amazon': {
        'patterns': ['amazon.com', 'amazon.in', 'amzn.to', 'amazon.co'],
        'name': 'Amazon',
        'category': 'E-commerce',
        'trust_score': 95,
        'description': 'Online shopping platform'
    },
    'flipkart': {
        'patterns': ['flipkart.com', 'fkrt.it'],
        'name': 'Flipkart',
        'category': 'E-commerce',
        'trust_score': 95,
        'description': 'Indian e-commerce platform'
    },
    'ebay': {
        'patterns': ['ebay.com', 'ebay.in'],
        'name': 'eBay',
        'category': 'E-commerce',
        'trust_score': 90,
        'description': 'Online auction and shopping'
    },
    
    # Payment
    'paypal': {
        'patterns': ['paypal.com', 'paypal.me'],
        'name': 'PayPal',
        'category': 'Payment',
        'trust_score': 95,
        'description': 'Online payment platform'
    },
    'paytm': {
        'patterns': ['paytm.com', 'paytm.me'],
        'name': 'Paytm',
        'category': 'Payment',
        'trust_score': 95,
        'description': 'Indian digital payment platform'
    },
    'phonepe': {
        'patterns': ['phonepe.com', 'phon.pe'],
        'name': 'PhonePe',
        'category': 'Payment',
        'trust_score': 95,
        'description': 'Indian digital payment platform'
    },
    'googlepay': {
        'patterns': ['pay.google.com', 'gpay'],
        'name': 'Google Pay',
        'category': 'Payment',
        'trust_score': 95,
        'description': 'Digital payment by Google'
    },
    
    # Tech
    'google': {
        'patterns': ['google.com', 'goo.gl', 'g.co'],
        'name': 'Google',
        'category': 'Search Engine',
        'trust_score': 95,
        'description': 'Search engine and tech company'
    },
    'microsoft': {
        'patterns': ['microsoft.com', 'msft.it', 'aka.ms'],
        'name': 'Microsoft',
        'category': 'Technology',
        'trust_score': 95,
        'description': 'Technology company'
    },
    'apple': {
        'patterns': ['apple.com', 'icloud.com', 'apple.co'],
        'name': 'Apple',
        'category': 'Technology',
        'trust_score': 95,
        'description': 'Technology company'
    },
    'github': {
        'patterns': ['github.com', 'git.io'],
        'name': 'GitHub',
        'category': 'Development',
        'trust_score': 95,
        'description': 'Code hosting platform'
    },
    
    # Streaming
    'netflix': {
        'patterns': ['netflix.com', 'nflx.it'],
        'name': 'Netflix',
        'category': 'Streaming',
        'trust_score': 95,
        'description': 'Video streaming service'
    },
    'spotify': {
        'patterns': ['spotify.com', 'spoti.fi'],
        'name': 'Spotify',
        'category': 'Music Streaming',
        'trust_score': 95,
        'description': 'Music streaming platform'
    },
    'hotstar': {
        'patterns': ['hotstar.com', 'disneyplus.com'],
        'name': 'Disney+ Hotstar',
        'category': 'Streaming',
        'trust_score': 95,
        'description': 'Video streaming service'
    },
    
    # Education
    'coursera': {
        'patterns': ['coursera.org'],
        'name': 'Coursera',
        'category': 'Education',
        'trust_score': 95,
        'description': 'Online learning platform'
    },
    'udemy': {
        'patterns': ['udemy.com'],
        'name': 'Udemy',
        'category': 'Education',
        'trust_score': 95,
        'description': 'Online course platform'
    },
    
    # News
    'bbc': {
        'patterns': ['bbc.com', 'bbc.co.uk'],
        'name': 'BBC',
        'category': 'News',
        'trust_score': 95,
        'description': 'British news organization'
    },
    'cnn': {
        'patterns': ['cnn.com'],
        'name': 'CNN',
        'category': 'News',
        'trust_score': 90,
        'description': 'News network'
    },
}

# ============================================
# QR CODE ANALYSIS FUNCTIONS
# ============================================

def decode_qr_code(image_data: str) -> Optional[str]:
    """Decode QR code from base64 image"""
    try:
        # Remove data URL prefix if present
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        # Decode base64 to image
        img_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Decode QR code
        decoded_objects = pyzbar.decode(img)
        
        if decoded_objects:
            return decoded_objects[0].data.decode('utf-8')
        
        return None
    except Exception as e:
        print(f"Error decoding QR code: {e}")
        return None

def identify_website(url: str) -> Dict[str, Any]:
    """Identify website from URL"""
    url_lower = url.lower()
    
    for key, info in WEBSITE_PATTERNS.items():
        for pattern in info['patterns']:
            if pattern in url_lower:
                return {
                    'identified': True,
                    'name': info['name'],
                    'category': info['category'],
                    'trust_score': info['trust_score'],
                    'description': info['description']
                }
    
    return {
        'identified': False,
        'name': 'Unknown Website',
        'category': 'Unknown',
        'trust_score': 50,
        'description': 'Website not in our database'
    }

def determine_qr_type(content: str) -> str:
    """Determine the type of QR code content"""
    if content.startswith('http://') or content.startswith('https://'):
        return 'URL'
    elif content.startswith('mailto:'):
        return 'Email'
    elif content.startswith('tel:'):
        return 'Phone Number'
    elif content.startswith('sms:'):
        return 'SMS'
    elif content.startswith('geo:'):
        return 'Location'
    elif content.startswith('wifi:'):
        return 'WiFi Credentials'
    elif '@' in content and '.' in content:
        return 'Email Address'
    elif re.match(r'^\+?\d{10,}$', content):
        return 'Phone Number'
    elif content.startswith('BEGIN:VCARD'):
        return 'Contact Card'
    else:
        return 'Text'

def analyze_qr_security(content: str, qr_type: str) -> Dict[str, Any]:
    """Analyze QR code for security risks"""
    
    risk_factors = []
    trust_score = 70
    
    if qr_type == 'URL':
        # Check for HTTPS
        if not content.startswith('https://'):
            risk_factors.append('Not using HTTPS protocol')
            trust_score -= 15
        
        # Check for suspicious TLDs
        suspicious_tlds = ['tk', 'ml', 'ga', 'cf', 'pw', 'xyz']
        if any(f'.{tld}' in content.lower() for tld in suspicious_tlds):
            risk_factors.append('Suspicious domain extension')
            trust_score -= 25
        
        # Check for IP address
        if re.search(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', content):
            risk_factors.append('Uses IP address instead of domain')
            trust_score -= 20
        
        # Check for phishing keywords
        phishing_words = ['verify', 'login', 'secure', 'account', 'update']
        if any(word in content.lower() for word in phishing_words):
            risk_factors.append('Contains suspicious keywords')
            trust_score -= 15
        
        # Identify website
        website_info = identify_website(content)
        if website_info['identified']:
            trust_score = website_info['trust_score']
            risk_factors = []  # Clear risk factors for known sites
    
    # Ensure score is between 0 and 100
    trust_score = max(0, min(100, trust_score))
    
    # Determine risk category
    if trust_score >= 80:
        risk_category = 'Safe'
    elif trust_score >= 60:
        risk_category = 'Low Risk'
    elif trust_score >= 40:
        risk_category = 'Medium Risk'
    else:
        risk_category = 'High Risk'
    
    return {
        'trust_score': trust_score,
        'risk_category': risk_category,
        'risk_factors': risk_factors
    }

# ============================================
# API ENDPOINTS
# ============================================

@app.get("/")
async def root():
    return {
        "message": "QR Code Analysis API",
        "version": "1.0.0",
        "status": "operational",
        "features": [
            "QR code decoding",
            "Website identification",
            "Security analysis",
            "Trust scoring"
        ]
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/analyze-qr", response_model=QRCodeResponse)
async def analyze_qr_code(request: QRCodeRequest):
    """Analyze QR code with website identification"""
    try:
        # Decode QR code
        decoded_text = decode_qr_code(request.image_data)
        
        if not decoded_text:
            raise HTTPException(status_code=400, detail="Could not decode QR code from image")
        
        # Determine QR type
        qr_type = determine_qr_type(decoded_text)
        
        # Identify website if it's a URL
        website_info = None
        website_name = None
        
        if qr_type == 'URL':
            website_info = identify_website(decoded_text)
            website_name = website_info['name']
        
        # Analyze security
        security_analysis = analyze_qr_security(decoded_text, qr_type)
        
        # Generate recommendations
        recommendations = []
        if security_analysis['risk_category'] == 'Safe':
            recommendations.append("✅ QR code appears safe to use")
            if website_name:
                recommendations.append(f"✅ Verified as {website_name}")
        elif security_analysis['risk_category'] == 'Low Risk':
            recommendations.append("⚠️ Exercise caution when using this QR code")
            recommendations.append("Verify the destination before proceeding")
        else:
            recommendations.append("❌ High risk detected - do not use")
            recommendations.append("This QR code may lead to malicious content")
        
        # Build analysis object
        analysis = {
            'decoded_content': decoded_text,
            'content_type': qr_type,
            'security_analysis': security_analysis,
        }
        
        if website_info:
            analysis['website_info'] = website_info
        
        return QRCodeResponse(
            success=True,
            decoded_text=decoded_text,
            qr_type=qr_type,
            website_name=website_name,
            trust_score=security_analysis['trust_score'],
            risk_category=security_analysis['risk_category'],
            analysis=analysis,
            recommendations=recommendations
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002, reload=True)
