"use client";

import { CarouselComponent } from "@/app/components/(home)/CarouselComponent";
import CategoryComponent from "@/app/components/(home)/CategoryComponent";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import HomeSortComponent from "@/app/components/(home)/HomeSortComponent";
import ProductComponent from "@/app/components/(home)/ProductComponent";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import Pagination, { paginate } from "@/app/components/Pagination";
import { useCategoryStore } from "@/store/useCategoryStore";


export default function page() {
  const [categories, setCategories] = useState<{ catName: string, catImg: string }[]>([]);
  const [products, setProducts] = useState<[]>([]);
  let [filterSort, setFilterSort] = useState<[]>([]);

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
            // Map categoryList to match CategoryComponent expected format
            const mappedCategories = data.categoryList.map((category: any) => ({
              catName: category.categoryName,
              catImg: category.categoryImg,
            }));
            setFilterSort(data.categoryList); 
            setCategories(mappedCategories); // Set the mapped categories
            setProducts(data.productList); // Set product list as needed
            // console.log(data); // Debugging purpose
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

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
 
  const onPageChange = (page:any) => {
    setCurrentPage(page);
  };
  const paginatedPosts = paginate(products, currentPage, pageSize);

    return (
      <div>
        <div className="flex flex-row justify-evenly">
        <HomeSortComponent sortCategoryData={filterSort} />
        {/* <HomeSortComponent /> */}
        <CarouselComponent />
        </div>
   <Suspense fallback={<p>Loading Categories ...</p>}>
   <CategoryComponent CategoryObject={categories}/>
      </Suspense>
        <section
          aria-="products-heading"
          className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8"
        >
          <p className="text-xl p-3">Just For You</p>
          <div className="-mx-px  gap-1 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-6">
            <Suspense fallback={<p>Loading Posts ...</p>}>
            <ProductComponent ProductObject={paginatedPosts}/>
      </Suspense>
            {/*  */}
          </div>
          <Pagination
       items={products.length} // 100
       currentPage={currentPage} // 1
       pageSize={pageSize} // 10
       onPageChange={onPageChange}
        />
        </section>
      </div>
    );
  // }
}
