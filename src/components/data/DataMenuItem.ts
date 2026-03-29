import {
  gameDevItems,
  reactWebItems,
  wordpressItems,
  desktopAppItems,
  angulartWebItems,
} from "./ProjectDetails";

export interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

const allDetailItems = [
  ...gameDevItems,
  ...reactWebItems,
  ...wordpressItems,
  ...desktopAppItems,
  ...angulartWebItems,
];

export const projectMenuItems: MenuItem[] = [
  {
    image: "/images/projects/Projects.webp",
    link: "/projects",
    title: "All my Projects",
    description: "To discover all my creations",
  },
  ...allDetailItems.map((item) => ({
    image: item.img,
    link: item.link,
    title: item.title,
    description: item.description,
  })),
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
