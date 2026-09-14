'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function Features() {
  const { t, tr } = useLang();
  const f = tr.features;
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll<HTMLElement>('.feature-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt((entry.target as HTMLElement).dataset.index ?? '0');
          setTimeout(() => entry.target.classList.add('visible'), idx * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach(c => { c.classList.add('reveal'); observer.observe(c); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features">
      <div className="container">
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">{t(f.tag)}</span>
          <h2>{t(f.title1)}<br /><em>{t(f.title2)}</em></h2>
          <p>{t(f.subtitle)}</p>
        </div>
        <div className="features-grid" ref={cardsRef}>
          {f.items.map((item, i) => (
            <div className="feature-card" key={i} data-index={i}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{t(item.title)}</h3>
              <p>{t(item.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
