import { Route, Routes } from 'react-router'
import './styles/workbench-v5.css'
import './styles/workbench-v5-mobile.css'
import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/projects/:slug"
        element={<ProjectDetailPage />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
