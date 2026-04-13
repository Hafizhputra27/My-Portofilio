import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'calc(100% - 48px)',
        maxWidth: '860px',
      }}
    >
      <nav
        className="glass-card"
        style={{
          borderRadius: '9999px',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--text-dark)',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          Ahmad.dev
        </a>

        {/* Center links — hidden on mobile */}
        <ul
          style={{
            display: 'flex',
            gap: '32px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="nav-center-links"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  color: 'var(--text-mid)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-mid)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hire Me CTA — hidden on mobile */}
        <a
          href="#contact"
          className="hire-me-btn"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#ffffff',
            backgroundColor: '#1a1a2e',
            borderRadius: '9999px',
            padding: '8px 20px',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.target.style.opacity = '1')}
        >
          Hire Me
        </a>

        {/* Hamburger — shown on mobile */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: 'var(--text-dark)',
            display: 'none',
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div
          className="glass-card"
          style={{
            marginTop: '8px',
            borderRadius: '20px',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            animation: 'slideDown 0.2s ease-out',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                color: 'var(--text-dark)',
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.4)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-dark)')}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              fontWeight: 500,
              color: '#ffffff',
              backgroundColor: '#1a1a2e',
              borderRadius: '9999px',
              padding: '10px 20px',
              textDecoration: 'none',
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            Hire Me
          </a>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 767px) {
          .nav-center-links { display: none !important; }
          .hire-me-btn      { display: none !important; }
          .hamburger-btn    { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
