function Navbar() {
  return (
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
  )
}

export default Navbar