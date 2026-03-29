import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ExternalLink } from "lucide-react";

interface CarouselItem {
  name: string;
  label: string;
  url: string;
  image: string;
}

interface InfiniteCarouselProps {
  items: CarouselItem[];
}

export default function InfiniteCarousel({ items }: InfiniteCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const scrollSpeed = 50; // Pixels par seconde

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || items.length === 0) return;

    const initAnimation = () => {
      const totalWidth = container.scrollWidth;
      const loopPoint = totalWidth / 2;

      if (animationRef.current) animationRef.current.kill();

      // 1. Création de l'animation
      animationRef.current = gsap.to(container, {
        scrollLeft: loopPoint,
        duration: loopPoint / scrollSpeed,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          container.scrollLeft = 0;
        },
      });

      // 2. LE CHANGEMENT : On avance l'animation dès le départ
      // 0.15 signifie que l'on commence à 15% du premier trajet
      animationRef.current.progress(0.15);
    };

    // On attend un court instant que le layout soit calculé
    const timer = setTimeout(initAnimation, 100);

    const pause = () => animationRef.current?.pause();
    const resume = () => animationRef.current?.play();

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);
    container.addEventListener("touchstart", pause);
    container.addEventListener("touchend", resume);

    return () => {
      clearTimeout(timer);
      animationRef.current?.kill();
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
      container.removeEventListener("touchstart", pause);
      container.removeEventListener("touchend", resume);
    };
  }, [items, scrollSpeed]);

  return (
    <div
      ref={scrollContainerRef}
      className="relative z-10 w-full overflow-hidden no-scrollbar py-4 cursor-grab active:cursor-grabbing"
    >
      <div className="flex gap-6 px-4 md:px-12 w-max">
        {[...items, ...items].map((item, index) => (
          <a
            key={`${item.url}-${index}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group aspect-3/4 h-[50vh] md:h-[60vh] shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/30"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="cursor-target absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-8 text-center">
              <span className="text-2xl font-bold text-white mb-1">
                {item.name}
              </span>
              <span className="text-sm text-white/70 mb-4">{item.label}</span>
              <div className="cursor-target bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 hover:scale-110 transition-all duration-300">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
