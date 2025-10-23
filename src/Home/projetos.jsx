import React, { useRef, useEffect } from "react";
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiPhp, SiPython, 
  SiMysql, SiPostgresql, SiMongodb 
} from "react-icons/si";
import "./home.css";
import { CardsCarousel } from "../components/CardDefault";

function Projetos() {
  const groupRef = useRef(null);
  const icons = [
    { icon: <SiHtml5 size={60} />, key: "html" },
    { icon: <SiCss3 size={60} />, key: "css" },
    { icon: <SiJavascript size={60} />, key: "js" },
    { icon: <SiTypescript size={60} />, key: "typescript" },
    { icon: <SiReact size={60} />, key: "react" },
    { icon: <SiNodedotjs size={60} />, key: "node" },
    { icon: <SiPhp size={60} />, key: "php" },
    { icon: <SiPython size={60} />, key: "python" },
    { icon: <SiMysql size={60} />, key: "mysql" },
    { icon: <SiPostgresql size={60} />, key: "postgresql" },
    { icon: <SiMongodb size={60} />, key: "mongodb" }
  ];

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;

    const setVars = () => {
      const cards = Array.from(el.querySelectorAll(".card")).slice(0, icons.length);
      const totalWidth = cards.reduce((sum, card) => {
        const style = getComputedStyle(card);
        return sum + card.offsetWidth + parseInt(style.marginRight);
      }, 0);
      el.style.setProperty("--scroll-distance", `${totalWidth}px`);

      const speedPxPerSec = 120;
      const duration = Math.max(8, Math.round(totalWidth / speedPxPerSec));
      el.style.setProperty("--scroll-duration", `${duration}s`);
    };

    setVars();
    window.addEventListener("resize", setVars);
    return () => window.removeEventListener("resize", setVars);
  }, [icons]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-500">
      <section>
        <div id="carrousel">
          <div className="scroll-group" ref={groupRef}>
            {icons.map((item) => (
              <div className="card" key={`a-${item.key}`}>{item.icon}</div>
            ))}
            {icons.map((item) => (
              <div className="card" key={`b-${item.key}`}>{item.icon}</div>
            ))}
          </div>
        </div>
      </section>

      <div>
        <p className="text-[40px] text-orange-600 font-extrabold text-center mb-20">
          Meus <span className="text-gray-200">projetos</span>
        </p>
        <div className="">
        <CardsCarousel />
        </div>
      </div>
    </div>
  );
}

export default Projetos;
