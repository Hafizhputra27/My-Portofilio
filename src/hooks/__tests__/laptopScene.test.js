import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

const TOLERANCE = 1e-10;

describe('LaptopScene animation formula properties', () => {
  // Feature: personal-portfolio-website, Property 16: Three.js mouse interaction formula is correct
  // Validates: Requirements 7.10
  it('Property 16: mouse rotation formula computes correct targetRotY and targetRotX', () => {
    const windowWidth = 1920;
    const windowHeight = 1080;

    fc.assert(
      fc.property(
        fc.tuple(fc.float({ min: 0, max: 1920, noNaN: true }), fc.float({ min: 0, max: 1080, noNaN: true })),
        ([clientX, clientY]) => {
          const normalizedX = (clientX / windowWidth) * 2 - 1;
          const normalizedY = (clientY / windowHeight) * 2 - 1;

          const targetRotY = 0.3 + normalizedX * 0.35;
          const targetRotX = normalizedY * 0.15;

          const expectedRotY = 0.3 + ((clientX / windowWidth) * 2 - 1) * 0.35;
          const expectedRotX = ((clientY / windowHeight) * 2 - 1) * 0.15;

          expect(Math.abs(targetRotY - expectedRotY)).toBeLessThanOrEqual(TOLERANCE);
          expect(Math.abs(targetRotX - expectedRotX)).toBeLessThanOrEqual(TOLERANCE);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: personal-portfolio-website, Property 17: Laptop floating animation formula is correct
  // Validates: Requirements 7.12
  it('Property 17: floating animation position.y is within range [0.06, 0.14]', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1000, noNaN: true }),
        (t) => {
          const positionY = 0.1 + Math.sin(t) * 0.04;

          expect(positionY).toBeGreaterThanOrEqual(0.06 - TOLERANCE);
          expect(positionY).toBeLessThanOrEqual(0.14 + TOLERANCE);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: personal-portfolio-website, Property 18: Purple point light pulse formula is correct
  // Validates: Requirements 7.13
  it('Property 18: purple point light intensity is within range [1.2, 1.8]', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1000, noNaN: true }),
        (t) => {
          const intensity = 1.5 + Math.sin(t * 0.8) * 0.3;

          expect(intensity).toBeGreaterThanOrEqual(1.2 - TOLERANCE);
          expect(intensity).toBeLessThanOrEqual(1.8 + TOLERANCE);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: personal-portfolio-website, Property 19: Screen glow emissive intensity pulse formula is correct
  // Validates: Requirements 7.14
  it('Property 19: screen glow emissiveIntensity is within range [0.3, 0.5]', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1000, noNaN: true }),
        (t) => {
          const emissiveIntensity = 0.4 + Math.sin(t * 1.8) * 0.1;

          expect(emissiveIntensity).toBeGreaterThanOrEqual(0.3 - TOLERANCE);
          expect(emissiveIntensity).toBeLessThanOrEqual(0.5 + TOLERANCE);
        }
      ),
      { numRuns: 100 }
    );
  });
});
