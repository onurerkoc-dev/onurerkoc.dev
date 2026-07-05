import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Section from './components/Section'
import StackList from './components/StackList'
import WorkCard from './components/WorkCard'
import ProjectsSection from './components/ProjectsSection'

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

    <ProjectsSection />

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