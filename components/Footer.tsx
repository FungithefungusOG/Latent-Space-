import LatentSpaceLogo from './LatentSpaceLogo';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="container footer-inner">
        <div className="footer-brand">
          <LatentSpaceLogo />
          <p>Spain&apos;s premier AI workshop space for those building the future.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram" id="social-instagram">IG</a>
            <a href="#" aria-label="Email" id="social-email">@</a>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Retreat</h4>
            <a href="#features">Experience</a>
            <a href="#about">About</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="footer-col">
            <h4>Community</h4>
            <a href="#testimonials">Stories</a>
            <a href="#waitlist">Apply</a>
            <a href="#">Alumni Network</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Latent Space. All rights reserved. Crafted with intention.</p>
      </div>
    </footer>
  );
}
