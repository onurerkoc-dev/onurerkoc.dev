import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Section from './components/Section'
import StackList from './components/StackList'
import WorkCard from './components/WorkCard'

const projectModules = [
  {
    number: '01',
    title: 'Frontend Interface',
    description:
      'React + Vite interface with a custom red-team inspired visual system, responsive layout and clean component structure.',
    status: 'initialized',
  },
  {
    number: '02',
    title: 'Spring Boot API',
    description:
      'Backend service for projects, skills, contact messages and later admin operations with validation and clean layers.',
    status: 'next',
  },
  {
    number: '03',
    title: 'Docker Deployment',
    description:
      'Containerized frontend, backend and PostgreSQL setup running on a DigitalOcean Ubuntu server behind Nginx.',
    status: 'planned',
  },
]

function App() {
  return (
    <main className="siteShell">
      <div className="backgroundGrid" />

      <Navbar />

      <Hero />

      <Section
        id="about"
        tag="01 / about"
        title="Not a template portfolio. A build journal."
        className="splitSection"
      >
        <p>
          This site is my personal full-stack lab. I use it to practice real
          developer workflow: Git branches, pull requests, REST APIs, server setup,
          Docker, deployment and production thinking.
        </p>
      </Section>

      <section id="work" className="section">
        <p className="sectionTag">02 / current build</p>
        <h2>Project modules</h2>

        <div className="workGrid">
          {projectModules.map((project) => (
            <WorkCard
              key={project.number}
              number={project.number}
              title={project.title}
              description={project.description}
              status={project.status}
            />
          ))}
        </div>
      </section>

      <Section
        id="stack"
        tag="03 / stack"
        title="Tools I am using to build this properly."
        className="stackSection"
      >
        <StackList />
      </Section>

      <section id="contact" className="section contactSection">
        <p className="sectionTag">04 / contact</p>
        <h2>Open to backend, full-stack and infrastructure-focused internships.</h2>
        <p>
          The contact form will be connected to the Spring Boot backend later.
          For now, GitHub and LinkedIn links will be added here.
        </p>
      </section>
    </main>
  )
}

export default App