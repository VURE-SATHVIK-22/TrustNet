@echo off
echo ========================================
echo QuantumGuard ML Backend Startup
echo ========================================
echo.

cd ml-backend

echo Installing dependencies...
pip install -r requirements-quantumguard.txt

echo.
echo ========================================
echo Starting QuantumGuard Backend...
echo ========================================
echo.
echo Backend will be available at: http://localhost:8001
echo.

python quantumguard_backend.py

pause
