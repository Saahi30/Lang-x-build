import { useState } from 'react'
import { motion } from 'framer-motion'
import './RoastForm.css'

const RoastForm = ({ onStartRoast, onRoastGenerated, onRoastError }) => {
  const [formData, setFormData] = useState({
    name: '',
    habit: '',
    level: 3
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.habit.trim()) {
      onRoastError('Please fill in both name and habit fields!')
      return
    }

    onStartRoast()

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name.trim())
      formDataToSend.append('habit', formData.habit.trim())
      formDataToSend.append('level', formData.level)
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage)
      }

      const response = await fetch('/api/roast', {
        method: 'POST',
        body: formDataToSend
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to generate roast')
      }

      const roastData = await response.json()
      onRoastGenerated(roastData)

    } catch (error) {
      console.error('Error generating roast:', error)
      onRoastError(error.message || 'Failed to generate roast. Please try again!')
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  return (
    <motion.div 
      className="roast-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="roast-form">
        <h2>Let's Get You Roasted! 🔥</h2>
        
        <div className="form-group">
          <label htmlFor="name">Your Name / Nickname</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name or nickname"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="habit">Your Habit / Quirk</label>
          <textarea
            id="habit"
            name="habit"
            value={formData.habit}
            onChange={handleInputChange}
            placeholder="Describe your habit or quirk (e.g., 'Always starts projects last minute', 'Cannot resist checking phone every 5 minutes')"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="level">Roast Intensity</label>
          <div className="slider-container">
            <input
              type="range"
              id="level"
              name="level"
              min="1"
              max="5"
              value={formData.level}
              onChange={handleInputChange}
              className="slider"
            />
            <div className="slider-labels">
              <span>Gentle (1)</span>
              <span>Spicy (5)</span>
            </div>
            <div className="current-level">
              Level: {formData.level}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">Photo (Optional)</label>
          <div className="image-upload-container">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />
            <label htmlFor="image" className="image-upload-label">
              {imagePreview ? 'Change Photo' : 'Upload Photo'}
            </label>
          </div>
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button 
                type="button" 
                onClick={removeImage}
                className="remove-image-btn"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <motion.button
          type="submit"
          className="generate-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate Roast 🔥
        </motion.button>
      </form>
    </motion.div>
  )
}

export default RoastForm 