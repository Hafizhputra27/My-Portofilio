// Feature: personal-portfolio-website, Property 4: Every project in data has a rendered card
// Feature: personal-portfolio-website, Property 5: Every rendered project card displays all required fields
// Feature: personal-portfolio-website, Property 6: Project card click opens modal with correct data
// Feature: personal-portfolio-website, Property 15: Image placeholders are div elements
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import * as fc from 'fast-check';
import Projects from '../Projects.jsx';
import projects from '../../data/projects.js';

afterEach(() => {
  cleanup();
});

/**
 * Property 4: Every project in data has a rendered card
 * Validates: Requirements 9.1
 */
describe('Projects — Property 4: every project has a rendered card', () => {
  it('renders a card with data-project-id matching each project id', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const { container } = render(<Projects />);
        const card = container.querySelector(`[data-project-id="${project.id}"]`);
        expect(card).not.toBeNull();
        cleanup();
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 5: Every rendered project card displays all required fields
 * Validates: Requirements 9.4
 */
describe('Projects — Property 5: every card shows required fields', () => {
  it('each card shows category tag, title, description, and at least one tech chip', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const { container } = render(<Projects />);
        const card = container.querySelector(`[data-project-id="${project.id}"]`);
        expect(card).not.toBeNull();

        // Category tag pill — project.tag text
        expect(card.textContent).toContain(project.tag);

        // Title
        expect(card.textContent).toContain(project.title);

        // Description (first 30 chars as a substring check)
        expect(card.textContent).toContain(project.description.slice(0, 30));

        // At least one tech chip
        expect(project.techStack.some((tech) => card.textContent.includes(tech))).toBe(true);

        cleanup();
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 6: Project card click opens modal with correct data
 * Validates: Requirements 9.6
 */
describe('Projects — Property 6: card click opens modal with correct project data', () => {
  it('clicking a card opens the modal showing that project title', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const { container } = render(<Projects />);
        const card = container.querySelector(`[data-project-id="${project.id}"]`);
        expect(card).not.toBeNull();

        fireEvent.click(card);

        // Modal should now be visible with the correct project title
        const modal = container.querySelector('[data-testid="modal-content"]');
        expect(modal).not.toBeNull();
        expect(modal.textContent).toContain(project.title);

        cleanup();
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 15: Image placeholders are div elements (no <img> in project cards)
 * Validates: Requirements 15.3
 */
describe('Projects — Property 15: image placeholders are div elements, not img', () => {
  it('no <img> elements exist inside any project card', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const { container } = render(<Projects />);
        const card = container.querySelector(`[data-project-id="${project.id}"]`);
        expect(card).not.toBeNull();

        const imgs = card.querySelectorAll('img');
        expect(imgs.length).toBe(0);

        cleanup();
      }),
      { numRuns: 100 }
    );
  });
});
