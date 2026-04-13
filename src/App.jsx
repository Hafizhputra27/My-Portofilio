import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

const blobBase = {
  position: 'fixed',
  borderRadius: '50%',
  pointerEvents: 'none',
  zIndex: -1,
}

export default function App() {
  return (
    <>
      {/* Blob 1 — 600px, #a5b4fc, top-left */}
      <div
        className="blob"
        style={{
          ...blobBase,
          width: '600px',
          height: '600px',
          backgroundColor: '#a5b4fc',
          top: '-100px',
          left: '-150px',
          filter: 'blur(80px)',
          opacity: 0.18,
        }}
      />

      {/* Blob 2 — 500px, #c4b5fd, bottom-right */}
      <div
        className="blob"
        style={{
          ...blobBase,
          width: '500px',
          height: '500px',
          backgroundColor: '#c4b5fd',
          bottom: '-100px',
          right: '-100px',
          opacity: 0.18,
        }}
      />

      {/* Blob 3 — 350px, #93c5fd, center */}
      <div
        className="blob"
        style={{
          ...blobBase,
          width: '350px',
          height: '350px',
          backgroundColor: '#93c5fd',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.15,
        }}
      />

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
