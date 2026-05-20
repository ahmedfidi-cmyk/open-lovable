"use client";

import { motion } from "framer-motion";

type Project = {
  title: string;
  category: string;
  image: string;
  span: string;
  aspect: string;
};

const PROJECTS: Project[] = [
  {
    title: "Automotive Motion",
    category: "Branding · Motion",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
  {
    title: "Urban Architecture",
    category: "Editorial · Photography",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[16/11]",
  },
  {
    title: "Human Perspective",
    category: "Portrait · Story",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[16/11]",
  },
  {
    title: "Brand Identity",
    category: "Identity · System",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
];

function HoverPill({ title }: { title: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
      <div className="relative">
        <span
          className="absolute accent-gradient-animated rounded-full"
          style={{ inset: -2 }}
          aria-hidden
        />
        <span className="relative inline-flex items-center gap-2 rounded-full bg-white text-black text-sm px-5 py-2.5 whitespace-nowrap">
          View — <span className="font-display italic">{title}</span>
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative ${project.span} bg-surface border border-stroke rounded-3xl overflow-hidden ${project.aspect} block`}
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
      />

      {/* Halftone overlay */}
      <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply" />

      {/* Hover blur layer */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" style={{ backdropFilter: "blur(0px)" }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", backgroundColor: "hsl(var(--bg) / 0.5)" }} />

      <HoverPill title={project.title} />

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between text-text-primary z-[1]">
        <div>
          <div className="font-display italic text-2xl md:text-3xl leading-tight">
            {project.title}
          </div>
          <div className="text-xs text-muted mt-1">{project.category}</div>
        </div>
        <div className="text-xs text-muted">2026</div>
      </div>
    </motion.a>
  );
}

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-stroke" />
              <span
                className="text-xs text-muted uppercase"
                style={{ letterSpacing: "0.3em" }}
              >
                Selected Work
              </span>
            </div>
            <h2 className="text-text-primary text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Featured <span className="font-display italic">projects</span>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-md mt-4">
              A selection of projects I’ve worked on, from concept to launch.
            </p>
          </div>

          <a
            href="#"
            className="group relative hidden md:inline-flex items-center rounded-full text-sm px-5 py-3 self-start md:self-auto"
          >
            <span
              className="absolute opacity-0 group-hover:opacity-100 accent-gradient rounded-full transition-opacity duration-300"
              style={{ inset: -2 }}
              aria-hidden
            />
            <span
              className="relative inline-flex items-center gap-2 rounded-full px-5 py-3 -mx-5 -my-3 border border-stroke text-text-primary"
              style={{ backgroundColor: "hsl(var(--bg))" }}
            >
              View all work <span aria-hidden>→</span>
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
