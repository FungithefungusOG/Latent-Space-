const testimonials = [
  {
    quote: '"Latent Space was the most intellectually and emotionally charged week of my career. The conversations I had there led directly to our Series A pitch."',
    name: 'Anya Mirov', role: 'Founder, NeuralDrift',
    initials: 'AM', gradient: 'linear-gradient(135deg,#a855f7,#6366f1)', featured: false,
  },
  {
    quote: '"I\'ve been to every major AI conference. Nothing compares. The signal-to-noise ratio at Latent Space is unlike anything else in the industry."',
    name: 'James Kwan', role: 'Research Lead, Frontier Labs',
    initials: 'JK', gradient: 'linear-gradient(135deg,#06b6d4,#3b82f6)', featured: true,
  },
  {
    quote: '"I came in as a solo engineer with an idea. I left with three co-founders, a product roadmap, and the confidence to actually build it. Life-changing."',
    name: 'Sofia Reyes', role: 'CTO, Meridian AI',
    initials: 'SR', gradient: 'linear-gradient(135deg,#10b981,#14b8a6)', featured: false,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Stories</span>
          <h2>Voices from the<br /><em>space between</em></h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className={`testi-card${t.featured ? ' testi-card--featured' : ''}`}>
              <div className="testi-stars">★★★★★</div>
              <p>{t.quote}</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: t.gradient }}>{t.initials}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
