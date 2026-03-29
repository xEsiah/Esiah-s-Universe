import React from "react";
import HorizontalMotion from "../HorizontalMotion";

export const gameDevItems = [
  {
    id: "1",
    img: "/images/projects/SPRotD.webp",
    link: "/projects/shadow-purge-rite-of-the-demon",
    title: "Shadow Purge : Rite of the Demon",
    description: "Hack n'slash RPG made with Unity & Aseprite.",
  },
  {
    id: "2",
    img: "/images/projects/EotLS.webp",
    link: "/projects/echoes-of-the-last-stop",
    title: "Echoes of the Last Stop",
    description:
      "Story-driven thriller game in collaboration with my partner made with Unity & Aseprite.",
  },
  {
    id: "3",
    img: "/images/projects/NTR-Menu.webp",
    link: "/projects/neo-tokyo-rush",
    title: "Neo Tokyo Rush",
    description:
      "Cyberpunk-inspired beat 'em All game made with Unity & Aseprite.",
  },
  {
    id: "4",
    img: "/images/projects/LesVoixDeLExil.webp",
    link: "/projects/les-voix-de-l-exil",
    title: "Les Voix de L'Exil",
    description:
      "An interactive visual novel where your choices shape the journey.",
  },
];

export const reactWebItems = [
  {
    id: "101",
    img: "/images/cohaise/cohaise.webp",
    link: "/cohaise",
    title: "Co Hai Se",
    description: "Landing single page for my (fictionnal) compagny.",
  },
  {
    id: "102",
    img: "/images/projects/Esiah-s-Universe.webp",
    link: "/",
    title: "Esiah's Universe",
    description: "A journey through code, design, and imagination.",
  },
  {
    id: "103",
    img: "/images/projects/Coeur-UA-PAM.webp",
    link: "https://coeur-ua-pam.fr/",
    title: "Coeur UA PAM",
    description: "Web site for Coeur UA PAM association.",
  },
  {
    id: "104",
    img: "/images/projects/WaterDroneIoTHackathon.webp",
    link: "https://waterdrone.esiah.dev/",
    title: "WaterDrone",
    description:
      "Web site made in 5 hours for WaterDrone 2026, an IoT Hackathon project.",
  },
];

export const wordpressItems = [
  {
    id: "201",
    img: "/images/projects/Metz-Campus.webp",
    link: "https://metzcampus.fr/",
    title: "Metz Campus",
    description:
      "Website made during my 1st year internship for Metz Campus organisation.",
  },
];

export const desktopAppItems = [
  {
    id: "301",
    img: "/images/projects/Zatyshok.webp",
    link: "/projects/zatyshok",
    title: "Затишок",
    description:
      "Moodboard/Planner highly customisable application with Spotify & meteo integrations !",
  },
];

export const angulartWebItems = [
  {
    id: "401",
    img: "/images/projects/WYG-TIWIF.webp",
    link: "/projects/wyg-tiwif",
    title: "WYG-TIWIF",
    description:
      "Your social travel hub. A Full Stack (MEAN) application to build your travel wishlist and follow other users' journeys.",
  },
];

export const GameDevGallery = () => (
  <div className="w-full mt-8">
    <HorizontalMotion items={gameDevItems} />
  </div>
);

export const ReactWebGallery = () => (
  <div className="w-full mt-8">
    <HorizontalMotion items={reactWebItems} />
  </div>
);

export const WordpressGallery = () => (
  <div className="w-full mt-8">
    <HorizontalMotion items={wordpressItems} />
  </div>
);

export const DesktopAppGallery = () => (
  <div className="w-full mt-8">
    <HorizontalMotion items={desktopAppItems} />
  </div>
);

export const AngulartWebGallery = () => (
  <div className="w-full mt-8">
    <HorizontalMotion items={angulartWebItems} />
  </div>
);
