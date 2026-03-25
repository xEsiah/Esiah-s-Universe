import MagicBento from "../components/MagicBento";
import AnimatedContent from "../components/AnimatedContent";
import SEO from "@/components/SEO";

export default function Home() {
  return (
    <div className="layout-page">
      <SEO
        title="Home"
        description="Welcome to Esiah's Universe. Explore my projects in Game Design, Web Development, and UI/UX."
      />
      <AnimatedContent
        distance={50}
        direction="vertical"
        reverse={false}
        duration={2}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={-0.1}
        delay={0.5}
      >
        <section className="main-section">
          <h1 className="title">Esiah’s Universe</h1>
          <p className="subtitle">
            A journey through code, design, and imagination.
          </p>
        </section>
      </AnimatedContent>

      <AnimatedContent
        distance={80}
        direction="vertical"
        reverse={false}
        duration={1}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={0.95}
        threshold={0}
        delay={0.3}
      >
        <section className="bento-container">
          <h2>Overview</h2>
          <MagicBento
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={150}
            particleCount={200}
            glowColor="183, 28, 28"
            disableAnimations={false}
          />
        </section>
      </AnimatedContent>
    </div>
  );
}
