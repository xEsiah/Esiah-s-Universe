import AnimatedContent from "@/components/AnimatedContent";
import SEO from "@/components/SEO";

export default function NeoTokyoRush() {
  return (
    <AnimatedContent
      distance={50}
      direction="vertical"
      reverse={false}
      duration={2}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={-1}
      delay={0.2}
    >
      <SEO
        title="Neo Tokyo Rush"
        description="A cyberpunk beat 'em up game developed with Unity. Dive into a retro-futuristic neon aesthetic."
      />
      <div className="layout-page">
        <section className="main-section">
          <h1 className="title">Neo Tokyo Rush</h1>
          <p className="subtitle">Cyberpunk-inspired beat 'em All game</p>
          <a className="mt-40 flex justify-center w-[90%] md:w-2/3 mx-auto cursor-target">
            <img
              className="w-full rounded-[20px] hover:opacity-80 transition-opacity"
              src="/images/NTR-Menu.webp"
              alt="Menu principal du jeu Neo Tokyo Rush, un beat 'em all cyberpunk développé avec Unity"
            />
          </a>
          <a className="mt-40 flex justify-center w-[90%] md:w-2/3 mx-auto cursor-target">
            <img
              className="w-full rounded-[20px] hover:opacity-80 transition-opacity"
              src="/images/NTR-Lvl.webp"
              alt="Capture d'écran du gameplay de Neo Tokyo Rush montrant l'esthétique néon et les mécaniques de combat"
            />
          </a>
        </section>
      </div>
    </AnimatedContent>
  );
}
