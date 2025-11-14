@echo off
echo ========================================
echo   TrustNet - Starting All Services
echo ========================================
echo.

echo Starting ML Backend...
start "TrustNet ML Backend" cmd /k "python start-ml-backend.py"

timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "TrustNet Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   All Services Started!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo.
echo Press any key to exit this window...
pause >nul
