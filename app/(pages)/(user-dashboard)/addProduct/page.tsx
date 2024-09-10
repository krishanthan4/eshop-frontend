import React from 'react'

function page() {
  return (
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
{/*          
          $category_rs = Database::search("SELECT * FROM category");
          $category_num = $category_rs->num_rows;

          for ($x = 0; $x < $category_num; $x++) {
            $category_data = $category_rs->fetch_assoc();
             */}
            <option value="<?php echo $category_datacat_id">
              echo $category_datacat_name
            </option>
          
        </select>
      </div>
 
      <div className="col-span-4 sm:col-span-2">
        <label className="block text-sm font-medium text-gray-400">Product Title</label>
        <input type="text" id="title"
          className="mt-1 block w-full border border-[#323336] rounded-md shadow-sm py-2 px-3 bg-[#252629]  text-gray-400  sm:text-sm"/>
      </div>
      <div className="col-span-4 sm:col-span-2">
        <label  className="block text-sm font-medium text-gray-400">Select Product Model</label>
        <select id="model"
          className="mt-1 block w-full  border border-[#323336] rounded-md shadow-sm py-2 px-3 bg-[#252629]  text-gray-400  sm:text-sm">
          <option value="0">Select Model</option>
{/*          
          $model_rs = Database::search("SELECT * FROM model");
          $model_num = $model_rs->num_rows;

          for ($x = 0; $x < $model_num; $x++) {
            $model_data = $model_rs->fetch_assoc();
             */}
            <option value="<?php echo $model_datamodel_id">
              echo $model_datamodel_name
            </option>
          
        </select>
      </div>
      <div className="col-span-4 sm:col-span-2">
        <label className="block text-sm font-medium text-gray-400">Select Product Condition</label>
        <fieldset>
          <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
            <div className="flex items-center text-base sm:text-sm">
              <input type="radio" name="c" id="brandNew" 
                className="flex-shrink-0 h-4 w-4 border-[#323336] bg-[#3e4045] rounded-sm text-gray-600 "/>
              <label  className="ml-3 min-w-0 flex-1 text-gray-400">Brand New</label>
            </div>
            <div className="flex items-center text-base sm:text-sm">
              <input type="radio" name="c" id="used"
                className="flex-shrink-0 h-4 w-4 border-[#323336] bg-[#3e4045] rounded-sm text-gray-600 "/>
              <label className="ml-3 min-w-0 flex-1 text-gray-400">Used</label>
            </div>

          </div>
        </fieldset>
      </div>
      <div className="col-span-4 sm:col-span-2">
        <label  className="block text-sm font-medium text-gray-400">Select Product Color</label>
        <select id="color"
          className="mt-1 block w-full  border border-[#323336] rounded-md shadow-sm py-2 px-3 bg-[#252629]  text-gray-400  sm:text-sm">
          <option value="0">Select Color</option>
         
          {/* $clr_rs = Database::search("SELECT * FROM color");
          $clr_num = $clr_rs->num_rows;

          for ($x = 0; $x < $clr_num; $x++) {
            $clr_data = $clr_rs->fetch_assoc();
             */}
            <option value="<?php echo $clr_dataclr_id">
              echo $clr_dataclr_name
            </option>
          
        </select>


      </div>
      <div className="col-span-4 sm:col-span-2">
        <label className="block text-sm font-medium text-gray-400">Add Product Quantity</label>
        <input type="number" id="quantity"
          className="mt-1 block w-full border border-[#323336] rounded-md shadow-sm py-2 px-3 bg-[#252629]  text-gray-400  sm:text-sm"/>
      </div>
      <div className="col-span-4 sm:col-span-2">
        <label className="block text-sm font-medium text-gray-400">Cost Per Item</label>
        <div className="flex">
          <span
            className="inline-flex items-center px-3 text-sm text-gray-200 bg-[#2e2f33] border rounded-e-0 border-[#323336] rounded-s-md">
            Rs.
          </span>
          <input type="text" id="cost"
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
      <textarea id="description"  className="p-3 outline-none w-full rounded-md border-2 bg-[#252629] border-[#323336]"></textarea>
      <div>
        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-200">Product Images</h2>
        <label className="block text-sm font-medium text-gray-500 mt-1">Add Atleast 1 Image of the
          Product</label>
      </div>
      {/* <!-- images adding section start --> */}
      <div className="grid grid-cols-3  gap-3 mx-auto">
        <div
          className="border-2 rounded-full  border-[#323336] bg-[#2e2f33]/60 w-48 h-48 overflow-hidden">
          <img src="https://static.thenounproject.com/png/3407390-200.png" className="w-full h-full object-cover object-center" id="image0"/>
        </div>
        <div
          className="border-2 rounded-full  border-[#323336] bg-[#2e2f33]/60 w-48 h-48 overflow-hidden">
          <img src="https://static.thenounproject.com/png/3407390-200.png" className="w-full h-full object-cover object-center" id="image1"/>
        </div>
        <div
          className="border-2 rounded-full  border-[#323336] bg-[#2e2f33]/60 w-48 h-48 overflow-hidden">
          <img src="https://static.thenounproject.com/png/3407390-200.png" className="w-full h-full object-cover object-center" id="image2"/>
        </div>
      </div>
      <div>
        <input type="file" className="hidden" id="imageUploader" multiple />
        <label  
          className="bg-gray-800 border cursor-pointer border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#374151] ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
          </svg>
          Upload Images</label>
      </div>

    </div>

  </div>

  <div className="px-4 py-3  text-right sm:px-6">
    <button 
      className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 ">Save</button>
  </div>
</div>

</section>

    </div>
  )
}

export default page