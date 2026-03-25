import AnimatedContent from "@/components/AnimatedContent";
import SEO from "@/components/SEO";

export default function EchoesOfTheLastStop() {
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
        title="Echoes of the Last Stop"
        description="A thriller game project developed with Unity and Aseprite, featuring branching narratives."
      />
      <div className="layout-page">
        <section className="main-section">
          <h1 className="title">Echoes of the Last Stop</h1>
          <p className="subtitle">
            Thriller game project in collaboration with my partner
          </p>
          <div className="mt-40 flex justify-center w-[90%] md:w-2/3 mx-auto">
            <img
              className="w-full rounded-[20px] hover:opacity-80 transition-opacity"
              src="/images/EotLS.webp"
              alt="Preview of Echoes of the Last Stop game made with Unity & Aseprite"
            />
          </div>
        </section>
      </div>
    </AnimatedContent>
  );
}
