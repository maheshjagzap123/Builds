import Reveal from './Reveal.jsx'

const steps = [
  { title: 'Find a Business', text: 'Spot a business with an online presence that could be better' },
  { title: 'Identify the Problem', text: "Understand what's missing or what could be significantly improved" },
  { title: 'Design the Solution', text: 'Plan what the improved digital experience should look and work like' },
  { title: 'Build the Demo', text: "Create a real, working version of what's possible" },
  { title: 'Pitch the Idea', text: 'Approach the business and show them what was built' },
  { title: 'See What Happens', text: 'Document the outcome — win, learn, and build the next one' }
]

export default function BuildInPublic() {
  return (
    <section id="instagram" className="section bip-section alt-bg">
      <div className="container">
        <Reveal className="bip-layout">
          <div className="bip-text">
            <div className="section-label">Building In Public</div>
            <h2 className="section-heading">
              Watch the <span className="gradient-text">Builds</span>
            </h2>
            <p className="bip-body">
              Follow the process behind the builds — from discovering businesses and identifying
              opportunities to creating demos and pitching the idea.
            </p>
            <p className="bip-body">
              Every build is documented. Every pitch is real. Every outcome — whether yes or no — is
              part of the journey.
            </p>
            {/* TODO: Add your social link */}
            <a href="#contact" className="btn btn-instagram">
              <i className="bi bi-instagram" aria-hidden="true"></i>
              Follow the Journey
            </a>
          </div>

          <div className="bip-timeline">
            {steps.map((s, i) => (
              <Reveal
                key={s.title}
                className={`bip-step ${i === steps.length - 1 ? 'bip-step-last' : ''}`}
                x={30}
                y={0}
                delay={i * 0.06}
              >
                <div className="bip-step-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="bip-step-text">
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
