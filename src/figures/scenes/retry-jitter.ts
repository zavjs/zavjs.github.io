import { defineScene } from "../runtime";
import type { Rng } from "../rng";

/**
 * A database blips and 60 clients fail at once. They all retry with
 * exponential backoff. Without jitter they retry in lockstep and keep
 * overloading the server. With "full jitter" (a random wait between 0 and
 * the backoff) the same retries spread out and everyone gets through.
 */
const CLIENTS = 60;
const CAPACITY = 6; // requests the server can handle per bucket
const BUCKET = 0.1; // seconds
const DURATION = 8;
const BASE = 0.2; // first backoff, seconds
const MAX_BACKOFF = 3.2;
const BUCKETS = Math.round(DURATION / BUCKET);

type Lane = { ok: number[]; failed: number[]; doneAt: number[] };
type State = { plain: Lane; jitter: Lane };

function simulate(rng: Rng, starts: number[], jitter: boolean): Lane {
  const ok = new Array(BUCKETS).fill(0);
  const failed = new Array(BUCKETS).fill(0);
  const doneAt: number[] = [];
  let pending = starts.map((at) => ({ at, attempt: 0 }));
  for (let b = 0; b < BUCKETS; b++) {
    const end = (b + 1) * BUCKET;
    const now = pending.filter((r) => r.at < end).sort((a, z) => a.at - z.at);
    pending = pending.filter((r) => r.at >= end);
    now.forEach((r, i) => {
      if (i < CAPACITY) {
        ok[b]++;
        doneAt.push(end);
      } else {
        failed[b]++;
        const backoff = Math.min(MAX_BACKOFF, BASE * 2 ** r.attempt);
        const wait = jitter ? rng() * backoff : backoff;
        pending.push({ at: end + wait, attempt: r.attempt + 1 });
      }
    });
  }
  return { ok, failed, doneAt };
}

export default defineScene<State>({
  aspect: 16 / 10,
  duration: DURATION,
  loop: true,
  hold: 3,
  random: true,

  init({ rng }) {
    // Everyone fails within the same 50 ms window.
    const starts = Array.from({ length: CLIENTS }, () => rng() * 0.05);
    return { plain: simulate(rng, starts, false), jitter: simulate(rng, starts, true) };
  },

  draw(s, { ctx, width, height, theme }, t) {
    const pad = 16;
    const labelH = 22;
    const laneH = (height - pad * 3) / 2;
    const shown = Math.min(BUCKETS, Math.floor(t / BUCKET) + 1);
    const barW = (width - pad * 2) / BUCKETS;
    const maxCount = 30;

    const lanes: [string, Lane][] = [
      ["Backoff, no jitter", s.plain],
      ["Backoff with full jitter", s.jitter],
    ];

    lanes.forEach(([title, lane], li) => {
      const top = pad + li * (laneH + pad);
      const base = top + laneH;
      const plotH = laneH - labelH;
      const h = (n: number) => (Math.min(n, maxCount) / maxCount) * plotH;

      ctx.font = `600 13px ${theme.font}`;
      ctx.fillStyle = theme.fg;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      ctx.fillText(title, pad, top);

      const done = lane.doneAt.filter((d) => d <= t + 1e-9).length;
      ctx.font = `12px ${theme.font}`;
      ctx.fillStyle = theme.muted;
      ctx.textAlign = "right";
      ctx.fillText(`${done} / ${CLIENTS} succeeded`, width - pad, top);

      for (let b = 0; b < shown; b++) {
        const x = pad + b * barW;
        const okH = h(lane.ok[b]);
        const failH = h(lane.ok[b] + lane.failed[b]) - okH;
        const w = Math.max(1, barW - 2);
        ctx.fillStyle = theme.accent;
        ctx.beginPath();
        ctx.roundRect(x, base - okH, w, okH, failH ? 0 : [2, 2, 0, 0]);
        ctx.fill();
        if (failH) {
          ctx.fillStyle = theme.danger;
          ctx.beginPath();
          ctx.roundRect(x, base - okH - failH, w, failH, [2, 2, 0, 0]);
          ctx.fill();
        }
      }

      // Capacity line
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = theme.muted;
      ctx.beginPath();
      ctx.moveTo(pad, base - h(CAPACITY));
      ctx.lineTo(width - pad, base - h(CAPACITY));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = theme.grid;
      ctx.beginPath();
      ctx.moveTo(pad, base);
      ctx.lineTo(width - pad, base);
      ctx.stroke();
    });

    // Legend
    ctx.font = `12px ${theme.font}`;
    ctx.textBaseline = "bottom";
    ctx.textAlign = "left";
    let lx = pad;
    const ly = height - 2;
    for (const [label, color] of [
      ["served", theme.accent],
      ["rejected", theme.danger],
    ] as const) {
      ctx.fillStyle = color;
      ctx.fillRect(lx, ly - 10, 10, 10);
      ctx.fillStyle = theme.muted;
      ctx.fillText(label, lx + 14, ly);
      lx += 14 + ctx.measureText(label).width + 14;
    }
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = theme.muted;
    ctx.beginPath();
    ctx.moveTo(lx, ly - 5);
    ctx.lineTo(lx + 14, ly - 5);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillText("capacity", lx + 18, ly);
  },
});
