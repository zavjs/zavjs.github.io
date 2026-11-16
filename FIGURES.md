# Figures: animations for posts

Each figure is a small TypeScript module that draws on a canvas. No animation
library: a ~250-line runtime in `src/figures/runtime.ts` does the plumbing.

## Use one in a post (.mdx)

Rename the post from `.md` to `.mdx`, then:

```mdx
import Figure from "../../components/Figure.astro";

<Figure name="random-walk" seed={7}
  alt="What the animation shows, for screen readers"
  caption="Optional caption" />
```

`seed` fixes the randomness, so every reader sees the same run. Readers can
press "New random seed" to see another one.

## Make a new one

1. Create `src/figures/scenes/<name>.ts`:

```ts
import { defineScene } from "../runtime";

export default defineScene({
  duration: 6,     // seconds
  loop: true,
  random: true,    // shows the "New random seed" button
  init: ({ rng }) => ({ x: 0 }),              // initial state
  update: (s, dt, t, { rng }) => { s.x += dt },  // fixed 60 steps/second
  draw: (s, { ctx, width, height, theme }) => {
    ctx.fillStyle = theme.accent;
    ctx.fillRect(s.x * 50, height / 2, 10, 10);
  },
});
```

2. Add it to `src/figures/registry.ts`.
3. Run `npm run dev` and open `/lab` to see every figure.

## What the runtime handles

- Sharp drawing on retina screens and resizing to the column width.
- Light and dark colors from CSS variables (`--fig-*` at the end of `src/styles/global.css`). Use `theme.*`, never hard-coded colors.
- Seeded randomness (`rng()`, `rng.coin()`, `rng.int()`, `rng.range()`). Never use `Math.random()` in a scene.
- Fixed-step simulation, so the same seed gives the same result on any device.
- Loads a figure's code only when it's about to scroll into view, and pauses it offscreen.
- `prefers-reduced-motion`: shows the final frame and waits for Play.

## Interactive figures

Figures readers click on (switches, buttons, sliders) are plain Astro
components in `src/components/figures/`, with HTML, a `<script>` and scoped
styles. Example: `FlagRules.astro`, used in the feature flags post.

```mdx
import FlagRules from "../../components/figures/FlagRules.astro";

<FlagRules />
```

Shared look: white cards, `#e7e5e4` borders, 14px radius, the soft shadow
from `FlagRules.astro`, and pill-shaped buttons. Reuse those so every figure
on the site looks like one family.
