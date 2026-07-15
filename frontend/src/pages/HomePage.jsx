import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import ProjectsSection from '../components/ProjectsSection'
import Section from '../components/Section'
import StackList from '../components/StackList'
import ContactForm from '../components/ContactForm'
import Seo from '../components/Seo'
import SiteFooter from '../components/SiteFooter'

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
                tag="01 / approach"
                title="I learn by shipping complete systems, not isolated demos."
                className="splitSection aboutV2"
            >
                <div className="aboutBody">
                    <p>
                        onurerkoc.dev is my engineering workspace. Every feature
                        moves through the same process used in real software
                        teams: planning, implementation, testing, pull request,
                        deployment and production verification.
                    </p>

                    <div className="engineeringPrinciples">
                        <article>
                            <span>01</span>

                            <div>
                                <h3>Build the complete flow</h3>
                                <p>
                                    Frontend, API, database and infrastructure are
                                    treated as one connected system.
                                </p>
                            </div>
                        </article>

                        <article>
                            <span>02</span>

                            <div>
                                <h3>Understand the infrastructure</h3>
                                <p>
                                    I deploy and operate the software instead of
                                    stopping when it works on localhost.
                                </p>
                            </div>
                        </article>

                        <article>
                            <span>03</span>

                            <div>
                                <h3>Document engineering decisions</h3>
                                <p>
                                    Git history, pull requests and project case studies
                                    record why each decision was made.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </Section>

            <ProjectsSection />

            <Section
                id="stack"
                tag="03 / stack"
                title="A focused stack for building and operating real systems."
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
                    Send a message through the form. It will be validated,
                    stored in PostgreSQL and delivered through the Spring Boot
                    notification system.
                </p>

                <ContactForm />
            </section>

            <SiteFooter />
        </main>
    )
}

export default HomePage