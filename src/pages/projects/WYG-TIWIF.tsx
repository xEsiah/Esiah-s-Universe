import AnimatedContent from "@/components/AnimatedContent";
import SEO from "@/components/SEO";
import DownloadButton from "@/components/DownloadButton";

export default function WYGTIWIF() {
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
        title="WYG TIWIF"
        description="A social travel hub application built with the MEAN stack to manage your travel wishlist and follow others."
      />
      <div className="layout-page">
        <section className="main-section">
          <h1 className="title">WYG TIWIF</h1>
          <p className="subtitle">
            Your social travel hub. A Full Stack (MEAN) application to build
            your travel wishlist and follow other users' journeys.
          </p>
          <div className="flex w-[90%]  mx-auto gap-10 justify-center">
            <a
              href="https://github.com/xEsiah/WYG-TIWIF"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-40 flex justify-center w-[90%] md:w-2/3 mx-auto cursor-target"
            >
              <img
                className="w-full rounded-[20px] hover:opacity-80 transition-opacity"
                src="/images/projects/WYG-TIWIF.webp"
                alt="Preview of WYG-TIWIF app made with Angular"
              />
            </a>
          </div>
        </section>
        <DownloadButton projectId="WYGTIWIF" />
      </div>
    </AnimatedContent>
  );
}
