import { ExternalLink } from "lucide-react";
import CardSwap, { Card } from "../components/CardSwap";
import "./Contact.css";

export default function Contact() {
  const contacts = [
    {
      name: "GitHub",
      label: "@xEsiah",
      url: "https://github.com/xEsiah",
      image: "/images/contact/github-prev.jpg",
    },
    {
      name: "LinkedIn",
      label: "Personal Profile",
      url: "https://www.linkedin.com/in/xesiah/",
      image: "/images/contact/linkedin-perso-prev.jpg",
    },
    {
      name: "LinkedIn",
      label: "Co Hai Se",
      url: "https://linkedin.com/company/cohaise",
      image: "/images/contact/linkedin-cohaise-prev.jpg",
    },
    {
      name: "Instagram",
      label: "@xesiahh",
      url: "https://instagram.com/xesiahh/",
      image: "/images/contact/insta-prev.jpg",
    },
    {
      name: "eMail",
      label: "contact@esiah.dev",
      url: "mailto:contact@esiah.dev",
      image: "/images/contact/email-prev.jpg",
    },
  ];

  return (
    <div className="layout-page">
      <section className="main-section">
        <h1 className="title">Contact</h1>
        <p className="subtitle">You can reach me there:</p>
      </section>

      <div className="contact-container w-full overflow-hidden flex justify-center py-20">
        <CardSwap
          maxWidth={1100}
          aspectRatio={window.innerWidth < 768 ? 0.9 : 1.4}
          cardDistance={60}
          verticalDistance={70}
        >
          {contacts.map((contact, index) => (
            <Card
              key={index}
              className="contact-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              onClick={() => window.open(contact.url, "_blank")}
            >
              <img
                src={contact.image}
                alt={contact.name}
                className="contact-card-img"
              />
              <div className="contact-card-overlay" />
              <div className="contact-card-info">
                <h3 className="cursor-target">{contact.name}</h3>
                <p className="cursor-target">{contact.label}</p>
              </div>
              <ExternalLink
                className="contact-card-icon cursor-target"
                size={28}
              />
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  );
}
