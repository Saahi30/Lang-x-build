import { useState } from 'react'
import './App.css'
import RoastForm from './components/RoastForm'
import RoastDisplay from './components/RoastDisplay'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const [roastData, setRoastData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleRoastGenerated = (data) => {
    setRoastData(data)
    setIsLoading(false)
    setError(null)
  }

  const handleRoastError = (errorMessage) => {
    setError(errorMessage)
    setIsLoading(false)
    setRoastData(null)
  }

  const handleStartRoast = () => {
    setIsLoading(true)
    setError(null)
    setRoastData(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔥 AI Roast Generator</h1>
        <p>Get roasted by AI in Hinglish! 😄</p>
      </header>

      <main className="app-main">
        {!roastData && !isLoading && (
          <RoastForm 
            onStartRoast={handleStartRoast}
            onRoastGenerated={handleRoastGenerated}
            onRoastError={handleRoastError}
          />
        )}

        {isLoading && (
          <LoadingSpinner />
        )}

        {roastData && !isLoading && (
          <RoastDisplay 
            roastData={roastData}
            onGenerateNew={() => {
              setRoastData(null)
              setError(null)
            }}
          />
        )}

        {error && !isLoading && (
          <div className="error-message">
            <h3>Oops! Something went wrong 😅</h3>
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={() => setError(null)}
            >
              Try Again
            </button>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ using React + FastAPI + Gemini AI</p>
      </footer>
    </div>
  )
}

export default App
