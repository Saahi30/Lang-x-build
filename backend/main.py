from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import google.generativeai as genai
import os
import base64
import json
from typing import Optional
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="AI Roast Generator", version="1.0.0")

# Add CORS middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable is required")

genai.configure(api_key=GOOGLE_API_KEY)

# Initialize Gemini models
vision_model = genai.GenerativeModel('gemini-1.5-flash')
text_model = genai.GenerativeModel('gemini-1.5-flash')

def get_safe_photo_caption(image_data: bytes) -> str:
    """
    Generate a safe, neutral caption for the uploaded photo using Gemini Vision.
    Falls back to generic caption if any sensitive content is detected.
    """
    try:
        # Convert image to base64 for Gemini
        image_base64 = base64.b64encode(image_data).decode('utf-8')
        
        # Prompt for safe, neutral description
        vision_prompt = """
        Describe this image in a neutral, safe way focusing only on:
        - General vibe/atmosphere
        - Objects or setting (if appropriate)
        - Activity or pose (if appropriate)
        
        DO NOT mention or infer:
        - Race, ethnicity, or skin color
        - Body type, weight, or physical appearance
        - Gender or gender expression
        - Age or age-related features
        - Any physical flaws or imperfections
        - Clothing choices or fashion
        - Personal characteristics
        
        Keep it brief (1-2 lines) and focus on the overall mood/vibe.
        If you can't safely describe it, just say "Casual focused vibe".
        """
        
        response = vision_model.generate_content([
            vision_prompt,
            {"mime_type": "image/jpeg", "data": image_base64}
        ])
        
        caption = response.text.strip()
        
        # Safety check - if caption contains sensitive terms, use fallback
        sensitive_terms = ['skin', 'body', 'weight', 'fat', 'thin', 'ugly', 'beautiful', 
                          'race', 'ethnic', 'gender', 'age', 'old', 'young', 'wrinkles',
                          'acne', 'pimples', 'hair', 'bald', 'dress', 'clothes']
        
        if any(term in caption.lower() for term in sensitive_terms):
            logger.warning(f"Potentially sensitive caption detected: {caption}")
            return "Casual focused vibe"
        
        return caption if caption else "Casual focused vibe"
        
    except Exception as e:
        logger.error(f"Error generating photo caption: {e}")
        return "Casual focused vibe"

def generate_roast_prompt(name: str, habit: str, intensity: int, photo_caption: str) -> str:
    """
    Construct the prompt for Gemini to generate a roast in Hinglish.
    """
    intensity_descriptions = {
        1: "very gentle and friendly",
        2: "lightly teasing",
        3: "moderately playful",
        4: "quite spicy",
        5: "full on roast mode"
    }
    
    intensity_desc = intensity_descriptions.get(intensity, "moderately playful")
    
    prompt = f"""
    Generate a roast in Hinglish (Hindi + English) for a person with these details:
    
    Name: {name}
    Habit/Quirk: {habit}
    Photo Vibe: {photo_caption}
    Roast Intensity: {intensity_desc} (level {intensity}/5)
    
    IMPORTANT REQUIREMENTS:
    1. Output MUST be in Hinglish (Hindi + English mixed)
    2. Target ONLY the habit/quirk/vibe, never personal attributes
    3. Always include a sincere compliment
    4. Keep it lighthearted and funny, never mean-spirited
    5. Return a valid JSON object with these exact fields:
    
    {{
        "roast": "2-3 line funny roast in Hinglish",
        "compliment": "sincere compliment in Hinglish",
        "tag": "roast level tag (e.g., 'Thoda Tez', 'Friendly Fire', 'Sizzling', 'Full On Burn')",
        "confidence_pct": "percentage as string (e.g., '87%')",
        "wit_score": number with one decimal (e.g., 9.1)
    }}
    
    Make sure the roast is appropriate for intensity level {intensity} and focuses on the habit/quirk described.
    """
    
    return prompt

def get_fallback_response(name: str, habit: str) -> dict:
    """
    Safe fallback response if Gemini fails or returns unsafe content.
    """
    return {
        "roast": f"Arey {name}, ye {habit} wala habit toh bahut interesting hai! Kabhi kabhi lagta hai ki tum apne aap ko roast karne ke liye hi ye sab karte ho.",
        "compliment": f"But honestly {name}, tumhara dedication aur passion dekh kar lagta hai ki tum apne goals ke liye kuch bhi kar sakte ho.",
        "tag": "Friendly Fire",
        "confidence_pct": "75%",
        "wit_score": 7.5
    }

@app.post("/api/roast")
async def generate_roast(
    name: str = Form(...),
    habit: str = Form(...),
    level: int = Form(...),
    image: Optional[UploadFile] = File(None)
):
    """
    Generate a roast based on user input and optional photo.
    """
    try:
        # Validate inputs
        if not name or not habit:
            raise HTTPException(status_code=400, detail="Name and habit are required")
        
        if level < 1 or level > 5:
            raise HTTPException(status_code=400, detail="Level must be between 1 and 5")
        
        # Get photo caption if image is provided
        photo_caption = "Casual focused vibe"
        if image:
            try:
                image_data = await image.read()
                photo_caption = get_safe_photo_caption(image_data)
                logger.info(f"Generated photo caption: {photo_caption}")
            except Exception as e:
                logger.error(f"Error processing image: {e}")
                photo_caption = "Casual focused vibe"
        
        # Generate roast prompt
        roast_prompt = generate_roast_prompt(name, habit, level, photo_caption)
        logger.info(f"Generated roast prompt for {name}")
        
        # Call Gemini for roast generation
        try:
            response = text_model.generate_content(roast_prompt)
            roast_text = response.text.strip()
            
            # Try to parse JSON response
            try:
                roast_data = json.loads(roast_text)
                
                # Validate required fields
                required_fields = ["roast", "compliment", "tag", "confidence_pct", "wit_score"]
                if not all(field in roast_data for field in required_fields):
                    raise ValueError("Missing required fields")
                
                # Add photo caption info
                roast_data["photo_caption"] = photo_caption
                
                return JSONResponse(content=roast_data)
                
            except (json.JSONDecodeError, ValueError) as e:
                logger.warning(f"Invalid JSON response from Gemini: {e}")
                logger.info(f"Raw response: {roast_text}")
                # Use fallback response
                fallback = get_fallback_response(name, habit)
                fallback["photo_caption"] = photo_caption
                return JSONResponse(content=fallback)
                
        except Exception as e:
            logger.error(f"Error calling Gemini API: {e}")
            fallback = get_fallback_response(name, habit)
            fallback["photo_caption"] = photo_caption
            return JSONResponse(content=fallback)
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/")
async def root():
    return {"message": "AI Roast Generator API is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 