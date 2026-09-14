'use client';
import { useState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { useLang } from '@/context/LanguageContext';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const initialForm = { name: '', email: '', phone: '', linkedinUrl: '', aiUsage: '', aiUsageOther: '', why: '' };

export default function Waitlist() {
  const { t, tr } = useLang();
  const w = tr.waitlist;
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

      sendGAEvent({ event: 'generate_lead', method: 'waitlist_form' });
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
          <span className="section-tag">{t(w.tag)}</span>
          <h2>{t(w.title1)}<br /><span className="gradient-text">Latent Space</span></h2>
          <p>{t(w.subtitle)}</p>

          <div className="ai-form-container">
            {formState === 'success' ? (
              <div className="ai-success">
                <div className="ai-success-icon">✓</div>
                <h3>{t(w.successTitle)}</h3>
                <p>{t(w.successBody)}</p>
              </div>
            ) : (
              <form className="ai-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">{t(w.labelName)}</label>
                  <input id="name" name="name" type="text" className="ai-input" placeholder="Jane Doe" required value={form.name} onChange={handleChange} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">{t(w.labelEmail)}</label>
                    <input id="email" name="email" type="email" className="ai-input" placeholder="jane@example.com" required value={form.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t(w.labelPhone)}</label>
                    <input id="phone" name="phone" type="tel" className="ai-input" placeholder="+1 (555) 000-0000" required value={form.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="linkedinUrl">{t(w.labelLinkedin)}</label>
                  <input id="linkedinUrl" name="linkedinUrl" type="url" className="ai-input" placeholder="https://linkedin.com/in/your-profile" required value={form.linkedinUrl} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="aiUsage">{t(w.labelAiUsage)}</label>
                  <select id="aiUsage" name="aiUsage" className="ai-input ai-select" required value={form.aiUsage} onChange={handleChange}>
                    <option value="" disabled>{t(w.aiSelect)}</option>
                    <option value="casual">{t(w.ai1)}</option>
                    <option value="power">{t(w.ai2)}</option>
                    <option value="builder">{t(w.ai3)}</option>
                    <option value="advanced">{t(w.ai4)}</option>
                    <option value="researcher">{t(w.ai5)}</option>
                    <option value="executive">{t(w.ai6)}</option>
                    <option value="other">{t(w.ai7)}</option>
                  </select>
                </div>

                {form.aiUsage === 'other' && (
                  <div className="form-group">
                    <label htmlFor="aiUsageOther">{t(w.labelOther)}</label>
                    <input id="aiUsageOther" name="aiUsageOther" type="text" className="ai-input" placeholder="Tell us more..." required value={form.aiUsageOther} onChange={handleChange} />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="why">{t(w.labelWhy)}</label>
                  <textarea id="why" name="why" className="ai-input" placeholder={t(w.placeholderWhy)} rows={3} required value={form.why} onChange={handleChange}></textarea>
                </div>

                {error && <div className="ai-error">{error}</div>}

                <button type="submit" className="ai-submit" disabled={formState === 'loading'}>
                  {formState === 'loading' ? (
                    <span className="loading-spinner">{t(w.processing)}</span>
                  ) : (
                    t(w.submit)
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
