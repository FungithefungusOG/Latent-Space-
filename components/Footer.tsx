'use client';
import LatentSpaceLogo from './LatentSpaceLogo';
import { useLang } from '@/context/LanguageContext';

export default function Footer() {
  const { t, tr } = useLang();
  const f = tr.footer;
  return (
    <footer id="contact">
      <div className="container footer-inner">
        <div className="footer-brand">
          <LatentSpaceLogo />
          <p>{t(f.tagline)}</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/growth.coliving.galicia?stkn=MjM4MGQwaWNpYmxl&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" id="social-instagram">IG</a>
            <a href="#" aria-label="Email" id="social-email">@</a>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>{t(f.retreat)}</h4>
            <a href="#features">{t(f.experience)}</a>
            <a href="#about">{t(f.about)}</a>
            <a href="#pricing">{t(f.pricingLink)}</a>
          </div>
          <div className="footer-col">
            <h4>{t(f.community)}</h4>
            <a href="#testimonials">{t(f.stories)}</a>
            <a href="#waitlist">{t(f.apply)}</a>
            <a href="#">{t(f.alumni)}</a>
          </div>
          <div className="footer-col">
            <h4>{t(f.legal)}</h4>
            <a href="#">{t(f.privacy)}</a>
            <a href="#">{t(f.terms)}</a>
            <a href="#">{t(f.refund)}</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t(f.copy)}</p>
      </div>
    </footer>
  );
}
