'use client';
import { useState } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const initialForm = { name: '', email: '', phone: '', linkedinUrl: '', aiUsage: '', aiUsageOther: '', why: '' };

export default function Waitlist() {
  const [form, setForm] = useState(initialForm);
  const [formState, setFormState] = useState<FormState>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setError('');

    const payload = {
      ...form,
      aiUsage: form.aiUsage === 'other' ? `Other: ${form.aiUsageOther}` : form.aiUsage,
    };

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong');
      setFormState('success');
    } catch (err: unknown) {
      setFormState('error');
      setError(err instanceof Error ? err.message : 'Connection error.');
    }
  };

  return (
    <section id="waitlist">
      <div className="container">
        <div className="waitlist-inner">
          <div className="waitlist-orb"></div>
          <span className="section-tag">Apply Now</span>
          <h2>Step into<br /><span className="gradient-text">Latent Space</span></h2>
          <p>We are looking for builders across all disciplines - from engineering and product to design and art. Space in the Founding Cohort is extremely limited to only 10 spots. You will leave with new mental models, potential collaborators, and 9 lifelong allies in the AI space. Applications are reviewed personally.</p>

          <div className="ai-form-container">
            {formState === 'success' ? (
              <div className="ai-success">
                <div className="ai-success-icon">✓</div>
                <h3>Application Received</h3>
                <p>We review all applications personally. If you&apos;re selected, we&apos;ll reach out to schedule a brief interview. You&apos;ll hear back within 5 business days.</p>
              </div>
            ) : (
              <form className="ai-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" className="ai-input" placeholder="Jane Doe" required value={form.name} onChange={handleChange} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" className="ai-input" placeholder="jane@example.com" required value={form.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" className="ai-input" placeholder="+1 (555) 000-0000" required value={form.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="linkedinUrl">LinkedIn Profile URL</label>
                  <input id="linkedinUrl" name="linkedinUrl" type="url" className="ai-input" placeholder="https://linkedin.com/in/your-profile" required value={form.linkedinUrl} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="aiUsage">How do you currently use AI?</label>
                  <select id="aiUsage" name="aiUsage" className="ai-input ai-select" required value={form.aiUsage} onChange={handleChange}>
                    <option value="" disabled>Select an option...</option>
                    <option value="casual">🟡 I use tools like ChatGPT for everyday tasks</option>
                    <option value="power">🟠 I use AI daily to boost my work</option>
                    <option value="builder">🔵 I build AI-powered features or automations</option>
                    <option value="advanced">🟣 I design AI workflows and agent pipelines</option>
                    <option value="researcher">🔴 I train, fine-tune, or research AI models</option>
                    <option value="executive">⚫ I lead AI strategy, invest, or advise AI companies</option>
                    <option value="other">✏️ Other</option>
                  </select>
                </div>

                {form.aiUsage === 'other' && (
                  <div className="form-group">
                    <label htmlFor="aiUsageOther">Please describe how you use AI</label>
                    <input id="aiUsageOther" name="aiUsageOther" type="text" className="ai-input" placeholder="Tell us more..." required value={form.aiUsageOther} onChange={handleChange} />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="why">Why do you want to attend Latent Space?</label>
                  <textarea id="why" name="why" className="ai-input" placeholder="Tell us about what you're building..." rows={3} required value={form.why} onChange={handleChange}></textarea>
                </div>

                {error && <div className="ai-error">{error}</div>}

                <button type="submit" className="ai-submit" disabled={formState === 'loading'}>
                  {formState === 'loading' ? (
                    <span className="loading-spinner">Processing...</span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
