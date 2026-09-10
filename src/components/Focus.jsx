import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const cards = [
  ['bi-palette2', 'Clean Design', 'Every visual decision has a purpose. No unnecessary decoration, no visual noise — just clarity and intentional hierarchy.'],
  ['bi-phone', 'Responsive Experience', 'Layouts that feel intentionally designed on every screen size — not just a compressed version of the desktop site.'],
  ['bi-building', 'Business-Focused Thinking', 'The design and build serves the business goal first. Every decision is evaluated against: does this help the business?'],
  ['bi-speedometer2', 'Fast Performance', 'Optimized for real-world conditions — fast on mobile, lean assets, no bloated dependencies. Speed is a feature.'],
  ['bi-people', 'Clear User Experience', 'Users should never be confused. Navigation, actions and information structure should be obvious from the first glance.'],
  ['bi-braces-asterisk', 'Modern Technology', 'Built with current, maintainable technologies. No outdated dependencies, no legacy code unnecessarily carried forward.']
]

export default function Focus() {
  return (
    <section id="focus" className="section focus-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Quality Standards</div>
          <h2 className="section-heading">
            What I Focus <span className="gradient-text">On</span>
          </h2>
          <p className="section-sub">
            These aren't marketing claims — they're the principles every build is measured against.
          </p>
        </Reveal>

        <motion.div
          className="focus-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          {cards.map(([icon, title, text]) => (
            <motion.div
              key={title}
              className="focus-card"
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.97 },
                show: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <motion.div
                className="focus-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
              >
                <i className={`bi ${icon}`} aria-hidden="true"></i>
              </motion.div>
              <h4>{title}</h4>
              <p>{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
