import { motion, useReducedMotion } from 'framer-motion'

/**
 * Reusable in-view reveal wrapper. Wraps any element with a scroll-triggered
 * animation. Uses framer-motion; respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  as = 'div',
  y = 28,
  x = 0,
  scale,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  className,
  style,
  ...rest
}) {
  const prefersReduced = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  const initial = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, y, x, scale: scale ?? 1 }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Split a string into per-word animated spans that reveal in sequence.
 */
export function RevealText({ text, className, delay = 0, stagger = 0.05 }) {
  const prefersReduced = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: '0.4em' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.55,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  )
}
