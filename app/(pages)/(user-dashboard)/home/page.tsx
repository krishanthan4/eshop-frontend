"use client";

import CategoryComponent from "@/app/components/(home)/CategoryComponent";
// import CarouselCompeonent from "@/app/components/(home)/CarouselComponent"; 
import {categories} from "@/app/components/Objects";

export default function page() {
  return (
    <div>
{/* <CarouselComponent/> */}
        <CategoryComponent CategoryObject={categories}/>
        </div>
  )
}
