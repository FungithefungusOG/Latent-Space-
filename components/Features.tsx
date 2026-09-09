'use client';
import { useEffect, useRef } from 'react';

const features = [
  { icon: '🧠', title: 'Deep-Dive Sessions', desc: 'Intimate collaborative workshops where every attendee brings their perspective to the table. We go beyond the surface, exploring the architectures, philosophies, and futures that matter.' },
  { icon: '🌌', title: 'Immersive Environment', desc: 'Nestled in a secluded villa in the Galician countryside, just 10 minutes from the Portuguese border. Designed to stimulate creativity and deep focus away from the digital noise.' },
  { icon: '💬', title: 'Fireside Chats', desc: 'Unfiltered, unrehearsed conversations between attendees. No keynotes, just raw, honest dialogue around what we\'re all building and where it\'s heading.' },
  { icon: '🔗', title: 'High-Signal Networking', desc: 'No badge scanners. No awkward mixers. Structured connection rituals that build genuine, lasting relationships with people who matter.' },
  { icon: '🤝', title: 'Collaborative Format', desc: 'This is not a passive experience. Every participant is both a learner and a contributor. Your ideas, questions, and perspective are what make Latent Space what it is.' },
  { icon: '🪐', title: 'The Latent Network', desc: 'Connection doesn\'t end when the retreat does. The bonds built over 4 days become the foundation of an ongoing community of people thinking seriously about AI.' },
];

export default function Features() {
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
          <span className="section-tag">The Workshop</span>
          <h2>Not a conference.<br /><em>A collaborative space.</em></h2>
          <p>Every element of Latent Space is designed for hands-on building, deep thinking, and real connection, making it the definitive gathering for AI in Spain.</p>
        </div>
        <div className="features-grid" ref={cardsRef}>
          {features.map((f, i) => (
            <div className="feature-card" key={i} data-index={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
