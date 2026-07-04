function WorkCard({ number, title, description, status }) {
  return (
    <article className="workCard">
      <span className="cardNumber">{number}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="cardFooter">status: {status}</div>
    </article>
  )
}

export default WorkCard