@echo off
echo ========================================
echo   TrustNet QR Code Backend
echo ========================================
echo.
echo Installing dependencies...
cd ml-backend
pip install -q fastapi uvicorn pillow opencv-python numpy pydantic python-multipart
echo.
echo Starting QR Code Analyzer Backend...
echo.
python qr_backend.py
