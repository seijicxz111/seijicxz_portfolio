'use client';

import { useState, useRef } from 'react';
import {
  motion, useInView, AnimatePresence,
  useAnimationFrame, useMotionValue,
  useSpring, useTransform,
} from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Icon from '@/components/ui/Icon';

const SKILL_GROUPS = [
  {
    label: 'Frontend',
    icon: 'fas fa-paint-brush',
    skills: [
      { name: 'HTML & CSS',   icon: 'fab fa-html5',     color: '#e96228' },
      { name: 'JavaScript',   icon: 'fab fa-js-square', color: '#c8961a' },
      { name: 'React.js',     icon: 'fab fa-react',     color: '#3d8fa8' },
      { name: 'Tailwind CSS', icon: 'fas fa-wind',      color: '#3b88a0' },
      { name: 'Next.js',      icon: 'fas fa-code',      color: '#355872' },
    ],
  },
  {
    label: 'Backend',
    icon: 'fas fa-server',
    skills: [
      { name: 'Node.js',    icon: 'fab fa-node-js',  color: '#3d7a3e' },
      { name: 'Python',     icon: 'fab fa-python',   color: '#3b6a9c' },
      { name: 'Express.js', icon: 'fas fa-server',   color: '#7AAACE' },
      { name: 'MySQL',      icon: 'fas fa-database', color: '#2a7a8f' },
      { name: 'PostgreSQL', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#3b6a9c' },
      { name: 'Flutter',    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',      color: '#3dcef5' },
    ],
  },
  {
    label: 'Tools',
    icon: 'fas fa-tools',
    skills: [
      { name: 'Git & GitHub',    icon: 'fab fa-github', color: '#355872' },
      { name: 'Figma',           icon: 'fab fa-figma',  color: '#8a6eb8' },
      { name: 'VS Code',         icon: 'fas fa-code',   color: '#2a6aad' },
      { name: 'JetBrains',       imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jetbrains/jetbrains-original.svg', color: '#e84393' },
      { name: 'Vite',            imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',      color: '#9c6aff' },
      { name: 'GDScript / Godot', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg',     color: '#4a8fcb' },
    ],
  },
];

const ALL_TECH = [
  { name: 'HTML',       icon: 'fab fa-html5',     color: '#e96228' },
  { name: 'CSS',        icon: 'fab fa-css3-alt',  color: '#2a62c8' },
  { name: 'JavaScript', icon: 'fab fa-js-square', color: '#c8961a' },
  { name: 'React',      icon: 'fab fa-react',     color: '#3d8fa8' },
  { name: 'Next.js',    icon: 'fas fa-code',      color: '#355872' },
  { name: 'Tailwind',   icon: 'fas fa-wind',      color: '#3b88a0' },
  { name: 'Node.js',    icon: 'fab fa-node-js',   color: '#3d7a3e' },
  { name: 'Python',     icon: 'fab fa-python',    color: '#3b6a9c' },
  { name: 'Git',        icon: 'fab fa-github',    color: '#355872' },
  { name: 'Figma',      icon: 'fab fa-figma',     color: '#8a6eb8' },
  { name: 'MySQL',      icon: 'fas fa-database',  color: '#2a7a8f' },
  { name: 'VS Code',    icon: 'fas fa-code',      color: '#2a6aad' },
  { name: 'Vite',       imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',         color: '#9c6aff' },
  { name: 'Flutter',    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',      color: '#3dcef5' },
  { name: 'PostgreSQL', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#3b6a9c' },
  { name: 'Godot',      imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg',          color: '#4a8fcb' },
  { name: 'JetBrains',  imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jetbrains/jetbrains-original.svg',  color: '#e84393' },
];

// 3D tilt card for each skill
function SkillCard({ name, icon, imgSrc, color, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-30, 30], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-30, 30], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 600, rotateX, rotateY, background: 'rgba(255,255,255,0.78)' }}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 22 }}
      className="skill-card-sketchy flex items-center gap-3 px-4 py-3 rounded-2xl cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(53,88,114,0.18)' }}
    >
      <motion.div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 icon-sq-sketchy"
        style={{ background: `${color}18` }}
        whileHover={{ scale: 1.2, rotate: 12 }}
        transition={{ type: 'spring', stiffness: 400, damping: 14 }}
      >
        {imgSrc
          ? <img src={imgSrc} alt={name} style={{ width: 18, height: 18, objectFit: 'contain' }} />
          : <Icon name={icon} className="text-sm" style={{ color }} />
        }
      </motion.div>
      <span className="text-sm font-body font-700" style={{ color: '#355872' }}>{name}</span>
    </motion.div>
  );
}

// Marquee with icon badges
function TechMarquee() {
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const items = [...ALL_TECH, ...ALL_TECH, ...ALL_TECH];
  const velocity = -0.55;
  const resetAt = -(ALL_TECH.length * 135);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    const next = x.get() + velocity * (delta / 16);
    x.set(next < resetAt ? next - resetAt : next);
  });

  return (
    <div
      className="overflow-hidden mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <motion.div style={{ x, display: 'flex', gap: '10px', width: 'max-content' }}>
        {items.map((t, idx) => (
          <motion.span
            key={idx}
            className="tag-pill flex-shrink-0 cursor-default inline-flex items-center gap-1"
            whileHover={{ scale: 1.14, y: -4, boxShadow: '0 6px 18px rgba(53,88,114,0.15)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 16 }}
          >
            {t.imgSrc
              ? <img src={t.imgSrc} alt={t.name} style={{ width: 12, height: 12, objectFit: 'contain' }} />
              : <Icon name={t.icon} className="text-xs" style={{ color: t.color }} />
            }
            {t.name}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const tabVariants = {
    inactive: { scale: 1 },
    active:   { scale: 1.04 },
  };

  return (
    <section id="skills" className="py-20 relative z-10" ref={ref}>
      <div className="max-w-4xl mx-auto px-5">
        <SectionTitle icon="fas fa-laptop-code" title="Skills" sub="Technologies I work with" />

        {/* Tabs */}
        <div className="flex gap-2 justify-center flex-wrap mb-10">
          {SKILL_GROUPS.map((g, i) => (
            <motion.button
              key={g.label}
              onClick={() => setActive(i)}
              variants={tabVariants}
              animate={active === i ? 'active' : 'inactive'}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-800 text-sm transition-all duration-200 ${active === i ? 'tab-btn-sketchy-active' : 'tab-btn-sketchy'}`}
              style={active === i
                ? { background: '#355872', color: 'white' }
                : { background: 'rgba(255,255,255,0.75)', color: 'rgba(53,88,114,0.6)' }
              }
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
            >
              <motion.span
                className="inline-flex items-center text-xs"
                animate={active === i ? { rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.45 }}
              >
                <Icon name={g.icon} />
              </motion.span>
              {g.label}
            </motion.button>
          ))}
        </div>

        {/* Skills panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="chiikawa-card p-8"
          >
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center icon-sq-sketchy"
                style={{ background: 'rgba(156,213,255,0.2)' }}
                animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                <Icon name={SKILL_GROUPS[active].icon} style={{ color: '#7AAACE' }} />
              </motion.div>
              <div>
                <h3 className="font-display font-800 text-xl" style={{ color: '#355872' }}>
                  {SKILL_GROUPS[active].label} Skills
                </h3>
                <p className="text-xs font-body" style={{ color: 'rgba(53,88,114,0.5)' }}>Technologies I use</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SKILL_GROUPS[active].skills.map((skill, i) => (
                <SkillCard key={skill.name} {...skill} delay={i * 0.07} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <TechMarquee />
      </div>
    </section>
  );
}