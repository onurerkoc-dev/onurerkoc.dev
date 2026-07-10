import { apiRequest } from './client'

export function getProjects(options = {}) {
  return apiRequest('/projects', options)
}

export function getProjectBySlug(slug, options = {}) {
  return apiRequest(`/projects/${slug}`, options)
}