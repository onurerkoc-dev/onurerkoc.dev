function WorkCard({ number, title, description, techStack, status }) {
  return (
    <article className="workCard">
      <span className="cardNumber">{number}</span>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="techStack">
        {techStack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>

      <div className="cardFooter">status: {status}</div>
    </article>
  )
}

export default WorkCard