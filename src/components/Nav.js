import { useState, useEffect } from 'react';

const LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      padding: '0 2.5rem', height: 68,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all .3s',
      background: scrolled ? 'rgba(5,5,13,.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
    }}>
      <div style={{
        fontFamily: 'var(--fh)', fontWeight: 700, fontSize: '1.5rem',
        background: 'linear-gradient(90deg, var(--a1), var(--a2))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        letterSpacing: '-.5px', cursor: 'default',
      }}>AS.</div>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
        {LINKS.map((l, i) => (
          <li key={l.label}>
            <a
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              style={{
                color: 'var(--muted)', textDecoration: 'none',
                fontSize: '.9rem', fontWeight: 500,
                transition: 'color .2s', position: 'relative',
                animation: `fadeUp .5s ${i * 0.07}s both`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--txt)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
