import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Trophy, Lightbulb, Zap } from 'lucide-react'
import useInView from '../hooks/useInView.js'

const iconMap = { GraduationCap, Trophy, Lightbulb, Zap }

const cards = [
  {
    icon: 'GraduationCap',
    title: 'Academic',
    body: 'Information Systems undergraduate at Widyatama University Bandung. Actively engaged in academic activities with a focus on information systems development and digital technology.',
    accent: 'rgba(123,127,245,0.7)',
  },
  {
    icon: 'Trophy',
    title: 'Leadership',
    body: 'Executive Chair of WISE Innovera 2026 — a national UI/UX competition with 87 teams from 34 universities. Led a 35-person committee using Agile methodology.',
    accent: 'rgba(196,181,253,0.7)',
  },
  {
    icon: 'Lightbulb',
    title: 'Research & Innovation',
    body: 'PKM-KC researcher developing LECTOR.ID, an AI-powered digital literacy platform. Experienced in applied research and building innovative solutions.',
    accent: 'rgba(147,197,253,0.7)',
  },
  {
    icon: 'Zap',
    title: 'Skills',
    body: 'Proficient in React.js, Node.js, Three.js, and project management. Experienced in full-stack development, UI/UX design, and Agile/Scrum methodologies.',
    accent: 'rgba(167,243,208,0.7)',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' },
  }),
}

function LiquidCard({ card, i, isInView }) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)
  const IconComponent = iconMap[card.icon]

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    })
  }

  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '32px 28px',
        borderRadius: '24px',
        overflow: 'hidden',
        cursor: 'default',
        // Liquid glass base
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.45)',
        boxShadow: hovered
          ? `0 20px 60px rgba(123,127,245,0.18), 0 0 0 1px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.9)`
          : `0 8px 32px rgba(180,180,220,0.14), 0 0 0 1px rgba(255,255,255,0.35), inset 0 1px 0 rgba(255,255,255,0.8)`,
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Dynamic liquid highlight that follows mouse */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          background: hovered
            ? `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.35) 0%, transparent 55%)`
            : 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.22) 0%, transparent 60%)',
          transition: hovered ? 'none' : 'background 0.4s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Accent color blob */}
      <div
        style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: card.accent,
          filter: 'blur(40px)',
          top: '-20px',
          right: '-20px',
          opacity: hovered ? 0.5 : 0.3,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Top shimmer line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          <IconComponent size={26} color="var(--accent)" strokeWidth={1.8} />
        </div>

        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--text-dark)',
            margin: '0 0 12px',
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'var(--text-mid)',
            margin: 0,
          }}
        >
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
    <section
      id="about"
      ref={sectionRef}
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            color: 'var(--text-dark)',
            margin: '0 0 12px',
          }}
        >
          About Me
        </h2>
        <div
          style={{
            width: '60px',
            height: '4px',
            borderRadius: '2px',
            background: 'var(--accent)',
            margin: '0 auto',
          }}
        />
      </div>

      <div className="about-grid">
        {cards.map((card, i) => (
          <LiquidCard key={card.title} card={card} i={i} isInView={isInView} />
        ))}
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 767px) {
          .about-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
