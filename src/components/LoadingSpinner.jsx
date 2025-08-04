import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './LoadingSpinner.css'

const LoadingSpinner = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  
  const messages = [
    "Thoda soch raha hoon... 🤔",
    "Burn level adjust kar raha hoon... 🔥",
    "Sarcasm calibrate ho raha hai... 😏",
    "Hinglish mode activate kar raha hoon... 🇮🇳",
    "AI ko roast karne ka training de raha hoon... 🎯",
    "Wit score calculate kar raha hoon... 📊",
    "Compliment balance kar raha hoon... ⚖️",
    "Final touch de raha hoon... ✨"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <motion.div 
      className="loading-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-content">
        <motion.div 
          className="spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          🔥
        </motion.div>
        
        <motion.h2
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="loading-message"
        >
          {messages[currentMessageIndex]}
        </motion.h2>
        
        <p className="loading-subtitle">
          AI aapka roast prepare kar raha hai...
        </p>
      </div>
    </motion.div>
  )
}

export default LoadingSpinner 