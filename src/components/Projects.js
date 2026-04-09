import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { PROJECTS } from '../data';

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: `opacity .7s ${delay}s ease, transform .7s ${delay}s ease` }}>
      {children}
    </div>
  );
}

function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--card)' : 'rgba(22,22,48,.6)',
        border: `1px solid ${hov ? 'rgba(108,71,255,.45)' : 'var(--border)'}`,
        borderRadius: 20, padding: '1.75rem',
        transition: 'all .3s',
        transform: visible ? (hov ? 'translateY(-8px)' : 'none') : 'translateY(30px)',
        opacity: visible ? 1 : 0,
        transitionDelay: `${i * 0.07}s`,
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', gap: '1rem',
        cursor: 'none',
        boxShadow: hov ? '0 20px 60px rgba(108,71,255,.15)' : 'none',
      }}
    >
      {hov && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% -30%,rgba(108,71,255,.08),transparent 70%)', pointerEvents: 'none' }} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(108,71,255,.12)', border: '1px solid rgba(108,71,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
          {p.icon}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <a href={p.code} target="_blank" rel="noreferrer"
            style={{ fontSize: '.72rem', color: 'var(--muted)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 7, padding: '5px 12px', fontWeight: 600, transition: 'all .2s', cursor: 'none', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--a1)'; e.currentTarget.style.borderColor = 'var(--a1)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >Code</a>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer"
              style={{ fontSize: '.72rem', color: '#fff', textDecoration: 'none', background: 'var(--a1)', borderRadius: 7, padding: '5px 12px', fontWeight: 600, transition: 'background .2s', cursor: 'none', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#5533ee')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--a1)')}
            >Live ↗</a>
          )}
        </div>
      </div>

      <div style={{ fontFamily: 'var(--fh)', fontSize: '1.05rem', fontWeight: 600, color: hov ? '#a78bfa' : 'var(--txt)', transition: 'color .2s' }}>{p.title}</div>
      <p style={{ color: 'var(--muted)', fontSize: '.875rem', lineHeight: 1.75, flexGrow: 1 }}>{p.desc}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {p.tags.map(t => (
          <span key={t} style={{ fontSize: '.7rem', color: 'var(--a2)', background: 'rgba(0,229,176,.08)', border: '1px solid rgba(0,229,176,.2)', borderRadius: 100, padding: '3px 10px' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '7rem 2rem', maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal>
        <div style={{ fontSize: '.72rem', color: 'var(--a1)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '.75rem', fontWeight: 600 }}>What I've Built</div>
        <h2 style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: 'clamp(2rem,5vw,3.2rem)', lineHeight: 1.1, marginBottom: '3.5rem' }}>
          My{' '}
          <span style={{ background: 'linear-gradient(135deg,var(--a1),var(--a2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</span>
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  );
}
