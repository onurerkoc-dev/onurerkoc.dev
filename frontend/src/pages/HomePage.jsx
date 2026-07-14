import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import ProjectsSection from '../components/ProjectsSection'
import Section from '../components/Section'
import StackList from '../components/StackList'
import ContactForm from '../components/ContactForm'
import Seo from '../components/Seo'

const homeTitle =
    'Onur Erkoç | Java & Spring Boot Backend Developer'

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

function HomePage() {
    return (
        <main className="siteShell">
            <Seo
                title={homeTitle}
                description={homeDescription}
                path="/"
                structuredData={homeStructuredData}
            />

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
                    This site is my personal full-stack lab. I use it to
                    practice real developer workflow: Git branches, pull
                    requests, REST APIs, server setup, Docker, deployment
                    and production thinking.
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

            <section
                id="contact"
                className="section contactSection"
            >
                <p className="sectionTag">04 / contact</p>

                <h2>
                    Open to backend, full-stack and
                    infrastructure-focused opportunities.
                </h2>

                <p className="contactIntro">
                    Send a message through the form. The request is
                    processed by the Spring Boot backend.
                </p>

                <ContactForm />
            </section>
        </main>
    )
}

export default HomePage