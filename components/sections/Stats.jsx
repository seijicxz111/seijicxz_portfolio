'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '@/components/ui/Icon';

const STATS = [
  { value: 5,   suffix: '+', label: 'Projects Built',   icon: 'fas fa-box-open',   color: 'bg-sky/15   border-sky/30' },
  { value: 3,   suffix: '+', label: 'Tech Stacks',      icon: 'fas fa-tools',      color: 'bg-petal/30 border-petal/40' },
  { value: 99,  suffix: '%', label: 'Bug Free (trust me)', imgSrc: '/hehe.png',   color: 'bg-sky/15   border-sky/30' },
  { value: 999, suffix: '+', label: 'Coffees Sipped',   icon: 'fas fa-coffee',     color: 'bg-leaf/30  border-leaf/40' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display font-800 text-4xl text-deep tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-16 relative z-10">
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.85, rotateY: -25 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : {}}
              transition={{ delay: i * 0.12, type: 'spring', stiffness: 240, damping: 18 }}
              className={`chiikawa-card p-6 text-center border-2 ${stat.color}`}
              whileHover={{ y: -8, scale: 1.05, boxShadow: '0 20px 50px rgba(53,88,114,0.22)' }}
            >
              <motion.div
                className="w-16 h-16 rounded-xl bg-white flex items-center justify-center mx-auto mb-2 icon-sq-sketchy"
                animate={stat.spin
                  ? { rotate: 360 }
                  : { rotate: [0, -10, 10, 0] }
                }
                transition={stat.spin
                  ? { duration: 3, repeat: Infinity, ease: 'linear' }
                  : { duration: 0.4 }
                }
                whileHover={stat.spin ? {} : { rotate: [0, -15, 15, -8, 0] }}
              >
                {stat.imgSrc
                  ? <img src={stat.imgSrc} alt={stat.label} style={{ width: 52, height: 52, objectFit: 'contain' }} />
                  : <Icon name={stat.icon} className="text-mid text-2xl" />
                }
              </motion.div>
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-deep/55 text-xs font-body font-700 mt-1 tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}