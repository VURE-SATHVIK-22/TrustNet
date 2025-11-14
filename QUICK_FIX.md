# ⚡ Quick Fix - "Failed to fetch" Error

## The Problem
```
TypeError: Failed to fetch
```

## The Solution (30 seconds)

### Windows Users:
1. Double-click `START_ALL.bat` in the trustnet folder
2. Wait 10 seconds
3. Refresh your browser
4. ✅ Done!

### Mac/Linux Users:
```bash
cd trustnet
python start-ml-backend.py
```

## That's It!

The drag-and-drop works perfectly. You just needed the backend running.

## What Happens Now?

✅ Drag QR images → Instant analysis
✅ Trust scores → Real-time results
✅ No more errors → Everything works

## Still Not Working?

Run these commands:

```bash
cd trustnet/ml-backend
pip install -r requirements.txt
python main.py
```

## Verify Success

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

Then visit: http://localhost:3000/scan/qr-code

## Done! 🎉

Your drag-and-drop QR scanner is now fully functional!
