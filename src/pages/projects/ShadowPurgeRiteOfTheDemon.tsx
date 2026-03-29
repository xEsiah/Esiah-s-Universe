import AnimatedContent from "@/components/AnimatedContent";
import DownloadButton from "@/components/DownloadButton";
import SEO from "@/components/SEO";

export default function ShadowPurgeRiteOfTheDemon() {
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
        title="Shadow Purge: Rite of the Demon"
        description="A hack n'slash RPG game developed with Unity and Aseprite."
      />
      <div className="layout-page">
        <section className="main-section">
          <h1 className="title">Shadow Purge : Rite of the Demon</h1>
          <p className="subtitle">Hack n'slash RPG</p>
          <div className="flex w-[90%]  mx-auto gap-10 justify-center">
            <a className="mt-40 flex justify-center w-[90%] md:w-2/3 mx-auto cursor-target">
              <img
                className="w-full rounded-[20px] hover:opacity-80 transition-opacity"
                src="/images/projects/SPRotD.webp"
                alt="Preview of Shadow Purge : Rite of the Demon game made with Unity & Aseprite"
              />
            </a>
          </div>
        </section>
        <DownloadButton projectId="SPRotD" />
      </div>
    </AnimatedContent>
  );
}
