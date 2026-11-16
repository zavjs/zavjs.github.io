import { createRng, type Rng } from "./rng";

/** Colors read from CSS custom properties, so figures follow light/dark mode. */
export type Theme = {
  bg: string;
  fg: string;
  muted: string;
  grid: string;
  accent: string;
  accent2: string;
  danger: string;
  font: string;
};

export type SceneContext = {
  ctx: CanvasRenderingContext2D;
  /** Size in CSS pixels. Draw in these units; DPR scaling is handled for you. */
  width: number;
  height: number;
  theme: Theme;
  rng: Rng;
  seed: number;
};

export type Scene<S> = {
  /** width / height of the canvas. Default 16 / 9. */
  aspect?: number;
  /** Seconds of simulated time before the scene ends (or loops). */
  duration: number;
  /** Restart automatically after `duration` (with the same seed). Default false. */
  loop?: boolean;
  /** Seconds to hold the final frame before looping. Default 1.5. */
  hold?: number;
  /** Show a "new seed" button. Use it for anything driven by `rng`. */
  random?: boolean;
  /** Build initial state. Called on start, replay and reseed. */
  init(c: SceneContext): S;
  /** Advance the simulation by a fixed step `dt` (seconds); `t` is time after the step. */
  update?(s: S, dt: number, t: number, c: SceneContext): void;
  /** Draw the current state. `t` is simulated time in seconds. */
  draw(s: S, c: SceneContext, t: number): void;
};

export const defineScene = <S>(scene: Scene<S>) => scene;

const STEP = 1 / 60;

function readTheme(el: HTMLElement): Theme {
  const cs = getComputedStyle(el);
  const v = (name: string, fallback: string) =>
    cs.getPropertyValue(name).trim() || fallback;
  return {
    bg: v("--fig-bg", "#fff"),
    fg: v("--fig-fg", "#111"),
    muted: v("--fig-muted", "#888"),
    grid: v("--fig-grid", "#e5e5e5"),
    accent: v("--fig-accent", "#2563eb"),
    accent2: v("--fig-accent-2", "#d97706"),
    danger: v("--fig-danger", "#dc2626"),
    font: cs.fontFamily,
  };
}

export type Player = {
  play(): void;
  pause(): void;
  replay(): void;
  reseed(seed?: number): void;
  readonly playing: boolean;
  readonly seed: number;
  destroy(): void;
};

/**
 * Mount a scene on a canvas. Handles HiDPI, resizing, theme changes,
 * pausing when offscreen, and prefers-reduced-motion (shows the final frame
 * and waits for the reader to press play).
 */
export function mountScene<S>(
  canvas: HTMLCanvasElement,
  scene: Scene<S>,
  opts: { seed: number; onState?: (p: Player) => void },
): Player {
  const ctx = canvas.getContext("2d")!;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let seed = opts.seed;
  let width = 0;
  let height = 0;
  let theme = readTheme(canvas);
  let state: S;
  let t = 0;
  let acc = 0;
  let holdLeft = 0;
  let playing = false;
  let visible = false;
  let wantsPlay = !reduceMotion;
  let raf = 0;
  let last = 0;

  const c = (): SceneContext => ({ ctx, width, height, theme, rng, seed });
  let rng = createRng(seed);

  function reset() {
    rng = createRng(seed);
    t = 0;
    acc = 0;
    holdLeft = scene.hold ?? 1.5;
    state = scene.init(c());
  }

  function step(dt: number) {
    t += dt;
    scene.update?.(state, dt, t, c());
  }

  function fastForward() {
    while (t < scene.duration) step(STEP);
  }

  function render() {
    if (!width) return;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);
    scene.draw(state, c(), Math.min(t, scene.duration));
  }

  function resize() {
    const w = canvas.clientWidth;
    const h = w / (scene.aspect ?? 16 / 9);
    if (w === width && h === height) return;
    width = w;
    height = h;
    canvas.style.height = `${h}px`;
    canvas.width = Math.round(w * devicePixelRatio);
    canvas.height = Math.round(h * devicePixelRatio);
    render();
  }

  function frame(now: number) {
    raf = 0;
    if (!playing) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (t < scene.duration) {
      acc += dt;
      while (acc >= STEP && t < scene.duration) {
        step(STEP);
        acc -= STEP;
      }
    } else if (scene.loop) {
      holdLeft -= dt;
      if (holdLeft <= 0) reset();
    } else {
      setPlaying(false);
    }
    render();
    if (playing) raf = requestAnimationFrame(frame);
  }

  function setPlaying(p: boolean) {
    if (p === playing) return;
    playing = p;
    if (p) {
      last = performance.now();
      raf ||= requestAnimationFrame(frame);
    } else if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    opts.onState?.(player);
  }

  const sync = () => setPlaying(wantsPlay && visible);

  const player: Player = {
    play() {
      if (t >= scene.duration && !scene.loop) reset();
      wantsPlay = true;
      sync();
    },
    pause() {
      wantsPlay = false;
      sync();
    },
    replay() {
      reset();
      render();
      wantsPlay = true;
      sync();
    },
    reseed(next) {
      seed = next ?? Math.floor(Math.random() * 2 ** 31);
      player.replay();
    },
    get playing() {
      return playing;
    },
    get seed() {
      return seed;
    },
    destroy() {
      setPlaying(false);
      ro.disconnect();
      io.disconnect();
      scheme.removeEventListener("change", onScheme);
    },
  };

  reset();
  if (reduceMotion) fastForward();

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      sync();
    },
    { threshold: 0.25 },
  );
  io.observe(canvas);

  const scheme = matchMedia("(prefers-color-scheme: dark)");
  const onScheme = () => {
    theme = readTheme(canvas);
    render();
  };
  scheme.addEventListener("change", onScheme);

  resize();
  return player;
}
