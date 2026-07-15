import { useState } from 'react'
import { submitContactForm } from '../api/contactApi'

const initialValues = {
  name: '',
  email: '',
  message: '',
}

const initialTouched = {
  name: false,
  email: false,
  message: false,
}

function validateField(fieldName, value) {
  const normalizedValue = value.trim()

  if (fieldName === 'name' && !normalizedValue) {
    return 'Enter your name.'
  }

  if (fieldName === 'email') {
    if (!normalizedValue) {
      return 'Enter your email address.'
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(normalizedValue)) {
      return 'Enter a valid email address.'
    }
  }

  if (fieldName === 'message' && !normalizedValue) {
    return 'Enter a message.'
  }

  return ''
}

function validateForm(values) {
  return {
    name: validateField('name', values.name),
    email: validateField('email', values.email),
    message: validateField('message', values.message),
  }
}

function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState(initialTouched)
  const [errors, setErrors] = useState(initialValues)
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  function updateField(fieldName, value) {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }))

    if (touched[fieldName]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [fieldName]: validateField(fieldName, value),
      }))
    }

    if (status === 'error' || status === 'success') {
      setStatus('idle')
      setFeedback('')
    }
  }

  function handleBlur(fieldName) {
    setTouched((currentTouched) => ({
      ...currentTouched,
      [fieldName]: true,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: validateField(
        fieldName,
        values[fieldName]
      ),
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateForm(values)
    const firstInvalidField = Object.keys(nextErrors).find(
      (fieldName) => nextErrors[fieldName]
    )

    setTouched({
      name: true,
      email: true,
      message: true,
    })
    setErrors(nextErrors)

    if (firstInvalidField) {
      document
        .getElementById(`contact-${firstInvalidField}`)
        ?.focus()
      return
    }

    setStatus('submitting')
    setFeedback('')

    try {
      const response = await submitContactForm({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      })

      setStatus('success')
      setFeedback(response)
      setValues(initialValues)
      setTouched(initialTouched)
      setErrors(initialValues)
    } catch {
      setStatus('error')
      setFeedback(
        'Message could not be sent. Please try again.'
      )
    }
  }

  function fieldClassName(fieldName) {
    return [
      'contactField',
      touched[fieldName] && errors[fieldName]
        ? 'hasError'
        : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  return (
    <form
      className="contactForm"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === 'submitting'}
    >
      <div className={fieldClassName('name')}>
        <label htmlFor="contact-name">Name</label>

        <input
          id="contact-name"
          type="text"
          value={values.name}
          onChange={(event) =>
            updateField('name', event.target.value)
          }
          onBlur={() => handleBlur('name')}
          placeholder="Your name"
          autoComplete="name"
          maxLength={100}
          aria-invalid={
            touched.name && Boolean(errors.name)
          }
          aria-describedby={
            touched.name && errors.name
              ? 'contact-name-error'
              : undefined
          }
        />

        {touched.name && errors.name && (
          <p
            id="contact-name-error"
            className="contactFieldError"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div className={fieldClassName('email')}>
        <label htmlFor="contact-email">Email</label>

        <input
          id="contact-email"
          type="email"
          value={values.email}
          onChange={(event) =>
            updateField('email', event.target.value)
          }
          onBlur={() => handleBlur('email')}
          placeholder="you@example.com"
          autoComplete="email"
          inputMode="email"
          maxLength={255}
          aria-invalid={
            touched.email && Boolean(errors.email)
          }
          aria-describedby={
            touched.email && errors.email
              ? 'contact-email-error'
              : undefined
          }
        />

        {touched.email && errors.email && (
          <p
            id="contact-email-error"
            className="contactFieldError"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div className={fieldClassName('message')}>
        <label htmlFor="contact-message">Message</label>

        <textarea
          id="contact-message"
          value={values.message}
          onChange={(event) =>
            updateField('message', event.target.value)
          }
          onBlur={() => handleBlur('message')}
          placeholder="Tell me about the opportunity or project."
          rows="6"
          maxLength={2000}
          aria-invalid={
            touched.message && Boolean(errors.message)
          }
          aria-describedby={[
            'contact-message-count',
            touched.message && errors.message
              ? 'contact-message-error'
              : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />

        <div className="contactFieldMeta">
          {touched.message && errors.message ? (
            <p
              id="contact-message-error"
              className="contactFieldError"
            >
              {errors.message}
            </p>
          ) : (
            <span />
          )}

          <p
            id="contact-message-count"
            className="contactCharacterCount"
          >
            {values.message.length} / 2000
          </p>
        </div>
      </div>

      <button
        className="contactSubmitButton"
        type="submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' && (
          <span
            className="contactButtonSpinner"
            aria-hidden="true"
          />
        )}

        <span>
          {status === 'submitting'
            ? 'Sending request...'
            : 'Send message'}
        </span>
      </button>

      {feedback && (
        <p
          className={`contactFeedback ${status}`}
          role={status === 'error' ? 'alert' : 'status'}
          aria-live={status === 'error' ? 'assertive' : 'polite'}
        >
          <span aria-hidden="true">
            {status === 'success' ? '✓' : '!'}
          </span>
          {feedback}
        </p>
      )}
    </form>
  )
}

export default ContactForm
