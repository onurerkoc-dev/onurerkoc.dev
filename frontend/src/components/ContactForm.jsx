import { useState } from 'react'
import { submitContactForm } from '../api/contactApi'

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    setStatus('submitting')
    setFeedback('')

    try {
      const response = await submitContactForm({
        name,
        email,
        message,
      })

      setStatus('success')
      setFeedback(response)

      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      setStatus('error')
      setFeedback('Message could not be sent. Please try again.')
    }
  }

  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <div className="contactField">
        <label htmlFor="contact-name">Name</label>

        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          required
        />
      </div>

      <div className="contactField">
        <label htmlFor="contact-email">Email</label>

        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="contactField">
        <label htmlFor="contact-message">Message</label>

        <textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell me about the opportunity or project."
          rows="6"
          required
        />
      </div>

      <button
        className="contactSubmitButton"
        type="submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>

      {feedback && (
        <p className={`contactFeedback ${status}`}>
          {feedback}
        </p>
      )}
    </form>
  )
}

export default ContactForm