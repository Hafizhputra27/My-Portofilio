// Feature: personal-portfolio-website, Property 2: Skill levels are valid integers in range
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import skills from '../skills.js';

describe('skills data', () => {
  it('exports exactly 8 skills', () => {
    expect(skills).toHaveLength(8);
  });

  it('Property 2: every skill level is a valid integer in range 0–100', () => {
    // Validates: Requirements 2.3
    fc.assert(
      fc.property(fc.constantFrom(...skills), (skill) => {
        expect(typeof skill.name).toBe('string');
        expect(skill.name.length).toBeGreaterThan(0);

        expect(typeof skill.level).toBe('number');
        expect(Number.isInteger(skill.level)).toBe(true);
        expect(skill.level).toBeGreaterThanOrEqual(0);
        expect(skill.level).toBeLessThanOrEqual(100);

        expect(typeof skill.icon).toBe('string');
        expect(skill.icon.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it('contains all expected skills with correct levels', () => {
    const map = Object.fromEntries(skills.map((s) => [s.name, s.level]));
    expect(map['React.js']).toBe(85);
    expect(map['Node.js']).toBe(80);
    expect(map['Project Mgmt']).toBe(90);
    expect(map['AI/ML']).toBe(75);
    expect(map['UI/UX Design']).toBe(82);
    expect(map['Git/Vite']).toBe(78);
    expect(map['Agile/Scrum']).toBe(88);
    expect(map['REST API']).toBe(72);
  });
});
