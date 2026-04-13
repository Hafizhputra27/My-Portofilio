import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);

  // Attach Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Auto-focus close button for focus trapping
  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <div
        data-testid="modal-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        {/* Modal content box */}
        <motion.div
          data-testid="modal-content"
          className="glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: 800,
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: '32px 36px',
            position: 'relative',
          }}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            aria-label="Close modal"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              lineHeight: 1,
              color: 'var(--text-mid)',
              padding: '4px 8px',
              borderRadius: 8,
            }}
          >
            ×
          </button>

          {/* Title */}
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--text-dark)',
              margin: '0 0 20px',
              paddingRight: 40,
            }}
          >
            {project.title}
          </h2>

          {/* Case study content */}
          <pre
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.9rem',
              color: 'var(--text-mid)',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          >
            {project.caseStudy}
          </pre>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
