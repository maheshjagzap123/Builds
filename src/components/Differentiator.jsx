import Reveal from './Reveal.jsx'

const steps = [
  { icon: 'bi-search', title: 'FIND', text: 'Discover a business with an opportunity online' },
  { icon: 'bi-eye', title: 'ANALYZE', text: 'Identify what could be improved or built' },
  { icon: 'bi-code-slash', title: 'BUILD', text: 'Create a real demo of the digital experience' },
  { icon: 'bi-megaphone', title: 'PITCH', text: "Show the business owner what's possible" }
]

export default function Differentiator() {
  return (
    <section id="differentiator" className="section diff-section alt-bg">
      <div className="container">
        <Reveal className="diff-layout">
          <div className="diff-text-col">
            <div className="section-label">The Approach</div>
            <h2 className="section-heading">
              I Don't Just Show What I Can Build.<br />
              <span className="gradient-text">I Build It.</span>
            </h2>
            <p className="diff-body">
              I explore real businesses, identify opportunities to improve their online presence, and
              build concepts that demonstrate what their digital experience could look like.
            </p>
            <p className="diff-body">
              This isn't a portfolio of theoretical ideas — every project starts with a real business
              problem and ends with something you can see, interact with and evaluate.
            </p>
            <a href="#contact" className="btn btn-primary" style={{ marginTop: 8 }}>
              <i className="bi bi-lightning-charge" aria-hidden="true"></i> Start a Build
            </a>
          </div>

          <div className="diff-process-col">
            <div className="process-flow" aria-label="Build process">
              {steps.map((s, i) => (
                <div key={s.title}>
                  <Reveal className="pf-step" x={30} y={0} delay={i * 0.08}>
                    <div className="pf-num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="pf-content">
                      <i className={`bi ${s.icon}`} aria-hidden="true"></i>
                      <div>
                        <strong>{s.title}</strong>
                        <p>{s.text}</p>
                      </div>
                    </div>
                  </Reveal>
                  {i < steps.length - 1 && <div className="pf-connector" aria-hidden="true"></div>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
