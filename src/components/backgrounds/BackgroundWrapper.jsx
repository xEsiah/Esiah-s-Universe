import { useLocation } from "react-router-dom";
import Galaxy from "./Galaxy";
import LightPillar from "./LightPillar";
import SplashCursor from "../cursors/SplashCursor";
import TargetCursor from "../cursors/TargetCursor";

export default function BackgroundWrapper() {
  const location = useLocation();
  const isCohaise = location.pathname === "/cohaise";
  const isHome = location.pathname === "/";

  return (
    <>
      {/* 1. COUCHE CURSEURS */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: isCohaise ? -5 : 99999,
        }}
      >
        {isCohaise ? (
          <SplashCursor />
        ) : (
          <TargetCursor
            spinDuration={4}
            hideDefaultCursor={true}
            parallaxOn={true}
            hoverDuration={1}
          />
        )}
      </div>

      {/* 2. COUCHE BACKGROUNDS */}
      <div
        className="fixed inset-0 bg-[#0e0e11] pointer-events-none"
        style={{ zIndex: -10 }}
      >
        {isCohaise ? (
          <div className="w-full h-full relative">
            <LightPillar
              topColor="#8a1414"
              bottomColor="#060010"
              intensity={1.5}
              rotationSpeed={0.2}
              glowAmount={0.004}
              pillarWidth={8}
              pillarHeight={1}
              noiseIntensity={0.5}
              pillarRotation={20}
              interactive
              mixBlendMode="screen"
              quality="high"
            />
          </div>
        ) : (
          <div className="w-full h-full relative">
            <Galaxy
              mouseRepulsion={isHome}
              mouseInteraction={isHome}
              density={1.7}
              glowIntensity={0.4}
              saturation={0}
              hueShift={360}
              twinkleIntensity={0.3}
              rotationSpeed={0.1}
              repulsionStrength={3.5}
              autoCenterRepulsion={0}
              starSpeed={1}
              speed={1}
            />
          </div>
        )}
      </div>
    </>
  );
}
