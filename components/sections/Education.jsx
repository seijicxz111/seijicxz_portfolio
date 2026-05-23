'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Icon from '@/components/ui/Icon';

const EDUCATION = [
  {
    type: 'education',
    icon: 'fas fa-graduation-cap',
    iconColor: '#7AAACE',
    title: 'Bachelor of Science in Information Technology',
    org: 'Pamantasan ng Lungsod ng San Pablo',
    period: '2022 – Present',
    desc: 'Studying core computer science principles, software engineering, web development, and UI/UX design.',
    tags: ['BSIT'],
    color: 'bg-sky/10 border-sky/30',
    dotColor: 'from-mid to-sky',
  },
  {
    type: 'education',
    icon: 'fas fa-school',
    iconColor: '#F9C5D1',
    title: 'Senior High School — ABM Track',
    org: 'Solomon P. Lozada National High School',
    period: '2020 – 2022',
    desc: 'Focused on Accountancy, Business, and Management studies, developing skills in entrepreneurship, financial literacy, communication, and business operations.',
    tags: ['ABM', 'Graduated'],
    color: 'bg-petal/15 border-petal/30',
    dotColor: 'from-petal to-blossom',
  },
];

const CERTS = [
  {
    type: 'cert',
    icon: 'fas fa-trophy',
    iconColor: '#f59e0b',
    title: 'Introduction to Game Development',
    org: 'Codecademy',
    period: 'May 2026',
    desc: 'Completed all course material in the Introduction to Game Development Course.',
    tags: ['Certificate', 'Codecademy'],
    color: 'bg-leaf/20 border-leaf/40',
    dotColor: 'from-emerald-300 to-emerald-400',
    link: '/certs/introtogame_cert.pdf',
  },
  {
    type: 'cert',
    icon: 'fas fa-scroll',
    iconColor: '#7AAACE',
    title: 'Secure Coding Practices in C',
    org: 'Codecademy',
    period: 'May 2026',
    desc: 'Completed all course material in the Secure Coding Practices in C Course.',
    tags: ['Certificate', 'Codecademy'],
    color: 'bg-sun/30 border-sun/50',
    dotColor: 'from-yellow-300 to-amber-400',
    link: '/certs/securecoding_cert.pdf',
  },
];

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 240, damping: 22 }}
      className="relative pl-10"
    >
      <motion.div
        className={`absolute left-0 top-5 timeline-dot bg-gradient-to-br ${item.dotColor}`}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.12 + 0.1, type: 'spring', stiffness: 400 }}
      />

      <motion.div
        className={`chiikawa-card p-6 border-2 ${item.color}`}
        whileHover={{ x: 4, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="flex items-start gap-3 mb-3">
          <motion.div
            className="w-10 h-10 rounded-xl bg-white border border-sky/20 flex items-center justify-center flex-shrink-0 shadow-sm icon-sq"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <Icon name={item.icon} className="text-sm" style={{ color: item.iconColor }} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h3 className="font-display font-700 text-deep text-base leading-tight">{item.title}</h3>
              <span className="tag-pill text-[11px] flex-shrink-0">{item.period}</span>
            </div>
            <p className="text-mid font-body font-700 text-sm mt-0.5">{item.org}</p>
          </div>
        </div>
        <p className="text-deep/55 font-body text-sm leading-relaxed mb-3">{item.desc}</p>
        <div className="flex flex-wrap items-center gap-2">
          {item.tags.map(t => (
            <motion.span key={t} className="tag-pill text-[11px]" whileHover={{ scale: 1.06, y: -1 }}>{t}</motion.span>
          ))}
          {item.link && (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs font-body font-700 text-mid flex items-center gap-1 hover:text-deep transition-colors"
              whileHover={{ x: 2 }}
            >
              View <Icon name="fas fa-arrow-up-right-from-square" className="text-[10px]" />
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="education" className="py-20 relative z-10 bg-sky/5" ref={ref}>
      <div className="max-w-4xl mx-auto px-5">
        <SectionTitle icon="fas fa-graduation-cap" title="Education" sub="My academic journey & certifications" />

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {/* Education Timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display font-800 text-deep text-lg mb-6 flex items-center gap-2"
            >
              <motion.div
                className="w-8 h-8 rounded-xl bg-sky/20 flex items-center justify-center icon-sq"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Icon name="fas fa-school" className="text-mid text-sm" />
              </motion.div>
              Academics
            </motion.h3>
            <div className="relative">
              <div className="timeline-line" />
              <div className="space-y-6">
                {EDUCATION.map((item, i) => (
                  <TimelineItem key={item.title} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-display font-800 text-deep text-lg mb-6 flex items-center gap-2"
            >
              <motion.div
                className="w-8 h-8 rounded-xl bg-leaf/30 flex items-center justify-center icon-sq"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Icon name="fas fa-certificate" className="text-emerald-500 text-sm" />
              </motion.div>
              Certifications
            </motion.h3>
            <div className="relative">
              <div className="timeline-line" />
              <div className="space-y-6">
                {CERTS.map((item, i) => (
                  <TimelineItem key={item.title} item={item} index={i + 2} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}