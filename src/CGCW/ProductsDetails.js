
import { useState, useEffect, useCallback } from "react";
import apiInstance from "../http_config";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaClock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactUs from "./ContactUs";
import { Modal, Box, IconButton } from "../node_modules/@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonHoverButton from "./CommonHoverButton";
import { useSwipeable } from "react-swipeable";

const ProductDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [allProductImages, setAllProductImages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const location = useLocation();
  const { id, categoryName } = location.state || {};
  const navigate = useNavigate();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Swipe handlers for small devices
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (selectedImageIndex < productImages.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (selectedImageIndex > 0) {
        setSelectedImageIndex(selectedImageIndex - 1);
      }
    },
    trackMouse: true,
  });

  // Initial load effect (triggered by id change)
  useEffect(() => {
    scrollTop();
    AOS.init({ duration: 1000, once: true });

    if (!id) {
      // If id is undefined, redirect to /#products
      navigate("/#products");
      return;
    }

    fetchProductDetails(id, 0);
  }, [id]);

  // Pagination effect (triggered by page change)
  useEffect(() => {
    if (id && page > 0) {
      fetchMoreProductDetails(id, page);
    }
  }, [page]);

  const fetchProductDetails = async (id, page) => {
    setIsLoading(true);
    try {
      const response = await apiInstance.post(
        "/publicApi/getProductsByCategoryId",
        { id, page, size: 9 }
      );
      if (response.data?.statusCode === 200) {
        const newProducts = response.data.result;
        setAllProducts(newProducts);
        if (newProducts.length > 0) {
          const defaultSelectedProduct = newProducts[0];
          setSelectedProduct(defaultSelectedProduct);
          await fetchAllProductImages(defaultSelectedProduct);
        }
        setHasMore(newProducts.length === 9);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreProductDetails = async (id, page) => {
    setIsLoadingMore(true);
    try {
      const response = await apiInstance.post(
        "/publicApi/getProductsByCategoryId",
        { id, page, size: 9 }
      );
      if (response.data?.statusCode === 200) {
        const newProducts = response.data.result;
        setAllProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setHasMore(newProducts.length === 9);
      }
    } catch (error) {
      console.error("Error fetching more product details:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const fetchAllProductImages = async (product) => {
    const colors = JSON.parse(product.productcolours);
    const allImages = {};

    for (const color of colors) {
      const images = color.productBase64;
      allImages[color.colourCode] = images;

      // Preload images
      images.forEach((image) => {
        const img = new Image();
        img.src = `${apiInstance.defaults.baseURL}/publicApi/getImages/${image}`;
      });
    }

    setAllProductImages(allImages);
    setSelectedColor(colors[0]);
    setProductImages(allImages[colors[0].colourCode]);
    setSelectedImageIndex(0); // Reset selected image index when product changes
  };

  const handleColorSelect = async (color) => {
    setIsImageLoading(true);
    setSelectedColor(color);
    setProductImages(allProductImages[color.colourCode]);
    setSelectedImageIndex(0); // Reset selected image index when color changes

    // Simulate loading delay (optional, for testing)
    await new Promise((resolve) => setTimeout(resolve, 500)); // Remove this in production
    setIsImageLoading(false);
  };

  const handleLoadMore = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const scrollY = window.scrollY;
    setPage((prevPage) => prevPage + 1);

    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 0);
  }, []);

  const handleSelectProduct = async (product) => {
    setSelectedProduct(product);
    await fetchAllProductImages(product);
    scrollTop();
  };

  const handleEnquireNow = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index); // Update the selected image index
  };

  // Skeleton Loader
  const renderSkeletonLoader = () => (
    <div className="container mx-auto p-4 md:p-6">
      <div className="animate-pulse">
        {/* Back Button and Title Skeleton */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute left-0 p-2 rounded-full bg-gray-300 h-10 w-10"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>

        {/* Product Detail Section Skeleton */}
        <div className="p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
          {/* Image Section Skeleton */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-full h-60 lg:h-96 bg-gray-300 rounded-lg"></div>
            <div className="flex space-x-2 mt-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-gray-300 rounded-full"
                ></div>
              ))}
            </div>
          </div>

          {/* Details Section Skeleton */}
          <div className="md:w-2/3">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
          </div>
        </div>

        {/* All Products Section Skeleton */}
        <div className="mt-10">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-md"
              >
                <div className="w-full h-48 md:h-64 bg-gray-300"></div>
                <div className="text-center p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // If id is undefined, show skeleton loader until redirect happens
  if (!id) {
    return renderSkeletonLoader();
  }

  // If products are empty and API call is completed, show "Coming Soon"
  if (!isLoading && allProducts.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[50vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FaClock className="text-6xl text-gray-600 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Coming Soon ...
        </h2>
        <p className="text-xl text-gray-600">Stay Tuned</p>
      </motion.div>
    );
  }

  // Show skeleton loader while API call is in progress
  if (isLoading) {
    return renderSkeletonLoader();
  }

  // Render the actual product details
  return (
    <div className="container mx-auto p-4 md:p-6">
            {allProducts?.length > 0 ? (
        <>
          {/* Back Button and Title */}
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
              className="text-3xl md:text-4xl font-bold text-gray-800"
            >
              {categoryName}
            </motion.h1>
          </motion.div>

          {/* Product Detail Section */}
          <motion.div
            className="p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6"
            style={{
              background:
                "linear-gradient(0deg, rgba(255, 255, 255, 0.8) 50.4%,rgb(255, 255, 255) 94.92%)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Image Section */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="w-full h-60 lg:h-96 relative" {...swipeHandlers}>
                {isImageLoading ? (
                  <div className="w-full h-full bg-gray-300 rounded-lg animate-pulse"></div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImageIndex}
                      src={`${apiInstance.defaults.baseURL}/publicApi/getImages/${productImages[selectedImageIndex]}`}
                      alt="Product"
                      className="w-full h-full object-contain rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      onLoad={() => setIsImageLoading(false)}
                      onError={() => setIsImageLoading(false)}
                    />
                  </AnimatePresence>
                )}
              </div>

              {/* Thumbnail Section */}
              <div className="flex space-x-2 mt-4">
                {productImages.map((img, index) => (
                  <span
                    key={index}
                    className={`py-1 w-2 h-2 rounded-full cursor-pointer hover:bg-slate-600 transition-colors ${
                      index === selectedImageIndex ? "bg-black" : "bg-slate-500"
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  ></span>
                ))}
              </div>

              {/* Color Selection */}
              <div className="mt-4 w-full lg:hidden">
                <div className="flex space-x-3 overflow-x-auto items-center justify-center">
                  {selectedProduct &&
                    JSON.parse(selectedProduct.productcolours).map(
                      (color, index) => (
                        <motion.button
                          key={index}
                          className={`rounded-full border-2 flex-shrink-0 ${
                            selectedColor?.colourCode === color.colourCode
                              ? "border-black w-5 h-5"
                              : "border-gray-300 w-4 h-4"
                          }`}
                          style={{ backgroundColor: color.colourCode }}
                          onClick={() => handleColorSelect(color)}
                        />
                      )
                    )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <motion.div
              className="md:w-2/3 text-black"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {selectedProduct.productname}
              </h2>
              <p className="text-gray-600 mb-4">
                {selectedProduct.productdescription}
              </p>
              <h3 className="text-lg font-semibold">Material:</h3>
              <ul className="list-disc pl-5 text-gray-600 mb-4">
                {JSON.parse(selectedProduct.productmaterial).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>

              <h3 className="text-lg font-semibold">Dimensions:</h3>
              <ul className="list-disc pl-5 text-gray-600 mb-4">
                {JSON.parse(selectedProduct.dimensions).map((dim, index) => (
                  <li key={index}>
                    <strong>{dim.dimensionsName}:</strong> {dim.dimensionValues}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold">Key Features:</h3>
              <p className="list-disc pl-1 text-gray-600 mb-4">
                {JSON.parse(selectedProduct.keyfeatures).map(
                  (feature, index) => (
                    <li key={index}>
                      <strong>{feature.keyFeature}:</strong>{" "}
                      {feature.featureDescription}
                    </li>
                  )
                )}
              </p>

              <h3 className="text-lg font-semibold lg:flex hidden">Colors:</h3>
              <div className="lg:flex hidden space-x-3 mt-2 overflow-x-auto">
                {JSON.parse(selectedProduct.productcolours).map(
                  (color, index) => (
                    <motion.button
                      key={index}
                      className={`rounded-full border-2 flex-shrink-0 ${
                        selectedColor?.colourCode === color.colourCode
                          ? "border-black w-5 h-5"
                          : "border-gray-300 w-4 h-4"
                      }`}
                      style={{ backgroundColor: color.colourCode }}
                      onClick={() => handleColorSelect(color)}
                    />
                  )
                )}
              </div>

              <motion.button
                className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                onClick={handleEnquireNow}
              >
                Enquire Now
              </motion.button>
            </motion.div>
          </motion.div>

          {/* All Products Section */}
          <h2 className="text-2xl font-bold mt-10 mb-4">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {allProducts.map((product, index) => {
              const colors = JSON.parse(product.productcolours);
              const firstColorImages = colors[0]?.productBase64 || [];
              const firstImage = firstColorImages[0];

              return (
                <motion.div
                  key={index}
                  className="border rounded-lg overflow-hidden shadow-md cursor-pointer hover:border-black"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  onClick={() => handleSelectProduct(product)}
                >
                  <img
                    src={`${apiInstance.defaults.baseURL}/publicApi/getImages/${firstImage}`}
                    alt={`Product ${index}`}
                    className="w-full h-48 md:h-64 object-cover"
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                  />
                  <h3 className="text-center p-4 font-semibold">
                    {product.productname}
                  </h3>
                </motion.div>
              );
            })}

            {isLoadingMore &&
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="border rounded-lg overflow-hidden shadow-md"
                  data-aos="fade-up"
                >
                  <div className="w-full h-48 md:h-64 bg-gray-300 animate-pulse"></div>
                  <div className="text-center p-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-6" data-aos="fade-up">
            <CommonHoverButton
              label={
                hasMore
                  ? isLoadingMore
                    ? "Loading..."
                    : "Load More"
                  : "And Many More..."
              }
              onClick={handleLoadMore}
              type={"button"}
              disabled={!hasMore}
            />
          </div>

          {/* Modal for ContactUs Page */}
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
                isDataFromProduct={true}
                productId={selectedProduct?.id}
                productName={selectedProduct?.productname}
                closeModal={closeModal}
                isDataForCustomisation={false}
              />
            </Box>
          </Modal>
        </>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center min-h-[50vh]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaClock className="text-6xl text-gray-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Coming Soon ...
          </h2>
          <p className="text-xl text-gray-600">Stay Tuned</p>
        </motion.div>
      )}
    </div>
  );
};

export default ProductDetails;