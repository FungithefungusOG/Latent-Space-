export default function About() {
  return (
    <section id="about">
      <div className="container about-inner">
        <div className="about-visual">
          <div className="about-glow-box">
            <div className="about-quote">&quot;The most transformative conversations happen in the spaces between the sessions.&quot;</div>
            <div className="about-author">- Latent Space Alumni</div>
          </div>
        </div>
        <div className="about-text">
          <span className="section-tag">Our Mission</span>
          <h2>Built for those<br />building the future</h2>
          <p>Latent Space was born from a simple belief: the people building and thinking about AI need time and space to connect more deeply, think more clearly, and dream more boldly.</p>
          
          <div style={{ margin: '2rem 0', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid var(--cyan)', borderRadius: '0 8px 8px 0' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem', fontWeight: 600 }}>Who is this for?</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              We are exclusively selecting a diverse, multidisciplinary group of <strong>founders, engineers, product leaders, designers, writers, and artists</strong>. Whether you write code, craft products, or explore the creative frontier, if you are actively pushing the boundaries of AI, this Founding Cohort is for you.
            </p>
          </div>

          <p>Every detail is curated - the attendees, the setting, the schedule - so that every moment has the potential to shift how you see your work and the world.</p>
          <ul className="about-list">
            <li><span>✦</span> Invitation-only application process</li>
            <li><span>✦</span> Max 10 attendees per cohort</li>
            <li><span>✦</span> Hosted at a secluded villa in the Galician countryside</li>
            <li><span>✦</span> Not a series of lectures, but a continuous learning experience</li>
          </ul>
          <a href="#waitlist" className="btn-primary">Apply to Attend</a>
        </div>
      </div>
    </section>
  );
}
