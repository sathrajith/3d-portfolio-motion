import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ExternalLink,
  Github,
  Code2,
  Palette,
  Globe,
  Layers,
  Sparkles,
  Cpu,
  Zap,
  ChevronRight,
  Mail,
  FileText,
  Users,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.svg";
import HeroScene from "@/components/3d/HeroScene";
import Particles from "@/components/3d/Particles";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import FloatingShapes from "@/components/3d/FloatingShapes";

function useParallax(value: number, distance: number) {
  return useTransform(useScroll().scrollYProgress, [0, 1], [0, distance]);
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold"
      >
        <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          {children}
        </span>
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full mx-auto mt-4"
      />
    </div>
  );
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- Project Data ---
const projects = [
  {
    title: "Customer Relationship Management (CRM) System",
    description: "Architected and developed a full-stack CRM web application to streamline client and lead management workflows.",
    tags: ["Java", "Spring Boot", "MySQL", "HTML", "CSS", "JavaScript"],
    image: null,
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderGlow: "group-hover:shadow-cyan-500/20",
    icon: <Users className="h-6 w-6" />,
    highlights: [
      "Built RESTful APIs with Spring Boot for customer/lead CRUD operations, search by name, ID, or email, and role-based access control.",
      "Implemented task scheduling with reminders, automated report generation, and email integration for seamless communication.",
      "Secured the application with username/password authentication and session management, ensuring data integrity and role-based permissions.",
    ],
  },
  {
    title: "cookurresume.com",
    description: "Developed a dynamic resume builder application with a React.js frontend enabling users to create, customize, and export professional resumes.",
    tags: ["React.js", "Java", "Spring Boot", "MySQL"],
    image: null,
    gradient: "from-violet-500/20 to-purple-500/20",
    borderGlow: "group-hover:shadow-violet-500/20",
    icon: <FileText className="h-6 w-6" />,
    liveUrl: "#",
    sourceUrl: "#",
    highlights: [
      "Built a Spring Boot backend with REST APIs to handle user data persistence, template management, and PDF generation.",
      "Implemented real-time preview functionality allowing users to see live changes as they fill in resume sections.",
    ],
  },
  {
    title: "Personal Portfolio",
    description: "Designed and developed a responsive personal portfolio website using React.js showcasing projects, skills, and contact information.",
    tags: ["React.js", "CSS3", "JavaScript"],
    image: null,
    gradient: "from-amber-500/20 to-orange-500/20",
    borderGlow: "group-hover:shadow-amber-500/20",
    icon: <Palette className="h-6 w-6" />,
    liveUrl: "#",
    sourceUrl: "#",
    highlights: [
      "Implemented smooth navigation, animated UI components, and mobile-first design for an optimal user experience across devices.",
    ],
  },
];

// --- Skills Data ---
const skillCategories = [
  {
    name: "Languages",
    icon: <Code2 className="h-4 w-4" />,
    color: "from-cyan-400 to-blue-500",
    skills: ["Java", "JavaScript", "C"],
  },
  {
    name: "Backend",
    icon: <Zap className="h-4 w-4" />,
    color: "from-emerald-400 to-teal-500",
    skills: ["Spring Boot", "RESTful API", "Maven"],
  },
  {
    name: "Frontend",
    icon: <Palette className="h-4 w-4" />,
    color: "from-violet-400 to-purple-500",
    skills: ["React.js", "HTML", "CSS"],
  },
  {
    name: "Database",
    icon: <Database className="h-4 w-4" />,
    color: "from-amber-400 to-orange-500",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    name: "Tool",
    icon: <Code2 className="h-4 w-4" />,
    color: "from-rose-400 to-pink-500",
    skills: ["Git", "GitHub", "Postman"],
  },
];

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <HeroScene />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-xs font-medium border-cyan-500/30 text-cyan-400 bg-cyan-500/10 mb-6 backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3 mr-1.5 inline" />
              Full-Stack Developer
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-200 bg-clip-text text-transparent">
              Hi, I'm
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Sathrajith
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Crafting immersive digital experiences with cutting-edge technology.
            I build performant, beautiful applications that push the boundaries of the web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="h-12 px-8 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-medium rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              View My Work
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              variant="outline"
              className="h-12 px-8 border-border/50 hover:border-cyan-500/50 text-foreground rounded-full bg-background/50 backdrop-blur-sm transition-all duration-300"
            >
              Get In Touch
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="relative min-h-screen py-24 sm:py-32 overflow-hidden">
        <Particles />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle>About Me</SectionTitle>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* About Text */}
            <AnimatedSection delay={0.1}>
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  I'm a passionate full-stack developer with a love for creating
                  exceptional digital experiences. With expertise in modern web
                  technologies, I transform complex problems into elegant,
                  intuitive solutions.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  My journey in tech spans across building scalable applications,
                  crafting beautiful UIs, and exploring the intersection of
                  creativity and code. I believe in writing clean, maintainable
                  code that stands the test of time.
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-3 gap-4 pt-4"
                >
                  {[
                    { value: "5+", label: "Years Exp" },
                    { value: "50+", label: "Projects" },
                    { value: "30+", label: "Clients" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-cyan-500/20 transition-colors"
                    >
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Skills */}
            <AnimatedSection delay={0.3}>
              <div className="p-6 sm:p-8 rounded-2xl bg-secondary/20 border border-border/30 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
                  <Zap className="h-5 w-5 text-cyan-400" />
                  Technical Skills
                </h3>
                <div className="space-y-5">
                  {skillCategories.map((category, i) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-cyan-400">
                          {category.icon}
                        </div>
                        <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                          {category.name}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 pl-9">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-secondary/40 border border-border/30 text-muted-foreground hover:text-foreground hover:border-cyan-500/40 transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        <Particles />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle>Featured Projects</SectionTitle>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <AnimatedSection key={i} delay={0.05 * i}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative h-full p-[1px] rounded-2xl bg-gradient-to-b from-border/50 to-transparent hover:from-cyan-500/30 hover:to-violet-500/30 transition-all duration-500"
                >
                  <div className="relative h-full rounded-2xl bg-card/80 backdrop-blur-sm overflow-hidden">
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Project icon placeholder */}
                    <div className="relative p-6 sm:p-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                        {project.icon}
                      </div>

                      <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {project.description}
                      </p>

                      {project.highlights && (
                        <ul className="space-y-1.5 mb-4">
                          {project.highlights.map((highlight, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-muted-foreground/80 leading-relaxed flex items-start gap-2"
                            >
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-400 shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-secondary/50 border-border/30"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-muted-foreground hover:text-cyan-400 transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Live Demo
                          </a>
                        )}
                        {project.sourceUrl && (
                          <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-muted-foreground hover:text-cyan-400 transition-colors"
                          >
                            <Github className="h-3.5 w-3.5" />
                            Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="relative min-h-screen py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
        <FloatingShapes />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle>Get In Touch</SectionTitle>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-4xl mx-auto">
            {/* Contact Info */}
            <AnimatedSection delay={0.1}>
              <div className="space-y-8">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  Have a project in mind or just want to say hello?
                  I'd love to hear from you. Drop me a message and I'll get
                  back to you as soon as possible.
                </motion.p>

                <div className="space-y-4">
                  {[
                    { icon: <Mail className="h-5 w-5" />, label: "Email", value: "isathrajith@gmail.com", href: "mailto:isathrajith@gmail.com" },
                    { icon: <Github className="h-5 w-5" />, label: "GitHub", value: "github.com/sathrajith", href: "https://github.com" },
                    { icon: <Globe className="h-5 w-5" />, label: "Location", value: "Remote / Worldwide" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * i }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/20 border border-border/30 hover:border-cyan-500/20 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium hover:text-cyan-400 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-sm font-medium">{item.value}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.3}>
              <div className="p-6 sm:p-8 rounded-2xl bg-secondary/20 border border-border/30 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-6 text-foreground">
                  Send a Message
                </h3>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-border/30 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" width={24} height={24} className="rounded" />
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sathrajith. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            {["GitHub", "LinkedIn", "Twitter"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}


