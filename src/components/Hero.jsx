import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { RevealText } from './Reveal.jsx'

const ROTATING = ['Websites', 'Mobile Apps', 'Backend Systems', 'Platforms']

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const prefersReduced = useReducedMotion()
  const { scrollY } = useScroll()
  const blobY1 = useTransform(scrollY, [0, 800], [0, 140])
  const blobY2 = useTransform(scrollY, [0, 800], [0, -120])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.4])

  useEffect(() => {
    if (prefersReduced) return
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2200)
    return () => clearInterval(t)
  }, [prefersReduced])

  return (
    <section id="hero" className="hero-section">
      <motion.div className="hero-grid-bg" aria-hidden="true" style={{ opacity: heroOpacity }} />
      <motion.div
        className="hero-blob hero-blob-1"
        aria-hidden="true"
        style={{ y: blobY1 }}
        animate={prefersReduced ? {} : { scale: [1, 1.15, 1], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-blob hero-blob-2"
        aria-hidden="true"
        style={{ y: blobY2 }}
        animate={prefersReduced ? {} : { scale: [1, 1.2, 1], x: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container">
        <div className="hero-layout">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <motion.span
                className="eyebrow-dot"
                aria-hidden="true"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              Available for new projects
            </motion.div>

            <h1 className="hero-headline">
              <RevealText text="I Build" delay={0.15} />{' '}
              <span style={{ display: 'inline-block', position: 'relative', minWidth: '6ch' }}>
                <motion.span
                  key={ROTATING[idx]}
                  className="gradient-text"
                  initial={{ opacity: 0, y: '0.4em' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '-0.4em' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ display: 'inline-block' }}
                >
                  {ROTATING[idx]}
                </motion.span>
              </span>
              <br />
              <RevealText text="& Full Backend Systems." delay={0.4} />
            </h1>

            <motion.p
              className="hero-subtext"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.55 }}
            >
              Full-stack digital solutions — modern websites, cross-platform mobile apps and robust
              backend APIs, all built end-to-end for real businesses.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
            >
              <motion.a
                href="#services"
                className="btn btn-primary"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="bi bi-grid-3x3-gap" aria-hidden="true"></i>
                Explore Services
              </motion.a>
              <motion.a
                href="#contact"
                className="btn btn-ghost"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Build Something
                <motion.i
                  className="bi bi-arrow-right"
                  aria-hidden="true"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.a>
            </motion.div>

            <motion.div
              className="hero-trust"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 1 } }
              }}
            >
              {['Full-Stack Development', 'Mobile Apps', 'Backend APIs'].map((t) => (
                <motion.span
                  key={t}
                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                >
                  <i className="bi bi-check2-circle" aria-hidden="true"></i> {t}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 40, rotate: -1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <motion.div
              className="browser-mockup"
              aria-hidden="true"
              animate={prefersReduced ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="browser-bar">
                <span className="browser-dot dot-red"></span>
                <span className="browser-dot dot-yellow"></span>
                <span className="browser-dot dot-green"></span>
                <span className="browser-address"><i className="bi bi-lock-fill"></i> maheshbuilds.com</span>
              </div>
              <div className="browser-screen">
                <motion.div
                  className="mock-hero-bar"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                />
                <div className="mock-nav">
                  <span className="mock-logo"></span>
                  <div className="mock-nav-links">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="mock-headline">
                  <span className="mh-line mh-line-1"></span>
                  <span className="mh-line mh-line-2"></span>
                </div>
                <motion.div
                  className="mock-cards-row"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } }
                  }}
                >
                  {['bi-globe2', 'bi-brush', 'bi-lightning-charge'].map((icon, i) => (
                    <motion.div
                      key={icon}
                      className={`mock-card mc-${i + 1}`}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        show: { opacity: 1, y: 0 }
                      }}
                    >
                      <span className="mc-icon"><i className={`bi ${icon}`}></i></span>
                      <span className="mc-bar mc-b1"></span>
                      <span className="mc-bar mc-b2"></span>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="mock-btn-row">
                  <span className="mock-cta-btn"></span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="float-card float-card-tl"
              aria-hidden="true"
              animate={prefersReduced ? {} : { y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <i className="bi bi-check2-all"></i>
              <span>Design Complete</span>
            </motion.div>
            <motion.div
              className="float-card float-card-br"
              aria-hidden="true"
              animate={prefersReduced ? {} : { y: [0, 10, 0], rotate: [2, -2, 2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            >
              <i className="bi bi-lightning-charge-fill"></i>
              <span>100 Performance</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
