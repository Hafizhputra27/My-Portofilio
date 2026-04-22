import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', id: 'hero', href: '#hero' },
  { label: 'About', id: 'about', href: '#about' },
  { label: 'Projects', id: 'projects', href: '#projects' },
  { label: 'Experience', id: 'experience', href: '#experience' },
  { label: 'Skills', id: 'skills', href: '#skills' },
  { label: 'Contact', id: 'contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const navbarRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const currentScrollPos = window.scrollY
      setScrolled(currentScrollPos > 50)

      // Scroll spy for active link
      const scrollPosWithOffset = currentScrollPos + 150
      let current = 'hero'
      for (const link of navLinks) {
        const el = document.getElementById(link.id)
        if (el && el.offsetTop <= scrollPosWithOffset) {
          current = link.id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Initial check
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={navbarRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
        padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
      }}
    >
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Logo */}
        <motion.a
          href="#hero"
          className="font-display"
          style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hafizh
        </motion.a>

        {/* Desktop links */}
        <motion.ul
          className="nav-links-desktop"
          style={{
            display: 'flex',
            gap: '1.75rem',
            listStyle: 'none',
            alignItems: 'center',
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.id
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              >
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    color: isActive ? '#8b5cf6' : '#475569',
                    textDecoration: 'none',
                    position: 'relative',
                    transition: 'color 0.3s ease',
                    paddingBottom: '2px',
                    fontSize: '0.875rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#8b5cf6'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive ? '#8b5cf6' : '#475569'
                  }}
                >
                  {link.label}
                  {/* Active Underline */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: isActive ? '100%' : '0%',
                      height: '2px',
                      background: '#8b5cf6',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </a>
              </motion.li>
            )
          })}
        </motion.ul>

        {/* Mobile menu button */}
        <motion.button
          className="hamburger-btn"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: '#1e293b',
          }}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      color: isActive ? '#8b5cf6' : '#475569',
                      textDecoration: 'none',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: isActive ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
