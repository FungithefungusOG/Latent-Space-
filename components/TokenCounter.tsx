'use client';
import { useEffect, useRef, useState } from 'react';

// Starts at a "believable" large number and keeps ticking up
const BASE = 3_847_291_042;
const TICK_MIN = 800;
const TICK_MAX = 4200;

function formatNumber(n: number) {
  return n.toLocaleString('en-US');
}

export default function TokenCounter() {
  const [count, setCount] = useState(BASE);
  const [delta, setDelta] = useState(0);
  const [flash, setFlash] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = () => {
      const inc = Math.floor(Math.random() * (TICK_MAX - TICK_MIN) + TICK_MIN);
      setCount(c => c + inc);
      setDelta(inc);
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
      // random interval between 80ms and 400ms
      timerRef.current = setTimeout(tick, Math.random() * 320 + 80);
    };
    timerRef.current = setTimeout(tick, 600);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="token-counter">
      <div className="token-counter-inner">
        <span className="token-dot"></span>
        <span className="token-label">tokens processed</span>
        <span className={`token-value${flash ? ' token-flash' : ''}`}>{formatNumber(count)}</span>
        {delta > 0 && <span className={`token-delta${flash ? ' token-delta-show' : ''}`}>+{formatNumber(delta)}</span>}
      </div>
    </div>
  );
}
