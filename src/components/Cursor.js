import { useState, useEffect, useRef } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const [ringPos, setRingPos] = useState({ x: -200, y: -200 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);

    let raf;
    const animate = () => {
      ring.current.x += (pos.x - ring.current.x) * 0.15;
      ring.current.y += (pos.y - ring.current.y) * 0.15;
      setRingPos({ x: Math.round(ring.current.x), y: Math.round(ring.current.y) });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const over = (e) => { if (e.target.closest('a,button,[data-hover]')) setBig(true); };
    const out  = (e) => { if (e.target.closest('a,button,[data-hover]')) setBig(false); };
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, [pos]);

  return (
    <>
      <div style={{
        position: 'fixed', left: pos.x, top: pos.y,
        width: 8, height: 8, borderRadius: '50%',
        background: 'var(--a1)',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', zIndex: 9999,
      }} />
      <div style={{
        position: 'fixed', left: ringPos.x, top: ringPos.y,
        width: big ? 52 : 32, height: big ? 52 : 32,
        borderRadius: '50%',
        border: `1.5px solid rgba(108,71,255,${big ? '.9' : '.5'})`,
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', zIndex: 9998,
        transition: 'width .2s, height .2s, border-color .2s',
      }} />
    </>
  );
}
