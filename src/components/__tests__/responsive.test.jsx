import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock useInView to always return true
vi.mock('../../hooks/useInView.js', () => ({
  default: () => true,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  GraduationCap: () => <svg data-testid="icon-graduation" />,
  Trophy: () => <svg data-testid="icon-trophy" />,
  Lightbulb: () => <svg data-testid="icon-lightbulb" />,
  Zap: () => <svg data-testid="icon-zap" />,
  X: () => <svg data-testid="icon-x" />,
  ExternalLink: () => <svg data-testid="icon-external" />,
  Code2: () => <svg data-testid="icon-code" />,
}));

// Mock emailjs
vi.mock('@emailjs/browser', () => ({
  default: { sendForm: vi.fn() },
}));

import About from '../About.jsx';
import Skills from '../Skills.jsx';

/**
 * Helper: collect all text from <style> elements in the rendered container.
 */
function getStyleContent(container) {
  const styleEls = container.querySelectorAll('style');
  return Array.from(styleEls)
    .map((el) => el.textContent)
    .join('\n');
}

/**
 * Helper: check that a CSS string contains a media query covering the given
 * mobile width (i.e. @media (max-width: Npx) where N >= mobileWidth).
 *
 * Since jsdom does not execute CSS media queries, we verify the CSS rules are
 * present in the rendered <style> tags and that the breakpoint covers the
 * generated mobile viewport width.
 */
function mediaQueryCoversWidth(cssText, mobileWidth) {
  // Match all @media (max-width: Npx) declarations
  const mediaRegex = /@media\s*\(\s*max-width\s*:\s*(\d+)px\s*\)/g;
  let match;
  while ((match = mediaRegex.exec(cssText)) !== null) {
    const breakpoint = parseInt(match[1], 10);
    if (breakpoint >= mobileWidth) {
      return true;
    }
  }
  return false;
}

describe('Responsive layout — Property 12', () => {
  // Feature: personal-portfolio-website, Property 12: All multi-column grid sections collapse to single column on mobile
  // Validates: Requirements 14.4

  describe('About component', () => {
    it('Property 12: About grid has @media (max-width: 767px) rule with grid-template-columns: 1fr for any mobile width 320–767px', () => {
      const { container } = render(<About />);
      const cssText = getStyleContent(container);

      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 767 }),
          (mobileWidth) => {
            // The CSS breakpoint must cover this mobile width
            expect(mediaQueryCoversWidth(cssText, mobileWidth)).toBe(true);

            // The media query must set grid to single column
            expect(cssText).toMatch(/@media\s*\(\s*max-width\s*:\s*767px\s*\)/);
            expect(cssText).toMatch(/grid-template-columns\s*:\s*1fr/);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('About grid CSS contains correct single-column rule inside the 767px media query', () => {
      const { container } = render(<About />);
      const cssText = getStyleContent(container);

      // Verify the media query block contains the single-column rule
      const mediaBlockMatch = cssText.match(
        /@media\s*\(\s*max-width\s*:\s*767px\s*\)\s*\{([^}]*\.about-grid[^}]*\{[^}]*\}[^}]*)\}/s
      );
      expect(mediaBlockMatch).not.toBeNull();

      const mediaBlockContent = mediaBlockMatch ? mediaBlockMatch[0] : '';
      expect(mediaBlockContent).toMatch(/grid-template-columns\s*:\s*1fr/);
    });
  });

  describe('Skills component', () => {
    it('Property 12: Skills grid has @media (max-width: 767px) rule for any mobile width 320–767px', () => {
      const { container } = render(<Skills />);
      const cssText = getStyleContent(container);

      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 767 }),
          (mobileWidth) => {
            // The CSS breakpoint must cover this mobile width
            expect(mediaQueryCoversWidth(cssText, mobileWidth)).toBe(true);

            // The media query must be present
            expect(cssText).toMatch(/@media\s*\(\s*max-width\s*:\s*767px\s*\)/);
            // Skills collapses to 2-column on mobile (per Requirement 11.6)
            expect(cssText).toMatch(/grid-template-columns\s*:\s*repeat\(2,\s*1fr\)/);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Skills grid CSS contains correct 2-column rule inside the 767px media query', () => {
      const { container } = render(<Skills />);
      const cssText = getStyleContent(container);

      const mediaBlockMatch = cssText.match(
        /@media\s*\(\s*max-width\s*:\s*767px\s*\)\s*\{([^}]*\.skills-grid[^}]*\{[^}]*\}[^}]*)\}/s
      );
      expect(mediaBlockMatch).not.toBeNull();

      const mediaBlockContent = mediaBlockMatch ? mediaBlockMatch[0] : '';
      expect(mediaBlockContent).toMatch(/grid-template-columns\s*:\s*repeat\(2,\s*1fr\)/);
    });
  });
});
