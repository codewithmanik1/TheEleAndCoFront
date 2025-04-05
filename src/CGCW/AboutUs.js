import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import Product1 from "./assets/product1.png";
import Product2 from "./assets/WhatsApp Image 2025-02-27 at 18.00.34_e0ae3a92.jpg";
import Product3 from "./assets/WhatsApp Image 2025-02-27 at 18.00.34_42de3d31.jpg";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <>
      {/* Header */}
      <div
        className="flex items-center justify-center w-full py-4"
        data-aos="fade-down"
      >
        <div className="flex-grow h-px bg-gray-300"></div>
        <h1 className="px-4 text-2xl text-black font-bold text-center">
          About Us
        </h1>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <div className="flex flex-col items-center justify-center p-4 w-full overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          {/* Section 1: Image Left, Text Right */}
          <div
            className="flex flex-col md:flex-row items-center gap-6 w-full"
            data-aos="fade-up"
          >
            <img
              src={Product1}
              alt="Brand Story"
              className="w-full md:w-1/2 max-w-full object-cover shadow-lg"
              data-aos="fade-right"
            />
            <div className="md:w-1/2 text-center px-4">
              <p className="text-lg font-semibold mb-2">Brand Story</p>
              <p className="text-base">
              Luxury has long been synonymous with exclusivity, craftsmanship, and timeless beauty. But at
The Element & Co, we believe true luxury goes beyond aesthetics—it carries a responsibility to
the world we inhabit.Born from a passion for refined design and a deep commitment to
sustainability, The Element & Co was founded on a bold vision: to redefine luxury as a
conscious choice—one where elegance and responsibility coexist without compromise. <br/> <br/>
At The Element & Co, we don’t see sustainability as a limitation. We see it as an evolution—one
that transforms luxury into a choice that empowers, inspires, and endures. Our mission is to
encourage people to embrace sustainable luxury, not as a compromise, but as the ultimate
standard.Because when elegance and ethics merge, we don’t just create furniture—we create a
movement. A movement where sophistication meets sustainability, and where every choice is a
statement of conscious living.
This is the essence of The Element & Co. Luxury reimagined. Responsibility redefined.
              </p>
            </div>
          </div>

          {/* Section 2: Text Left, Image Right */}
          <div
            className="flex flex-col md:flex-row-reverse items-center  w-full"
            data-aos="fade-up"
          >
            <img
              src={Product2}
              alt="Vision"
              className="w-full md:w-1/2 max-w-full object-cover shadow-lg"
              data-aos="fade-left"
            />
            <div className="md:w-1/2 text-center px-4">
              <p className="text-lg font-semibold mb-2">Vision</p>
              <p className="text-base">
                To be a vanguard of contemporary elegance, creating timeless
                furniture that harmonizes form and function, inspires
                individuality, and redefines the art of modern living.
              </p>
            </div>
          </div>

          {/* Section 3: Image Left, Text Right */}
          <div
            className="flex flex-col md:flex-row items-center  w-full"
            data-aos="fade-up"
          >
            <img
              src={Product3}
              alt="Mission"
              className="w-full md:w-1/2 max-w-full object-fill shadow-lg"
              data-aos="fade-right"
            />
            <div className="md:w-1/2 text-center px-4">
              <p className="text-lg font-semibold mb-2">Mission</p>
              <p className="text-base">
                At The Element & Co., our mission is to craft extraordinary
                furniture that embodies precision, innovation, and artistry.
                Guided by an unwavering commitment to sustainable practices and
                bespoke excellence, we transform interiors into curated
                reflections sophistication and purpose, elevating the essence of
                every space we touch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
