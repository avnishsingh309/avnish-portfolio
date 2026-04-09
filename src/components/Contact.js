import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { SOCIALS } from '../data';

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: `opacity .7s ${delay}s ease, transform .7s ${delay}s ease`, ...style }}>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) { setErr(true); setTimeout(() => setErr(false), 2000); return; }
    setSending(true);
    // 👉 Replace this timeout with your real Formspree/EmailJS call
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  };

  const reset = () => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); };

  return (
    <section id="contact" style={{ padding: '7rem 2rem', maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal>
        <div style={{ fontSize: '.72rem', color: 'var(--a1)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '.75rem', fontWeight: 600 }}>Say Hello</div>
        <h2 style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: 'clamp(2rem,5vw,3.2rem)', lineHeight: 1.1, marginBottom: '3.5rem' }}>
          Contact{' '}
          <span style={{ background: 'linear-gradient(135deg,var(--a1),var(--a2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Me</span>
        </h2>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)', gap: '3rem', alignItems: 'start' }}>

        {/* Info side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Reveal>
            <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '.95rem' }}>
              I'm open to internships, full-time roles, and interesting projects. Let's build something great together!
            </p>
          </Reveal>

          {[
            { icon: '✉', label: 'Email', val: 'avnishsinghrajput309@gmail.com', href: 'mailto:avnishsinghrajput309@gmail.com' },
            { icon: '📞', label: 'Phone', val: '+91 73181 15109', href: 'tel:7318115109' },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1}>
              <a href={c.href} style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1rem 1.25rem', transition: 'all .25s', cursor: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,71,255,.4)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(108,71,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.95rem', flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ color: 'var(--muted)', fontSize: '.72rem', marginBottom: 2 }}>{c.label}</div>
                  <div style={{ color: 'var(--txt)', fontSize: '.85rem', fontWeight: 500 }}>{c.val}</div>
                </div>
              </a>
            </Reveal>
          ))}

          <Reveal delay={0.25}>
            <p style={{ color: 'var(--muted)', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '.85rem' }}>Find Me Online</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem' }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '.85rem 1rem', textDecoration: 'none', transition: 'all .25s', cursor: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '88'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(108,71,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fh)', fontWeight: 700, fontSize: '.7rem', color: s.color, flexShrink: 0 }}>{s.short}</div>
                  <div>
                    <div style={{ color: 'var(--txt)', fontSize: '.85rem', fontWeight: 500 }}>{s.label}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '.72rem' }}>{s.url}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Form side */}
        <Reveal delay={0.15}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 22, padding: '2.25rem' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ fontFamily: 'var(--fh)', fontSize: '1.4rem', marginBottom: '.6rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.7 }}>
                  Thanks for reaching out, <span style={{ color: 'var(--txt)', fontWeight: 600 }}>{form.name}</span>!<br />
                  I'll reply to <span style={{ color: 'var(--a2)' }}>{form.email}</span> soon.
                </p>
                <button onClick={reset} style={{ marginTop: '1.5rem', background: 'var(--a1)', border: 'none', color: '#fff', padding: '10px 24px', borderRadius: 10, cursor: 'none', fontFamily: 'var(--fb)', fontSize: '.9rem', transition: 'opacity .2s' }}
                  onMouseEnter={e => (e.target.style.opacity = '.85')} onMouseLeave={e => (e.target.style.opacity = '1')}>
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.5rem' }}>Send a Message</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div><label>Name *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Avnish Singh" /></div>
                  <div><label>Email *</label><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" /></div>
                </div>
                <div style={{ marginBottom: '1rem' }}><label>Phone</label><input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" /></div>
                <div style={{ marginBottom: '1.25rem' }}><label>Message *</label><textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell me about your project or opportunity..." /></div>
                <button
                  onClick={handleSend}
                  style={{ width: '100%', background: err ? 'var(--a3)' : sending ? 'var(--border)' : 'linear-gradient(135deg,var(--a1),#5533ee)', border: 'none', color: '#fff', padding: 14, borderRadius: 12, fontFamily: 'var(--fb)', fontSize: '1rem', fontWeight: 600, cursor: 'none', boxShadow: '0 6px 24px rgba(108,71,255,.35)', transition: 'all .2s' }}
                  onMouseEnter={e => !sending && (e.target.style.opacity = '.9')}
                  onMouseLeave={e => (e.target.style.opacity = '1')}
                >
                  {err ? 'Fill required fields!' : sending ? 'Sending…' : 'Send Message →'}
                </button>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
