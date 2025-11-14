@echo off
echo ========================================
echo Git Commit Script for QuantumGuard
echo ========================================
echo.

REM Check if git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not found in your PATH
    echo.
    echo Please do one of the following:
    echo 1. Open Git Bash and run these commands manually
    echo 2. Use GitHub Desktop or another Git GUI
    echo 3. Add Git to your system PATH
    echo.
    pause
    exit /b 1
)

echo Git found! Proceeding with commit...
echo.

REM Show current status
echo Current status:
git status
echo.

REM Add all changes
echo Adding all changes...
git add .
echo.

REM Commit with message
echo Committing changes...
git commit -m "feat: Add QuantumGuard Digital Trust Score System with navbar fixes" -m "- Integrated complete QuantumGuard system with 5 tools" -m "- Added Digital Trust Score Analyzer for universal identity verification" -m "- Added Identity Checker for email/phone/username validation" -m "- Added UPI Scanner for payment identity verification" -m "- Added Message Analyzer for scam detection with NLP" -m "- Added Screenshot Checker for authenticity verification" -m "- Created QuantumGuard section on homepage with wavy animations" -m "- Fixed navbar visibility issues with proper z-index hierarchy" -m "- Optimized navbar responsiveness across all screen sizes" -m "- Added comprehensive documentation for all features" -m "- Installed motion library for advanced animations" -m "- All features production-ready and fully tested"
echo.

REM Show commit result
if %errorlevel% equ 0 (
    echo ========================================
    echo SUCCESS! Changes committed successfully
    echo ========================================
    echo.
    echo To push to remote, run:
    echo git push origin main
    echo.
    echo Or run: git push
    echo.
) else (
    echo ========================================
    echo ERROR: Commit failed
    echo ========================================
    echo.
)

pause
