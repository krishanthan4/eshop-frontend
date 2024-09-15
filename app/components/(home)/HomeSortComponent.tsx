"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import {sortCategoryData} from "@/app/components/Objects";

interface Category {
  categoryId: number;
  categoryName: string;
  categoryIcon: string;
  models: Model[];
}

interface Model {
  modelId: number;
  modelName: string;
  products: Product[];
}

interface Product {
  id: number;
  title: string;
}

interface HomeSortComponentProps {
  sortCategoryData: Category[];
}

export default function HomeSortComponent({ sortCategoryData }: HomeSortComponentProps) {
  console.log("check", sortCategoryData);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeModel, setActiveModel] = useState<number | null>(null);

  const categoryDivRef = useRef<HTMLDivElement>(null);

  const handleMouseEnterCategory = (categoryId: number) => {
    setActiveCategory(categoryId);
    setActiveModel(null);
  };

  const handleMouseEnterModel = (modelId: number) => {
    setActiveModel(modelId);
  };

  // Handle clicks outside the category div
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDivRef.current &&
        !categoryDivRef.current.contains(event.target as Node)
      ) {
        // If the click happens outside, reset the model and category
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
    className="w-[28%] sm:flex hidden  items-center mx-2 h-fit py-10 text-gray-300 bg-[#26282bf8] border border-[#1d1e20] shadow-md rounded-md"
    ref={categoryDivRef}
  >
    <ul className="ms-4 text-gray-600 w-full">
      {sortCategoryData?.length ? (
        sortCategoryData.map((category) => (
          category.categoryId && category.categoryIcon && category.categoryName ? (
            <li
              key={category.categoryId}
              className="hover:text-orange-600 cursor-pointer py-2 text-gray-400 flex items-center"
              onMouseEnter={() => handleMouseEnterCategory(category.categoryId)}
            >
              <img
                src={`images/${category.categoryIcon}`}
                className="w-4 h-4 me-1"
                alt={category.categoryName}
              />
              {category.categoryName}
              {category.categoryId === activeCategory && (
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
          ) : null
        ))
      ) : (
        <li className="text-gray-400 py-2">No categories available</li>
      )}
    </ul>
  
    {/* Sub menu for models */}
    {activeCategory && (
      <ul className="mx-2 min-w-20 ms-[28%] absolute z-40 bg-[#26282bee] text-gray-400 border border-[#1d1e20] shadow-md rounded-md">
        {sortCategoryData?.find((category) => category.categoryId === activeCategory)?.models?.length ? (
          sortCategoryData
            .find((category) => category.categoryId === activeCategory)
            ?.models.map((model) => (
              model.modelId && model.modelName ? (
                <li
                  key={model.modelId}
                  className="text-gray-400 py-2 cursor-pointer px-3 hover:text-orange-500 flex items-center"
                  onMouseEnter={() => handleMouseEnterModel(model.modelId)}
                >
              <Link href={"/search?text="+model.modelName}>
              {model.modelName}
                  {model.modelId === activeModel && (
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
              </Link>
                </li>
              ) : null
            ))
        ) : (
          // <li className="text-gray-400 py-2">No models available</li>
          ''
        )}
      </ul>
    )}
  
    {/* Sub menu for products */}
    {activeModel && (
      <ul className="mx-2 ms-[38%] absolute z-40 bg-[#26282bee] text-gray-400 border border-[#1d1e20] shadow-md rounded-md">
        {sortCategoryData
          ?.find((category) => category.categoryId === activeCategory)
          ?.models.find((model) => model.modelId === activeModel)
          ?.products?.length ? (
          sortCategoryData
            .find((category) => category.categoryId === activeCategory)
            ?.models.find((model) => model.modelId === activeModel)
            ?.products.map((product) => (
              product.id && product.title ? (
                <li
                  key={product.id}
                  className="text-gray-400 py-2 cursor-pointer px-3 hover:text-orange-500 flex items-center"
                >
                <Link href={"/singleProduct/"+product.id}>{product.title}</Link>
                </li>
              ) : null
            ))
        ) : (
          // <li className="text-gray-400 py-2">No products available</li>
          ''
        )}
      </ul>
    )}
  </div>
  
  );
}
