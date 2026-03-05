import { useEffect, useRef, FC } from "react";
import { gsap } from "gsap";
import SpotlightCard from "./SpotlightCard";
import { useNavigate } from "react-router-dom";

export interface ProjectItem {
  id: string;
  img: string;
  link: string;
  title?: string;
  description?: string;
}

interface HorizontalMotionProps {
  items: ProjectItem[];
  gradientColor?: string;
}

const HorizontalMotion: FC<HorizontalMotionProps> = ({
  items = [],
  gradientColor = "transparent",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(window.innerWidth / 2);
  const navigate = useNavigate();

  const handleCardClick = (link: string) => {
    if (!link) return;
    const cleanLink = link.replace("_blank", "").trim();
    if (link.includes("_blank") || cleanLink.startsWith("http")) {
      window.open(cleanLink, "_blank", "noopener,noreferrer");
    } else {
      navigate(cleanLink);
    }
  };

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent): void => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = (): void => {
      // Sur mobile, on désactive ou réduit fortement le mouvement pour éviter les bugs de scroll
      const isMobile = window.innerWidth < 768;
      const maxMoveAmount = isMobile ? 30 : 150;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount =
            ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
              maxMoveAmount / 2) *
            direction;

          gsap.to(row, {
            x: moveAmount,
            duration:
              baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      removeAnimationLoop();
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[100vw] overflow-hidden rounded-xl md:rounded-3xl bg-black/20"
      style={{
        background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
      }}
    >
      <section className="w-full flex flex-col justify-center">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative w-[110%] md:w-[120%] -left-[5%] md:-left-[10%] h-40 md:h-62.5 lg:h-80 flex items-center justify-center p-1 md:p-2 will-change-transform"
            ref={(el) => {
              if (el) rowRefs.current[index] = el;
            }}
          >
            <div
              className="w-full h-full max-w-[100vw] md:max-w-350 cursor-pointer group px-2 md:px-0"
              onClick={() => handleCardClick(item.link)}
            >
              <SpotlightCard
                className="w-full h-full p-0! border border-white/5 rounded-xl md:rounded-3xl shadow-xl overflow-hidden"
                spotlightColor="rgba(255, 255, 255, 0.1)"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.img})` }}
                />

                <div className="cursor-target absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black/95 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-col justify-end md:justify-center w-full md:w-2/3 p-4 md:p-12 z-10">
                  <h3 className="cursor-target text-xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-4 translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500 ease-out drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="cursor-target text-white/80 text-[10px] md:text-base lg:text-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 md:delay-75 max-w-xl line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </SpotlightCard>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HorizontalMotion;
