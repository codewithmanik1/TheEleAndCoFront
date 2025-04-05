import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import apiInstance from "../http_config";
import CGLogo from "./assets/The Element & Co dark.svg";
import CommonHoverButton from "./CommonHoverButton";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1200, once: true, easing: "ease-in-out" });
  }, []);

  // Detect if the user is on mobile
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const phoneNumber = "919923969949";

  // Function to handle footer navigation
  const handleFooterNavClick = (scrollTo) => {
    if (location.pathname !== "/") {
      navigate("/"); // Redirect to home first
      setTimeout(() => {
        scroller.scrollTo(scrollTo, {
          smooth: true,
          duration: 500,
        });
        navigate(`/#${scrollTo}`); // Update the URL
      }, 100);
    } else {
      scroller.scrollTo(scrollTo, {
        smooth: true,
        duration: 500,
      });
      navigate(`/#${scrollTo}`); // Update the URL
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter a valid email address!");

    setIsSubmitting(true);
    try {
      const response = await apiInstance.post(`/publicApi/subscribe/${email}`);

      if (response.status === 200) {
        toast.success("Subscription successful!", {
          position: "top-center",
        });
        setEmail("");
      } else {
        toast.error("Subscription failed. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact Icons Array
  const contactIcons = [
    {
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/company/the-element-co/",
      hoverColor: "#0077B5", // LinkedIn brand color
    },
    {
      icon: <FaWhatsapp />,
      href: isMobile
        ? `https://wa.me/${phoneNumber}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}`,
      hoverColor: "#25D366", // WhatsApp brand color
    },
    {
      icon: <FaPhoneAlt />,
      href: `tel:${phoneNumber}`,
      hoverColor: "#34B7F1", // Phone brand color
    },
    {
      icon: <FaEnvelope />,
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=theelementandco@gmail.com&su=Inquiry&body=Hello%20The%20Element%20%26%20Co,", // Gmail compose link
      hoverColor: "#D14836", // Gmail brand color
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/theelementandco_?igsh=bDkzMm4wMmM3bGg=",
      hoverColor: "#E4405F", // Instagram brand color
    },
  ];

  return (
    <div className="bg-[#F6F6F6] text-black pt-8">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid md:grid-cols-12 gap-6">
          {/* Left Section */}
          <div
            className="flex flex-col items-center justify-center col-span-12 md:col-span-5 text-center md:text-left mb-4 md:mb-0"
            data-aos="fade-up"
          >
            <img src={CGLogo} alt="Logo" className="h-6" data-aos="zoom-in" />
            <div className="flex gap-5 p-6">
              {/* Render Contact Icons */}
              {contactIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-2xl text-gray-500 transition transform hover:scale-110"
                >
                  <div
                    className={`p-2 rounded-full hover:text-[${item.hoverColor}]`}
                    style={{ "--hover-color": item.hoverColor }} // Dynamic hover color
                  >
                    {item.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Middle Section */}
          <div className="grid col-span-12 md:col-span-7">
            <div className="flex justify-around flex-wrap">
              <span
                onClick={() => handleFooterNavClick("about")}
                className="cursor-pointer hover:text-gray-400 transition transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                About us
              </span>
              <span
                onClick={() => handleFooterNavClick("products")}
                className="cursor-pointer hover:text-gray-400 transition transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Products
              </span>
              <span
                onClick={() => handleFooterNavClick("case-studies")}
                className="cursor-pointer hover:text-gray-400 transition transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Case Studies
              </span>
              <span
                onClick={() => handleFooterNavClick("contact")}
                className="cursor-pointer hover:text-gray-400 transition transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                Contact Us
              </span>
              <span
                onClick={() => handleFooterNavClick("customization")}
                className="cursor-pointer hover:text-gray-400 transition transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                Customization
              </span>

              <div
                className="grid gap-3"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <p className="text-sm my-1">
                  Join Our Mailing List To Stay Up To Date <br /> With The World
                </p>
                <form
                  onSubmit={handleSubscribe}
                  className="relative w-full max-w-3xl mx-auto" // Increased width to max-w-3xl
                  data-aos="zoom-in"
                  data-aos-delay="800"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full p-3 pr-36 rounded-full bg-white text-[#6B6A69] border border-gray-300 focus:outline-none transition shadow-sm focus:shadow-lg focus:border-black"
                    required
                  />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <CommonHoverButton
                      label={isSubmitting ? "Subscribing..." : "Subscribe"}
                      onClick={handleSubscribe}
                      className="px-6 rounded-full"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 py-4 text-center text-sm text-gray-400 bg-[#F6F6F6]">
        © 2025 The Element & Co | All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;