import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Menu: () => <svg data-testid="icon-menu" />,
  X: () => <svg data-testid="icon-x" />,
}));

import Navbar from '../Navbar.jsx';

describe('Navbar — unit tests', () => {
  it('renders logo text "Hafizh."', () => {
    render(<Navbar />);
    expect(screen.getByText('Hafizh.')).toBeInTheDocument();
  });

  it('hash links have correct hrefs (#about, #projects, #experience, #contact)', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('hamburger button toggles mobile menu on click', () => {
    const { container } = render(<Navbar />);

    // The hamburger button is in the DOM (hidden via CSS display:none on desktop)
    // but still accessible via aria-label query
    const hamburger = container.querySelector('button[aria-label="Toggle menu"]');
    expect(hamburger).not.toBeNull();

    // Initially closed
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    // Click hamburger → menu opens
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    // Click again → menu closes
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('mobile menu appears with nav links after hamburger click', () => {
    const { container } = render(<Navbar />);

    const hamburger = container.querySelector('button[aria-label="Toggle menu"]');
    fireEvent.click(hamburger);

    // After opening, there should be multiple links with the same labels
    // (one in the center nav, one in the slide-down menu)
    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    expect(aboutLinks.length).toBeGreaterThanOrEqual(2);
  });
});
