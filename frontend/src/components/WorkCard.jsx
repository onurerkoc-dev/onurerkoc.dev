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
  const visibleTechnologies = techStack.slice(0, 6)
  const hiddenTechnologyCount =
      techStack.length - visibleTechnologies.length

  return (
      <article
          className={[
            'workItem',
            'workItemV2',
            featured ? 'featuredWorkItem' : '',
          ]
              .filter(Boolean)
              .join(' ')}
      >
        <div className="workItemIndexColumn">
          <span className="workItemIndex">{number}</span>

          {featured && (
              <span className="featuredIndicator">
            Featured
          </span>
          )}
        </div>

        <div className="workItemMain">
          <header className="workItemHeader">
            <div>
              <p className="workItemType">
                {featured
                    ? 'Featured case study'
                    : 'Engineering case study'}
                <span> · </span>
                {type}
              </p>

              <h3>
                <Link to={`/projects/${slug}`}>
                  {title}
                </Link>
              </h3>
            </div>

            <span className="workItemStatus">
            <span />
              {status}
          </span>
          </header>

          <p className="workItemSummary">{summary}</p>

          {featured && description && (
              <p className="workItemDescription">
                {description}
              </p>
          )}

          <div
              className="techStack projectCardTechStack"
              aria-label="Project technologies"
          >
            {visibleTechnologies.map((technology) => (
                <span key={technology}>{technology}</span>
            ))}

            {hiddenTechnologyCount > 0 && (
                <span>+{hiddenTechnologyCount}</span>
            )}
          </div>

          <footer className="workItemFooter">
            <Link
                to={`/projects/${slug}`}
                className="workItemDetailLink"
            >
              Read engineering case study
              <span aria-hidden="true">→</span>
            </Link>

            {(githubUrl || liveUrl) && (
                <div className="workItemLinks">
                  {githubUrl && (
                      <a
                          href={githubUrl}
                          target="_blank"
                          rel="noreferrer"
                      >
                        GitHub ↗
                      </a>
                  )}

                  {liveUrl && (
                      <a
                          href={liveUrl}
                          target="_blank"
                          rel="noreferrer"
                      >
                        Live ↗
                      </a>
                  )}
                </div>
            )}
          </footer>
        </div>
      </article>
  )
}

export default WorkCard