import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { markScrollReady } from "@/lib/scroll-ready";

gsap.registerPlugin(ScrollTrigger);

/**
 * Single site-wide smooth scroll (Lenis + GSAP ScrollTrigger).
 * Avoids duplicate Lenis instances and scroll-behavior conflicts.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markScrollReady();
      return;
    }

    const w = window as Window & { __lenis?: Lenis };
    if (w.__lenis) {
      markScrollReady();
      return;
    }

    ScrollTrigger.config({ limitCallbacks: true });

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    w.__lenis = lenis;
    document.documentElement.classList.add("lenis");

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const refreshScroll = () => ScrollTrigger.refresh(true);

    window.addEventListener("resize", refreshScroll);
    window.addEventListener("load", refreshScroll);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        refreshScroll();
        markScrollReady();
      });
    });

    return () => {
      window.removeEventListener("resize", refreshScroll);
      window.removeEventListener("load", refreshScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      w.__lenis = undefined;
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return <>{children}</>;
}
