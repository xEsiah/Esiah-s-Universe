export interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

export const projectMenuItems: MenuItem[] = [
  {
    image: "/images/projects/Projects.webp",
    link: "/projects",
    title: "All my Projects",
    description: "To discover all my creations",
  },
  {
    image: "/images/projects/NTR.webp",
    link: "/projects/neo-tokyo-rush",
    title: "Neo Tokyo Rush",
    description: "Cyberpunk-inspired beat 'em All game",
  },
  {
    image: "/images/projects/PortfolioE1.webp",
    link: "https://portfolio-xesiahs-projects.vercel.app/",
    title: "Portfolio 2024",
    description: "Portfolio that gathers all my first year's projects",
  },
  {
    image: "/images/projects/Metz-Campus.webp",
    link: "_blank https://metzcampus.fr/",
    title: "Metz Campus",
    description:
      "Website crafted for the Metz Campus organization during my first-year internship.",
  },
  {
    image: "/images/projects/Zatyshok.webp",
    link: "/projects/zatyshok",
    title: "Затишок",
    description: "Moodboard application",
  },
  {
    image: "/images/projects/SPRotD.webp",
    link: "/projects/shadow-purge-rite-of-the-demon",
    title: "Shadow Purge - Rite of the Demon",
    description: "Hack n'slash RPG",
  },
  {
    image: "/images/projects/EotLS.webp",
    link: "/projects/echoes-of-the-last-stop",
    title: "Echoes of the Last Stop",
    description: "Thriller game project in collaboration with my partner",
  },
  {
    image: "/images/projects/LesVoixDeLExil.webp",
    link: "/projects/les-voix-de-l-exil",
    title: "Les Voix de L'Exil",
    description:
      "An interactive visual novel where your choices shape the journey.",
  },
  {
    image: "/images/projects/WYG-TIWIF.webp",
    link: "/projects/wyg-tiwif",
    title: "WYG-TIWIF",
    description: "Your social travel hub",
  },
];

export const mainMenuItems: MenuItem[] = [
  {
    image: "/images/projects/Projects.webp",
    link: "/projects",
    title: "All my Projects",
    description: "To discover all my creations",
  },
  {
    image: "/images/contact/contact.webp",
    link: "/contact",
    title: "Contact",
    description: "Any requests? Feel free to reach out!",
  },
  {
    image: "/images/cohaise/cohaise.webp",
    link: "/cohaise",
    title: "Co Hai Se",
    description: "About us",
  },
];
