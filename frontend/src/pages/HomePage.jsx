import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import ProjectsSection from '../components/ProjectsSection'
import StackList from '../components/StackList'
import ContactForm from '../components/ContactForm'
import Seo from '../components/Seo'
import SiteFooter from '../components/SiteFooter'

const homeTitle =
  'Onur Erkoç | Software Engineering Portfolio'

const homeDescription =
  'Software Engineering student Onur Erkoç builds backend and full-stack projects with Java, Spring Boot, React, PostgreSQL, Docker, and Linux.'

const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://onurerkoc.dev/#website',
      url: 'https://onurerkoc.dev/',
      name: 'onurerkoc.dev',
      description: homeDescription,
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': 'https://onurerkoc.dev/#person',
      name: 'Onur Erkoç',
      url: 'https://onurerkoc.dev/',
      sameAs: [
        'https://github.com/onurerkoc-dev',
      ],
      jobTitle:
        'Software Engineering Student and Backend Developer',
      knowsAbout: [
        'Java',
        'Spring Boot',
        'REST APIs',
        'PostgreSQL',
        'React',
        'Docker',
        'Linux',
        'Nginx',
      ],
    },
  ],
}

const processSteps = [
  {
    number: '01',
    title: 'Model',
    detail:
      'Turn the problem into clear data, boundaries and responsibilities.',
  },
  {
    number: '02',
    title: 'Connect',
    detail:
      'Wire interface, API, persistence and infrastructure together.',
  },
  {
    number: '03',
    title: 'Ship',
    detail:
      'Package the system and move it through a reviewable deployment flow.',
  },
  {
    number: '04',
    title: 'Verify',
    detail:
      'Test the live path and inspect the system after it reaches production.',
  },
]

function HomePage() {
  return (
    <main className="wbSite">
      <Seo
        title={homeTitle}
        description={homeDescription}
        path="/"
        structuredData={homeStructuredData}
      />

      <Navbar />
      <Hero />
      <ProjectsSection />

      <section
        id="process"
        className="wbSection wbProcess"
      >
        <div className="wbSectionRail">
          <span>02</span>
          <strong>Build loop</strong>
        </div>

        <div className="wbSectionIntro">
          <h2>
            One path from
            <span>problem to runtime.</span>
          </h2>

          <p>
            I use a repeatable engineering loop instead of
            treating development as disconnected screens and
            endpoints.
          </p>
        </div>

        <div className="wbProcessTrack">
          {processSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <div className="wbProcessNode" />
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="stack" className="wbSection wbStack">
        <div className="wbSectionRail">
          <span>03</span>
          <strong>System stack</strong>
        </div>

        <div className="wbSectionIntro">
          <h2>
            Tools selected by
            <span>responsibility.</span>
          </h2>

          <p>
            The stack is organized by what each tool is
            responsible for inside the running system.
          </p>
        </div>

        <StackList />
      </section>

      <section
        id="contact"
        className="wbSection wbContact"
      >
        <div className="wbSectionRail">
          <span>04</span>
          <strong>Open channel</strong>
        </div>

        <div className="wbContactGrid">
          <div className="wbContactCopy">
            <span className="wbContactRoute">
              POST /api/contact
            </span>

            <h2>
              Bring a real problem.
              <span>We can start there.</span>
            </h2>

            <p>
              Backend internship, engineering collaboration
              or a serious software project.
            </p>
          </div>

          <div className="wbContactForm">
            <ContactForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

export default HomePage
