import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import videoFile from "./assets/Custom Video.mp4";
import ContactUs from "./ContactUs";
import { Box, Modal } from "../node_modules/@mui/material";
import { IconButton } from "../node_modules/@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonHoverButton from "./CommonHoverButton";

const Customization = () => {
  const videoRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleEnquireNow = () => {
    setSelectedProduct({ id: "123", productname: "Contact for Custom Design to The Element and Company, We are here to fulfill your interior designs" }); // Example product data
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-12 text-center">
      {/* Header */}
      <div
        className="flex items-center justify-center w-full py-6"
        data-aos="fade-down"
      >
        <div className="flex-grow h-px bg-gray-300"></div>
        <h1 className="px-6 text-3xl font-bold text-gray-800">Customization</h1>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-600 my-6" data-aos="fade-down">
        Tailored to You – Custom Luxury Without Limits
        </p>
        {/* Video Section */}
        <div className="my-6 flex justify-center" data-aos="zoom-in">
          <video
            ref={videoRef}
            className="w-full max-w-3xl h-auto max-h-[80vh] rounded-lg shadow-lg object-contain"
            controls
            onClick={handlePlayPause}
          >
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-lg text-gray-600 my-6" data-aos="fade-up">
        At The Element & Co, we offer bespoke furniture, meticulously crafted to match your vision,
style, and space. From the finest materials to personalized finishes, every detail is designed
around you. <br></br> <br></br>
Whether you have a specific concept in mind or need expert guidance, our team works closely
with you to bring your ideas to life. With seamless customization, masterful craftsmanship, and
an unwavering commitment to quality, we transform your vision into a timeless statement of
elegance. Create a piece that’s truly yours—crafted for you, designed to last.
        </p>
        {/* Enquire Now Button */}

        <CommonHoverButton
          label={"Contact for Customisation"}
          onClick={handleEnquireNow}
        />
      </div>

      {/* Modal for ContactUs Page */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 600,
            maxHeight: "80vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            // p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            "@media (max-width: 600px)": {
              width: "95%",
              maxWidth: "90%",
              p: 2,
            },
          }}
        >
          <IconButton
            sx={{
              position: "sticky",
              top: 0,
              right: 0,
              zIndex: 10,
              alignSelf: "flex-end",
            }}
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
          <ContactUs
            isDataFromProduct={false}
            //productId={selectedProduct?.id || ""}
            //productName={selectedProduct?.productname || ""}
            closeModal={closeModal}
            isDataForCustomisation={true}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Customization;
