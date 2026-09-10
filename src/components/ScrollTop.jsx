import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#hero"
      className={`scroll-top ${show ? 'visible' : ''}`}
      aria-label="Scroll to top"
    >
      <i className="bi bi-arrow-up" aria-hidden="true"></i>
    </a>
  )
}
