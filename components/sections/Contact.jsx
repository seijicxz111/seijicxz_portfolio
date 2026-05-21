'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const SOCIALS = [
  { icon: 'fab fa-github',    label: 'GitHub',    href: 'https://github.com/seijicxz111',            value: 'seijicxz',          color: '#355872' },
  { icon: 'fab fa-facebook-f',label: 'Facebook',  href: 'https://www.facebook.com/violeeee.07',   value: 'facebook.com/violeeee.07', color: '#1877f2' },
  { icon: 'fab fa-linkedin',  label: 'LinkedIn',  href: '#',                                       value: 'seijicxz',          color: '#0a66c2' },
  { icon: 'fas fa-envelope',  label: 'Email',     href: 'mailto:cjsteevecadenas0@gmail.com',       value: 'cjsteevecadenas0@gmail.com', copyable: true, color: '#7AAACE' },
];

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.3 + i * 0.08, type: 'spring', stiffness: 280, damping: 26 }
  }),
};

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1500));
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="contact" className="py-20 relative z-10" ref={ref}>
      <div className="max-w-5xl mx-auto px-5">
        <SectionTitle icon="fas fa-envelope" title="Contact" sub="Let's build something together" />

        <div className="grid md:grid-cols-5 gap-8 mt-10">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 22 }}
            className="md:col-span-2 space-y-5"
          >
            <motion.div
              className="chiikawa-card p-6"
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.i
                  className="fas fa-hand-wave text-mid text-lg"
                  animate={{ rotate: [0, 20, -10, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
                />
                <h3 className="font-display font-800 text-deep text-lg">Say Hello!</h3>
              </div>
              <p className="text-deep/55 font-body text-sm leading-relaxed">
                I'm open to internship opportunities, freelance projects, and collaborations. Don't hesitate to reach out!
              </p>
            </motion.div>

            <div className="space-y-3">
              {SOCIALS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, type: 'spring', stiffness: 260, damping: 22 }}
                  className="chiikawa-card p-4 flex items-center gap-3 group"
                  whileHover={{ x: 4, borderColor: s.color }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-sky/15 border border-sky/25 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, backgroundColor: `${s.color}22` }}
                  >
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-body font-700 text-deep/45">{s.label}</p>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-body font-700 text-deep hover:text-mid transition-colors truncate block"
                    >
                      {s.value}
                    </a>
                  </div>
                  {s.copyable && (
                    <motion.button
                      onClick={() => handleCopy(s.href.replace('mailto:', ''), s.label)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-deep/35 hover:text-mid hover:bg-sky/15 transition-all"
                      whileTap={{ scale: 0.88 }}
                      aria-label="Copy email"
                    >
                      <AnimatePresence mode="wait">
                        {copied === s.label ? (
                          <motion.i
                            key="check"
                            className="fas fa-check text-xs text-emerald-500"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          />
                        ) : (
                          <motion.i
                            key="copy"
                            className="fas fa-copy text-xs"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, type: 'spring', stiffness: 220, damping: 22 }}
            className="md:col-span-3"
          >
            <div className="chiikawa-card p-8">
              <h3 className="font-display font-800 text-deep text-lg mb-6">Send a Message</h3>

              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="text-center py-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <motion.i
                      className="fas fa-check-circle text-emerald-400 text-5xl mb-3 block"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                    />
                    <h4 className="font-display font-800 text-deep text-xl mb-2">Message sent!</h4>
                    <p className="text-deep/50 font-body text-sm">Thanks for reaching out. I'll get back to you soon~</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <motion.div custom={0} variants={fieldVariants}>
                        <label className="block text-xs font-body font-700 text-deep/60 mb-1.5">Name</label>
                        <input
                          name="name" value={form.name} onChange={handleChange}
                          required placeholder="Your name" className="chiikawa-input"
                        />
                      </motion.div>
                      <motion.div custom={1} variants={fieldVariants}>
                        <label className="block text-xs font-body font-700 text-deep/60 mb-1.5">Email</label>
                        <input
                          name="email" type="email" value={form.email} onChange={handleChange}
                          required placeholder="your@email.com" className="chiikawa-input"
                        />
                      </motion.div>
                    </div>
                    <motion.div custom={2} variants={fieldVariants}>
                      <label className="block text-xs font-body font-700 text-deep/60 mb-1.5">Message</label>
                      <textarea
                        name="message" value={form.message} onChange={handleChange}
                        required rows={5} placeholder="What's on your mind?" className="chiikawa-input"
                      />
                    </motion.div>
                    <motion.div custom={3} variants={fieldVariants}>
                      <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        className="btn-chiikawa btn-chiikawa-primary w-full"
                        whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 8px 24px rgba(53,88,114,0.25)' } : {}}
                        whileTap={status !== 'sending' ? { scale: 0.97 } : {}}
                      >
                        <AnimatePresence mode="wait">
                          {status === 'sending' ? (
                            <motion.span key="sending" className="flex items-center gap-2 justify-center"
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <motion.i
                                className="fas fa-paper-plane text-xs"
                                animate={{ x: [0, 6, 0], y: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 0.7 }}
                              /> Sending…
                            </motion.span>
                          ) : (
                            <motion.span key="idle" className="flex items-center gap-2 justify-center"
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <i className="fas fa-paper-plane text-xs" /> Send Message
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
