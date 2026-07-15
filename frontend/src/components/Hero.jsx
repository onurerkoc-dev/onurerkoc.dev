import BackendStatus from './BackendStatus'

const topologyNodes = [
  {
    id: 'client',
    label: 'client',
    value: 'React / Vite',
  },
  {
    id: 'edge',
    label: 'edge',
    value: 'Nginx / HTTPS',
  },
  {
    id: 'service',
    label: 'service',
    value: 'Spring Boot',
  },
  {
    id: 'data',
    label: 'data',
    value: 'PostgreSQL',
  },
]

function Hero() {
  return (
    <section id="top" className="wbHero">
      <div className="wbHeroHeader">
        <span>Engineering workbench / 2026</span>
        <span>İstanbul, Türkiye</span>
      </div>

      <div className="wbHeroGrid">
        <div className="wbHeroCopy">
          <p className="wbKicker">
            Software engineering student
          </p>

          <h1>
            I build backend systems that survive
            <span>beyond localhost.</span>
          </h1>

          <p className="wbHeroLead">
            Java, Spring Boot, PostgreSQL and Docker—
            connected as one production system, not a pile
            of isolated demos.
          </p>

          <div className="wbHeroActions">
            <a className="wbPrimaryAction" href="#work">
              inspect selected work
              <span aria-hidden="true">→</span>
            </a>

            <a
              className="wbTextAction"
              href="https://github.com/onurerkoc-dev"
              target="_blank"
              rel="noreferrer"
            >
              github ↗
            </a>
          </div>
        </div>

        <aside
          className="wbTopology"
          aria-label="Production system topology"
        >
          <div className="wbPanelHeader">
            <span>system topology</span>
            <span>live</span>
          </div>

          <div className="wbTopologyFlow">
            {topologyNodes.map((node, index) => (
              <div className="wbTopologyStep" key={node.id}>
                <article>
                  <span>{node.label}</span>
                  <strong>{node.value}</strong>
                </article>

                {index < topologyNodes.length - 1 && (
                  <span
                    className="wbTopologyConnector"
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="wbTopologyStatus">
            <span className="wbStatusLabel">
              runtime check
            </span>

            <BackendStatus />
          </div>
        </aside>
      </div>

      <div className="wbHeroMetrics">
        <div>
          <span>primary stack</span>
          <strong>Java / Spring Boot</strong>
        </div>

        <div>
          <span>data layer</span>
          <strong>PostgreSQL / JPA</strong>
        </div>

        <div>
          <span>delivery</span>
          <strong>Docker / Linux / Nginx</strong>
        </div>

        <div>
          <span>current build</span>
          <strong>onurerkoc.dev</strong>
        </div>
      </div>
    </section>
  )
}

export default Hero
