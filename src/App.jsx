import { useEffect, useState } from 'react';
import Preloader from './components/layout/Preloader.jsx';
import Navbar from './components/layout/Navbar.jsx';
import CursorSpotlight from './components/layout/CursorSpotlight.jsx';
import CustomCursor from './components/layout/CustomCursor.jsx';
import ScrollProgress from './components/layout/ScrollProgress.jsx';
import Footer from './components/layout/Footer.jsx';
import WhatsAppButton from './components/layout/WhatsAppButton.jsx';

import Hero from './components/sections/Hero.jsx';
import AgencyIntro from './components/sections/AgencyIntro.jsx';
import WhatWeBuild from './components/sections/WhatWeBuild.jsx';
import WhenYouNeedUs from './components/sections/WhenYouNeedUs.jsx';
import BuiltForBusinesses from './components/sections/BuiltForBusinesses.jsx';
import Industries from './components/sections/Industries.jsx';
import WorkTeaser from './components/sections/WorkTeaser.jsx';
import WhyUs from './components/sections/WhyUs.jsx';
import Ecosystem from './components/sections/Ecosystem.jsx';
import Process from './components/sections/Process.jsx';
import Technology from './components/sections/Technology.jsx';
import Maintenance from './components/sections/Maintenance.jsx';
import FAQ from './components/sections/FAQ.jsx';
import CTA from './components/sections/CTA.jsx';
import Contact from './components/sections/Contact.jsx';

import WorkPage from './pages/WorkPage.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import IndustryDetail from './pages/IndustryDetail.jsx';
import ServicePage from './pages/ServicePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import { faq } from './data/services.js';
import { useLenis } from './lib/useLenis.js';
import { useDocumentMeta } from './lib/useDocumentMeta.js';
import { useRoute } from './lib/router.js';

function HomePage({ loaded }) {
  useDocumentMeta({
    title: 'Mahesh Builds — Website & Software Development Studio in India',
    description: 'Websites, web apps, mobile apps and custom business software for Indian businesses and institutes — designed, built and maintained end-to-end.',
    path: '/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  });

  return (
    <>
      <Hero loaded={loaded} />
      <AgencyIntro />
      <WhatWeBuild />
      <WhenYouNeedUs />
      <BuiltForBusinesses />
      <Industries />
      <WorkTeaser />
      <Ecosystem />
      <WhyUs />
      <Maintenance />
      <Process />
      <Technology />
      <FAQ />
      <CTA />
      <Contact />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const route = useRoute();
  useLenis();

  // Failsafe: never let the preloader trap the page at opacity 0.
  // If onDone hasn't fired for any reason (animation error, missing ref,
  // etc.) force the content visible after a hard timeout.
  useEffect(() => {
    if (loaded) return;
    const t = setTimeout(() => setLoaded(true), 2500);
    return () => clearTimeout(t);
  }, [loaded]);

  useEffect(() => {
    if (route.anchor) {
      setTimeout(() => {
        const el = document.getElementById(route.anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [route.path, route.anchor, route.params.slug]);

  let page;
  if (route.path === '/') page = <HomePage loaded={loaded} />;
  else if (route.path === '/work') page = <WorkPage />;
  else if (route.path === '/work/:slug') page = <ProjectDetail slug={route.params.slug} />;
  else if (route.path === '/industries/:slug') page = <IndustryDetail slug={route.params.slug} />;
  else if (route.path === '/services/:slug') page = <ServicePage slug={route.params.slug} />;
  else if (route.path === '/website-development-pune') page = <ServicePage local />;
  else page = <NotFoundPage />;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Preloader onDone={() => setLoaded(true)} />
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <CursorSpotlight />
      <CustomCursor />
      <Navbar />

      <main id="main-content" tabIndex="-1" style={{ position: 'relative', zIndex: 2, opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        {page}
      </main>

      <Footer />

      {/* Persistent floating WhatsApp contact — stays fixed in the bottom-right
          across every section and route. Shown once the preloader hands off. */}
      {loaded && (
        <div className="whatsapp-float">
          <WhatsAppButton />
        </div>
      )}
    </>
  );
}
