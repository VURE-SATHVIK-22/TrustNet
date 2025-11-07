#!/usr/bin/env python3
"""
TrustNet Complete Application Startup Script
Starts both frontend and ML backend with proper coordination
"""

import subprocess
import sys
import os
import time
import threading
import signal
from pathlib import Path

class TrustNetLauncher:
    def __init__(self):
        self.processes = []
        self.running = True
        
    def log(self, message, level="INFO"):
        """Log messages with timestamp"""
        timestamp = time.strftime("%H:%M:%S")
        print(f"[{timestamp}] {level}: {message}")
    
    def install_frontend_deps(self):
        """Install frontend dependencies"""
        self.log("📦 Installing frontend dependencies...")
        try:
            result = subprocess.run(
                ["npm", "install"], 
                cwd=".", 
                capture_output=True, 
                text=True,
                timeout=300
            )
            if result.returncode == 0:
                self.log("✅ Frontend dependencies installed")
                return True
            else:
                self.log(f"❌ Frontend install failed: {result.stderr}", "ERROR")
                return False
        except subprocess.TimeoutExpired:
            self.log("❌ Frontend install timed out", "ERROR")
            return False
        except Exception as e:
            self.log(f"❌ Frontend install error: {e}", "ERROR")
            return False
    
    def install_backend_deps(self):
        """Install backend dependencies"""
        self.log("🐍 Installing ML backend dependencies...")
        try:
            result = subprocess.run(
                [sys.executable, "-m", "pip", "install", "-r", "requirements.txt"],
                cwd="ml-backend",
                capture_output=True,
                text=True,
                timeout=300
            )
            if result.returncode == 0:
                self.log("✅ Backend dependencies installed")
                return True
            else:
                self.log(f"❌ Backend install failed: {result.stderr}", "ERROR")
                return False
        except subprocess.TimeoutExpired:
            self.log("❌ Backend install timed out", "ERROR")
            return False
        except Exception as e:
            self.log(f"❌ Backend install error: {e}", "ERROR")
            return False
    
    def start_backend(self):
        """Start ML backend server"""
        self.log("🧠 Starting ML backend server...")
        try:
            process = subprocess.Popen(
                [sys.executable, "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"],
                cwd="ml-backend",
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
                universal_newlines=True
            )
            self.processes.append(("backend", process))
            
            # Monitor backend startup
            def monitor_backend():
                for line in iter(process.stdout.readline, ''):
                    if not self.running:
                        break
                    if "Uvicorn running on" in line:
                        self.log("✅ ML Backend server started successfully")
                    elif "ERROR" in line or "CRITICAL" in line:
                        self.log(f"Backend: {line.strip()}", "ERROR")
                    else:
                        self.log(f"Backend: {line.strip()}")
            
            threading.Thread(target=monitor_backend, daemon=True).start()
            return True
            
        except Exception as e:
            self.log(f"❌ Failed to start backend: {e}", "ERROR")
            return False
    
    def start_frontend(self):
        """Start frontend development server"""
        self.log("⚛️ Starting frontend development server...")
        try:
            process = subprocess.Popen(
                ["npm", "run", "dev"],
                cwd=".",
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
                universal_newlines=True
            )
            self.processes.append(("frontend", process))
            
            # Monitor frontend startup
            def monitor_frontend():
                for line in iter(process.stdout.readline, ''):
                    if not self.running:
                        break
                    if "Ready in" in line or "Local:" in line:
                        self.log("✅ Frontend server started successfully")
                        if "Local:" in line:
                            self.log("🌐 TrustNet is now available at http://localhost:3000")
                    elif "ERROR" in line or "Error:" in line:
                        self.log(f"Frontend: {line.strip()}", "ERROR")
                    else:
                        self.log(f"Frontend: {line.strip()}")
            
            threading.Thread(target=monitor_frontend, daemon=True).start()
            return True
            
        except Exception as e:
            self.log(f"❌ Failed to start frontend: {e}", "ERROR")
            return False
    
    def wait_for_backend(self, timeout=30):
        """Wait for backend to be ready"""
        self.log("⏳ Waiting for ML backend to be ready...")
        import requests
        
        for i in range(timeout):
            try:
                response = requests.get("http://localhost:8000/health", timeout=2)
                if response.status_code == 200:
                    self.log("✅ ML backend is ready")
                    return True
            except:
                pass
            time.sleep(1)
        
        self.log("⚠️ Backend not responding, continuing anyway...", "WARNING")
        return False
    
    def cleanup(self):
        """Clean up processes"""
        self.log("🧹 Cleaning up processes...")
        self.running = False
        
        for name, process in self.processes:
            try:
                self.log(f"Stopping {name}...")
                process.terminate()
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.log(f"Force killing {name}...")
                process.kill()
            except Exception as e:
                self.log(f"Error stopping {name}: {e}", "ERROR")
    
    def signal_handler(self, signum, frame):
        """Handle interrupt signals"""
        self.log("🛑 Received interrupt signal, shutting down...")
        self.cleanup()
        sys.exit(0)
    
    def run(self):
        """Main run function"""
        # Set up signal handlers
        signal.signal(signal.SIGINT, self.signal_handler)
        signal.signal(signal.SIGTERM, self.signal_handler)
        
        try:
            self.log("🚀 Starting TrustNet - AI-Powered Phishing Detection Platform")
            self.log("=" * 60)
            
            # Install dependencies
            if not self.install_frontend_deps():
                return False
            
            if not self.install_backend_deps():
                self.log("⚠️ Backend dependencies failed, continuing with frontend only...", "WARNING")
            
            # Start backend first
            if self.install_backend_deps():
                self.start_backend()
                time.sleep(3)  # Give backend time to start
                self.wait_for_backend()
            
            # Start frontend
            if not self.start_frontend():
                return False
            
            # Wait for frontend to be ready
            time.sleep(5)
            
            self.log("🎉 TrustNet is now running!")
            self.log("📊 Frontend: http://localhost:3000")
            self.log("🧠 ML Backend: http://localhost:8000")
            self.log("📚 API Docs: http://localhost:8000/docs")
            self.log("")
            self.log("Press Ctrl+C to stop all services")
            
            # Keep running until interrupted
            try:
                while self.running:
                    time.sleep(1)
                    # Check if processes are still running
                    for name, process in self.processes:
                        if process.poll() is not None:
                            self.log(f"⚠️ {name} process stopped unexpectedly", "WARNING")
            except KeyboardInterrupt:
                pass
            
        except Exception as e:
            self.log(f"❌ Startup failed: {e}", "ERROR")
            return False
        finally:
            self.cleanup()
        
        return True

def main():
    """Main entry point"""
    launcher = TrustNetLauncher()
    success = launcher.run()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()