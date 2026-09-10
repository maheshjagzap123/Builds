import { motion } from 'framer-motion'

/**
 * Infinite horizontal marquee. Duplicates children so the loop is seamless.
 */
export default function Marquee({ children, speed = 30, direction = 'left', className }) {
  const dir = direction === 'right' ? '0%' : '-50%'
  const from = direction === 'right' ? '-50%' : '0%'
  return (
    <div className={`marquee ${className || ''}`}>
      <motion.div
        className="marquee-track"
        animate={{ x: [from, dir] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        <div className="marquee-content">{children}</div>
        <div className="marquee-content" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  )
}
