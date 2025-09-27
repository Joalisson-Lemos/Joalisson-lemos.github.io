import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const text = "Transformar seus sonhos em sites!";
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        const nextChar = text[index];
        setDisplayedText((prev) => prev + nextChar);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center p-6
                    bg-gradient-to-b 
                    from-orange-100
                    via-orange-200 
                    to-orange-400
                    bg-opacity
                    ">
      <main className=" text-orange-600 flex flex-col items-center justify-center">
        <h2 className="text-[40px] font-bold text-white ">Óla meu nome é <br /><span className="text-black"> Joalisson  Lemos</span> e vou</h2> <span><br /></span>
        <h2 className="text-[40px] font-bold">
          {displayedText}
          {isTyping && (
            <span className="ml-1 border-r-2 border-orange-500 animate-blink"></span>
          )}
        </h2>
      </main>
      <br /> <br />
      <p className="20px font-bold">Desenvoldor front-end com experiencia em back-and</p>
         <Link 
          to="/projetos" 
          className="px-10 py-4 mt-8 text-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-2xl shadow-orange-500/50transition duration-300 ease-in-out transform hover:scale-105" >
          Meus Projetos
      </Link>


    </div>
  );
}

export default Home;
