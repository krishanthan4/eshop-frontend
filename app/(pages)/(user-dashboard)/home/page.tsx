"use client";

import { CarouselComponent } from "@/app/components/(home)/CarouselComponent";
import CategoryComponent from "@/app/components/(home)/CategoryComponent";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import HomeSortComponent from "@/app/components/(home)/HomeSortComponent";
import ProductComponent from "@/app/components/(home)/ProductComponent";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function page() {
  const [categories, setCategories] = useState<[]>([]);
  const [products, setProducts] = useState<[]>([]);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/Home', {
          method: "POST",
          headers: {
            "credentials": "include",
          },
        });
    
        if (response.ok) {
          const data = await response.json();
    
          if (data.success) {
            setCategories(data.categoryList);
            setProducts(data.productList);
            // console.log(data.productList[0].productImgs[0].imgPath);
          } else {
            toast.error("Something Went Wrong");
          }
        } else {
          console.error('HTTP error:', response.status);
        }
      } catch (e: any) {
        console.error('Fetch error:', e);
        toast.error("Something Went Wrong");
      }
    };
    
    getData();
  }, []);
  


  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  // if (!isLoggedIn) {
    // router.push("/signin");
  // } else {
    return (
      <div>
        <div className="flex flex-row justify-evenly">
          <HomeSortComponent />
          <CarouselComponent />
        </div>
        <CategoryComponent CategoryObject={categories}/>

        <section
          aria-="products-heading"
          className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8"
        >
          <p className="text-xl p-3">Just For You</p>
          <div className="-mx-px  gap-1 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-6">
            <ProductComponent ProductObject={products}/>
            {/*  */}
          </div>
        </section>
      </div>
    );
  // }
}
