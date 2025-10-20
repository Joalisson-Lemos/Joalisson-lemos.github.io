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
    { title: "NLW AGENTS", description: "Descrição curta.", longDescription: "Descrição completa do NLW AGENTS.", image: img1, codeLink: "https://github.com/Joalisson-Lemos/projeto-nlw20/tree/main/nlw", siteLink: "#" },
    { title: "Portifolio", description: "Meu portifolio feito em React e Tailwind.", longDescription: "Descrição completa do Projeto 2.", image: img2, codeLink: "https://github.com/Joalisson-Lemos/Joalisson-lemos.github.io", siteLink: "https://joalisson-lemos.github.io/" },
    { title: "Projeto 3", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 3.", image: img3, codeLink: "#", siteLink: "#" },
    { title: "Projeto 4", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 4.", image: img4, codeLink: "#" },
    { title: "Projeto 5", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 5.", image: img5, codeLink: "#" },
    { title: "Projeto 6", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 6.", image: img6, codeLink: "#" },
    { title: "Projeto 7", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 7.", image: img7, codeLink: "#" },
    { title: "Projeto 8", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 8.", image: img8, codeLink: "#" },
    { title: "Projeto 9", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 9.", image: img8, codeLink: "#" },
    { title: "Projeto 10", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 10.", image: img8, codeLink: "#" },
    { title: "Projeto 11", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 11.", image: img8, codeLink: "#" },
    { title: "Projeto 12", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 12.", image: img8, codeLink: "#" },
  ];

  const trackRef = useRef(null);
  const [modalCard, setModalCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);

  const updateCardsPerPage = () => {
    if (window.innerWidth >= 1024) setCardsPerPage(4);
    else if (window.innerWidth >= 640) setCardsPerPage(2);
    else setCardsPerPage(2);
  };

  useEffect(() => {
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);
  useEffect(() => {
    if(modalCard){
    document.body.style.overflow = "hidden";
    } else{
      document.body.style.overflow = "auto";
    }
  }, [modalCard]);

  const scrollToIndex = (index) => {
    if (!trackRef.current) return;
    const card = trackRef.current.children[0];
    if (!card) return;
    const gap = 24;
    const step = (card.getBoundingClientRect().width + gap) * cardsPerPage;
    trackRef.current.scrollTo({ left: index * step, behavior: "smooth" });
  };

  const scrollLeft = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const maxIndex = Math.ceil(cards.length / cardsPerPage) - 1;
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleScroll = () => {
    if (!trackRef.current) return;
    const card = trackRef.current.children[0];
    if (!card) return;
    const gap = 24;
    const step = (card.getBoundingClientRect().width + gap) * cardsPerPage;
    const idx = Math.round(trackRef.current.scrollLeft / step);
    setCurrentIndex(idx);
  };

  return (
    <div className="relative w-full max-w-[90%] mx-auto py-10 px-4">
      {currentIndex > 0 && (
        <button
          onClick={scrollLeft}
          className="hidden lg:block absolute -left-5 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full z-10 hover:scale-110 shadow-lg transition"
        >
          {"<"}
        </button>
      )}
      {currentIndex < Math.ceil(cards.length / cardsPerPage) - 1 && (
        <button
          onClick={scrollRight}
          className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full z-10 hover:scale-110 shadow-lg transition"
        >
          {">"}
        </button>
      )}

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-6 flex-nowrap overflow-x-auto scrollbar-hide touch-pan-x"
        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
      >
        {cards.map((card, idx) => (
          <Card
            key={idx}
            className="bg-white shadow-lg rounded-2xl overflow-hidden flex-shrink-0 hover:scale-105 transition-transform duration-300"
            style={{
              width:
                cardsPerPage === 4
                  ? "calc((100% - 3*1.5rem)/4)"
                  : cardsPerPage === 2
                  ? "calc((100% - 1.5rem)/2)"
                  : "100%",
            }}
          >
            <CardHeader className="relative h-48 bg-gray-200">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" className="mb-2 font-bold text-gray-800">{card.title}</Typography>
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

      <div className="flex justify-center mt-6 space-x-3">
        {Array.from({ length: Math.ceil(cards.length / cardsPerPage) }).map((_, idx) => (
          <div key={idx} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-orange-500 scale-125" : "bg-gray-400"}`} />
        ))}
      </div>

      {modalCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setModalCard(null)}>
          <div className="bg-white rounded-xl max-w-3xl w-full shadow-lg overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-red-600 hover:text-red-800 text-3xl font-bold" onClick={() => setModalCard(null)}>&times;</button>
            <img src={modalCard.image} alt={modalCard.title} className="w-full h-80 sm:h-96 object-contain bg-gray-100" />
            <div className="p-6">
              <Typography variant="h4" className="mb-4 font-bold text-gray-800">{modalCard.title}</Typography>
              <Typography className="text-gray-700 mb-4">{modalCard.longDescription}</Typography>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href={modalCard.codeLink} target="_blank" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md hover:scale-105 transition">Ver código</a>
                <a href={modalCard.siteLink} target="_blank" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md hover:scale-105 transition">Ver site</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
