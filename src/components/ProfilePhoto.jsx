import { useRef, useEffect, useState } from 'react'
import profileImg from '../assets/foto-profil-new.png'

const ORBIT_ITEMS = [
  { label: 'React',      logo: 'https://cdn.simpleicons.org/react/61DAFB',      angle: 0   },
  { label: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E', angle: 60  },
  { label: 'Python',     logo: 'https://cdn.simpleicons.org/python/3776AB',     angle: 120 },
  { label: 'Node.js',    logo: 'https://cdn.simpleicons.org/nodedotjs/339933',  angle: 180 },
  { label: 'Next.js',    logo: 'https://cdn.simpleicons.org/nextdotjs/ffffff',  angle: 240 },
  { label: 'Kotlin',     logo: 'https://cdn.simpleicons.org/kotlin/7F52FF',     angle: 300 },
]

const SPEED  = 0.28
const ORBIT_R = 175

export default function ProfilePhoto() {
  const rafRef    = useRef(null)
  const tiltRef   = useRef(null)
  const wrapRef   = useRef(null)
  const targetRef = useRef({ rx: 0, ry: 0 })
  const curRef    = useRef({ rx: 0, ry: 0 })
  const [angles, setAngles]   = useState(ORBIT_ITEMS.map((i) => i.angle))

  // Orbit loop
  useEffect(() => {
    const a = ORBIT_ITEMS.map((i) => i.angle)
    const tick = () => {
      for (let i = 0; i < a.length; i++) a[i] = (a[i] + SPEED * 0.5) % 360
      setAngles([...a])
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Float + tilt
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const lerp = (a, b, t) => a + (b - a) * t
    let t = 0
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      targetRef.current = {
        rx: -((e.clientY - (r.top  + r.height / 2)) / (r.height / 2)) * 8,
        ry:  ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) * 8,
      }
    }
    const onLeave = () => { targetRef.current = { rx: 0, ry: 0 } }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    const run = () => {
      t += 0.016
      const fy = Math.sin(t * 0.5) * 12
      curRef.current.rx = lerp(curRef.current.rx, targetRef.current.rx, 0.06)
      curRef.current.ry = lerp(curRef.current.ry, targetRef.current.ry, 0.06)
      el.style.transform = `translateY(${fy}px) perspective(1000px) rotateX(${curRef.current.rx}deg) rotateY(${curRef.current.ry}deg)`
      tiltRef.current = requestAnimationFrame(run)
    }
    run()
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(tiltRef.current)
    }
  }, [])

  const backIcons  = ORBIT_ITEMS.filter((_, i) => Math.sin((angles[i] * Math.PI) / 180) < 0)
  const frontIcons = ORBIT_ITEMS.filter((_, i) => Math.sin((angles[i] * Math.PI) / 180) >= 0)

  const renderIcon = (item, i, zIndex) => {
    const idx  = ORBIT_ITEMS.indexOf(item)
    const rad  = (angles[idx] * Math.PI) / 180
    const x    = Math.cos(rad) * ORBIT_R
    const y    = Math.sin(rad) * ORBIT_R * 0.4 // flatten to ellipse
    const behind = zIndex === 2
    return (
      <div
        key={item.label}
        title={item.label}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
          width: '46px', height: '46px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: behind
            ? '0 2px 8px rgba(0,0,0,0.3)'
            : '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex,
          opacity: behind ? 0.45 : 1,
          transition: 'opacity 0.12s',
          padding: '10px',
        }}
      >
        <img
          src={item.logo}
          alt={item.label}
          style={{ width: '24px', height: '24px', objectFit: 'contain' }}
        />
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        cursor: 'none',
      }}
    >
      {/* ── Light Theme Profile Backdrop ── */}
      {/* Outer subtle soft glow */}
      <div style={{
        position: 'absolute',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -46%)',
        pointerEvents: 'none', zIndex: 0,
        filter: 'blur(16px)',
      }} />
      {/* Defined gradient border wrapping the photo */}
      <div style={{
        position: 'absolute',
        width: '320px', height: '320px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(124, 58, 237, 0.05))',
        border: '2px solid rgba(79, 70, 229, 0.3)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -43%)',
        boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 12px 32px rgba(79, 70, 229, 0.1)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Orbit ring */}
      <div style={{
        position: 'absolute',
        width: `${ORBIT_R * 2}px`, height: `${ORBIT_R * 0.8}px`,
        borderRadius: '50%',
        border: '1px dashed rgba(79, 70, 229, 0.3)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', zIndex: 3,
      }} />

      {/* Back orbit icons */}
      {backIcons.map((item, i) => renderIcon(item, i, 4))}

      {/* Photo */}
      <img
        src={profileImg}
        alt="Ahmad Hafizh Karunia Putra"
        loading="lazy"
        draggable={false}
        style={{
          position: 'relative',
          zIndex: 5,
          width: 'clamp(280px, 45%, 420px)',
          height: 'auto',
          objectFit: 'contain',
          objectPosition: 'bottom',
          userSelect: 'none',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 20px 40px rgba(79, 70, 229, 0.15))',
        }}
      />

      {/* Front orbit icons */}
      {frontIcons.map((item, i) => renderIcon(item, i, 4))}
    </div>
  )
}
