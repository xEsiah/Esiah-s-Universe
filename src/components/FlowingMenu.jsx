/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./FlowingMenu.css";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = "#fff",
  bgColor = "transparent",
  marqueeBgColor = "rgba(0,0,0,0.8)", // Sera écrasé par le CSS pour le glassmorphism
  marqueeTextColor = "#fff",
  borderColor = "rgba(255,255,255,0.1)",
}) {
  const [activeIdx, setActiveIdx] = useState(null);

  const toggleItem = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
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
      </nav>
    </div>
  );
}

function MenuItem({
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
}) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const contentRef = useRef(null);

  const [repetitions, setRepetitions] = useState(2);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;

      const singlePart =
        marqueeInnerRef.current.querySelector(".marquee__part");
      if (!singlePart) return;

      const partWidth = singlePart.offsetWidth;
      const windowWidth = window.innerWidth;

      if (partWidth > 0) {
        const needed = Math.ceil(windowWidth / partWidth) + 4;
        setRepetitions(needed);
      }
    };

    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [text]);

  useEffect(() => {
    const marqueeContent =
      marqueeInnerRef.current?.querySelector(".marquee__part");
    if (!marqueeContent) return;

    const contentWidth = marqueeContent.offsetWidth;
    if (contentWidth === 0) return;

    const tl = gsap.to(marqueeInnerRef.current, {
      x: -contentWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    return () => tl.kill();
  }, [speed, repetitions]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(window, {
        duration: 1,
        delay: 0.4,
        scrollTo: {
          y: itemRef.current,
          offsetY: 60,
          autoKill: true,
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

  const handleMouseEnter = () => {
    if (isOpen) return;

    gsap.to(marqueeRef.current, { y: "0%", duration: 0.6, ease: "expo" });
    gsap.set(marqueeInnerRef.current, { force3D: true });
  };

  const handleMouseLeave = () => {
    gsap.to(marqueeRef.current, { y: "101%", duration: 0.6, ease: "expo" });
  };

  return (
    <div
      className={`menu__item ${isOpen ? "is-open" : ""}`}
      ref={itemRef}
      style={{ borderColor }}
    >
      <div
        className={`menu__item-link ${isOpen ? "link-active" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {text}
      </div>

      {/* ZONE DÉTAILS */}
      <div
        className="service-details-wrapper"
        ref={contentRef}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        <div className="details-inner">{Component && <Component />}</div>
      </div>

      {/* MARQUEE */}
      {/* Note : Le background est géré par le CSS pour le glassmorphism */}
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap">
          <div
            className="marquee__inner"
            ref={marqueeInnerRef}
            aria-hidden="true"
          >
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
}

export default FlowingMenu;
