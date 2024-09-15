import Link from "next/link";

interface types{
    title: string;
    object: Array<{ product_id: number; title: string; img_path: string }>;
    useStateVariable: boolean;
    toggleFunction: () => void;
}

export default function NavFlyoutMenuComponent({title, object, useStateVariable, toggleFunction}:types) {
  return (
    <div className="flex">
    <div className="relative flex">
      <button
        type="button"
        className=" hover:text-white text-gray-300 relative z-10 flex items-center justify-center transition-colors ease-out duration-200 text-sm font-medium"
        aria-expanded="false"
        onClick={toggleFunction}
      >
        {title}
        <span
          className="absolute bottom-0 inset-x-0 h-0.5 transition-colors ease-out duration-200 sm:mt-5 sm:transform sm:translate-y-px"
          aria-hidden="true"
        ></span>
      </button>
    </div>
    <div
      className={`absolute  top-full inset-x-0 bg-[#242529] text-sm text-gray-100 ${useStateVariable ? 'hidden': ''}`}
      id="flyoutMenuWeight"
    >
      <div className="relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-6 gap-y-10 gap-x-8 py-16">

{object.map((e) => (
<div className="group relative">
<div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
<img
src={e.img_path}
alt={e.title}
className={"object-center object-cover min-h-[10rem]"}
/>
</div>
<Link
href={"singleProduct/"+e.product_id}
className="mt-4 block font-medium text-gray-100"
>
<span
className="absolute z-10 inset-0"
aria-hidden="true"
></span>
</Link>
<p aria-hidden="true" className="mt-1">
Shop now
</p>
</div>
))}
          

          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
