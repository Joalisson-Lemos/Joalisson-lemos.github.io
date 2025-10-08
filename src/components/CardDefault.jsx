import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import img1 from "../assets/nlw.jpg";
import img2 from "../assets/portifolio.jpg";
import img3 from "../assets/nlw.jpg";
import img4 from "../assets/nlw.jpg";
import img5 from "../assets/nlw.jpg";
import img6 from "../assets/nlw.jpg";
import img7 from "../assets/nlw.jpg";
import img8 from "../assets/nlw.jpg";

export function CardsCarousel() {
  const cards = [
    { title: "NLW AGENTS", description: "Descrição curta.", longDescription: "Descrição completa do NLW AGENTS.", image: img1, codeLink: "#", siteLink: "#" },
    { title: "Portifolio", description: "Meu portifolio feito em React e Tailwind.", longDescription: "Descrição completa do Projeto 2.", image: img2, codeLink: "#", siteLink: "#" },
    { title: "Projeto 3", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 3.", image: img3, codeLink: "#", siteLink: "#" },
    { title: "Projeto 4", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 4.", image: img4, codeLink: "#", siteLink: "#" },
    { title: "Projeto 5", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 5.", image: img5, codeLink: "#", siteLink: "#" },
    { title: "Projeto 6", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 6.", image: img6, codeLink: "#", siteLink: "#" },
    { title: "Projeto 7", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 7.", image: img7, codeLink: "#", siteLink: "#" },
    { title: "Projeto 8", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 8.", image: img8, codeLink: "#", siteLink: "#" },
  ];

  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(250);
  const [scrollPos, setScrollPos] = useState(0);
  const [modalCard, setModalCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (containerRef.current) {
        if (w < 640) setCardWidth(220);
        else if (w < 1024) setCardWidth(240);
        else setCardWidth(250);

        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
        setCanScrollRight(scrollPos < maxScroll);
        setCanScrollLeft(scrollPos > 0);
      }
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [scrollPos]);

  const scrollLeft = () => {
    if (!containerRef.current) return;
    const newPos = Math.max(scrollPos - (cardWidth + 20), 0);
    setScrollPos(newPos);
    containerRef.current.scrollTo({ left: newPos, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!containerRef.current) return;
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    const newPos = Math.min(scrollPos + (cardWidth + 20), maxScroll);
    setScrollPos(newPos);
    containerRef.current.scrollTo({ left: newPos, behavior: "smooth" });
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto py-10">
      {!isMobile && canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full z-10 hover:scale-110 shadow-lg transition"
        >
          {"<"}
        </button>
      )}
      {!isMobile && canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full z-10 hover:scale-110 shadow-lg transition"
        >
          {">"}
        </button>
      )}

      <div className={`overflow-hidden ${isMobile ? "overflow-x-auto scrollbar-hide" : ""}`}>
        <div
          ref={containerRef}
          className={`flex gap-6 transition-transform duration-500 ${isMobile ? "flex-nowrap" : ""}`}
          style={{
            transform: isMobile ? "none" : `translateX(-${scrollPos}px)`,
          }}
        >
          {cards.map((card, idx) => (
            <Card
              key={idx}
              className="bg-white shadow-lg rounded-2xl overflow-hidden flex-shrink-0 hover:scale-105 transition-transform duration-300"
              style={{ width: `${cardWidth}px` }}
            >
              <CardHeader className="relative h-48 bg-gray-200">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" className="mb-2 font-bold text-gray-800">
                  {card.title}
                </Typography>
                <Typography className="text-gray-600 text-sm">{card.description}</Typography>
              </CardBody>
              <CardFooter className="flex justify-center pt-4">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md hover:scale-105 transition"
                  onClick={() => setModalCard(card)}
                >
                  Saber mais
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {modalCard && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setModalCard(null)}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full shadow-lg overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-red-600 hover:text-red-800 text-3xl font-bold"
              onClick={() => setModalCard(null)}
            >
              &times;
            </button>
            <img src={modalCard.image} alt={modalCard.title} className="w-full h-80 sm:h-96 object-contain bg-gray-100" />
            <div className="p-6">
              <Typography variant="h4" className="mb-4 font-bold text-gray-800">{modalCard.title}</Typography>
              <Typography className="text-gray-700 mb-4">{modalCard.longDescription}</Typography>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href={modalCard.codeLink} target="_blank" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md hover:scale-105 transition">
                  Ver código
                </a>
                <a href={modalCard.siteLink} target="_blank" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md hover:scale-105 transition">
                  Ver site
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
