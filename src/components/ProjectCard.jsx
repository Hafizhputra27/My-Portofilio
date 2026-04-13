import { useState } from 'react';

const TAG_COLORS = {
  amber:  { bg: 'rgba(254,243,199,0.7)', text: '#92400e' },
  blue:   { bg: 'rgba(219,234,254,0.7)', text: '#1e40af' },
  green:  { bg: 'rgba(220,252,231,0.7)', text: '#166534' },
  purple: { bg: 'rgba(237,233,254,0.7)', text: '#5b21b6' },
};

const GRADIENT_MAP = {
  amber:  'linear-gradient(135deg, rgba(254,243,199,0.9) 0%, rgba(253,230,138,0.85) 50%, rgba(251,191,36,0.8) 100%)',
  blue:   'linear-gradient(135deg, rgba(219,234,254,0.9) 0%, rgba(147,197,253,0.85) 50%, rgba(59,130,246,0.8) 100%)',
  green:  'linear-gradient(135deg, rgba(220,252,231,0.9) 0%, rgba(134,239,172,0.85) 50%, rgba(34,197,94,0.8) 100%)',
  purple: 'linear-gradient(135deg, rgba(237,233,254,0.9) 0%, rgba(196,181,253,0.85) 50%, rgba(124,58,237,0.8) 100%)',
};

export default function ProjectCard({ project, onClick, featured = false }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const tagColor = TAG_COLORS[project.tagColor] ?? TAG_COLORS.blue;
  const gradient = GRADIENT_MAP[project.tagColor] ?? GRADIENT_MAP.blue;
  const imageHeight = featured ? 200 : 160;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <article
      data-project-id={project.id}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
      aria-label={`View case study for ${project.title}`}
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '24px',
        overflow: 'hidden',
        // Liquid glass
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.5)',
        boxShadow: hovered
          ? '0 24px 64px rgba(123,127,245,0.22), inset 0 1px 0 rgba(255,255,255,0.9)'
          : '0 8px 32px rgba(180,180,220,0.14), inset 0 1px 0 rgba(255,255,255,0.75)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Mouse-follow liquid highlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.28) 0%, transparent 55%)`
            : 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.18) 0%, transparent 50%)',
          transition: hovered ? 'none' : 'background 0.4s ease',
          pointerEvents: 'none',
          zIndex: 2,
          borderRadius: '24px',
        }}
      />

      {/* Top shimmer */}
      <div style={{
        position: 'absolute',
        top: 0, left: '8%', right: '8%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.85), transparent)',
        pointerEvents: 'none',
        zIndex: 3,
      }} />

      {/* Gradient image area — with glass overlay */}
      <div
        style={{
          position: 'relative',
          height: imageHeight,
          background: gradient,
          borderRadius: '22px 22px 0 0',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        {/* Glass sheen on image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Card body */}
      <div style={{ padding: featured ? '24px 28px' : '20px 24px', position: 'relative', zIndex: 1 }}>
        {/* Tag pill */}
        <span
          style={{
            display: 'inline-block',
            padding: '3px 12px',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.03em',
            backgroundColor: tagColor.bg,
            color: tagColor.text,
            marginBottom: 12,
            fontFamily: "'DM Sans', sans-serif",
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.4)',
          }}
        >
          {project.tag}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: featured ? '1.5rem' : '1.15rem',
            fontWeight: 700,
            color: 'var(--text-dark)',
            margin: '0 0 10px',
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.875rem',
            color: 'var(--text-mid)',
            margin: '0 0 16px',
            lineHeight: 1.6,
          }}
        >
          {project.description}
        </p>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              style={{
                padding: '3px 10px',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 500,
                background: 'rgba(123,127,245,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(123,127,245,0.2)',
                color: 'var(--accent)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
