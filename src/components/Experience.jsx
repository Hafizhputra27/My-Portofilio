import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import experience from '../data/experience.js'

const slideIn = {
  hidden:  { opacity: 0, x: 40 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Experience() {
  const sectionRef  = useRef(null)
  const lineRef     = useRef(null)
  const isInView    = useInView(sectionRef, { once: true, margin: '-80px' })
  const lineInView  = useInView(lineRef, { once: true, margin: '-40px' })

  return (
    <section id="experience" ref={sectionRef} className="section-container">
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <p className="section-label">My journey</p>
        <h2 className="section-heading">Experience</h2>
        <div className="section-divider" />
      </div>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* SVG animated vertical line */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: '23px', top: 0, bottom: 0,
            width: '2px',
            overflow: 'visible',
          }}
        >
          <svg
            width="2"
            height="100%"
            style={{ display: 'block', height: '100%' }}
            preserveAspectRatio="none"
          >
            <motion.line
              x1="1" y1="0" x2="1" y2="100%"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={lineInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
            />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="rgba(167,139,250,0.1)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Entries */}
        <div style={{ paddingLeft: '60px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {experience.map((entry, i) => (
            <motion.div
              key={entry.title}
              custom={i}
              variants={slideIn}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              data-experience-title={entry.title}
              style={{ position: 'relative' }}
            >
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: '-45px', top: '22px',
                width: '16px', height: '16px',
                borderRadius: '50%',
                background: entry.current
                  ? 'linear-gradient(135deg, var(--accent), var(--accent-2))'
                  : 'rgba(255,255,255,0.15)',
                border: entry.current
                  ? '2px solid rgba(167,139,250,0.5)'
                  : '2px solid rgba(255,255,255,0.2)',
                boxShadow: entry.current ? '0 0 12px rgba(167,139,250,0.5)' : 'none',
                zIndex: 2,
              }} />

              {/* Card */}
              <div
                className="glass"
                style={{ padding: 'clamp(20px, 3vw, 28px)' }}
              >
                {/* Header row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '6px',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-h3)',
                    fontWeight: 'var(--weight-semibold)',
                    color: 'var(--text-primary)',
                    margin: 0,
                    lineHeight: 1.3,
                  }}>
                    {entry.title}
                  </h3>

                  {entry.current && (
                    <motion.span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '3px 12px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'rgba(34,197,94,0.12)',
                        border: '1px solid rgba(34,197,94,0.25)',
                        color: '#4ade80',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--weight-semibold)',
                        whiteSpace: 'nowrap',
                        animation: 'currentPulse 2.5s ease-in-out infinite',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: '#4ade80', flexShrink: 0,
                      }} />
                      Current
                    </motion.span>
                  )}
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-small)',
                  fontWeight: 'var(--weight-medium)',
                  color: 'var(--accent)',
                  margin: '0 0 4px',
                }}>
                  {entry.organisation}
                </p>

                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  margin: '0 0 12px',
                }}>
                  {entry.period}
                </p>

                {entry.detail && (
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-small)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}>
                    {entry.detail}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes currentPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.45); }
          50%       { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
        }
      `}</style>
    </section>
  )
}
