"""
Complete QR Code Analysis Backend
Handles QR code decoding and URL analysis
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import io
import re
from typing import Optional, Dict, Any
from PIL import Image
import cv2
import numpy as np

app = FastAPI(title="TrustNet QR Code Analyzer")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request models
class QRCodeRequest(BaseModel):
    image_data: str

class URLRequest(BaseModel):
    url: str

class EmailRequest(BaseModel):
    text: str
    subject: str = ""

# QR Code decoder
def decode_qr_code(image_data: str) -> Optional[str]:
    """Decode QR code from base64 image data"""
    try:
        # Remove data URL prefix if present
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        # Decode base64
        image_bytes = base64.b64decode(image_data)
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to numpy array for OpenCV
        img_array = np.array(image)
        
        # Convert RGB to BGR for OpenCV
        if len(img_array.shape) == 3 and img_array.shape[2] == 3:
            img_array = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
        
        # Initialize QR code detector
        qr_detector = cv2.QRCodeDetector()
        
        # Detect and decode
        data, bbox, _ = qr_detector.detectAndDecode(img_array)
        
        if data:
            return data
        
        # Try with grayscale
        gray = cv2.cvtColor(img_array, cv2.COLOR_BGR2GRAY)
        data, bbox, _ = qr_detector.detectAndDecode(gray)
        
        return data if data else None
        
    except Exception as e:
        print(f"QR decode error: {e}")
        return None

# URL analysis functions
def analyze_url(url: str) -> Dict[str, Any]:
    """Analyze URL for phishing indicators"""
    
    # Initialize scores
    risk_score = 0
    features = {}
    explanations = []
    
    # Check URL length
    url_length = len(url)
    features['url_length'] = url_length
    if url_length > 75:
        risk_score += 15
        explanations.append("URL is unusually long")
    
    # Check for IP address
    ip_pattern = r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}'
    if re.search(ip_pattern, url):
        risk_score += 25
        features['has_ip'] = True
        explanations.append("URL contains IP address instead of domain name")
    else:
        features['has_ip'] = False
    
    # Check for @ symbol
    if '@' in url:
        risk_score += 20
        features['has_at_symbol'] = True
        explanations.append("URL contains @ symbol (potential redirect)")
    else:
        features['has_at_symbol'] = False
    
    # Check for double slashes
    if url.count('//') > 1:
        risk_score += 15
        features['double_slash'] = True
        explanations.append("URL has multiple // (suspicious)")
    else:
        features['double_slash'] = False
    
    # Check for dash in domain
    domain_match = re.search(r'://([^/]+)', url)
    if domain_match:
        domain = domain_match.group(1)
        dash_count = domain.count('-')
        features['dash_count'] = dash_count
        if dash_count > 3:
            risk_score += 10
            explanations.append("Domain has many dashes")
    
    # Check for suspicious keywords
    suspicious_keywords = ['login', 'verify', 'account', 'update', 'secure', 'banking', 'paypal', 'amazon']
    keyword_count = sum(1 for keyword in suspicious_keywords if keyword in url.lower())
    features['suspicious_keywords'] = keyword_count
    if keyword_count > 0:
        risk_score += keyword_count * 5
        explanations.append(f"Contains {keyword_count} suspicious keyword(s)")
    
    # Check for HTTPS
    if url.startswith('https://'):
        features['has_https'] = True
        explanations.append("Uses HTTPS (good)")
    else:
        features['has_https'] = False
        risk_score += 20
        explanations.append("Does not use HTTPS (insecure)")
    
    # Check subdomain count
    if domain_match:
        subdomain_count = domain.count('.')
        features['subdomain_count'] = subdomain_count
        if subdomain_count > 3:
            risk_score += 10
            explanations.append("Has many subdomains")
    
    # Calculate trust score (inverse of risk)
    trust_score = max(0, min(100, 100 - risk_score))
    
    # Determine risk category
    if trust_score >= 70:
        risk_category = "Safe"
    elif trust_score >= 40:
        risk_category = "Suspicious"
    else:
        risk_category = "Dangerous"
    
    return {
        "trust_score": trust_score,
        "risk_category": risk_category,
        "confidence": min(95, 60 + (abs(50 - trust_score) / 2)),
        "features": features,
        "explanations": explanations if explanations else ["URL appears normal"]
    }

# Email analysis
def analyze_email(text: str, subject: str) -> Dict[str, Any]:
    """Analyze email content for phishing"""
    
    risk_score = 0
    explanations = []
    
    content = (subject + " " + text).lower()
    
    # Check for urgency
    urgency_words = ['urgent', 'immediate', 'act now', 'limited time', 'expires']
    if any(word in content for word in urgency_words):
        risk_score += 20
        explanations.append("Contains urgency tactics")
    
    # Check for suspicious requests
    suspicious_requests = ['verify account', 'confirm identity', 'update payment', 'click here', 'reset password']
    if any(phrase in content for phrase in suspicious_requests):
        risk_score += 25
        explanations.append("Requests sensitive actions")
    
    # Check for links
    link_count = content.count('http')
    if link_count > 3:
        risk_score += 15
        explanations.append(f"Contains {link_count} links")
    
    # Check for poor grammar (simple check)
    if '  ' in text or text.count('!') > 3:
        risk_score += 10
        explanations.append("Poor formatting detected")
    
    trust_score = max(0, min(100, 100 - risk_score))
    
    if trust_score >= 70:
        risk_category = "Safe"
    elif trust_score >= 40:
        risk_category = "Suspicious"
    else:
        risk_category = "Dangerous"
    
    return {
        "trust_score": trust_score,
        "risk_category": risk_category,
        "confidence": min(90, 55 + (abs(50 - trust_score) / 2)),
        "explanations": explanations if explanations else ["Email appears normal"]
    }

# API Endpoints
@app.get("/")
async def root():
    return {
        "message": "TrustNet QR Code Analyzer API",
        "version": "1.0",
        "endpoints": ["/analyze/qr-code", "/analyze/url", "/analyze/email"]
    }

@app.post("/analyze/qr-code")
async def analyze_qr_code(request: QRCodeRequest):
    """Analyze QR code image"""
    try:
        # Decode QR code
        decoded_content = decode_qr_code(request.image_data)
        
        if not decoded_content:
            return {
                "decoded_content": None,
                "trust_score": 0,
                "risk_category": "Error",
                "confidence": 0,
                "features": {},
                "explanations": ["Could not decode QR code. Please ensure the image is clear and contains a valid QR code."]
            }
        
        # If decoded content is a URL, analyze it
        if decoded_content.startswith(('http://', 'https://', 'www.')):
            url_analysis = analyze_url(decoded_content)
            return {
                "decoded_content": decoded_content,
                **url_analysis
            }
        else:
            # Non-URL content
            return {
                "decoded_content": decoded_content,
                "trust_score": 85,
                "risk_category": "Safe",
                "confidence": 80,
                "features": {"content_type": "text"},
                "explanations": ["QR code contains text content (not a URL)"]
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/analyze/url")
async def analyze_url_endpoint(request: URLRequest):
    """Analyze URL for phishing"""
    try:
        result = analyze_url(request.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/analyze/email")
async def analyze_email_endpoint(request: EmailRequest):
    """Analyze email content"""
    try:
        result = analyze_email(request.text, request.subject)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "qr-analyzer"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
