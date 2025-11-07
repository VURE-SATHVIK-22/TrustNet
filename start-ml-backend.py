#!/usr/bin/env python3
"""
Quick ML Backend Startup Script
"""

import subprocess
import sys
import os
from pathlib import Path

def main():
    """Start ML backend quickly"""
    print("🧠 Starting TrustNet ML Backend...")
    
    # Change to ml-backend directory
    ml_backend_path = Path(__file__).parent / "ml-backend"
    os.chdir(ml_backend_path)
    
    # Install requirements if needed
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except:
        pass
    
    # Create directories
    for directory in ["models", "data", "logs"]:
        Path(directory).mkdir(exist_ok=True)
    
    # Start server
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--host", "0.0.0.0", 
            "--port", "8000", 
            "--reload"
        ])
    except KeyboardInterrupt:
        print("\n🛑 ML Backend stopped")

if __name__ == "__main__":
    main()