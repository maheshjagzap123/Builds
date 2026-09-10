import { useEffect, useState } from 'react';
import Preloader from './components/layout/Preloader.jsx';
import Navbar from './components/layout/Navbar.jsx';
import CursorSpotlight from './components/layout/CursorSpotlight.jsx';
import ScrollProgress from './components/layout/ScrollProgress.jsx';
import Footer from './components/layout/Footer.jsx';

import Hero from './components/sections/Hero.jsx';
import AgencyIntro from './components/sections/AgencyIntro.jsx';
import Capabilities from './components/sections/Capabilities.jsx';
import Solutions from './components/sections/Solutions.jsx';
import WorkTeaser from './components/sections/WorkTeaser.jsx';
import Process from './components/sections/Process.jsx';
import Technology from './components/sections/Technology.jsx';
import Differentiator from './components/sections/Differentiator.jsx';
import CTA from './components/sections/CTA.jsx';
import Contact from './components/sections/Contact.jsx';

import WorkPage from './pages/WorkPage.jsx';

import { useLenis } from './lib/useLenis.js';
import { useHashRoute } from './lib/useHashRoute.js';

function HomePage() {
  return (
    <>
      <Hero />
      <AgencyIntro />
      <Capabilities />
      <Solutions />
      <WorkTeaser />
      <Process />
      <Technology />
      <Differentiator />
      <CTA />
      <Contact />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const route = useHashRoute();
  useLenis();

  useEffect(() => {
    // Route changed. Either scroll to top (page route) or to anchor section.
    const raw = window.location.hash.replace(/^#/, '');
    if (raw.startsWith('/') || raw === '') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      // Wait a tick so home page has mounted, then scroll to anchor.
      setTimeout(() => {
        const el = document.getElementById(raw);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }, [route]);

  const isWork = route === '/work';

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <CursorSpotlight />
      <Navbar />

      <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        {isWork ? <WorkPage /> : <HomePage />}
      </main>

      <Footer />
    </>
  );
}
