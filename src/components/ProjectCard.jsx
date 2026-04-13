import { useState, useRef } from 'react'

const GRADIENT_MAP = {
  amber:  'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(245,158,11,0.15))',
  blue:   'linear-gradient(135deg, rgba(96,165,250,0.25), rgba(59,130,246,0.15))',
  green:  'linear-gradient(135deg, rgba(52,211,153,0.25), rgba(16,185,129,0.15))',
  purple: 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(124,58,237,0.15))',
}

const TAG_STYLES = {
  amber:  { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.25)' },
  blue:   { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.25)' },
  green:  { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.25)' },
  purple: { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.25)' },
}

export default function ProjectCard({ project, onClick, featured = false }) {
  const [hovered, setHovered] = useState(false)
  const [mouse, setMouse]     = useState({ x: 50, y: 50 })
  const [glowVisible, setGlowVisible] = useState(false)

  const tag     = TAG_STYLES[project.tagColor] ?? TAG_STYLES.blue
  const gradient = GRADIENT_MAP[project.tagColor] ?? GRADIENT_MAP.blue

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
    })
  }

  return (
    <article
      data-project-id={project.id}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={() => { setHovered(true); setGlowVisible(true) }}
      onMouseLeave={() => { setHovered(false); setGlowVisible(false) }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.() }}
      aria-label={`View case study for ${project.title}`}
      className="glass-strong gradient-border"
      style={{
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
        boxShadow: hovered
          ? `0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px ${tag.border}, 0 0 40px ${tag.bg}`
          : '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Mouse radial highlight */}
      <div style={{
        position: 'absolute', inset: 0,
        background: glowVisible
          ? `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`
          : 'transparent',
        pointerEvents: 'none', zIndex: 2,
        transition: glowVisible ? 'none' : 'background 0.4s',
        borderRadius: 'inherit',
      }} />

      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)',
        pointerEvents: 'none', zIndex: 3,
      }} />

      {/* Color area */}
      <div style={{
        height: featured ? 180 : 140,
        background: gradient,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Category label inside banner */}
        <div style={{
          position: 'absolute', bottom: 12, left: 20,
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-medium)',
            color: tag.color,
            background: tag.bg,
            border: `1px solid ${tag.border}`,
            borderRadius: 'var(--radius-pill)',
            padding: '3px 12px',
            backdropFilter: 'blur(8px)',
          }}>
            {project.tag}
          </span>
          {project.featured && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 'var(--radius-pill)',
              padding: '3px 10px',
            }}>
              Featured
            </span>
          )}
        </div>

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 40%, rgba(10,10,26,0.6) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Card body */}
      <div style={{ padding: featured ? '24px 28px 28px' : '18px 22px 24px', position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: featured ? 'var(--text-h3)' : '1.1rem',
          fontWeight: 'var(--weight-bold)',
          color: 'var(--text-primary)',
          margin: '0 0 10px',
          lineHeight: 1.3,
        }}>
          {project.title}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-small)',
          color: 'var(--text-muted)',
          margin: '0 0 20px',
          lineHeight: 1.75,
        }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.techStack.slice(0, featured ? 999 : 4).map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(167,139,250,0.08)',
                border: '1px solid rgba(167,139,250,0.18)',
                color: 'var(--accent)',
              }}
            >
              {tech}
            </span>
          ))}
          {!featured && project.techStack.length > 4 && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
              padding: '3px 10px',
            }}>
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '20px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--weight-semibold)',
          color: 'var(--accent)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s',
        }}>
          View Case Study →
        </div>
      </div>
    </article>
  )
}
