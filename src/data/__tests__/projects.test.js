// Feature: personal-portfolio-website, Property 1: Project data objects are structurally complete
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import projects from '../projects.js';

describe('projects data', () => {
  it('exports exactly 4 projects', () => {
    expect(projects).toHaveLength(4);
  });

  it('wise-innovera is featured, others are not', () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0].id).toBe('wise-innovera');
  });

  it('Property 1: every project object is structurally complete', () => {
    // Validates: Requirements 2.2
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        expect(typeof project.id).toBe('string');
        expect(project.id.length).toBeGreaterThan(0);

        expect(typeof project.title).toBe('string');
        expect(project.title.length).toBeGreaterThan(0);

        expect(typeof project.category).toBe('string');
        expect(project.category.length).toBeGreaterThan(0);

        expect(typeof project.tag).toBe('string');
        expect(project.tag.length).toBeGreaterThan(0);

        expect(['amber', 'blue', 'green', 'purple']).toContain(project.tagColor);

        expect(typeof project.description).toBe('string');
        expect(project.description.length).toBeGreaterThan(0);

        expect(Array.isArray(project.techStack)).toBe(true);
        expect(project.techStack.length).toBeGreaterThan(0);

        expect(typeof project.caseStudy).toBe('string');
        expect(project.caseStudy.length).toBeGreaterThan(0);

        expect(typeof project.featured).toBe('boolean');
      }),
      { numRuns: 100 }
    );
  });

  it('all 4 expected project ids are present', () => {
    const ids = projects.map((p) => p.id);
    expect(ids).toContain('lector-id');
    expect(ids).toContain('club-management');
    expect(ids).toContain('buzzer-basketball');
    expect(ids).toContain('wise-innovera');
  });
});
