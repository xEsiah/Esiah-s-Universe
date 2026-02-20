import { useLayoutEffect, useRef, useState, useCallback, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import InfiniteMenu from "./InfiniteMenu";
import Lanyard from "./Lanyard";
import "./CardNav.css";

const CardNav = ({
  logo = "/images/logo.png",
  logoAlt = "Esiah Logo",
  className = "",
  ease = "power3.out",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLanyard, setShowLanyard] = useState(false);
  const navRef = useRef(null);
  const tlRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenuIfOpen = useCallback(() => {
    const tl = tlRef.current;
    if (!tl || !isExpanded) return;
    setIsHamburgerOpen(false);
    tl.reverse();
    tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play();
    } else {
      closeMenuIfOpen();
    }
  };

  const handleCardClick = (link) => {
    if (!link) return;
    const cleanLink = link.replace("_blank", "").trim();
    if (link.includes("_blank") || cleanLink.startsWith("http")) {
      window.open(cleanLink, "_blank", "noopener,noreferrer");
    } else {
      navigate(cleanLink);
    }
    closeMenuIfOpen();
  };

  const handleCohaiseClick = () => {
    closeMenuIfOpen();
    if (location.pathname === "/cohaise") {
      setShowLanyard(true);
      setTimeout(() => setShowLanyard(false), 5000);
    }
  };

  const menuItems = useMemo(() => {
    if (location.pathname.startsWith("/projects")) {
      return [
        {
          image: "/images/Projects.png",
          link: "/projects",
          title: "All my Projects",
          description: "To discover all my creations",
        },
        {
          image: "/images/NTR.png",
          link: "/projects/neo-tokyo-rush",
          title: "Neo Tokyo Rush",
          description: "Cyberpunk-inspired beat 'em All game",
        },
        {
          image: "/images/PortfolioE1.png",
          link: "https://portfolio-xesiahs-projects.vercel.app/",
          title: "Protfolio 2024",
          description: "Portfolio that gathers all my first year's projects",
        },
        {
          image: "/images/MC.png",
          link: "_blank https://metzcampus.fr/",
          title: "Metz Campus",
          description:
            "Website crafted for the Metz Campus organization during my first-year internship.",
        },
        {
          image: "/images/Zatyshok.png",
          link: "/projects/zatyshok",
          title: "Затишок",
          description: "Moodboard application",
        },
        {
          image: "/images/SPRotD.png",
          link: "/projects/shadow-purge-rite-of-the-demon",
          title: "Shadow Purge - Rite of the Demon",
          description: "Hack n'slash RPG",
        },
        {
          image: "/images/EotLS.png",
          link: "/projects/echoes-of-the-last-stop",
          title: "Echoes of the Last Stop",
          description: "Thriller game project in collaboration with my partner",
        },
      ];
    }
    return [
      {
        image: "/images/Projects.png",
        link: "/projects",
        title: "All my Projects",
        description: "To discover all my creations",
      },
      {
        image: "/images/Contact.jpg",
        link: "/contact",
        title: "Contact",
        description: "Any requests? Feel free to reach out!",
      },
      {
        image: "/images/Cohaise.jpg",
        link: "/cohaise",
        title: "Co Hai Se",
        description: "About us",
      },
    ];
  }, [location.pathname]);

  const calculateHeight = useCallback(() => {
    return window.matchMedia("(max-width: 768px)").matches
      ? window.innerHeight - 40
      : 600;
  }, []);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: "hidden" });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.5, ease: ease });
    return tl;
  }, [calculateHeight, ease]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => tl?.kill();
  }, [createTimeline]);

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? "open" : ""}`}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu cursor-target ${isHamburgerOpen ? "open" : ""}`}
            onClick={toggleMenu}
            role="button"
            tabIndex={0}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="center-title-container">
            <Link
              onClick={closeMenuIfOpen}
              to="/"
              className="site-title cursor-target"
            >
              Esiah's Universe
            </Link>
          </div>

          <Link
            to="/cohaise"
            onClick={handleCohaiseClick}
            className="right-logo-btn cursor-target"
          >
            <img
              src={logo}
              alt={logoAlt}
              className="nav-logo-img"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </Link>
        </div>

        <div
          className="card-nav-content"
          style={{
            opacity: isExpanded || isHamburgerOpen ? 1 : 0,
            transition: "opacity 0.3s ease 0.1s",
            pointerEvents: isExpanded ? "auto" : "none",
          }}
        >
          <InfiniteMenu
            items={menuItems}
            scale={0.8}
            onClose={closeMenuIfOpen}
            onItemClick={handleCardClick}
          />
        </div>
      </nav>

      <Lanyard show={showLanyard} />
    </div>
  );
};

export default CardNav;
