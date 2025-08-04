#!/usr/bin/env python3
"""
Test script to verify backend setup
"""

def test_imports():
    """Test if all required packages can be imported"""
    try:
        import fastapi
        import uvicorn
        import google.generativeai as genai
        import dotenv
        print("✅ All required packages imported successfully!")
        return True
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False

def test_env_setup():
    """Test environment setup"""
    import os
    from dotenv import load_dotenv
    
    load_dotenv()
    api_key = os.getenv("GOOGLE_API_KEY")
    
    if api_key and api_key != "your_gemini_api_key_here":
        print("✅ Google API key found in environment!")
        return True
    else:
        print("⚠️  Google API key not configured. Please set up your .env file.")
        print("   Copy .env.example to .env and add your API key.")
        return False

def main():
    print("🧪 Testing AI Roast Generator Backend Setup...")
    print("=" * 50)
    
    imports_ok = test_imports()
    env_ok = test_env_setup()
    
    print("=" * 50)
    if imports_ok and env_ok:
        print("🎉 Backend setup is complete and ready to run!")
        print("\nTo start the backend server:")
        print("  uvicorn main:app --reload --host 0.0.0.0 --port 8000")
    elif imports_ok:
        print("📦 Dependencies are installed, but API key needs configuration.")
    else:
        print("❌ Setup incomplete. Please check the installation.")

if __name__ == "__main__":
    main() 