'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Icon from '@/components/ui/Icon';

const PROJECTS = [
  {
    id: 1,
    name: 'cig_superadmin',
    description: 'A PHP-based superadmin web panel for managing PLSP CIG operations. Handles user roles, access control, and administrative workflows through a structured server-side dashboard.',
    tags: ['PHP', 'Dashboard'],
    language: 'PHP',
    type: 'web',
    demo: null,
  },
  {
    id: 2,
    name: 'sdsp',
    description: 'A student document system built in HTML for organizing and tracking academic records and submissions. Designed for ease of access and straightforward document management.',
    tags: ['HTML', 'CSS'],
    language: 'HTML',
    type: 'web',
    demo: 'https://sdspprojectcj.vercel.app/',
  },
  {
    id: 3,
    name: 'pos_inventory',
    description: 'A mobile POS and inventory manager for sari-sari stores built with React 18. Tracks stock levels, records sales, and manages customer debt and credit — designed to run smoothly on low-end devices.',
    tags: ['React', 'JavaScript', 'POS'],
    language: 'JavaScript',
    type: 'apk',
    demo: null,
  },
  {
    id: 4,
    name: 'rpg_game',
    description: 'A 2D top-down pixel action RPG built in Godot 4. Features a full state machine architecture, directional enemy AI, stamina system, XP/leveling, critical hits, and inventory with item drops.',
    tags: ['Godot 4', 'GDScript', '2D RPG'],
    language: 'GDScript',
    type: 'apk',
    demo: null,
  },
  {
    id: 5,
    name: 'expense_tracker',
    description: 'A mobile budget and expense tracker built with React Native and TypeScript. Lets users log daily spending, categorize transactions, and visualize monthly breakdowns to stay on top of their finances.',
    tags: ['React Native', 'TypeScript', 'Finance'],
    language: 'TypeScript',
    type: 'apk',
    demo: null,
  },
];

const LANG_COLORS = {
  JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3572A5',
  HTML: '#E34C26', CSS: '#563D7C', Vue: '#42B883',
  GDScript: '#478CBF', 'C#': '#9B4F96', PHP: '#777BB4', default: '#9CD5FF',
};

function SitePreview({ project }) {
  const [imgError, setImgError] = useState(false);
  const isApk = project.type === 'apk';

  const screenshotUrl = project.demo
    ? `https://api.microlink.io/?url=${encodeURIComponent(project.demo)}&screenshot=true&meta=false&embed=screenshot.url`
    : null;

  return (
    <div className="relative w-full h-40 overflow-hidden rounded-t-[1.5rem] flex-shrink-0 bg-gradient-to-br from-sky/10 to-lilac/10">
      {screenshotUrl && !imgError ? (
        <>
          <img
            src={screenshotUrl}
            alt={`${project.name} preview`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#f7f8f0]/60 to-transparent pointer-events-none" />
        </>
      ) : isApk ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center">
            <Icon name="fas fa-mobile-screen" className="text-amber-500 text-xl" />
          </div>
          <span className="text-[11px] font-body text-deep/35 font-700">Native Application</span>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-sky/15 flex items-center justify-center">
            <Icon name="fas fa-code" className="text-mid text-xl" />
          </div>
          <span className="text-[11px] font-body text-deep/35 font-700">Preview unavailable</span>
        </div>
      )}

      {/* Badge overlay */}
      <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 items-end">
        {project.demo ? (
          <span className="tag-pill text-[10px] bg-emerald-100/90 text-emerald-700 border-emerald-300/60 backdrop-blur-sm font-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        ) : isApk ? (
          <span
            className="tag-pill text-[10px] bg-amber-100/90 text-amber-700 border-amber-300/60 backdrop-blur-sm font-800"
            title="This is a native APK — a browser live demo is not applicable."
          >
            <Icon name="fas fa-mobile-screen" className="text-[9px]" />
            APK
          </span>
        ) : null}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const langColor = LANG_COLORS[project.language] || LANG_COLORS.default;
  const isApk = project.type === 'apk';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 6) * 0.08, type: 'spring', stiffness: 220, damping: 22 }}
      className="chiikawa-card flex flex-col h-full group overflow-hidden"
    >
      <SitePreview project={project} />

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-sky/15 flex items-center justify-center icon-sq flex-shrink-0">
            <Icon name="fas fa-folder" className="text-mid text-xs" />
          </div>
          <h3 className="font-display font-700 text-deep text-sm leading-tight line-clamp-1">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-deep/55 text-xs font-body leading-relaxed flex-1 mb-3 line-clamp-3">
          {project.description || 'No description provided.'}
        </p>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map(t => (
              <span key={t} className="tag-pill text-[10px]">{t}</span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-sky/15">
          <div className="flex items-center justify-between gap-2">
            {/* Language */}
            <div className="flex items-center gap-1.5 text-xs text-deep/45 font-body">
              {project.language && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: langColor }} />
                  <span className="font-700">{project.language}</span>
                </span>
              )}
            </div>

            {/* Demo button */}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-body font-800 bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 transition-all duration-200 shadow-sm"
                aria-label={`Live demo of ${project.name}`}
              >
                <Icon name="fas fa-arrow-up-right-from-square" className="text-[9px]" />
                Live Demo
              </a>
            ) : isApk ? (
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-body font-700 bg-amber-100 text-amber-600 border border-amber-200 cursor-default"
                title="This project is a native APK — a browser live demo is not applicable."
              >
                <Icon name="fas fa-mobile-screen" className="text-[9px]" />
                Demo N/A
              </span>
            ) : (
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-body font-700 bg-sky/10 text-deep/40 border border-sky/20 cursor-default"
                title="No live demo available yet."
              >
                <Icon name="fas fa-link-slash" className="text-[9px]" />
                No Demo
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="projects" className="py-20 relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto px-5">
        <SectionTitle icon="fas fa-folder-open" title="Projects" sub="Things I've built & shipped" />

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10 text-xs font-body text-deep/45"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Live Demo available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            APK / native — no browser demo
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky/50" />
            Demo coming soon
          </span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}