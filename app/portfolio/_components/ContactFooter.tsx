"use client";

import { useEffect, useRef } from "react";

const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const MARQUEE_TEXT = "BUILDING THE FUTURE • ";

const SOCIALS: Array<{ label: string; href: string }> = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // HLS setup (flipped vertically)
  useEffect(() => {
    let hlsInstance: { destroy: () => void } | null = null;
    const video = videoRef.current;
    if (!video) return;

    (async () => {
      const Hls = (await import("hls.js")).default;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(HLS_SRC);
        hls.attachMedia(video);
        hlsInstance = hls;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HLS_SRC;
      }
    })();

    return () => hlsInstance?.destroy();
  }, []);

  // GSAP marquee
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const gsap = (await import("gsap")).default;
      const el = marqueeRef.current;
      if (!el) return;
      ctx = gsap.context(() => {
        gsap.to(el, {
          xPercent: -50,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      });
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <footer className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Flipped background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translate(-50%, -50%) scaleY(-1)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[hsl(var(--bg))] to-transparent" />
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden mb-16 md:mb-24">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap font-display italic text-text-primary text-6xl md:text-8xl lg:text-9xl will-change-transform"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="px-4">
              {MARQUEE_TEXT}
            </span>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={`b-${i}`} className="px-4">
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center">
        <div className="text-xs text-muted uppercase mb-5" style={{ letterSpacing: "0.3em" }}>
          Contact
        </div>
        <h2 className="text-text-primary text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8">
          Let’s build something{" "}
          <span className="font-display italic">together</span>.
        </h2>

        <a
          href="mailto:hello@michaelsmith.com"
          className="group relative inline-flex items-center rounded-full text-sm md:text-base px-7 py-4 mb-16"
        >
          <span
            className="absolute opacity-0 group-hover:opacity-100 accent-gradient rounded-full transition-opacity duration-300"
            style={{ inset: -2 }}
            aria-hidden
          />
          <span
            className="relative inline-flex items-center gap-2 rounded-full px-7 py-4 -mx-7 -my-4 border border-stroke text-text-primary"
            style={{ backgroundColor: "hsl(var(--bg))" }}
          >
            hello@michaelsmith.com <span aria-hidden>↗</span>
          </span>
        </a>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-stroke">
        <div className="flex flex-wrap items-center gap-5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted hover:text-text-primary transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="relative inline-flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
          </span>
          <span className="text-sm text-muted">Available for projects</span>
        </div>

        <div className="text-xs text-muted">© 2026 Michael Smith</div>
      </div>
    </footer>
  );
}
