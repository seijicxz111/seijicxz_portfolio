'use client';

import { useEffect, useRef } from 'react';

const IMGS = [
  '/assets/01.png',
  '/assets/02.png',
  '/assets/03.png',
  '/assets/04.png',
  '/assets/06.png',
  '/assets/07.png',
  '/assets/08.png',
];

export default function FloatingSprites() {
  const containerRef = useRef(null);
  const animRef      = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const isMobile = W < 768;
    const COUNT = isMobile ? 6 : 12;

    // Simple seeded random so values are stable across calls
    let seed = 42;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 0xffffffff;
    };

    // Build bubble state in px
    const bubbles = Array.from({ length: COUNT }, (_, i) => ({
      img:      IMGS[i % IMGS.length],
      x:        rand() * W,
      y:        rand() * H,
      size:     isMobile ? 28 + rand() * 36 : 36 + rand() * 52, // smaller: 36–88px desktop, 28–64px mobile
      opacity:  0.15 + rand() * 0.20,
      phase:    rand() * Math.PI * 2,
      amp:      6 + rand() * 16,
      speedX:   (rand() - 0.5) * 0.08,
      rotSpeed: (rand() - 0.5) * 0.35,
      rot:      rand() * 360,
    }));

    // Create <img> elements
    const els = bubbles.map((b) => {
      const img = document.createElement('img');
      img.src = b.img;
      img.alt = '';
      img.draggable = false;
      Object.assign(img.style, {
        position:      'absolute',
        width:         `${b.size}px`,
        height:        `${b.size}px`,
        opacity:       b.opacity,
        pointerEvents: 'none',
        userSelect:    'none',
        willChange:    'transform',
        objectFit:     'contain',
        // start positioned
        left: `${b.x}px`,
        top:  `${b.y}px`,
        transform: `rotate(${b.rot}deg)`,
      });
      container.appendChild(img);
      return img;
    });

    let t = 0;
    function animate() {
      animRef.current = requestAnimationFrame(animate);
      t += 0.008;

      bubbles.forEach((b, i) => {
        // Exact same motion as original Three.js loop
        b.y   += Math.sin(t + b.phase) * b.amp * 0.005 * H * 0.1;
        b.x   += Math.cos(t * 0.7 + b.phase) * b.speedX * W * 0.01;
        b.rot += b.rotSpeed;

        // Wrap edges
        if (b.y > H + 60)  b.y = -60;
        if (b.y < -60)     b.y = H + 60;
        if (b.x > W + 60)  b.x = -60;
        if (b.x < -60)     b.x = W + 60;

        const el = els[i];
        el.style.left = `${b.x}px`;
        el.style.top  = `${b.y}px`;
        el.style.transform = `rotate(${b.rot}deg)`;
      });
    }

    animate();

    const onResize = () => {
      // reanchor to new viewport on resize
      const nW = window.innerWidth;
      const nH = window.innerHeight;
      bubbles.forEach(b => {
        b.x = (b.x / W) * nW;
        b.y = (b.y / H) * nH;
      });
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      els.forEach(el => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-canvas"
      style={{
        position:      'fixed',
        inset:         0,
        overflow:      'hidden',
        pointerEvents: 'none',
        zIndex:        0,
        opacity:       0.7,
      }}
    />
  );
}