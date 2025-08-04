# 🔥 AI Roast Generator

A fun and interactive web application that generates personalized roasts in Hinglish (Hindi + English) using AI. Built with React, FastAPI, and Google Gemini AI.

## ✨ Features

- **Personalized Roasts**: Generate roasts based on your name, habits, and quirks
- **Photo Analysis**: Upload photos to add visual context to your roast
- **Intensity Control**: Adjust roast intensity from gentle (1) to spicy (5)
- **Hinglish Output**: Get roasts in a mix of Hindi and English
- **Safety First**: Built-in safety measures to ensure respectful content
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Real-time Feedback**: Live loading states with funny Hinglish messages

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Framer Motion** for smooth animations
- **CSS Modules** for styling (no Tailwind)
- **Modern ES6+** JavaScript

### Backend
- **FastAPI** for high-performance API
- **Google Gemini AI** for intelligent roast generation
- **Python 3.8+** with async support
- **CORS** enabled for local development

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Google Gemini API key

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd airoaster

# Install frontend dependencies
npm install

# Setup backend
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure API Key

1. Get your Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Copy `.env.example` to `.env` in the backend folder:
   ```bash
   cd backend
   cp .env.example .env
   ```
3. Edit `.env` and add your API key:
   ```
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

### 3. Run the Application

#### Start the Backend
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Start the Frontend (in a new terminal)
```bash
# From the root directory
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
airoaster/
├── src/                    # Frontend React code
│   ├── components/         # React components
│   │   ├── RoastForm.jsx
│   │   ├── RoastDisplay.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── *.css          # Component styles
│   ├── App.jsx            # Main app component
│   └── App.css            # Main app styles
├── backend/               # FastAPI backend
│   ├── main.py           # Main API server
│   ├── requirements.txt   # Python dependencies
│   └── .env.example      # Environment variables template
├── public/               # Static assets
├── vite.config.js        # Vite configuration
└── package.json          # Frontend dependencies
```

## 🔧 API Endpoints

### POST `/api/roast`
Generates a personalized roast based on user input.

**Request (multipart/form-data):**
- `name` (string, required): User's name/nickname
- `habit` (string, required): Description of habit/quirk
- `level` (integer, required): Roast intensity (1-5)
- `image` (file, optional): Photo for visual context

**Response:**
```json
{
  "roast": "Arey [name], ye [habit] wala habit toh bahut interesting hai!",
  "compliment": "But honestly [name], tumhara dedication dekh kar lagta hai...",
  "tag": "Friendly Fire",
  "confidence_pct": "87%",
  "wit_score": 9.1,
  "photo_caption": "Casual focused vibe"
}
```

## 🎯 How It Works

1. **User Input**: User provides name, habit description, intensity level, and optional photo
2. **Photo Analysis**: If photo is uploaded, Gemini Vision generates a safe, neutral caption
3. **Prompt Construction**: Backend creates a structured prompt combining all inputs
4. **AI Generation**: Gemini generates a roast in Hinglish with safety checks
5. **Response Display**: Frontend shows the roast with typewriter animation and metrics

## 🛡️ Safety Features

- **Photo Analysis**: Safe, neutral descriptions only (no personal attributes)
- **Content Filtering**: Automatic fallback for sensitive content
- **Prompt Engineering**: Structured prompts to ensure appropriate output
- **Error Handling**: Graceful fallbacks for API failures

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Rotating Hinglish status messages
- **Typewriter Effect**: Roast text appears character by character
- **Progress Indicators**: Confidence and wit score visualization

## 🔍 Example Usage

1. **Input Example:**
   - Name: "Rahul"
   - Habit: "Always starts projects last minute"
   - Intensity: 3
   - Photo: Optional selfie

2. **Output Example:**
   ```json
   {
     "roast": "Arey Rahul, ye last minute project wala habit toh bahut interesting hai! Kabhi kabhi lagta hai ki tum apne aap ko roast karne ke liye hi ye sab karte ho.",
     "compliment": "But honestly Rahul, tumhara dedication aur passion dekh kar lagta hai ki tum apne goals ke liye kuch bhi kar sakte ho.",
     "tag": "Friendly Fire",
     "confidence_pct": "87%",
     "wit_score": 8.5
   }
   ```

## 🚨 Troubleshooting

### Common Issues

1. **Backend won't start**: Check if Python virtual environment is activated
2. **API key error**: Verify your `.env` file has the correct API key
3. **CORS errors**: Ensure backend is running on port 8000
4. **Frontend proxy issues**: Check `vite.config.js` proxy configuration

### Debug Mode

```bash
# Backend with debug logging
uvicorn main:app --reload --host 0.0.0.0 --port 8000 --log-level debug

# Frontend with detailed errors
npm run dev -- --debug
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for the intelligent roast generation
- Framer Motion for smooth animations
- FastAPI for the high-performance backend
- React team for the amazing frontend framework

---

**Note**: This is a fun project for entertainment purposes. All roasts are generated in good humor and should not be taken seriously! 😄
