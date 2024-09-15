"use client"; // Declare this as a client component

import ProductComponent from '@/app/components/(home)/ProductComponent';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation'; // Use useSearchParams to access query params in client components

export default function SearchPage() {
  const searchParams = useSearchParams(); // Get search params
  const text = searchParams.get('text'); // Get 'text' query parameter from the URL
  const [productList, setProductList] = useState([]);
let [NoProduct, setNoProduct] = useState(false);
  useEffect(() => {
    const getData = async () => {
      if (!text) return; // Ensure we have a search term

      try {
        const response = await fetch('/api/Search', {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set content-type to JSON
          },
          body: JSON.stringify({ text: text })
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.success) {
            setNoProduct(false);
            setProductList(data.productList);
          } else {
            setNoProduct(true);
          }
        } else {
          console.error('HTTP error:', response.status);
        }
      } catch (e) {
        console.error('Fetch error:', e);
        toast.error("Something Went Wrong");
      }
    };

    getData();
  }, [text]); // Re-run the effect if 'text' changes

  return (
     <> {/* <p className="text-xl mb-6 font-bold ">{text}</p> */}
   {NoProduct || text=="" ? <p className="text-xl mb-6 font-bold ">No Product Found</p> : (
    <div className="mx-6">
 
    <p className="text-sm text-gray-400 mb-6 mt-3 font-bold ">Search Result For {text}...</p>
       <div className="-mx-px gap-1 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-6">
       <ProductComponent ProductObject={productList} />
     </div>
    </div>
   )}</>
  );
}
