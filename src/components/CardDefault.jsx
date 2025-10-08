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
  const [cardWidth, setCardWidth] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);
  const [modalCard, setModalCard] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(5);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      let perView = 5;
      if (w < 640) perView = 2;
      else if (w < 1024) perView = 3;
      setCardsPerView(perView);
      setIsMobile(w < 1024);
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth / perView - 16;
        setCardWidth(width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const scrollLeft = () => setScrollPos((prev) => Math.max(prev - cardWidth - 16, 0));
  const scrollRight = () => setScrollPos((prev) => Math.min(prev + cardWidth + 16, (cardWidth + 16) * (cards.length - cardsPerView)));

  return (
    <div className="relative w-full max-w-[1400px] mx-auto py-10">
      {!isMobile && scrollPos > 0 && (
        <button
          onClick={scrollLeft}
          className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full z-10 hover:scale-110 hover:shadow-lg transition duration-300"
        >
          {"<"}
        </button>
      )}
      {!isMobile && scrollPos < (cardWidth + 16) * (cards.length - cardsPerView) && (
        <button
          onClick={scrollRight}
          className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full z-10 hover:scale-110 hover:shadow-lg transition duration-300"
        >
          {">"}
        </button>
      )}
      <div className={`overflow-hidden ${isMobile ? "overflow-x-auto scrollbar-hide relative" : ""}`}>
        <div
          ref={containerRef}
          className={`flex gap-4 transition-transform duration-500 ${isMobile ? "flex-nowrap" : ""}`}
          style={{ transform: isMobile ? "none" : `translateX(-${scrollPos}px)` }}
        >
          {cards.map((card, idx) => (
            <Card
              key={idx}
              className="bg-white shadow-lg rounded-2xl overflow-hidden flex-shrink-0 hover:scale-105 transition-transform duration-300"
              style={{ width: `${cardWidth}px` }}
            >
              <CardHeader className="relative h-56 bg-gray-200">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2 font-bold text-gray-800">
                  {card.title}
                </Typography>
                <Typography className="text-gray-600 text-sm">{card.description}</Typography>
              </CardBody>
              <CardFooter className="flex justify-center pt-4">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md hover:scale-105 hover:shadow-lg transition duration-300"
                  onClick={() => setModalCard(card)}
                >
                  Saber mais
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {isMobile && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full bg-orange-400 opacity-60 animate-pulse"></div>
        )}
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
                <a href={modalCard.codeLink} target="_blank" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md hover:scale-105 hover:shadow-lg transition duration-300">
                  Ver código
                </a>
                <a href={modalCard.siteLink} target="_blank" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md hover:scale-105 hover:shadow-lg transition duration-300">
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
