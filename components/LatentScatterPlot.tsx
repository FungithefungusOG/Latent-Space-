'use client';
import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number; y: number;
  label: string; cluster: number;
  baseX: number; baseY: number;
}

const CLUSTERS = [
  { cx: 0.22, cy: 0.28, color: '#a78bfa', label: 'Creativity' },
  { cx: 0.72, cy: 0.22, color: '#06b6d4', label: 'Reasoning' },
  { cx: 0.55, cy: 0.65, color: '#3b82f6', label: 'Memory' },
  { cx: 0.18, cy: 0.72, color: '#f59e0b', label: 'Perception' },
  { cx: 0.82, cy: 0.70, color: '#10b981', label: 'Language' },
];

const CONCEPT_LABELS = [
  ['Imagination','Synthesis','Metaphor','Artistry','Inspiration'],
  ['Logic','Inference','Deduction','Proof','Analysis'],
  ['Recall','Context','Embedding','Storage','Retrieval'],
  ['Vision','Audio','Sensing','Grounding','Embodiment'],
  ['Semantics','Grammar','Translation','Generation','Dialogue'],
];

function generatePoints(): Point[] {
  const pts: Point[] = [];
  CLUSTERS.forEach((c, ci) => {
    CONCEPT_LABELS[ci].forEach((label, li) => {
      const angle = (li / CONCEPT_LABELS[ci].length) * Math.PI * 2;
      const r = 0.06 + Math.random() * 0.07;
      pts.push({
        x: c.cx + Math.cos(angle) * r,
        y: c.cy + Math.sin(angle) * r,
        baseX: c.cx + Math.cos(angle) * r,
        baseY: c.cy + Math.sin(angle) * r,
        label, cluster: ci,
      });
    });
  });
  return pts;
}

export default function LatentScatterPlot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>(generatePoints());
  const [tooltip, setTooltip] = useState<{ label: string; color: string; x: number; y: number } | null>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (ts: number) => {
      timeRef.current = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = pointsRef.current;

      // gentle drift
      pts.forEach((p, i) => {
        p.x = p.baseX + Math.sin(ts / 2000 + i * 1.3) * 0.012;
        p.y = p.baseY + Math.cos(ts / 2500 + i * 0.9) * 0.012;
      });

      // Draw cluster halos
      CLUSTERS.forEach(c => {
        const cx = c.cx * canvas.width;
        const cy = c.cy * canvas.height;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.12);
        grad.addColorStop(0, c.color + '22');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, canvas.width * 0.12, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw cluster label
      CLUSTERS.forEach(c => {
        const label = c.label.toUpperCase();
        ctx.font = `600 11px Inter, sans-serif`;
        ctx.fillStyle = c.color + 'cc';
        const textWidth = ctx.measureText(label).width;
        const lx = Math.max(4, Math.min(canvas.width - textWidth - 4, c.cx * canvas.width - textWidth / 2));
        const ly = c.cy * canvas.height - canvas.width * 0.10;
        ctx.fillText(label, lx, Math.max(14, ly));
      });

      // Draw connections within clusters (subtle)
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          if (pts[i].cluster !== pts[j].cluster) continue;
          const dx = (pts[i].x - pts[j].x) * canvas.width;
          const dy = (pts[i].y - pts[j].y) * canvas.height;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x * canvas.width, pts[i].y * canvas.height);
            ctx.lineTo(pts[j].x * canvas.width, pts[j].y * canvas.height);
            ctx.strokeStyle = CLUSTERS[pts[i].cluster].color + Math.floor((1 - d / 80) * 40).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw points
      pts.forEach(p => {
        const px = p.x * canvas.width;
        const py = p.y * canvas.height;
        const col = CLUSTERS[p.cluster].color;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.shadowBlur = 8; ctx.shadowColor = col;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / canvas.offsetWidth;
    const my = (e.clientY - rect.top) / canvas.offsetHeight;
    const pts = pointsRef.current;
    let closest: Point | null = null;
    let closestD = 0.035;
    pts.forEach(p => {
      const d = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2);
      if (d < closestD) { closestD = d; closest = p; }
    });
    if (closest) {
      setTooltip({ label: (closest as Point).label, color: CLUSTERS[(closest as Point).cluster].color, x: e.clientX - rect.left, y: e.clientY - rect.top });
    } else {
      setTooltip(null);
    }
  };

  return (
    <section id="latent-viz">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">The Concept</span>
          <h2>The map of<br /><em>machine thought</em></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <p>In AI, a <strong>latent space</strong> is a high-dimensional map where a neural network organizes concepts. When you bring different ideas close together in this space, entirely new connections and breakthroughs emerge. (Hover the clusters below to explore).</p>
            <p>This workshop is designed to do the exact same thing for human intelligence. By bringing founders, engineers, designers, and artists into close proximity in a secluded environment, we create a physical latent space - a place where your ideas collide with others to shape what comes next.</p>
          </div>
        </div>
        <div className="scatter-wrap" ref={containerRef}>
          <canvas ref={canvasRef} onMouseMove={handleMouseMove} onMouseLeave={() => setTooltip(null)} />
          {tooltip && (
            <div className="scatter-tooltip" style={{ left: tooltip.x + 14, top: tooltip.y - 10, borderColor: tooltip.color, color: tooltip.color }}>
              {tooltip.label}
            </div>
          )}
          <div className="scatter-legend">
            {CLUSTERS.map(c => (
              <div key={c.label} className="scatter-legend-item">
                <span style={{ background: c.color }}></span>{c.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
