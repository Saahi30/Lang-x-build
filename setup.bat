@echo off
echo 🔥 AI Roast Generator Setup Script
echo ==================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
npm install

REM Setup backend
echo 🐍 Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install dependencies
echo Installing backend dependencies...
call venv\Scripts\activate.bat
pip install -r requirements.txt

REM Check if .env file exists
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ⚠️  Please edit backend\.env and add your Google Gemini API key
    echo    Get your API key from: https://makersuite.google.com/app/apikey
) else (
    echo ✅ .env file already exists
)

REM Test backend setup
echo 🧪 Testing backend setup...
python test_setup.py

cd ..

echo.
echo 🎉 Setup complete!
echo.
echo To run the application:
echo 1. Start the backend:
echo    cd backend ^&^& venv\Scripts\activate.bat ^&^& uvicorn main:app --reload --host 0.0.0.0 --port 8000
echo.
echo 2. Start the frontend (in a new terminal):
echo    npm run dev
echo.
echo 3. Open http://localhost:5173 in your browser
echo.
echo Don't forget to add your Google Gemini API key to backend\.env!
pause 