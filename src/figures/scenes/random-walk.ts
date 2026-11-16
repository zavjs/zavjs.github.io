import { defineScene } from "../runtime";

/**
 * The drunkard's walk: every walker flips a coin each step and moves up or
 * down by one. No single path is predictable, but the crowd spreads like
 * the square root of time and piles up into a bell curve.
 */
const WALKERS = 40;
const STEPS_PER_SECOND = 30;
const DURATION = 8;
const TOTAL_STEPS = DURATION * STEPS_PER_SECOND;

type State = { paths: Int16Array[]; steps: number; clock: number };

export default defineScene<State>({
  aspect: 16 / 9,
  duration: DURATION,
  loop: true,
  hold: 2.5,
  random: true,

  init: () => ({
    paths: Array.from({ length: WALKERS }, () => new Int16Array(TOTAL_STEPS + 1)),
    steps: 0,
    clock: 0,
  }),

  update(s, dt, _t, { rng }) {
    s.clock += dt;
    while (s.clock >= 1 / STEPS_PER_SECOND && s.steps < TOTAL_STEPS) {
      s.clock -= 1 / STEPS_PER_SECOND;
      for (const p of s.paths) p[s.steps + 1] = p[s.steps] + (rng.coin() ? 1 : -1);
      s.steps++;
    }
  },

  draw(s, { ctx, width, height, theme }) {
    const pad = 16;
    const histW = Math.max(60, width * 0.18);
    const plotW = width - histW - pad * 3;
    const mid = height / 2;
    const range = 3.5 * Math.sqrt(TOTAL_STEPS); // ±3.5σ at the end fits the frame
    const yScale = (height / 2 - pad) / range;
    const x = (i: number) => pad + (i / TOTAL_STEPS) * plotW;
    const y = (v: number) => mid - v * yScale;

    // Axis
    ctx.strokeStyle = theme.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, mid);
    ctx.lineTo(pad + plotW, mid);
    ctx.stroke();

    // ±√n and ±2√n bands: where ~68% and ~95% of walkers should be
    for (const [k, alpha] of [[2, 0.05], [1, 0.08]] as const) {
      ctx.beginPath();
      for (let i = 0; i <= s.steps; i += 2) ctx.lineTo(x(i), y(k * Math.sqrt(i)));
      for (let i = s.steps - (s.steps % 2); i >= 0; i -= 2) ctx.lineTo(x(i), y(-k * Math.sqrt(i)));
      ctx.closePath();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = theme.accent;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Paths
    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = theme.accent;
    for (const p of s.paths) {
      ctx.beginPath();
      ctx.moveTo(x(0), y(0));
      for (let i = 1; i <= s.steps; i++) ctx.lineTo(x(i), y(p[i]));
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Heads
    ctx.fillStyle = theme.accent;
    for (const p of s.paths) {
      ctx.beginPath();
      ctx.arc(x(s.steps), y(p[s.steps]), 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Histogram of current positions
    const hx = pad * 2 + plotW;
    const bin = 4;
    const counts = new Map<number, number>();
    for (const p of s.paths) {
      const b = Math.floor(p[s.steps] / bin);
      counts.set(b, (counts.get(b) ?? 0) + 1);
    }
    const unit = (histW - 4) / (WALKERS * 0.3);
    ctx.fillStyle = theme.accent2;
    for (const [b, n] of counts) {
      const top = y((b + 1) * bin);
      const bh = Math.max(1, y(b * bin) - top - 1);
      ctx.beginPath();
      ctx.roundRect(hx, top, Math.min(histW, n * unit), bh, 2);
      ctx.fill();
    }

    // Labels
    ctx.fillStyle = theme.muted;
    ctx.font = `12px ${theme.font}`;
    ctx.textBaseline = "top";
    ctx.fillText(`step ${s.steps} / ${TOTAL_STEPS}`, pad, pad / 2);
    ctx.textBaseline = "bottom";
    ctx.fillText("final spread", hx, height - pad / 2);
  },
});
