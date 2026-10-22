import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Moon, LayoutList, BookOpen, Code, Briefcase, Mail, 
  Trophy, ArrowRight, Activity, Phone, Brain, Brush, FileUser, ThermometerSun 
} from 'lucide-react';
import CricketGallery from "./components/CricketGallery";

import profileImage from "./assets/rifas_pic.jpg";

const galleryImages = Array.from(
  { length: 3 },
  (_, i) => `/gallery_${i + 1}.jpg`
);

// Injecting standard CSS for custom animations and scrollbar hiding to maintain the fluidic feel
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    :root {
      --bg-primary: #ffffff;
      --text-primary: #111111;
      --bg-secondary: #f9fafb;
      --border-color: #eaeaea;
    }
    .dark {
      --bg-primary: #0a0a0a;
      --text-primary: #ededed;
      --bg-secondary: #171717;
      --border-color: #262626;
    }
    body {
      background-color: var(--bg-primary);
      color: var(--text-primary);
      transition: background-color 0.5s ease, color 0.5s ease;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    /* Hide scrollbar for a cleaner look but keep functionality */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background-color: var(--border-color); border-radius: 20px; }
    
    .glass-nav {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-color);
    }
    .dark .glass-nav {
      background: rgba(10, 10, 10, 0.7);
    }
  `}} />
);

// Reusable hook for scroll-triggered fade-in animations
const useScrollReveal = () => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  
  return ref;
};

// Wrapper component to apply the scroll reveal effect
const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useScrollReveal();
  return (
    <div 
      ref={ref} 
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Navbar = ({ isDark, toggleTheme, view, setView }) => {
  return (
    <nav className="glass-nav fixed top-0 w-full z-50 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center rounded-full font-mono text-sm">
            MR
          </div>
          <span className="hidden sm:inline">Muhammed Rifas</span>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex bg-gray-100 dark:bg-neutral-800 rounded-full p-1 border border-gray-200 dark:border-neutral-700 transition-colors">
            <button 
              onClick={() => setView('summary')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${view === 'summary' ? 'bg-white dark:bg-black shadow-sm' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
            >
              <LayoutList size={16} /> <span className="hidden md:inline">Summary</span>
            </button>
            <button 
              onClick={() => setView('journey')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${view === 'journey' ? 'bg-white dark:bg-black shadow-sm' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
            >
              <BookOpen size={16} /> <span className="hidden md:inline">Journey</span>
            </button>
          </div>
          
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 border-b border-gray-200 dark:border-neutral-800 transition-colors">
      <div className="flex-1 space-y-6">
        <Reveal>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
            Engineering <br/><span className="text-gray-400 dark:text-neutral-500">the Future.</span>
          </h1>
        </Reveal>
        
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-neutral-700">Software Engineer</span>
            <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-neutral-700">AI & Data Operations</span>
            <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-neutral-700">Engineering Leader</span>
          </div>
        </Reveal>
        
        <Reveal delay={200}>
          <p className="text-lg text-gray-600 dark:text-neutral-400 leading-relaxed max-w-xl">
I am Muhammed Rifas—a resourceful engineering leader bringing together 8+ years of hands-on coding experience (Python, Java, C, C++, C#) and 3+ years of managing high-stakes AI delivery pipelines. After leading end-to-end LLM data workflows at Turing—contributing to breakthrough models and maintaining an excellent satisfaction record—I am returning to my roots. Today, I am focused on full-stack software engineering, leveraging AI as a productivity multiplier to rapidly build and ship robust applications across platforms.          </p>
        </Reveal>
        
        <Reveal delay={300} className="pt-4">
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform duration-300">
            Let's Connect <ArrowRight size={18} />
          </a>
        </Reveal>
      </div>
      
      <Reveal delay={200} className="flex-1 w-full max-w-md md:max-w-none">
        <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 transition-colors">
          <img 
            src={profileImage} 
            alt="Muhammed Rifas" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-3xl pointer-events-none"></div>
        </div>
      </Reveal>
    </section>
  );
};

const TimelineItem = ({ period, title, company, companyLogo, bulletPoints, isLast }) => (
  <div className="relative pl-12 md:pl-0">
    {/* Desktop layout line */}
    <div className="hidden md:block absolute left-1/2 -ml-px w-0.5 h-full bg-gray-200 dark:bg-neutral-800 top-0"></div>
    
    {/* Mobile layout line - Shifted right to perfectly split the new padding */}
    <div className="md:hidden absolute left-[23px] w-0.5 h-full bg-gray-200 dark:bg-neutral-800 top-0 pt-4"></div>
    
    <Reveal className={`md:flex items-center justify-between w-full pb-16 ${isLast ? 'pb-0' : ''}`}>
      {/* Node / Dot - Negatively offset to break out of the animated text container and align with the trace */}
      <div className="absolute -left-6 md:left-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-[#0a0a0a] bg-black dark:bg-white -translate-x-1/2 mt-1.5 md:mt-0 z-10"></div>
      
      {/* Left side (Dates & Company for desktop) */}
      <div className="md:w-5/12 mb-4 md:mb-0 md:pr-12 md:text-right flex flex-col md:items-end justify-center">
        <div className="text-sm font-bold text-gray-400 dark:text-neutral-500 tracking-widest uppercase mb-2">{period}</div>
        <div className="flex items-center gap-3 md:flex-row-reverse">
          <img src={companyLogo} alt={company} className="w-10 h-10 rounded-lg object-cover grayscale" />
          <h3 className="text-xl font-bold">{company}</h3>
        </div>
      </div>
      
      {/* Right side (Role & Details) */}
      <div className="md:w-5/12 md:pl-12">
        <h4 className="text-lg font-bold mb-3">{title}</h4>
        <ul className="space-y-2 text-gray-600 dark:text-neutral-400 text-sm md:text-base">
          {bulletPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-neutral-600 flex-shrink-0"></span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  </div>
);

const ExecutiveSummary = () => {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <Reveal>
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Career Timeline</h2>
          <p className="text-gray-500 dark:text-neutral-400 max-w-2xl mx-auto">A high-level overview of my professional experience, leadership roles, and technical pivots.</p>
        </div>
      </Reveal>
      
      <div className="relative">
        <TimelineItem 
          period="2026 – Present"
          title="Front-End Web Developer & Freelance AI Trainer"
          company="Independent / Alignerr"
          companyLogo="https://placehold.co/100x100/eeeeee/111111?text=A"
          bulletPoints={[
            "Mastering full-stack software architecture (React, Node.js, PostgreSQL) through The Odin Project to build end-to-end applications.",
            "Leveraging AI as a productivity multiplier to rapidly develop, code, and ship software across web, mobile, and desktop platforms.",
            "Bridging the transition with flexible freelance work on Alignerr while actively shifting focus from training models to utilizing them for rapid engineering."
          ]}
        />
        <TimelineItem 
          period="Dec 2022 – Mar 2026"
          title="Delivery Engineering Manager & Team Lead"
          company="Turing"
          companyLogo="https://placehold.co/100x100/eeeeee/111111?text=T"
          bulletPoints={[
            "Managed comprehensive data annotation across modalities (text, code, audio, specialized video streams).",
            "Guided high-performing trainer pods to execute campaign goals and optimize throughput under aggressive milestones.",
            "Authored complex reasoning-based exemplars for core LLM training and benchmarking.",
            "Multiple-time recipient of 'Top Lead', 'Top Trainer', and 'Rising Star' awards."
          ]}
        />
        <TimelineItem 
          period="Oct 2017 – Dec 2022"
          title="Managed Network Expert / SME"
          company="Chegg"
          companyLogo="https://placehold.co/100x100/eeeeee/111111?text=C"
          bulletPoints={[
            "Delivered expert-level solutions and code walkthroughs for core algorithms and multi-language programming (Python, Java, C, C++).",
            "Maintained a consistent 95% client/student satisfaction score over a 5-year tenure.",
            "Honored as an 'Engagement Champion' and 'Quality Champion' for mentoring peers.",
            "Leveraged full remote autonomy to achieve significant personal milestones."
          ]}
        />
        <TimelineItem 
          period="2016 – 2017"
          title="Indie Android Developer"
          company="Independent"
          companyLogo="https://placehold.co/100x100/eeeeee/111111?text=Dev"
          bulletPoints={[
            "Built and deployed native Java Android games from scratch.",
            "Created 'Left - Right: Tune Your Brain' achieving 130k+ downloads and a 4.4 rating.",
            "Created 'Memorize - The Brain Game' achieving a 4.8 user rating."
          ]}
          isLast={true}
        />
      </div>
    </div>
  );
};

const PhaseSection = ({ phase, title, period, text, align = 'left', imageSrc }) => {
  const isLeft = align === 'left';
  
  return (
    <div className="py-24 border-b border-gray-100 dark:border-neutral-900 last:border-0 transition-colors">
      <Reveal className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
        <div className="flex-1 space-y-6">
          <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-neutral-800 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
            Phase {phase} • {period}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">{title}</h2>
          
          <div className="space-y-4 text-gray-600 dark:text-neutral-400 text-lg leading-relaxed">
            {text.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div className="flex-1 w-full">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-900 shadow-xl border border-gray-200 dark:border-neutral-800 transition-colors">
            <img src={imageSrc} alt={title} className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
          </div>
        </div>
      </Reveal>
    </div>
  );
};

const ProjectCard = ({ title, category, status, url, icon: Icon }) => (
  <a href={url} target="_blank" rel="noreferrer" className="group block">
    <div className="h-full p-6 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all duration-300 transform group-hover:-translate-y-2">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white dark:bg-black rounded-xl shadow-sm">
          <Icon size={24} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          status === 'WIP' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
          'bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-neutral-300'
        }`}>
          {status}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:underline decoration-2 underline-offset-4">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-neutral-400 font-medium uppercase tracking-wider">{category}</p>
    </div>
  </a>
);

const NarrativeJourney = () => {
  return (
    <div className="px-6 max-w-6xl mx-auto pb-20">
      
      {/* Phases */}
      <PhaseSection 
        phase="1"
        period="2016 – 2017"
        title="The Indie Sandbox."
        align="left"
        imageSrc="https://papidroid.wordpress.com/wp-content/uploads/2015/05/android-logo-hd-wallpaper-03.jpg"
        text={[
          "Right after college, I was recruited into a traditional MNC. Within six months, I recognized that my ambitions were better aligned with building products than following a conventional corporate path. I made a deliberate decision to pursue independent software development, taking ownership of my career and turning my ideas into real-world products.",
          "Using Native Java and Android Studio, I built and launched games designed to challenge reflexes and logic. My first hit, 'Left - Right: Tune Your Brain', garnered over 130,000 organic downloads and a 4.4 rating. I followed it up with 'Memorize: The Brain Game', which achieved a 4.8 rating.",
          "I've now revived 'Left - Right: Tune Your Brain' with a modernized, more efficient version built entirely with Flutter. This latest release brings a fresh technical foundation to my original hit, demonstrating my continued drive to revisit, improve, and evolve the products I create."
]}
      />
      
      <PhaseSection 
        phase="2"
        period="2017 – 2022"
        title="Autonomy & Mastery."
        align="right"
        imageSrc="https://miro.medium.com/v2/resize:fit:2400/1*w_DjvWrziZbuH_DueSyvZQ.jpeg"
        text={[
          "Seeking a balance between deep technical work and life flexibility, I joined Chegg as a Managed Network Expert. This era was defined by total asynchronous autonomy. I was paid for my expertise, not my hours.",
          "I delivered expert-level solutions and technical code walkthroughs specializing in core algorithms, complex data structures, and multi-language programming (Python, Java, C, C++). Over five years, I maintained a 95% client satisfaction score.",
          "More importantly, the financial stability and lack of micro-management allowed me to build my life off-screen: I bought my first car, laid the foundation for a new home, and got married in 2021. It was the perfect ecosystem for technical and personal growth."
        ]}
      />
      
      <PhaseSection 
        phase="3"
        period="2022 – 2026"
        title="Riding the AI Wave."
        align="left"
        imageSrc="https://www.turing.com/img/og_image.webp"
        text={[
          "As the pandemic waned, the launch of LLMs like ChatGPT violently disrupted the EdTech space. Watching the platform I relied on decline, I recognized the macro shift and pivoted directly into the frontier causing the disruption.",
          "I joined Turing exactly as the AI boom accelerated. Starting as an AI Trainer, I authored complex reasoning exemplars for core model training. Driven by rapid execution, I was quickly promoted to Pod Lead, Team Lead, and eventually Delivery Engineering Manager.",
          "I managed comprehensive data annotation across text, code, audio, and specialized video streams. While the role was highly lucrative and recognized (winning 'Top Lead' and 'Rising Star' awards), the transition into pure management pulled me away from the hands-on building I loved. In March 2026, I stepped down to return to my roots."
        ]}
      />
      
      <PhaseSection 
        phase="4"
        period="2026 – Present"
        title="The Builder's Rebirth."
        align="right"
        imageSrc="https://www.theodinproject.com/assets/og-logo-2bdf3a30.png"
        text={[
  "Recognizing that training models is ephemeral, I made a strategic decision to return to building software from the ground up. Instead of manually annotating data for AI, I am now focused on leveraging AI as a productivity multiplier to accelerate my own coding and development workflows.",
  "After a brief recharge, I bridged the gap with flexible freelance work on Alignerr. This gave me the mental bandwidth to dive deep into full-stack development through The Odin Project, mastering both modern front-end technologies (React, Vite) and back-end architecture (Node.js, PostgreSQL).",
  "This phase is about reclaiming the builder's mindset across the board—whether it is web applications, mobile apps, or desktop software. I am focused on translating complex logic into robust products, stepping into the next evolution of my career as a highly productive, AI-empowered Software Engineer."
]}
      />

      {/* Workshop Section */}
      <div className="py-24 border-t border-gray-100 dark:border-neutral-900">
        <Reveal>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Workshop</h2>
            <p className="text-gray-500 dark:text-neutral-400">A selection of recent projects, experiments, and architectural legacy builds.</p>
          </div>
        </Reveal>
        
        <Reveal delay={100} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard 
            title="Left-Right: Tune Your Brain V2" 
            category="Android Game" 
            status="Active" 
            url="https://github.com/muhammedrifas/left-right" 
            icon={Brain} 
          />
          <ProjectCard 
            title="Never Twice" 
            category="Memory & Reflex Challenge" 
            status="Active" 
            url="https://nevertwice.netlify.app/" 
            icon={Brain} 
          />
          <ProjectCard 
            title="Hot-Cold Game" 
            category="Sensory Navigation Puzzle" 
            status="WIP" 
            url="https://github.com/muhammedrifas/hot-cold-game" 
            icon={Activity} 
          />
          <ProjectCard 
            title="Etch-a-Sketch" 
            category="JS / UI Interactions" 
            status="WIP" 
            url="https://github.com/muhammedrifas/etch_a_sketch_grid" 
            icon={Brush} 
          />
          <ProjectCard 
            title="Resumaze" 
            category="Easy Resume Maker" 
            status="WIP" 
            url="https://github.com/muhammedrifas/cv-builder" 
            icon={FileUser} 
          />
          <ProjectCard 
            title="Weatherly" 
            category="Weather in Motion" 
            status="WIP" 
            url="https://github.com/muhammedrifas/weatherly" 
            icon={ThermometerSun} 
          />
          <ProjectCard 
            title="Cricket Expense Manager" 
            category="Player Expense Tracker" 
            status="Offline Repo" 
            url="https://github.com/muhammedrifas/cricket-team-management" 
            icon={Trophy} 
          />
        </Reveal>
      </div>

      {/* Life Outside Code */}
      <div className="py-24 border-t border-gray-100 dark:border-neutral-900">
        <Reveal>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Life Outside the Code</h2>
            <p className="text-gray-500 dark:text-neutral-400">Because building a career requires stepping away from the screen.</p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <Reveal delay={100}>
              <p className="text-lg text-gray-600 dark:text-neutral-400 leading-relaxed">
                When I'm not writing code or analyzing data pipelines, you will almost certainly find me on the cricket pitch. I'm actively involved in local cricket, combining teamwork, strategy, and sheer physical reflex. 
                In fact, my passion for the game even crossed over into my tech life when I built and deployed a custom AWS application to manage per-player expenses for our local squad.
              </p>
            </Reveal>
            
            <Reveal delay={200}>
                <CricketGallery galleryImages={galleryImages} />
            </Reveal>
          </div>
          
          
        </div>
      </div>
      
    </div>
  );
};

const Footer = () => (
  <footer
    id="contact"
    className="py-16 px-6 border-t border-gray-200 dark:border-neutral-900 text-center"
  >
    <Reveal>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-neutral-500 mb-4">
        Get in touch
      </p>

      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
        Have something in mind?
      </h2>

      <p className="max-w-lg mx-auto text-base sm:text-lg leading-relaxed text-gray-600 dark:text-neutral-400 mb-8">
        Whether it's an interesting project, a collaboration, or simply a
        conversation about technology, I'd love to hear from you.
      </p>

      <div className="flex justify-center gap-5 mb-10">
        <a
          href="https://github.com/muhammedrifas"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="p-3 bg-gray-100 dark:bg-neutral-900 rounded-full hover:scale-110 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-all duration-300"
        >
          <Code size={20} />
        </a>

        <a
          href="https://www.linkedin.com/in/muhammedrifas/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="p-3 bg-gray-100 dark:bg-neutral-900 rounded-full hover:scale-110 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-all duration-300"
        >
          <Briefcase size={20} />
        </a>

        <a
          href="mailto:muhammedrifas123@gmail.com"
          aria-label="Email"
          className="p-3 bg-gray-100 dark:bg-neutral-900 rounded-full hover:scale-110 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-all duration-300"
        >
          <Mail size={20} />
        </a>

        <a
          href="tel:+91 9742242419"
          aria-label="Call me"
          className="p-3 bg-gray-100 dark:bg-neutral-900 rounded-full hover:scale-110 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-all duration-300"
        >
          <Phone size={20} />
        </a>
      </div>

      <p className="text-sm text-gray-500 dark:text-neutral-500 mb-3">
        Prefer a direct conversation?
      </p>

      <a
        href="tel:YOUR_PHONE_NUMBER"
        className="text-base font-medium text-gray-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
      >
        +91 9742242419 / +91 9995957419
      </a>

      <p className="text-sm font-medium text-gray-400 dark:text-neutral-600 mt-10">
        © {new Date().getFullYear()} Muhammed Rifas
      </p>
    </Reveal>
  </footer>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState('journey'); // 'summary' or 'journey'

  // Handle theme toggling
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <GlobalStyles />
      
      <Navbar 
        isDark={isDarkMode} 
        toggleTheme={toggleTheme} 
        view={view} 
        setView={setView} 
      />
      
      <main className="w-full">
        <Hero />
        
        {/* Animated View Transition Wrapper */}
        <div className={`transition-opacity duration-500 ${view ? 'opacity-100' : 'opacity-0'}`}>
          {view === 'summary' ? <ExecutiveSummary /> : <NarrativeJourney />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}