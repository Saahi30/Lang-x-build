import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './RoastDisplay.css'

const TypewriterText = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 50) // Adjust speed here

      return () => clearTimeout(timeout)
    } else {
      onComplete && onComplete()
    }
  }, [currentIndex, text, onComplete])

  return <span>{displayText}</span>
}

const RoastDisplay = ({ roastData, onGenerateNew }) => {
  const [showCompliment, setShowCompliment] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)

  useEffect(() => {
    // Show compliment after roast is complete
    const complimentTimer = setTimeout(() => {
      setShowCompliment(true)
    }, 2000)

    // Show metrics after compliment
    const metricsTimer = setTimeout(() => {
      setShowMetrics(true)
    }, 4000)

    return () => {
      clearTimeout(complimentTimer)
      clearTimeout(metricsTimer)
    }
  }, [])

  const confidencePercentage = parseInt(roastData.confidence_pct.replace('%', ''))

  return (
    <motion.div 
      className="roast-display-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="roast-card">
        <div className="roast-header">
          <motion.span 
            className="roast-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {roastData.tag}
          </motion.span>
        </div>

        <div className="roast-content">
          <motion.div 
            className="roast-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TypewriterText 
              text={roastData.roast}
              onComplete={() => console.log('Roast complete')}
            />
          </motion.div>

          {showCompliment && (
            <motion.div 
              className="compliment-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <em>{roastData.compliment}</em>
            </motion.div>
          )}
        </div>

        {roastData.photo_caption && roastData.photo_caption !== "Casual focused vibe" && (
          <motion.div 
            className="photo-caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="caption-label">AI vibe detected:</span>
            <span className="caption-text">{roastData.photo_caption}</span>
          </motion.div>
        )}

        {showMetrics && (
          <motion.div 
            className="metrics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="metric">
              <span className="metric-label">Confidence</span>
              <div className="progress-bar">
                <motion.div 
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${confidencePercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <span className="metric-value">{roastData.confidence_pct}</span>
            </div>

            <div className="metric">
              <span className="metric-label">Wit Score</span>
              <span className="metric-value">{roastData.wit_score}/10</span>
            </div>
          </motion.div>
        )}
      </div>

      <motion.button
        className="generate-new-btn"
        onClick={onGenerateNew}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Generate Another Roast 🔥
      </motion.button>
    </motion.div>
  )
}

export default RoastDisplay 