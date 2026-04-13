import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Cursor', () => {
  let originalOntouchstart;

  beforeEach(() => {
    originalOntouchstart = window.ontouchstart;
    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      // Don't actually call cb to avoid infinite loop in tests
      return 1;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    if (originalOntouchstart === undefined) {
      delete window.ontouchstart;
    } else {
      window.ontouchstart = originalOntouchstart;
    }
    vi.restoreAllMocks();
  });

  it('renders dot and ring elements on non-touch device', async () => {
    // Ensure no touch support
    delete window.ontouchstart;

    const { default: Cursor } = await import('../Cursor.jsx');
    const { container } = render(<Cursor />);

    const divs = container.querySelectorAll('div');
    expect(divs.length).toBe(2);
  });

  it('dot has correct size and color', async () => {
    delete window.ontouchstart;

    const { default: Cursor } = await import('../Cursor.jsx');
    const { container } = render(<Cursor />);

    const dot = container.querySelectorAll('div')[0];
    expect(dot.style.width).toBe('12px');
    expect(dot.style.height).toBe('12px');
    expect(dot.style.backgroundColor).toBe('rgb(123, 127, 245)');
    expect(dot.style.mixBlendMode).toBe('multiply');
  });

  it('ring has correct initial size and border', async () => {
    delete window.ontouchstart;

    const { default: Cursor } = await import('../Cursor.jsx');
    const { container } = render(<Cursor />);

    const ring = container.querySelectorAll('div')[1];
    expect(ring.style.width).toBe('36px');
    expect(ring.style.height).toBe('36px');
    expect(ring.style.border).toContain('rgb(123, 127, 245)');
  });

  it('both elements have position fixed and pointer-events none', async () => {
    delete window.ontouchstart;

    const { default: Cursor } = await import('../Cursor.jsx');
    const { container } = render(<Cursor />);

    const divs = container.querySelectorAll('div');
    divs.forEach((div) => {
      expect(div.style.position).toBe('fixed');
      expect(div.style.pointerEvents).toBe('none');
      expect(div.style.zIndex).toBe('9999');
    });
  });

  it('returns null on touch device', async () => {
    // Simulate touch device
    window.ontouchstart = () => {};

    // Re-import to get fresh module evaluation
    vi.resetModules();
    const { default: Cursor } = await import('../Cursor.jsx');
    const { container } = render(<Cursor />);

    expect(container.firstChild).toBeNull();
  });
});
