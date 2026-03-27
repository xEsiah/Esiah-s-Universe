import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  favicon?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = "/images/Esiah-s-Universe.webp",
  favicon = "/images/logo.webp",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
}) => {
  useEffect(() => {
    const baseTitle = "Esiah's Universe";
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute("content", content);
      } else {
        const newMeta = document.createElement("meta");
        if (isProperty) newMeta.setAttribute("property", name);
        else newMeta.setAttribute("name", name);
        newMeta.setAttribute("content", content);
        document.head.appendChild(newMeta);
      }
    };

    const updateIcon = (href: string) => {
      const rels = ["icon", "shortcut icon"];
      rels.forEach((rel) => {
        let link: HTMLLinkElement | null = document.querySelector(
          `link[rel*="${rel}"]`,
        );
        if (!link) {
          link = document.createElement("link");
          link.rel = rel;
          document.head.appendChild(link);
        }
        link.href = href;
        // Optionnel : ajuste le type MIME selon l'extension
        if (href.endsWith(".ico")) link.type = "image/x-icon";
        else if (href.endsWith(".png")) link.type = "image/png";
      });
    };

    updateIcon(favicon);

    if (description) {
      updateMeta("description", description);
      updateMeta("og:description", description, true);
      updateMeta("twitter:description", description);
    }

    updateMeta("og:title", document.title, true);
    updateMeta("twitter:title", document.title);

    updateMeta("og:url", url, true);
    updateMeta("og:type", type, true);

    updateMeta("og:image", image, true);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, image, favicon, url, type]);

  return null;
};

export default SEO;
