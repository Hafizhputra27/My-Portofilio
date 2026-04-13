import { useRef } from 'react'
import { motion } from 'framer-motion'
import useInView from '../hooks/useInView.js'
import experience from '../data/experience.js'

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Experience() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      {/* Section heading */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            color: 'var(--text-dark)',
            margin: '0 0 12px',
          }}
        >
          Experience
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

      {/* Vertical timeline */}
      <div style={{ position: 'relative', paddingLeft: '32px' }}>
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: '7px',
            top: '8px',
            bottom: '8px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--accent), rgba(123,127,245,0.15))',
            borderRadius: '1px',
          }}
        />

        {experience.map((entry, i) => (
          <motion.div
            key={entry.title}
            custom={i}
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            data-experience-title={entry.title}
            style={{ position: 'relative', marginBottom: i < experience.length - 1 ? '28px' : 0 }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: 'absolute',
                left: '-29px',
                top: '20px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: 'var(--accent)',
                border: '2px solid white',
                boxShadow: '0 0 0 3px rgba(123,127,245,0.25)',
                zIndex: 1,
              }}
            />

            {/* Card */}
            <div
              className="glass-card"
              style={{ padding: '24px 28px' }}
            >
              {/* Header row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '6px',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {entry.title}
                </h3>

                {entry.current && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(34,197,94,0.15)',
                      color: '#16a34a',
                      fontSize: '12px',
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    Current
                  </span>
                )}
              </div>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--accent)',
                  margin: '0 0 4px',
                }}
              >
                {entry.organisation}
              </p>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  color: 'var(--text-light)',
                  margin: 0,
                }}
              >
                {entry.period}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
