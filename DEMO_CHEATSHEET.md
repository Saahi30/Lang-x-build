# 🔥 AI Roast Generator - Live Demo Cheatsheet

## 🎯 Demo Overview
Building a complete full-stack AI application with React frontend, FastAPI backend, and Google Gemini AI integration.

**Duration**: 15-20 minutes  
**Audience**: Developers, AI enthusiasts  
**Tech Stack**: React + Vite + FastAPI + Gemini AI

---

## 📋 Pre-Demo Setup (Do this before the demo)

### 1. Prerequisites Check
```bash
# Check Node.js
node --version  # Should be 16+

# Check Python
python3 --version  # Should be 3.8+

# Check Git
git --version
```

### 2. Get Google Gemini API Key
- Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create new API key
- Copy the key (we'll use it later)

---

## 🚀 Live Demo Steps

### Step 1: Project Initialization (2 minutes)

```bash
# Create project directory
mkdir airoaster
cd airoaster

# Initialize Git
git init
git branch -M main

# Create project structure
mkdir backend frontend
```

**What to say**: *"We're building an AI Roast Generator that creates personalized roasts in Hinglish using Google's Gemini AI. Let's start by setting up our project structure."*

### Step 2: Frontend Setup with Vite (3 minutes)

```bash
# Create React app with Vite
npm create vite@latest . -- --template react --yes

# Install dependencies
npm install

# Install additional dependencies
npm install framer-motion
```

**What to say**: *"We're using Vite for fast development and Framer Motion for smooth animations. This gives us a modern React setup with hot reload."*

### Step 3: Backend Setup (3 minutes)

```bash
# Navigate to backend
cd backend

# Create Python virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install fastapi uvicorn python-multipart google-generativeai python-dotenv

# Create requirements.txt
pip freeze > requirements.txt
```

**What to say**: *"For the backend, we're using FastAPI for high-performance API development and Google's Generative AI library to interact with Gemini."*

### Step 4: Backend API Development (5 minutes)

Create `backend/main.py`:

```python
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="AI Roast Generator", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

@app.post("/api/roast")
async def generate_roast(
    name: str = Form(...),
    habit: str = Form(...),
    level: int = Form(...),
    image: UploadFile = File(None)
):
    # This is where we'll add the AI logic
    return {"message": "Roast endpoint ready!"}

@app.get("/")
async def root():
    return {"message": "AI Roast Generator API is running!"}
```

**What to say**: *"We're creating a FastAPI server with CORS enabled for local development. The main endpoint will accept form data including an optional image."*

### Step 5: Environment Configuration (1 minute)

```bash
# Create .env file
echo "GOOGLE_API_KEY=your_gemini_api_key_here" > .env

# Create .env.example
echo "# Google Gemini API Key" > .env.example
echo "GOOGLE_API_KEY=your_gemini_api_key_here" >> .env.example
```

**What to say**: *"We need to configure our Google Gemini API key. This will allow us to use Google's AI models for generating roasts."*

### Step 6: Frontend Component Development (4 minutes)

Create the main components:

**App.jsx** - Main application component
```jsx
import { useState } from 'react'
import './App.css'
import RoastForm from './components/RoastForm'
import RoastDisplay from './components/RoastDisplay'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const [roastData, setRoastData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔥 AI Roast Generator</h1>
        <p>Get roasted by AI in Hinglish! 😄</p>
      </header>
      <main className="app-main">
        {/* Components will go here */}
      </main>
    </div>
  )
}

export default App
```

**What to say**: *"We're building a React app with state management for handling the roast generation flow. The UI will have a form, loading state, and results display."*

### Step 7: Vite Configuration (1 minute)

Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```

**What to say**: *"We're configuring Vite to proxy API calls to our FastAPI backend. This allows seamless communication between frontend and backend."*

### Step 8: Test the Setup (2 minutes)

```bash
# Test backend
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# In another terminal, test frontend
cd ..
npm run dev
```

**What to say**: *"Let's test our setup. The backend should be running on port 8000 and the frontend on port 5173. We can see the basic structure is working."*

---

## 🎨 Demo Highlights to Emphasize

### 1. **Modern Tech Stack**
- React 18 with Vite for fast development
- FastAPI for high-performance backend
- Google Gemini AI for intelligent content generation

### 2. **AI Integration**
- Photo analysis with Gemini Vision
- Text generation with structured prompts
- Safety filters and fallback responses

### 3. **User Experience**
- Smooth animations with Framer Motion
- Loading states with funny Hinglish messages
- Typewriter effect for roast display

### 4. **Production Ready**
- Error handling and validation
- CORS configuration for local development
- Environment variable management

---

## 🚨 Demo Tips

### Before the Demo:
- ✅ Have your Google Gemini API key ready
- ✅ Test the setup once before the demo
- ✅ Have backup code snippets ready
- ✅ Prepare your terminal with multiple tabs

### During the Demo:
- 🎯 **Keep it interactive** - Ask audience questions
- 🎯 **Explain the "why"** - Why React? Why FastAPI? Why Gemini?
- 🎯 **Show the process** - Let them see the code being written
- 🎯 **Highlight challenges** - Talk about API integration, CORS, etc.

### Demo Flow:
1. **Introduction** (1 min) - What we're building
2. **Setup** (3 min) - Project structure and dependencies
3. **Backend** (5 min) - FastAPI and Gemini integration
4. **Frontend** (5 min) - React components and UI
5. **Integration** (3 min) - Connecting frontend and backend
6. **Demo** (3 min) - Show the working application

---

## 🔧 Quick Commands Reference

```bash
# Start backend
cd backend && source venv/bin/activate && uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Start frontend
npm run dev

# Build for production
npm run build

# Test backend setup
cd backend && python test_setup.py
```

---

## 📝 Key Talking Points

### Architecture Decisions:
- **Why FastAPI?** High performance, automatic docs, async support
- **Why Gemini AI?** Latest Google AI model, great for text generation
- **Why React + Vite?** Fast development, great DX, modern tooling
- **Why Hinglish?** Makes it relatable and fun for Indian audience

### Technical Challenges:
- **API Integration** - Handling async calls to external AI services
- **File Upload** - Processing images for AI analysis
- **Error Handling** - Graceful fallbacks for API failures
- **CORS** - Cross-origin requests between frontend and backend

### Business Value:
- **Entertainment** - Fun, shareable content
- **AI Showcase** - Demonstrates modern AI capabilities
- **Learning** - Shows full-stack development process
- **Scalable** - Can be extended with more features

---

## 🎯 Demo Success Metrics

**Audience should understand:**
- ✅ How to build a full-stack AI application
- ✅ Modern web development workflow
- ✅ API integration with external services
- ✅ State management in React
- ✅ Backend development with FastAPI
- ✅ AI integration with Google Gemini

**You should demonstrate:**
- ✅ Clean code organization
- ✅ Error handling and validation
- ✅ Modern UI/UX practices
- ✅ API design principles
- ✅ Development best practices

---

## 🚀 Post-Demo Next Steps

1. **Deploy to production** (Vercel + Railway)
2. **Add more AI features** (different roast styles)
3. **Implement user accounts** (save favorite roasts)
4. **Add social sharing** (share roasts on social media)
5. **Mobile app** (React Native version)

---

**Remember**: This is a live demo - things might go wrong! Stay calm, explain what you're doing, and have fun with it! 😄 