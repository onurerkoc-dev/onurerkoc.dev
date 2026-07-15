function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="wbFooter">
      <div className="wbFooterMain">
        <div>
          <span className="wbFooterLabel">
            onurerkoc.dev
          </span>

          <strong>
            Build clearly.
            <br />
            Ship responsibly.
          </strong>
        </div>

        <div className="wbFooterMeta">
          <div>
            <span>location</span>
            <strong>İstanbul, Türkiye</strong>
          </div>

          <div>
            <span>focus</span>
            <strong>Backend engineering</strong>
          </div>

          <div>
            <span>status</span>
            <strong>Open to opportunities</strong>
          </div>
        </div>

        <div className="wbFooterLinks">
          <a
            href="https://github.com/onurerkoc-dev"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>

          <a href="#contact">Contact ↘</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>

      <div className="wbFooterBottom">
        <span>© {currentYear} Onur Erkoç</span>
        <span>production system / v1</span>
      </div>
    </footer>
  )
}

export default SiteFooter
