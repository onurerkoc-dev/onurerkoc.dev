import { Link } from 'react-router'
import Seo from '../components/Seo'

function NotFoundPage() {
  return (
    <main className="wbSite wbNotFound">
      <Seo
        title="Page Not Found | Onur Erkoç"
        description="The requested page could not be found on onurerkoc.dev."
        path={window.location.pathname}
        robots="noindex, nofollow"
      />

      <span className="wbNotFoundCode">404</span>

      <h1>Route not found.</h1>

      <p>
        The requested path is not part of the current build.
      </p>

      <Link to="/">return to workbench →</Link>
    </main>
  )
}

export default NotFoundPage
