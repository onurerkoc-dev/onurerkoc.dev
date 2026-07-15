import BackendStatus from './BackendStatus'

function Hero() {
  return (
      <section id="top" className="hero heroV2">
        <div className="heroContent">
          <div className="heroEyebrow">
            <span>Onur Erkoç</span>
            <span>Software Engineering · İstanbul</span>
          </div>

          <h1>
            I build backend systems and take them all the way to
            production.
          </h1>

          <p className="heroText">
            I am a Software Engineering student focused on Java,
            Spring Boot and backend development. I use this platform
            to build complete systems with PostgreSQL, Docker, Linux,
            REST APIs and real production infrastructure.
          </p>

          <div className="heroActions">
            <a className="buttonPrimary" href="#work">
              Explore projects
            </a>

            <a className="buttonGhost" href="#contact">
              Contact me
            </a>

            <a
                className="heroTextLink"
                href="https://github.com/onurerkoc-dev"
                target="_blank"
                rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>

          <p className="heroNote">
            Currently learning Spring Boot architecture, PostgreSQL,
            Docker and distributed backend systems.
          </p>
        </div>

        <aside
            className="heroRail"
            aria-label="Current engineering focus"
        >
          <div className="heroRailHeader">
            <span>Current engineering focus</span>
            <span>2026</span>
          </div>

          <dl className="heroFacts">
            <div>
              <dt>Primary stack</dt>
              <dd>Java · Spring Boot</dd>
            </div>

            <div>
              <dt>Database</dt>
              <dd>PostgreSQL</dd>
            </div>

            <div>
              <dt>Infrastructure</dt>
              <dd>Docker · Linux · Nginx</dd>
            </div>

            <div>
              <dt>Direction</dt>
              <dd>Backend · Cloud · Distributed systems</dd>
            </div>

            <div>
              <dt>Current project</dt>
              <dd>onurerkoc.dev</dd>
            </div>
          </dl>

          <BackendStatus />
        </aside>
      </section>
  )
}

export default Hero