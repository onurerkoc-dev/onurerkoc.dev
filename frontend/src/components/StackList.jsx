const stackItems = [
  'Java',
  'Spring Boot',
  'React',
  'Vite',
  'PostgreSQL',
  'Docker',
  'Git',
  'Linux',
  'Nginx',
  'DigitalOcean',
]

function StackList() {
  return (
    <div className="stackList">
      {stackItems.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  )
}

export default StackList