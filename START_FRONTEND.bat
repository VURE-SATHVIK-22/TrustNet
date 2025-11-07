@echo off
echo ========================================
echo TrustNet Frontend Startup
echo ========================================
echo.

echo Checking Node.js installation...
node --version
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Installing/Updating dependencies...
call npm install

echo.
echo ========================================
echo Starting TrustNet Frontend...
echo ========================================
echo.
echo Frontend will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
