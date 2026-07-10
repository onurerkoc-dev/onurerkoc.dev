import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getProjectBySlug } from '../api/projectsApi'

function ProjectDetailPage() {
    const { slug } = useParams()

    const [project, setProject] = useState(null)
    const [status, setStatus] = useState('loading')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const controller = new AbortController()

        async function loadProject() {
            try {
                const data = await getProjectBySlug(slug, {
                    signal: controller.signal,
                })

                setProject(data)
                setStatus('success')
            } catch (error) {
                if (error.name === 'AbortError') {
                    return
                }

                setErrorMessage('Project could not be found.')
                setStatus('error')
            }
        }

        loadProject()

        return () => {
            controller.abort()
        }
    }, [slug])

    return (
        <main className="siteShell">
            <div className="backgroundGrid" />

            <section className="section projectDetailSection">
                <Link to="/" className="projectBackLink">
                    ← Back to build lab
                </Link>

                {status === 'loading' && (
                    <p className="sectionMuted">Loading project module...</p>
                )}

                {status === 'error' && (
                    <div>
                        <p className="sectionTag">Project unavailable</p>
                        <h1>Module not found.</h1>
                        <p className="sectionError">{errorMessage}</p>
                    </div>
                )}

                {status === 'success' && project && (
                    <article>
                        <p className="sectionTag">{project.type}</p>

                        <h1>{project.title}</h1>

                        <p className="projectDetailSummary">{project.summary}</p>

                        <p className="projectDetailDescription">
                            {project.description}
                        </p>

                        <div className="techStack">
                            {project.techStack.map((tech) => (
                                <span key={tech}>{tech}</span>
                            ))}
                        </div>

                        <div className="projectDetailMeta">
                            <div>
                                <span>Status</span>
                                <strong>{project.status}</strong>
                            </div>

                            <div>
                                <span>Module ID</span>
                                <strong>{project.id}</strong>
                            </div>
                        </div>

                        {(project.githubUrl || project.liveUrl) && (
                            <div className="workItemLinks">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub
                                    </a>
                                )}

                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Live project
                                    </a>
                                )}
                            </div>
                        )}
                    </article>
                )}
            </section>
        </main>
    )
}

export default ProjectDetailPage