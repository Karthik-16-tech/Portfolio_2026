import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { ReactNode } from "react";
import ViewCapabilitiesButton from "./ViewCapabilitiesButton";

interface HeroSectionProps {
  name?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  showNavbar?: boolean;
  splineUrl?: string;
}

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About Me", href: "#process" },
  { label: "Tech Stack", href: "#next-section" },
  { label: "Overview", href: "#overview" },
  { label: "Projects", href: "#projects" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact Us", href: "#contact" },
];

export function HeroSection({
  name = "Karthik",
  eyebrow,
  title,
  description,
  ctaLabel = "View Projects",
  ctaHref = "#next-section",
  showNavbar = true,
  splineUrl = "https://my.spline.design/nexbotrobotcharacterconcept-qHLCSFfR3fVJ7ErpwpUKlogS/",
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current || !visualRef.current) return;

    // Run non-blocking animation after paint to avoid layout jank
    const raf = requestAnimationFrame(() => {
      const context = gsap.context(() => {
        gsap.fromTo(
          [contentRef.current!, visualRef.current!],
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1.05, ease: "power4.out", stagger: 0.12 },
        );
      }, heroRef);

      // cleanup
      return () => context.revert();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  // Lazy-load the Spline iframe only when it's visible to avoid heavy initial work
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => {
    const el = iframeRef.current;
    if (!el) return;
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!el.getAttribute('src') && splineUrl) el.src = splineUrl;
            io.disconnect();
          }
        });
      }, { rootMargin: '200px' });
      io.observe(el);
      return () => io.disconnect();
    }
    // Fallback: set src immediately
    if (splineUrl) el.src = splineUrl;
  }, [splineUrl]);

  // Cinematic snap: when user scrolls down on the hero, snap to the process section.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let isAnimating = false;
    let touchStartY = 0;

    const trySnapDown = () => {
      if (isAnimating) return;
      const target = document.getElementById('process');
      if (!target) return;
      isAnimating = true;
      target.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => (isAnimating = false), 900);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 60) {
        trySnapDown();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches?.[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches?.[0]?.clientY ?? 0;
      const dy = touchStartY - y;
      if (dy > 40) trySnapDown();
    };

    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <>
      {showNavbar ? (
        <nav className="fixed inset-x-0 top-0 z-50 bg-transparent">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            <a href="#top" className="text-lg font-semibold tracking-[0.12em] text-white sm:text-[1.05rem]">
              {name}
            </a>
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/65 transition-opacity duration-300 hover:opacity-100 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      ) : null}

      <header
        ref={heroRef}
        id="top"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-background py-10 lg:py-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[5%] h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(123,92,255,0.92)_0%,rgba(123,92,255,0.38)_34%,transparent_70%)] opacity-30 blur-[56px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(123,92,255,0.08),transparent_22%),radial-gradient(circle_at_84%_16%,rgba(56,189,248,0.08),transparent_22%),radial-gradient(circle_at_50%_84%,rgba(255,255,255,0.02),transparent_26%)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />

        <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div ref={contentRef} className="mt-4 max-w-[500px] space-y-5 md:mt-8 lg:mt-10">
            <div className="inline-flex w-fit items-center rounded-full border border-white/12 bg-transparent px-4 py-2">
              <span className="font-mono text-[10px] tracking-[0.36em] text-white/80 uppercase sm:text-[11px]" style={{letterSpacing: '0.34em'}}>
                {eyebrow ?? name}
              </span>
            </div>

            <div className="space-y-4">
              <h1
                className="max-w-[28ch] text-balance text-[clamp(2.6rem,5.5vw,4.8rem)] font-medium leading-[1.02] tracking-normal text-white"
                style={{ fontFamily: "Satoshi, var(--font-display)" }}
              >
                {title}
              </h1>
              <p className="max-w-[560px] text-[clamp(1rem,1.1vw,1.05rem)] leading-7 text-white/70 sm:leading-8">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <ViewCapabilitiesButton />
            </div>
          </div>

          <div ref={visualRef} className="relative mx-auto w-full max-w-[760px] lg:justify-self-end lg:-translate-y-6">
            <div className="relative bg-transparent lg:pl-4">
              <div className="relative hidden h-[500px] w-full overflow-visible bg-transparent lg:block">
                <iframe
                  ref={iframeRef}
                  title="Spline 3D scene"
                  data-src={splineUrl}
                  className="h-full w-full border-0 bg-transparent"
                  loading="lazy"
                  allow="autoplay; fullscreen"
                />
              </div>

              <div className="relative flex min-h-[220px] items-center overflow-hidden lg:hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(123,92,255,0.12),transparent_42%),radial-gradient(circle_at_82%_24%,rgba(56,189,248,0.10),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.014),rgba(255,255,255,0.002))]" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}