import { useState, useEffect } from 'react';

/**
 * Returns true when the element referenced by `ref` is intersecting the viewport.
 * Defaults to true when IntersectionObserver is unavailable (e.g. test environments).
 *
 * @param {React.RefObject} ref - ref attached to the element to observe
 * @param {IntersectionObserverInit} [options] - threshold, rootMargin, etc.
 * @returns {boolean}
 */
export default function useInView(ref, options = {}) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: always in view so animation loop always runs
      setInView(true);
      return;
    }

    const element = ref?.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return inView;
}
