import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import {
    getProjectBySlug,
    getProjects,
} from '../api/projectsApi'
import Seo from '../components/Seo'
import SiteFooter from '../components/SiteFooter'

function formatUpdatedAt(value) {
    if (!value) {
        return 'Active development'
    }

    const parsedDate = new Date(value)

    if (Number.isNaN(parsedDate.getTime())) {
        return value
    }

    return new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(parsedDate)
}

function getIsoDate(value) {
    if (!value) {
        return null
    }

    const parsedDate = new Date(value)

    if (Number.isNaN(parsedDate.getTime())) {
        return null
    }

    return parsedDate.toISOString()
}

function ProjectDetailPage() {
    const { slug } = useParams()

    const [project, setProject] = useState(null)
    const [allProjects, setAllProjects] = useState([])
    const [status, setStatus] = useState('loading')
    const [errorMessage, setErrorMessage] = useState('')

    const canonicalPath = `/projects/${slug}`
    const canonicalUrl =
        `https://onurerkoc.dev${canonicalPath}`

    const projectTechStack = project?.techStack ?? []
    const keyDecisions = project?.keyDecisions ?? []
    const nextSteps = project?.nextSteps ?? []

    const normalizedUpdatedAt =
        status === 'success' && project
            ? getIsoDate(project.updatedAt)
            : null

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
                keywords: projectTechStack.join(', '),
                author: {
                    '@type': 'Person',
                    name: 'Onur Erkoç',
                    url: 'https://onurerkoc.dev/',
                },
                ...(normalizedUpdatedAt
                    ? {
                        dateModified: normalizedUpdatedAt,
                    }
                    : {}),
                ...(project.githubUrl
                    ? {
                        codeRepository: project.githubUrl,
                    }
                    : {}),
            }
            : null

    const currentProjectIndex = allProjects.findIndex(
        (item) => item.slug === slug
    )

    const previousProject =
        currentProjectIndex > 0
            ? allProjects[currentProjectIndex - 1]
            : null

    const nextProject =
        currentProjectIndex >= 0 &&
        currentProjectIndex < allProjects.length - 1
            ? allProjects[currentProjectIndex + 1]
            : null

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        })
    }, [slug])

    useEffect(() => {
        const controller = new AbortController()

        setProject(null)
        setStatus('loading')
        setErrorMessage('')

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

        async function loadProjectNavigation() {
            try {
                const data = await getProjects({
                    signal: controller.signal,
                })

                setAllProjects(data)
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setAllProjects([])
                }
            }
        }

        loadProject()
        loadProjectNavigation()

        return () => {
            controller.abort()
        }
    }, [slug])

    return (
        <main
            id="top"
            className="siteShell projectPageShell"
        >
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

            <section
                className="
          section
          projectDetailSection
          projectDetailSectionV2
        "
            >
                <Link
                    to="/#work"
                    className="projectBackLink projectBackLinkV2"
                >
                    <span aria-hidden="true">←</span>
                    All engineering projects
                </Link>

                {status === 'loading' && (
                    <div className="projectLoadingState">
                        <span />
                        <p>Loading engineering case study...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="projectErrorState">
                        <p className="sectionTag">
                            Project unavailable
                        </p>

                        <h1>Case study not found.</h1>

                        <p className="sectionError">
                            {errorMessage}
                        </p>

                        <Link
                            to="/#work"
                            className="buttonPrimary"
                        >
                            Return to projects
                        </Link>
                    </div>
                )}

                {status === 'success' && project && (
                    <article className="projectCaseStudy projectCaseStudyV2">
                        <header className="projectDetailHeader projectDetailHeaderV2">
                            <div className="projectDetailEyebrow">
                                <p className="sectionTag">
                                    {project.type}
                                </p>

                                {project.featured && (
                                    <span>Featured case study</span>
                                )}
                            </div>

                            <h1>{project.title}</h1>

                            <p className="projectDetailSummary">
                                {project.summary}
                            </p>

                            <div className="projectDetailMeta projectDetailMetaV2">
                                <div>
                                    <span>Status</span>
                                    <strong>{project.status}</strong>
                                </div>

                                <div>
                                    <span>Last updated</span>
                                    <strong>
                                        {formatUpdatedAt(project.updatedAt)}
                                    </strong>
                                </div>

                                <div>
                                    <span>Technologies</span>
                                    <strong>
                                        {projectTechStack.length}
                                    </strong>
                                </div>
                            </div>

                            <div
                                className="
                  techStack
                  projectDetailTechStack
                "
                            >
                                {projectTechStack.map((technology) => (
                                    <span key={technology}>
                    {technology}
                  </span>
                                ))}
                            </div>

                            {(project.githubUrl ||
                                project.liveUrl) && (
                                <div className="projectDetailActions">
                                    {project.liveUrl && (
                                        <a
                                            className="projectPrimaryAction"
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Open live project ↗
                                        </a>
                                    )}

                                    {project.githubUrl && (
                                        <a
                                            className="projectSecondaryAction"
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View source code ↗
                                        </a>
                                    )}
                                </div>
                            )}
                        </header>

                        <div className="projectCaseStudyLayout">
                            <aside className="caseStudyNavigation">
                                <p>Case study</p>

                                <nav aria-label="Case study sections">
                                    <a href="#overview">
                                        <span>01</span>
                                        Overview
                                    </a>

                                    <a href="#problem">
                                        <span>02</span>
                                        Problem
                                    </a>

                                    <a href="#goal">
                                        <span>03</span>
                                        Goal
                                    </a>

                                    <a href="#architecture">
                                        <span>04</span>
                                        Architecture
                                    </a>

                                    <a href="#decisions">
                                        <span>05</span>
                                        Decisions
                                    </a>

                                    <a href="#roadmap">
                                        <span>06</span>
                                        Roadmap
                                    </a>
                                </nav>
                            </aside>

                            <div className="caseStudyContent">
                                <section
                                    id="overview"
                                    className="
                    caseStudyBlockV2
                    caseStudyOverview
                  "
                                >
                                    <div className="caseStudySectionHeader">
                                        <span>01</span>

                                        <div>
                                            <p>Implementation overview</p>
                                            <h2>What was built</h2>
                                        </div>
                                    </div>

                                    <p>{project.description}</p>
                                </section>

                                <div className="caseStudyPair">
                                    <section
                                        id="problem"
                                        className="caseStudyBlockV2"
                                    >
                                        <div className="caseStudySectionHeader">
                                            <span>02</span>

                                            <div>
                                                <p>Context</p>
                                                <h2>Problem</h2>
                                            </div>
                                        </div>

                                        <p>{project.problem}</p>
                                    </section>

                                    <section
                                        id="goal"
                                        className="caseStudyBlockV2"
                                    >
                                        <div className="caseStudySectionHeader">
                                            <span>03</span>

                                            <div>
                                                <p>Direction</p>
                                                <h2>Goal</h2>
                                            </div>
                                        </div>

                                        <p>{project.goal}</p>
                                    </section>
                                </div>

                                <section
                                    id="architecture"
                                    className="
                    caseStudyBlockV2
                    architectureCaseStudyBlock
                  "
                                >
                                    <div className="caseStudySectionHeader">
                                        <span>04</span>

                                        <div>
                                            <p>System design</p>
                                            <h2>Architecture</h2>
                                        </div>
                                    </div>

                                    <div className="architectureStatement">
                                        <span>Architecture note</span>
                                        <p>{project.architecture}</p>
                                    </div>

                                    <div className="architectureStack">
                                        <p>Implemented with</p>

                                        <div>
                                            {projectTechStack.map(
                                                (technology) => (
                                                    <span key={technology}>
                            {technology}
                          </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </section>

                                <div className="caseStudyPair">
                                    <section
                                        id="decisions"
                                        className="caseStudyBlockV2"
                                    >
                                        <div className="caseStudySectionHeader">
                                            <span>05</span>

                                            <div>
                                                <p>Engineering</p>
                                                <h2>Key decisions</h2>
                                            </div>
                                        </div>

                                        <ol className="caseStudyDecisionList">
                                            {keyDecisions.map(
                                                (decision, index) => (
                                                    <li key={decision}>
                            <span>
                              {String(index + 1).padStart(
                                  2,
                                  '0'
                              )}
                            </span>

                                                        <p>{decision}</p>
                                                    </li>
                                                )
                                            )}
                                        </ol>
                                    </section>

                                    <section
                                        id="roadmap"
                                        className="caseStudyBlockV2"
                                    >
                                        <div className="caseStudySectionHeader">
                                            <span>06</span>

                                            <div>
                                                <p>Development roadmap</p>
                                                <h2>Next steps</h2>
                                            </div>
                                        </div>

                                        <ol className="caseStudyDecisionList">
                                            {nextSteps.map((step, index) => (
                                                <li key={step}>
                          <span>
                            {String(index + 1).padStart(
                                2,
                                '0'
                            )}
                          </span>

                                                    <p>{step}</p>
                                                </li>
                                            ))}
                                        </ol>
                                    </section>
                                </div>
                            </div>
                        </div>

                        {(previousProject || nextProject) && (
                            <nav
                                className="projectPagination"
                                aria-label="Project navigation"
                            >
                                {previousProject ? (
                                    <Link
                                        to={`/projects/${previousProject.slug}`}
                                        className="projectPaginationLink"
                                    >
                                        <span>← Previous case study</span>
                                        <strong>
                                            {previousProject.title}
                                        </strong>
                                    </Link>
                                ) : (
                                    <span />
                                )}

                                {nextProject && (
                                    <Link
                                        to={`/projects/${nextProject.slug}`}
                                        className="
                      projectPaginationLink
                      projectPaginationNext
                    "
                                    >
                                        <span>Next case study →</span>
                                        <strong>
                                            {nextProject.title}
                                        </strong>
                                    </Link>
                                )}
                            </nav>
                        )}
                    </article>
                )}
            </section>

            <SiteFooter />
        </main>
    )
}

export default ProjectDetailPage