import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Calendar, Tag } from 'lucide-react'

/* ─── Simple Markdown Renderer ─── */
function renderMarkdown(text) {
  if (!text) return []
  const blocks = []
  const lines = text.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // H2
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', content: line.slice(3).trim() })
      i++; continue
    }
    // H3
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', content: line.slice(4).trim() })
      i++; continue
    }
    // Code block
    if (line.startsWith('```')) {
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]); i++
      }
      blocks.push({ type: 'code', content: codeLines.join('\n') })
      i++; continue
    }
    // Table
    if (line.startsWith('|') && lines[i + 1]?.startsWith('|---')) {
      const headers = line.split('|').filter(Boolean).map((h) => h.trim())
      i += 2
      const rows = []
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push(lines[i].split('|').filter(Boolean).map((c) => c.trim()))
        i++
      }
      blocks.push({ type: 'table', headers, rows })
      continue
    }
    // Blockquote
    if (line.startsWith('> ')) {
      blocks.push({ type: 'blockquote', content: line.slice(2) })
      i++; continue
    }
    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, '').trim()); i++
      }
      blocks.push({ type: 'ol', items })
      continue
    }
    // Bullet list
    if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2).trim()); i++
      }
      blocks.push({ type: 'ul', items })
      continue
    }
    // Empty line
    if (line.trim() === '') { blocks.push({ type: 'spacer' }); i++; continue }
    // Paragraph
    blocks.push({ type: 'p', content: line })
    i++
  }
  return blocks
}

/* Inline bold + italic + code styling */
function InlineText({ text }) {
  if (!text) return null
  // Split on ** bold **, * italic *, ` code `
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i}>{part.slice(1, -1)}</em>
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82em',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '4px',
              padding: '1px 6px',
              color: 'var(--text-primary)',
            }}>
              {part.slice(1, -1)}
            </code>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

function MarkdownBlock({ block, idx }) {
  const s = {
    h2: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      margin: idx === 0 ? '0 0 6px' : '28px 0 6px',
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.05rem',
      fontWeight: 600,
      color: 'var(--text-primary)',
      margin: '20px 0 8px',
      letterSpacing: '-0.01em',
    },
    p: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-small)',
      lineHeight: 1.85,
      color: 'var(--text-secondary)',
      margin: '0 0 4px',
    },
    li: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-small)',
      lineHeight: 1.75,
      color: 'var(--text-secondary)',
    },
  }

  if (block.type === 'spacer') return <div style={{ height: '4px' }} />

  if (block.type === 'h2') return <h2 style={s.h2}><InlineText text={block.content} /></h2>
  if (block.type === 'h3') return <h3 style={s.h3}><InlineText text={block.content} /></h3>

  if (block.type === 'p') return (
    <p style={s.p}><InlineText text={block.content} /></p>
  )

  if (block.type === 'ul') return (
    <ul style={{ paddingLeft: '18px', margin: '8px 0 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {block.items.map((item, i) => (
        <li key={i} style={s.li}><InlineText text={item} /></li>
      ))}
    </ul>
  )

  if (block.type === 'ol') return (
    <ol style={{ paddingLeft: '18px', margin: '8px 0 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {block.items.map((item, i) => (
        <li key={i} style={s.li}><InlineText text={item} /></li>
      ))}
    </ol>
  )

  if (block.type === 'code') return (
    <pre style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem',
      lineHeight: 1.7,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '10px',
      padding: '16px 20px',
      margin: '10px 0',
      overflowX: 'auto',
      color: 'var(--text-muted)',
      whiteSpace: 'pre-wrap',
    }}>
      {block.content}
    </pre>
  )

  if (block.type === 'table') return (
    <div style={{ overflowX: 'auto', margin: '12px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {block.headers.map((h, i) => (
              <th key={i} style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '8px 12px',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.04)',
                textAlign: 'left',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-small)',
                  color: 'var(--text-secondary)',
                  padding: '8px 12px',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <InlineText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  if (block.type === 'blockquote') return (
    <blockquote style={{
      borderLeft: '3px solid var(--accent)',
      paddingLeft: '16px',
      margin: '12px 0',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-small)',
      fontStyle: 'italic',
      lineHeight: 1.7,
    }}>
      <InlineText text={block.content} />
    </blockquote>
  )

  return null
}

/* ─── Thumbnail banner colors ─── */
const BANNER_STYLES = {
  purple: {
    background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.15) 100%)',
    border: 'rgba(139,92,246,0.25)',
    icon: '🏆',
  },
  green: {
    background: 'linear-gradient(135deg, rgba(16,185,129,0.25) 0%, rgba(6,182,212,0.15) 100%)',
    border: 'rgba(16,185,129,0.2)',
    icon: '🤖',
  },
  blue: {
    background: 'linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(99,102,241,0.15) 100%)',
    border: 'rgba(59,130,246,0.2)',
    icon: '⚙️',
  },
  amber: {
    background: 'linear-gradient(135deg, rgba(245,158,11,0.25) 0%, rgba(239,68,68,0.12) 100%)',
    border: 'rgba(245,158,11,0.2)',
    icon: '🏀',
  },
}

const TAG_COLORS = {
  amber:  '#fbbf24',
  blue:   '#60a5fa',
  green:  '#34d399',
  purple: '#c4b5fd',
}

export default function ProjectModal({ project, onClose }) {
  const closeBtnRef = useRef(null)
  const blocks = renderMarkdown(project?.caseStudy ?? '')
  const banner = BANNER_STYLES[project?.tagColor] ?? BANNER_STYLES.blue
  const tagColor = TAG_COLORS[project?.tagColor] ?? '#60a5fa'

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        data-testid="modal-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
        }}
      >
        <motion.div
          data-testid="modal-content"
          initial={{ opacity: 0, scale: 0.93, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 28 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: 780, width: '100%',
            maxHeight: '88vh',
            borderRadius: '28px',
            background: 'rgba(10, 10, 10, 0.92)',
            backdropFilter: 'blur(48px) saturate(160%)',
            WebkitBackdropFilter: 'blur(48px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.07)',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* ── Banner / Hero area ── */}
          <div style={{
            height: '160px',
            flexShrink: 0,
            background: banner.background,
            borderBottom: `1px solid ${banner.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Large emoji icon centered */}
            <span style={{ fontSize: '4rem', userSelect: 'none', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}>
              {banner.icon}
            </span>

            {/* Bottom gradient fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
              background: 'linear-gradient(to bottom, transparent, rgba(10,10,10,0.9))',
              pointerEvents: 'none',
            }} />

            {/* Tag badge */}
            <div style={{
              position: 'absolute', top: 16, left: 20,
              display: 'flex', gap: '8px',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: tagColor,
                background: `${tagColor}18`,
                border: `1px solid ${tagColor}33`,
                borderRadius: 'var(--radius-pill)',
                padding: '4px 12px',
                backdropFilter: 'blur(8px)',
              }}>
                {project.tag}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.5)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-pill)',
                padding: '4px 12px',
              }}>
                {project.category}
              </span>
            </div>

            {/* Close button */}
            <button
              ref={closeBtnRef}
              aria-label="Close modal"
              onClick={onClose}
              style={{
                position: 'absolute', top: 12, right: 12,
                width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.5)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
              }}
            >
              <X size={15} />
            </button>
          </div>

          {/* ── Scrollable content ── */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(20px, 3vw, 36px)' }}>

            {/* Project title */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 6px',
              lineHeight: 1.2,
            }}>
              {project.title}
            </h2>

            {/* Short description */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              color: 'rgba(255,255,255,0.45)',
              margin: '0 0 20px',
              lineHeight: 1.6,
            }}>
              {project.description}
            </p>

            {/* Tech stack pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
              {project.techStack.map((tech) => (
                <span key={tech} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  padding: '3px 11px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: 'rgba(255,255,255,0.55)',
                }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(255,255,255,0.08), transparent)',
              marginBottom: '24px',
            }} />

            {/* Rendered markdown */}
            <div>
              {blocks.map((block, i) => (
                <MarkdownBlock key={i} block={block} idx={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
