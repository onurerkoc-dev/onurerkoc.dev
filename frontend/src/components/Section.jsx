function Section({ id, tag, title, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div>
        <p className="sectionTag">{tag}</p>
        <h2>{title}</h2>
      </div>

      {children}
    </section>
  )
}

export default Section