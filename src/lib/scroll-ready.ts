/** Fires when Lenis + ScrollTrigger are initialized (or immediately if reduced motion). */
export const SCROLL_READY_EVENT = "app:scroll-ready";

export function isScrollReady(): boolean {
  return typeof window !== "undefined" && !!(window as Window & { __scrollReady?: boolean }).__scrollReady;
}

export function waitForScrollReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (isScrollReady()) return Promise.resolve();

  return new Promise((resolve) => {
    const done = () => {
      window.removeEventListener(SCROLL_READY_EVENT, done);
      resolve();
    };
    window.addEventListener(SCROLL_READY_EVENT, done, { once: true });
    window.setTimeout(() => resolve(), 2500);
  });
}

export function markScrollReady(): void {
  if (typeof window === "undefined") return;
  (window as Window & { __scrollReady?: boolean }).__scrollReady = true;
  window.dispatchEvent(new CustomEvent(SCROLL_READY_EVENT));
}
