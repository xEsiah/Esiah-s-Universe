import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = "/images/Esiah-s-Universe.webp",
  url = window.location.href,
  type = "website",
}) => {
  useEffect(() => {
    // Mise à jour du titre
    const baseTitle = "Esiah's Universe";
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute("content", content);
      }
    };

    // Mise à jour des meta descriptions (Standard, OG, Twitter)
    if (description) {
      updateMeta("description", description);
      updateMeta("og:description", description, true);
      updateMeta("twitter:description", description);
    }

    // Mise à jour des titres (OG, Twitter)
    updateMeta("og:title", document.title, true);
    updateMeta("twitter:title", document.title);

    // URL et Type
    updateMeta("og:url", url, true);
    updateMeta("og:type", type, true);

    // Image
    updateMeta("og:image", image, true);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, image, url, type]);

  return null;
};

export default SEO;
