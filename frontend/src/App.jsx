import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </Router>
  )
}

export default App

