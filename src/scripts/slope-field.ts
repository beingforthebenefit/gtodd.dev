// The hero's slope field: short segments show the direction of a vector
// field, and a handful of particles integrate it (Euler steps) to trace
// solution curves. Near the pointer the field turns into an inward spiral.

type Vec = [number, number];

interface Particle {
  x: number;
  y: number;
  age: number;
  trail: Vec[];
}

const INK = '30,42,68';
const ACCENT = '184,57,31';
const TRAIL = 90;
const SWIRL_RADIUS = 170;

export function mountSlopeField(canvas: HTMLCanvasElement, host: HTMLElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0;
  let height = 0;
  let spacing = 30;
  let wide = true;
  let particles: Particle[] = [];
  let pointer: { x: number; y: number } | null = null;
  const focus = { x: 0, y: 0 };
  let raf = 0;
  let visible = true;

  const spawn = (): Particle => ({
    x: wide ? width * (0.35 + Math.random() * 0.65) : Math.random() * width,
    y: Math.random() * height,
    age: Math.floor(Math.random() * 200),
    trail: [],
  });

  // Keep the field quiet where the text sits: fade toward the left on wide
  // layouts, toward the top on narrow ones where the text stacks above it.
  const strength = (x: number, y: number): number => {
    const t = wide ? (x - width * 0.38) / (width * 0.26) : (y - height * 0.45) / (height * 0.35);
    return Math.max(0.08, Math.min(1, t));
  };

  const field = (x: number, y: number, t: number): Vec => {
    const s = 0.6 * Math.sin(x * 0.0045 + t * 0.00018) + 0.35 * Math.cos(y * 0.007 - t * 0.00012);
    const norm = Math.hypot(1, s);
    const bx = 1 / norm;
    const by = s / norm;
    const dx = x - focus.x;
    const dy = y - focus.y;
    const d = Math.hypot(dx, dy) || 1;
    const w = Math.exp(-(d * d) / (2 * SWIRL_RADIUS * SWIRL_RADIUS));
    const sx = (-dy / d) * 0.9 - (dx / d) * 0.35;
    const sy = (dx / d) * 0.9 - (dy / d) * 0.35;
    const vx = (1 - w) * bx + w * sx;
    const vy = (1 - w) * by + w * sy;
    const l = Math.hypot(vx, vy) || 1;
    return [vx / l, vy / l];
  };

  const resize = (): void => {
    const rect = host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    wide = width >= 900;
    spacing = width < 600 ? 26 : 30;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(18, Math.max(8, (width * height) / 60000)));
    particles = Array.from({ length: count }, spawn);
    if (!pointer) {
      focus.x = width * (wide ? 0.72 : 0.5);
      focus.y = height * (wide ? 0.5 : 0.72);
    }
  };

  const draw = (t: number, step: boolean): void => {
    const idle = wide
      ? { x: width * 0.72 + Math.cos(t * 0.0002) * width * 0.15, y: height * 0.5 + Math.sin(t * 0.00031) * height * 0.22 }
      : { x: width * 0.5 + Math.cos(t * 0.0002) * width * 0.3, y: height * 0.74 + Math.sin(t * 0.00031) * height * 0.12 };
    const goal = pointer ?? idle;
    const ease = pointer ? 0.08 : 0.02;
    focus.x += (goal.x - focus.x) * ease;
    focus.y += (goal.y - focus.y) * ease;

    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = 'round';

    const bands = 6;
    const paths = Array.from({ length: bands }, () => new Path2D());
    const half = spacing * 0.27;
    for (let y = spacing / 2; y < height; y += spacing) {
      for (let x = spacing / 2; x < width; x += spacing) {
        const [vx, vy] = field(x, y, t);
        const band = Math.min(bands - 1, Math.floor(strength(x, y) * bands));
        paths[band].moveTo(x - vx * half, y - vy * half);
        paths[band].lineTo(x + vx * half, y + vy * half);
      }
    }
    ctx.lineWidth = 1.2;
    paths.forEach((path, band) => {
      ctx.strokeStyle = `rgba(${INK},${((0.55 * (band + 1)) / bands).toFixed(3)})`;
      ctx.stroke(path);
    });

    ctx.lineWidth = 1.8;
    particles.forEach((p, i) => {
      if (step) {
        const [vx, vy] = field(p.x, p.y, t);
        p.x += vx * 1.8;
        p.y += vy * 1.8;
        p.age += 1;
        p.trail.push([p.x, p.y]);
        if (p.trail.length > TRAIL) p.trail.shift();
        if (p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20 || p.age > 520) {
          particles[i] = spawn();
          return;
        }
      }
      if (p.trail.length < 2) return;
      ctx.strokeStyle = `rgba(${ACCENT},${(0.85 * strength(p.x, p.y)).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(p.trail[0][0], p.trail[0][1]);
      for (let j = 1; j < p.trail.length; j++) ctx.lineTo(p.trail[j][0], p.trail[j][1]);
      ctx.stroke();
    });
  };

  // Reduced motion: integrate the curves once, off screen, and show a still.
  const still = (): void => {
    for (let i = 0; i < TRAIL; i++) draw(0, true);
  };

  const loop = (t: number): void => {
    draw(t, true);
    raf = requestAnimationFrame(loop);
  };

  const start = (): void => {
    cancelAnimationFrame(raf);
    if (reduceMotion.matches) still();
    else if (visible && !document.hidden) raf = requestAnimationFrame(loop);
  };

  const toLocal = (e: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  host.addEventListener('pointermove', (e) => {
    pointer = toLocal(e);
  });
  host.addEventListener('pointerdown', (e) => {
    pointer = toLocal(e);
  });
  // A mouse lets go when it leaves; a finger's swirl lingers for a moment
  // after the tap, since touch has no hover to keep it there.
  let release = 0;
  const letGo = (e: PointerEvent): void => {
    window.clearTimeout(release);
    if (e.pointerType !== 'mouse') release = window.setTimeout(() => (pointer = null), 2500);
    else if (e.type === 'pointerleave') pointer = null;
  };
  host.addEventListener('pointerleave', letGo);
  host.addEventListener('pointerup', letGo);
  host.addEventListener('pointercancel', letGo);

  new ResizeObserver(() => {
    resize();
    if (reduceMotion.matches) still();
  }).observe(host);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else cancelAnimationFrame(raf);
  }).observe(host);

  document.addEventListener('visibilitychange', start);
  reduceMotion.addEventListener('change', start);

  resize();
  start();
}
