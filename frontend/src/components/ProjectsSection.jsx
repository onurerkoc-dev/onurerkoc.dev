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

        setErrorMessage(
          'Projects API is unavailable right now.'
        )
        setStatus('error')
      }
    }

    loadProjects()

    return () => {
      controller.abort()
    }
  }, [])

  const sortedProjects = [...projects].sort(
    (firstProject, secondProject) =>
      Number(secondProject.featured) -
      Number(firstProject.featured)
  )

  return (
    <section id="work" className="wbSection wbProjects">
      <div className="wbSectionRail">
        <span>01</span>
        <strong>Selected work</strong>
      </div>

      <div className="wbSectionIntro">
        <h2>
          Systems with
          <span>traceable decisions.</span>
        </h2>

        <p>
          Every project exposes the problem, architecture,
          trade-offs and next steps—not only the final screen.
        </p>
      </div>

      {status === 'loading' && (
        <div className="wbRequestState">
          <span />
          GET /api/projects
        </div>
      )}

      {status === 'error' && (
        <div className="wbErrorState">
          <strong>{errorMessage}</strong>
          <span>The remaining interface is still available.</span>
        </div>
      )}

      {status === 'success' && (
        <div className="wbRepository">
          <div className="wbRepositoryHeader">
            <span>repository</span>
            <span>{projects.length} entries</span>
          </div>

          {sortedProjects.map((project, index) => (
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
              slug={project.slug}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProjectsSection
