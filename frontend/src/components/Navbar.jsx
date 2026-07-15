function Navbar() {
    return (
        <nav className="navbar" aria-label="Main navigation">
            <a
                className="brand"
                href="#top"
                aria-label="Go to the top of the page"
            >
                <span className="brandMark">OE</span>

                <span className="brandIdentity">
          <strong>Onur Erkoç</strong>
          <small>Backend engineering journal</small>
        </span>
            </a>

            <div className="navLinks">
                <a href="#about">about</a>
                <a href="#work">projects</a>
                <a href="#stack">stack</a>
                <a href="#contact">contact</a>
            </div>

            <a className="navAvailability" href="#contact">
                <span />
                Open to opportunities
            </a>
        </nav>
    )
}

export default Navbar