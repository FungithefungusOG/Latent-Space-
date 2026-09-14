'use client';
import { useLang } from '@/context/LanguageContext';

export default function Testimonials() {
  const { t, tr } = useLang();
  const ts = tr.testimonials;
  return (
    <section id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t(ts.tag)}</span>
          <h2>{t(ts.title1)}<br /><em>{t(ts.title2)}</em></h2>
        </div>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', padding: '40px 20px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <p style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: 1.6 }}>
            {t(ts.body)}
          </p>
        </div>
      </div>
    </section>
  );
}
