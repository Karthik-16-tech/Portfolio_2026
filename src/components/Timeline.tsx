import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { waitForScrollReady } from "@/lib/scroll-ready";

gsap.registerPlugin(ScrollTrigger);

function refreshPoleLayout(
  progressSt: ScrollTrigger,
  setOrb: (progress: number) => void,
  floatTween: gsap.core.Tween,
) {
  ScrollTrigger.refresh(true);
  progressSt.update();
  const progress = progressSt.progress;
  setOrb(progress);
  if (progressSt.isActive) floatTween.play();
  else floatTween.pause();
}

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

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current || !orbRef.current || !fillRef.current) return;

    const track = trackRef.current;
    const orb = orbRef.current;
    const fill = fillRef.current;
    const section = sectionRef.current;
    let cancelled = false;
    let teardown: (() => void) | undefined;

    const setup = () => {
      if (cancelled) return;
      teardown?.();

      const cards = cardsRef.current.filter(Boolean);
      const angle = { v: 0 };
      let floatTween: gsap.core.Tween;
      let progressSt: ScrollTrigger;

      const setOrb = (progress: number) => {
        const trackH = track.offsetHeight || 1;
        const y = progress * trackH;
        const sway = Math.sin(angle.v) * 9;
        const lift = Math.cos(angle.v * 0.8) * 4;
        const expand = gsap.utils.clamp(0, 1, 1 - Math.abs(progress - 0.5) * 1.35);
        const scale = 1 + expand * 0.55;
        gsap.set(orb, {
          y: y + lift,
          x: sway,
          xPercent: -50,
          scale,
          force3D: true,
        });
        gsap.set(fill, { height: `${progress * 100}%`, force3D: true });
      };

      const ctx = gsap.context(() => {
        floatTween = gsap.to(angle, {
          v: Math.PI * 2,
          duration: 6,
          repeat: -1,
          ease: "none",
          paused: true,
          onUpdate: () => {
            if (progressSt.isActive) setOrb(progressSt.progress);
          },
        });

        progressSt = ScrollTrigger.create({
          trigger: track,
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => setOrb(self.progress),
          onToggle: (self) => {
            if (self.isActive) floatTween.play();
            else floatTween.pause();
          },
        });

        refreshPoleLayout(progressSt, setOrb, floatTween);

        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 48, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
                toggleActions: "play none none none",
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
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  once: true,
                  toggleActions: "play none none none",
                },
              },
            );
          }
        });

        const onImagesReady = () => refreshPoleLayout(progressSt, setOrb, floatTween);
        const images = section.querySelectorAll("img");
        let pending = 0;
        images.forEach((img) => {
          if (!img.complete) {
            pending += 1;
            img.addEventListener("load", onImagesReady, { once: true });
            img.addEventListener("error", onImagesReady, { once: true });
          }
        });
        if (pending === 0) {
          requestAnimationFrame(onImagesReady);
        }

        return () => {
          floatTween.kill();
          progressSt.kill();
        };
      }, section);

      teardown = () => ctx.revert();
    };

    void waitForScrollReady().then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(setup);
      });
    });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [items.length]);

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
        />

        <div className="relative space-y-40 md:space-y-56 py-16">
          {items.map((it, i) => {
            const left = i % 2 === 0;
            const hasTechStack = it.techStack && it.techStack.length > 0;
            const isDecisionTwinAI = it.title === "Decision Twin AI";
            const isLifeOS = it.title === "Life OS";

            if (hasTechStack) {
              const techStackOnLeft = isDecisionTwinAI || isLifeOS;

              return (
                <div
                  key={`${it.title}-${i}`}
                  className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-24"
                >
                  <div
                    aria-hidden
                    className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-white/30"
                  />
                  <div
                    ref={setLineRef(i)}
                    aria-hidden
                    className="hidden md:block absolute top-1/2 h-px w-[12%] bg-gradient-to-r from-primary/80 to-transparent right-1/2 origin-right"
                  />
                  <div
                    aria-hidden
                    className="hidden md:block absolute top-1/2 h-px w-[12%] bg-gradient-to-l from-primary/80 to-transparent left-1/2 origin-left"
                  />

                  {techStackOnLeft ? (
                    <div className="md:col-start-1 md:pr-12">
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
                    <div ref={setCardRef(i)} className="md:col-start-1 md:pr-12">
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
                              decoding="async"
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

                  {techStackOnLeft ? (
                    <div ref={setCardRef(i)} className="md:col-start-2 md:pl-12">
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
                              decoding="async"
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
                    <div className="md:col-start-2 md:pl-12">
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

            return (
              <div
                key={`${it.title}-${i}`}
                className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-24"
              >
                <div
                  aria-hidden
                  className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-white/30"
                />
                <div
                  ref={setLineRef(i)}
                  aria-hidden
                  className={`hidden md:block absolute top-1/2 h-px w-[12%] bg-gradient-to-r from-primary/80 to-transparent ${
                    left
                      ? "right-1/2 origin-right"
                      : "left-1/2 origin-left bg-gradient-to-l"
                  }`}
                />

                <div
                  ref={setCardRef(i)}
                  className={`${
                    left ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12"
                  }`}
                >
                  <div
                    className={`p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden ${
                      left ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    {it.img && (
                      <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 aspect-[16/9]">
                        <img
                          src={it.img}
                          alt={it.title}
                          loading="lazy"
                          decoding="async"
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
