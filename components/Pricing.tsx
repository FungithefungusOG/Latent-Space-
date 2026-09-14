'use client';
import { useLang } from '@/context/LanguageContext';
import { sendGAEvent } from '@next/third-parties/google';

export default function Pricing() {
  const { t, tr } = useLang();
  const p = tr.pricing;
  return (
    <section id="pricing">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t(p.tag)}</span>
          <h2>{t(p.title1)}<br /><em>{t(p.title2)}</em></h2>
          <p>{t(p.subtitle)}</p>
        </div>
        <div className="pricing-single">
          <div className="pricing-card pricing-card--featured">
            <div className="pricing-badge">{t(p.badge)}</div>
            <div className="pricing-tier">{t(p.tier)}</div>
            <div className="pricing-price">€400</div>
            <div className="pricing-note">{t(p.note)}</div>
            <ul className="pricing-features">
              <li>✓ {t(p.f1)}</li>
              <li>✓ {t(p.f2)}</li>
              <li>✓ {t(p.f3)}</li>
              <li>✓ {t(p.f4)}</li>
              <li>✓ {t(p.f5)}</li>
              <li>✓ {t(p.f6)}</li>
              <li>✓ {t(p.f7)}</li>
            </ul>
            <a
              href="#waitlist"
              className="btn-primary"
              id="pricing-main"
              onClick={() => sendGAEvent({ event: 'click_apply', location: 'pricing' })}
            >
              {t(p.cta)}
            </a>
            <p className="pricing-spots">{t(p.spots)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
