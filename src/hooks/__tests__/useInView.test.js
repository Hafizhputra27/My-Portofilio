import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import useInView from '../useInView';

// Helper to create a hook with a real ref pointing to a div
function renderUseInView(options) {
  return renderHook(() => {
    const ref = useRef(document.createElement('div'));
    const inView = useInView(ref, options);
    return { ref, inView };
  });
}

describe('useInView', () => {
  describe('when IntersectionObserver is available', () => {
    let observerCallback;
    let mockObserver;

    beforeEach(() => {
      mockObserver = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };

      vi.stubGlobal('IntersectionObserver', vi.fn((cb) => {
        observerCallback = cb;
        return mockObserver;
      }));
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('starts as true (initial state before first observation)', () => {
      const { result } = renderUseInView();
      // Initial state is true (default)
      expect(result.current.inView).toBe(true);
    });

    it('returns false when element is not intersecting', () => {
      const { result } = renderUseInView();

      act(() => {
        observerCallback([{ isIntersecting: false }]);
      });

      expect(result.current.inView).toBe(false);
    });

    it('returns true when element is intersecting', () => {
      const { result } = renderUseInView();

      act(() => {
        observerCallback([{ isIntersecting: false }]);
      });
      expect(result.current.inView).toBe(false);

      act(() => {
        observerCallback([{ isIntersecting: true }]);
      });
      expect(result.current.inView).toBe(true);
    });

    it('calls observer.observe on the ref element', () => {
      renderUseInView();
      expect(mockObserver.observe).toHaveBeenCalledTimes(1);
    });

    it('disconnects observer on unmount', () => {
      const { unmount } = renderUseInView();
      unmount();
      expect(mockObserver.disconnect).toHaveBeenCalledTimes(1);
    });

    it('passes options to IntersectionObserver constructor', () => {
      const options = { threshold: 0.5, rootMargin: '10px' };
      renderUseInView(options);
      expect(IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options);
    });
  });

  describe('when IntersectionObserver is unavailable', () => {
    beforeEach(() => {
      vi.stubGlobal('IntersectionObserver', undefined);
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('defaults to true so animation loop always runs', () => {
      const { result } = renderUseInView();
      expect(result.current.inView).toBe(true);
    });
  });

  describe('when ref has no current element', () => {
    it('does not throw and returns true', () => {
      vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
        observe: vi.fn(),
        disconnect: vi.fn(),
      })));

      const { result } = renderHook(() => {
        const ref = useRef(null); // null ref
        return useInView(ref);
      });

      expect(result.current).toBe(true);
      vi.unstubAllGlobals();
    });
  });
});
