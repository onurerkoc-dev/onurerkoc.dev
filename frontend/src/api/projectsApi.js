import { apiRequest } from './client'

export function getProjects(options = {}) {
  return apiRequest('/projects', options)
}