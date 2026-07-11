import { apiRequest } from './client'

export function submitContactForm(contactData, options = {}) {
  return apiRequest('/contact', {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(contactData),
  })
}