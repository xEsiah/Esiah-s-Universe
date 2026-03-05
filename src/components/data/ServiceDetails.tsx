import React from "react";

const ServiceTag = ({ children }: { children: React.ReactNode }) => (
  <li className="px-6 py-2.5 border border-white/15 rounded-full text-[0.9rem] uppercase tracking-wider text-white bg-transparent transition-all duration-300 hover:bg-white hover:text-black hover:border-white cursor-default">
    {children}
  </li>
);

export const WebService = () => (
  <div className="flex flex-col gap-6">
    <h3 className="text-2xl font-normal text-white uppercase tracking-[2px] opacity-80 mb-6">
      Modern & Fast Websites
    </h3>
    <p className="text-white/50 text-xl leading-relaxed max-w-200">
      Building clean, responsive websites using Next.js and React. I focus on
      speed, visibility, and converting visitors into clients.
    </p>
    <ul className="flex flex-wrap gap-4 mt-12 p-0 list-none">
      <ServiceTag>Showcase Websites (Landing Pages)</ServiceTag>
      <ServiceTag>SEO & Performance Optimization</ServiceTag>
      <ServiceTag>CMS Integration (Content Management)</ServiceTag>
    </ul>
  </div>
);

export const MobileService = () => (
  <div className="flex flex-col gap-6">
    <h3 className="text-2xl font-normal text-white uppercase tracking-[2px] opacity-80 mb-6">
      iOS & Android Apps
    </h3>
    <p className="text-white/50 text-xl leading-relaxed max-w-200">
      Turning your ideas into real mobile apps. Using React Native to create
      smooth experiences that work perfectly on all phones.
    </p>
    <ul className="flex flex-wrap gap-4 mt-12 p-0 list-none">
      <ServiceTag>Cross-Platform Apps</ServiceTag>
      <ServiceTag>App Store Submission Help</ServiceTag>
      <ServiceTag>User-Friendly Interfaces</ServiceTag>
    </ul>
  </div>
);

export const DesignService = () => (
  <div className="flex flex-col gap-6">
    <h3 className="text-2xl font-normal text-white uppercase tracking-[2px] opacity-80 mb-6">
      UI/UX Design
    </h3>
    <p className="text-white/50 text-xl leading-relaxed max-w-200">
      Simple and effective designs. I create interfaces that look good and help
      users find what they need effortlessly.
    </p>
    <ul className="flex flex-wrap gap-4 mt-12 p-0 list-none">
      <ServiceTag>Wireframing & Prototyping</ServiceTag>
      <ServiceTag>Mobile-First Design</ServiceTag>
      <ServiceTag>Visual Identity Basics</ServiceTag>
    </ul>
  </div>
);

export const SoftwareService = () => (
  <div className="flex flex-col gap-6">
    <h3 className="text-2xl font-normal text-white uppercase tracking-[2px] opacity-80 mb-6">
      Custom Solutions
    </h3>
    <p className="text-white/50 text-xl leading-relaxed max-w-200">
      Need something specific? I build custom tools and dashboards to help
      automate your daily tasks and save you time.
    </p>
    <ul className="flex flex-wrap gap-4 mt-12 p-0 list-none">
      <ServiceTag>Custom Web Tools</ServiceTag>
      <ServiceTag>Desktop Web App</ServiceTag>
      <ServiceTag>Dashboard Creation</ServiceTag>
      <ServiceTag>API Connections</ServiceTag>
    </ul>
  </div>
);
