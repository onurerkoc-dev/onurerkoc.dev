import { apiRequest } from './client'

export function getBackendHealth(options = {}) {
  return apiRequest('/health', options)
}