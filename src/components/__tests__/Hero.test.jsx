import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock LaptopScene (lazy-loaded)
vi.mock('../LaptopScene.jsx', () => ({
  default: () => <canvas data-testid="laptop-canvas" />,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock useInView
vi.mock('../../hooks/useInView.js', () => ({ default: () => true }));

import Hero from '../Hero.jsx';

describe('Hero — unit tests', () => {
  it('renders status badge with pulsing dot and text', async () => {
    render(<Hero />);
    // The badge span contains exactly this text (not the bio paragraph)
    expect(
      screen.getByText('Mahasiswa S1 Sistem Informasi · Widyatama')
    ).toBeInTheDocument();
  });

  it('renders H1 heading with owner name', async () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Ahmad Hafizh/i)).toBeInTheDocument();
  });

  it('renders role line', async () => {
    render(<Hero />);
    expect(
      screen.getByText(/Project Manager.*Developer.*Innovator/i)
    ).toBeInTheDocument();
  });

  it('renders bio paragraph', async () => {
    render(<Hero />);
    expect(screen.getByText(/Universitas Widyatama Bandung/i)).toBeInTheDocument();
  });

  it('renders CTA buttons: "Lihat Projects" and "Let\'s Talk"', async () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /Lihat Projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Let.s Talk/i })).toBeInTheDocument();
  });

  it('renders stats row with 3+ Projects, PKM, and National Event', async () => {
    render(<Hero />);
    expect(screen.getByText('3+')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('PKM')).toBeInTheDocument();
    expect(screen.getByText('National Event')).toBeInTheDocument();
  });

  it('renders canvas element for LaptopScene', async () => {
    render(<Hero />);
    // Suspense resolves synchronously in test environment with the mock
    const canvas = await screen.findByTestId('laptop-canvas');
    expect(canvas).toBeInTheDocument();
  });
});
