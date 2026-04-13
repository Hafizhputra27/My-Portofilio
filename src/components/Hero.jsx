import React from 'react'
import { motion } from 'framer-motion'
import ProfilePhoto from './ProfilePhoto.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        paddingTop: '120px',
        paddingBottom: '0',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'flex-end',
        }}
        className="hero-grid"
      >
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* 1. Status badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                display: 'inline-block',
                animation: 'statusPulse 2s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '14px',
                color: 'var(--text-mid)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Informatics Student · Widyatama University
            </span>
          </motion.div>

          {/* 2. H1 heading */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--text-dark)',
              margin: 0,
            }}
          >
            Ahmad Hafizh
            <br />
            Karunia{' '}
            <em
              style={{
                color: 'var(--accent)',
                fontStyle: 'italic',
              }}
            >
              Putra
            </em>
          </motion.h1>

          {/* 3. Role line */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '18px',
              fontWeight: 500,
              color: 'var(--text-mid)',
              margin: 0,
              letterSpacing: '0.02em',
            }}
          >
            Project Manager · Developer · Innovator
          </motion.p>

          {/* 4. Bio paragraph */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--text-mid)',
              margin: 0,
            }}
          >
            I'm an Information Systems undergraduate at Widyatama University Bandung,
            passionate about software development, project management, and technology innovation.
            With experience in PKM-KC, national events, and real-world app development, I'm
            ready to contribute to impactful projects.
          </motion.p>

          {/* 5. CTA buttons */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          >
            <a
              href="#projects"
              style={{
                display: 'inline-block',
                padding: '12px 28px',
                borderRadius: '9999px',
                backgroundColor: 'var(--text-dark)',
                color: '#ffffff',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              View Projects
            </a>
            <a
              href="#contact"
              style={{
                display: 'inline-block',
                padding: '12px 28px',
                borderRadius: '9999px',
                border: '2px solid var(--accent)',
                color: 'var(--accent)',
                backgroundColor: 'transparent',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent)'
                e.currentTarget.style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--accent)'
              }}
            >
              Let&apos;s Talk
            </a>
          </motion.div>

          {/* 6. Stats row */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '3+', label: 'Projects' },
              { value: 'PKM', label: 'Researcher' },
              { value: '1', label: 'National Event' },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && (
                  <div
                    style={{
                      width: '1px',
                      height: '36px',
                      backgroundColor: 'var(--text-light)',
                      margin: '0 20px',
                      opacity: 0.5,
                    }}
                  />
                )}
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '22px',
                      fontWeight: 700,
                      color: 'var(--text-dark)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      color: 'var(--text-light)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Right column — Profile Photo */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <ProfilePhoto />
        </div>
      </div>

      {/* Responsive: single column below 768px */}
      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
