function Navbar() {
  return (
    <nav
      className="wbNav"
      aria-label="Main navigation"
    >
      <a
        className="wbBrand"
        href="#top"
        aria-label="Go to the top of the page"
      >
        <span className="wbBrandMark">OE</span>

        <span className="wbBrandCopy">
          <strong>Onur Erkoç</strong>
          <small>backend / systems / production</small>
        </span>
      </a>

      <div className="wbNavLinks">
        <a href="#work">
          <span>01</span>
          work
        </a>

        <a href="#process">
          <span>02</span>
          process
        </a>

        <a href="#stack">
          <span>03</span>
          stack
        </a>

        <a href="#contact">
          <span>04</span>
          contact
        </a>
      </div>

      <a className="wbNavAction" href="#contact">
        open channel
        <span aria-hidden="true">↘</span>
      </a>
    </nav>
  )
}

export default Navbar
