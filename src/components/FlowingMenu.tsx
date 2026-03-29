/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./FlowingMenu.css";
import AnimatedContent from "./AnimatedContent";

gsap.registerPlugin(ScrollToPlugin);

// --- Définition des Types pour éviter l'erreur 'never[]' ---
export interface FlowingMenuItem {
  text: string;
  image: string;
  Component?: React.ComponentType;
}

interface FlowingMenuProps {
  items?: FlowingMenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = "#fff",
  bgColor = "transparent",
  marqueeBgColor = "rgba(0,0,0,0.8)",
  marqueeTextColor = "#fff",
  borderColor = "rgba(255,255,255,0.1)",
}) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleItem = (idx: number) => {
    if (isTransitioning) return;
    if (activeIdx === idx) {
      setActiveIdx(null);
      return;
    }
    if (activeIdx !== null) {
      setIsTransitioning(true);
      setActiveIdx(null);
      setTimeout(() => {
        setActiveIdx(idx);
        setIsTransitioning(false);
      }, 500);
    } else {
      setActiveIdx(idx);
    }
  };

  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            isOpen={activeIdx === idx}
            onClick={() => toggleItem(idx)}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
        <div style={{ height: "0px", width: "100%", pointerEvents: "none" }} />
      </nav>
    </div>
  );
};

// --- Sous-composant MenuItem ---
interface MenuItemProps extends FlowingMenuItem {
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  isOpen: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isOpen,
  onClick,
  Component,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [repetitions, setRepetitions] = useState(2);
  // État local pour retarder le montage du composant Masonry le temps que l'animation commence
  const [shouldRenderContent, setShouldRenderContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRenderContent(true);
    } else {
      // On attend la fin de l'animation de fermeture pour démonter
      const timer = setTimeout(() => setShouldRenderContent(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const singlePart = marqueeInnerRef.current.querySelector(
        ".marquee__part",
      ) as HTMLElement;
      if (!singlePart) return;
      const partWidth = singlePart.offsetWidth;
      const windowWidth = window.innerWidth;
      if (partWidth > 0) {
        setRepetitions(Math.ceil(windowWidth / partWidth) + 4);
      }
    };
    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [text]);

  useEffect(() => {
    if (!marqueeInnerRef.current) return;
    const marqueeContent = marqueeInnerRef.current.querySelector(
      ".marquee__part",
    ) as HTMLElement;
    if (!marqueeContent) return;
    const contentWidth = marqueeContent.offsetWidth;
    const tl = gsap.to(marqueeInnerRef.current, {
      x: -contentWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tl.kill();
    };
  }, [speed, repetitions]);

  useEffect(() => {
    if (isOpen && itemRef.current) {
      const isMobile = window.innerWidth < 768;
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(window, {
        duration: isMobile ? 0.8 : 1,
        delay: 0.1,
        scrollTo: {
          y: itemRef.current,
          offsetY: isMobile ? 0 : 60,
          autoKill: false,
        },
        ease: "power3.inOut",
      });
      gsap.to(marqueeRef.current, {
        y: "101%",
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`menu__item ${isOpen ? "is-open" : ""}`}
      ref={itemRef}
      style={{ borderColor }}
    >
      <AnimatedContent
        distance={160}
        direction="horizontal"
        reverse={true}
        duration={2}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        delay={0.1}
      >
        <div
          className="menu__item-link"
          onClick={onClick}
          onMouseEnter={() =>
            !isOpen &&
            gsap.to(marqueeRef.current, {
              y: "0%",
              duration: 0.6,
              ease: "expo",
            })
          }
          onMouseLeave={() =>
            gsap.to(marqueeRef.current, {
              y: "101%",
              duration: 0.6,
              ease: "expo",
            })
          }
        >
          {text}
        </div>
      </AnimatedContent>
      <div
        className="service-details-wrapper"
        ref={contentRef}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        <div className="details-inner px-4 py-8 md:px-12 md:py-12 w-full">
          {shouldRenderContent && Component && <Component />}
        </div>
      </div>
      <div
        className="marquee"
        ref={marqueeRef}
        style={{ transform: "translate3d(0, 101%, 0)" }}
      >
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef}>
            {[...Array(repetitions)].map((_, idx) => (
              <div
                className="marquee__part"
                key={idx}
                style={{ color: marqueeTextColor }}
              >
                <span>{text}</span>
                <div
                  className="marquee__img"
                  style={{ backgroundImage: `url(${image})` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
