import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getProjectBySlug } from '../api/projectsApi'
import Seo from '../components/Seo'



function ProjectDetailPage() {
    const { slug } = useParams()

    const [project, setProject] = useState(null)
    const [status, setStatus] = useState('loading')
    const [errorMessage, setErrorMessage] = useState('')
    const canonicalPath = `/projects/${slug}`
    const canonicalUrl = `https://onurerkoc.dev${canonicalPath}`

    const seoTitle =
        status === 'success' && project
            ? `${project.title} | Onur Erkoç`
            : status === 'error'
                ? 'Project Not Found | Onur Erkoç'
                : 'Project Case Study | Onur Erkoç'

    const seoDescription =
        status === 'success' && project
            ? project.summary
            : status === 'error'
                ? 'The requested project could not be found on onurerkoc.dev.'
                : 'Engineering project case study by Onur Erkoç.'

    const seoRobots =
        status === 'error'
            ? 'noindex, nofollow'
            : 'index, follow'

    const projectStructuredData =
        status === 'success' && project
            ? {
                '@context': 'https://schema.org',
                '@type': 'SoftwareSourceCode',
                name: project.title,
                description: project.summary,
                url: canonicalUrl,
                dateModified: project.updatedAt,
                keywords: project.techStack.join(', '),
                author: {
                    '@type': 'Person',
                    name: 'Onur Erkoç',
                    url: 'https://onurerkoc.dev/',
                },
                ...(project.githubUrl
                    ? {
                        codeRepository: project.githubUrl,
                    }
                    : {}),
            }
            : null
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
            <Seo
                title={seoTitle}
                description={seoDescription}
                path={canonicalPath}
                robots={seoRobots}
                type={
                    status === 'success'
                        ? 'article'
                        : 'website'
                }
                structuredData={projectStructuredData}
            />
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
                    <article className="projectCaseStudy">
                        <header className="projectDetailHeader">
                            <p className="sectionTag">{project.type}</p>

                            <h1>{project.title}</h1>

                            <p className="projectDetailSummary">
                                {project.summary}
                            </p>

                            <div className="projectDetailMeta">
                                <div>
                                    <span>Status</span>
                                    <strong>{project.status}</strong>
                                </div>

                                <div>
                                    <span>Module ID</span>
                                    <strong>{project.id}</strong>
                                </div>

                                <div>
                                    <span>Last updated</span>
                                    <strong>{project.updatedAt}</strong>
                                </div>
                            </div>

                            <div className="techStack">
                                {project.techStack.map((tech) => (
                                    <span key={tech}>{tech}</span>
                                ))}
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
                        </header>

                        <div className="caseStudyGrid">
                            <section className="caseStudyBlock">
                                <p className="caseStudyLabel">01 / Context</p>
                                <h2>Problem</h2>
                                <p>{project.problem}</p>
                            </section>

                            <section className="caseStudyBlock">
                                <p className="caseStudyLabel">02 / Direction</p>
                                <h2>Goal</h2>
                                <p>{project.goal}</p>
                            </section>
                        </div>

                        <section className="caseStudyBlock caseStudyBlockWide">
                            <p className="caseStudyLabel">03 / System design</p>
                            <h2>Architecture</h2>
                            <p>{project.architecture}</p>
                        </section>

                        <div className="caseStudyGrid">
                            <section className="caseStudyBlock">
                                <p className="caseStudyLabel">04 / Engineering</p>
                                <h2>Key decisions</h2>

                                <ul className="caseStudyList">
                                    {project.keyDecisions.map((decision) => (
                                        <li key={decision}>{decision}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="caseStudyBlock">
                                <p className="caseStudyLabel">05 / Roadmap</p>
                                <h2>Next steps</h2>

                                <ul className="caseStudyList">
                                    {project.nextSteps.map((step) => (
                                        <li key={step}>{step}</li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        <section className="caseStudyBlock caseStudyBlockWide">
                            <p className="caseStudyLabel">06 / Overview</p>
                            <h2>Module description</h2>
                            <p>{project.description}</p>
                        </section>
                    </article>
                )}
            </section>
        </main>
    )
}

export default ProjectDetailPage