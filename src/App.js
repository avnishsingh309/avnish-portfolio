import { useEffect } from 'react';
import Cursor   from './components/Cursor';
import Nav      from './components/Nav';
import Hero     from './components/Hero';
import About    from './components/About';
import Projects from './components/Projects';
import Skills   from './components/Skills';
import Contact  from './components/Contact';
import Footer   from './components/Footer';

function Divider() {
  return <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,var(--border),transparent)', margin: '0 2rem' }} />;
}

function BackToTop() {
  useEffect(() => {
    const btn = document.getElementById('btt');
    const h = () => btn && (btn.style.opacity = window.scrollY > 400 ? '1' : '0');
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <button
      id="btt"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 400,
        width: 46, height: 46, borderRadius: 12,
        background: 'var(--a1)', border: 'none', color: '#fff',
        fontSize: '1.1rem', cursor: 'none',
        opacity: 0, transition: 'opacity .3s, transform .2s',
        boxShadow: '0 6px 20px rgba(108,71,255,.4)',
      }}
      onMouseEnter={e => (e.target.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.target.style.transform = 'none')}
    >↑</button>
  );
}

export default function App() {
  return (
    <div style={{ position: 'relative' }}>
      <Cursor />
      <Nav />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
