# Karthik's Portfolio Website

A modern, pixel-perfect portfolio website showcasing projects, skills, and professional journey. Built with cutting-edge web technologies and featuring interactive 3D elements powered by Spline.

**Live Website:** [https://karthik-portfolio.vercel.app](https://karthik-portfolio.vercel.app)

---

## 👋 About Karthik

Hi! I'm **Karthik**, an aspiring **Full Stack Developer**, **Data Scientist**, and **UI/UX Designer** with a passion for solving meaningful problems through technology. Currently pursuing my studies at **Andhra University**, I've been building innovative solutions that bridge the gap between intelligent algorithms and beautiful user experiences.

### Quick Stats
- **CGPA:** 9.1+ (Continuous learner balancing academics with side projects)
- **Projects:** 20+ Personal and academic projects shipped end-to-end
- **Tech Stack:** 7+ Languages and frameworks in production-grade student projects
- **Open Source:** 100% of projects documented and pushed to GitHub

### My Journey
1. **Started My Journey** - Academic foundation at Andhra University in programming and problem solving
2. **Discovered Data Science** - Python, ML basics, data analysis, and AI concepts
3. **Web & Design Exploration** - Responsive websites, React, UI/UX principles, and interactive experiences
4. **Building & Learning** - Phishing website detection, portfolio systems, startup ecosystem platforms
5. **Aspiring for More** - Continuous improvement as a full stack developer focused on impactful solutions

---

## 🚀 Featured Projects

### 1. **SkillLens AI**
AI-powered platform helping users analyze skills, discover career paths, and receive personalized learning recommendations.
- **Tech Stack:** React, TypeScript, Python, FastAPI, TailwindCSS, PostgreSQL
- **GitHub:** [Skill_lens_AI](https://github.com/Karthik-16-tech/Skill_lens_AI)

### 2. **Decision Twin AI**
Intelligent platform for analyzing decisions, predicting outcomes, and providing data-driven insights.
- **Tech Stack:** React.js, Next.js, Tailwind CSS, FastAPI, Python, MySQL, SQLAlchemy, Machine Learning
- **GitHub:** [Decision_Twin_AI](https://github.com/Karthik-16-tech/Decision_Twin_AI)

### 3. **Navops Simulator**
AI-powered navigation and operations platform for streamlining task management with real-time insights.
- **Tech Stack:** React.js, Next.js, Tailwind CSS, FastAPI, Python, MySQL, SQLAlchemy, REST APIs
- **GitHub:** [NavalOps_Simulator](https://github.com/Karthik-16-tech/NavalOps_Simulator)

### 4. **Life OS**
Personal productivity and life management platform for organizing tasks, goals, schedules, and daily activities.
- **Tech Stack:** React.js, Next.js, Tailwind CSS, Node.js, FastAPI, MySQL, SQLAlchemy, REST APIs
- **GitHub:** [Life_OS](https://github.com/Karthik-16-tech/Life_OS)

### 5. **Attendx**
Smart attendance management system for tracking and managing attendance efficiently in real-time.
- **Tech Stack:** React.js, Tailwind CSS, Node.js, FastAPI, MySQL, SQLAlchemy, REST APIs
- **GitHub:** [Attendx](https://github.com/Karthik-16-tech/Attendx)

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19.2 with TypeScript
- **Routing:** TanStack React Router (v1.168)
- **Styling:** Tailwind CSS 4.2 + Tailwind Merge
- **UI Components:** Radix UI + shadcn/ui components
- **Animations:** GSAP, Framer Motion, Lenis
- **3D Visualization:** Spline (iframe integration)

### Full-Stack Architecture
- **Meta-framework:** TanStack Start (Server-side rendering)
- **Build Tool:** Vite 7.3
- **State Management:** TanStack React Query
- **Forms:** React Hook Form
- **Deployment:** Cloudflare Workers (via Wrangler)

### Developer Tools
- **Language:** TypeScript 5.8
- **Linting:** ESLint 9.32
- **Formatting:** Prettier 3.7
- **CSS Processing:** Tailwind CSS 4.2 with Vite plugin

### Design System
- **Design Tokens:** Custom CSS variables with theme support
- **Component Library:** 30+ Radix UI components
- **Fonts:** Inter Tight (display), JetBrains Mono (code), Inter (body)
- **Animations:** Custom keyframes + GSAP timeline orchestration

---

## ✨ Website Features

### 🎨 Visual Excellence
- **Pixel-Perfect Design** - Meticulous attention to spacing, typography, and layout
- **Interactive 3D Elements** - Spline-powered animated scenes
- **Smooth Animations** - GSAP-powered cinematic scrolling and transitions
- **Dark Theme** - Modern dark mode with carefully calibrated color palette
- **Responsive Design** - Mobile-first approach for all screen sizes

### 🎯 Core Sections
1. **Hero Section** - Eye-catching introduction with 3D visualization
2. **Navigation** - Fixed navbar with smooth link navigation
3. **About/Process** - Journey timeline and background story
4. **Tech Stack** - Visual showcase of skills and technologies
5. **Projects Gallery** - Interactive card-based project showcase
6. **Case Studies** - In-depth project testimonials and workflows
7. **Capabilities Overview** - Skills and expertise breakdown
8. **Contact** - Call-to-action and engagement opportunities

### 🎪 Interactive Features
- **Cinematic Scroll Snapping** - Smooth section navigation on scroll/touch
- **Lazy Loading** - Optimized performance for Spline iframe
- **Parallax Effects** - Multi-layer depth with react-parallax-tilt
- **Form Handling** - Accessible forms with validation
- **Chart Visualization** - Recharts for data representation

---

## 📋 Getting Started

### Prerequisites
- **Node.js** 18+ and **npm** or **bun**
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/Karthik-16-tech/pixel-perfect-clone.git
cd pixel-perfect-clone

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start the development server
npm run dev

# The website will be available at:
# Local:   http://localhost:8080/
# Network: http://192.168.x.x:8080/
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview

# Build for development (with source maps)
npm run build:dev
```

### Other Scripts

```bash
# Lint code for errors and style violations
npm run lint

# Format code with Prettier
npm run format
```

---

## 📁 Project Structure

```
src/
├── routes/
│   ├── __root.tsx          # Root layout with Spline script
│   └── index.tsx           # Main portfolio page
├── components/
│   ├── HeroSection.tsx     # Hero with 3D Spline
│   ├── Timeline.tsx        # Journey timeline
│   ├── OverviewSection.tsx # Skills overview
│   ├── CaseStudiesShowcase.tsx # Case studies grid
│   ├── CardStack.tsx       # Animated card stack
│   ├── ViewCapabilitiesButton.tsx # CTA button
│   └── ui/                 # Radix UI components
├── lib/
│   ├── utils.ts           # Utility functions
│   └── error-page.ts      # Error handling
├── hooks/
│   └── use-mobile.tsx     # Responsive hooks
├── styles/
│   └── styles.css         # Global + Tailwind v4 theme
└── assets/                # Images and static files
```

---

## 🎨 Design System

### Color Palette
- **Background:** `hsl(240 10% 3%)`
- **Foreground:** `hsl(0 0% 98%)`
- **Primary:** `hsl(250 100% 75%)` - Vibrant Purple
- **Accent:** `hsl(240 5% 12%)`
- **Muted:** `hsl(240 5% 12%)`

### Typography
- **Display Font:** Inter Tight
- **Body Font:** Inter
- **Monospace Font:** JetBrains Mono

### Animations
- **Ease Function:** `cubic-bezier(0.32, 0.72, 0, 1)` (Studio easing)
- **Default Duration:** 0.9s - 1.05s for reveals
- **Transition:** 220ms - 350ms for interactions

---

## 🚀 Deployment

### Cloudflare Workers Deployment

The website is configured for deployment on Cloudflare Workers via the `@cloudflare/vite-plugin`.

```bash
# Configure Wrangler (Cloudflare CLI)
# Edit wrangler.jsonc with your account details

# Deploy to Cloudflare
npm run build
wrangler deploy
```

### Environment Setup
- **Framework:** TanStack Start (SSR support)
- **Hosting:** Cloudflare Workers
- **CDN:** Cloudflare Global Network
- **Configuration:** See `wrangler.jsonc`

---

## 📞 Contact & Connect

- **Email:** [your-email@example.com]
- **GitHub:** [@Karthik-16-tech](https://github.com/Karthik-16-tech)
- **LinkedIn:** [Karthik's Profile]
- **Twitter/X:** [@YourHandle]

---

## 📄 License

This project is **private** and maintained by Karthik. All rights reserved.

---

## 🙏 Acknowledgments

- **TanStack** - React Router and React Start framework
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Spline** - 3D visualization and animation
- **GSAP** - Professional animation library
- **Vercel/Lovable** - TanStack configuration and support

---

## 📝 Notes for Developers

### CSS Processing
This project uses **Tailwind CSS v4** with modern `@` directives:
- `@import "tailwindcss"` - Core styles
- `@source` - Template scanning
- `@theme` - Design token configuration
- `@custom-variant` - Custom CSS variants

### Performance Optimizations
- **SSR with TanStack Start** - Fast initial page load
- **Lazy Loading** - Deferred Spline iframe loading
- **Code Splitting** - Route-based code splitting via TanStack Router
- **Image Optimization** - Responsive image delivery
- **Request Animation Frame** - Non-blocking animations

### TypeScript Support
Strict TypeScript enabled with:
- Full type safety across components
- Strict null checks
- Module resolution: Node
- JSX: React

---

## 🤝 Contributing

Found a bug or want to suggest improvements? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

**Built with ❤️ by Karthik | Last Updated: June 2026**
