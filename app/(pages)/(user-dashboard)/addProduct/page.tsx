"use client";
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, use, useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function page() {
  const {isLoggedIn} = useAuthStore();
  const router = useRouter();
  interface Category {
    id: number;
    catName: string;
  }
  interface Color {
    clrId: number;
    clrName: string;
  }
  interface Model {
    id: number;
    modelName: string;
  }
  const [category,setCategory] = useState<Category[]>([]);
  const [model,setModel] = useState<Model[]>([]);
  const [color,setColor] = useState<Color[]>([]);
const [title,setTitle]= useState<string>("");
const [selectedModel,setSelectedModel]= useState<string>("");
const [selectedColor,setSelectedColor]= useState<string>("");
const [quantity,setQuantity]= useState<string>("");
const [price,setPrice]= useState<string>("");
const [description,setDescription]= useState<string>("");
const [selectedCondition, setSelectedCondition] = useState<string>('');


const [images, setImages] = useState<(File | string)[]>([
  "https://static.thenounproject.com/png/3407390-200.png",
  "https://static.thenounproject.com/png/3407390-200.png",
  "https://static.thenounproject.com/png/3407390-200.png",
]);

  // Handler to update the state when a radio button is selected
  const handleConditionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCondition(e.target.value);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileCount = files.length;

      if (fileCount !== 3) {
        toast.error("Please select exactly 3 images.");
        return;
      }

      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
      const newImages: (File | string)[] = [];
      for (let i = 0; i < fileCount; i++) {
        const file = files[i];
        if (!validImageTypes.includes(file.type)) {
          toast.error(`File "${file.name}" is not an image. Please select only image files.`);
          return;
        }
        newImages.push(file);
      }
      setImages(newImages);
    }
  };


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/AddProductDetails', {
          method: "POST",
          headers: {
            "credentials": "include",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
            setCategory(data.categoryList);
            setModel(data.modelList);
            setColor(data.colorList);

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
  const AddProducts = async () => {
    const form = new FormData();
    form.append('modelId', selectedModel);
    form.append('title', title);
    form.append('description', description);
    form.append('colorId', selectedColor);
    form.append('conditionId', selectedCondition);
    form.append('price', price);
    form.append('quantity', quantity);
  
    images.forEach((image, index) => {
      if (image instanceof File) {
        form.append(`image${index + 1}`, image);
      }
    });
  
    try {
      const response = await fetch('/api/AddProduct', {
        method: 'POST',
        body: form,
      });
  
      const data = await response.json(); // Ensure you parse the response
  
      if (response.ok) {
        // Handle success case
        if (data.success) {
          toast.success(data.content);  // Show success toast
          const resetForm = () => {
            setTitle("");
            setSelectedModel("");
            setSelectedColor("");
            setQuantity("");
            setPrice("");
            setDescription("");
            setSelectedCondition("");
            setImages([
              "https://static.thenounproject.com/png/3407390-200.png",
              "https://static.thenounproject.com/png/3407390-200.png",
              "https://static.thenounproject.com/png/3407390-200.png",
            ]);
          };

          resetForm();
        } else {
          toast.error("An issue occurred, but no specific message was provided.");
        }
      } else {
        // Handle error case when response is not ok
        toast.error(data.content || 'An error occurred while adding the product.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while adding the product.');
    }
  };
  
  return isLoggedIn ? (
    <div>
    <section className="flex flex-col lg:mx-[20%] " aria-labelledby="payment-details-heading  ">
  
  <div className="shadow sm:rounded-md sm:overflow-hidden ">
    <div className=" py-6 px-4 sm:p-6">
      <div>
        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-200">Add New Product</h2>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-6">
        <div className="col-span-4 sm:col-span-2">
          <label  className="block text-sm font-medium text-gray-400">Product Category</label>
          <select id="category"
            className="mt-1 block w-full  border border-[#323336] rounded-md shadow-sm py-2 px-3 bg-[#252629]  text-gray-400  sm:text-sm">
            <option value="0">Select Category</option>
  
            {category.map((clr) => (
              <option value={clr.id}>
                {clr.catName}
              </option>
            ))}
            
          </select>
        </div>
   
        <div className="col-span-4 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-400">Product Title</label>
          <input onChange={(e) => setTitle(e.target.value)} type="text" id="title"
            className="mt-1 block w-full border border-[#323336] rounded-md shadow-sm py-2 px-3 bg-[#252629]  text-gray-400  sm:text-sm"/>
        </div>
        <div className="col-span-4 sm:col-span-2">
          <label  className="block text-sm font-medium text-gray-400">Select Product Model</label>
  <select
    onChange={(e) => setSelectedModel(e.target.value)}  // Set the selected model ID
    id="model"
    className="mt-1 block w-full border border-[#323336] rounded-md shadow-sm py-2 px-3 bg-[#252629] text-gray-400 sm:text-sm"
    value={selectedModel}  // Set the selected value for a controlled component
  >
    <option value="0">Select Model</option>
    {model.map((clr) => (
      <option key={clr.id} value={clr.id}>
        {clr.modelName}
      </option>
    ))}
  </select>
  
        </div>
        <div className="col-span-4 sm:col-span-2">
        <label className="block text-sm font-medium text-gray-400">Select Product Condition</label>
        <fieldset>
          <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
            <div className="flex items-center text-base sm:text-sm">
              <input
                type="radio"
                name="condition"
                id="1"
                value="1"
                checked={selectedCondition === '1'}
                onChange={handleConditionChange}
                className="flex-shrink-0 h-4 w-4 border-[#323336] bg-[#3e4045] rounded-sm text-gray-600"
              />
              <label htmlFor="1" className="ml-3 min-w-0 flex-1 text-gray-400">
                Brand New
              </label>
            </div>
            <div className="flex items-center text-base sm:text-sm">
              <input
                type="radio"
                name="condition"
                id="2"
                value="2"
                checked={selectedCondition === '2'}
                onChange={handleConditionChange}
                className="flex-shrink-0 h-4 w-4 border-[#323336] bg-[#3e4045] rounded-sm text-gray-600"
              />
              <label htmlFor="2" className="ml-3 min-w-0 flex-1 text-gray-400">
                Used
              </label>
            </div>
          </div>
        </fieldset>
      </div>
        <div className="col-span-4 sm:col-span-2">
          <label  className="block text-sm font-medium text-gray-400">Select Product Color</label>
          <select
    onChange={(e) => setSelectedColor(e.target.value)}
    id="color"
    className="mt-1 block w-full border border-[#323336] rounded-md shadow-sm py-2 px-3 bg-[#252629] text-gray-400 sm:text-sm"
  >
    <option value="0">Select Color</option>
    {color.map((clr) => (
      <option key={clr.clrId} value={clr.clrId}>
        {clr.clrName}
      </option>
    ))}
  </select>
  
  
  
        </div>
        <div className="col-span-4 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-400">Add Product Quantity</label>
          <input onChange={(e)=>setQuantity(e.target.value)} type="number" id="quantity"
            className="mt-1 block w-full border border-[#323336] rounded-md shadow-sm py-2 px-3 bg-[#252629]  text-gray-400  sm:text-sm"/>
        </div>
        <div className="col-span-4 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-400">Cost Per Item</label>
          <div className="flex">
            <span
              className="inline-flex items-center px-3 text-sm text-gray-200 bg-[#2e2f33] border rounded-e-0 border-[#323336] rounded-s-md">
              Rs.
            </span>
            <input onChange={(e)=>setPrice(e.target.value)} type="text" id="cost"
              className="rounded-none outline-none bg-[#252629] border text-gray-200 block flex-1 min-w-0 w-full text-sm border-[#323336] p-2.5 "
              placeholder="10000"/>
            <span
              className="inline-flex items-center px-3 text-sm text-gray-200 bg-[#2e2f33] border rounded-e-md border-[#323336] rounded-s-0 ">
              .00
            </span>
          </div>
        </div>
      </div>
    </div>
  
    <div className=" py-6 px-4 sm:p-6">
      <div>
        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-200">Product Description</h2>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 ">
        <textarea onChange={(e)=>setDescription(e.target.value)} id="description"  className="p-3 outline-none w-full rounded-md border-2 bg-[#252629] border-[#323336]"></textarea>
        <div>
          <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-200">Product Images</h2>
          <label className="block text-sm font-medium text-gray-500 mt-1">Add Atleast 1 Image of the
            Product</label>
        </div>
        <div>
        {/* Images Display */}
        <div className="grid grid-cols-3 gap-3 mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="border-2 rounded-full border-[#323336] bg-[#2e2f33]/60 w-48 h-48 overflow-hidden"
            >
              <img
                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                alt={`Uploaded preview ${index + 1}`}
                className="w-full h-full object-cover object-center"
                id={`image${index}`}
              />
            </div>
          ))}
        </div>
  
        {/* File Input for Upload */}
        <div>
          <input
            type="file"
            id="imageUploader"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="imageUploader"
            className="bg-gray-800 border cursor-pointer border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#374151]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>
            Upload Images
          </label>
        </div>
  
      </div>
      </div>
  
    </div>
  
    <div className="px-4 py-3  text-right sm:px-6">
      <button onClick={AddProducts}
        className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 ">Save</button>
    </div>
  </div>
  
  </section>
  
      </div>
  ):(
   router.push("/signin")
  )


}