import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";
import skillLensScreenshot from "@/assets/Screenshot 2026-05-26 203559.png";
import decisionTwinScreenshot from "@/assets/Screenshot 2026-05-26 211352.png";
import navopsScreenshot from "@/assets/Screenshot 2026-05-27 213043.png";
import lifeOSScreenshot from "@/assets/Screenshot 2026-05-27 214335.png";
import attendxScreenshot from "@/assets/Screenshot 2026-05-27 214826.png";
import { HeroSection } from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import OverviewSection from "@/components/OverviewSection";
import CaseStudiesShowcase from "@/components/CaseStudiesShowcase";
import gradImg from "@/assets/graduation_image-removebg-preview.png";
import discoverImg from "@/assets/discover-removebg-preview.png";
import step03Img from "@/assets/03-removebg-preview.png";
import step04Img from "@/assets/04-removebg-preview.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const projects = [
  {
    title: "SkillLens AI",
    desc: "SkillLens AI is an AI-powered platform that helps users analyze their skills, discover career paths, and get personalized learning recommendations.",
    img: skillLensScreenshot,
    githubUrl: "https://github.com/Karthik-16-tech/Skill_lens_AI",
    techStack: ["React", "TypeScript", "Python", "FastAPI", "TailwindCSS", "PostgreSQL"],
  },
  {
    title: "Decision Twin AI",
    desc: "AI-powered platform for analyzing decisions, predicting outcomes, and providing smart data-driven insights.",
    img: decisionTwinScreenshot,
    githubUrl: "https://github.com/Karthik-16-tech/Decision_Twin_AI",
    techStack: ["React.js", "Next.js", "Tailwind CSS", "FastAPI", "Python", "MySQL", "SQLAlchemy", "Machine Learning", "GitHub"],
  },
  {
    title: "Navops Simulator",
    desc: "AI-powered navigation and operations platform designed to streamline task management, tracking, and operational workflows with real-time insights.",
    img: navopsScreenshot,
    githubUrl: "https://github.com/Karthik-16-tech/NavalOps_Simulator",
    techStack: ["React.js", "Next.js", "Tailwind CSS", "FastAPI", "Python", "MySQL", "SQLAlchemy", "REST APIs", "GitHub"],
  },
  {
    title: "Life OS",
    desc: "Personal productivity and life management platform that helps users organize tasks, goals, schedules, and daily activities in one smart workspace.",
    img: lifeOSScreenshot,
    githubUrl: "https://github.com/Karthik-16-tech/Life_OS",
    techStack: ["React.js", "Next.js", "Tailwind CSS", "Node.js", "FastAPI", "MySQL", "SQLAlchemy", "REST APIs", "GitHub"],
  },
  {
    title: "Attendx",
    desc: "Smart attendance management system for tracking, monitoring, and managing student or employee attendance efficiently in real time.",
    img: attendxScreenshot,
    githubUrl: "https://github.com/Karthik-16-tech/Attendx",
    techStack: ["React.js", "Tailwind CSS", "Node.js", "FastAPI", "MySQL", "SQLAlchemy", "REST APIs", "GitHub"],
  },
];

const steps = [
  {
    n: "01",
    title: "Started My Journey",
    desc: "Began my academic journey at Andhra University, exploring technology and building a strong foundation in programming and problem solving.",
  },
  {
    n: "02",
    title: "Discovered Data Science",
    desc: "Learned Python, machine learning basics, data analysis, and explored real-world datasets and AI concepts.",
  },
  {
    n: "03",
    title: "Web & Design Exploration",
    desc: "Started building responsive websites, learning React, UI/UX principles, and creating interactive digital experiences.",
  },
  {
    n: "04",
    title: "Building & Learning",
    desc: "Worked on impactful projects including phishing website detection, portfolio systems, and startup ecosystem platforms.",
  },
  {
    n: "05",
    title: "Aspiring for More",
    desc: "Continuously improving as an aspiring Data Scientist, Full Stack Developer, and UI/UX Designer focused on solving meaningful problems.",
  },
];



const cases = [
  {
    img: decisionTwinScreenshot,
    tag: "AI PLATFORM",
    title: "Decision Twin AI",
    desc: "AI-powered platform for analyzing decisions, predicting outcomes, and providing smart data-driven insights.",
    testimonial: "Built an intelligent system that transforms complex decision-making into actionable insights using advanced ML algorithms and real-time data processing.",
    githubUrl: "https://github.com/Karthik-16-tech/Decision_Twin_AI",
  },
  {
    img: navopsScreenshot,
    tag: "OPERATIONS",
    title: "Navops Simulator",
    desc: "AI-powered navigation and operations platform designed to streamline task management, tracking, and operational workflows with real-time insights.",
    testimonial: "Engineered a sophisticated naval 3D model generator and simulator with advanced design algorithms for realistic vehicle navigation and operational workflow optimization.",
    githubUrl: "https://github.com/Karthik-16-tech/NavalOps_Simulator",
  },
  {
    img: lifeOSScreenshot,
    tag: "PRODUCTIVITY",
    title: "Life OS",
    desc: "Personal productivity and life management platform that helps users organize tasks, goals, schedules, and daily activities in one smart workspace.",
    testimonial: "Created an all-in-one life management platform that unifies task management, goal tracking, and scheduling in an intuitive and powerful interface.",
    githubUrl: "https://github.com/Karthik-16-tech/Life_OS",
  },
  {
    img: attendxScreenshot,
    tag: "ATTENDANCE",
    title: "Attendx",
    desc: "Smart attendance management system for tracking, monitoring, and managing student or employee attendance efficiently in real time.",
    testimonial: "Built a modern attendance management system with real-time tracking, analytics, and reporting capabilities for educational and organizational use.",
    githubUrl: "https://github.com/Karthik-16-tech/Attendx",
  },
];

// Cinematic snap back: when user scrolls up on the process section, snap to top


const benefits = [
  { k: "20+", v: "Personal and academic projects shipped end-to-end across web and ML." },
  { k: "9.1", v: "Current CGPA — balancing coursework with continuous side-project work." },
  { k: "7", v: "Languages and frameworks used in production-grade student projects." },
  { k: "100%", v: "Open-source-first — every project documented and pushed to GitHub." },
];

const deckCards = [
  {
    id: 1,
    tag: "FEATURED",
    title: "SkillLens AI",
    subtitle: "AI skill analysis · React + Next.js",
    body: "SkillLens AI helps users analyze skills, discover career paths, and get personalized learning recommendations.",
    img: skillLensScreenshot,
  },
  {
    id: 2,
    tag: "FEATURED",
    title: "CampusFlow",
    subtitle: "Student dashboard · Django + React",
    body: "End-to-end platform managing attendance, grades, and announcements for 500+ students.",
    img: case2,
  },
  {
    id: 3,
    tag: "FEATURED",
    title: "AlgoVisualizer",
    subtitle: "C++ · WebAssembly",
    body: "Visual playground for sorting, graph, and DP algorithms compiled to WASM.",
    img: case3,
  },
  {
    id: 4,
    tag: "FEATURED",
    title: "InferLab",
    subtitle: "ML playground · Flask",
    body: "Drop in a model, drop in a dataset, see what your network is really learning.",
    img: case1,
  },
];

const contactDetails = [
  {
    label: "Email",
    value: "hello@karthik.dev",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91 98765 43210",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4.75h2.5l1.25 3-1.5 1.5a12 12 0 0 0 5.5 5.5l1.5-1.5 3 1.25V17a2.25 2.25 0 0 1-2.25 2.25C9.94 19.25 4.75 14.06 4.75 7.75A2.25 2.25 0 0 1 7 5.5Z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "India",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6-5.25 6-10a6 6 0 1 0-12 0c0 4.75 6 10 6 10Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      </svg>
    ),
  },
];

// Tech stack — logo + name (simple-icons CDN, white monochrome)
const techStack: { name: string; slug: string }[] = [
  { name: "Python", slug: "python" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Flask", slug: "flask" },
  { name: "Django", slug: "django" },
  { name: "Java", slug: "openjdk" },
  { name: "C++", slug: "cplusplus" },
  { name: "React.js", slug: "react" },
  { name: "Node.js", slug: "nodedotjs" },
];

function TechBadge({ name, slug }: { name: string; slug: string }) {
  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <img
        src={`https://cdn.simpleicons.org/${slug}/white`}
        alt={name}
        width={40}
        height={40}
        loading="lazy"
        className="h-10 w-10 object-contain"
      />
      <span className="font-display text-2xl font-semibold tracking-tight text-white/90">
        {name}
      </span>
    </span>
  );
}

function Index() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xjkvynvg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          _to: "bhuvankarthikpalla@gmail.com",
        }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-background">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;700;800&family=JetBrains+Mono:wght@400;500&family=Montserrat:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <HeroSection
        name="Karthik"
        eyebrow="Student · Developer · Builder"
        title={
          <>
            Aspiring to turn data into <span className="heading-gradient">impact</span>
          </>
        }
        description="Hi, I'm Karthik — a Data Science aspirant and Full Stack Developer studying at Andhra University. Passionate about AI, modern web development, and creating clean UI/UX experiences."
        ctaLabel="View Capabilities"
        ctaHref="#projects"
        showNavbar
        splineUrl="https://my.spline.design/nexbotrobotcharacterconcept-qHLCSFfR3fVJ7ErpwpUKlogS/"
      />

      {/* Process */}
      <section id="process" className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <div className="font-mono text-[10px] tracking-widest text-primary uppercase mb-4">
              / About Me
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-8 lg:sticky lg:top-32 text-balance">
              How I move from idea to <span className="text-primary italic">shipped</span>.
            </h2>
          </div>
          <ol className="space-y-16">
            {steps.map((s) => {
              let stepIcon = gradImg;
              if (s.n === "02") stepIcon = discoverImg;
              if (s.n === "03") stepIcon = step03Img;
              if (s.n === "04") stepIcon = step04Img;
              if (s.n === "05") stepIcon = discoverImg;
              return (
                <li key={s.n} className="relative pl-14 border-l border-white/10 pb-2">
                  <img src={stepIcon} alt={`Step ${s.n}`} className="absolute -left-[1px] top-0 -translate-x-1/2 w-8 h-8 object-contain" />
                  <span className="absolute left-8 top-0 font-mono text-xs text-primary">{s.n}</span>
                  <h3 className="text-2xl font-bold mb-3 font-display">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">{s.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Tech ticker */}
      <section id="next-section" className="py-[100px] bg-[#000] text-center overflow-hidden">
        <h2 className="text-white text-[30px] font-semibold mb-[60px] px-6">
          Tech I build with
        </h2>
        <div className="group relative">
          <div className="flex animate-[ticker-scroll_35s_linear_infinite] group-hover:[animation-play-state:paused] w-max">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                className="flex items-center gap-[90px] shrink-0 px-[45px]"
              >
                {techStack.map((t) => (
                  <span
                    key={`${dup}-${t.name}`}
                    className="opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default shrink-0 flex items-center"
                    title={t.name}
                  >
                    <TechBadge name={t.name} slug={t.slug} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <OverviewSection />

      <Timeline
        id="projects"
        eyebrow="/ Projects"
        heading={
          <>
            Creative projects built with{" "}
            <span className="text-primary italic">design, code, and intelligence</span>.
          </>
        }
        items={projects.map((p) => ({
          tag: "PROJECT",
          title: p.title,
          desc: p.desc,
          img: p.img,
          githubUrl: p.githubUrl,
          techStack: p.techStack,
        }))}
      />

      {/* Premium Case Studies */}
      <section id="case-studies">
        <CaseStudiesShowcase cases={cases} />
      </section>

      

      {/* Benefits */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="font-mono text-[10px] tracking-widest text-primary uppercase mb-4">
            / By the numbers
          </div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-16 max-w-2xl text-balance">
            A snapshot of the journey so far.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
            {benefits.map((b) => (
              <div key={b.k} className="bg-background p-8">
                <div className="font-display text-5xl font-bold text-primary mb-4">{b.k}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="relative overflow-hidden py-24 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(139,92,246,0.16),transparent_22%),radial-gradient(circle_at_78%_18%,rgba(124,58,237,0.14),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(8,15,33,0.95),transparent_42%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,15,0.96),rgba(6,6,10,0.98))] px-6 py-10 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(139,92,246,0.18),transparent_26%),radial-gradient(circle_at_82%_24%,rgba(168,85,247,0.12),transparent_22%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_52%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_28%,transparent_72%,rgba(139,92,246,0.08))]" />

            <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <div className="animate-reveal space-y-8">
                <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.38em] text-white/70">
                    Contact Me
                  </span>
                </div>

                <div className="space-y-5">
                  <h2 className="max-w-[10ch] text-balance font-display text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
                    Contact Me
                  </h2>
                  <p className="max-w-[34rem] text-[clamp(1rem,1.15vw,1.08rem)] leading-8 text-white/68">
                    Open to internships, collaborations, freelance projects, and exciting opportunities.
                  </p>
                </div>

              </div>

              <form onSubmit={handleFormSubmit} className="animate-reveal-soft rounded-[30px] border border-white/8 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-7 lg:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 sm:col-span-1">
                    <span className="text-xs font-medium uppercase tracking-[0.28em] text-white/60">Name</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-[border-color,box-shadow,transform] duration-300 focus:border-primary/60 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.12)]"
                    />
                  </label>

                  <label className="space-y-2 sm:col-span-1">
                    <span className="text-xs font-medium uppercase tracking-[0.28em] text-white/60">Contact Number</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-[border-color,box-shadow,transform] duration-300 focus:border-primary/60 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.12)]"
                    />
                  </label>

                  <label className="space-y-2 sm:col-span-2">
                    <span className="text-xs font-medium uppercase tracking-[0.28em] text-white/60">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-[border-color,box-shadow,transform] duration-300 focus:border-primary/60 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.12)]"
                    />
                  </label>

                  <label className="space-y-2 sm:col-span-2">
                    <span className="text-xs font-medium uppercase tracking-[0.28em] text-white/60">Description</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project, timeline, or opportunity..."
                      className="w-full resize-none rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white placeholder:text-white/30 outline-none transition-[border-color,box-shadow,transform] duration-300 focus:border-primary/60 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.12)]"
                    />
                  </label>
                </div>

                <div className="mt-5 flex items-center justify-end gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#8b5cf6,#6d28d9)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(109,40,217,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(139,92,246,0.45)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display font-bold text-xl tracking-tight">Karthik</div>
          <div className="flex gap-8 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            <a href="https://github.com/Karthik-16-tech" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/karthik-palla-09a281335/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/k_a_r_t_h_i_k___16/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Instagram</a>
          </div>
          <div className="text-xs text-muted-foreground">© 2026 Karthik.</div>
        </div>
      </footer>
    </div>
  );
}
