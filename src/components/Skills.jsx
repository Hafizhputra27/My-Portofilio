const ALL_SKILLS = [
  { name: 'HTML',        logo: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS',         logo: 'https://cdn.simpleicons.org/css/1572B6' },
  { name: 'JavaScript',  logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'React.js',    logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js',     logo: 'https://cdn.simpleicons.org/nextdotjs/000000' },
  { name: 'Python',      logo: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'PHP/Laravel', logo: 'https://cdn.simpleicons.org/laravel/FF2D20' },
  { name: 'Node.js',     logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Kotlin',      logo: 'https://cdn.simpleicons.org/kotlin/7F52FF' },
  { name: 'MongoDB',     logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Firebase',    logo: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'Supabase',    logo: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
  { name: 'Vercel',      logo: 'https://cdn.simpleicons.org/vercel/000000' },
  { name: 'GitHub',      logo: 'https://cdn.simpleicons.org/github/181717' },
  { name: 'Postman',     logo: 'https://cdn.simpleicons.org/postman/FF6C37' },
  { name: 'Auth0',       logo: 'https://cdn.simpleicons.org/auth0/EB5424' },
]

// Duplicate for seamless loop
const ROW1 = [...ALL_SKILLS, ...ALL_SKILLS]
const ROW2 = [...ALL_SKILLS].reverse()
const ROW2_DUP = [...ROW2, ...ROW2]

function SkillCard({ skill }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '16px 20px',
        minWidth: '100px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow: '0 4px 16px rgba(180,180,220,0.12)',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      <img
        src={skill.logo}
        alt={skill.name}
        style={{ width: '36px', height: '36px', objectFit: 'contain' }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--text-mid)',
          whiteSpace: 'nowrap',
        }}
      >
        {skill.name}
      </span>
    </div>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        overflow: 'hidden',
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
          Skills
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

      {/* Row 1 — slides left */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to right, var(--bg-main), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to left, var(--bg-main), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div className="marquee-track marquee-left">
          {ROW1.map((skill, i) => (
            <SkillCard key={`r1-${i}`} skill={skill} />
          ))}
        </div>
      </div>

      {/* Row 2 — slides right */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to right, var(--bg-main), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to left, var(--bg-main), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div className="marquee-track marquee-right">
          {ROW2_DUP.map((skill, i) => (
            <SkillCard key={`r2-${i}`} skill={skill} />
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          padding: 4px 0;
        }

        .marquee-left {
          animation: scrollLeft 30s linear infinite;
        }
        .marquee-right {
          animation: scrollRight 30s linear infinite;
        }

        .marquee-left:hover,
        .marquee-right:hover {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
