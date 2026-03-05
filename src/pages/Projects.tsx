import AnimatedContent from "../components/AnimatedContent";
import ScrollVelocity from "../components/ScrollVelocity";
import {
  GameDevGallery,
  ReactWebGallery,
  WordpressGallery,
  DesktopAppGallery,
  AngulartWebGallery,
} from "../components/data/ProjectDetails";
import "./Project.css";

const ProjectCategories = [
  {
    text: "Game Development",
    Component: GameDevGallery,
  },
  {
    text: "React Websites",
    Component: ReactWebGallery,
  },
  {
    text: "WordPress & Elementor",
    Component: WordpressGallery,
  },
  {
    text: "Desktop Apps",
    Component: DesktopAppGallery,
  },
  {
    text: "Angular Apps",
    Component: AngulartWebGallery,
  },
];

export default function Projects() {
  return (
    <div className="layout-page w-full overflow-x-hidden">
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
        delay={0.2}
      >
        <section className="main-section mb-20">
          <h1 className="title">Projects</h1>
          <p className="subtitle">Here you can find all my creations</p>
        </section>
      </AnimatedContent>

      <div className="project-container flex flex-col gap-32 pb-32 w-full max-w-[100vw] overflow-x-hidden">
        {ProjectCategories.map((category, index) => (
          // 3. IMPORTANT: on empêche la div de dépasser 100% de la largeur
          <div key={index} className="w-full max-w-full overflow-hidden">
            <AnimatedContent
              distance={100}
              direction="horizontal"
              reverse={index % 2 !== 0}
              duration={1.5}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
              delay={0}
              // 4. On s'assure que l'AnimatedContent ne crée pas de scroll
              className="w-full max-w-full overflow-hidden"
            >
              <div className="mb-8 pointer-events-none w-full">
                <ScrollVelocity
                  texts={[category.text]}
                  velocity={index % 2 === 0 ? 110 : -110}
                  // 5. On réduit la taille du texte géant sur mobile (text-4xl au lieu de 6xl)
                  className="custom-scroll-text text-4xl md:text-8xl font-bold uppercase tracking-tighter text-white/90 whitespace-nowrap"
                />
              </div>
            </AnimatedContent>

            <AnimatedContent
              distance={0}
              direction="none"
              duration={1.5}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
              delay={0.2}
              className="w-full"
            >
              {/* 6. On met un padding raisonnable pour éviter que les cartes touchent les bords sur mobile */}
              <div className="w-full px-2 md:px-6">
                <category.Component />
              </div>
            </AnimatedContent>
          </div>
        ))}
      </div>
    </div>
  );
}
