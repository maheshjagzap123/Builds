import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const services = [
  { icon: 'bi-layout-wtf', title: 'Website Design',
    desc: 'Modern, responsive websites designed around the business and its customers. Every layout decision is intentional.',
    features: ['Responsive layouts', 'Brand-aligned visuals', 'User-focused structure', 'SEO foundations'] },
  { icon: 'bi-code-slash', title: 'Full Website with Backend',
    desc: 'Complete websites with robust backend systems — custom APIs, databases, admin panels and business logic built end-to-end.',
    features: ['Custom backend APIs', 'Database design', 'Admin dashboard', 'Secure & scalable'], featured: true },
  { icon: 'bi-phone', title: 'Mobile App Development',
    desc: 'Cross-platform mobile apps for Android and iOS — from business tools to customer-facing apps with full backend integration.',
    features: ['Android & iOS', 'Backend integration', 'Clean UI/UX', 'Push notifications'], featured: true },
  { icon: 'bi-palette', title: 'UI/UX Design',
    desc: 'Clean interfaces and user experiences focused on clarity and usability. Design that serves the user, not just the brand.',
    features: ['Interface design', 'User flow design', 'Accessibility aware', 'Design systems'] },
  { icon: 'bi-bullseye', title: 'Landing Pages',
    desc: 'High-converting landing pages for businesses, campaigns and products. Built to communicate clearly and convert visitors.',
    features: ['Conversion-focused', 'Fast load time', 'Clear call to action', 'Mobile-first'] },
  { icon: 'bi-arrow-repeat', title: 'Website Redesign',
    desc: 'Improving outdated websites with modern design, better structure and responsive layouts that actually represent the business.',
    features: ['Modern design', 'Better structure', 'Responsive upgrade', 'Performance improvements'] }
]

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Services</div>
          <h2 className="section-heading">
            What I <span className="gradient-text">Build</span>
          </h2>
          <p className="section-sub">
            Digital solutions designed around the business and built for real-world use.
          </p>
        </Reveal>

        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              className={`service-card ${s.featured ? 'service-featured' : ''}`}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                show: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {s.featured && <div className="svc-featured-tag">Core Service</div>}
              <motion.div
                className="svc-icon"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <i className={`bi ${s.icon}`} aria-hidden="true"></i>
              </motion.div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="svc-features">
                {s.features.map((f) => (
                  <li key={f}><i className="bi bi-check2" aria-hidden="true"></i> {f}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <Reveal className="services-cta">
          <p>Need a website, mobile app or full platform with backend?</p>
          <motion.a
            href="#contact"
            className="btn btn-primary"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <i className="bi bi-chat-dots" aria-hidden="true"></i> Let's Talk
          </motion.a>
        </Reveal>
      </div>
    </section>
  )
}
