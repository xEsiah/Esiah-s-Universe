import { useState, useEffect } from "react";
import { DataLVDLE } from "../../components/data/DataLVDLE";
import SEO from "@/components/SEO";

export default function LesVoixDeLExil() {
  const [currentNodeId, setCurrentNodeId] = useState<string>("intro");
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentNode = DataLVDLE[currentNodeId];
  const currentLine = currentNode.lines[currentLineIndex];

  useEffect(() => {
    let i = 0;
    let intervalId: ReturnType<typeof setInterval>;
    setIsTyping(true);

    const delay = currentLineIndex === 0 && currentNodeId !== "intro" ? 800 : 0;

    if (delay === 0) setDisplayedText("");

    const timeoutId = setTimeout(() => {
      if (delay > 0) setDisplayedText("");
      const textToType = currentLine.text;

      intervalId = setInterval(() => {
        setDisplayedText(textToType.slice(0, i + 1));
        i++;
        if (i >= textToType.length) {
          setIsTyping(false);
          clearInterval(intervalId);
        }
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [currentLineIndex, currentNodeId, currentLine.text]);

  const handleSceneTransition = (nextId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentNodeId(nextId);
      setCurrentLineIndex(0);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 700);
  };

  const handleNextClick = () => {
    if (isTransitioning) return;
    if (isTyping) {
      setDisplayedText(currentLine.text);
      setIsTyping(false);
    } else {
      const isLastLine = currentLineIndex === currentNode.lines.length - 1;

      if (!isLastLine) {
        setCurrentLineIndex((prev) => prev + 1);
      } else if (currentNode.nextId && !currentNode.choices) {
        handleSceneTransition(currentNode.nextId);
      }
    }
  };

  const handleChoice = (nextId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleSceneTransition(nextId);
  };

  const isLastLineAndFinishedTyping =
    currentLineIndex === currentNode.lines.length - 1 && !isTyping;

  const isNarration =
    currentLine.speaker === "Narrateur" || currentLine.speaker === "Crédits";

  return (
    <>
      <SEO
        title="Les Voix de L'Exil"
        description="Plongez dans l'univers de Zaun et Piltover. Une aventure interactive où vos choix détermineront votre destin."
        favicon="/images/icon.ico"
      />

      <div
        className="fixed inset-0 w-full h-full overflow-hidden bg-[#555555] select-none font-[roboto] cursor-crosshair z-999999"
        onClick={handleNextClick}
      >
        <div className="w-full h-full relative pointer-events-auto">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out z-0"
            style={{ backgroundImage: `url(${currentNode.background})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* TITRE DU JEU */}
          {currentNodeId === "intro" && (
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-4xl font-['Cinzel',serif] z-100">
              <div className="bg-[#1e1e22b0] border-l-[5px] border-[#c3073f] p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-lg">
                <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-widest mb-4">
                  Les Voix de L'Exil
                </h1>
                <p className="text-gray-300 text-lg md:text-xl italic text-right mt-6">
                  Choisissez bien… Chaque décision construit votre légende.
                </p>
              </div>
            </div>
          )}

          {/* SPRITES DES PERSONNAGES */}
          {currentLine.characterImage && (
            <div
              className={`absolute bottom-0 h-[70%] md:h-[85%] transition-all duration-500 ease-out drop-shadow-2xl z-20 ${
                currentLine.characterPosition === "left"
                  ? "left-[-5%] md:left-10"
                  : currentLine.characterPosition === "right"
                    ? "right-[-5%] md:right-10"
                    : "left-1/2 -translate-x-1/2"
              }`}
            >
              <img
                src={currentLine.characterImage}
                alt={currentLine.speaker}
                className={`h-full w-full object-contain ${
                  currentLine.characterFlip ? "-scale-x-100" : ""
                }`}
              />
            </div>
          )}

          {/* BOÎTES DE DIALOGUES */}
          <div
            className={`absolute bottom-[10%] md:bottom-[15%] z-30 font-['Cinzel',serif] bg-[#1b1b1bb6] text-[#f0f0f0] border-2 border-[#8b0d26] shadow-[0_0_15px_rgba(139,13,38,0.6)] p-6 md:p-8 text-xl md:text-2xl w-[90%] md:w-[40%] transition-all duration-500 ${
              isNarration ? "opacity-0 pointer-events-none" : "opacity-100"
            } ${
              currentLine.characterPosition === "left"
                ? "left-[5%] md:left-[20%] text-left rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-none"
                : currentLine.characterPosition === "right"
                  ? "right-[5%] md:right-[20%] text-right rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none"
                  : "left-1/2 -translate-x-1/2 text-center rounded-2xl"
            }`}
          >
            <h3 className="font-bold text-[#c3073f] mb-3 tracking-wider">
              {currentLine.speaker}
            </h3>
            <p className="leading-relaxed min-h-20">
              {!isNarration ? displayedText : ""}
            </p>

            {currentLineIndex < currentNode.lines.length - 1 && !isTyping && (
              <div
                className={`absolute -bottom-8 ${
                  currentLine.characterPosition === "right"
                    ? "left-6"
                    : "right-6"
                } animate-bounce text-2xl text-[#c3073f]`}
              >
                ▼
              </div>
            )}
          </div>

          {/* ÉCRAN DE NARRATION */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center text-center p-10 font-['Cinzel',serif] text-white transition-opacity duration-1000 ease-in-out z-40 ${
              currentNodeId === "intro" ? "bg-black/70" : "bg-black"
            } ${
              isNarration
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <p
              className={`max-w-4xl text-2xl md:text-4xl leading-relaxed text-[#f0f0f0] transition-opacity duration-300 ${
                currentNodeId === "intro" ? "mt-48" : ""
              } ${isNarration ? "opacity-100" : "opacity-0"}`}
            >
              {isNarration ? displayedText : ""}
            </p>
            {isNarration &&
              currentLineIndex < currentNode.lines.length - 1 &&
              !isTyping && (
                <div className="absolute bottom-10 animate-bounce text-3xl text-gray-400">
                  ▼
                </div>
              )}
          </div>

          {/* ÉCRAN DE CHOIX */}
          {isLastLineAndFinishedTyping && currentNode.choices && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 z-50 pointer-events-auto p-4 transition-opacity duration-500 opacity-100">
              {currentNode.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleChoice(choice.nextId, e)}
                  className="bg-[#1e1e22] text-[#e0e0e0] font-['Cinzel',serif] font-bold text-lg md:text-xl px-8 py-4 border-2 border-[#640a1c] rounded-lg shadow-[0_0_10px_rgba(139,13,38,0.4)] hover:bg-[#8b0d26] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,13,38,0.8)] transition-all duration-300 min-w-50"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {/* BOUTON REJOUER */}
          {isLastLineAndFinishedTyping &&
            !currentNode.choices &&
            !currentNode.nextId && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto transition-opacity duration-500 opacity-100">
                <button
                  onClick={(e) => handleChoice("intro", e)}
                  className="bg-[#8b0d26] text-[#f0f0f0] font-['Cinzel',serif] font-bold text-xl px-10 py-5 border-2 border-[#640a1c] rounded-xl shadow-[0_0_15px_rgba(139,13,38,0.6)] hover:bg-[#c3073f] hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest"
                >
                  Rejouer l'aventure
                </button>
              </div>
            )}

          <div
            className={`absolute inset-0 bg-black z-200 transition-opacity duration-700 ease-in-out pointer-events-none ${
              isTransitioning ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </>
  );
}
