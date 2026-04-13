// Feature: personal-portfolio-website, Property 8: Every experience entry in data has a rendered timeline item
import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import * as fc from 'fast-check';
import Experience from '../Experience.jsx';
import experience from '../../data/experience.js';

afterEach(() => {
  cleanup();
});

/**
 * Property 8: Every experience entry in data has a rendered timeline item
 * Validates: Requirements 10.1, 10.3
 */
describe('Experience — Property 8: every entry has a rendered timeline item', () => {
  it('renders a timeline item with data-experience-title matching each entry', () => {
    fc.assert(
      fc.property(fc.constantFrom(...experience), (entry) => {
        const { container } = render(<Experience />);

        const item = container.querySelector(`[data-experience-title="${entry.title}"]`);
        expect(item).not.toBeNull();

        // Must contain title, organisation, and period
        expect(item.textContent).toContain(entry.title);
        expect(item.textContent).toContain(entry.organisation);
        expect(item.textContent).toContain(entry.period);

        cleanup();
      }),
      { numRuns: 100 }
    );
  });
});
