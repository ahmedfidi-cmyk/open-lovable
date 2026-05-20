"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "20+", label: "Years Experience" },
  { value: "95+", label: "Projects Done" },
  { value: "200%", label: "Satisfied Clients" },
];

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="border border-stroke rounded-3xl p-8 md:p-10"
              style={{ backgroundColor: "hsl(var(--surface) / 0.4)" }}
            >
              <div className="font-display italic text-text-primary text-6xl md:text-7xl lg:text-8xl leading-none mb-4 tabular-nums">
                {s.value}
              </div>
              <div className="text-sm text-muted uppercase" style={{ letterSpacing: "0.2em" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
