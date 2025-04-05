import AOS from "aos";
import "aos/dist/aos.css";
import React, { useContext, useEffect, useState } from "react";
import { Webcontext } from "./CodingGranthaClientWeb";
import { Link } from "react-router-dom";

const Products = () => {
  const { categoriesWithDetails } = useContext(Webcontext);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      {/* Section Title */}
      <div
        className="flex items-center justify-center w-full py-8"
        data-aos="fade-up"
      >
        <div className="flex-grow h-px bg-gray-300"></div>
        <h1 className="px-4 text-2xl text-black font-bold">Products</h1>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <div className="relative w-full py-4">
        <div className="container mx-auto py-1">
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
            {categoriesWithDetails?.map((category) => (
              <Link
                to={`/product-details/${category.Id}`}
                state={{
                  id: category.Id,
                  categoryName: category["Category Name"],
                }}
              >
                <div
                  key={category.id}
                  className="relative flex flex-col items-center"
                  data-aos="zoom-in"
                >
                  {/* Background Gradient Box - Set to absolute */}
                  <div className="absolute top-36 left-0 w-full h-40 bg-[linear-gradient(180deg,#898887_0%,#3D3C3C_100%)] -z-10"></div>

                  {/* Image Box */}
                  <div className="relative w-[272px] h-[360px] sm:h-[400px] md:h-[420px] rounded-lg overflow-hidden">
                    {!loadedImages[category.id] && (
                      <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg"></div>
                    )}
                    <img
                      src={category.imageUrl}
                      alt={category["Category Name"]}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        loadedImages[category.id] ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(category.id)}
                      style={{
                        clipPath:
                          "polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)",
                      }}
                    />
                  </div>

                  {/* Category Name */}
                  <h2
                    className="mt-2 text-xl font-semibold text-center text-black"
                    data-aos="fade-up"
                  >
                    {category["Category Name"]}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
