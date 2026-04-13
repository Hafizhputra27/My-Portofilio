import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Trophy, Lightbulb, Zap } from 'lucide-react'
import useInView from '../hooks/useInView.js'

const iconMap = { GraduationCap, Trophy, Lightbulb, Zap }

const cards = [
  {
    icon: 'GraduationCap',
    label: 'Academic',
    title: 'Academic Excellence',
    body: 'Information Systems undergraduate at Widyatama University Bandung. Actively engaged in research, academic projects, and digital technology development.',
    accentDark: 'rgba(255,255,255,0.06)',
    accentLight: 'rgba(139,92,246,0.25)',
    iconColorDark: 'rgba(255,255,255,0.75)',
    iconColorLight: '#5b21b6',
  },
  {
    icon: 'Trophy',
    label: 'Leadership',
    title: 'Leadership & Events',
    body: 'Executive Chair of WISE Innovera 2026 — a national UI/UX competition with 87 teams from 34 universities. Led a 35-person committee using Agile methodology.',
    accentDark: 'rgba(255,255,255,0.05)',
    accentLight: 'rgba(59,130,246,0.25)',
    iconColorDark: 'rgba(255,255,255,0.75)',
    iconColorLight: '#2563eb',
  },
  {
    icon: 'Lightbulb',
    label: 'Research',
    title: 'Research & Innovation',
    body: 'PKM-KC researcher developing LECTOR.ID — an AI-powered digital literacy platform combining NLP, gamification, and collaborative filtering.',
    accentDark: 'rgba(255,255,255,0.04)',
    accentLight: 'rgba(236,72,153,0.22)',
    iconColorDark: 'rgba(255,255,255,0.75)',
    iconColorLight: '#db2777',
  },
  {
    icon: 'Zap',
    label: 'Skills',
    title: 'Technical Skills',
    body: 'Proficient in React, Node.js, Python, Kotlin, and full-stack architecture. Experienced in project management, UI/UX design, and Agile/Scrum methodologies.',
    accentDark: 'rgba(255,255,255,0.04)',
    accentLight: 'rgba(16,185,129,0.22)',
    iconColorDark: 'rgba(255,255,255,0.75)',
    iconColorLight: '#059669',
  },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function AboutCard({ card, i }) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)
  const [iconSpin, setIconSpin] = useState(false)
  const Icon = iconMap[card.icon]

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    })
  }

  return (
    <motion.div
      variants={cardAnim}
      onMouseMove={onMove}
      onMouseEnter={() => { setHovered(true); setIconSpin(true) }}
      onMouseLeave={() => { setHovered(false); setIconSpin(false) }}
      className="glass gradient-border"
      style={{
        position: 'relative',
        padding: 'clamp(24px, 3vw, 36px)',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.14)'
          : '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {/* Mouse radial highlight */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: hovered
            ? `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`
            : 'transparent',
          pointerEvents: 'none', zIndex: 1,
          transition: hovered ? 'none' : 'background 0.4s',
          borderRadius: 'inherit',
        }}
      />

      {/* Accent glow blob */}
      <div style={{
        position: 'absolute',
        width: '140px', height: '140px', borderRadius: '50%',
        background: card.accentDark,
        filter: 'blur(40px)',
        top: '-30px', right: '-30px',
        opacity: hovered ? 1 : 0.6,
        transition: 'opacity 0.3s',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        {/* Icon box */}
        <div
          className="glass"
          style={{
            width: '52px', height: '52px',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <motion.div
            animate={{ rotate: iconSpin ? 360 : 0 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
          >
            <Icon size={24} color={card.iconColorDark} strokeWidth={1.8} />
          </motion.div>
        </div>

        {/* Label */}
        <p className="section-label" style={{ marginBottom: '6px' }}>{card.label}</p>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-h3)',
          fontWeight: 'var(--weight-bold)',
          color: 'var(--text-primary)',
          margin: '0 0 12px',
          lineHeight: 1.3,
        }}>
          {card.title}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-small)',
          lineHeight: 1.8,
          color: 'var(--text-muted)',
          margin: 0,
        }}>
          {card.body}
        </p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section id="about" ref={sectionRef} className="section-container">
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <p className="section-label">Get to know me</p>
        <h2 className="section-heading">About Me</h2>
        <div className="section-divider" />
      </div>

      {/* Cards grid */}
      <motion.div
        className="about-grid"
        variants={stagger}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
        }}
      >
        {cards.map((card, i) => (
          <AboutCard key={card.title} card={card} i={i} />
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 767px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
