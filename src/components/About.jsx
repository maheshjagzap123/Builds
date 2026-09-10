import Reveal from './Reveal.jsx'
import Counter from './Counter.jsx'
import Marquee from './Marquee.jsx'
import { motion } from 'framer-motion'

const TECH = ['React.js', 'ASP.NET', 'C#', 'SQL Server', 'Azure', 'Node.js', 'TypeScript', 'React Native']

export default function About() {
  return (
    <section id="about" className="section about-section alt-bg">
      <div className="container">
        <div className="about-layout">
          <Reveal className="about-img-col" x={-30} y={0}>
            <div className="about-stats-block">
              <motion.div
                className="about-stat-item"
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Counter value="4+" className="stat-num gradient-text" />
                <span className="stat-lbl">Years Building</span>
              </motion.div>
              <motion.div
                className="about-stat-item"
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Counter value="10+" className="stat-num gradient-text" />
                <span className="stat-lbl">Projects Delivered</span>
              </motion.div>
              <motion.div
                className="about-stat-item"
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Counter value="3" className="stat-num gradient-text" />
                <span className="stat-lbl">Core Services</span>
              </motion.div>

              <div className="about-tech-row" style={{ padding: 0 }}>
                <Marquee speed={28}>
                  {TECH.map((t) => (
                    <span key={t} className="tech-chip">{t}</span>
                  ))}
                </Marquee>
              </div>
            </div>
          </Reveal>

          <Reveal className="about-content-col" x={30} y={0} delay={0.1}>
            <div className="section-label">About MAHESH BUILDS</div>
            <h2 className="section-heading">
              Full-Stack Digital Building<br />
              <span className="gradient-text">For Businesses</span>
            </h2>

            <p className="about-lead">
              Complete digital solutions — modern websites, cross-platform mobile apps and robust
              backend systems, built end-to-end.
            </p>
            <p className="about-body">
              From a simple landing page to a full platform with custom APIs, admin dashboards and
              mobile apps — every build starts with understanding the business first and ends with
              something that actually works.
            </p>
            <p className="about-body">
              The stack: React.js on the frontend, ASP.NET Web API with C# on the backend, SQL Server
              for data, and Azure for cloud deployment.
            </p>

            <div className="about-pillars">
              {[
                ['bi-eye', 'Clean Design'],
                ['bi-phone', 'Responsive Experience'],
                ['bi-building', 'Business-Focused'],
                ['bi-lightning-charge', 'Fast Performance'],
                ['bi-people', 'Clear User Experience'],
                ['bi-code-slash', 'Modern Technology']
              ].map(([icon, label], i) => (
                <motion.div
                  className="pillar-item"
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -3, scale: 1.04 }}
                >
                  <i className={`bi ${icon}`} aria-hidden="true"></i>
                  <span>{label}</span>
                </motion.div>
              ))}
            </div>

            <div className="about-actions">
              <motion.a
                href="#services"
                className="btn btn-primary"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="bi bi-grid" aria-hidden="true"></i> See Services
              </motion.a>
              <motion.a
                href="#contact"
                className="btn btn-ghost"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a Project <i className="bi bi-arrow-right" aria-hidden="true"></i>
              </motion.a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
