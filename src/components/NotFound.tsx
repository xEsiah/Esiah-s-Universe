import React from "react";
import { Link } from "react-router-dom";
import AnimatedContent from "@/components/AnimatedContent";
import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-[30vh] min-h-[120vh] pointer-events-none relative z-10">
      <SEO
        title="404 - Lost in Space"
        description="The coordinates you are looking for do not exist in Esiah's Universe."
      />
      <AnimatedContent
        distance={50}
        direction="vertical"
        duration={1.5}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
      >
        <section className="text-center mb-16 min-h-[60vh] pointer-events-none px-4">
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold mb-4 text-[#b71c1c] [text-shadow:0_0_20px_rgba(183,28,28,0.4)] leading-tight">
            404
          </h1>
          <h2 className="text-[clamp(0.9rem,2vw,1.2rem)] text-[#a6a6a9] tracking-[2px] mx-auto mb-8">
            Coordinates Not Found
          </h2>

          <span className="block max-w-md mb-12 text-white/50 text-lg mx-auto">
            You've reached the edge of the known universe. This page has drifted
            away or never existed in this galaxy.
          </span>

          <Link
            to="/"
            className="cursor-target px-8 py-4 bg-[#b71c1c] text-white font-bold rounded-full hover:bg-[#d32f2f] hover:scale-105 transition-all shadow-lg"
          >
            Back to Home
          </Link>
        </section>
      </AnimatedContent>
    </div>
  );
}
