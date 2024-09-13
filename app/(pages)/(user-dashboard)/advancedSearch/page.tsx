"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import ProductComponent from "@/app/components/(home)/ProductComponent";
import Pagination, { paginate } from "@/app/components/Pagination";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Slider } from "@mui/material"; // Import a slider component

const filters = [
  {
    id: "SortBy",
    name: "Sort By",
    options: [
      { value: "Sort by Latest", label: "Sort by Latest" },
      { value: "Sort by Oldest", label: "Sort by Oldest" },
      { value: "Sort by Name", label: "Sort by Name" },
      { value: "Sort by Price", label: "Sort by Price" },
    ],
  },
];

export default function Page() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [products, setProducts] = useState<[]>([]);
  let [filterCategories, setFilterCategories] = useState(""); // Category filter state
  let [filterColor, setFilterColor] = useState(""); // Color filter state
  let [minPrice, setMinPrice] = useState(0); // Min price state
  let [maxPrice, setMaxPrice] = useState(20000); // Max price state
  let [selectedSort, setSelectedSort] = useState(""); // Sort state
  let [productsHave, setProductsHave] = useState(true);

  interface Category {
    catName: string;
    id: number;
  }

  const [categories, setCategories] = useState<Category[]>([]); // Category filter state
  interface Color {
    clrId: number;
    clrName: string;
  }

  const [color, setColor] = useState<Color[]>([]); // Category filter state

  const router = useRouter();
  const pageSize = 8;

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };
 
  const paginatedPosts = productsHave ? paginate(products, currentPage, pageSize) : [];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/GetAdvancedSearchDetails", {
          method: "POST",
          headers: {
            credentials: "include",
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (data.success) {
            setCategories(data.categoryList);
            setColor(data.colorList);
            setProducts(data.productList);
            // console.log(data.productList[0].productImgs[0].imgPath);
          } else {
            toast.error("Something Went Wrong");
          }
        } else {
          console.error("HTTP error:", response.status);
        }
      } catch (e: any) {
        console.error("Fetch error:", e);
        toast.error("Something Went Wrong");
      }
    };

    getData();
  }, []);

  const getData = async () => {
    // console.log(productsHave);
    try {
      // Use selected filter values
      let data = {
        category_name: filterCategories,
        price_range_start: minPrice,
        price_range_end: maxPrice,
        color_name: filterColor,
        sort_text: selectedSort,
      };
      // console.log(data);
      const response = await fetch("/api/AdvancedSearch", {
        method: "POST",
        headers: {
          credentials: "include",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          toast.success("Data Fetched");
          setProducts(data.productList);
          if (data.allProductCount == 0) {
            setProductsHave(false);
          } else {
            setProductsHave(true);
          }
        } else {
          toast.error("Something Went Wrong");
        }
      } else {
        console.error("HTTP error:", response.status);
      }
    } catch (e: any) {
      console.error("Fetch error:", e);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="">
      <div>
        <main className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
          <div className="pb-5">
            <h1 className="text-xl font-bold tracking-tight text-gray-200">
              Search Products
            </h1>
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <div className="hidden lg:block">
                <div className="w-full my-5">
                  <button
                    onClick={getData}
                    className="bg-gray-200 text-black font-bold py-2 px-3 rounded-md"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-gray-300 mx-5"
                  >
                    Reset
                  </button>
                </div>
                <div className="space-y-10 ">
                  {/* Add filters here */}
                  {/* Category filter */}
                  <div className="mt-6">
                    <p>Categories</p>
                    {categories.map((e) => (
                      <div className="flex my-2 items-center">
                        <input
                          type="radio"
                          value={e.catName}
                          onChange={(e) => setFilterCategories(e.target.value)} // Set selected sort
                          //  id={`${section.id}-${optionIdx}-mobile`}
                          name={"categoryFilterSet"}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          //  htmlFor={`${section.id}-${optionIdx}-mobile`}
                          className="ml-3 text-sm text-gray-500"
                        >
                          {e.catName}
                        </label>
                      </div>
                    ))}
                  </div>
                  {/* color filter */}
                  <div className="mt-6">
                    <p>Colors</p>
                    <div className="grid grid-cols-4">
                      {color.map((e) => (
                        <div
                          key={e.clrId}
                          className="my-2 mx-1 flex items-center"
                        >
                          <input
                            type="radio"
                            value={e.clrName}
                            onChange={(e) => setFilterColor(e.target.value)} // Set selected sort
                            id={`color-${e.clrId}`}
                            name="colorFilterSet"
                            className="hidden"
                          />
                          <label
                            htmlFor={`color-${e.clrId}`}
                            className={`flex items-center justify-center h-6 w-6 rounded-full cursor-pointer `}
                            style={{ backgroundColor: e.clrName }}
                          >
                            <input
                              type="radio"
                              value={e.clrId}
                              onChange={(e) => setFilterColor(e.target.value)} // Set selected sort
                              id={`color-${e.clrId}`}
                              name="colorFilterSet"
                              className="hidden"
                            />
                            <div
                              className={`w-4 h-4 rounded-full ${
                                Number(selectedSort) === e.clrId
                                  ? `border-2 border-${e.clrName}-800`
                                  : ""
                              }`}
                              style={{ backgroundColor: e.clrName }}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* price filter */}
                  <div className="mt-5">
                    <label className="text-sm font-medium text-gray-200">
                      Price Range
                    </label>
                    <Slider
                      value={[minPrice, maxPrice]}
                      onChange={(e: any, newValue: number | number[]) => {
                        setMinPrice(
                          Array.isArray(newValue) ? newValue[0] : newValue
                        );
                        setMaxPrice(
                          Array.isArray(newValue) ? newValue[1] : newValue
                        );
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={200000}
                    />
                    <div className="text-gray-400">
                      Min: {minPrice} - Max: {maxPrice}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Product grid */}
            <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
             
                {paginatedPosts.length > 0 ? (
           <div className="grid grid-cols-2 gap-6 my-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3">        <ProductComponent ProductObject={(productsHave ? paginatedPosts : products)} />    </div>
                ) : (
                  <div className="text-gray-200 ">
<div className="col-span-12 lg:col-span-9  flex justify-center items-center my-2 w-full h-full ">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="col-span-12 lg:col-span-6 flex justify-center">
            <img src="images/wishlist.svg" alt="" className="h-[290px] bg-center bg-contain bg-no-repeat my-2"/>
          </div>
          <div className="col-span-12 lg:col-span-6 text-center my-2 flex justify-center flex-col">
            <label className="text-xl font-semibold mt-2">No Products Found</label>
            <div className="lg:flex lg:justify-center mt-7">
            </div>
          </div>
        </div>
      </div>

                  </div>
                )}
          
              {productsHave ? (
                <Pagination
                  items={products.length} // Total items
                  currentPage={currentPage} // Current page
                  pageSize={pageSize} // Items per page
                  onPageChange={onPageChange} // Change page
                />
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
