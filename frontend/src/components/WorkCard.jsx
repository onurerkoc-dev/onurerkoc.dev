function WorkCard({ number, title, description, techStack = [], status }) {
  return (
    <article className="workItem">
      <div className="workItemIndex">{number}</div>

      <div className="workItemMain">
        <div className="workItemHeader">
          <h3>{title}</h3>
          <span className="workItemStatus">{status}</span>
        </div>

        <p>{description}</p>

        <div className="techStack">
          {techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default WorkCard