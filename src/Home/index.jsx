import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import Projetos from "./projetos";
import { Link } from "react-router-dom";

function Home() {
  const text = "Transformar seus sonhos em sites!";
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
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

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 leading-tight">
            {displayedText}
            {isTyping && (
              <span className="ml-1 border-r-2 border-orange-500 animate-blink"></span>
            )}
          </h2>
        </main>

        <p className="mt-6 text-sm sm:text-base md:text-lg font-medium text-black/80 px-4 max-w-md">
          Desenvolvedor front-end com experiência em back-end.
        </p>

        <Link
          to="#projetos"
          className="px-8 py-3 sm:px-10 sm:py-4 mt-8 text-base sm:text-lg font-semibold text-white 
          bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg shadow-orange-500/40 
          transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          Meus Projetos
        </Link>
      </section>

      <div id="projetos" className="mt-10 sm:mt-20">
        <Projetos />
      </div>
    </div>
  );
}

export default Home;
