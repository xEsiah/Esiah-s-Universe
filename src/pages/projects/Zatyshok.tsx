import AnimatedContent from "@/components/AnimatedContent";
import SEO from "@/components/SEO";

export default function Zatyshok() {
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
        title="Zatyshok"
        description="A desktop moodboard and planner application with Spotify and weather integrations, built with Electron."
      />
      <div className="layout-page">
        <section className="main-section">
          <h1 className="title">Затишок</h1>
          <p className="subtitle">
            Moodboard/Planner highly customisable highly customisable
            application with Spotify & meteo integrations !
          </p>
          <a
            href="https://github.com/xEsiah/zatyshok-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-40 flex justify-center w-[90%] md:w-2/3 mx-auto cursor-target"
          >
            <img
              className="w-full rounded-[20px] hover:opacity-80 transition-opacity"
              src="/images/Zatyshok.webp"
              alt="Preview of Zatyshok desktop app made with Electron"
            />
          </a>
        </section>
      </div>
    </AnimatedContent>
  );
}
