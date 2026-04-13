import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import projects from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'
import useInView from '../hooks/useInView.js'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const sectionRef = useRef(null)
  const isInView   = useInView(sectionRef, { threshold: 0.05 })

  const featured   = projects.find((p) => p.featured)
  const remaining  = projects.filter((p) => !p.featured)

  return (
    <section id="projects" ref={sectionRef} className="section-container">
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <p className="section-label">What I've built</p>
        <h2 className="section-heading">Projects</h2>
        <div className="section-divider" />
      </div>

      <motion.div variants={stagger} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
        {/* Featured card — full width */}
        {featured && (
          <motion.div variants={fadeUp} style={{ marginBottom: '24px' }}>
            <ProjectCard
              project={featured}
              featured
              onClick={() => setSelected(featured)}
            />
          </motion.div>
        )}

        {/* Remaining — responsive grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {remaining.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <ProjectCard
                project={project}
                onClick={() => setSelected(project)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
