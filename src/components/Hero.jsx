import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import ProfilePhoto from './ProfilePhoto.jsx'

/* ─── Cursor follower ─── */
function CursorFollower() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const dotX = useSpring(mx, { stiffness: 600, damping: 40 })
  const dotY = useSpring(my, { stiffness: 600, damping: 40 })
  const ringX = useSpring(mx, { stiffness: 120, damping: 18 })
  const ringY = useSpring(my, { stiffness: 120, damping: 18 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    const enter = () => setVisible(true)
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseenter', enter)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseenter', enter)
      window.removeEventListener('mouseleave', leave)
    }
  }, [mx, my])

  if (!visible) return null
  return (
    <>
      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: -16, left: -16,
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(167,139,250,0.6)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: ringX, y: ringY,
        }}
      />
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: -4, left: -4,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: dotX, y: dotY,
        }}
      />
    </>
  )
}

/* ─── Particles ─── */
const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * 6,
}))

function Particles() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: `rgba(167, 139, 250, ${Math.random() * 0.4 + 0.1})`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.7, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Typed text ─── */
const ROLES = ['Project Manager', 'Full-Stack Developer', 'Innovator', 'UI / UX Enthusiast']

function TypedText() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    if (pause) return
    const target = ROLES[roleIndex]
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === target.length) {
      setPause(true)
      const t = setTimeout(() => { setPause(false); setDeleting(true) }, 2000)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 25)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }
  }, [displayed, deleting, roleIndex, pause])

  return (
    <span style={{ color: '#7c3aed', fontWeight: '800' }}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        style={{ borderRight: '2px solid #7c3aed', marginLeft: '2px' }}
      />
    </span>
  )
}

/* ─── Letter animation ─── */
function AnimatedName({ text }) {
  const words = text.split(' ')
  let charIndex = 0

  return (
    <span aria-label={text}>
      {words.map((word, wIdx) => {
        const chars = word.split('')
        const wordSpan = (
          <span key={wIdx} style={{ whiteSpace: 'nowrap' }}>
            {chars.map((ch, cIdx) => {
              const i = charIndex++
              return (
                <motion.span
                  key={cIdx}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.045, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'inline-block' }}
                >
                  {ch}
                </motion.span>
              )
            })}
          </span>
        )
        
        // increment charIndex for space to keep animation timing identical
        if (wIdx < words.length - 1) {
          charIndex++
        }

        return (
          <span key={wIdx}>
            {wordSpan}
            {wIdx < words.length - 1 && ' '}
          </span>
        )
      })}
    </span>
  )
}

/* ─── Stat counter ─── */
function StatItem({ value, label }) {
  return (
    <div className="glass" style={{ textAlign: 'center', padding: '1rem' }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
        fontWeight: 'var(--weight-bold)',
        color: 'var(--text-primary)',
        lineHeight: 1.1,
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-medium)',
        color: 'var(--text-muted)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        marginTop: 4,
      }}>
        {label}
      </div>
    </div>
  )
}

/* ─── Main component ─── */
export default function Hero() {
  return (
    <>
      <CursorFollower />
      <section
        id="hero"
        className="relative"
        style={{
          position: 'relative',
          paddingTop: 'clamp(120px, 16vw, 160px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
          paddingLeft: 'var(--container-px)',
          paddingRight: 'var(--container-px)',
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          overflow: 'hidden',
          // Ensure the background mesh is behind everything
        }}
      >
        {/* Animated gradient mesh — sits behind everything */}
        <div className="bg-mesh" aria-hidden="true" />
        <Particles />

        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 1 }}>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="glass"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--weight-medium)',
                color: 'var(--text-secondary)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              }}
            >
              <span
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#22c55e', flexShrink: 0,
                  boxShadow: '0 0 8px rgba(34,197,94,0.7)',
                  animation: 'glowPulse 2s ease-in-out infinite',
                }}
              />
              Information Systems · Widyatama University
            </motion.div>

            {/* Name */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                fontWeight: 'var(--weight-black)',
                color: '#1e293b',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: '0 0 8px 0',
              }}
            >
              <AnimatedName text="Ahmad Hafizh" />
              <br />
              <AnimatedName text="Karunia " />
              <motion.span
                className="text-gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--weight-black)',
                  fontStyle: 'italic',
                }}
              >
                Putra
              </motion.span>
            </h1>

            {/* Subtitle / typed */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                fontWeight: 'var(--weight-bold)',
                letterSpacing: '-0.01em',
                margin: '8px 0 16px 0',
                minHeight: '1.6em',
              }}
            >
              <TypedText />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body)',
                lineHeight: 1.75,
                color: '#475569',
                margin: '0 0 32px 0',
                maxWidth: '480px',
              }}
            >
              Information Systems undergraduate passionate about software development,
              project management, and technology innovation — building impactful digital
              experiences across the full stack.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}
            >
              <a
                href="#projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 32px',
                  borderRadius: 'var(--radius-pill)',
                  background: '#4f46e5', /* Deep Cobalt */
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '700',
                  fontSize: 'var(--text-body)',
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(79, 70, 229, 0.4)'
                  e.currentTarget.style.background = '#4338ca'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(79, 70, 229, 0.3)'
                  e.currentTarget.style.background = '#4f46e5'
                }}
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="glass-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 32px',
                  color: '#1e293b', /* Deep charcoal */
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  fontSize: 'var(--text-body)',
                  textDecoration: 'none',
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  borderRadius: 'var(--radius-pill)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'
                }}
              >
                Let&apos;s Talk
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', paddingTop: '8px' }}
            >
              {[
                { value: '3+', label: 'Projects' },
                { value: 'PKM', label: 'Researcher' },
                { value: '87+', label: 'Teams Led' },
              ].map((s, i) => (
                <StatItem key={s.label} {...s} />
              ))}
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <ProfilePhoto />
          </motion.div>
        </div>

        <style>{`
          @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 6px rgba(34,197,94,0.7); }
            50%       { box-shadow: 0 0 14px rgba(34,197,94,0); }
          }
          @media (max-width: 767px) {
            .hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  )
}