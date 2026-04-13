import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Instagram, Mail, Linkedin } from 'lucide-react'

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const formRef = useRef(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  function validate() {
    const newErrors = {}
    if (!formState.name.trim()) newErrors.name = 'Name is required.'
    if (!formState.email.trim()) newErrors.email = 'Email is required.'
    if (!formState.message.trim()) newErrors.message = 'Message is required.'
    return newErrors
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setStatus('sending')
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus('success')
      })
      .catch(() => {
        setStatus('error')
      })
  }

  return (
    <section
      id="contact"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '1100px',
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
          Contact
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

      {/* Full-width Glass Card split layout */}
      <div
        className="glass-card contact-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          padding: '48px',
        }}
      >
        {/* Left side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 700,
              color: 'var(--text-dark)',
              margin: 0,
            }}
          >
            Let's Collaborate
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px',
              color: 'var(--text-mid)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Have a project idea, a question, or want to collaborate? Feel free to reach out
            through any of the channels below or fill in the form directly.
          </p>

          {/* Contact buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Instagram */}
            <a
              href="https://instagram.com/wisewidyatama"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @wisewidyatama"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(123,127,245,0.08)',
                border: '1px solid rgba(123,127,245,0.2)',
                color: 'var(--text-dark)',
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background 0.2s',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
                <Instagram size={18} color="var(--accent)" strokeWidth={1.8} />
              </span>
              @wisewidyatama
            </a>

            {/* Email */}
            <a
              href="mailto:ahmad@example.com"
              aria-label="Send email"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(123,127,245,0.08)',
                border: '1px solid rgba(123,127,245,0.2)',
                color: 'var(--text-dark)',
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background 0.2s',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
                <Mail size={18} color="var(--accent)" strokeWidth={1.8} />
              </span>
              ahmad@example.com
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/ahmad-hafizh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(123,127,245,0.08)',
                border: '1px solid rgba(123,127,245,0.2)',
                color: 'var(--text-dark)',
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background 0.2s',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
                <Linkedin size={18} color="var(--accent)" strokeWidth={1.8} />
              </span>
              linkedin.com/in/ahmad-hafizh
            </a>
          </div>
        </div>

        {/* Right side — form */}
        <div>
          {status === 'success' ? (
            <div
              data-testid="success-message"
              style={{
                padding: '24px',
                borderRadius: '12px',
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)',
                color: '#166534',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
                lineHeight: 1.6,
              }}
            >
              Message sent successfully! I'll get back to you soon.
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Name field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="name"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                  }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: errors.name
                      ? '1px solid #ef4444'
                      : '1px solid rgba(123,127,245,0.25)',
                    background: 'rgba(255,255,255,0.6)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: 'var(--text-dark)',
                    outline: 'none',
                  }}
                />
                {errors.name && (
                  <span
                    data-testid="error-name"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#ef4444' }}
                  >
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="email"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: errors.email
                      ? '1px solid #ef4444'
                      : '1px solid rgba(123,127,245,0.25)',
                    background: 'rgba(255,255,255,0.6)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: 'var(--text-dark)',
                    outline: 'none',
                  }}
                />
                {errors.email && (
                  <span
                    data-testid="error-email"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#ef4444' }}
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Message field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="message"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={5}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: errors.message
                      ? '1px solid #ef4444'
                      : '1px solid rgba(123,127,245,0.25)',
                    background: 'rgba(255,255,255,0.6)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: 'var(--text-dark)',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
                {errors.message && (
                  <span
                    data-testid="error-message"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#ef4444' }}
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Error status message */}
              {status === 'error' && (
                <div
                  data-testid="error-message"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#991b1b',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                  }}
                >
                  Something went wrong. Please try again or contact me directly via email.
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  background: status === 'sending' ? 'rgba(123,127,245,0.5)' : 'var(--accent)',
                  color: '#fff',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.2s',
                  alignSelf: 'flex-start',
                }}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Responsive: single column on mobile */}
      <style>{`
        @media (max-width: 767px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
