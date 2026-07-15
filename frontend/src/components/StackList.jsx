const stackRows = [
  {
    layer: 'application',
    tool: 'Java 21',
    role: 'language',
    note: 'type-safe backend development',
  },
  {
    layer: 'application',
    tool: 'Spring Boot',
    role: 'framework',
    note: 'web, validation, data and mail',
  },
  {
    layer: 'data',
    tool: 'PostgreSQL',
    role: 'database',
    note: 'persistent application state',
  },
  {
    layer: 'data',
    tool: 'Spring Data JPA',
    role: 'mapping',
    note: 'repository and transaction layer',
  },
  {
    layer: 'delivery',
    tool: 'Docker',
    role: 'packaging',
    note: 'repeatable service delivery',
  },
  {
    layer: 'delivery',
    tool: 'Linux / Nginx',
    role: 'runtime',
    note: 'host and public gateway',
  },
]

function StackList() {
  return (
    <div className="wbStackTable">
      <div className="wbStackTableHead">
        <span>layer</span>
        <span>tool</span>
        <span>role</span>
        <span>responsibility</span>
      </div>

      {stackRows.map((row) => (
        <article key={`${row.layer}-${row.tool}`}>
          <span>{row.layer}</span>
          <strong>{row.tool}</strong>
          <span>{row.role}</span>
          <p>{row.note}</p>
        </article>
      ))}
    </div>
  )
}

export default StackList
