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
      <section
          id="work"
          className="section projectsSectionV2"
      >
        <div className="projectsSectionHeader">
          <div>
            <p className="sectionTag">
              02 / engineering work
            </p>

            <h2>
              Projects built as complete engineering systems.
            </h2>

            <p className="projectsIntro">
              Each project documents the problem, system
              architecture, technical decisions and the next stage
              of development.
            </p>
          </div>

          {status === 'success' && (
              <span className="projectCount">
            {projects.length}{' '}
                {projects.length === 1
                    ? 'case study'
                    : 'case studies'}
          </span>
          )}
        </div>

        {status === 'loading' && (
            <div className="projectsLoadingState">
              <span />
              <p>Loading projects from the Spring Boot API...</p>
            </div>
        )}

        {status === 'error' && (
            <div className="projectsErrorState">
              <p className="sectionError">{errorMessage}</p>
              <span>
            The rest of the portfolio remains available.
          </span>
            </div>
        )}

        {status === 'success' && (
            <div className="workGrid workGridV2">
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