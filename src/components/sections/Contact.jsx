import { useState } from 'react';
import { Check } from 'lucide-react';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import MagneticButton from '../animation/MagneticButton.jsx';
import WhatsAppButton from '../layout/WhatsAppButton.jsx';

const CONTACT_EMAIL = 'maheshjagzap03@gmail.com';
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '';

export default function Contact() {
  const [status, setStatus] = useState('idle');

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) {
      form.reset();
      setStatus('success');
      return;
    }
    delete data.website;

    if (ENDPOINT) {
      setStatus('loading');
      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        form.reset();
        setStatus('success');
      } catch (_) {
        setStatus('error');
      }
      return;
    }

    const subject = `Project enquiry — ${data.name}`;
    const body = [
      `Name: ${data.name}`,
      `Company: ${data.company || 'Not provided'}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || 'Not provided'}`,
      `Project type: ${data.project_type || 'Not selected'}`,
      `Budget: ${data.budget || 'Not selected'}`,
      '',
      data.message,
    ].join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('mailto');
  };

  return (
    <section className="contact container" id="contact" aria-labelledby="contact-heading">
      <div className="section-head">
        <div>
          <span className="eyebrow">13 — Contact</span>
          <h2 className="h-section" id="contact-heading"><RevealText>Send a</RevealText>{' '}<em className="serif"><RevealText delay={0.1}>project enquiry.</RevealText></em></h2>
        </div>
        <FadeUp className="meta">Share a brief, an idea or a rough problem. Free initial conversation — no sales pitch.</FadeUp>
      </div>

      <div className="contact-grid">
        <div>
          <p className="body-lg">Websites, mobile apps, business software, dashboards, automation or long-term maintenance — share the details and we'll take a look.</p>
          <div className="contact-meta">
            <div><div className="contact-meta-label">Email</div><a href={`mailto:${CONTACT_EMAIL}`} className="contact-meta-value" data-cursor="hover">{CONTACT_EMAIL}</a></div>
            <div><div className="contact-meta-label">Phone</div><a href="tel:+917588174528" className="contact-meta-value" data-cursor="hover">+91 7588174528</a></div>
          </div>
          <div className="contact-direct">
            <WhatsAppButton label="Discuss on WhatsApp" />
            <p>Prefer a quick conversation? WhatsApp opens with a pre-filled introduction. You decide what to send.</p>
          </div>
        </div>

        {status === 'success' || status === 'mailto' ? (
          <div className="contact-success" role="status" aria-live="polite">
            <div className="cs-check"><Check size={40} strokeWidth={1.4} /></div>
            {status === 'success' ? <><h3>Project enquiry sent</h3><p>Thanks — your enquiry has been submitted. Use email or WhatsApp if you need to add anything.</p></> : <><h3>Finish in your email app</h3><p>A pre-filled email was opened for <strong>{CONTACT_EMAIL}</strong>. Press send there to complete the enquiry. If no email app opened, use the email link or WhatsApp instead.</p><WhatsAppButton label="Use WhatsApp instead" /></>}
            <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>Send another <span className="arrow">↗</span></button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={onSubmit} aria-busy={status === 'loading'}>
            <div className="form-honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex="-1" autoComplete="off" /></div>
            <div className="row">
              <div className="form-field"><label htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name" placeholder="Your name" /></div>
              <div className="form-field"><label htmlFor="company">Company</label><input id="company" name="company" autoComplete="organization" placeholder="Business or brand" /></div>
            </div>
            <div className="row">
              <div className="form-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></div>
              <div className="form-field"><label htmlFor="phone">Phone (optional)</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 00000 00000" /></div>
            </div>
            <div className="row">
              <div className="form-field"><label htmlFor="project_type">What do you need?</label><select id="project_type" name="project_type" defaultValue="" required><option value="" disabled>Select one</option><option>Website</option><option>Web Application</option><option>Mobile Application</option><option>Business Software</option><option>CRM</option><option>Automation</option><option>Maintenance</option><option>Other</option></select></div>
              <div className="form-field"><label htmlFor="budget">Budget range (optional)</label><select id="budget" name="budget" defaultValue=""><option value="">Select one</option><option>Under ₹50k</option><option>₹50k – ₹1.5L</option><option>₹1.5L – ₹5L</option><option>₹5L+</option><option>Not sure yet</option></select></div>
            </div>
            <div className="form-field"><label htmlFor="message">Project description</label><textarea id="message" name="message" rows="5" required minLength="20" placeholder="Describe the business, the problem and what you'd like to build..." /></div>

            <div className="form-status" role="status" aria-live="polite">
              {status === 'loading' && 'Sending enquiry…'}
              {status === 'error' && <span className="form-error">The form could not send. Please use <a href={`mailto:${CONTACT_EMAIL}`}>email</a> or WhatsApp.</span>}
              {!ENDPOINT && status === 'idle' && <span>Submitting continues in your email app. No information is stored by this website.</span>}
            </div>

            <MagneticButton type="submit" className="btn" disabled={status === 'loading'} data-cursor-label="Send">{ENDPOINT ? 'Submit Project Enquiry' : 'Continue in Email'} <span className="arrow">↗</span></MagneticButton>
          </form>
        )}
      </div>
    </section>
  );
}
