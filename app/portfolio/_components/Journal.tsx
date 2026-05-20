"use client";

import { motion } from "framer-motion";

type Entry = {
  title: string;
  image: string;
  read: string;
  date: string;
};

const ENTRIES: Entry[] = [
  {
    title: "On rituals of slow design",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
    read: "5 min read",
    date: "Apr 22, 2026",
  },
  {
    title: "Composing systems that breathe",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
    read: "8 min read",
    date: "Mar 09, 2026",
  },
  {
    title: "Typography as quiet architecture",
    image:
      "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=400&q=80",
    read: "6 min read",
    date: "Feb 14, 2026",
  },
  {
    title: "Why I keep a paper notebook",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80",
    read: "4 min read",
    date: "Jan 28, 2026",
  },
];

function Pill({ entry, i }: { entry: Entry; i: number }) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex items-center gap-6 p-4 rounded-[40px] sm:rounded-full border border-stroke transition-colors"
      style={{ backgroundColor: "hsl(var(--surface) / 0.3)" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsl(var(--surface))")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "hsl(var(--surface) / 0.3)")}
    >
      <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-stroke">
        <img src={entry.image} alt={entry.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display italic text-text-primary text-xl md:text-2xl truncate">
          {entry.title}
        </div>
        <div className="text-xs text-muted mt-1">{entry.read} · {entry.date}</div>
      </div>
      <div className="hidden sm:flex shrink-0 items-center justify-center w-10 h-10 rounded-full border border-stroke text-text-primary transition-transform group-hover:translate-x-1">
        →
      </div>
    </motion.a>
  );
}

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
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
              <span className="text-xs text-muted uppercase" style={{ letterSpacing: "0.3em" }}>
                Journal
              </span>
            </div>
            <h2 className="text-text-primary text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-md mt-4">
              Notes from the studio — process, principles, small obsessions.
            </p>
          </div>

          <a
            href="#"
            className="group relative hidden md:inline-flex items-center rounded-full text-sm px-5 py-3"
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
              View all <span aria-hidden>→</span>
            </span>
          </a>
        </motion.div>

        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, i) => (
            <Pill key={entry.title} entry={entry} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
