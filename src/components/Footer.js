import { SOCIALS } from '../data';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '2.5rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: '1.3rem', background: 'linear-gradient(90deg,var(--a1),var(--a2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '.4rem' }}>
        Avnish Singh
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '.82rem', marginBottom: '1.25rem' }}>
        Web Developer · Designer · Creator · BTech CS Final Year
      </p>
      <div style={{ display: 'flex', gap: '.85rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
        {SOCIALS.map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
            style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', textDecoration: 'none', fontSize: '.72rem', fontWeight: 700, fontFamily: 'var(--fh)', transition: 'all .2s', cursor: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >{s.short}</a>
        ))}
      </div>
      <p style={{ color: 'var(--border)', fontSize: '.75rem' }}>
        © {new Date().getFullYear()} Avnish Singh. All rights reserved. Built with React.
      </p>
    </footer>
  );
}
