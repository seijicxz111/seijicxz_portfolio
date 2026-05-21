'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll, useVelocity, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';

// ╔══════════════════════════════════════════════════════════════╗
// ║           ✏️  EDIT YOUR PERSONAL INFO HERE                   ║
// ╠══════════════════════════════════════════════════════════════╣
// ║                                                              ║
// ║  PROFILE PHOTO                                               ║
// ║  → Replace the file at:  /public/pfp.png                    ║
// ║    (any square image works; recommended 512×512px or larger) ║
// ║                                                              ║
// ║  MASCOT / ICON BADGE (bottom-right of profile circle)        ║
// ║  → Replace the file at:  /public/icon1.png                  ║
// ║    (use a PNG with transparent background)                   ║
// ║                                                              ║
// ║  NAVBAR LOGO ICON                                            ║
// ║  → Replace the file at:  /public/icon.png                   ║
// ║    (small square icon, shown in nav bar)                     ║
// ║                                                              ║
// ╚══════════════════════════════════════════════════════════════╝

// ── Your name (shown in the big hero heading) ──────────────────
const FIRST_NAME  = 'CJ Steeve';   // ← change me
const LAST_NAME   = 'Cadenas';     // ← change me

// ── Rotating job titles under your name ────────────────────────
const ROLES = [
  'Web Developer',       // ← change / add / remove roles
  'UI Designer',
  'Aspiring Engineer',
  'Anime Enthusiast',
];

// Floating deco shapes matched to meadow palette
const DECOS = [
  { type: 'star',    icon: 'fas fa-star',     color: '#e8f4ff', top: '12%', left: '6%',   size: '2rem',   delay: 0   },
  { type: 'heart',   icon: 'fas fa-heart',    color: '#c4d8ee', top: '20%', right: '8%',  size: '1.5rem', delay: 0.8 },
  { type: 'flower',  icon: 'fas fa-seedling', color: '#7AAACE', bottom: '22%', left: '4%',size: '1.8rem', delay: 1.4 },
  { type: 'note',    icon: 'fas fa-music',    color: '#b0c8d8', bottom: '32%', right: '5%',size:'1.6rem', delay: 0.4 },
  { type: 'cloud',   icon: 'fas fa-cloud',    color: '#9CD5FF', top: '55%', left: '10%',  size: '1.3rem', delay: 2   },
  { type: 'paw',     icon: 'fas fa-paw',      color: '#c4d8ee', top: '38%', left: '18%',  size: '1.1rem', delay: 1.1 },
];

function FloatingDeco({ icon, color, top, left, right, bottom, size, delay }) {
  return (
    <motion.i
      className={`${icon} absolute select-none pointer-events-none`}
      style={{ color, fontSize: size, top, left, right, bottom }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.5, 1, 0.5],
        y: [0, -14, 0],
        rotate: [0, 8, -5, 0],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
        opacity: { duration: 0.6, delay },
      }}
    />
  );
}

// Magnetic cursor-tracking profile image
function MagneticProfile({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.12;
    const dy = (e.clientY - cy) * 0.12;
    x.set(dx); y.set(dy);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// Staggered letter animation for name
function AnimatedName({ text, className, delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.04,
            type: 'spring',
            stiffness: 280,
            damping: 20,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing,    setTyping]    = useState(true);

  useEffect(() => {
    const target = ROLES[roleIdx];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 78);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 42);
        return () => clearTimeout(t);
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 36 },
    show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 22 } },
  };

  const SKILL_BADGES = [
    { label: 'React',   icon: 'fab fa-react',  color: '#61DBFB', x: '-left-10', y: 'top-8',     d: 0   },
    { label: 'Next.js', icon: 'fas fa-code',   color: '#355872', x: '-right-10',y: 'top-16',    d: 0.5 },
    { label: 'Figma',   icon: 'fab fa-figma',  color: '#b0c8d8', x: '-left-6',  y: 'bottom-16', d: 1   },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Floating decorations */}
      {DECOS.map((d, i) => <FloatingDeco key={i} {...d} />)}

      <div className="max-w-6xl mx-auto px-5 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ── Text side ── */}
          <motion.div variants={container} initial="hidden" animate="show" className="order-2 md:order-1">

            {/* Hello */}
            <motion.p variants={item} className="font-display font-700 text-lg mb-1" style={{ color: '#7AAACE' }}>
              Hello there! I&apos;m
            </motion.p>

            {/* Name with letter-by-letter reveal */}
            <motion.h1
              variants={item}
              className="font-display font-800 text-5xl md:text-6xl leading-none mb-3"
              style={{ letterSpacing: '-0.02em', color: '#355872' }}
            >
              CJ Steeve
              <br />
              <span style={{ background: 'linear-gradient(135deg, #355872 0%, #7AAACE 55%, #9CD5FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Cadenas
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div variants={item} className="flex items-center gap-2 mb-6 h-9">
              <motion.span
                style={{ color: '#7AAACE' }}
                className="font-display font-700 text-xl"
                animate={{ rotate: [0, 14, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >✦</motion.span>
              <span className="font-display font-700 text-2xl" style={{ color: '#355872' }}>
                {displayed}
                <span className="typed-cursor">|</span>
              </span>
            </motion.div>

            <motion.p variants={item} className="font-body text-base leading-relaxed max-w-md mb-8" style={{ color: '#355872', opacity: 0.7 }}>
              {/* ↓ Your short bio — change me ↓ */}
              Aspiring web developer &amp; UI designer from the Philippines, passionate about crafting beautiful, accessible, and delightful digital experiences.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-8">
              <motion.a
                href="#contact"
                className="btn-chiikawa btn-chiikawa-primary"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.94 }}
              >
                <i className="fas fa-paper-plane text-xs" /> Say Hello
              </motion.a>
              <motion.a
                href="#projects"
                className="btn-chiikawa btn-chiikawa-secondary"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.94 }}
              >
                <i className="fas fa-folder-open text-xs" /> My Projects
              </motion.a>
            </motion.div>

            {/* ── Social links — change the href values below ── */}
            <motion.div variants={item} className="flex items-center gap-3">
              {[
                { icon: 'fab fa-github',     href: 'https://github.com/seijicxz',          label: 'GitHub'   }, // ← change me
                { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/violeeee.07', label: 'Facebook' }, // ← change me
                { icon: 'fab fa-linkedin',   href: '#',                                     label: 'LinkedIn' }, // ← change me
              ].map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-white/80 border-2 transition-all duration-200"
                  style={{ borderColor: 'rgba(156,213,255,0.5)', color: 'rgba(53,88,114,0.6)' }}
                  initial={{ opacity: 0, scale: 0, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.9 + i * 0.1, type: 'spring', stiffness: 300, damping: 18 }}
                  whileHover={{ y: -5, scale: 1.15, rotate: 5, borderColor: '#7AAACE', color: '#355872' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={s.icon} />
                </motion.a>
              ))}
              <motion.div
                className="h-6 w-px mx-1"
                style={{ background: 'rgba(156,213,255,0.4)' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.3 }}
              />
              <motion.span
                className="text-xs font-body font-700"
                style={{ color: 'rgba(53,88,114,0.45)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                seijicxz
              </motion.span>
            </motion.div>
          </motion.div>

          {/* ── Profile / Mascot side ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 180, damping: 16 }}
            className="order-1 md:order-2 flex items-center justify-center"
          >
            <MagneticProfile>
              <div className="relative">
                {/* Outer glow rings */}
                {['-inset-5', '-inset-10', '-inset-16'].map((inset, i) => (
                  <motion.div
                    key={i}
                    className={`absolute ${inset} rounded-full border border-[#9CD5FF]`}
                    style={{ opacity: 0.25 - i * 0.07 }}
                    animate={{ scale: [1, 1.04 + i * 0.02, 1], opacity: [0.25 - i * 0.07, 0.08, 0.25 - i * 0.07] }}
                    transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  />
                ))}

                {/* Profile photo */}
                <motion.div
                  className="relative w-64 h-64 rounded-full overflow-hidden border-4 shadow-2xl"
                  style={{ borderColor: 'rgba(156,213,255,0.6)', background: '#F7F8F0' }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.04 }}
                >
                  <Image src="/pfp.png" alt="CJ Steeve Cadenas" fill className="object-cover" />

                  {/* Shimmer overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 60%)' }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                {/* Mascot badge (icon1.png) */}
                <motion.div
                  className="absolute -bottom-5 -right-5 bg-white/90 rounded-2xl p-2 border-2 shadow-lg"
                  style={{ borderColor: 'rgba(156,213,255,0.5)' }}
                  animate={{ rotate: [0, 10, -6, 4, 0], y: [0, -4, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.18, rotate: 15 }}
                >
                  <div className="relative w-14 h-14">
                    <Image src="/icon1.png" alt="mascot" fill className="object-contain" />
                  </div>
                </motion.div>

                {/* Floating skill badges */}
                {SKILL_BADGES.map((b, i) => (
                  <motion.div
                    key={b.label}
                    className={`absolute ${b.x} ${b.y} bg-white/88 rounded-2xl px-3 py-1.5 flex items-center gap-2 shadow-lg border`}
                    style={{ borderColor: 'rgba(156,213,255,0.4)' }}
                    initial={{ opacity: 0, scale: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: [0, -7, 0] }}
                    transition={{
                      opacity: { delay: 0.8 + i * 0.2, duration: 0.4 },
                      scale:   { delay: 0.8 + i * 0.2, type: 'spring', stiffness: 300 },
                      x:       { delay: 0.8 + i * 0.2, type: 'spring', stiffness: 300 },
                      y:       { duration: 3.5 + b.d, repeat: Infinity, ease: 'easeInOut', delay: b.d },
                    }}
                    whileHover={{ scale: 1.12, y: -5 }}
                  >
                    <i className={`${b.icon} text-xs`} style={{ color: b.color }} />
                    <span className="text-xs font-body font-800" style={{ color: '#355872' }}>{b.label}</span>
                  </motion.div>
                ))}
              </div>
            </MagneticProfile>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ color: 'rgba(53,88,114,0.4)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 2 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 2 } }}
        >
          <span className="text-xs font-body font-700 tracking-widest">scroll</span>
          <i className="fas fa-chevron-down text-xs" />
        </motion.div>
      </div>

      {/* Wave bottom */}
      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none">
          <path d="M0,30 C360,55 1080,5 1440,30 L1440,50 L0,50 Z" fill="rgba(156,213,255,0.12)"/>
        </svg>
      </div>
    </section>
  );
}
