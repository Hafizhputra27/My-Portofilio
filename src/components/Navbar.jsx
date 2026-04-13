import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'calc(100% - 40px)',
        maxWidth: '880px',
      }}
    >
      <motion.nav
        className="glass-pill"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: scrolled
            ? '0 12px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)'
            : '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
          transition: 'box-shadow 0.3s ease',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-bold)',
            fontSize: '1.15rem',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            flexShrink: 0,
          }}
        >
          Hafizh
        </a>

        {/* Center links */}
        <ul
          className="nav-center-links"
          style={{
            display: 'flex',
            gap: '4px',
            listStyle: 'none',
          }}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--weight-medium)',
                  fontSize: 'var(--text-small)',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  display: 'block',
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Hire Me CTA */}
          <a
            href="#contact"
            className="hire-me-btn btn-shimmer"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 'var(--weight-semibold)',
              fontSize: 'var(--text-small)',
              color: '#000',
              background: 'rgba(255,255,255,0.92)',
              borderRadius: 'var(--radius-pill)',
              padding: '8px 20px',
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'opacity 0.2s, transform 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'var(--text-primary)',
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="glass"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              marginTop: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--weight-medium)',
                  fontSize: 'var(--text-body)',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--weight-semibold)',
                fontSize: 'var(--text-body)',
                color: '#fff',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                textDecoration: 'none',
                textAlign: 'center',
                marginTop: '8px',
              }}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
