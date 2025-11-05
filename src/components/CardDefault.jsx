import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

import img1 from "../assets/nlw.jpg"; 
import img2 from "../assets/portifolio.jpg";
import img3 from "../assets/nlw.jpg"; 
import img4 from "../assets/nlw.jpg"; 
import img5 from "../assets/nlw.jpg"; 
import img6 from "../assets/nlw.jpg"; 
import img7 from "../assets/nlw.jpg"; 
import img8 from "../assets/nlw.jpg"; 

function debounce(func, delay) {
  let timeout;
  return function executedFunction(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

const GAP_IN_PX = 24;
const RESIZE_DEBOUNCE_DELAY = 300;
const SCROLL_DEBOUNCE_DELAY = 150;


export function CardsCarousel() { 
  const cards = [
    { title: "NLW AGENTS", description: "Projeto realizado pela rocktseat NLW20.", longDescription: "Projeto realizado em HTML, CSS e JS com agentes de IA em um intensivo iniciante em programação front-end.", image: img1, codeLink: "https://github.com/Joalisson-Lemos/projeto-nlw20/tree/main/nlw", siteLink: "#" },
    { title: "Portifolio", description: "Meu portifolio.", longDescription: "Projeto realizado em React.js e tailwind CSS feito para mostrar meus projetos.", image: img2, codeLink: "https://github.com/Joalisson-Lemos/Joalisson-lemos.github.io", siteLink: "https://joalisson-lemos.github.io/" },
    { title: "Projeto 3", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 3.", image: img3, codeLink: "#", siteLink: "#" },
    { title: "Projeto 4", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 4.", image: img4, codeLink: "#", siteLink: "#" },
    { title: "Projeto 5", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 5.", image: img5, codeLink: "#", siteLink: "#" },
    { title: "Projeto 6", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 6.", image: img6, codeLink: "#", siteLink: "#" },
    { title: "Projeto 7", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 7.", image: img7, codeLink: "#", siteLink: "#" },
    { title: "Projeto 8", description: "Descrição curta.", longDescription: "Descrição completa do Projeto 8.", image: img8, codeLink: "#", siteLink: "#" },
  ];

  const trackRef = useRef(null);
  const [modalCard, setModalCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);

  const updateCardsPerPage = useCallback(() => {
    if (window.innerWidth >= 1024) setCardsPerPage(4); 
    else if (window.innerWidth >= 640) setCardsPerPage(2); 
    else setCardsPerPage(1); 
  }, []);

  useEffect(() => {
    const debouncedUpdate = debounce(updateCardsPerPage, RESIZE_DEBOUNCE_DELAY);
    updateCardsPerPage(); 
    window.addEventListener("resize", debouncedUpdate);
    return () => window.removeEventListener("resize", debouncedUpdate);
  }, [updateCardsPerPage]);


  useEffect(() => {
    document.body.style.overflow = modalCard ? "hidden" : "auto";

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setModalCard(null);
      }
    };
    
    if (modalCard) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [modalCard]);

  const scrollToIndex = useCallback((index) => {
    if (!trackRef.current || !trackRef.current.children[0]) return;
    
    const card = trackRef.current.children[0];
    const cardWidth = card.getBoundingClientRect().width;
    const step = (cardWidth + GAP_IN_PX) * cardsPerPage;
    
    const scrollLeftValue = index * step;
    
    trackRef.current.scrollTo({ left: scrollLeftValue, behavior: "smooth" });
  }, [cardsPerPage]);

  const scrollLeft = useCallback(() => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  }, [currentIndex, scrollToIndex]);

  const scrollRight = useCallback(() => {
    const maxIndex = Math.ceil(cards.length / cardsPerPage) - 1;
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  }, [currentIndex, cards.length, cardsPerPage, scrollToIndex]);

  const handleScroll = useCallback(() => {
    if (!trackRef.current || !trackRef.current.children[0]) return;
    
    const card = trackRef.current.children[0];
    const step = (card.getBoundingClientRect().width + GAP_IN_PX) * cardsPerPage;
    const idx = Math.round(trackRef.current.scrollLeft / step);
    
    setCurrentIndex((prevIndex) => (idx !== prevIndex ? idx : prevIndex));
  }, [cardsPerPage]);

  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, SCROLL_DEBOUNCE_DELAY),
    [handleScroll]
  );

  const maxIndex = Math.ceil(cards.length / cardsPerPage) - 1;


  return (
    <div className="relative w-full max-w-[90%] mx-auto py-10 px-4">
      
      {currentIndex > 0 && (
        <button
          onClick={scrollLeft}
          aria-label="Slide anterior" 
          className="hidden lg:block absolute -left-5 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full z-10 hover:scale-110 shadow-lg transition"
        >
          {"<"}
        </button>
      )}
      {currentIndex < maxIndex && (
        <button
          onClick={scrollRight}
          aria-label="Próximo slide" 
          className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full z-10 hover:scale-110 shadow-lg transition"
        >
          {">"}
        </button>
      )}

      
      <div
        ref={trackRef}
        onScroll={debouncedHandleScroll} 
        className="flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden scrollbar-hide px-4 gap-6"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "auto",
          touchAction: "pan-x pan-y",
          scrollSnapType: "x mandatory", 
        }}
      >
        {cards.map((card, idx) => (
          <Card
            key={idx}
            className="bg-white shadow-xl rounded-2xl overflow-hidden flex-shrink-0 flex flex-col transition-transform duration-300 md:hover:scale-105"
            style={{
              scrollSnapAlign: "start", 
              width:
                cardsPerPage === 4
                  ? `calc((100% - ${3 * GAP_IN_PX}px)/4)`
                  : cardsPerPage === 2
                  ? `calc((100% - ${GAP_IN_PX}px)/2)`
                  : "90%", 
            }}
          >
            <CardHeader className="relative h-48 bg-gray-200">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
            </CardHeader>
            <CardBody className="p-4">
              <Typography variant="h5" className="mb-2 font-bold text-gray-800">{card.title}</Typography>
              <Typography className="text-gray-600 text-sm">{card.description}</Typography>
            </CardBody>
            <CardFooter className="flex justify-center pt-4 pb-4">
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
                onClick={() => setModalCard(card)}
              >
                Saber mais
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-3">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button 
            key={idx}
            aria-label={`Ir para o slide ${idx + 1}`} 
            onClick={() => { 
              setCurrentIndex(idx);
              scrollToIndex(idx);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-orange-500 scale-125" : "bg-gray-400"}`}
          />
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
                <a href={modalCard.codeLink} target="_blank" rel="noopener noreferrer" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md hover:scale-105 transition">Ver código</a>
                <a href={modalCard.siteLink} target="_blank" rel="noopener noreferrer" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md hover:scale-105 transition">Ver site</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CardsCarousel;