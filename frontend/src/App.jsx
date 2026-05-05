import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('')
  const [shortened, setShortened] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleShorten = async (e) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) throw new Error('Failed to shorten URL')

      const data = await response.json()
      // Generate the full short URL
      const fullShortUrl = `${window.location.origin}/${data.shortCode}`
      setShortened(fullShortUrl)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortened)
    alert('Copied to clipboard!')
  }

  return (
    <div className="container">
      <header>
        <h1>LinkSnap</h1>
        <br></br>
        <p className="subtitle">Fast & Reliable URL Shortener</p>
      </header>

      <main className="input-card">
        <form onSubmit={handleShorten} className="input-group">
          <input
            type="url"
            placeholder="Paste your long link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Shortening...' : 'Get Link'}
          </button>
        </form>

        {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}

        {shortened && (
          <div className="result-card">
            <a href={shortened} target="_blank" rel="noopener noreferrer" className="short-url">
              {shortened}
            </a>
            <button className="copy-btn" onClick={copyToClipboard}>
              Copy
            </button>
          </div>
        )}
      </main>


    </div>
  )
}

export default App
