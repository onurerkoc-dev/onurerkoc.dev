import { Link } from 'react-router'

function NotFoundPage() {
    return (
        <main className="siteShell">
            <div className="backgroundGrid" />

            <section className="section notFoundSection">
                <p className="sectionTag">404 / route not found</p>

                <h1>Page not found.</h1>

                <p className="sectionMuted">
                    The route you requested does not exist in this build lab.
                </p>

                <Link to="/" className="projectBackLink">
                    ← Back to build lab
                </Link>
            </section>
        </main>
    )
}

export default NotFoundPage