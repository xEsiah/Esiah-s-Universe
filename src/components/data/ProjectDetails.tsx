import React from "react";
import HorizontalMotion from "../HorizontalMotion";

const gameDevItems = [
  {
    id: "1",
    img: "images/SPRotD.webp",
    link: "/projects/shadow-purge-rite-of-the-demon",
    title: "Shadow Purge : Rite of the Demon",
    description: "Hack n'slash RPG made with Unity & Aseprite.",
  },
  {
    id: "2",
    img: "images/EotLS.webp",
    link: "/projects/echoes-of-the-last-stop",
    title: "Echoes of the Last Stop",
    description:
      "Story-driven thriller game with branching narratives in collaboration with my partner made with Unity & Aseprite.",
  },
  {
    id: "3",
    img: "images/NTR-Menu.webp",
    link: "/projects/neo-tokyo-rush",
    title: "Neo Tokyo Rush",
    description:
      "Cyberpunk-inspired beat 'em All game made with Unity & Aseprite.",
  },
];

const reactWebItems = [
  {
    id: "101",
    img: "images/Cohaise.webp",
    link: "/cohaise",
    title: "Co Hai Se",
    description: "Landing single page for my (fictionnal) compagny.",
  },
  {
    id: "102",
    img: "images/Esiah-s-Universe.webp",
    link: "/",
    title: "Esiah's Universe",
    description: "A journey through code, design, and imagination.",
  },
  {
    id: "103",
    img: "images/Coeur-UA-PAM.webp",
    link: "https://coeur-ua-pam.fr/",
    title: "Coeur UA PAM",
    description: "Web site for Coeur UA PAM association.",
  },
];

const wordpressItems = [
  {
    id: "201",
    img: "images/Metz-Campus.webp",
    link: "https://metzcampus.fr/",
    title: "Metz Campus",
    description:
      "Website made during my 1st year internship for Metz Campus organisation.",
  },
];

const desktopAppItems = [
  {
    id: "301",
    img: "images/Zatyshok.webp",
    link: "/projects/zatyshok",
    title: "Затишок",
    description: "Moodboard application created for my partner !",
  },
];

const angulartWebItems = [
  {
    id: "401",
    img: "images/WYG-TIWIF.webp",
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
