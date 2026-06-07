"use client";

import { useEffect, useState } from "react";

const LINKS = ["Home", "Work", "Resume"] as const;
type Link = (typeof LINKS)[number];

export default function Navbar() {
  const [active, setActive] = useState<Link>("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <nav
        className={`inline-flex items-center rounded-full border border-white/10 px-2 py-2 bg-surface transition-shadow ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      >
        {/* Logo */}
        <a
          href="#home"
          className="group relative inline-flex items-center justify-center w-9 h-9 rounded-full overflow-hidden transition-transform duration-300 hover:scale-110"
          aria-label="Home"
        >
          <span className="absolute inset-0 accent-gradient" />
          <span className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary">JA</span>
          </span>
        </a>

        {/* Divider */}
        <span className="hidden md:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        <ul className="flex items-center">
          {LINKS.map((label) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => setActive(label)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
                  active === label
                    ? "text-text-primary"
                    : "text-muted hover:text-text-primary"
                }`}
                style={
                  active === label
                    ? { background: "hsl(0 0% 12% / 0.5)" }
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (active !== label) {
                    e.currentTarget.style.background = "hsl(0 0% 12% / 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== label) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <span className="hidden md:block w-px h-5 bg-stroke mx-1" />

        {/* Say hi button */}
        <a
          href="mailto:hello@michaelsmith.com"
          className="group relative inline-flex items-center justify-center rounded-full text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
        >
          <span
            className="absolute opacity-0 group-hover:opacity-100 accent-gradient rounded-full transition-opacity duration-300"
            style={{ inset: -2 }}
            aria-hidden
          />
          <span className="relative inline-flex items-center gap-1 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 -mx-3 sm:-mx-4 -my-1.5 sm:-my-2 text-text-primary bg-surface" style={{ backdropFilter: "blur(12px)" }}>
            Say hi <span aria-hidden>↗</span>
          </span>
        </a>
      </nav>
    </header>
  );
}
