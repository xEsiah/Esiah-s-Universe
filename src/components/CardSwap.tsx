import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactElement,
  HTMLAttributes,
} from "react";
import gsap from "gsap";

// --- Types ---
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

interface CardSwapProps {
  width?: string | number;
  maxWidth?: number;
  aspectRatio?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "elastic" | "smooth";
  children: React.ReactNode;
}

// --- Composant Card ---
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, className, onClick, style, ...rest }, ref) => (
    <div
      ref={ref}
      onClick={onClick}
      {...rest}
      className={`absolute top-1/2 left-1/2 w-[80%] md:w-[85%] h-full transform-3d will-change-transform ${customClass ?? ""} ${className ?? ""}`.trim()}
      style={{ ...style, pointerEvents: "auto", cursor: "pointer" }}
    />
  ),
);
Card.displayName = "Card";

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number,
  containerWidth: number,
): Slot => {
  let factorX = 0.6;
  let factorY = 0.5;

  if (containerWidth < 768) {
    factorX = 0.25;
    factorY = 0.25;
  } else if (containerWidth < 1300) {
    const progress = (containerWidth - 768) / (1300 - 768);
    factorX = 0.3 + progress * 0.3;
    factorY = 0.4;
  }

  const totalWidth = (total - 1) * distX * factorX;
  const centeringOffset = totalWidth / 2;

  return {
    x: i * distX * factorX - centeringOffset,
    y: -i * distY * factorY,
    z: -i * distX * 2 * factorX,
    zIndex: total - i,
  };
};

const placeNow = (el: HTMLDivElement | null, slot: Slot, skew: number) => {
  if (!el) return;
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -40,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
};

const CardSwap: React.FC<CardSwapProps> = ({
  width = "100%",
  maxWidth = 1100,
  aspectRatio = 2.2,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length],
  );
  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i),
  );
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);

  const [currentWidth, setCurrentWidth] = useState(0);

  const config = useMemo(
    () =>
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: "power1.inOut",
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2,
          },
    [easing],
  );

  useEffect(() => {
    const total = refs.length;
    if (total === 0) return;

    const updatePositions = () => {
      const w = container.current?.clientWidth || window.innerWidth;

      refs.forEach((r, i) => {
        placeNow(
          r.current,
          makeSlot(i, cardDistance, verticalDistance, total, w),
          skewAmount,
        );
      });
    };

    updatePositions();

    const handleResize = () => {
      if (container.current) {
        setCurrentWidth(container.current.clientWidth);
        updatePositions();
      }
    };
    window.addEventListener("resize", handleResize);

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const w = container.current?.clientWidth || window.innerWidth;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        opacity: 0,
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, total, w);

        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(
        total - 1,
        cardDistance,
        verticalDistance,
        total,
        w,
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);

      tl.set(elFront, { zIndex: backSlot.zIndex }, "return");
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          opacity: 1,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    intervalRef.current = window.setInterval(swap, delay);

    const node = container.current;
    if (pauseOnHover && node) {
      const pause = () => {
        tlRef.current?.pause();
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    config,
    refs,
  ]);

  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) return child;
    const typedChild = child as ReactElement<any>;
    return cloneElement(typedChild, {
      key: i,
      ref: refs[i],
      onClick: (e: React.MouseEvent) => {
        typedChild.props.onClick?.(e);
        onCardClick?.(i);
      },
    });
  });

  return (
    <div
      ref={container}
      className="relative mx-auto perspective-[3000px] overflow-visible py-20 px-4 md:px-12 flex justify-center items-center"
      style={{
        width: width,
        maxWidth: `${maxWidth}px`,
        aspectRatio: `${aspectRatio}`,
        height: typeof width === "number" ? "auto" : undefined,
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
