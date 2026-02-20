import LightPillar from "../components/backgrounds/LightPillar";
import SplashCursor from "../components/cursors/SplashCursor";
import LogoLoop from "../components/LogoLoop";
import FlowingMenu from "../components/FlowingMenu";
import {
  WebService,
  MobileService,
  DesignService,
  SoftwareService,
} from "../components/ServiceDetails";

import {
  SiReact,
  SiAngular,
  SiElectron,
  SiNodedotjs,
  SiTailwindcss,
  SiDotnet,
  SiExpress,
  SiMariadb,
  SiFigma,
  SiVercel,
  SiGithub,
  SiPostgresql,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiAngular />, title: "Angular", href: "https://angular.io" },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
  },
  { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
  { node: <SiElectron />, title: "Electron", href: "https://electronjs.org/" },
  {
    node: <SiDotnet />,
    title: "C/ / .NET",
    href: "https://dotnet.microsoft.com/fr-fr/",
  },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org/en" },
  { node: <SiExpress />, title: "Express", href: "https://expressjs.com/" },
  { node: <SiMariadb />, title: "MariaDB", href: "https://mariadb.com/" },
  {
    node: <SiPostgresql />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org/",
  },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com/" },
];

const serviceItems = [
  {
    text: "Web Development",
    image: "images/webDevelopment.jpg",
    Component: WebService,
  },
  {
    text: "Mobile Apps",
    image: "images/mobileApps.jpg",
    Component: MobileService,
  },
  {
    text: "UI/UX Design",
    image: "images/uxUI.jpg",
    Component: DesignService,
  },
  {
    text: "Custom Software",
    image: "images/customSoftware.jpg",
    Component: SoftwareService,
  },
];

const Cohaise = () => {
  return (
    <div className="layout-page" style={{ overflowX: "hidden" }}>
      <section className="main-section">
        <h1 className="title-cohaise">Co Hai Se</h1>
        <p className="subtitle">
          Your project starts with an idea. It comes to life with Cohaise.
        </p>
      </section>

      <FlowingMenu
        items={serviceItems}
        speed={50}
        textColor="#ffffff"
        borderColor="rgba(255,255,255,0.15)"
      />

      <LogoLoop
        logos={techLogos}
        speed={80}
        direction="left"
        logoHeight={60}
        gap={100}
        hoverSpeed={15}
        fadeOut={false}
        scaleOnHover
      />
    </div>
  );
};

export default Cohaise;
