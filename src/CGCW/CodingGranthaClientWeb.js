import React, { createContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Link as ScrollLink, Element, scroller } from "react-scroll";
import Headers from "./Headers";
import HomeComponent from "./HomeComponent";
import Products from "./Products";
import Customization from "./Customization";
import AboutUs from "./AboutUs";
import CaseStudies from "./CaseStudies";
import CaseStudiesDetails from "./CaseStudiesDetails";
import ContactUs from "./ContactUs";
import Faqs from "./Faqs";
import Footer from "./Footer";
import apiInstance from "../http_config";
import ProductDetails from "./ProductsDetails";
import { Modal, Box } from "../node_modules/@mui/material";
import { IconButton } from "../node_modules/@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import ProductMaster from "./ProductMaster";

// Create CaseStudies Context
export const CaseStudiesContext = createContext();

export const CaseStudiesProvider = ({ children }) => {
  const [mainStudy, setMainStudy] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  return (
    <CaseStudiesContext.Provider
      value={{ mainStudy, setMainStudy, thumbnails, setThumbnails }}
    >
      {children}
    </CaseStudiesContext.Provider>
  );
};

// Create Web Context
export const Webcontext = createContext(null);

// Custom hook to handle scrolling to sections based on URL hash
const useScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = location.hash.replace("#", "");
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
      });
    }
  }, [location]);
};

const CodingGranthaClientWeb = () => {
  const [isBackgroundChanged, setIsBackgroundChanged] = useState(false);
  const [categoriesWithDetails, setCategoriesWithDetails] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use the custom hook to handle initial scroll
  useScrollToSection();

  // Open modal after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true); // Open the modal
    }, 20000); // 10 seconds delay

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Change background after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBackgroundChanged(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch categories and details
  useEffect(() => {
    const fetchCategoriesAndDetails = async () => {
      try {
        const response = await apiInstance.get(
          "/publicApi/getProductsCategory"
        );

        if (response.data.statusCode === 200) {
          const fetchedCategories = response.data.result;

          // Preload images
          const categoriesWithImages = fetchedCategories.map((category) => ({
            ...category,
            imageUrl: `${apiInstance.defaults.baseURL}/publicApi/getImages/${category["Category Thumbnail Path"]}`,
          }));
          console.log("categoriesWithImages", categoriesWithImages);

          setCategoriesWithDetails(categoriesWithImages);
          setIsDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching product categories:", error);
      }
    };

    fetchCategoriesAndDetails();
  }, []);

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Webcontext.Provider
      value={{
        isBackgroundChanged,
        setIsBackgroundChanged,
        categoriesWithDetails,
        isDataLoaded,
      }}
    >
      <CaseStudiesProvider>
        <>
          <Headers />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Element name="home">
                      <HomeComponent />
                    </Element>
                    <Element name="products">
                      {isDataLoaded && <Products />}
                    </Element>
                    <Element name="customization">
                      <Customization />
                    </Element>
                    <Element name="about">
                      <AboutUs />
                    </Element>
                    <Element name="faqs">
                      <Faqs />
                    </Element>
                    <Element name="contact">
                      <ContactUs />
                    </Element>
                    <Element name="case-studies">
                      <CaseStudies />
                    </Element>
                  </>
                }
              />
              <Route
                path="/case-study-details/:id"
                element={<CaseStudiesDetails />}
              />
              <Route path="/product-details/:id" element={<ProductDetails />} />
              {/* <Route path="/product-master" element={<ProductMaster />} /> */}
            </Routes>
          </main>

          <Footer />
        </>
      </CaseStudiesProvider>

      {/* Contact Us Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "&:focus": {
            outline: "none",
          },
        }}
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
          {/* Close Button */}
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
            closeModal={closeModal}
            isDataForCustomisation={false}
          />
        </Box>
      </Modal>
    </Webcontext.Provider>
  );
};

export default CodingGranthaClientWeb;