import Reveal from './Reveal.jsx'

const steps = [
  { icon: 'bi-chat-dots', title: 'Understand the Business', text: 'We talk about your business, your goals and what you want to build. Free initial conversation.' },
  { icon: 'bi-file-text', title: 'Define the Scope', text: 'Document all features, pages, integrations and technical requirements for your project.' },
  { icon: 'bi-diagram-3', title: 'Plan & Design', text: 'Project plan with timeline, milestones and design direction for your approval before building begins.' },
  { icon: 'bi-code-slash', title: 'Build', text: "Development with regular updates and progress previews so you're always informed." },
  { icon: 'bi-check2-square', title: 'Test & Refine', text: 'Thorough testing across devices and browsers. You review and approve before anything goes live.' },
  { icon: 'bi-rocket-takeoff', title: 'Launch & Support', text: 'Goes live with proper hosting, SSL and performance optimization. Ongoing support available after launch.' }
]

export default function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">How It Works</div>
          <h2 className="section-heading">
            The Build <span className="gradient-text">Process</span>
          </h2>
          <p className="section-sub">
            A clear, transparent process — from first conversation to final delivery and ongoing support.
          </p>
        </Reveal>

        <div className="process-steps">
          {steps.map((s, i) => (
            <div key={s.title}>
              <Reveal className="process-step" delay={i * 0.06}>
                <div className="ps-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="ps-body">
                  <div className="ps-icon"><i className={`bi ${s.icon}`} aria-hidden="true"></i></div>
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                  </div>
                </div>
              </Reveal>
              {i < steps.length - 1 && <div className="ps-connector" aria-hidden="true"></div>}
            </div>
          ))}
        </div>

        <Reveal className="process-cta">
          <p>Ready to start?</p>
          <a href="#contact" className="btn btn-primary">
            <i className="bi bi-lightning-charge" aria-hidden="true"></i> Start the Process
          </a>
        </Reveal>
      </div>
    </section>
  )
}
