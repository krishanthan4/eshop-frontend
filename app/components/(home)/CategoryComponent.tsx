
interface types{
    CategoryObject: Array<{ catName: string; catImg: string }>;
}

export default function CategoryComponent({CategoryObject} : types) {
 
  return (
    <section aria-labelledby="products-heading" className="max-w-2xl mx-auto pt-12 pb-16 px-4 sm:pt-16 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8 bg-[#1d1e20]">
        <h2 id="products-heading" className="text-xl text-gray-200 p-3">Categories</h2>

        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 gap-x-6 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-8">

{CategoryObject.map((e)=>(
    <a href={"/search/"+e.catName} className="group">
            <div className="w-full aspect-w-1 aspect-h-1 bg-[#1d1e20] rounded-2xl overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img draggable={false} src={"/images/"+e.catImg} alt={e.catName} className="w-full min-h-[8rem] object-center object-cover group-hover:opacity-75"/>
            </div>
            <h3 className="mt-4 text-sm text-gray-400 text-center">{e.catName}</h3>
          </a>
))}
        </div>
      </section>

  )
}
