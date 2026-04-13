// Feature: personal-portfolio-website, Property 5: Every rendered project card displays all required fields
import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fc from 'fast-check';
import ProjectCard from '../ProjectCard.jsx';
import projects from '../../data/projects.js';

afterEach(() => {
  cleanup();
});

/**
 * Property 5: Every rendered project card displays all required fields
 * Validates: Requirements 9.4
 */
describe('ProjectCard — Property 5: displays all required fields', () => {
  it('renders category tag pill, title, description, and tech chips for any project', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const onClick = vi.fn();
        const { container } = render(<ProjectCard project={project} onClick={onClick} />);

        const card = container.querySelector(`[data-project-id="${project.id}"]`);
        expect(card).not.toBeNull();

        // Category tag pill
        expect(card.textContent).toContain(project.tag);

        // Title
        expect(card.textContent).toContain(project.title);

        // Description (partial match)
        expect(card.textContent).toContain(project.description.slice(0, 30));

        // At least one tech chip
        expect(project.techStack.some((tech) => card.textContent.includes(tech))).toBe(true);

        cleanup();
      }),
      { numRuns: 100 }
    );
  });

  it('renders a gradient div placeholder and no <img> element for any project', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const onClick = vi.fn();
        const { container } = render(<ProjectCard project={project} onClick={onClick} />);

        // No img elements
        const imgs = container.querySelectorAll('img');
        expect(imgs.length).toBe(0);

        // Gradient placeholder div exists (has inline background style with gradient)
        const divs = Array.from(container.querySelectorAll('div'));
        const gradientDiv = divs.find(
          (d) => d.style && d.style.background && d.style.background.includes('gradient')
        );
        expect(gradientDiv).not.toBeUndefined();

        cleanup();
      }),
      { numRuns: 100 }
    );
  });
});
