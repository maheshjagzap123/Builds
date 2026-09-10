import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * A soft radial gradient spotlight that follows the cursor.
 * Only active on pointer:fine devices and respects prefers-reduced-motion.
 */
export default function CursorSpotlight() {
  const prefersReduced = useReducedMotion()
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 })

  useEffect(() => {
    if (prefersReduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [prefersReduced, x, y])

  if (prefersReduced) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 520,
        height: 520,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1,
        translateX: sx,
        translateY: sy,
        x: '-50%',
        y: '-50%',
        background:
          'radial-gradient(closest-side, rgba(79,142,247,0.18), rgba(79,142,247,0.06) 45%, transparent 70%)',
        mixBlendMode: 'screen',
        filter: 'blur(6px)'
      }}
    />
  )
}
