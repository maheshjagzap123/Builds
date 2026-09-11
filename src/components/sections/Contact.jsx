import { useState } from 'react';
import { Check } from 'lucide-react';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import MagneticButton from '../animation/MagneticButton.jsx';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    // Client-side stub. Wire this to a real endpoint / EmailJS.
    setTimeout(() => {
      setStatus('success');
      e.target.reset();
    }, 900);
  };

  return (
    <section className="contact container" id="contact">
      <div className="section-head">
        <div>
          <span className="eyebrow">13 — Contact</span>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            <RevealText>Send a</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>project enquiry.</RevealText></em>
          </h2>
        </div>
        <FadeUp className="meta">
          Share a brief, an idea or a rough problem. Free initial conversation — no sales pitch.
        </FadeUp>
      </div>

      <div className="contact-grid">
        <div>
          <p className="body-lg">
            Websites, mobile apps, business software, dashboards, automation or long-term
            maintenance — send the details and we'll reply within 24 hours.
          </p>
          <div className="contact-meta">
            <div>
              <div className="contact-meta-label">Email</div>
              <a href="mailto:hello@maheshbuilds.com" className="contact-meta-value" data-cursor="hover">
                hello@maheshbuilds.com
              </a>
            </div>
            <div>
              <div className="contact-meta-label">Response Time</div>
              <div className="contact-meta-value">Within 24 hours, Mon – Fri</div>
            </div>
          </div>
        </div>

        {status === 'success' ? (
          <div className="contact-success" role="status" aria-live="polite">
            <div className="cs-check"><Check size={40} strokeWidth={1.4} /></div>
            <h3>Project enquiry received</h3>
            <p>We'll review your requirements and get back to you within 24 hours.</p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setStatus('idle')}
              data-cursor="hover"
            >
              Send another <span className="arrow">↗</span>
            </button>
          </div>
        ) : (
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
                <label htmlFor="phone">Phone (optional)</label>
                <input id="phone" name="phone" placeholder="+91 00000 00000" />
              </div>
            </div>
            <div className="row">
              <div className="form-field">
                <label htmlFor="project_type">What do you need?</label>
                <select id="project_type" name="project_type" defaultValue="">
                  <option value="">Select one</option>
                  <option>Website</option>
                  <option>Web Application</option>
                  <option>Mobile App</option>
                  <option>Business Software</option>
                  <option>Automation</option>
                  <option>Maintenance</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="budget">Budget Range (optional)</label>
                <select id="budget" name="budget" defaultValue="">
                  <option value="">Select one</option>
                  <option>Under ₹50k</option>
                  <option>₹50k – ₹1.5L</option>
                  <option>₹1.5L – ₹5L</option>
                  <option>₹5L+</option>
                  <option>Not sure yet</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="message">Project description</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                placeholder="Describe the business, the problem and what you'd like to build..."
              />
            </div>

            <div className="form-status">
              {status === 'loading' && 'Sending enquiry...'}
            </div>

            <MagneticButton type="submit" className="btn" data-cursor-label="Send">
              Send Project Enquiry <span className="arrow">↗</span>
            </MagneticButton>
          </form>
        )}
      </div>
    </section>
  );
}
