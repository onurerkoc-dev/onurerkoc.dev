import { useEffect, useState } from 'react'
import { getBackendHealth } from '../api/healthApi'

function BackendStatus() {
  const [message, setMessage] = useState(
    'Checking backend...'
  )
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    const controller = new AbortController()

    async function checkBackend() {
      try {
        const data = await getBackendHealth({
          signal: controller.signal,
        })

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
    <div
      className={`backendStatus ${status}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="backendDot" aria-hidden="true" />

      <div>
        <strong>backend status</strong>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default BackendStatus
