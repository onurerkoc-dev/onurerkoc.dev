import { Link } from 'react-router'

function WorkCard({
  number,
  title,
  type,
  summary,
  description,
  techStack = [],
  status,
  githubUrl,
  liveUrl,
  featured,
    slug,
}) {
  return (
    <article className={`workItem ${featured ? 'featuredWorkItem' : ''}`}>
      <div className="workItemIndex">{number}</div>

      <div className="workItemMain">
        <div className="workItemHeader">
          <div>
            <p className="workItemType">{type}</p>
            <h3>{title}</h3>
          </div>

          <span className="workItemStatus">{status}</span>
        </div>

        <p className="workItemSummary">{summary}</p>
        <p className="workItemDescription">{description}</p>

        <div className="techStack">
          {techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <Link
            to={`/projects/${slug}`}
            className="workItemDetailLink"
        >
          Open module →
        </Link>

        {(githubUrl || liveUrl) && (
          <div className="workItemLinks">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}

            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer">
                Live
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default WorkCard