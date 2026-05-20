"use client";

import { useEffect, useRef, useState } from "react";

type Item = { image: string; rotate: number };

const LEFT: Item[] = [
  { image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80", rotate: -2 },
  { image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80", rotate: 3 },
  { image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80", rotate: -1 },
];

const RIGHT: Item[] = [
  { image: "https://images.unsplash.com/photo-1473800447596-01729482b8eb?auto=format&fit=crop&w=900&q=80", rotate: 2 },
  { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", rotate: -3 },
  { image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80", rotate: 1 },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const gsapMod = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const content = contentRef.current;
      const leftCol = leftColRef.current;
      const rightCol = rightColRef.current;
      if (!section || !content || !leftCol || !rightCol) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: content,
          pinSpacing: false,
        });

        gsap.to(leftCol, {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(rightCol, {
          y: -400,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, section);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[300vh] bg-bg overflow-hidden"
    >
      {/* Layer 1: pinned center */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase" style={{ letterSpacing: "0.3em" }}>
            Explorations
          </span>
          <span className="w-8 h-px bg-stroke" />
        </div>
        <h2 className="text-text-primary text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight">
          Visual <span className="font-display italic">playground</span>
        </h2>
        <p className="text-muted text-sm md:text-base max-w-md mt-5">
          Side projects, shots, and experiments. A loose archive of ideas that didn’t
          want to wait for a brief.
        </p>
        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noreferrer"
          className="group relative mt-8 inline-flex items-center rounded-full text-sm px-5 py-3"
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
            See on Dribbble <span aria-hidden>↗</span>
          </span>
        </a>
      </div>

      {/* Layer 2: parallax columns */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-[20vh] grid grid-cols-2 gap-12 md:gap-40">
          <div ref={leftColRef} className="flex flex-col gap-12 md:gap-24 items-end">
            {LEFT.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightbox(item.image)}
                className="pointer-events-auto block aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface transition-transform duration-500 hover:scale-[1.03]"
                style={{ transform: `rotate(${item.rotate}deg)` }}
                aria-label="Open exploration"
              >
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div ref={rightColRef} className="flex flex-col gap-12 md:gap-24 items-start md:mt-32">
            {RIGHT.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightbox(item.image)}
                className="pointer-events-auto block aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface transition-transform duration-500 hover:scale-[1.03]"
                style={{ transform: `rotate(${item.rotate}deg)` }}
                aria-label="Open exploration"
              >
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <button
          type="button"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
          aria-label="Close"
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-[92vw] max-h-[92vh] object-contain rounded-xl"
          />
        </button>
      )}
    </section>
  );
}
