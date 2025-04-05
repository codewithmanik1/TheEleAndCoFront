// import AOS from "aos";
// import "aos/dist/aos.css";
// import { AnimatePresence, motion } from "framer-motion";
// import React, { useContext, useEffect, useState } from "react";
// import { Webcontext } from "./CodingGranthaClientWeb";
// import LogoDark from "./assets/The Element & Co dark.svg";
// import LogoLight from "./assets/The Element & Co light.svg";

// const images = {
//   light: [
//     require("./assets/Frame1Light.png"),
//     require("./assets/Frame2Light.png"),
//     require("./assets/Frame3Light.png"),
//   ],
//   dark: [
//     require("./assets/Frame1Dark.png"),
//     require("./assets/Frame2Dark.png"),
//     require("./assets/Frame3Dark.png"),
//   ],
// };

// const HomeComponent = () => {
//   const { isBackgroundChanged } = useContext(Webcontext);
//   const [loadedImages, setLoadedImages] = useState([false, false, false]);

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false });
//   }, [isBackgroundChanged]);

//   const selectedImages = isBackgroundChanged ? images.light : images.dark;

//   return (
//     <div className="grid grid-cols-12 md:grid-cols-12 w-screen md:h-[90vh] h-full">
//       {/* Image Section */}
//       <div className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-2 md:h-[90vh] h-full w-full">
//         <div className="flex flex-col md:h-[90vh] h-full">
//           {selectedImages.slice(0, 2).map((src, index) => (
//             <div
//               key={index}
//               className="h-1/2 w-full relative "
//               data-aos="fade-up"
//               style={{ minHeight: "30vh" }}
//             >
//               {!loadedImages[index] && (
//                 <div className="bg-gray-300 animate-pulse absolute inset-0"></div>
//               )}
//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={src} // Force re-render on image change
//                   src={src}
//                   alt={`Frame ${index + 1}`}
//                   loading="lazy"
//                   onLoad={() => {
//                     setLoadedImages((prev) => {
//                       const newLoaded = [...prev];
//                       newLoaded[index] = true;
//                       return newLoaded;
//                     });
//                   }}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   transition={{
//                     duration: 0.8,
//                     ease: "easeInOut",
//                     delay: index * 0.3,
//                   }} // Delay based on index
//                   className="h-full w-full object-fill"
//                 />
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//         <div
//           className="md:h-[90vh] h-full w-full relative "
//           data-aos="fade-left"
//         >
//           {!loadedImages[2] && (
//             <div className="bg-gray-300 animate-pulse absolute inset-0"></div>
//           )}
//           <AnimatePresence mode="wait">
//             <motion.img
//               key={selectedImages[2]} // Force re-render on image change
//               src={selectedImages[2]}
//               alt="Frame 3"
//               loading="lazy"
//               onLoad={() => {
//                 setLoadedImages((prev) => {
//                   const newLoaded = [...prev];
//                   newLoaded[2] = true;
//                   return newLoaded;
//                 });
//               }}
//               initial={{ opacity: 0, x: 100 }} // Slide in from the right
//               animate={{ opacity: 1, x: 0 }} // Slide to the center
//               exit={{ opacity: 0, x: -100 }} // Slide out to the left
//               transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }} // Delay for the third image
//               className="h-full w-full object-fill"
//             />
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Logo & Text Section */}
//       <div
//         className={`py-4 px-2 col-span-12 md:col-span-4 flex flex-col items-center justify-center md:h-[90vh] h-full w-full transition-colors duration-300 ${
//           isBackgroundChanged
//             ? "bg-white text-black"
//             : "bg-black text-[#E0EAED]"
//         }`}
//         data-aos="fade-right"
//       >
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={isBackgroundChanged ? LogoDark : LogoLight} // Force re-render on logo change
//             src={isBackgroundChanged ? LogoDark : LogoLight}
//             alt="Company Logo"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.8, ease: "easeInOut", delay: 0.9 }} // Delay for the logo
//             className="w-3/4 max-w-xs mb-4"
//           />
//         </AnimatePresence>
//         <AnimatePresence mode="wait">
//           <motion.p
//             key={isBackgroundChanged ? "light-text" : "dark-text"} // Force re-render on text change
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.8, ease: "easeInOut", delay: 1.2 }} // Delay for the text
//             className="text-lg font-semibold text-center"
//           >
//             Crafting Sophistication with a Sustainable Heart
//           </motion.p>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default HomeComponent;

import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Webcontext } from "./CodingGranthaClientWeb";
import LogoDark from "./assets/The Element & Co dark.svg";
import LogoLight from "./assets/The Element & Co light.svg";

const images = {
  light: [
    require("./assets/WhatsApp Image 2025-02-27 at 18.35.50_337ac0e1.jpg"),
    require("./assets/IMG-20250227-WA0123.jpg"),
    require("./assets/IMG-20250227-WA0126.jpg"),
    require("./assets/IMG-20250227-WA0127.jpg"),
  ],
  dark: [
    require("./assets/IMG-20250227-WA0119.jpg"),
    require("./assets/IMG-20250227-WA0118.jpg"),
    require("./assets/IMG-20250227-WA0121.jpg"),
    require("./assets/IMG-20250227-WA0120.jpg"),
  ],
};

const HomeComponent = () => {
  const { isBackgroundChanged } = useContext(Webcontext);
  const [loadedImages, setLoadedImages] = useState([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, [isBackgroundChanged]);

  const selectedImages = isBackgroundChanged ? images.light : images.dark;

  // Define the height distribution for the images
  const heightDistribution = ["45%", "55%", "55%", "45%"];

  return (
    <div className="grid grid-cols-12 md:grid-cols-12 w-screen min-h-screen">
      {/* Image Section */}
      <div className="col-span-12 md:col-span-7 grid grid-cols-2 md:grid-cols-2 h-[60vh] md:h-[90vh] gap-3 w-full">
        {[0, 1].map((colIndex) => (
          <div
            key={colIndex}
            className="flex flex-col h-[60vh] md:h-[90vh] gap-2"
          >
            {selectedImages
              .slice(colIndex * 2, colIndex * 2 + 2)
              .map((src, index) => {
                const globalIndex = colIndex * 2 + index; // Calculate the global index for height distribution
                return (
                  <div
                    key={globalIndex}
                    className="w-full relative overflow-hidden"
                    style={{ height: heightDistribution[globalIndex] }} // Set dynamic height
                    data-aos={colIndex === 0 ? "fade-up" : "fade-left"}
                  >
                    {!loadedImages[globalIndex] && (
                      <div className="bg-gray-300 animate-pulse absolute inset-0 w-full h-full"></div>
                    )}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={src}
                        src={src}
                        alt={`Frame ${globalIndex + 1}`}
                        loading="lazy"
                        onLoad={() => {
                          setLoadedImages((prev) => {
                            const newLoaded = [...prev];
                            newLoaded[globalIndex] = true;
                            return newLoaded;
                          });
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                          delay: globalIndex * 0.3,
                        }}
                        className="w-full h-full object-fill" // Use object-cover to maintain aspect ratio
                      />
                    </AnimatePresence>
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      {/* Logo & Text Section */}
      <div
        className={`py-4 px-2 col-span-12 md:col-span-5 flex flex-col items-center justify-center h-[40vh] md:h-[90vh] w-full transition-colors duration-300 ${
          isBackgroundChanged
            ? "bg-white text-black"
            : "bg-black text-[#E0EAED]"
        }`}
        data-aos="fade-right"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={isBackgroundChanged ? LogoDark : LogoLight}
            src={isBackgroundChanged ? LogoDark : LogoLight}
            alt="Company Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.9 }}
            className="w-3/4 max-w-xs mb-4"
          />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={isBackgroundChanged ? "light-text" : "dark-text"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 1.2 }}
            className="text-lg font-semibold text-center"
          >
            Art of Living, Redefined
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeComponent;