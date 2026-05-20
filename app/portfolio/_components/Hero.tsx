"use client";

import { useEffect, useRef, useState } from "react";

const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // HLS setup
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

    return () => {
      hlsInstance?.destroy();
    };
  }, []);

  // Cycle roles every 2s
  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  // GSAP entrance
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const gsap = (await import("gsap")).default;
      const root = containerRef.current;
      if (!root) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          ".name-reveal",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
        );
        tl.fromTo(
          ".blur-in",
          { opacity: 0, filter: "blur(10px)", y: 20 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1, delay: 0 },
          "-=0.9",
        );
      }, root);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-bg"
    >
      {/* Background HLS video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(var(--bg))] to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div
          className="blur-in text-xs text-muted uppercase mb-8"
          style={{ letterSpacing: "0.3em" }}
        >
          COLLECTION ’26
        </div>

        <h1 className="name-reveal font-display italic text-text-primary text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-6">
          Michael Smith
        </h1>

        <div className="blur-in text-base md:text-lg text-text-primary mb-6">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          lives in Chicago.
        </div>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Designing seamless digital interactions by focusing on the unique nuances which
          bring systems to life.
        </p>

        <div className="blur-in inline-flex gap-4 flex-wrap items-center justify-center">
          <a
            href="#work"
            className="group relative rounded-full text-sm px-7 py-3.5 transition-transform duration-300 hover:scale-105"
          >
            <span
              className="absolute opacity-0 group-hover:opacity-100 accent-gradient rounded-full transition-opacity duration-300"
              style={{ inset: -2 }}
              aria-hidden
            />
            <span className="relative inline-flex items-center rounded-full px-7 py-3.5 -mx-7 -my-3.5 bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors" style={{ backgroundColor: "hsl(var(--text))", color: "hsl(var(--bg))" }}>
              See Works
            </span>
          </a>

          <a
            href="mailto:hello@michaelsmith.com"
            className="group relative rounded-full text-sm px-7 py-3.5 transition-transform duration-300 hover:scale-105"
          >
            <span
              className="absolute opacity-0 group-hover:opacity-100 accent-gradient rounded-full transition-opacity duration-300"
              style={{ inset: -2 }}
              aria-hidden
            />
            <span
              className="relative inline-flex items-center rounded-full px-7 py-3.5 -mx-7 -my-3.5 text-text-primary border-2 border-stroke group-hover:border-transparent transition-colors"
              style={{ backgroundColor: "hsl(var(--bg))" }}
            >
              Reach out…
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span
          className="text-xs text-muted uppercase"
          style={{ letterSpacing: "0.2em" }}
        >
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <div
            className="absolute top-0 left-0 right-0 h-1/2 accent-gradient animate-scroll-down"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
