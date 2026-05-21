'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '#about',     label: 'About'     },
  { href: '#skills',    label: 'Skills'    },
  { href: '#projects',  label: 'Projects'  },
  { href: '#education', label: 'Education' },
  { href: '#contact',   label: 'Contact'   },
];

export default function Navbar() {
  const [scrolled,      setScrolled]   = useState(false);
  const [activeSection, setActive]     = useState('about');
  const [mobileOpen,    setMobileOpen] = useState(false);
  const [logoHovered,   setLogoHover]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      let current = 'about';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    // Small delay lets the menu close animation start first
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.34,1.56,0.64,1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F7F8F0]/90 backdrop-blur-xl border-b border-[var(--mid)]/40 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('#about')}
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onHoverStart={() => setLogoHover(true)}
            onHoverEnd={() => setLogoHover(false)}
          >
            <motion.div
              className="relative w-9 h-9 rounded-2xl overflow-hidden border-2 border-[var(--mid)]/60 shadow-md bg-white"
              animate={logoHovered ? { rotate: [0, -8, 8, -4, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Image src="/icon.png" alt="logo" fill className="object-contain p-0.5" />
            </motion.div>
            <motion.span
              className="font-display font-800 text-[var(--deep)] text-lg leading-none"
              animate={logoHovered ? { color: 'var(--mid)' } : { color: 'var(--deep)' }}
            >
              Seijicxz
            </motion.span>
          </motion.button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 300 }}
                className={`relative px-4 py-2 rounded-full text-sm font-body font-700 transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-[var(--deep)]'
                    : 'text-[var(--deep)]/60 hover:text-[var(--deep)]'
                }`}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-[var(--mid)]/30 border border-[var(--mid)]/50"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-[60] relative"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="block h-0.5 w-6 bg-[var(--deep)] rounded-full"
                animate={mobileOpen ? (
                  i === 0 ? { rotate: 45, y: 8 } :
                  i === 1 ? { opacity: 0, scaleX: 0 } :
                            { rotate: -45, y: -8 }
                ) : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu — rendered as portal sibling, NOT inside nav */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              key="panel"
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="fixed top-0 left-0 right-0 z-[58] md:hidden"
              style={{
                background: 'rgba(247,248,240,0.97)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1.5px solid rgba(122,170,206,0.4)',
                boxShadow: '0 16px 48px rgba(61,90,62,0.15)',
                paddingTop: 'env(safe-area-inset-top)',
              }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--mid)]/25">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-[var(--mid)]/50 bg-white">
                    <Image src="/icon.png" alt="logo" fill className="object-contain p-0.5" />
                  </div>
                  <span className="font-display font-800 text-[var(--deep)] text-base">Seijicxz</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(156,213,255,0.2)', color: 'var(--deep)' }}
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="px-4 py-3 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ x: -24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.055, type: 'spring', stiffness: 320, damping: 24 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full text-left px-5 py-3.5 rounded-2xl font-body font-700 text-base transition-all duration-200 ${
                      activeSection === link.href.slice(1)
                        ? 'text-[var(--deep)]'
                        : 'text-[var(--deep)]/55 hover:text-[var(--deep)]'
                    }`}
                    style={activeSection === link.href.slice(1)
                      ? { background: 'rgba(156,213,255,0.22)', border: '1.5px solid rgba(122,170,206,0.5)' }
                      : { background: 'transparent', border: '1.5px solid transparent' }
                    }
                    whileTap={{ scale: 0.97 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              {/* Footer hint */}
              <p className="text-center text-xs pb-5 pt-1" style={{ color: 'rgba(61,90,62,0.35)' }}>
                tap outside to close
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
