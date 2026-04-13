// Feature: personal-portfolio-website, Property 7: ProjectModal closes on Escape or backdrop click
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fc from 'fast-check';
import ProjectModal from '../ProjectModal.jsx';
import projects from '../../data/projects.js';

afterEach(() => {
  cleanup();
});

/**
 * Property 7: ProjectModal closes on Escape or backdrop click
 * Validates: Requirements 9.8
 */
describe('ProjectModal — Property 7: closes on Escape or backdrop click', () => {
  it('pressing Escape calls onClose for any project', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const onClose = vi.fn();
        render(<ProjectModal project={project} onClose={onClose} />);

        fireEvent.keyDown(document, { key: 'Escape' });

        expect(onClose).toHaveBeenCalledTimes(1);
        cleanup();
      }),
      { numRuns: 100 }
    );
  });

  it('clicking the backdrop calls onClose for any project', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const onClose = vi.fn();
        const { getByTestId } = render(<ProjectModal project={project} onClose={onClose} />);

        fireEvent.click(getByTestId('modal-backdrop'));

        expect(onClose).toHaveBeenCalledTimes(1);
        cleanup();
      }),
      { numRuns: 100 }
    );
  });

  it('clicking the modal content does NOT call onClose (stopPropagation) for any project', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const onClose = vi.fn();
        const { getByTestId } = render(<ProjectModal project={project} onClose={onClose} />);

        fireEvent.click(getByTestId('modal-content'));

        expect(onClose).not.toHaveBeenCalled();
        cleanup();
      }),
      { numRuns: 100 }
    );
  });
});

describe('ProjectModal — unit tests', () => {
  it('renders project title and caseStudy content', () => {
    const project = projects[0];
    const onClose = vi.fn();
    const { getByTestId } = render(<ProjectModal project={project} onClose={onClose} />);

    expect(screen.getByText(project.title)).toBeInTheDocument();
    // caseStudy is long text in a <pre> — check the pre element contains it
    const pre = getByTestId('modal-content').querySelector('pre');
    expect(pre).not.toBeNull();
    expect(pre.textContent.trim()).toBe(project.caseStudy.trim());
  });

  it('has a close button with aria-label="Close modal"', () => {
    const project = projects[0];
    const onClose = vi.fn();
    render(<ProjectModal project={project} onClose={onClose} />);

    const closeBtn = screen.getByRole('button', { name: /close modal/i });
    expect(closeBtn).toBeInTheDocument();
  });

  it('close button click calls onClose', () => {
    const project = projects[0];
    const onClose = vi.fn();
    render(<ProjectModal project={project} onClose={onClose} />);

    const closeBtn = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when project is null', () => {
    const onClose = vi.fn();
    const { container } = render(<ProjectModal project={null} onClose={onClose} />);
    expect(container.firstChild).toBeNull();
  });
});
