import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export type TimelineItem = {
  year?: string;
  title: string;
  desc: string;
  tag: string;
  img?: string;
  githubUrl?: string;
  techStack?: string[];
};

type Props = {
  items: TimelineItem[];
  eyebrow?: string;
  heading?: React.ReactNode;
  id?: string;
};

export default function Timeline({ items, eyebrow = "/ Journey", heading, id = "journey" }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<HTMLDivElement[]>([]);

  // Lenis smooth scroll (singleton-safe)
  useEffect(() => {
    if (typeof window === "undefined") return;
    // avoid double init in dev
    const w = window as unknown as { __lenis?: Lenis };
    if (w.__lenis) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    w.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      w.__lenis = undefined;
    };
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current || !orbRef.current || !fillRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const orb = orbRef.current!;
      const fill = fillRef.current!;

      // Smoothed scroll progress driver
      const state = { progress: 0, smooth: 0 };

      const st = ScrollTrigger.create({
        trigger: track,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
        onUpdate: (self) => {
          state.progress = self.progress;
        },
      });

      // Refresh ScrollTrigger after a brief delay to ensure measurements are correct
      gsap.delayedCall(0.1, () => {
        ScrollTrigger.refresh();
      });

      // Orbital float angle
      const angle = { v: 0 };
      gsap.to(angle, { v: Math.PI * 2, duration: 6, repeat: -1, ease: "none" });

      // Card reveal triggers
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
        const line = linesRef.current[i];
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      // rAF orb animation: smoothed Y + orbital sway
      let rafId = 0;
      const tick = () => {
        // spring-ease the smooth value toward live progress
        state.smooth += (state.progress - state.smooth) * 0.12;
        const trackRect = track.getBoundingClientRect();
        const trackH = track.offsetHeight;
        const y = state.smooth * trackH;
        const sway = Math.sin(angle.v) * 9;
        const lift = Math.cos(angle.v * 0.8) * 4;
        // proximity to nearest card -> expand
        let nearest = 1;
        cardsRef.current.forEach((c) => {
          if (!c) return;
          const cRect = c.getBoundingClientRect();
          const orbViewportY = trackRect.top + y;
          const cCenter = cRect.top + cRect.height / 2;
          const d = Math.abs(orbViewportY - cCenter);
          nearest = Math.min(nearest, d / 240);
        });
        const expand = gsap.utils.clamp(0, 1, 1 - nearest);
        const scale = 1 + expand * 0.55;
        orb.style.transform = `translate3d(calc(-50% + ${sway}px), ${y + lift}px, 0) scale(${scale})`;
        orb.style.filter = `blur(${0.3 + expand * 0.4}px)`;
        fill.style.height = `${state.smooth * 100}%`;
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(rafId);
        st.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };
  const setLineRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) linesRef.current[i] = el;
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative py-40 bg-black overflow-hidden"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(265 100% 60% / 0.18) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(280 100% 50% / 0.12) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="font-mono text-[10px] tracking-widest text-primary uppercase mb-4">
          {eyebrow}
        </div>
        {heading && (
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white text-balance max-w-3xl mx-auto">
            {heading}
          </h2>
        )}
      </div>

      <div ref={trackRef} className="relative max-w-6xl mx-auto px-6">
        {/* Center pole */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, hsl(0 0% 100% / 0.08) 10%, hsl(0 0% 100% / 0.08) 90%, transparent 100%)",
          }}
        />
        {/* Pole progress fill */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full will-change-[height]"
          style={{
            height: "0%",
            background:
              "linear-gradient(to bottom, hsl(265 100% 75%), hsl(280 100% 60%))",
            boxShadow:
              "0 0 18px hsl(265 100% 70% / 0.8), 0 0 40px hsl(275 100% 60% / 0.45)",
          }}
          ref={fillRef}
        />

        {/* Orb */}
        <div
          ref={orbRef}
          aria-hidden
          className="absolute left-1/2 top-0 size-5 rounded-full will-change-transform pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #fff 0%, hsl(265 100% 80%) 35%, hsl(275 100% 55%) 70%, transparent 100%)",
            boxShadow:
              "0 0 24px hsl(265 100% 70% / 0.9), 0 0 60px hsl(275 100% 55% / 0.7), 0 0 120px hsl(280 100% 50% / 0.45)",
          }}
        >
          {/* pulse halo */}
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background:
                "radial-gradient(circle, hsl(265 100% 70% / 0.5), transparent 70%)",
            }}
          />
        </div>

        <div className="relative space-y-40 md:space-y-56 py-16">
          {items.map((it, i) => {
            const left = i % 2 === 0;
            const hasTechStack = it.techStack && it.techStack.length > 0;
            const isDecisionTwinAI = it.title === "Decision Twin AI";
            const isLifeOS = it.title === "Life OS";

            if (hasTechStack) {
              // SkillLens AI: Project left, Tech Stack right
              // Decision Twin AI: Tech Stack left, Project right
              // Navops Simulator: Project left, Tech Stack right
              // Attendx: Project left, Tech Stack right
              // Life OS: Tech Stack left, Project right
              const techStackOnLeft = isDecisionTwinAI || isLifeOS;

              return (
                <div
                  key={`${it.title}-${i}`}
                  className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-24"
                >
                  {/* node */}
                  <div
                    aria-hidden
                    className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-white/30"
                  />
                  {/* connector lines */}
                  <div
                    ref={setLineRef(i)}
                    aria-hidden
                    className="hidden md:block absolute top-1/2 h-px w-[12%] bg-gradient-to-r from-primary/80 to-transparent right-1/2 origin-right"
                  />
                  <div
                    aria-hidden
                    className="hidden md:block absolute top-1/2 h-px w-[12%] bg-gradient-to-l from-primary/80 to-transparent left-1/2 origin-left"
                  />

                  {/* Left Card */}
                  {techStackOnLeft ? (
                    // Tech Stack on Left
                    <div className="md:col-start-1 md:pr-12 will-change-transform">
                      <div
                        className="p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden md:text-right"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(0 0% 100% / 0.04), hsl(265 100% 60% / 0.03))",
                          boxShadow:
                            "0 30px 80px -40px hsl(275 100% 50% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
                        }}
                      >
                        <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">
                          Tech Stack
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight mb-6 text-balance">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2.5 mb-6 justify-end">
                          {it.techStack!.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary/90"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {it.githubUrl && (
                          <a
                            href={it.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/12 hover:text-white"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Project Details on Left
                    <div ref={setCardRef(i)} className="md:col-start-1 md:pr-12 will-change-transform">
                      <div
                        className="p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden md:text-right"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(0 0% 100% / 0.04), hsl(265 100% 60% / 0.03))",
                          boxShadow:
                            "0 30px 80px -40px hsl(275 100% 50% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
                        }}
                      >
                        {it.img && (
                          <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 aspect-[16/9]">
                            <img
                              src={it.img}
                              alt={it.title}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-3">
                          {it.tag}{it.year ? ` · ${it.year}` : ""}
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight mb-4 text-balance">
                          {it.title}
                        </h3>
                        <p className="text-sm md:text-base text-white/60 leading-relaxed text-pretty">
                          {it.desc}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Right Card */}
                  {techStackOnLeft ? (
                    // Project Details on Right
                    <div
                      ref={setCardRef(i)}
                      className="md:col-start-2 md:pl-12 will-change-transform"
                    >
                      <div
                        className="p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden md:text-left"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(0 0% 100% / 0.04), hsl(265 100% 60% / 0.03))",
                          boxShadow:
                            "0 30px 80px -40px hsl(275 100% 50% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
                        }}
                      >
                        {it.img && (
                          <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 aspect-[16/9]">
                            <img
                              src={it.img}
                              alt={it.title}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-3">
                          {it.tag}{it.year ? ` · ${it.year}` : ""}
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight mb-4 text-balance">
                          {it.title}
                        </h3>
                        <p className="text-sm md:text-base text-white/60 leading-relaxed text-pretty">
                          {it.desc}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Tech Stack on Right
                    <div className="md:col-start-2 md:pl-12 will-change-transform">
                      <div
                        className="p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden md:text-left"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(0 0% 100% / 0.04), hsl(265 100% 60% / 0.03))",
                          boxShadow:
                            "0 30px 80px -40px hsl(275 100% 50% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
                        }}
                      >
                        <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">
                          Tech Stack
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight mb-6 text-balance">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2.5 mb-6">
                          {it.techStack!.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary/90"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {it.githubUrl && (
                          <a
                            href={it.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/12 hover:text-white"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Regular alternating layout for projects without techStack
            return (
              <div
                key={`${it.title}-${i}`}
                className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-24"
              >
                {/* node */}
                <div
                  aria-hidden
                  className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-white/30"
                />
                {/* connector line */}
                <div
                  ref={setLineRef(i)}
                  aria-hidden
                  className={`hidden md:block absolute top-1/2 h-px w-[12%] bg-gradient-to-r from-primary/80 to-transparent ${
                    left
                      ? "right-1/2 origin-right"
                      : "left-1/2 origin-left bg-gradient-to-l"
                  }`}
                />

                {/* Card */}
                <div
                  ref={setCardRef(i)}
                  className={`${
                    left ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12"
                  } will-change-transform`}
                >
                  <div
                    className={`p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden ${
                      left ? "md:text-right" : "md:text-left"
                    }`}
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(0 0% 100% / 0.04), hsl(265 100% 60% / 0.03))",
                      boxShadow:
                        "0 30px 80px -40px hsl(275 100% 50% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
                    }}
                  >
                    {it.img && (
                      <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 aspect-[16/9]">
                        <img
                          src={it.img}
                          alt={it.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-3">
                      {it.tag}{it.year ? ` · ${it.year}` : ""}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight mb-4 text-balance">
                      {it.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/60 leading-relaxed text-pretty">
                      {it.desc}
                    </p>
                    {it.githubUrl && (
                      <a
                        href={it.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/12 hover:text-white mt-4"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
