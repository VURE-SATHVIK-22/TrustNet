# 🚀 How to Start the ML Backend

## Quick Start

The QR code scanner requires the ML backend to be running. Here's how to start it:

### Option 1: Using Python Script (Recommended)

Open a **new terminal** in the trustnet directory and run:

```bash
python start-ml-backend.py
```

### Option 2: Direct Backend Start

Navigate to the ml-backend directory and start it:

```bash
cd ml-backend
python main.py
```

### Option 3: Using the Batch File (Windows)

Double-click or run:

```bash
START_BACKEND.bat
```

## Verify Backend is Running

Once started, you should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

You can also check by visiting:
```
http://localhost:8000/docs
```

This will show the FastAPI interactive documentation.

## What Happens When Backend is Not Running?

If you try to upload a QR code without the backend running, you'll see:

1. **Orange Warning Banner** at the top of the page
2. **Error Result** showing "Backend Not Available"
3. **Instructions** on how to start the backend

## Full Development Setup

To run the complete TrustNet application:

### Terminal 1: Frontend (Next.js)
```bash
cd trustnet
npm run dev
```
This starts the frontend on http://localhost:3000

### Terminal 2: ML Backend (FastAPI)
```bash
cd trustnet
python start-ml-backend.py
```
This starts the backend on http://localhost:8000

## Troubleshooting

### Port 8000 Already in Use

If you see an error about port 8000 being in use:

**Windows:**
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:8000 | xargs kill -9
```

### Python Dependencies Missing

If you get import errors, install dependencies:

```bash
cd ml-backend
pip install -r requirements.txt
```

Or use the complete requirements:

```bash
pip install -r requirements-complete.txt
```

### Backend Crashes on Startup

Check if you have the required model files:
- The backend needs trained ML models
- Run the training script if models are missing:

```bash
python quick_train.py
```

## Backend Features

The ML backend provides:

- **QR Code Analysis** - `/analyze/qr-code`
- **URL Analysis** - `/analyze/url`
- **Email Analysis** - `/analyze/email`
- **Real-time ML Predictions** - Using trained models
- **Feature Extraction** - 50+ security features
- **Risk Scoring** - Trust scores and risk categories

## API Endpoints

### QR Code Analysis
```
POST http://localhost:8000/analyze/qr-code
Body: { "image_data": "base64_encoded_image" }
```

### URL Analysis
```
POST http://localhost:8000/analyze/url
Body: { "url": "https://example.com" }
```

### Email Analysis
```
POST http://localhost:8000/analyze/email
Body: { "text": "email content", "subject": "email subject" }
```

## Development Tips

1. **Keep Backend Running** - Leave it running in a separate terminal while developing
2. **Check Logs** - Backend logs show all requests and errors
3. **Auto-Reload** - Backend auto-reloads on code changes (if using uvicorn with --reload)
4. **Test API** - Use the `/docs` endpoint to test API calls manually

## Production Deployment

For production, see:
- `PRODUCTION_READY_GUIDE.md`
- `deploy.sh`
- `docker-compose.yml`

## Need Help?

If you're still having issues:

1. Check `TROUBLESHOOTING.md`
2. Review `QUICK_START_GUIDE.md`
3. Verify Python version (3.8+ required)
4. Check firewall settings (port 8000 must be accessible)
5. Review backend logs for specific errors

## Summary

**To use QR code scanning:**
1. Open terminal
2. Run `python start-ml-backend.py`
3. Wait for "Application startup complete"
4. Upload QR codes in the web interface
5. See real-time ML analysis results

That's it! 🎉
