"use client";
import { useEffect, useRef, useState } from "react";
import {sortCategoryData} from "@/app/components/Objects";



export default function HomeSortComponent() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeBrand, setActiveBrand] = useState<number | null>(null);
  const [activeModel, setActiveModel] = useState<number | null>(null);
  
  const categoryDivRef = useRef<HTMLDivElement>(null);

  const handleMouseEnterCategory = (cat_id: number) => {
    setActiveCategory(cat_id);
    setActiveBrand(null);
    setActiveModel(null);
  };

  const handleMouseEnterBrand = (brand_id: number) => {
    setActiveBrand(brand_id);
    setActiveModel(null);
  };

  const handleMouseEnterModel = (model_id: number) => {
    setActiveModel(model_id);
  };

  // Handle clicks outside the category div
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDivRef.current &&
        !categoryDivRef.current.contains(event.target as Node)
      ) {
        // If the click happens outside, reset the brand and model
        setActiveBrand(null);
        setActiveModel(null);
        setActiveCategory(null);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-[28%] flex items-center mx-2 h-fit py-10 text-gray-300 bg-[#26282bf8] border border-[#1d1e20] shadow-md rounded-md"
      ref={categoryDivRef}
    >
      <ul className="ms-4 text-gray-600 w-full">
        {sortCategoryData.map((category) => (
          <li
            key={category.cat_id}
            className="hover:text-orange-600 cursor-pointer py-2 text-gray-400 flex items-center"
            onMouseEnter={() => handleMouseEnterCategory(category.cat_id)}
          >
            <img
              src={`/images/sort_icons/${category.cat_icon}`}
              className="w-4 h-4 me-1"
              alt={category.cat_name}
            />
            {category.cat_name}
            {category.cat_id === activeCategory && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 ms-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </li>
        ))}
      </ul>

      {/* Sub menu for brands */}
      {activeCategory && (
        <ul className="mx-2 min-w-20 ms-[28%] absolute z-40 bg-[#26282bee] text-gray-400 border border-[#1d1e20] shadow-md rounded-md">
          {sortCategoryData
            .find((category) => category.cat_id === activeCategory)
            ?.brands.map((brand) => (
              <li
                key={brand.brand_id}
                className="text-gray-400 py-2 cursor-pointer px-3 hover:text-orange-500 flex items-center"
                onMouseEnter={() => handleMouseEnterBrand(brand.brand_id)}
              >
                {brand.brand_name}
                {brand.brand_id === activeBrand && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 ms-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                )}
              </li>
            ))}
        </ul>
      )}

      {/* Sub menu for models */}
      {activeBrand && (
        <ul className="mx-2 min-w-20 ms-[38%] absolute z-40 bg-[#26282bee] text-gray-400 border border-[#1d1e20] shadow-md rounded-md">
          {sortCategoryData
            .find((category) => category.cat_id === activeCategory)
            ?.brands.find((brand) => brand.brand_id === activeBrand)
            ?.models.map((model) => (
              <li
                key={model.model_id}
                className="text-gray-400 py-2 cursor-pointer px-3 hover:text-orange-500 flex items-center"
                onMouseEnter={() => handleMouseEnterModel(model.model_id)}
              >
                {model.model_name}
                {model.model_id === activeModel && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 ms-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                )}
              </li>
            ))}
        </ul>
      )}

      {/* Sub menu for products */}
      {activeModel && (
        <ul className="mx-2 ms-[48%] absolute z-40 bg-[#26282bee] text-gray-400 border border-[#1d1e20] shadow-md rounded-md">
          {sortCategoryData
            .find((category) => category.cat_id === activeCategory)
            ?.brands.find((brand) => brand.brand_id === activeBrand)
            ?.models.find((model) => model.model_id === activeModel)
            ?.products.map((product) => (
              <li
                key={product.id}
                className="text-gray-400 py-2 cursor-pointer px-3 hover:text-orange-500 flex items-center"
              >
                {product.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
