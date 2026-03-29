import AnimatedContent from "@/components/AnimatedContent";
import SEO from "@/components/SEO";
import ScrollVelocity from "../components/ScrollVelocity";
import InfiniteCarousel from "../components/InfiniteCarousel";

export default function Contact() {
  const contacts = [
    {
      name: "GitHub",
      label: "@xEsiah",
      url: "https://github.com/xEsiah",
      image: "/images/contact/github-prev.webp",
    },
    {
      name: "LinkedIn",
      label: "Personal Profile",
      url: "https://www.linkedin.com/in/xesiah/",
      image: "/images/contact/linkedin-perso-prev.webp",
    },
    {
      name: "LinkedIn",
      label: "Co Hai Se",
      url: "https://linkedin.com/company/cohaise",
      image: "/images/contact/linkedin-cohaise-prev.webp",
    },
    {
      name: "Instagram",
      label: "@xesiahh",
      url: "https://instagram.com/xesiahh/",
      image: "/images/contact/insta-prev.webp",
    },
    {
      name: "eMail",
      label: "contact@esiah.dev",
      url: "mailto:contact@esiah.dev",
      image: "/images/contact/email-prev.webp",
    },
  ];

  return (
    <div className="layout-page">
      <SEO
        title="Contact"
        description="Looking for a creative developer? Contact me via LinkedIn, GitHub, or email."
      />

      <AnimatedContent
        distance={50}
        direction="vertical"
        duration={2}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        delay={0.2}
      >
        <section className="main-section">
          <h1 className="title">Contact</h1>
          <p className="subtitle">You can reach me there:</p>
        </section>
      </AnimatedContent>

      <AnimatedContent
        distance={100}
        direction="vertical"
        duration={1.5}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        delay={0.1}
      >
        <div className="flex flex-col gap-8 md:gap-16 w-full max-w-[100vw] overflow-x-hidden">
          <ScrollVelocity
            texts={["Get in touch • Let's collaborate •"]}
            velocity={50}
            className="text-4xl md:text-7xl font-bold uppercase text-white/20 whitespace-nowrap"
          />

          <InfiniteCarousel items={contacts} />

          <ScrollVelocity
            texts={["Email Me • Follow Me • Visit My Github •"]}
            velocity={50}
            className="text-4xl md:text-7xl font-bold uppercase text-white/20 whitespace-nowrap"
          />
        </div>
      </AnimatedContent>
    </div>
  );
}
