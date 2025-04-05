
// export default CaseStudiesDetails;
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { CaseStudiesContext } from "./CodingGranthaClientWeb";

const CaseStudiesDetails = () => {
  const { id } = useParams();
  const { mainStudy, setMainStudy, thumbnails, setThumbnails } =
    useContext(CaseStudiesContext);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // State for infinite looping
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current card index
  const [direction, setDirection] = useState("left"); // Track animation direction

  // Save data before refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("mainStudy", JSON.stringify(mainStudy));
      localStorage.setItem("thumbnails", JSON.stringify(thumbnails));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [mainStudy, thumbnails]);

  // Load saved data on mount
  useEffect(() => {
    const savedMainStudy = localStorage.getItem("mainStudy");
    const savedThumbnails = localStorage.getItem("thumbnails");

    if (!mainStudy && savedMainStudy) {
      setMainStudy(JSON.parse(savedMainStudy));
    }
    if (!thumbnails.length && savedThumbnails) {
      setThumbnails(JSON.parse(savedThumbnails));
    }
  }, []);

  // Clear saved data once new data repopulates
  useEffect(() => {
    if (mainStudy && thumbnails.length) {
      localStorage.removeItem("mainStudy");
      localStorage.removeItem("thumbnails");
    }
  }, [mainStudy, thumbnails]);

  // Initialize articles state with related articles
  useEffect(() => {
    if (mainStudy && thumbnails.length) {
      const relatedArticles = thumbnails.filter(
        (study) => study.id !== mainStudy?.id
      );
      setArticles(relatedArticles);
    }
  }, [mainStudy, thumbnails]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Handle next button click for infinite looping
  const handleNext = () => {
    setDirection("left"); // Set direction to left for next
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  // Handle previous button click for infinite looping
  const handlePrev = () => {
    setDirection("right"); // Set direction to right for previous
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  if (!mainStudy) {
    // If id is undefined, redirect to /#case-studies
    navigate("/#case-studies");
    return;
  }

  if (!mainStudy) {
    return <div className="text-center text-gray-800">Loading...</div>;
  }

  const swapStudy = (relatedStudy) => {
    const newThumbnails = thumbnails.map((study) =>
      study.id === relatedStudy.id ? mainStudy : study
    );
    setMainStudy(relatedStudy);
    setThumbnails(newThumbnails);
    navigate(`/case-study-details/${relatedStudy.id}`);
    scrollTop();
  };

  // Get the current and next card for large screens
  const currentCard = articles[currentIndex];
  const nextCard = articles[(currentIndex + 1) % articles.length];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div className="relative flex items-center justify-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="absolute left-0 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <FaArrowLeft size={24} className="text-gray-800" />
        </button>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-800"
        >
          Case Studies
        </motion.h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.img
          src={mainStudy?.image}
          alt={mainStudy.title}
          data-aos="zoom-in"
          className="w-full h-auto rounded-lg shadow-md"
        />
        <div>
          <motion.h2
            data-aos="fade-right"
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            {mainStudy.title}
          </motion.h2>
          <motion.p data-aos="fade-right" className="text-gray-600 mb-2">
            By {mainStudy.author} | {mainStudy.date}
          </motion.p>
          <motion.p
            data-aos="fade-up"
            className="text-gray-700 mb-4 leading-relaxed"
          >
            {mainStudy.description}
          </motion.p>
          <motion.div
            data-aos="fade-up"
            className="text-gray-700 mb-4 leading-relaxed 
             max-h-[300px] overflow-y-auto 
             scrollbar-hide p-2 border rounded-md"
          >
            {mainStudy.detailedDesc}
          </motion.div>
        </div>
      </div>

      {articles.length > 0 && (
        <div className="mt-12 border-t border-gray-200 pt-8 relative">
          <motion.h3
            data-aos="fade-right"
            className="text-2xl font-semibold text-gray-800 mb-6"
          >
            Related Articles
          </motion.h3>

          <div className="relative flex items-center justify-center">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 flex items-center"
            >
              <FaArrowLeft size={24} />
            </button>

            {/* Cards Container */}
            <div
              ref={scrollRef}
              className="flex  w-full max-w-4xl mx-auto h-[300px] md:h-[200px]"
            >
              <AnimatePresence mode="wait" custom={direction}>
                {/* First Card */}
                <motion.div
                  key={currentCard.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction === "left" ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === "left" ? -100 : 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex-shrink-0 w-full lg:w-1/2 p-4"
                >
                  <div
                    className="flex flex-col md:flex-row items-center bg-gray-50 p-4 rounded-lg shadow-sm gap-4 cursor-pointer"
                    onClick={() => swapStudy(currentCard)}
                  >
                    <img
                      src={currentCard.image}
                      alt={currentCard.title}
                      className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-center text-center md:text-left">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        {currentCard.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        By {currentCard.author}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {currentCard.date}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Second Card (only for lg and above) */}
                <motion.div
                  key={nextCard.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction === "left" ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === "left" ? -300 : 300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="hidden lg:flex flex-shrink-0 w-full lg:w-1/2 p-4"
                >
                  <div
                    className="flex flex-col md:flex-row items-center bg-gray-50 p-4 rounded-lg shadow-sm gap-4 cursor-pointer"
                    onClick={() => swapStudy(nextCard)}
                  >
                    <img
                      src={nextCard.image}
                      alt={nextCard.title}
                      className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-center text-center md:text-left">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        {nextCard.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        By {nextCard.author}
                      </p>
                      <p className="text-gray-500 text-sm">{nextCard.date}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 flex items-center"
            >
              <FaArrowRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudiesDetails;