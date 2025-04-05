import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import CGLogo from "./assets/The Element & Co dark.svg";
import { Webcontext } from "./CodingGranthaClientWeb";

const Headers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isBackgroundChanged, setIsBackgroundChanged } =
    useContext(Webcontext);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "About Us", scrollTo: "about" },
    { name: "Products", scrollTo: "products" },
    { name: "Case Studies", scrollTo: "case-studies" },
    { name: "Contact Us", scrollTo: "contact" },
    { name: "Customization", scrollTo: "customization" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBackgroundChanged(true);
    }, 3000); // Change header background after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (scrollTo) => {
    if (location.pathname !== "/") {
      navigate("/"); // Redirect to home first
      setTimeout(() => {
        scroller.scrollTo(scrollTo, {
          smooth: true,
          duration: 200,
        });
        navigate(`/#${scrollTo}`); // Update the URL
      }, 100);
    } else {
      scroller.scrollTo(scrollTo, {
        smooth: true,
        duration: 200,
      });
      navigate(`/#${scrollTo}`); // Update the URL
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className={`z-[9999] sticky top-0 py-6 shadow-md transition-colors duration-300 ${
        isBackgroundChanged ? "bg-white" : "bg-white"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <img src={CGLogo} alt="Logo" className="h-6" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-12 font-bold">
          {navItems.map((item, index) => (
            <span
              key={index}
              onClick={() => handleNavClick(item.scrollTo)}
              className="cursor-pointer text-black hover:text-[#DD7923] transition duration-300"
            >
              {item.name}
            </span>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transition duration-300"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
              className="stroke-black"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden absolute top-16 inset-x-0 w-full rounded-lg transition-all duration-700 z-[9998] bg-[#3D3D3D] bg-opacity-95 text-white mt-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <ul className="flex flex-col space-y-4 p-4">
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05, color: "#DD7923" }}
                className="origin-center ml-6"
              >
                <span
                  onClick={() => handleNavClick(item.scrollTo)}
                  className="block transition duration-300 text-white hover:text-[#DD7923] cursor-pointer"
                >
                  {item.name}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Headers;