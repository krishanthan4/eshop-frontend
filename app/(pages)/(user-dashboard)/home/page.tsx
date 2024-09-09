"use client";

import { CarouselComponent } from "@/app/components/(home)/CarouselComponent";
import CategoryComponent from "@/app/components/(home)/CategoryComponent";
import { categories } from "@/app/components/Objects";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import HomeSortComponent from "@/app/components/(home)/HomeSortComponent";
import ProductComponent from "@/app/components/(home)/ProductComponent";
import { useEffect } from "react";
import { toast } from "sonner";

export default function page() {
  // const { token } = useAuthStore();
  const {logout} = useAuthStore();
  useEffect( () => {
const fetchData= async ()=>{
  try {
    const response = await fetch('/api/Home', {
      method: "POST",
      headers: {
        // "Authorization": "Bearer " + token,
        "credentials": "include"
      },
    });
    if (response.ok) {
      const data = await response.json();
console.log(data);
    
    } else {
      logout();
    }
  } catch (e) {
    // Handle fetch error
    toast.error("An error occurred: ");
  }
}
// preventDefault();

fetchData();
  }, 
  
  []);


  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  if (!isLoggedIn) {
    router.push("/signin");
  } else {
    return (
      <div>
        <div className="flex flex-row justify-evenly">
          <HomeSortComponent />
          <CarouselComponent />
        </div>
        <CategoryComponent CategoryObject={categories} />

        <section
          aria-="products-heading"
          className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8"
        >
          <p className="text-xl p-3">Just For You</p>
          <div className="-mx-px  gap-1 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-6">
            <ProductComponent />
            {/*  */}
          </div>
        </section>
      </div>
    );
  }
}
