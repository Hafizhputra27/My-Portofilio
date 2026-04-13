export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '40px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        marginTop: '0',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-small)',
        color: 'var(--text-muted)',
        margin: '0 0 8px',
      }}>
        © {currentYear} Ahmad Hafizh Karunia Putra · Widyatama University
      </p>
    </footer>
  )
}
