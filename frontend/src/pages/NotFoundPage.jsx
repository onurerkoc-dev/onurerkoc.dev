import { Link } from 'react-router'
import Seo from '../components/Seo'

function NotFoundPage() {
    return (
        <main className="siteShell">
            <Seo
                title="Page Not Found | Onur Erkoç"
                description="The requested page could not be found on onurerkoc.dev."
                path={window.location.pathname}
                robots="noindex, nofollow"
            />

            <div className="backgroundGrid" />

            <section className="section notFoundSection">
                <p className="sectionTag">
                    404 / route not found
                </p>

                <h1>Page not found.</h1>

                <p className="sectionMuted">
                    The route you requested does not exist in this
                    build lab.
                </p>

                <Link to="/" className="projectBackLink">
                    ← Back to build lab
                </Link>
            </section>
        </main>
    )
}

export default NotFoundPage