import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { Instagram, Mail, Linkedin, Send } from 'lucide-react'

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const socials = [
  {
    label: 'Instagram',
    handle: '@apiskp',
    href: 'https://instagram.com/apiskp',
    Icon: Instagram,
    color: '#e1306c',
  },
  {
    label: 'Email',
    handle: 'hafizhkarunia27@gmail.com',
    href: 'mailto:hafizhkarunia27@gmail.com',
    Icon: Mail,
    color: 'var(--accent)',
  },
  {
    label: 'LinkedIn',
    handle: 'ahmad-hafizh-karunia-putra',
    href: 'https://linkedin.com/in/ahmad-hafizh-karunia-putra',
    Icon: Linkedin,
    color: '#0a66c2',
  },
]

function SocialLink({ label, handle, href, Icon, color }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={`${label}: ${handle}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 18px',
        borderRadius: 'var(--radius-md)',
        background: hovered ? 'rgba(255,255,255,0.07)' : 'var(--glass-bg)',
        border: `1px solid ${hovered ? color + '55' : 'var(--glass-border)'}`,
        color: 'var(--text-primary)',
        textDecoration: 'none',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
      }}
    >
      <motion.div
        animate={hovered ? { y: [-2, 2, -2], scale: 1.15 } : { y: 0, scale: 1 }}
        transition={hovered ? { duration: 0.4, repeat: Infinity } : { duration: 0.2 }}
        style={{
          width: 40, height: 40,
          borderRadius: '10px',
          background: `${color}18`,
          border: `1px solid ${color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={18} color={color} strokeWidth={1.8} />
      </motion.div>
      <div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--weight-semibold)',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '2px',
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-small)',
          color: 'var(--text-secondary)',
        }}>
          {handle}
        </div>
      </div>
    </a>
  )
}

function GlowingInput({ id, name, label, type = 'text', value, onChange, error, placeholder, multiline = false }) {
  const [focused, setFocused] = useState(false)
  const Tag = multiline ? 'textarea' : 'input'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-small)',
          fontWeight: 'var(--weight-semibold)',
          color: focused ? 'var(--accent)' : 'var(--text-secondary)',
          transition: 'color 0.2s',
        }}
      >
        {label}
      </label>
      <div
        style={{
          borderRadius: 'var(--radius-sm)',
          padding: '1.5px',
          background: error
            ? 'rgba(239,68,68,0.5)'
            : focused
              ? 'linear-gradient(135deg, var(--accent), var(--accent-2))'
              : 'transparent',
          transition: 'background 0.25s',
        }}
      >
        <Tag
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={multiline ? 5 : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            display: 'block',
            width: '100%',
            padding: '12px 16px',
            borderRadius: 'calc(var(--radius-sm) - 1px)',
            border: 'none',
            background: 'rgba(10,10,30,0.7)',
            backdropFilter: 'blur(8px)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-small)',
            color: 'var(--text-primary)',
            outline: 'none',
            resize: multiline ? 'vertical' : 'none',
            transition: 'background 0.2s',
          }}
        />
      </div>
      {error && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          color: '#f87171',
        }}>
          {error}
        </span>
      )}
    </div>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required.'
    if (!form.email.trim())   e.email   = 'Email is required.'
    if (!form.message.trim()) e.message = 'Message is required.'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }

  return (
    <section id="contact" className="section-container">
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <p className="section-label">Get in touch</p>
        <h2 className="section-heading">Let&apos;s Collaborate</h2>
        <div className="section-divider" />
      </div>

      <div
        className="glass-strong contact-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '48px',
          padding: 'clamp(28px, 5vw, 56px)',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Left — social links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              fontWeight: 'var(--weight-bold)',
              color: 'var(--text-primary)',
              margin: '0 0 12px',
              lineHeight: 1.2,
            }}>
              Have a project in mind?
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              margin: 0,
            }}>
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Reach out through any channel below.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {socials.map((s) => (
              <SocialLink key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div>
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass"
              style={{
                padding: '32px',
                textAlign: 'center',
                color: '#4ade80',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✓</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 'var(--weight-medium)' }}>
                Message sent! I&apos;ll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <GlowingInput
                id="name" name="name" label="Name"
                value={form.name} onChange={handleChange}
                placeholder="Your full name" error={errors.name}
              />
              <GlowingInput
                id="email" name="email" label="Email" type="email"
                value={form.email} onChange={handleChange}
                placeholder="email@example.com" error={errors.email}
              />
              <GlowingInput
                id="message" name="message" label="Message" multiline
                value={form.message} onChange={handleChange}
                placeholder="Tell me about your project..." error={errors.message}
              />

              {status === 'error' && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#f87171',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-small)',
                }}>
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-shimmer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-pill)',
                  background: status === 'sending'
                    ? 'rgba(167,139,250,0.3)'
                    : 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-small)',
                  fontWeight: 'var(--weight-semibold)',
                  border: 'none',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  alignSelf: 'flex-start',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 20px rgba(167,139,250,0.3)',
                }}
                onMouseEnter={(e) => status !== 'sending' && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Send size={16} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .contact-grid { grid-template-columns: 1fr !important; padding: 24px !important; }
        }
      `}</style>
    </section>
  )
}
