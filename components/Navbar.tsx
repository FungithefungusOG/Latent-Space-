'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LatentSpaceLogo from './LatentSpaceLogo';
import { sendGAEvent } from '@next/third-parties/google';
import { useLang } from '@/context/LanguageContext';
import type { Lang } from '@/lib/translations';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'it', label: 'IT' },
  { code: 'fr', label: 'FR' },
];

export default function Navbar() {
  const { t, tr, lang, setLang } = useLang();
  const n = tr.nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const trackApplyClick = () => {
    sendGAEvent({ event: 'click_apply', location: 'navbar' });
  };

  const selectLang = (l: Lang) => {
    setLang(l);
    setLangOpen(false);
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <Link href="#" style={{ textDecoration: 'none' }}><LatentSpaceLogo /></Link>
          <ul className="nav-links">
            <li><a href="#features">{t(n.experience)}</a></li>
            <li><a href="#about">{t(n.about)}</a></li>
            <li><a href="#testimonials">{t(n.stories)}</a></li>
            <li><a href="#pricing">{t(n.pricing)}</a></li>
            <li><a href="#contact">{t(n.contact)}</a></li>
          </ul>

          {/* Language Switcher */}
          <div className="lang-switcher" style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#e4e4e7',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {lang.toUpperCase()} ▾
            </button>
            {langOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                background: '#111',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                overflow: 'hidden',
                zIndex: 999,
                minWidth: '70px',
              }}>
                {LANGS.map(l => (
                  <button
                    key={l.code}
                    onClick={() => selectLang(l.code)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 14px',
                      background: lang === l.code ? 'rgba(0,229,255,0.08)' : 'transparent',
                      color: lang === l.code ? 'var(--cyan)' : '#e4e4e7',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a className="btn-nav" href="#waitlist" onClick={trackApplyClick}>{t(n.apply)}</a>
          <button className="burger" id="burger" aria-label="Toggle menu" onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        <ul>
          <li><a href="#features" onClick={closeMenu}>{t(n.experience)}</a></li>
          <li><a href="#about" onClick={closeMenu}>{t(n.about)}</a></li>
          <li><a href="#testimonials" onClick={closeMenu}>{t(n.stories)}</a></li>
          <li><a href="#pricing" onClick={closeMenu}>{t(n.pricing)}</a></li>
          <li><a href="#contact" onClick={closeMenu}>{t(n.contact)}</a></li>
          <li style={{ display: 'flex', gap: '8px', padding: '8px 0' }}>
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => { selectLang(l.code); closeMenu(); }}
                style={{
                  background: lang === l.code ? 'rgba(0,229,255,0.12)' : 'rgba(255,255,255,0.05)',
                  color: lang === l.code ? 'var(--cyan)' : '#e4e4e7',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                {l.label}
              </button>
            ))}
          </li>
          <li>
            <a
              href="#waitlist"
              className="btn-nav"
              onClick={() => { toggleMenu(); trackApplyClick(); }}
            >
              {t(n.apply)}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
