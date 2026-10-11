import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './styles/global.css';
import ErrorBoundary from './components/ErrorBoundary';
import IntroScreen from './components/IntroScreen';
import SplashScreen from './components/SplashScreen';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Stats from './components/Stats';
import Project from './components/Project';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import PortfolioModal from './components/PortfolioModal';
import ServiceModal from './components/ServiceModal';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import OnboardingFlow from './components/OnboardingFlow';
import audioMgr from './utils/audio';

/* ── APP ── */
function AppContent() {
  const [showIntro, setShowIntro] = useState(true);
  const [showSplash, setShowSplash] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [transPhase, setTransPhase] = useState(null);
  const [transLabel, setTransLabel] = useState('ARCANUM');
  // eslint-disable-next-line no-unused-vars
  const [pendingSection, setPendingSection] = useState(null);
  const [modalItem, setModalItem] = useState(null);
  const [serviceModalItem, setServiceModalItem] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [contactPrefill, setContactPrefill] = useState(null);

  // Lock body scroll when modal, service modal, or onboarding overlay is open
  useEffect(() => {
    document.body.style.overflow = (modalItem || serviceModalItem || showOnboarding) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalItem, serviceModalItem, showOnboarding]);

  // Inject SEO meta tags once
  useEffect(() => {
    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); prop ? el.setAttribute('property', name) : el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('description', 'Arcanum Design & Construct — award-winning architectural practice in CEBU, BOHOL PHILIPPINES. Residential, commercial & hospitality design rooted in Japanese craftsmanship.');
    setMeta('og:title', 'Arcanum Design & Construct', true);
    setMeta('og:description', 'Award-winning architecture studio based in CEBU, BOHOL PHILIPPINES. Japanese-inspired, contemporary design.', true);
    setMeta('og:type', 'website', true);
    setMeta('twitter:card', 'summary_large_image');
  }, []);

  // Keep the browser tab title in sync with whichever page is active —
  // previously this was set once and never changed, so every page
  // (and every shared/bookmarked link) showed the same generic title.
  useEffect(() => {
    const pageTitles = {
      home: 'Arcanum Design & Construct — Architecture Studio, CEBU, BOHOL PHILIPPINES',
      about: 'Current Projects — Arcanum Design & Construct',
      services: 'Services — Arcanum Design & Construct',
      portfolio: 'Portfolio — Arcanum Design & Construct',
      contact: 'Contact Us — Arcanum Design & Construct',
      aboutus: 'About Us — Arcanum Design & Construct',
    };
    document.title = pageTitles[activeSection] || pageTitles.home;
  }, [activeSection]);

  const sectionLabels = {
    home: 'HOME', about: 'PROJECT', services: 'SERVICES',
    portfolio: 'PORTFOLIO', contact: 'CONTACT', aboutus: 'ABOUT US',
  };

  const navigate = (section, opts = {}) => {
    if (section === 'contact' && !opts.keepPrefill) setContactPrefill(null);
    setPendingSection(section);
    setTransLabel(sectionLabels[section] || section.toUpperCase());
    setTransPhase('entering');
    setTimeout(() => {
      setActiveSection(section);
      window.scrollTo({ top: 0 });
      setTransPhase('leaving');
      setTimeout(() => setTransPhase(null), 500);
    }, 1400);
  };

  // Hero "Begin Your Project" → opens the onboarding intake instead of
  // dropping the visitor straight into a blank contact form.
  const beginProject = () => {
    setContactPrefill(null);
    setShowOnboarding(true);
  };

  const finishOnboarding = (answers) => {
    setContactPrefill(answers);
    setShowOnboarding(false);
    navigate('contact', { keepPrefill: true });
  };

  const skipOnboarding = () => {
    setShowOnboarding(false);
    navigate('contact');
  };

  const goToMenu = () => {
    setTransLabel('ARCANUM');
    setTransPhase('entering');
    setTimeout(() => {
      setShowSplash(true);
      setActiveSection(null);
      audioMgr.resumeMenu();
      setTransPhase('leaving');
      setTimeout(() => setTransPhase(null), 500);
    }, 1400);
  };

  return (
    <>
      <PageTransition phase={transPhase} label={transLabel} />

      {/* ── CINEMATIC INTRO ── plays once on first visit */}
      {showIntro && (
        <IntroScreen onDone={() => { setShowIntro(false); setShowSplash(true); }} />
      )}

      {/* Portfolio lightbox — sits above everything, blurs page beneath */}
      <AnimatePresence>
        {modalItem && <PortfolioModal key="portfolio-modal" item={modalItem} onClose={() => setModalItem(null)} />}
      </AnimatePresence>

      {/* Service lightbox — same treatment as the portfolio modal */}
      <AnimatePresence>
        {serviceModalItem && <ServiceModal key="service-modal" service={serviceModalItem} onClose={() => setServiceModalItem(null)} />}
      </AnimatePresence>

      {/* Onboarding intake — shown before Contact when starting from Hero's CTA */}
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingFlow
            key="onboarding-flow"
            onComplete={finishOnboarding}
            onSkip={skipOnboarding}
            onClose={() => setShowOnboarding(false)}
          />
        )}
      </AnimatePresence>

      {showSplash ? (
        <SplashScreen
          onDone={(section) => {
            const lbl = {home:'HOME',about:'PROJECT',services:'SERVICES',portfolio:'PORTFOLIO',contact:'CONTACT',aboutus:'ABOUT US'};
            setTransLabel(lbl[section] || 'HOME');
            setTransPhase('entering');
            setTimeout(() => {
              setActiveSection(section || 'home');
              setShowSplash(false);
              setTransPhase('leaving');
              setTimeout(() => setTransPhase(null), 500);
            }, 1400);
          }}
        />
      ) : activeSection ? (
        /* Blur entire page content when modal is open */
        <div style={{ filter: (modalItem || serviceModalItem) ? 'blur(6px)' : 'none', transition: 'filter 0.3s', pointerEvents: (modalItem || serviceModalItem) ? 'none' : 'auto' }}>
          <Navbar activeSection={activeSection} onNavigate={navigate} onMenu={goToMenu} />

          {activeSection === 'home' && (
            <>
              <Hero onNavigate={navigate} onBeginProject={beginProject} />
              <Marquee />
              <Stats />
              <Footer />
            </>
          )}
          {activeSection === 'about' && (
            <>
              <Project />
              <Footer />
            </>
          )}
          {activeSection === 'services' && (
            <>
              <Services onOpenModal={setServiceModalItem} />
              <Process />
              <Footer />
            </>
          )}
          {activeSection === 'portfolio' && (
            <>
              <Portfolio onOpenModal={setModalItem} />
              <Footer />
            </>
          )}
          {activeSection === 'contact' && (
            <>
              <Contact prefill={contactPrefill} />
              <Footer />
            </>
          )}
          {activeSection === 'aboutus' && (
            <>
              <AboutUs />
              <Footer />
            </>
          )}
        </div>
      ) : null}
    </>
  );
}


export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
