"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

// --- Interfaces ---
export interface CardDataItem {
  title: string;
  image: string;
  description: string;
  label: string;
  link: string;
  color?: string;
}

export interface MagicBentoProps {
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
  disableAnimations?: boolean;
}

const DEFAULT_GLOW_COLOR = "183, 28, 28";

const cardData: CardDataItem[] = [
  {
    title: "Metz Campus",
    image: "/images/Metz-Campus.webp",
    description: "Web platform for students.",
    label: "WordPress Web site",
    link: "https://metzcampus.fr",
  },
  {
    title: "Coeur UA PAM",
    image: "/images/Coeur-UA-PAM.webp",
    description: "Web site of the Coeur UA PAM association.",
    label: "React Web site",
    link: "https://coeur-ua-pam.fr/",
  },
  {
    title: "About Co Hai Se",
    image: "/images/Cohaise.webp",
    description: "Crafting the Web of Your Ambitions.",
    label: "Identity",
    link: "/cohaise",
  },
  {
    title: "Projects",
    image: "/images/Projects.webp",
    description: "Discover who am i by my creations.",
    label: "Identity",
    link: "/projects",
  },
  {
    title: "Затишок",
    image: "/images/Zatyshok.webp",
    description:
      "Moodboard/Planner highly customisable application developed with love !",
    label: "Desktop App",
    link: "/projects/zatyshok",
  },
  {
    title: "Shadow Purge",
    image: "/images/SPRotD.webp",
    description: "Hack n'slash RPG.",
    label: "Gamedev",
    link: "/projects/shadow-purge-rite-of-the-demon",
  },
];

const createParticle = (x: number, y: number, color: string) => {
  const el = document.createElement("div");
  el.className = "absolute w-1 h-1 rounded-full pointer-events-none z-50";
  el.style.backgroundColor = `rgb(${color})`;
  el.style.boxShadow = `0 0 6px rgba(${color}, 0.8)`;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  return el;
};

const ParticleCard: React.FC<{
  card: CardDataItem;
  glowColor: string;
  enableBorderGlow: boolean;
  enableTilt: boolean;
  enableMagnetism: boolean;
  onClick: (link: string) => void;
  className?: string;
}> = ({
  card,
  glowColor,
  enableBorderGlow,
  enableTilt,
  enableMagnetism,
  onClick,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  const clearParticles = useCallback(() => {
    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        onComplete: () => p.remove(),
      });
    });
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
      el.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);

      if (enableTilt) {
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
        gsap.to(el, { rotateX, rotateY, duration: 0.2 });
      }

      if (enableMagnetism) {
        gsap.to(el, {
          x: (x - rect.width / 2) * 0.1,
          y: (y - rect.height / 2) * 0.1,
          duration: 0.3,
        });
      }
    };

    const handleMouseEnter = () => {
      el.style.setProperty("--glow-intensity", "1");
      for (let i = 0; i < 6; i++) {
        const p = createParticle(
          Math.random() * el.offsetWidth,
          Math.random() * el.offsetHeight,
          glowColor,
        );
        el.appendChild(p);
        particlesRef.current.push(p);
        gsap.fromTo(
          p,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3 },
        );
        gsap.to(p, {
          x: "+=" + (Math.random() - 0.5) * 50,
          y: "+=" + (Math.random() - 0.5) * 50,
          duration: 1.5 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    };

    const handleMouseLeave = () => {
      el.style.setProperty("--glow-intensity", "0");
      gsap.to(el, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.5 });
      clearParticles();
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      clearParticles();
    };
  }, [glowColor, enableTilt, enableMagnetism, clearParticles]);

  return (
    <div
      ref={cardRef}
      onClick={() => onClick(card.link)}
      className={`cursor-target group relative flex flex-col justify-between aspect-4/3 min-h-55 w-full p-6 rounded-[20px] border border-[#1a0505] bg-[#050000] bg-cover bg-center overflow-hidden transition-all duration-300 z-10 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(183,28,28,0.2)] ${className}`}
      style={{
        backgroundImage: `url(${card.image})`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/80 z-0 pointer-events-none" />

      {enableBorderGlow && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={
            {
              opacity: "var(--glow-intensity, 0)",
              padding: "6px",
              borderRadius: "20px",
              background: `radial-gradient(500px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(${glowColor}, 1) 0%, rgba(${glowColor}, 0.4) 50%, transparent 80%)`,
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            } as React.CSSProperties
          }
        />
      )}

      <div className="relative z-20 pointer-events-none">
        <span className="text-xs font-bold text-[#b71c1c] uppercase tracking-[2px]">
          {card.label}
        </span>
      </div>

      <div className="relative z-20 opacity-100 pointer-events-none">
        <h3 className="text-xl font-semibold text-white mt-2">{card.title}</h3>
        <p className="text-sm text-white/70 leading-relaxed mt-1">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default function MagicBento({
  enableBorderGlow = true,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  enableMagnetism = true,
}: MagicBentoProps) {
  const navigate = useNavigate();

  const handleCardClick = (link: string) => {
    if (link.startsWith("http")) window.open(link, "_blank");
    else navigate(link);
  };

  const spanClasses = [
    "col-span-1",
    "lg:col-span-1",
    "lg:col-span-2 lg:row-span-2",
    "lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-2",
    "col-span-1",
    "lg:col-start-4 lg:row-start-3",
  ];

  return (
    <div className="w-full max-w-300 mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {cardData.map((card, i) => (
          <ParticleCard
            key={i}
            card={card}
            className={spanClasses[i] || ""}
            glowColor={glowColor}
            enableBorderGlow={enableBorderGlow}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}
