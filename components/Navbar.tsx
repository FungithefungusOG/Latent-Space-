'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LatentSpaceLogo from './LatentSpaceLogo';
import { sendGAEvent } from '@next/third-parties/google';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <Link href="#" style={{ textDecoration: 'none' }}><LatentSpaceLogo /></Link>
          <ul className="nav-links">
            <li><a href="#features">Experience</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#testimonials">Stories</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a className="btn-nav" href="#waitlist" onClick={trackApplyClick}>Apply Now</a>
          <button className="burger" id="burger" aria-label="Toggle menu" onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        <ul>
          <li><a href="#features" onClick={closeMenu}>Experience</a></li>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#testimonials" onClick={closeMenu}>Stories</a></li>
          <li><a href="#pricing" onClick={closeMenu}>Pricing</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          <li>
            <a 
              href="#waitlist" 
              className="btn-nav" 
              onClick={(e) => {
                toggleMenu();
                trackApplyClick();
              }}
            >
              Apply Now
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
