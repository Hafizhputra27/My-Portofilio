import { useRef, useEffect, useState } from 'react'
import profileImg from '../assets/foto-profile.png'

const ORBIT_ITEMS = [
  { label: 'React',      logo: 'https://cdn.simpleicons.org/react/61DAFB',      bg: '#e8f9ff', angle: 0   },
  { label: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E', bg: '#fffde7', angle: 60  },
  { label: 'Python',     logo: 'https://cdn.simpleicons.org/python/3776AB',     bg: '#e8f0fb', angle: 120 },
  { label: 'Node.js',    logo: 'https://cdn.simpleicons.org/nodedotjs/339933',  bg: '#e8f5e9', angle: 180 },
  { label: 'Next.js',    logo: 'https://cdn.simpleicons.org/nextdotjs/000000',  bg: '#f5f5f5', angle: 240 },
  { label: 'Kotlin',     logo: 'https://cdn.simpleicons.org/kotlin/7F52FF',     bg: '#f0ebff', angle: 300 },
]

const SPEED = 0.32
const ORBIT_R = 185

export default function ProfilePhoto() {
  const rafRef    = useRef(null)
  const tiltRef   = useRef(null)
  const wrapRef   = useRef(null)
  const targetRef = useRef({ rx: 0, ry: 0 })
  const curRef    = useRef({ rx: 0, ry: 0 })
  const [angles, setAngles] = useState(ORBIT_ITEMS.map((i) => i.angle))

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
        rx: -((e.clientY - (r.top  + r.height / 2)) / (r.height / 2)) * 6,
        ry:  ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) * 6,
      }
    }
    const onLeave = () => { targetRef.current = { rx: 0, ry: 0 } }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    const run = () => {
      t += 0.016
      const fy = Math.sin(t * 0.55) * 10
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

  // Split icons into back (behind photo) and front (in front of photo)
  // sin(angle) < 0  → top half of ellipse → BEHIND the body (lower z-index)
  // sin(angle) >= 0 → bottom half          → IN FRONT of body (higher z-index)
  const backIcons  = ORBIT_ITEMS.filter((_, i) => Math.sin((angles[i] * Math.PI) / 180) < 0)
  const frontIcons = ORBIT_ITEMS.filter((_, i) => Math.sin((angles[i] * Math.PI) / 180) >= 0)

  const renderIcon = (item, i, zIndex) => {
    const idx   = ORBIT_ITEMS.indexOf(item)
    const rad   = (angles[idx] * Math.PI) / 180
    const x     = Math.cos(rad) * ORBIT_R
    const y     = Math.sin(rad) * ORBIT_R
    // Icons behind body are slightly faded to reinforce depth
    const isBehind = zIndex === 2
    return (
      <div
        key={item.label}
        title={item.label}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: item.bg,
          boxShadow: isBehind
            ? '0 2px 8px rgba(0,0,0,0.08)'
            : '0 4px 20px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex,
          opacity: isBehind ? 0.55 : 1,
          transition: 'opacity 0.1s',
          padding: '10px',
        }}
      >
        <img
          src={item.logo}
          alt={item.label}
          style={{ width: '26px', height: '26px', objectFit: 'contain' }}
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
        height: '600px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute',
        width: '420px', height: '420px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(165,180,252,0.28) 0%, transparent 68%)',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Orbit ring */}
      <div style={{
        position: 'absolute',
        width: `${ORBIT_R * 2}px`, height: `${ORBIT_R * 2}px`,
        borderRadius: '50%',
        border: '1.5px dashed rgba(123,127,245,0.2)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* BACK icons — z:2, behind photo (z:3) */}
      {backIcons.map((item, i) => renderIcon(item, i, 2))}

      {/* Photo — z:3 */}
      <img
        src={profileImg}
        alt="Ahmad Hafizh Karunia Putra"
        style={{
          position: 'relative',
          zIndex: 3,
          width: '420px',
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'contain',
          objectPosition: 'bottom',
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none',
          filter: 'drop-shadow(0px 20px 40px rgba(123,127,245,0.25))',
        }}
        draggable={false}
      />

      {/* FRONT icons — z:4, in front of photo */}
      {frontIcons.map((item, i) => renderIcon(item, i, 4))}
    </div>
  )
}
