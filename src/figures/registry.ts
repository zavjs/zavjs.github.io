import type { Scene } from "./runtime";

/**
 * Every figure, by name. Each scene loads only when a page uses it.
 * To add one: create scenes/<name>.ts that default-exports defineScene(...),
 * then add a line here.
 */
export const figures: Record<string, () => Promise<{ default: Scene<any> }>> = {
  "random-walk": () => import("./scenes/random-walk"),
  "retry-jitter": () => import("./scenes/retry-jitter"),
};

export type FigureName = keyof typeof figures;
