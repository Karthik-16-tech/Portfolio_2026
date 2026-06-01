import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface CaseStudy {
  img: string;
  tag: string;
  title: string;
  desc: string;
  testimonial?: string;
  githubUrl?: string;
  features?: string[];
  techs?: string[];
  cta?: { label: string; href: string };
}

interface CaseStudiesShowcaseProps {
  cases: CaseStudy[];
}

const CaseStudiesShowcase = ({ cases }: CaseStudiesShowcaseProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cases.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, cases.length]);

  // GSAP animation on index change
  useEffect(() => {
    const imageEl = containerRef.current?.querySelector("[data-case-image]");
    const contentEl = containerRef.current?.querySelector("[data-case-content]");

    if (imageEl && contentEl) {
      gsap.fromTo(
        imageEl,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        contentEl,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cases.length);
    setIsAutoPlay(false);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cases.length) % cases.length);
    setIsAutoPlay(false);
  };

  const activeCase = cases[activeIndex];

  return (
    <section
      className="relative py-24 px-6 sm:px-8 bg-black overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 flex justify-between items-start gap-6"
        >
          <div>
            <p className="text-primary/90 text-xs mb-3 tracking-[0.3em] uppercase font-semibold">
              / Case Studies
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-2xl">
              Real-world solutions built with precision.
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 hover:bg-primary/5"
              aria-label="Previous project"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 hover:bg-primary/5"
              aria-label="Next project"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Cinematic Showcase */}
        <div ref={containerRef} className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Image Section */}
          <motion.div
            key={`image-${activeIndex}`}
            data-case-image
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-xl blur-2xl group-hover:from-purple-500/30 transition-all duration-500" />

              {/* Image container */}
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-2xl">
                <img
                  src={activeCase.img}
                  alt={activeCase.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating accent */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Right: Content Section */}
          <motion.div
            key={`content-${activeIndex}`}
            data-case-content
            className="space-y-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Category Tag */}
            <div className="space-y-3">
              <span className="inline-block px-2.5 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest">
                {activeCase.tag}
              </span>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                {activeCase.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground/90 leading-relaxed max-w-lg">
                {activeCase.desc}
              </p>
            </div>

            {/* Testimonial */}
            {activeCase.testimonial && (
              <div className="border-l-2 border-primary/40 pl-4 py-2">
                <p className="text-sm italic text-white/80 leading-relaxed">
                  "{activeCase.testimonial}"
                </p>
              </div>
            )}

            {/* Features (optional) */}
            {activeCase.features && activeCase.features.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Key Features
                </p>
                <ul className="space-y-1.5">
                  {activeCase.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <svg
                        className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack (optional) */}
            {activeCase.techs && activeCase.techs.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeCase.techs.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-foreground/80 hover:border-primary/40 hover:bg-primary/5 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <button className="group px-5 py-2 rounded-lg bg-primary text-background font-semibold text-sm hover:bg-primary/90 transition-all duration-300 flex items-center gap-1.5">
                View Project
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
              {activeCase.githubUrl && (
                <a
                  href={activeCase.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-lg border border-white/10 text-foreground text-sm hover:border-primary/40 hover:bg-primary/5 font-semibold transition-all duration-300 flex items-center gap-1.5"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 mt-10"
        >
          <div className="flex-1 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeIndex + 1) / cases.length) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(cases.length).padStart(2, "0")}
          </span>
        </motion.div>

        {/* Dot Indicators */}
        <div className="flex gap-1.5 mt-6">
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                setIsAutoPlay(false);
              }}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex
                  ? "w-8 h-1.5 bg-primary"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to case ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesShowcase;
