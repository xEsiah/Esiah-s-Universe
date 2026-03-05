export default function NeoTokyoRush() {
  return (
    <div className="layout-page">
      <section className="main-section">
        <h1 className="title">Neo Tokyo Rush</h1>
        <p className="subtitle">Cyberpunk-inspired beat 'em All game</p>
        <a className="mt-40 flex justify-center w-[90%] md:w-2/3 mx-auto cursor-target">
          <img
            className="w-full rounded-[20px] hover:opacity-80 transition-opacity"
            src="/images/NTR-Menu.webp"
            alt="Preview of Neo Tokyo Rush game made with Unity"
          />
        </a>
        <a className="mt-40 flex justify-center w-[90%] md:w-2/3 mx-auto cursor-target">
          <img
            className="w-full rounded-[20px] hover:opacity-80 transition-opacity"
            src="/images/NTR-Lvl.webp"
            alt="Preview of Neo Tokyo Rush game made with Unity"
          />
        </a>
      </section>
    </div>
  );
}
