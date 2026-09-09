'use client';
import { useEffect, useRef } from 'react';

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const NODES = 72;
    const MAX_DIST = 160;
    const MOUSE_RADIUS = 200;
    const nodes: Node[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < NODES; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        // Mouse repulsion
        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          n.vx += (dx / dist) * force * 0.6;
          n.vy += (dy / dist) * force * 0.6;
          // clamp speed
          const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
          if (speed > 3) { n.vx = (n.vx / speed) * 3; n.vy = (n.vy / speed) * 3; }
        } else {
          n.vx *= 0.99; n.vy *= 0.99; // damping
        }
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const nearMouse = Math.sqrt(dx * dx + dy * dy) < MOUSE_RADIUS;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + (nearMouse ? 1.5 : 0), 0, Math.PI * 2);
        ctx.fillStyle = nearMouse ? 'rgba(6,182,212,0.9)' : 'rgba(167,139,250,0.7)';
        if (nearMouse) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(6,182,212,0.8)';
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.6 }}
    />
  );
}
