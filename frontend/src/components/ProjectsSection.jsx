import { useEffect, useState } from 'react'
import { getProjects } from '../api/projectsApi'
import WorkCard from './WorkCard'

function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProjects() {
      try {
        const data = await getProjects({
          signal: controller.signal,
        })

        setProjects(data)
        setStatus('success')
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setErrorMessage('Projects API is unavailable right now.')
        setStatus('error')
      }
    }

    loadProjects()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <section id="work" className="section">
      <p className="sectionTag">02 / current build</p>
      <h2>Project modules</h2>

      {status === 'loading' && (
        <p className="sectionMuted">Loading projects from backend...</p>
      )}

      {status === 'error' && (
        <p className="sectionError">{errorMessage}</p>
      )}

      {status === 'success' && (
        <div className="workGrid">
          {projects.map((project, index) => (
<WorkCard
  key={project.id}
  number={String(index + 1).padStart(2, '0')}
  title={project.title}
  type={project.type}
  summary={project.summary}
  description={project.description}
  techStack={project.techStack}
  status={project.status}
  githubUrl={project.githubUrl}
  liveUrl={project.liveUrl}
  featured={project.featured}
  slug = {project.slug}
/>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProjectsSection