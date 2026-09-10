import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.001
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        transformOrigin: '0 0',
        scaleX,
        background:
          'linear-gradient(90deg, #4f8ef7 0%, #a855f7 50%, #ec4899 100%)',
        zIndex: 3000
      }}
    />
  )
}
