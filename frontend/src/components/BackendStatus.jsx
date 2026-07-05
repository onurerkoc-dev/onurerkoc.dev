import { useEffect, useState } from 'react'

function BackendStatus() {
  const [message, setMessage] = useState('Checking backend...')
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    const controller = new AbortController()

    async function checkBackend() {
      try {
        const response = await fetch('/api/health', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.text()

        setMessage(data)
        setStatus('online')
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setMessage('Backend unavailable')
        setStatus('offline')
      }
    }

    checkBackend()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className={`backendStatus ${status}`}>
      <span className="backendDot" />
      <div>
        <strong>backend status</strong>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default BackendStatus