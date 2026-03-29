import AnimatedContent from "@/components/AnimatedContent";
import SEO from "@/components/SEO";
import DownloadButton from "@/components/DownloadButton";

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
      delay={0.1}
    >
      <SEO
        title="Echoes of the Last Stop"
        description="Story-driven thriller game in collaboration with my partner made with Unity & Aseprite"
      />
      <div className="layout-page">
        <section className="main-section">
          <h1 className="title">Echoes of the Last Stop</h1>
          <p className="subtitle">
            Story-driven thriller game in collaboration with my partner made
            with Unity & Aseprite
          </p>
          <div className="flex w-[90%]  mx-auto gap-10 justify-center">
            <div className="mt-40 flex justify-center w-[90%] md:w-2/3 mx-auto">
              <img
                className="w-full rounded-[20px] hover:opacity-80 transition-opacity"
                src="/images/projects/EotLS.webp"
                alt="Preview of Echoes of the Last Stop game made with Unity & Aseprite"
              />
            </div>
          </div>
        </section>
        <DownloadButton projectId="EotLS" />
      </div>
    </AnimatedContent>
  );
}
