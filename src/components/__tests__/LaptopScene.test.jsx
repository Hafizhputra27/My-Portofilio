import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('LaptopScene — unit tests', () => {
  let originalIntersectionObserver;

  beforeEach(() => {
    originalIntersectionObserver = window.IntersectionObserver;
    // Mock requestAnimationFrame to avoid infinite loops
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders gradient placeholder div when WebGL is unavailable', async () => {
    // Mock THREE.WebGLRenderer to throw
    vi.doMock('three', async () => {
      const actual = await vi.importActual('three');
      return {
        ...actual,
        WebGLRenderer: class {
          constructor() {
            throw new Error('WebGL not supported');
          }
        },
      };
    });

    // Mock useInView to return true
    vi.doMock('../../hooks/useInView.js', () => ({ default: () => true }));

    const { default: LaptopScene } = await import('../LaptopScene.jsx');
    const { container } = render(<LaptopScene />);

    // Should render the gradient placeholder div, not a canvas
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeNull();

    const placeholder = container.querySelector('div');
    expect(placeholder).not.toBeNull();
    expect(placeholder.style.background).toContain('linear-gradient');
  });

  it('animation loop runs when IntersectionObserver is unavailable (useInView defaults to true)', async () => {
    // Remove IntersectionObserver to simulate unavailability
    delete window.IntersectionObserver;

    // useInView should default to true when IO is unavailable
    const { default: useInView } = await import('../../hooks/useInView.js');
    const { renderHook } = await import('@testing-library/react');

    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useInView(ref));

    // When IntersectionObserver is unavailable, useInView returns true
    expect(result.current).toBe(true);
  });
});
