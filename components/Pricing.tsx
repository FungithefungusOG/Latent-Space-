export default function Pricing() {
  return (
    <section id="pricing">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Pricing</span>
          <h2>Simple,<br /><em>all-inclusive.</em></h2>
          <p>One ticket. Everything included. No hidden tiers, no upsells, just the full Latent Space experience.</p>
        </div>
        <div className="pricing-single">
          <div className="pricing-card pricing-card--featured">
            <div className="pricing-badge">All-Inclusive</div>
            <div className="pricing-tier">Latent Space Pass</div>
            <div className="pricing-price">€400</div>
            <div className="pricing-note">per person · all-inclusive</div>
            <ul className="pricing-features">
              <li>✓ Full retreat access (5 days, 4 nights)</li>
              <li>✓ All sessions &amp; workshops</li>
              <li>✓ Meals &amp; accommodation</li>
              <li>✓ Community dinners</li>
              <li>✓ Fireside chats &amp; deep dives</li>
              <li>✓ Small-group collaborative sessions</li>
              <li>✓ Swag kit &amp; digital resources</li>
            </ul>
            <a href="#waitlist" className="btn-primary" id="pricing-main">Apply Now →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
