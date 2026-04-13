import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer.jsx';

describe('Footer — unit tests', () => {
  it('contains exact attribution text', () => {
    render(<Footer />);
    expect(
      screen.getByText('© 2026 Ahmad Hafizh Karunia Putra · Universitas Widyatama Bandung')
    ).toBeInTheDocument();
  });

  it('renders a <footer> semantic element', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).not.toBeNull();
  });
});
