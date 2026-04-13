import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import projects from '../data/projects.js';
import ProjectCard from './ProjectCard.jsx';
import ProjectModal from './ProjectModal.jsx';
import useInView from '../hooks/useInView.js';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const featuredProject = projects.find((p) => p.featured);
  const remainingProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: '80px 24px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      {/* Section heading */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'var(--text-dark)',
            margin: '0 0 12px',
          }}
        >
          Projects
        </h2>
        {/* Purple accent underline */}
        <div
          style={{
            width: 56,
            height: 4,
            borderRadius: 9999,
            background: 'var(--accent)',
            margin: '0 auto',
          }}
        />
      </div>

      {/* Featured card — full width */}
      {featuredProject && (
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ marginBottom: 28 }}
        >
          <ProjectCard
            project={featuredProject}
            featured
            onClick={() => setSelectedProject(featuredProject)}
          />
        </motion.div>
      )}

      {/* Remaining cards — responsive 2-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}
      >
        {remainingProjects.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <ProjectCard
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject !== null && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
