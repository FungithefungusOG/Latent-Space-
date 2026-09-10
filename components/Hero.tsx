'use client';
import { useEffect, useRef, useState } from 'react';
import NeuralCanvas from './NeuralCanvas';
import { sendGAEvent } from '@next/third-parties/google';


const STREAM_LINE1 = 'Enter the';
const STREAM_LINE2 = 'Latent Space';

function useStreamText(text: string, startDelay = 800, speed = 55) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        // micro-random delay feel
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed + Math.random() * 30);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, startDelay, speed]);
  return { displayed, done };
}

function animateCounter(el: HTMLElement, target: number, suffix: string) {
  const duration = 2000;
  const start = performance.now();
  function update(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const line1 = useStreamText(STREAM_LINE1, 400, 60);
  const line2 = useStreamText(STREAM_LINE2, 400 + STREAM_LINE1.length * 65 + 200, 55);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll<HTMLElement>('.stat-num').forEach(el => {
            const raw = el.textContent?.trim() ?? '';
            const num = parseFloat(raw.replace(/[^\d.]/g, ''));
            const suffix = raw.replace(/[\d.]/g, '');
            if (isNaN(num)) return;
            animateCounter(el, num, suffix);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Cursor glow
  useEffect(() => {
    const glow = document.createElement('div');
    glow.style.cssText = `position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.06),transparent 70%);pointer-events:none;transform:translate(-50%,-50%);transition:left 0.5s ease,top 0.5s ease;z-index:0;mix-blend-mode:screen;`;
    document.body.appendChild(glow);
    const move = (e: MouseEvent) => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; };
    window.addEventListener('mousemove', move);
    return () => { window.removeEventListener('mousemove', move); document.body.removeChild(glow); };
  }, []);

  return (
    <section id="hero">
      <div className="hero-bg">
        <div className="grid-overlay"></div>
        <NeuralCanvas />
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot"></span> Applications open for the Founding Cohort
        </div>
        <h1 className="hero-title">
          <span className="stream-line">
            {line1.displayed}<span className={`stream-cursor${line1.done ? ' stream-cursor-hide' : ''}`}>|</span>
          </span>
          <br />
          <span className="gradient-text stream-line">
            {line2.displayed}<span className={`stream-cursor${line2.done ? ' stream-cursor-hide' : ''}`}>|</span>
          </span>
        </h1>
        <p className="hero-subtitle">
          Spain&apos;s premier AI workshop space, taking place <strong>November 4–8</strong>. An intimate, collaborative environment in the secluded Galician countryside where the brightest builders, researchers, and visionaries step away from the noise and shape what comes next.
        </p>
        <div className="hero-actions">
          <a 
            href="#waitlist" 
            className="btn-primary" 
            id="hero-cta"
            onClick={() => sendGAEvent({ event: 'click_apply', location: 'hero' })}
          >
            Apply for the Retreat
          </a>
          <a href="#about" className="btn-ghost">Learn More ↓</a>
        </div>
        <div className="hero-stats" ref={statsRef}>
          <div className="stat"><span className="stat-num">10</span><span className="stat-label">Curated Attendees</span></div>
          <div className="stat-divider"></div>
          <div className="stat"><span className="stat-num">5</span><span className="stat-label">Days Immersive</span></div>
          <div className="stat-divider"></div>
          <div className="stat"><span className="stat-num" style={{ fontSize: '1.8rem', paddingTop: '0.2rem' }}>Nov 4-8</span><span className="stat-label">Galicia, Spain</span></div>
          <div className="stat-divider"></div>
          <div className="stat"><span className="stat-inf" style={{ fontFamily: 'serif' }}>∞</span><span className="stat-label">Ideas</span></div>
        </div>
      </div>
    </section>
  );
}
