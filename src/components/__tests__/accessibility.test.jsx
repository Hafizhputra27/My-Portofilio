// Feature: personal-portfolio-website, Property 13: All interactive elements are keyboard-focusable
// Feature: personal-portfolio-website, Property 14: All images have alt text and icon-only buttons have aria-label
import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useAnimation: () => ({ start: vi.fn() }),
  useInView: () => true,
}));

// Mock useInView hook
vi.mock('../../hooks/useInView.js', () => ({
  default: () => true,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Menu: () => <svg data-testid="icon-menu" aria-hidden="true" />,
  X: () => <svg data-testid="icon-x" aria-hidden="true" />,
  GraduationCap: () => <svg aria-hidden="true" />,
  Trophy: () => <svg aria-hidden="true" />,
  Lightbulb: () => <svg aria-hidden="true" />,
  Zap: () => <svg aria-hidden="true" />,
  ExternalLink: () => <svg aria-hidden="true" />,
  Code2: () => <svg aria-hidden="true" />,
}));

// Mock @emailjs/browser
vi.mock('@emailjs/browser', () => ({
  default: { sendForm: vi.fn() },
}));

import Navbar from '../Navbar.jsx';
import Contact from '../Contact.jsx';
import ProjectCard from '../ProjectCard.jsx';

afterEach(() => {
  cleanup();
});

// Sample project for ProjectCard rendering
const sampleProject = {
  id: 'test-project',
  title: 'Test Project',
  category: 'Dev',
  tag: 'Dev',
  tagColor: 'blue',
  description: 'A test project description.',
  techStack: ['React', 'Node.js'],
  caseStudy: 'Full case study text.',
  featured: false,
};

/**
 * Property 13: All interactive elements are keyboard-focusable
 * Validates: Requirements 14.5
 *
 * For any interactive element (link, button, input, textarea) rendered in key
 * components, the element must be reachable via keyboard Tab navigation:
 * - tabIndex must be >= 0 (or absent, which defaults to 0)
 * - element must not be disabled (unless intentionally, e.g. submit while sending)
 */
describe('Accessibility — Property 13: All interactive elements are keyboard-focusable', () => {
  it('Navbar: all links and buttons have tabIndex >= 0', () => {
    const { container } = render(<Navbar />);

    const interactiveElements = [
      ...container.querySelectorAll('a'),
      ...container.querySelectorAll('button'),
    ];

    expect(interactiveElements.length).toBeGreaterThan(0);

    interactiveElements.forEach((el) => {
      const tabIndex = el.tabIndex;
      // tabIndex defaults to 0 for native interactive elements; -1 means not focusable
      expect(tabIndex).toBeGreaterThanOrEqual(0);
    });
  });

  it('Contact form: all inputs, textareas, buttons, and links have tabIndex >= 0', () => {
    const { container } = render(<Contact />);

    const interactiveElements = [
      ...container.querySelectorAll('a'),
      ...container.querySelectorAll('button'),
      ...container.querySelectorAll('input'),
      ...container.querySelectorAll('textarea'),
    ];

    expect(interactiveElements.length).toBeGreaterThan(0);

    interactiveElements.forEach((el) => {
      const tabIndex = el.tabIndex;
      expect(tabIndex).toBeGreaterThanOrEqual(0);
    });
  });

  it('ProjectCard: the card element is keyboard-focusable (tabIndex 0)', () => {
    const { container } = render(
      <ProjectCard project={sampleProject} onClick={() => {}} />
    );

    // The article with role="button" must be focusable
    const card = container.querySelector('[role="button"]');
    expect(card).not.toBeNull();
    expect(card.tabIndex).toBe(0);
  });

  it('Contact form submit button is not disabled in idle state', () => {
    const { container } = render(<Contact />);

    const submitBtn = container.querySelector('button[type="submit"]');
    expect(submitBtn).not.toBeNull();
    expect(submitBtn.disabled).toBe(false);
    expect(submitBtn.tabIndex).toBeGreaterThanOrEqual(0);
  });
});

/**
 * Property 14: All images have alt text and icon-only buttons have aria-label
 * Validates: Requirements 14.6
 *
 * 1. All <img> elements must have an alt attribute (may be empty string for decorative).
 * 2. All icon-only buttons (no visible text content, only SVG/icon children) must
 *    have a non-empty aria-label attribute.
 */
describe('Accessibility — Property 14: Alt text and aria-label', () => {
  it('Navbar: all <img> elements have an alt attribute', () => {
    const { container } = render(<Navbar />);

    const images = container.querySelectorAll('img');
    images.forEach((img) => {
      expect(img.hasAttribute('alt')).toBe(true);
    });
  });

  it('Navbar: hamburger button (icon-only) has aria-label', () => {
    const { container } = render(<Navbar />);

    // The hamburger button contains only an icon (SVG), no visible text
    const hamburgerBtn = container.querySelector('.hamburger-btn');
    expect(hamburgerBtn).not.toBeNull();
    expect(hamburgerBtn.getAttribute('aria-label')).toBeTruthy();
  });

  it('Contact: all <img> elements have an alt attribute', () => {
    const { container } = render(<Contact />);

    const images = container.querySelectorAll('img');
    images.forEach((img) => {
      expect(img.hasAttribute('alt')).toBe(true);
    });
  });

  it('Contact: all links with aria-label have non-empty aria-label', () => {
    const { container } = render(<Contact />);

    // Contact buttons (Instagram, Email, LinkedIn) use aria-label
    const linksWithAriaLabel = container.querySelectorAll('a[aria-label]');
    expect(linksWithAriaLabel.length).toBeGreaterThan(0);

    linksWithAriaLabel.forEach((link) => {
      const label = link.getAttribute('aria-label');
      expect(label).toBeTruthy();
      expect(label.trim().length).toBeGreaterThan(0);
    });
  });

  it('ProjectCard: no <img> elements are present (uses gradient div placeholders)', () => {
    const { container } = render(
      <ProjectCard project={sampleProject} onClick={() => {}} />
    );

    // Per Property 15 / Requirement 15.3: placeholders must be divs, not img elements
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(0);
  });

  it('ProjectCard: card has aria-label describing the project', () => {
    const { container } = render(
      <ProjectCard project={sampleProject} onClick={() => {}} />
    );

    const card = container.querySelector('[role="button"]');
    expect(card).not.toBeNull();
    const ariaLabel = card.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel).toContain(sampleProject.title);
  });
});
