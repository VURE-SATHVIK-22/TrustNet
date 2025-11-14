# Python Installation & Backend Setup Guide

## 🎯 Issue
Python is not installed or not properly configured on your system.

## ✅ Solution: Install Python

### Step 1: Download Python

**Option 1: Official Python Website (Recommended)**
1. Visit: https://www.python.org/downloads/
2. Click "Download Python 3.12.x" (latest version)
3. Run the installer

**Option 2: Microsoft Store**
1. Open Microsoft Store
2. Search for "Python 3.12"
3. Click "Get" to install

### Step 2: Important Installation Settings

**⚠️ CRITICAL: Check "Add Python to PATH"**

When installing:
1. ✅ **Check the box "Add Python to PATH"** (very important!)
2. Click "Install Now"
3. Wait for installation to complete
4. Click "Close"

### Step 3: Verify Installation

Open a **new** Command Prompt or PowerShell and run:
```bash
python --version
```

Should show: `Python 3.12.x`

If it doesn't work, try:
```bash
py --version
```

## 🚀 Running the Backends

Once Python is installed, follow these steps:

### Option 1: Using Batch Files (Easiest)

**1. Start QuantumGuard Backend:**
```bash
# Double-click or run:
START_QUANTUMGUARD_BACKEND.bat
```

**2. Start QR Analysis Backend:**
```bash
# Double-click or run:
START_QR_ANALYSIS_BACKEND.bat
```

### Option 2: Manual Installation

**1. Install Dependencies:**
```bash
cd trustnet/ml-backend
pip install -r requirements-quantumguard.txt
```

**2. Start QuantumGuard Backend:**
```bash
cd trustnet/ml-backend
python quantumguard_backend.py
```

**3. Start QR Analysis Backend (in new terminal):**
```bash
cd trustnet/ml-backend
python qr_analysis_backend.py
```

## 📊 What Each Backend Does

### QuantumGuard Backend (Port 8001)
- Trust Score Analyzer
- Identity Checker
- UPI Scanner
- Message Analyzer
- Screenshot Analyzer

### QR Analysis Backend (Port 8002)
- QR Code Decoding
- Website Identification
- Security Analysis
- Trust Scoring

## 🧪 Testing After Installation

### 1. Check if backends are running:

**QuantumGuard:**
```bash
curl http://localhost:8001/health
```

**QR Analysis:**
```bash
curl http://localhost:8002/health
```

### 2. Test with browser:

**QuantumGuard API Docs:**
http://localhost:8001/docs

**QR Analysis API Docs:**
http://localhost:8002/docs

## 🔧 Troubleshooting

### Issue: "Python not found"
**Solution:** 
1. Reinstall Python
2. Make sure to check "Add Python to PATH"
3. Restart your terminal/computer

### Issue: "pip not found"
**Solution:**
```bash
python -m ensurepip --upgrade
```

### Issue: "Module not found"
**Solution:**
```bash
cd trustnet/ml-backend
pip install -r requirements-quantumguard.txt
```

### Issue: Port already in use
**Solution:**
```bash
# Find process using port
netstat -ano | findstr :8001

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F
```

## 📝 Quick Start Checklist

- [ ] Install Python from python.org
- [ ] Check "Add Python to PATH" during installation
- [ ] Verify: `python --version` works
- [ ] Navigate to trustnet folder
- [ ] Run: `START_QUANTUMGUARD_BACKEND.bat`
- [ ] Run: `START_QR_ANALYSIS_BACKEND.bat`
- [ ] Test: Visit http://localhost:8001/docs
- [ ] Test: Visit http://localhost:8002/docs

## 🎉 Once Running

Your backends will be available at:
- **QuantumGuard:** http://localhost:8001
- **QR Analysis:** http://localhost:8002

Your frontend at http://localhost:3000 will automatically connect to these backends!

## 💡 Alternative: Use Existing Backend

If you can't install Python, you can use the existing `simple_working_main.py` backend:

```bash
cd trustnet/ml-backend
# If you have Python installed elsewhere
python simple_working_main.py
```

This will run on port 8000 and provide basic functionality.

## 📞 Need Help?

If you're still having issues:
1. Make sure Python is installed: https://www.python.org/downloads/
2. Make sure "Add to PATH" was checked during installation
3. Restart your computer after installing Python
4. Try running the batch files as Administrator

---

**Next Step:** Install Python from https://www.python.org/downloads/ and make sure to check "Add Python to PATH"!
