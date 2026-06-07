import type { Metadata } from "next";
import "./portfolio.css";

export const metadata: Metadata = {
  title: "Michael Smith — Portfolio",
  description:
    "Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="portfolio-root">{children}</div>;
}
