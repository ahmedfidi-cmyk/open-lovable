"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./_components/LoadingScreen";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import SelectedWorks from "./_components/SelectedWorks";
import Journal from "./_components/Journal";
import Explorations from "./_components/Explorations";
import Stats from "./_components/Stats";
import ContactFooter from "./_components/ContactFooter";

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("portfolio-html");
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("portfolio-html");
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Stats />
        <ContactFooter />
      </main>
    </>
  );
}
