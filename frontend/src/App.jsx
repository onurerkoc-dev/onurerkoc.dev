import './App.css'

function App() {
  return (
    <main className="siteShell">
      <div className="backgroundGrid" />

      <nav className="navbar">
        <a className="brand" href="#top">
          <span className="brandMark">OE</span>
          <span>onurerkoc.dev</span>
        </a>

        <div className="navLinks">
          <a href="#about">about</a>
          <a href="#work">work</a>
          <a href="#stack">stack</a>
          <a href="#contact">contact</a>
        </div>
      </nav>

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

        <aside className="terminalCard" aria-label="project status terminal">
          <div className="terminalTopbar">
            <span />
            <span />
            <span />
          </div>

          <div className="terminalBody">
            <p><span className="prompt">onur@server</span>:~$ systemctl status portfolio</p>
            <p className="terminalGreen">● active — learning in progress</p>
            <p><span className="prompt">stack</span> react + spring_boot + postgres + docker</p>
            <p><span className="prompt">region</span> digitalocean / fra1</p>
            <p><span className="prompt">mode</span> build → document → deploy → improve</p>
          </div>
        </aside>
      </section>

      <section id="about" className="section splitSection">
        <div>
          <p className="sectionTag">01 / about</p>
          <h2>Not a template portfolio. A build journal.</h2>
        </div>

        <p>
          This site is my personal full-stack lab. I use it to practice real
          developer workflow: Git branches, pull requests, REST APIs, server setup,
          Docker, deployment and production thinking.
        </p>
      </section>

      <section id="work" className="section">
        <p className="sectionTag">02 / current build</p>
        <h2>Project modules</h2>

        <div className="workGrid">
          <article className="workCard">
            <span className="cardNumber">01</span>
            <h3>Frontend Interface</h3>
            <p>
              React + Vite interface with a custom red-team inspired visual system,
              responsive layout and clean component structure.
            </p>
            <div className="cardFooter">status: initialized</div>
          </article>

          <article className="workCard">
            <span className="cardNumber">02</span>
            <h3>Spring Boot API</h3>
            <p>
              Backend service for projects, skills, contact messages and later
              admin operations with validation and clean layers.
            </p>
            <div className="cardFooter">status: next</div>
          </article>

          <article className="workCard">
            <span className="cardNumber">03</span>
            <h3>Docker Deployment</h3>
            <p>
              Containerized frontend, backend and PostgreSQL setup running on a
              DigitalOcean Ubuntu server behind Nginx.
            </p>
            <div className="cardFooter">status: planned</div>
          </article>
        </div>
      </section>

      <section id="stack" className="section stackSection">
        <div>
          <p className="sectionTag">03 / stack</p>
          <h2>Tools I am using to build this properly.</h2>
        </div>

        <div className="stackList">
          <span>Java</span>
          <span>Spring Boot</span>
          <span>React</span>
          <span>Vite</span>
          <span>PostgreSQL</span>
          <span>Docker</span>
          <span>Git</span>
          <span>Linux</span>
          <span>Nginx</span>
          <span>DigitalOcean</span>
        </div>
      </section>

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