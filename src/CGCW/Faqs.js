import { Button } from "../node_modules/@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import apiInstance from "../http_config";
import CommonHoverButton from "./CommonHoverButton";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await apiInstance.post("/publicApi/getFAQs", {
        page,
        size: pageSize,
      });
      if (response.data.statusCode === 200) {
        setFaqs((prevFaqs) => [...prevFaqs, ...response.data.result]);
        setTotalCount(response.data.count);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div
        className="flex items-center justify-center w-full py-4"
        data-aos="fade-down"
      >
        <div className="flex-grow h-px bg-gray-300"></div>
        <h1 className="px-4 text-2xl text-black font-bold">
          Frequently Asked Questions
        </h1>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      <div className="container mx-auto max-w-3xl" data-aos="fade-up">
        <div className="text-center py-4 text-sm sm:text-base">
          Can't find the answer you're looking for? Feel free to contact us.
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={item.id}
              className="border border-gray-400  overflow-hidden"
              data-aos="fade-up"
            >
              <button
                className="flex justify-between items-center w-full text-left px-4 sm:py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-sm sm:text-base">
                  {item.questions}
                </span>
                <span className="text-lg sm:text-xl font-bold">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    layout
                    initial={{
                      opacity: 0,
                      height: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="px-4 text-black text-sm sm:text-base bg-white shadow-inner"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {faqs.length < totalCount && (
          <div className="text-center mt-6">
            <CommonHoverButton label={"Load More"} onClick={fetchFAQs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Faqs;
