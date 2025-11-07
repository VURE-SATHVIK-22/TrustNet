@echo off
echo ========================================
echo TrustNet ML Backend Startup
echo ========================================
echo.

cd ml-backend

echo Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Installing/Updating dependencies...
pip install -r requirements-complete.txt

echo.
echo ========================================
echo Starting TrustNet ML Backend...
echo ========================================
echo.
echo Backend will be available at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

python complete_backend.py

pause
