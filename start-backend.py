#!/usr/bin/env python3
"""
Start TrustNet ML Backend
"""

import subprocess
import sys
import os

def main():
    # Change to ml-backend directory
    backend_dir = os.path.join(os.path.dirname(__file__), 'ml-backend')
    os.chdir(backend_dir)
    
    # Start the FastAPI server
    cmd = [
        sys.executable, '-m', 'uvicorn', 
        'simple_working_main:app', 
        '--host', '0.0.0.0', 
        '--port', '8000', 
        '--reload'
    ]
    
    print("🚀 Starting TrustNet ML Backend...")
    print(f"Command: {' '.join(cmd)}")
    
    try:
        subprocess.run(cmd, check=True)
    except KeyboardInterrupt:
        print("\n👋 Backend stopped")
    except Exception as e:
        print(f"❌ Error starting backend: {e}")

if __name__ == "__main__":
    main()