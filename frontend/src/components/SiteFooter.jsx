function SiteFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="siteFooter">
            <div>
                <strong>Onur Erkoç</strong>

                <p>
                    Software Engineering student building backend and
                    production-focused systems.
                </p>
            </div>

            <div className="siteFooterMeta">
                <a
                    href="https://github.com/onurerkoc-dev"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub ↗
                </a>

                <a href="#top">Back to top ↑</a>

                <span>© {currentYear}</span>
            </div>
        </footer>
    )
}

export default SiteFooter