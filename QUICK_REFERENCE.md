# 🚀 AI Roast Generator - Quick Reference

## ⚡ Essential Commands

### Setup Commands
```bash
# Create project
mkdir airoaster && cd airoaster
git init && git branch -M main

# Frontend setup
npm create vite@latest . -- --template react --yes
npm install
npm install framer-motion

# Backend setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn python-multipart google-generativeai python-dotenv
```

### Run Commands
```bash
# Backend
cd backend && source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend (new terminal)
npm run dev
```

### Git Commands
```bash
git add .
git commit -m "🔥 Initial commit: AI Roast Generator"
git remote add origin https://github.com/Saahi30/Lang-x-build.git
git push -u origin main
```

## 🎯 Demo Flow (15 minutes)

### 1. Introduction (1 min)
- "Building AI Roast Generator with React + FastAPI + Gemini"
- "Generates personalized roasts in Hinglish"

### 2. Project Setup (3 min)
```bash
mkdir airoaster && cd airoaster
npm create vite@latest . -- --template react --yes
npm install framer-motion
```

### 3. Backend Setup (3 min)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn python-multipart google-generativeai python-dotenv
```

### 4. API Development (5 min)
- Create `backend/main.py` with FastAPI
- Add CORS middleware
- Create `/api/roast` endpoint

### 5. Frontend Development (3 min)
- Update `App.jsx` with state management
- Configure `vite.config.js` for proxy
- Create basic components

### 6. Test & Demo (3 min)
- Start backend: `uvicorn main:app --reload --port 8000`
- Start frontend: `npm run dev`
- Show working application

## 🔑 Key Files to Create

### Backend (`backend/main.py`)
```python
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"])

@app.post("/api/roast")
async def generate_roast(name: str = Form(...), habit: str = Form(...)):
    return {"roast": "Your roast here!"}
```

### Frontend (`vite.config.js`)
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8000', changeOrigin: true }
    }
  }
})
```

### Environment (`backend/.env`)
```
GOOGLE_API_KEY=your_gemini_api_key_here
```

## 🎨 Talking Points

### Why This Tech Stack?
- **React + Vite**: Fast development, hot reload
- **FastAPI**: High performance, automatic docs
- **Gemini AI**: Latest Google AI, great for text generation
- **Hinglish**: Relatable, fun for Indian audience

### Key Features to Highlight:
- ✅ Photo analysis with AI
- ✅ Personalized roast generation
- ✅ Safety filters and fallbacks
- ✅ Modern UI with animations
- ✅ Error handling and validation

### Challenges to Mention:
- API integration with external services
- File upload and processing
- CORS configuration
- Error handling for AI responses

## 🚨 Demo Tips

### Before Demo:
- ✅ Have API key ready
- ✅ Test setup once
- ✅ Prepare terminal tabs
- ✅ Have backup code ready

### During Demo:
- 🎯 Keep it interactive
- 🎯 Explain the "why"
- 🎯 Show the process
- 🎯 Highlight challenges

### If Something Goes Wrong:
- Stay calm and explain what's happening
- Have backup commands ready
- Focus on the learning process
- Show problem-solving skills

## 📊 Success Metrics

**Audience should learn:**
- Full-stack development workflow
- AI integration with web apps
- Modern React development
- API design and development
- Error handling and validation

**You should demonstrate:**
- Clean code organization
- Modern development practices
- Problem-solving skills
- Technical communication

---

**Remember**: This is a live demo - be prepared for anything! 😄 