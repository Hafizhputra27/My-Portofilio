import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SKILLS_ALL, SKILL_CATEGORIES } from '../data/skills.js'

// Duplicate for seamless marquee
const ROW1 = [...SKILLS_ALL, ...SKILLS_ALL]
const ROW2 = [...[...SKILLS_ALL].reverse(), ...[...SKILLS_ALL].reverse()]

function SkillBadge({ skill, showTooltip = false }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ position: 'relative', flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="glass"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '14px 18px',
          minWidth: '90px',
          cursor: 'default',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s',
          boxShadow: hovered
            ? '0 8px 32px rgba(167,139,250,0.3)'
            : '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <img
          src={skill.logo}
          alt={skill.name}
          loading="lazy"
          style={{ width: '32px', height: '32px', objectFit: 'contain' }}
        />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--weight-medium)',
          color: 'var(--text-muted)',
          whiteSpace: 'nowrap',
        }}>
          {skill.name}
        </span>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(10,10,30,0.95)',
              border: '1px solid rgba(167,139,250,0.3)',
              borderRadius: '8px',
              padding: '5px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--accent)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 100,
            }}
          >
            {skill.name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Filter grid badge
function FilterBadge({ skill }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.25 }}
      className="glass"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        cursor: 'default',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.2s',
      }}
    >
      <img src={skill.logo} alt={skill.name} style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
      }}>
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() =>
    activeCategory === 'All' ? SKILLS_ALL : SKILLS_ALL.filter((s) => s.category === activeCategory),
    [activeCategory]
  )

  return (
    <section id="skills" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', overflow: 'hidden' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '48px', paddingLeft: 'var(--container-px)', paddingRight: 'var(--container-px)' }}>
        <p className="section-label">Technologies I use</p>
        <h2 className="section-heading">Skills</h2>
        <div className="section-divider" />
      </div>

      {/* Category filter tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '48px',
        paddingLeft: 'var(--container-px)',
        paddingRight: 'var(--container-px)',
      }}>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              fontWeight: 'var(--weight-medium)',
              padding: '8px 20px',
              borderRadius: 'var(--radius-pill)',
              border: activeCategory === cat ? '1px solid var(--accent)' : '1px solid var(--glass-border)',
              background: activeCategory === cat ? 'rgba(167,139,250,0.15)' : 'var(--glass-bg)',
              color: activeCategory === cat ? 'var(--accent)' : 'var(--text-muted)',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter grid (when not 'All') */}
      <AnimatePresence mode="wait">
        {activeCategory !== 'All' && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              maxWidth: 'var(--container-max)',
              margin: '0 auto 48px',
              paddingLeft: 'var(--container-px)',
              paddingRight: 'var(--container-px)',
            }}
          >
            {filtered.map((skill) => (
              <FilterBadge key={skill.name} skill={skill} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marquee rows — always visible */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to right, var(--bg-base), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to left, var(--bg-base), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div className="marquee-track marquee-left">
          {ROW1.map((skill, i) => (
            <SkillBadge key={`r1-${i}`} skill={skill} showTooltip />
          ))}
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to right, var(--bg-base), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to left, var(--bg-base), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div className="marquee-track marquee-right">
          {ROW2.map((skill, i) => (
            <SkillBadge key={`r2-${i}`} skill={skill} showTooltip />
          ))}
        </div>
      </div>
    </section>
  )
}
