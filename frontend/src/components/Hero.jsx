import TerminalCard from './TerminalCard'

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="heroContent">
        <p className="kicker">/ full-stack systems / backend / security-minded engineering</p>

        <h1>
          Building production-style web systems with
          <span> React, Spring Boot and Linux.</span>
        </h1>

        <p className="heroText">
          I am building onurerkoc.dev as a real engineering project: frontend,
          backend API, PostgreSQL, Docker, deployment, monitoring and clean Git workflow.
        </p>

        <div className="heroActions">
          <a className="buttonPrimary" href="#work">View build log</a>
          <a
            className="buttonGhost"
            href="https://github.com/onurerkoc-dev"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>

      <TerminalCard />
    </section>
  )
}

export default Hero