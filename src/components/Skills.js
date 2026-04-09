import { useInView } from '../hooks/useInView';
import { SKILLS, SKILL_BARS } from '../data';

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: `opacity .7s ${delay}s ease, transform .7s ${delay}s ease`, ...style }}>
      {children}
    </div>
  );
}

function SkillBar({ name, pct, delay }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transition: `opacity .5s ${delay}s ease` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '.88rem' }}>
        <span style={{ color: 'var(--txt)', fontWeight: 500 }}>{name}</span>
        <span style={{ color: 'var(--muted)' }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: 'var(--border)', borderRadius: 100, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: visible ? `${pct}%` : '0%',
          background: 'linear-gradient(90deg,var(--a1),var(--a2))',
          borderRadius: 100,
          transition: `width 1.3s ${delay + 0.2}s cubic-bezier(.4,0,.2,1)`,
        }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const scrollToProjects = (skillName) => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const cards = document.querySelectorAll('[data-project-card]');
      cards.forEach(c => {
        const tags = c.dataset.tags || '';
        const match = tags.toLowerCase().includes(skillName.toLowerCase());
        c.style.transition = 'all .4s';
        c.style.opacity = match ? '1' : '.2';
        c.style.transform = match ? 'scale(1.03)' : 'scale(0.97)';
      });
      setTimeout(() => cards.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; }), 2500);
    }, 800);
  };

  return (
    <section id="skills" style={{ padding: '7rem 2rem', maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal>
        <div style={{ fontSize: '.72rem', color: 'var(--a1)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '.75rem', fontWeight: 600 }}>What I Know</div>
        <h2 style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: 'clamp(2rem,5vw,3.2rem)', lineHeight: 1.1, marginBottom: '3.5rem' }}>
          My{' '}
          <span style={{ background: 'linear-gradient(135deg,var(--a1),var(--a2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
        </h2>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '4rem', alignItems: 'start' }}>

        {/* Bars */}
        <div>
          <Reveal style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.8 }}>Proficiency based on real project experience</p>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {SKILL_BARS.map((b, i) => <SkillBar key={b.name} name={b.name} pct={b.pct} delay={i * 0.1} />)}
          </div>
        </div>

        {/* Tiles */}
        <div>
          <Reveal style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.8 }}>Click any skill → highlights related projects</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '.85rem' }}>
            {SKILLS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <div
                  onClick={() => scrollToProjects(s.name.replace('5','').replace('3',''))}
                  style={{
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 14, padding: '1.2rem .75rem', textAlign: 'center',
                    transition: 'all .3s', cursor: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)'; e.currentTarget.style.borderColor = s.color + '55'; e.currentTarget.style.boxShadow = `0 12px 32px ${s.color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ color: s.color, fontSize: '.7rem', fontWeight: 500 }}>{s.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
