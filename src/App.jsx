import { useEffect, useState } from 'react';
import Preloader from './components/layout/Preloader.jsx';
import Navbar from './components/layout/Navbar.jsx';
import CursorSpotlight from './components/layout/CursorSpotlight.jsx';
import CustomCursor from './components/layout/CustomCursor.jsx';
import ScrollProgress from './components/layout/ScrollProgress.jsx';
import Footer from './components/layout/Footer.jsx';

import Hero from './components/sections/Hero.jsx';
import AgencyIntro from './components/sections/AgencyIntro.jsx';
import WhatWeBuild from './components/sections/WhatWeBuild.jsx';
import BusinessProblems from './components/sections/BusinessProblems.jsx';
import Industries from './components/sections/Industries.jsx';
import WorkTeaser from './components/sections/WorkTeaser.jsx';
import WhyUs from './components/sections/WhyUs.jsx';
import Ecosystem from './components/sections/Ecosystem.jsx';
import Process from './components/sections/Process.jsx';
import Technology from './components/sections/Technology.jsx';
import Maintenance from './components/sections/Maintenance.jsx';
import MobileCapability from './components/sections/MobileCapability.jsx';
import Trust from './components/sections/Trust.jsx';
import FAQ from './components/sections/FAQ.jsx';
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
      <WhatWeBuild />
      <BusinessProblems />
      <Industries />
      <WorkTeaser />
      <WhyUs />
      <Ecosystem />
      <Process />
      <Technology />
      <Maintenance />
      <MobileCapability />
      <Trust />
      <FAQ />
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
    const raw = window.location.hash.replace(/^#/, '');
    if (raw.startsWith('/') || raw === '') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
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
      <CustomCursor />
      <Navbar />

      <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        {isWork ? <WorkPage /> : <HomePage />}
      </main>

      <Footer />
    </>
  );
}
