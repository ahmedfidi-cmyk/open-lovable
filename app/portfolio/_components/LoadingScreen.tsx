"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ROTATING_WORDS = ["Design", "Create", "Inspire"];
const DURATION_MS = 2700;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let frame = 0;
    let raf = 0;
    const start = performance.now();

    const tick = (t: number) => {
      const elapsed = t - start;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const next = Math.floor(progress * 100);
      setCount(next);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(100);
        window.setTimeout(onComplete, 400);
      }
      frame++;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 900);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg">
      {/* Top-left label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-6 left-6 md:top-8 md:left-10 text-xs text-muted uppercase"
        style={{ letterSpacing: "0.3em" }}
      >
        Portfolio
      </motion.div>

      {/* Center rotating words */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display italic text-4xl md:text-6xl lg:text-7xl text-text-primary"
            style={{ opacity: 0.8 }}
          >
            {ROTATING_WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 font-display text-text-primary text-6xl md:text-8xl lg:text-9xl tabular-nums leading-none">
        {String(count).padStart(3, "0")}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke" style={{ background: "hsl(0 0% 12% / 0.5)" }}>
        <div
          className="accent-gradient h-full origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            transition: "transform 80ms linear",
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
          }}
        />
      </div>
    </div>
  );
}
