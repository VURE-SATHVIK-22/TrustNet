# 🔧 Fix: "Failed to fetch" Error

## The Problem

You're seeing this error:
```
TypeError: Failed to fetch
at reader.onloadend (src/app/scan/qr-code/page.tsx:39:34)
```

This happens because the **ML backend is not running**.

## The Solution

You need to start the ML backend server. Here are 3 easy ways:

### ✅ Method 1: Double-Click START_ALL.bat (Easiest)

1. Navigate to the `trustnet` folder
2. Double-click `START_ALL.bat`
3. This will open 2 windows:
   - One for the ML Backend (port 8000)
   - One for the Frontend (port 3000)

### ✅ Method 2: Run Python Script

Open a **new terminal** and run:

```bash
cd trustnet
python start-ml-backend.py
```

Wait until you see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### ✅ Method 3: Manual Start

```bash
cd trustnet/ml-backend
python main.py
```

## Verify It's Working

1. **Check the terminal** - You should see:
   ```
   INFO:     Uvicorn running on http://127.0.0.1:8000
   ```

2. **Visit the API docs** - Open in browser:
   ```
   http://localhost:8000/docs
   ```

3. **Try uploading a QR code** - The error should be gone!

## What Changed?

I've added a **helpful warning banner** that appears when the backend is not available:

- **Orange banner** at the top of the QR scanner page
- **Clear instructions** on how to start the backend
- **Dismiss button** to hide the warning
- **Better error message** in the results

## Complete Setup

For the full TrustNet experience, you need **both** services running:

### Terminal 1: Frontend
```bash
cd trustnet
npm run dev
```
→ Runs on http://localhost:3000

### Terminal 2: Backend
```bash
cd trustnet
python start-ml-backend.py
```
→ Runs on http://localhost:8000

## Quick Test

After starting the backend:

1. Go to http://localhost:3000/scan/qr-code
2. Drag and drop a QR code image
3. You should see:
   - ✅ "Analyzing QR code..." spinner
   - ✅ Analysis results with trust score
   - ✅ No error messages

## Still Having Issues?

### Issue: Python not found
**Solution:** Install Python 3.8+ from python.org

### Issue: Module not found
**Solution:** Install dependencies:
```bash
cd trustnet/ml-backend
pip install -r requirements.txt
```

### Issue: Port 8000 in use
**Solution:** Kill the process using port 8000:
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Issue: Models not found
**Solution:** Train the models:
```bash
cd trustnet
python quick_train.py
```

## Summary

**The drag-and-drop works perfectly!** You just need the backend running.

**Quick Fix:**
1. Open terminal
2. Run: `python start-ml-backend.py`
3. Wait for "Application startup complete"
4. Try uploading again
5. ✅ It works!

## What You Get

Once the backend is running, you get:

- ✅ Real-time QR code analysis
- ✅ ML-powered threat detection
- ✅ Trust score calculation
- ✅ Risk category classification
- ✅ Detailed explanations
- ✅ 50+ security features analyzed

All powered by machine learning! 🧠🚀
