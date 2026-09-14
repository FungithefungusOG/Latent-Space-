'use client';
import { useLang } from '@/context/LanguageContext';

export default function About() {
  const { t, tr } = useLang();
  const a = tr.about;
  return (
    <section id="about">
      <div className="container about-inner">
        <div className="about-visual">
          <div className="about-glow-box">
            <div className="about-quote">{t(a.quote)}</div>
            <div className="about-author">{t(a.quoteAuthor)}</div>
          </div>
        </div>
        <div className="about-text">
          <span className="section-tag">{t(a.tag)}</span>
          <h2>{t(a.title)}</h2>
          <p>{t(a.p1)}</p>

          <div style={{ margin: '2rem 0', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid var(--cyan)', borderRadius: '0 8px 8px 0' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem', fontWeight: 600 }}>{t(a.whoTitle)}</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }} dangerouslySetInnerHTML={{ __html: t(a.whoDesc) }} />
          </div>

          <p>{t(a.p2)}</p>
          <ul className="about-list">
            <li><span>✦</span> {t(a.list1)}</li>
            <li><span>✦</span> {t(a.list2)}</li>
            <li><span>✦</span> {t(a.list3)}</li>
            <li><span>✦</span> {t(a.list4)}</li>
          </ul>
          <a href="#waitlist" className="btn-primary">{t(a.cta)}</a>
        </div>
      </div>
    </section>
  );
}
