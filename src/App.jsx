import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  // Default to light mode
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    localStorage.theme = 'light'
  }, [])

  return (
    <>
      {/* Animated gradient mesh — sits behind everything */}
      <div className="bg-mesh" aria-hidden="true" />

      <main>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
