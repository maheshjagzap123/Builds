import { useEffect, useState } from 'react'
import Preloader from './components/Preloader.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Differentiator from './components/Differentiator.jsx'
import Services from './components/Services.jsx'
import BuildInPublic from './components/BuildInPublic.jsx'
import Process from './components/Process.jsx'
import About from './components/About.jsx'
import Focus from './components/Focus.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ScrollTop from './components/ScrollTop.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CursorSpotlight from './components/CursorSpotlight.jsx'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) document.documentElement.setAttribute('data-theme', saved)
    document.documentElement.style.scrollBehavior = 'smooth'
    const t = setTimeout(() => setLoaded(true), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Preloader hidden={loaded} />
      <ScrollProgress />
      <CursorSpotlight />
      <Header />
      <main>
        <Hero />
        <Differentiator />
        <Services />
        <BuildInPublic />
        <Process />
        <About />
        <Focus />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}
