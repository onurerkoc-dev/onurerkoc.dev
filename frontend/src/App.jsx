import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
                path="/projects/:slug"
                element={<ProjectDetailPage />}
            />
        </Routes>
    )
}

export default App