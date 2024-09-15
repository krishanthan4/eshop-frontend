"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import RelatedProducts from "@/app/components/RelatedProducts";

// Define types for nested objects
interface Category {
  id: number;
  catName: string;
  catImg: string;
  catIcon: string;
}

interface Color {
  clrId: number;
  clrName: string;
}

interface Model {
  id: number;
  modelName: string;
  categoryCatId: Category;
}

interface Condition {
  id: number;
  name: string;
}

interface Status {
  id: number;
  status: string;
}

interface UserEmail {
  email: string;
  password: string;
  joinedDate: string;
  statusStatus: Status;
  verificationCode: string;
}

interface Product {
  images: any;
  imagePath: string | undefined;
  id: number;
  title: string;
  price: number;
  qty: number;
  description: string;
  datetimeAdded: string;
  deliveryFee: number;
  model: Model;
  color: Color;
  condition: Condition;
  status: Status;
  userEmail: UserEmail;
}

interface Props {
  params: {
    id: string; // id should be a string to handle dynamic routing
  };
}

const policies = [
  {
    name: "International delivery",
    icon: GlobeAmericasIcon,
    description: "Get your order in 2 years",
  },
  {
    name: "Loyalty rewards",
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Page({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  let [selectedQty, setSelectedQty] = useState(1);
  const router = useRouter();

  useEffect(() => {
    // Validate if `params.id` is a number
    const id = params.id;
    const isNumber = /^\d+$/.test(id); // Regex to check if the ID is a number

    if (!isNumber) {
      // If not a number, redirect to /home
      router.push("/home");
      return; // Early return to avoid further processing
    }

    const getData = async () => {
      try {
        const response = await fetch("/api/GetProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Correct header for JSON
            credentials: "include",
          },
          body: JSON.stringify({ productId: parseInt(params.id) }), // Ensure the ID is sent as an integer
        });

        if (response.ok) {
          const data = await response.json();

          if (data.success) {
            setProduct(data.product);
            // console.log(data.product.images.imgPath.imgPath);
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
  }, [params.id, router]);

  async function addToCart() {
    try {
      let data = {
        productId: product?.id,
        qty: selectedQty,
      };

      const response = await fetch("/api/AddToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Correct header for JSON
          credentials: "include",
        },
        body: JSON.stringify(data), // Ensure the ID is sent as an integer
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          toast.success(data.content);
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
  }

  return (
    <div className="">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
              <h1
  id="product_title"
  className="text-xl font-medium text-gray-200"
>
  {product?.title && product.title.length > 30 
    ? product.title.substring(0, 30) + '...' 
    : product?.title}
</h1>

                <p
                  id="product_price"
                  className="text-xl font-medium text-gray-200"
                >
                  Rs.{product?.price}.00
                </p>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <div className="grid grid-cols-2 mx-auto">
                <div className="bg-[#2b2d30a4] mb-4 h-fit p-4 rounded-md">
                  {product?.images && (
                    <img
                      key={product.id}
                      alt={product.title}
                      src={"/images/" + product.images.imgPath.imgPath}
                      className="w-full rounded-md"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              <div>
                {/* Color picker */}
                <div>
                  <h2 className="text-sm font-medium text-gray-200">Color</h2>
                  <fieldset aria-label="Choose a color" className="mt-2">
                    <div
                      className={`bg-${product?.color.clrName}-500 rounded-full w-5 h-5 border border-${product?.color.clrName}-500`}
                    ></div>
                  </fieldset>
                </div>

<p className={`text-xs my-3 ms-5 ${product?.qty && product.qty > 0 ? 'bg-green-900/50' : 'bg-red-900/50'} text-gray-400 w-fit p-1 px-2 rounded-lg`}>{product?.qty && product.qty > 0 ? 'In Stock' : 'Out Of Stock'}</p>

{/* <div><p>Available Quantity : {product?.qty}</p></div> */}
                <div className="flex justify-between max-w-60 my-4 items-center">
                  <label className="block mb-1 text-gray-500">
                    Choose quantity:
                  </label>
                  <div className="relative flex items-center">
                    {/* Decrement Button */}
                    <button
                      onClick={() => {
                        setSelectedQty((prevQty) => Math.max(prevQty - 1, 1));
                      }}
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="counter-input"
                      className={`${
                        selectedQty <= 1 ? "disabled" : ""
                      } flex-shrink-0 bg-[#3a3d41] hover:bg-[#28292c] inline-flex items-center justify-center rounded-md h-6 w-6`}
                      disabled={selectedQty <= 1} // Disable button if selectedQty is less than or equal to 1
                    >
                      <svg
                        className="w-2.5 h-2.5 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>

                    {/* Quantity Input */}
                    <input
                      type="text"
                      id="counter-input"
                      data-input-counter
                      data-input-counter-min="1"
                      data-input-counter-max={product?.qty}
                      className="flex-shrink-0 text-gray-400 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                      placeholder=""
                      value={selectedQty}
                      readOnly
                      required
                    />

                    {/* Increment Button */}
                    <button
                      onClick={() => {
                        setSelectedQty((prevQty) =>
                          Math.min(prevQty + 1, product?.qty || 0)
                        );
                      }}
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="counter-input"
                      className={`${
                        selectedQty >= (product?.qty || 0) ? "disabled" : ""
                      } flex-shrink-0 bg-[#3a3d41] hover:bg-[#28292c] inline-flex items-center justify-center rounded-md h-6 w-6`}
                      disabled={selectedQty >= (product?.qty || 0)} // Disable button if selectedQty is greater than or equal to product.qty
                    >
                      <svg
                        className="w-2.5 h-2.5 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <button
                  onClick={addToCart} disabled={(product?.qty ?? 0) <= 0}
                  className={`mt-8 ${(product?.qty ==0 ? ' cursor-not-allowed opacity-15' : '')} flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  Add to cart
                </button>
              </div>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-200">
                  Description
                </h2>
                <div className="prose prose-sm mt-4 text-gray-500" />
                {product?.description}
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className="rounded-lg bg-[#222427] p-6 text-center"
                    >
                      <dt>
                        <policy.icon
                          aria-hidden="true"
                          className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                        />
                        <span className="mt-4 text-sm font-medium">
                          {policy.name}
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts />
    </div>
  );
}
