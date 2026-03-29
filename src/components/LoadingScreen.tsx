import React, { useEffect, useState } from "react";

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5 + Math.random() * 7;
        if (next >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 40);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-999999 bg-[#050000] flex flex-col items-center justify-center font-orbitron text-(--clr-text) overflow-hidden">
      {/* Effet d'arrière-plan (Espace + Étoiles) */}
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_center,#1a0505_0%,#050000_100%)]">
        {/* Étoiles en valeurs arbitraires Tailwind */}
        <div
          className="absolute inset-0 opacity-30 animate-[drift_20s_linear_infinite] 
            bg-[radial-gradient(1px_1px_at_20px_30px,#eee,transparent),radial-gradient(1px_1px_at_40px_70px,#fff,transparent),radial-gradient(1px_1px_at_50px_160px,#ddd,transparent),radial-gradient(1px_1px_at_80px_120px,#fff,transparent),radial-gradient(1px_1px_at_110px_210px,#fff,transparent),radial-gradient(1px_1px_at_150px_250px,#ddd,transparent)] 
            bg-size-[200px_250px]"
        ></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 w-[80vw] max-w-2/3 text-center px-4">
        <h1 className="text-2xl md:text-3xl uppercase tracking-[4px] mb-8 text-(--clr-accent) animate-[pulse-loader_1.5s_infinite_ease-in-out] [text-shadow:0_0_15px_rgba(183,28,28,0.6)]">
          Travelling to next galaxy
        </h1>

        {/* Barre de progression */}
        <div className="w-full h-0.5 bg-white/5 rounded-full relative overflow-hidden">
          <div
            className="h-full bg-(--clr-accent) transition-[width] duration-100 ease-out shadow-[0_0_10px_var(--clr-accent)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
