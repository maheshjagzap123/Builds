import { useState } from 'react'
import Reveal from './Reveal.jsx'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    // TODO: wire to your backend or EmailJS
    setTimeout(() => setStatus('success'), 900)
  }

  return (
    <section id="contact" className="section contact-section alt-bg">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-heading">
            Have a Business That Needs<br />
            <span className="gradient-text">a Better Website?</span>
          </h2>
          <p className="section-sub">
            Tell me what you're building and let's explore what could be improved.
          </p>
        </Reveal>

        <div className="contact-layout">
          <Reveal className="contact-info-col" x={-30} y={0}>
            <div className="contact-card">
              <h3>Let's Talk About Your Project</h3>
              <p>Whether you have a clear brief or just an idea — reach out. Free initial consultation.</p>

              {/* TODO: replace with your contact details */}
              <div className="contact-items">
                <div className="contact-item">
                  <div className="ci-icon"><i className="bi bi-envelope" aria-hidden="true"></i></div>
                  <div className="ci-info">
                    <span className="ci-label">Email</span>
                    <a href="mailto:maheshbuilds@gmail.com" className="ci-value">maheshbuilds@gmail.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="ci-icon"><i className="bi bi-phone" aria-hidden="true"></i></div>
                  <div className="ci-info">
                    <span className="ci-label">Phone / WhatsApp</span>
                    <span className="ci-value">+00 00000 00000</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="contact-form-col" x={30} y={0} delay={0.1}>
            <form className="contact-form" noValidate onSubmit={onSubmit} aria-label="Project inquiry form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name <span aria-hidden="true">*</span></label>
                  <input type="text" id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="business_name">Business / Brand</label>
                  <input type="text" id="business_name" name="business_name" placeholder="Business name (optional)" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address <span aria-hidden="true">*</span></label>
                <input type="email" id="email" name="email" placeholder="you@email.com" required />
              </div>

              <div className="form-group">
                <label htmlFor="project_type">What Do You Need?</label>
                <select id="project_type" name="project_type" defaultValue="">
                  <option value="">Select a service</option>
                  <option value="full-website-backend">Full Website with Backend</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="website-design">Website Design</option>
                  <option value="website-development">Website Development</option>
                  <option value="landing-page">Landing Page</option>
                  <option value="redesign">Website Redesign</option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="other">Other / Not Sure Yet</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Tell Me About Your Project <span aria-hidden="true">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Describe your business and what you want to build..."
                  required
                />
              </div>

              <div className="form-status" aria-live="polite">
                {status === 'loading' && (
                  <div className="fs-loading"><i className="bi bi-hourglass-split" aria-hidden="true"></i> Sending your message...</div>
                )}
                {status === 'success' && (
                  <div className="fs-success"><i className="bi bi-check-circle-fill" aria-hidden="true"></i> Message sent! I'll reply within 24 hours.</div>
                )}
                {status === 'error' && (
                  <div className="fs-error"><i className="bi bi-exclamation-triangle-fill" aria-hidden="true"></i> Something went wrong. Please try again.</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={status === 'loading'}>
                <i className="bi bi-send" aria-hidden="true"></i> Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
