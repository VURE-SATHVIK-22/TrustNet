#!/usr/bin/env python3
"""
TrustNet Training and Deployment Script
Trains models and immediately updates the backend for production use
"""

import asyncio
import sys
import os
from pathlib import Path

# Add ml-training to path
sys.path.append(str(Path(__file__).parent / 'ml-training'))

from train_models import TrustNetMLTrainer

async def main():
    """Main training and deployment function"""
    print("🚀 TrustNet Training and Deployment")
    print("=" * 50)
    
    # Initialize trainer
    trainer = TrustNetMLTrainer()
    
    # Ask user for training type
    print("\nChoose training option:")
    print("1. Quick Training (5 minutes) - For immediate testing")
    print("2. Comprehensive Training (30+ minutes) - For production")
    
    choice = input("\nEnter choice (1 or 2): ").strip()
    
    if choice == "1":
        print("\n⚡ Starting Quick Training...")
        results = trainer.run_quick_training_pipeline()
        
        print(f"\n✅ Quick Training Completed!")
        print(f"📊 Results:")
        print(f"   Email Accuracy: {results['email_accuracy']:.1%}")
        print(f"   URL Accuracy: {results['url_accuracy']:.1%}")
        print(f"   Ensemble Accuracy: {results['ensemble_accuracy']:.1%}")
        
    elif choice == "2":
        print("\n🧠 Starting Comprehensive Training...")
        results = await trainer.run_comprehensive_training_pipeline()
        
        print(f"\n✅ Comprehensive Training Completed!")
        print(f"📊 Results:")
        print(f"   Email Accuracy: {results['email_accuracy']:.1%}")
        print(f"   URL Accuracy: {results['url_accuracy']:.1%}")
        print(f"   Ensemble Accuracy: {results['ensemble_accuracy']:.1%}")
        print(f"   Models Trained: {results['models_trained']}")
        print(f"   Training Duration: {results['duration']}")
        
    else:
        print("❌ Invalid choice. Exiting.")
        return
    
    # Update backend
    print("\n🔄 Updating backend with trained models...")
    update_backend_models()
    
    print("\n🎉 Training and deployment completed!")
    print("💡 You can now restart the backend to use the new models.")
    print("\nCommands to restart:")
    print("1. Stop current backend (Ctrl+C)")
    print("2. Run: python start-backend.py")

def update_backend_models():
    """Update backend with newly trained models"""
    try:
        import shutil
        
        # Copy models to backend directory
        models_src = Path("ml-training/models")
        models_dst = Path("ml-backend/models")
        
        if models_src.exists():
            if models_dst.exists():
                shutil.rmtree(models_dst)
            shutil.copytree(models_src, models_dst)
            print("✅ Models copied to backend")
        else:
            print("⚠️ No models found to copy")
            
    except Exception as e:
        print(f"❌ Failed to update backend models: {e}")

if __name__ == "__main__":
    asyncio.run(main())