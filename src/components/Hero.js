import { useState, useEffect } from 'react';
import { SOCIALS, TYPEWRITER_TITLES } from '../data';

/* ── Animated Resume Download Button ── */
function ResumeBtn() {
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
        // Place your resume PDF in /public folder as 'Avnish_Singh_Resume.pdf'
        const link = document.createElement('a');
        link.href = '/Avnish_Singh_Resume.pdf';
        link.download = 'Avnish_Singh_Resume.pdf';
        link.click();
        setTimeout(() => { setClicked(false); setProgress(0); }, 2200);
      }
    }, 22);
  };

  return (
    <>
      <style>{`
        @keyframes shimmer { 0% { transform:translateX(-100%) skewX(-20deg); } 100% { transform:translateX(300%) skewX(-20deg); } }
        @keyframes bounceDown { 0%,100% { transform:translateY(0); } 50% { transform:translateY(3px); } }
      `}</style>
      <button
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'relative', overflow: 'hidden',
          padding: '14px 32px', borderRadius: 12,
          border: '1px solid',
          borderColor: hover ? 'var(--a2)' : 'rgba(0,229,176,.45)',
          background: hover ? 'rgba(0,229,176,.12)' : 'rgba(0,229,176,.06)',
          color: 'var(--a2)',
          fontFamily: 'var(--fb)', fontSize: '.95rem', fontWeight: 600,
          cursor: 'none',
          boxShadow: hover ? '0 0 28px rgba(0,229,176,.25)' : 'none',
          transition: 'all .3s',
          display: 'inline-flex', alignItems: 'center', gap: 10,
          minWidth: 190, justifyContent: 'center',
        }}
      >
        {hover && !clicked && (
          <span style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(0,229,176,.15),transparent)', animation:'shimmer 1.2s ease infinite', pointerEvents:'none' }}/>
        )}
        {clicked && (
          <span style={{ position:'absolute', left:0, top:0, bottom:0, width:`${progress}%`, background:'rgba(0,229,176,.18)', transition:'width .05s linear', borderRadius:12 }}/>
        )}
        <span style={{ fontSize:'1.1rem', animation: hover && !clicked ? 'bounceDown 1s ease infinite' : 'none', position:'relative', zIndex:1 }}>
          {clicked && progress < 100 ? '⏳' : clicked ? '✅' : '↓'}
        </span>
        <span style={{ position:'relative', zIndex:1 }}>
          {clicked && progress < 100 ? `Downloading… ${progress}%` : clicked ? 'Downloaded!' : 'Download Resume'}
        </span>
      </button>
    </>
  );
}


export default function Hero() {
  const [typed, setTyped] = useState('');
  const [ti, setTi] = useState(0);

  useEffect(() => {
    let i = 0, mounted = true;
    const t = TYPEWRITER_TITLES[ti];
    const fwd = setInterval(() => {
      if (!mounted) return;
      setTyped(t.slice(0, i + 1)); i++;
      if (i === t.length) {
        clearInterval(fwd);
        setTimeout(() => {
          let j = t.length;
          const bk = setInterval(() => {
            if (!mounted) return;
            setTyped(t.slice(0, j - 1)); j--;
            if (j === 0) { clearInterval(bk); if (mounted) setTi(p => (p + 1) % TYPEWRITER_TITLES.length); }
          }, 45);
        }, 1500);
      }
    }, 90);
    return () => { mounted = false; clearInterval(fwd); };
  }, [ti]);

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '6rem 2rem 4rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(108,71,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(108,71,255,.05) 1px,transparent 1px)',
        backgroundSize: '50px 50px',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Orbs */}
      {[
        { w:600,h:600,bg:'var(--a1)',top:-200,left:-200,anim:'orbFloat1 12s ease-in-out infinite' },
        { w:500,h:500,bg:'var(--a2)',bottom:-150,right:-150,anim:'orbFloat2 15s ease-in-out infinite' },
        { w:300,h:300,bg:'var(--a3)',top:'40%',left:'50%',anim:'orbFloat3 9s ease-in-out infinite',extra:{transform:'translate(-50%,-50%)'} },
      ].map((o, i) => (
        <div key={i} style={{
          position:'absolute', borderRadius:'50%',
          filter:'blur(80px)', opacity:.13,
          width: o.w, height: o.h,
          background: o.bg,
          top: o.top, left: o.left,
          bottom: o.bottom, right: o.right,
          animation: o.anim,
          pointerEvents:'none', zIndex:0,
          ...o.extra,
        }}/>
      ))}

      {/* Radial glow center */}
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(108,71,255,.08) 0%,transparent 70%)',
        pointerEvents:'none', zIndex:0,
      }}/>

      {/* Content */}
      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center' }}>
        {/* Badge */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'rgba(108,71,255,.1)', border:'1px solid rgba(108,71,255,.3)',
          borderRadius:100, padding:'7px 18px', fontSize:'.78rem',
          color:'var(--a1)', letterSpacing:'1.5px', textTransform:'uppercase',
          marginBottom:'2rem', animation:'fadeUp .6s .1s both',
        }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--a2)', animation:'pulseDot 2s infinite' }}/>
          Open to Work · Delhi, India
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily:'var(--fh)', fontWeight:700,
          fontSize:'clamp(3.5rem,9vw,7rem)', lineHeight:.95,
          letterSpacing:'-2px', animation:'fadeUp .7s .2s both',
        }}>
          Hi, I'm<br/>
          <span style={{
            background:'linear-gradient(135deg,var(--a1) 0%,var(--a2) 50%,var(--a3) 100%)',
            backgroundSize:'300% 300%', animation:'gradMove 5s ease infinite',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          }}>
            Avnish Singh
          </span>
        </h1>

        {/* Typewriter */}
        <div style={{
          height:44, display:'flex', alignItems:'center',
          justifyContent:'center', gap:10,
          margin:'1.2rem 0', animation:'fadeUp .7s .35s both',
        }}>
          <span style={{ color:'var(--a2)', fontFamily:'var(--fh)', fontWeight:700, fontSize:'1.3rem' }}>❯</span>
          <span style={{ fontSize:'clamp(1rem,2.5vw,1.4rem)' }}>{typed}</span>
          <span style={{ color:'var(--a1)', animation:'blinkIt 1s step-start infinite' }}>|</span>
        </div>

        {/* Desc */}
        <p style={{
          maxWidth:520, color:'var(--muted)', lineHeight:1.9, fontSize:'.97rem',
          marginBottom:'2.5rem', animation:'fadeUp .7s .45s both',
        }}>
          BTech Computer Science Final Year Student — Web Developer, Designer &amp; Creator
          bringing ideas to life through code, creativity and clean design.
        </p>

        {/* CTA */}
        <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', justifyContent:'center', animation:'fadeUp .7s .55s both' }}>
          <button
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior:'smooth' })}
            style={{
              background:'var(--a1)', border:'none', color:'#fff',
              padding:'14px 32px', borderRadius:12, fontFamily:'var(--fb)',
              fontSize:'.95rem', fontWeight:600, cursor:'none',
              boxShadow:'0 8px 32px rgba(108,71,255,.35)',
              transition:'transform .2s, box-shadow .2s',
            }}
            onMouseEnter={e => { e.target.style.transform='translateY(-3px)'; e.target.style.boxShadow='0 12px 40px rgba(108,71,255,.55)'; }}
            onMouseLeave={e => { e.target.style.transform='none'; e.target.style.boxShadow='0 8px 32px rgba(108,71,255,.35)'; }}
          >
            View Projects ↓
          </button>

          {/* ── Resume Download Button ── */}
          <ResumeBtn />

          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior:'smooth' }); }}
            style={{
              background:'transparent', border:'1px solid var(--border)', color:'var(--txt)',
              padding:'14px 32px', borderRadius:12, fontFamily:'var(--fb)',
              fontSize:'.95rem', fontWeight:500, cursor:'none', textDecoration:'none',
              display:'inline-flex', alignItems:'center',
              transition:'border-color .2s, box-shadow .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--a1)'; e.currentTarget.style.boxShadow='0 0 0 3px rgba(108,71,255,.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='none'; }}
          >
            Get In Touch
          </a>
        </div>

        {/* Socials */}
        <div style={{ display:'flex', gap:'.85rem', marginTop:'2.5rem', animation:'fadeUp .7s .65s both' }}>
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              style={{
                width:44, height:44, borderRadius:10,
                border:'1px solid var(--border)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'var(--muted)', textDecoration:'none',
                fontSize:'.75rem', fontWeight:700, fontFamily:'var(--fh)',
                transition:'all .25s', cursor:'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=s.color; e.currentTarget.style.color=s.color; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 8px 20px ${s.color}44`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
            >
              {s.short}
            </a>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{
          marginTop:'3.5rem', display:'flex', flexDirection:'column',
          alignItems:'center', gap:6, color:'var(--muted)',
          fontSize:'.72rem', letterSpacing:'2px', textTransform:'uppercase',
          animation:'fadeIn 1s 1.5s both',
        }}>
          <span>scroll</span>
          <div style={{ width:1, height:44, background:'linear-gradient(var(--muted),transparent)', animation:'scrollAnim 2s ease-in-out infinite' }}/>
        </div>
      </div>
    </section>
  );
}
