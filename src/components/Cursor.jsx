import { useEffect, useRef } from 'react';

export default function Cursor() {
  // Skip rendering on touch devices
  if ('ontouchstart' in window) return null;

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const expandedRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Dot follows mouse exactly — no lag
      dot.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    };

    const animate = () => {
      const { x: mx, y: my } = mouseRef.current;
      const { x: rx, y: ry } = ringPosRef.current;
      const factor = 0.12;

      const nx = rx + (mx - rx) * factor;
      const ny = ry + (my - ry) * factor;
      ringPosRef.current = { x: nx, y: ny };

      const size = expandedRef.current ? 56 : 36;
      const offset = size / 2;
      ring.style.transform = `translate(${nx - offset}px, ${ny - offset}px)`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.opacity = expandedRef.current ? '0.35' : '1';

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button')) {
        expandedRef.current = true;
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button')) {
        expandedRef.current = false;
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const baseStyle = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 9999,
    top: 0,
    left: 0,
    borderRadius: '50%',
    willChange: 'transform',
  };

  return (
    <>
      {/* Dot — follows mouse exactly */}
      <div
        ref={dotRef}
        style={{
          ...baseStyle,
          width: '12px',
          height: '12px',
          backgroundColor: '#7b7ff5',
          mixBlendMode: 'multiply',
        }}
      />
      {/* Ring — lerps toward mouse at factor 0.12 */}
      <div
        ref={ringRef}
        style={{
          ...baseStyle,
          width: '36px',
          height: '36px',
          border: '2px solid #7b7ff5',
          backgroundColor: 'transparent',
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.15s ease',
        }}
      />
    </>
  );
}
