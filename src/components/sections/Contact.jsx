import { useState } from 'react';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import MagneticButton from '../animation/MagneticButton.jsx';

export default function Contact() {
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: 'Sending...' });
    // Placeholder — integrate with EmailJS / API endpoint.
    setTimeout(() => {
      setStatus({ state: 'success', msg: "Enquiry received. We'll reply within 24 hours." });
      e.target.reset();
    }, 900);
  };

  return (
    <section className="contact container" id="contact">
      <div className="section-head">
        <h2 className="h-section">
          <RevealText>Let's build</RevealText>{' '}
          <em className="serif"><RevealText delay={0.1}>something.</RevealText></em>
        </h2>
        <FadeUp className="meta">
          Share a brief, an idea or a rough problem. Free initial conversation — no sales pitch.
        </FadeUp>
      </div>

      <div className="contact-grid">
        <div>
          <p className="body-lg">
            Websites, business software, dashboards or full digital systems — send the details and
            we&apos;ll come back with an honest read on scope, timeline and approach.
          </p>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: 6 }}>Email</div>
              <a href="mailto:hello@maheshbuilds.com" className="body-lg" data-cursor="hover" style={{ color: 'var(--fg)' }}>
                hello@maheshbuilds.com
              </a>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: 6 }}>Response Time</div>
              <div className="body-lg" style={{ color: 'var(--fg)' }}>Within 24 hours, Mon – Fri</div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="row">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required placeholder="Your name" />
            </div>
            <div className="form-field">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" placeholder="Business or brand" />
            </div>
          </div>
          <div className="row">
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@company.com" />
            </div>
            <div className="form-field">
              <label htmlFor="project_type">Project Type</label>
              <select id="project_type" name="project_type" defaultValue="">
                <option value="">Select one</option>
                <option>Website</option>
                <option>Business Software</option>
                <option>CRM / Management System</option>
                <option>Dashboard / Analytics</option>
                <option>Automation</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="budget">Budget Range</label>
            <select id="budget" name="budget" defaultValue="">
              <option value="">Select one</option>
              <option>Under ₹50k</option>
              <option>₹50k – ₹1.5L</option>
              <option>₹1.5L – ₹5L</option>
              <option>₹5L+</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="message">Project Details</label>
            <textarea id="message" name="message" rows="4" required placeholder="Describe the business, the problem and what you'd like to build..." />
          </div>

          <div className={`form-status ${status.state}`} aria-live="polite">{status.msg}</div>

          <MagneticButton type="submit" className="btn" data-cursor-label="Send">
            Send Enquiry <span className="arrow">↗</span>
          </MagneticButton>
        </form>
      </div>
    </section>
  );
}
