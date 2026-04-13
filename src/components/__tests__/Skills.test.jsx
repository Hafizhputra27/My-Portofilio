// Feature: personal-portfolio-website, Property 9: Every skill in data has a rendered item with correct progress bar
import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import skills from '../../data/skills.js';

// Mock framer-motion so motion.div renders with the final `animate` value immediately
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ animate, style, children, ...rest }) => {
      // Merge animate styles into the style prop so the final state is visible in DOM
      const mergedStyle = { ...style, ...(typeof animate === 'object' ? animate : {}) };
      return <div style={mergedStyle} {...rest}>{children}</div>;
    },
  },
}));

// Import after mock is set up
const { default: Skills } = await import('../Skills.jsx');

afterEach(() => {
  cleanup();
});

/**
 * Property 9: Every skill in data has a rendered item with correct progress bar
 * Validates: Requirements 11.1, 11.3
 */
describe('Skills — Property 9: every skill has a rendered item with correct progress bar', () => {
  it('renders a skill card with data-skill-name and correct progress bar width for each skill', () => {
    fc.assert(
      fc.property(fc.constantFrom(...skills), (skill) => {
        const { container } = render(<Skills />);

        // Check skill card exists
        const card = container.querySelector(`[data-skill-name="${skill.name}"]`);
        expect(card).not.toBeNull();

        // Check progress bar has the correct target width
        const progressBar = card.querySelector('[data-testid="progress-bar"]');
        expect(progressBar).not.toBeNull();
        expect(progressBar.style.width).toBe(`${skill.level}%`);

        cleanup();
      }),
      { numRuns: 100 }
    );
  });
});
