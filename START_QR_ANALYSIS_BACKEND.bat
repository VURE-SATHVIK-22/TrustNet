@echo off
echo ========================================
echo QR Code Analysis Backend Startup
echo ========================================
echo.

cd ml-backend

echo Installing dependencies...
pip install -r requirements-quantumguard.txt

echo.
echo ========================================
echo Starting QR Analysis Backend...
echo ========================================
echo.
echo Backend will be available at: http://localhost:8002
echo.

python qr_analysis_backend.py

pause
