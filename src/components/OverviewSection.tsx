import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const roles = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    title: "Frontend Developer",
    description: "Crafting beautiful, responsive user interfaces with modern frameworks and pixel-perfect designs.",
    color: "from-orange-500 to-pink-500",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 6h16M4 10h16M4 14h10M4 18h6" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    title: "Backend Developer",
    description: "Building robust server-side applications, APIs, and database architectures that power modern apps.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M8 10l-2 2 2 2M16 10l2 2-2 2M12 8l-2 8" />
      </svg>
    ),
    title: "Full-Stack Developer",
    description: "End-to-end development expertise, seamlessly bridging frontend experiences with backend logic.",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-6" />
        <circle cx="20" cy="8" r="2" />
      </svg>
    ),
    title: "Data Scientist",
    description: "Transforming raw data into actionable insights through machine learning and advanced analytics.",
    color: "from-emerald-500 to-teal-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const OverviewSection = () => {
  return (
    <section id="overview" className="scroll-section relative py-24 md:py-28 px-6 sm:px-8 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 glassmorphic-section">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-primary/90 text-xs sm:text-sm mb-4 tracking-[0.3em] uppercase font-semibold">What I Do</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Overview
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Specialized skills across the full spectrum of modern software development
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {roles.map((role, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                scale={1.02}
                transitionSpeed={250}
                gyroscope={false}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#ffffff"
                glarePosition="all"
                glareBorderRadius="16px"
                className="h-full [transform:translateZ(0)]"
              >
                <div className="group relative glass-card glass-card-hover p-8 cursor-pointer overflow-hidden h-full min-h-[280px] rounded-2xl border border-border/60 bg-background/60 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  {/* Gradient overlay on hover */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} 
                  />
                  <div className="absolute -inset-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(40%_30%_at_50%_0%,rgba(255,255,255,0.25),transparent_70%)]" />
                  
                  {/* Microsoft-style square accent */}
                  <div className={`absolute top-0 left-0 w-1 h-12 bg-gradient-to-b ${role.color} rounded-br`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="text-foreground/70 group-hover:text-foreground mb-6 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1">
                      {role.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-foreground transition-colors">
                      {role.title}
                    </h3>

                    {/* Description - appears on hover */}
                    <p className="text-muted-foreground/90 text-sm leading-relaxed opacity-90 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      {role.description}
                    </p>
                  </div>

                  {/* Bottom gradient line on hover */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${role.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                  />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OverviewSection;
