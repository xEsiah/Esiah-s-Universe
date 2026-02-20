import MagicBento from "../components/MagicBento";

export default function Home() {
  return (
    <div className="layout-page">
      <section className="main-section">
        <h1 className="title">Esiah’s Universe</h1>
        <p className="subtitle">
          A journey through code, design, and imagination.
        </p>
      </section>

      <h2>Overview</h2>
      <section className="bento-container">
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={150}
          particleCount={200}
          glowColor="183, 28, 28"
          disableAnimations={false}
        />
      </section>
    </div>
  );
}
