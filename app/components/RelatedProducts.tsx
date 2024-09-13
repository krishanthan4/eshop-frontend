import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductComponent from "./(home)/ProductComponent";

export default function RelatedProducts() {
const [productList, setProductList] = useState([]);
    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch('/api/RelatedProducts', {
              method: "POST",
              headers: {
                "credentials": "include",
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              if (data.success) {
                setProductList(data.productList);
              } else {
                toast.error("Something Went Wrong");
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
      }, []);
  return (
    <div className="mx-6"><p className="text-xl mb-6 font-bold ">Explore More </p>

<div className="-mx-px  gap-1 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-6"><ProductComponent ProductObject={productList}/></div>

    </div>
  )
}
