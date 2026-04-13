// Feature: personal-portfolio-website, Property 3: Experience data objects are structurally complete
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import experience from '../experience.js';

describe('experience data', () => {
  it('exports exactly 4 experience entries', () => {
    expect(experience).toHaveLength(4);
  });

  it('Property 3: every experience object is structurally complete', () => {
    // Validates: Requirements 2.4
    fc.assert(
      fc.property(fc.constantFrom(...experience), (entry) => {
        expect(typeof entry.title).toBe('string');
        expect(entry.title.length).toBeGreaterThan(0);

        expect(typeof entry.organisation).toBe('string');
        expect(entry.organisation.length).toBeGreaterThan(0);

        expect(typeof entry.period).toBe('string');
        expect(entry.period.length).toBeGreaterThan(0);

        expect(typeof entry.detail).toBe('string');
        expect(entry.detail.length).toBeGreaterThan(0);

        expect(typeof entry.current).toBe('boolean');
      }),
      { numRuns: 100 }
    );
  });

  it('first entry is the most recent (WISE Innovera)', () => {
    expect(experience[0].title).toBe('Ketua Pelaksana');
    expect(experience[0].current).toBe(true);
  });

  it('current entries are correctly flagged', () => {
    const currentEntries = experience.filter((e) => e.current);
    const titles = currentEntries.map((e) => e.title);
    expect(titles).toContain('Ketua Pelaksana');
    expect(titles).toContain('Mahasiswa Aktif');
  });
});
