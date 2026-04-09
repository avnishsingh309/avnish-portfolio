import { useState } from 'react';
import { useInView } from '../hooks/useInView';

/* ── Animated Resume Download Button (also used in About) ── */
function ResumeBtn({ small = false }) {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 4;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(iv);
        const link = document.createElement('a');
        link.href = '/Avnish_Singh_Resume.pdf';
        link.download = 'Avnish_Singh_Resume.pdf';
        link.click();
        setTimeout(() => { setClicked(false); setProgress(0); }, 2200);
      }
    }, 22);
  };

  const pad = small ? '9px 20px' : '11px 26px';
  const fsize = small ? '.82rem' : '.9rem';

  return (
    <>
      <style>{`
        @keyframes shimmerA { 0%{transform:translateX(-100%) skewX(-20deg);} 100%{transform:translateX(300%) skewX(-20deg);} }
        @keyframes bounceA { 0%,100%{transform:translateY(0);} 50%{transform:translateY(3px);} }
      `}</style>
      <button
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'relative', overflow: 'hidden',
          padding: pad, borderRadius: 10,
          border: '1px solid',
          borderColor: hover ? 'var(--a2)' : 'rgba(0,229,176,.45)',
          background: hover ? 'rgba(0,229,176,.12)' : 'rgba(0,229,176,.06)',
          color: 'var(--a2)',
          fontFamily: 'var(--fb)', fontSize: fsize, fontWeight: 600,
          cursor: 'none',
          boxShadow: hover ? '0 0 24px rgba(0,229,176,.2)' : 'none',
          transition: 'all .3s',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          minWidth: small ? 150 : 175, justifyContent: 'center',
        }}
      >
        {hover && !clicked && (
          <span style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(0,229,176,.15),transparent)', animation:'shimmerA 1.2s ease infinite', pointerEvents:'none' }}/>
        )}
        {clicked && (
          <span style={{ position:'absolute', left:0, top:0, bottom:0, width:`${progress}%`, background:'rgba(0,229,176,.18)', transition:'width .05s linear', borderRadius:10 }}/>
        )}
        <span style={{ fontSize:'1rem', animation: hover && !clicked ? 'bounceA 1s ease infinite' : 'none', position:'relative', zIndex:1 }}>
          {clicked && progress < 100 ? '⏳' : clicked ? '✅' : '↓'}
        </span>
        <span style={{ position:'relative', zIndex:1 }}>
          {clicked && progress < 100 ? `${progress}%` : clicked ? 'Downloaded!' : 'Resume'}
        </span>
      </button>
    </>
  );
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(40px)',
      transition: `opacity .7s ${delay}s ease, transform .7s ${delay}s ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

const STATS =[
  ['Problem Solver'],
  ['Web Developer'],
  ['BTech', 'CS Final Year'],
  ['Noida', 'India'],
];

const TAGS = [
  { text: 'React Developer', color: 'var(--a2)', border: 'rgba(0,229,176,.3)', pos: { top: '10%', right: '-8%' }, delay: '0s' },
  { text: 'ML Enthusiast',   color: 'var(--a1)', border: 'rgba(108,71,255,.3)', pos: { bottom: '15%', left: '-12%' }, delay: '1.5s' },
  { text: 'UI Designer',     color: 'var(--a3)', border: 'rgba(255,77,143,.3)', pos: { top: '55%', right: '-18%' }, delay: '.8s' },
];

export default function About() {
  return (
    <section id="about" style={{ padding: '7rem 2rem', maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal>
        <div style={{ fontSize: '.72rem', color: 'var(--a1)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '.75rem', fontWeight: 600 }}>Who I Am</div>
        <h2 style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: 'clamp(2rem,5vw,3.2rem)', lineHeight: 1.1, marginBottom: '3.5rem' }}>
          About{' '}
          <span style={{ background: 'linear-gradient(135deg,var(--a1),var(--a2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Me
          </span>
        </h2>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '4rem', alignItems: 'center' }}>

        {/* Left: text */}
        <div>
          {[
            "Hi! I'm <b>Avnish Singh</b>, a Web Developer, Designer, and Creator — bringing ideas to life through code, creativity, and clean design.",
            "I'm a final-year <b>BTech Computer Science</b> student with hands-on experience building web applications using HTML, CSS, JavaScript, and React. I love crafting interfaces that feel alive.",
            "I also work on <b>machine learning projects</b> and love solving algorithmic challenges on LeetCode. Currently open to internships and full-time opportunities.",
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.1} style={{ marginBottom: '1.25rem' }}>
              <p style={{ color: 'var(--muted)', lineHeight: 1.95, fontSize: '.97rem' }}
                dangerouslySetInnerHTML={{ __html: t.replace(/<b>(.*?)<\/b>/g, '<span style="color:var(--txt);font-weight:600">$1</span>') }}
              />
            </Reveal>
          ))}

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
            {STATS.map(([v, l], i) => (
              <Reveal key={l} delay={i * 0.1}>
                <div
                  style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem 1rem', textAlign: 'center', transition: 'transform .3s, border-color .3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(108,71,255,.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <div style={{ fontFamily: 'var(--fh)', fontSize: '2.2rem', fontWeight: 700, background: 'linear-gradient(135deg,var(--a1),var(--a2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '.8rem', marginTop: 4 }}>{l}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Buttons */}
          <Reveal delay={0.4} style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="mailto:avnishsinghrajput309@gmail.com"
              style={{ display: 'inline-block', background: 'var(--a1)', color: '#fff', padding: '11px 26px', borderRadius: 10, textDecoration: 'none', fontFamily: 'var(--fb)', fontSize: '.9rem', fontWeight: 600, transition: 'opacity .2s', cursor: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >Hire Me</a>
            <a href="https://github.com/avnishsingh309" target="_blank" rel="noreferrer"
              style={{ display: 'inline-block', background: 'transparent', border: '1px solid var(--border)', color: 'var(--txt)', padding: '11px 26px', borderRadius: 10, textDecoration: 'none', fontSize: '.9rem', fontFamily: 'var(--fb)', transition: 'border-color .2s', cursor: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--a1)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >GitHub ↗</a>
            <ResumeBtn small />
          </Reveal>
        </div>

        {/* Right: avatar */}
        <Reveal delay={0.2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 260, height: 260, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(108,71,255,.2),rgba(0,229,176,.2))', border: '1px solid rgba(108,71,255,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'rotGlow 8s infinite' }}>
              <div style={{ width: 220, height: 220, borderRadius: '50%', background: 'var(--card)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <div style={{ fontFamily: 'var(--fh)', fontSize: '4rem', fontWeight: 700, background: 'linear-gradient(135deg,var(--a1),var(--a2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AS</div>
                <div style={{ color: 'var(--muted)', fontSize: '.8rem' }}>Full Stack Dev</div>
              </div>
            </div>
            {TAGS.map((t, i) => (
              <div key={i} style={{
                position: 'absolute', background: 'var(--card)', border: `1px solid ${t.border}`,
                borderRadius: 10, padding: '8px 14px', fontSize: '.78rem', fontWeight: 600,
                color: t.color, whiteSpace: 'nowrap',
                animation: `float1 4s ease-in-out ${t.delay} infinite`,
                ...t.pos,
              }}>{t.text}</div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
