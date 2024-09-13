interface types {
  ProductObject: Array<{
    productImgs?: Array<{ imgPath: string }>; 
    id: number; 
    title: string; 
    price: number; 
  }>;
}

export default function ProductComponent({ ProductObject }: types) {
  return (
    <>
      {ProductObject.map((e) => (
        <div key={e.id} className="group flex flex-col justify-between relative p-2 border rounded-md border-[#1d1e20] bg-[#26282bee] sm:p-6">
          <div className="rounded-lg overflow-hidden aspect-w-1 aspect-h-1 group-hover:opacity-75">
            <img 
              src={
                e.productImgs && e.productImgs.length > 0 
                ? "/images/" + e.productImgs[0].imgPath 
                : ""  // Fallback image if no productImgs
              }
              alt={e.title}
              className="w-full min-h-40 min-w-40 max-w-50 max-h-50 h-full object-center object-cover"
            />
          </div>
          <div className="pt-10 pb-4 aspect-w-1 aspect-h-1 max-h-40 min-h-20 text-center">
            <h3 className="text-sm font-medium text-gray-400">
              <a href={"/singleProduct/" + e.id}>
                <span aria-hidden="true" className="absolute inset-0"></span>
                {e.title}
              </a>
            </h3>
            <div className="mt-3 flex flex-col items-center">
              <p className="mt-4 text-base font-medium text-gray-400">Rs. {e.price}.00</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
