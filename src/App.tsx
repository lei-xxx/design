
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import SignFlowNav from './components/SignFlowNav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ContactPage from './pages/ContactPage'

function AppContent() {
  const location = useLocation()

  // 页面切换时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <div className="min-h-screen">
      <SignFlowNav
        logo="/eye-nav-logo.png"
        logoAlt="疯狂许师傅 Logo"
        links={navLinks}
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
