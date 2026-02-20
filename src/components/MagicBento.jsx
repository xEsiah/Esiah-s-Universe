import { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./MagicBento.css";

const DEFAULT_GLOW_COLOR = "183, 28, 28";

const cardData = [
  {
    title: "Metz Campus",
    image: "/images/MC.png",
    description: "Web platform for students.",
    label: "Web site",
    link: "https://metzcampus.fr",
  },
  {
    title: "Neo Tokyo Rush",
    image: "/images/NTR.png",
    description: "Cyberpunk-inspired beat 'em All game.",
    label: "Gamedev",
    link: "/projects/neo-tokyo-rush",
  },
  {
    title: "About Co Hai Se",
    image: "/images/Cohaise.jpg",
    description: "Crafting the Web of Your Ambitions.",
    label: "Identity",
    link: "/cohaise",
  },
  {
    title: "Contact",
    image: "/images/Contact.jpg",
    description: "Reach out to me.",
    label: "Network",
    link: "/contact",
  },
  {
    title: "Затишок",
    image: "/images/Zatyshok.png",
    description: "Moodboard developped with love.",
    label: "Desktop App",
    link: "/projects/zatyshok",
  },
  {
    title: "Shadow Purge - Rite of the Demon",
    image: "/images/SPRotD.png",
    description: "Hack n'slash RPG.",
    label: "Gamedev",
    link: "/projects/shadow-purge-rite-of-the-demon",
  },
];

const createParticleElement = (x, y, color) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `position: absolute; width: 3px; height: 3px; border-radius: 50%; background: rgba(${color}, 1); box-shadow: 0 0 6px rgba(${color}, 0.6); pointer-events: none; z-index: 10; left: ${x}px; top: ${y}px;`;
  return el;
};

const ParticleCard = ({ children, className, glowColor, onClick, style }) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: () => p.parentNode?.removeChild(p),
      });
    });
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        "--glow-x",
        `${((e.clientX - r.left) / r.width) * 100}%`,
      );
      el.style.setProperty(
        "--glow-y",
        `${((e.clientY - r.top) / r.height) * 100}%`,
      );
    };

    const handleEnter = () => {
      el.style.setProperty("--glow-intensity", "1");
      for (let i = 0; i < 8; i++) {
        const timeout = setTimeout(() => {
          if (!el) return;
          const p = createParticleElement(
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
            x: "+=" + (Math.random() - 0.5) * 40,
            y: "+=" + (Math.random() - 0.5) * 40,
            duration: 1.5 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }, i * 100);
        timeoutsRef.current.push(timeout);
      }
    };

    const handleLeave = () => {
      el.style.setProperty("--glow-intensity", "0");
      clearParticles();
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      clearParticles();
    };
  }, [glowColor, clearParticles]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`${className} cursor-target`}
      style={style}
    >
      {children}
    </div>
  );
};

export default function MagicBento({
  enableBorderGlow = true,
  glowColor = DEFAULT_GLOW_COLOR,
}) {
  const navigate = useNavigate();

  const handleCardClick = (link) => {
    if (link.startsWith("http")) window.open(link, "_blank");
    else navigate(link);
  };

  return (
    <div>
      <div className="card-grid bento-section">
        {cardData.map((card, i) => (
          <ParticleCard
            key={i}
            onClick={() => handleCardClick(card.link)}
            className={`magic-bento-card ${enableBorderGlow ? "magic-bento-card--border-glow" : ""}`}
            glowColor={glowColor}
            style={{
              backgroundImage: card.image ? `url(${card.image})` : "none",
              backgroundColor: card.color || "#060010",
            }}
          >
            {card.image && <div className="magic-bento-card-overlay" />}
            <div className="magic-bento-card__header">
              <div className="magic-bento-card__label">{card.label}</div>
            </div>
            <div className="magic-bento-card__content">
              <h3 className="magic-bento-card__title">{card.title}</h3>
              <p className="magic-bento-card__description">
                {card.description}
              </p>
            </div>
          </ParticleCard>
        ))}
      </div>
    </div>
  );
}
