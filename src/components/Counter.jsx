import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/**
 * Animated number counter that runs once when it scrolls into view.
 * value: e.g. "4+", "10+", "3" — numeric part gets animated, suffix preserved.
 */
export default function Counter({ value, duration = 1400, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const prefersReduced = useReducedMotion()

  const match = String(value).match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''

  const [display, setDisplay] = useState(prefersReduced ? target : 0)

  useEffect(() => {
    if (!inView || prefersReduced) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, prefersReduced])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {display}
      {suffix}
    </motion.span>
  )
}
