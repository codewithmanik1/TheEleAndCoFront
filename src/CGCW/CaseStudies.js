import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import img2 from "./assets/Rectangle 20 (1).png";
import img3 from "./assets/Rectangle 21 (1).png";
import img4 from "./assets/Rectangle 22 (1).png";
import img1 from "./assets/Rectangle 8.png";
import { CaseStudiesContext } from "./CodingGranthaClientWeb";

const caseStudies = [
  {
    id: 1,
    image: img1,
    category: "Design",
    title: "Sustainable Luxury: Redefining Elegance in Design",
    description:
      "Blending eco-conscious practices with timeless luxury aesthetics.",
    detailedDesc:
      "True luxury considers its impact, not just its appearance. Modern clients and designers seek materials and processes that honor the planet while delivering exceptional quality. At The Element and Co., sustainability is at the heart of everything we create. Our designs incorporate responsibly sourced materials and innovative techniques that minimize environmental impact. Whether it’s through the use of recycled metals or energy-efficient manufacturing processes, every element reflects our commitment to sustainability without compromising elegance.",
    author: "The Element and Co.",
    date: "Friday, 21 Feb 2025",
  },
  {
    id: 2,
    image: img2,
    category: "Design",
    title: "Luxury Redefined: Sustainable and Customizable Designs",
    description:
      "Crafting bespoke, eco-friendly spaces with modern innovation.",
    detailedDesc:
      "In today’s design landscape, luxury is no longer just about opulence—it’s about creating spaces that resonate with purpose, individuality, and responsibility. At The Element and Co., we are redefining what it means to design for premium spaces by blending sustainable practices with bespoke solutions that elevate contemporary interiors.",
    author: "The Element and Co.",
    date: "Friday, 21 Feb 2025",
  },
  {
    id: 3,
    image: img3,
    category: "Design",
    title: "Sustainable Luxury: A Conscious Choice",
    description:
      "Prioritizing sustainability while maintaining exceptional quality.",
    detailedDesc:
      "True luxury considers its impact, not just its appearance. Modern clients and designers seek materials and processes that honor the planet while delivering exceptional quality. At The Element and Co., sustainability is at the heart of everything we create. Our designs incorporate responsibly sourced materials and innovative techniques that minimize environmental impact. For example, our signature offering, crafted using eco-conscious methods, reduces waste and maximizes durability, exemplifying how sustainability can enhance both form and function.",
    author: "The Element and Co.",
    date: "Friday, 21 Feb 2025",
  },
  {
    id: 4,
    image: img4,
    category: "Marketing",
    title: "Why Choose The Element and Co.?",
    description:
      "Exquisite designs, sustainability, and bespoke craftsmanship.",
    detailedDesc:
      "Choosing The Element and Co. means partnering with a leader in design excellence. Our commitment to sustainable luxury and customization ensures every project reaches its fullest potential. We offer exquisite designs that blend timeless elegance with contemporary innovation, environmentally responsible materials and processes for a greener future, and bespoke solutions tailored to bring your unique vision to life. Luxury is personal, and our Wave Matrix, for example, can be customized to fit any design narrative, creating spaces that tell unique stories.",
    author: "The Element and Co.",
    date: "Friday, 21 Feb 2025",
  },
];

const CaseStudies = () => {
  const { mainStudy, setMainStudy, thumbnails, setThumbnails } =
    useContext(CaseStudiesContext);

  // Initialize the main study and thumbnails if they are not set
  useEffect(() => {
    if (!mainStudy) {
      setMainStudy(caseStudies[0]);
      setThumbnails(caseStudies.slice(1));
    }
  }, [mainStudy, setMainStudy, setThumbnails]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const swapStudy = (index) => {
    const newMain = thumbnails[index];
    const newThumbnails = [...thumbnails];
    newThumbnails[index] = mainStudy;
    setMainStudy(newMain);
    setThumbnails(newThumbnails);
  };

  const nextStudy = () => {
    const newThumbnails = [...thumbnails, mainStudy];
    setMainStudy(newThumbnails.shift());
    setThumbnails(newThumbnails);
  };

  const prevStudy = () => {
    const newThumbnails = [mainStudy, ...thumbnails];
    setMainStudy(newThumbnails.pop());
    setThumbnails(newThumbnails);
  };

  if (!mainStudy) {
    return <div>Loading...</div>; // Handle case where mainStudy is not set
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-center w-full py-8">
        <div className="flex-grow h-px bg-gray-300"></div>
        <h1 className="px-6 text-2xl font-bold text-gray-800">Case Studies</h1>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <motion.div
        className="container mx-auto sm:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {/* Left Section */}
          <motion.div
            className="md:col-span-1"
            key={mainStudy.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Article Info */}
              <div className="mb-6">
                <span className="text-orange-500 font-semibold text-sm uppercase tracking-wide">
                  Article
                </span>
                <h2 className="text-2xl font-bold mt-2 text-gray-800">
                  {mainStudy.title}
                </h2>
                <p className="text-gray-600 mt-2">{mainStudy.description}</p>
              </div>

              {/* Main Image */}
              <motion.div className="relative">
                <motion.img
                  src={mainStudy.image}
                  alt="Main Case Study"
                  className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg">
                  <h3 className="text-xl font-bold text-white mt-1">
                    {mainStudy.title}
                  </h3>
                  <p className="text-sm text-white opacity-80 mt-2">
                    {mainStudy.description}
                  </p>
                  <button className="mt-3 text-sm text-white font-semibold hover:underline">
                    <Link
                      to={`/case-study-details/${mainStudy.id}`}
                      state={{ study: mainStudy, others: thumbnails }}
                    >
                      Read More
                    </Link>
                  </button>
                  {/* Navigation Buttons */}
                  <div className="flex justify-end mt-6">
                    <motion.button
                      onClick={prevStudy}
                      className="bg-white text-gray-800 px-6 py-3 shadow-md hover:bg-gray-50 transition-all border border-white"
                      whileTap={{ scale: 0.9 }}
                    >
                      ←
                    </motion.button>
                    <motion.button
                      onClick={nextStudy}
                      className="bg-black text-white px-6 py-3 shadow-md hover:bg-gray-800 transition-all border border-white"
                      whileTap={{ scale: 0.9 }}
                    >
                      →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {thumbnails.map((study, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-4 gap-4 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-all"
                onClick={() => swapStudy(index)}
                whileHover={{ scale: 1.03 }}
                data-aos="fade-up"
              >
                {/* Thumbnail Image */}
                <div className="col-span-1">
                  <img
                    src={study.image}
                    alt="Thumbnail"
                    className="w-full h-42 object-fill rounded-lg shadow-sm"
                  />
                </div>

                {/* Thumbnail Content */}
                <div className="col-span-3 flex flex-col justify-center">
                  <h4 className="text-lg font-bold text-gray-800 mt-1">
                    {study.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {study.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    By {study.author} • {study.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CaseStudies;
