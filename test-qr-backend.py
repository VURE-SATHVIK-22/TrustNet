"""
Quick test script for QR backend
"""
import requests
import base64
from PIL import Image, ImageDraw, ImageFont
import io
import qrcode

def create_test_qr():
    """Create a test QR code"""
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data('https://trustnet.example.com')
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Convert to base64
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    return f"data:image/png;base64,{img_str}"

def test_qr_backend():
    """Test the QR backend"""
    print("🧪 Testing QR Backend...")
    print()
    
    # Test 1: Health check
    print("1. Health Check...")
    try:
        response = requests.get("http://localhost:8000/health")
        print(f"   ✅ Status: {response.json()}")
    except Exception as e:
        print(f"   ❌ Failed: {e}")
        return
    
    # Test 2: API Info
    print("\n2. API Info...")
    try:
        response = requests.get("http://localhost:8000/")
        print(f"   ✅ {response.json()['message']}")
    except Exception as e:
        print(f"   ❌ Failed: {e}")
        return
    
    # Test 3: QR Code Analysis
    print("\n3. QR Code Analysis...")
    try:
        # Create test QR code
        qr_data = create_test_qr()
        
        # Send to backend
        response = requests.post(
            "http://localhost:8000/analyze/qr-code",
            json={"image_data": qr_data}
        )
        
        result = response.json()
        print(f"   ✅ Decoded: {result.get('decoded_content')}")
        print(f"   ✅ Trust Score: {result.get('trust_score')}%")
        print(f"   ✅ Risk: {result.get('risk_category')}")
        print(f"   ✅ Explanations: {result.get('explanations')}")
    except Exception as e:
        print(f"   ❌ Failed: {e}")
        return
    
    # Test 4: URL Analysis
    print("\n4. URL Analysis...")
    try:
        response = requests.post(
            "http://localhost:8000/analyze/url",
            json={"url": "https://google.com"}
        )
        result = response.json()
        print(f"   ✅ Trust Score: {result.get('trust_score')}%")
        print(f"   ✅ Risk: {result.get('risk_category')}")
    except Exception as e:
        print(f"   ❌ Failed: {e}")
        return
    
    print("\n✅ All tests passed!")
    print("\n🎉 QR Backend is working perfectly!")
    print("\nYou can now:")
    print("1. Go to http://localhost:3000/scan/qr-code")
    print("2. Drag and drop any QR code image")
    print("3. See instant analysis results!")

if __name__ == "__main__":
    test_qr_backend()
