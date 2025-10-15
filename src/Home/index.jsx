import { useState, useEffect } from "react";
import Projetos from "./projetos";
import "./home.css";

function Home() {
  const fullText = "Transformar seus sonhos em sites!";
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (!isTyping) {
      setCursorVisible(false);
      return;
    }
    setCursorVisible(true);
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [isTyping]);

  return (
    <div id="home">
      <section
        className="min-h-screen w-full flex flex-col items-center justify-center 
        text-center px-6 sm:px-10 md:px-20 
        bg-gradient-to-b from-orange-100 via-orange-200 to-orange-400"
      >
        <main className="flex flex-col items-center justify-center text-orange-600 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Olá, meu nome é <br />
            <span className="text-black">Joalisson Lemos</span> e vou
          </h2>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 leading-tight flex items-center justify-center">
            {displayedText}
            {isTyping && (
              <span
                style={{
                  display: "inline-block",
                  marginLeft: 6,
                  width: 2,
                  height: "1.2em",
                  backgroundColor: "#ea580c",
                  visibility: cursorVisible ? "visible" : "hidden",
                }}
                aria-hidden="true"
              />
            )}
          </h2>
        </main>

        <p className="mt-6 text-sm sm:text-base md:text-lg font-medium text-black/80 px-4 max-w-md">
          Desenvolvedor front-end com experiência em back-end.
        </p>

        <a
          href="#projetos"
          className="px-8 py-3 sm:px-10 sm:py-4 mt-8 text-base sm:text-lg font-semibold text-white 
          bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg shadow-orange-500/40 
          transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          Meus Projetos
        </a>
      </section>

      <div id="projetos">
        <Projetos />
      </div>
    </div>
  );
}

export default Home;
