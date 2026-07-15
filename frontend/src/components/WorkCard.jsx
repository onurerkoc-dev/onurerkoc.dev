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
    <article
      className={[
        'wbProjectRow',
        featured ? 'wbProjectFeatured' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="wbProjectNumber">
        <span>{number}</span>
        <small>{featured ? 'active build' : type}</small>
      </div>

      <div className="wbProjectContent">
        <header>
          <div>
            <p className="wbProjectRoute">
              /projects/{slug}
            </p>

            <h3>
              <Link to={`/projects/${slug}`}>
                {title}
              </Link>
            </h3>
          </div>

          <span className="wbProjectStatus">
            {status}
          </span>
        </header>

        <p className="wbProjectSummary">
          {summary}
        </p>

        {featured && description && (
          <p className="wbProjectDescription">
            {description}
          </p>
        )}

        <footer>
          <div className="wbProjectStack">
            {techStack.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>

          <div className="wbProjectExternal">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                source ↗
              </a>
            )}

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                live ↗
              </a>
            )}
          </div>
        </footer>
      </div>

      <Link
        to={`/projects/${slug}`}
        className="wbProjectOpen"
        aria-label={`Open ${title} case study`}
      >
        ↗
      </Link>
    </article>
  )
}

export default WorkCard
