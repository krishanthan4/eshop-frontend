import React from 'react';

export default function UserProfilePage() {
    return (
        <div>
            <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
                <div className="grid grid-cols-12 gap-x-5">
                    {/* Sidebar can be included here */}
                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 col-span-8 md:mt-0 mt-10">
                        <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
                            <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
                                <h1 className="text-2xl font-extrabold tracking-tight text-gray-200 sm:text-3xl">Profile Details</h1>
                            </div>
                            {/* Profile details section */}
                            <section aria-labelledby="profile-details-heading">
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="py-6 px-4 sm:p-6">
                                        {/* Profile image start */}
                                        <div className="sm:col-span-6 py-3">
                                            <div className="text-gray-400 border-none mt-1 flex items-center">
                                                <img src="resources/new_user.png" className="grayscale inline-block h-32 w-32 rounded-full" id="image" />
                                                <div className="ml-4 flex">
                                                    <div onClick={() => changeProfileImage()} className="relative border-green-600 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 py-2 px-3 border rounded-md text-sm font-medium">
                                                        <label className="relative text-sm font-medium text-blue-gray-900 pointer-events-none">
                                                            <span>Change</span>
                                                            <span className="sr-only"> user photo</span>
                                                        </label>
                                                        <input id="userImage" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md" />
                                                    </div>
                                                    <button type="button" className="ml-3 border-red-600 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 py-2 px-3 border rounded-md text-sm font-medium" onClick={() => removeProfileImage()}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Profile image end */}
                                        <div className="mt-6 grid grid-cols-4 gap-6">
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">First name</label>
                                                <input className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" type="text" id="fname" />
                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">Last name</label>
                                                <input className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" type="text" id="lname" />
                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">Mobile</label>
                                                <input className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" type="number" id="mobile" />
                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">Email address</label>
                                                <input className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" type="email" id="email2" readOnly />
                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">Gender</label>
                                                <select id="gender" className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm">
                                                    <option>Select</option>
                                                    {/* Add gender options here */}
                                                </select>
                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">Password</label>
                                                <input readOnly type="password" className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">Registered Date</label>
                                                <input type="text" className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                        <button className="bg-gray-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={() => updateProfile()}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </section>
                            {/* Address section */}
                            <section aria-labelledby="address-details-heading">
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="py-6 px-4 sm:p-6">
                                        <div>
                                            <h2 id="address-details-heading" className="text-lg leading-6 font-medium text-gray-300">Address</h2>
                                        </div>
                                        <div className="mt-6 grid grid-cols-4 gap-6">
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">Address Line 1</label>
                                                <input type="text" className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" id="line1" />
                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">Address Line 2</label>
                                                <input type="text" className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" id="line2" />
                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">Province</label>
                                                <select id="province" onChange={() => loadDistricts()} className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm">
                                                    <option value="">Select</option>
                                                    {/* Add province options here */}
                                                </select>
                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">District</label>
                                                <select id="district" onChange={() => loadCities()} disabled className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm">
                                                    <option value="">Select</option>
                                                    {/* Add district options here */}
                                                </select>
                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">City</label>
                                                <select id="city" disabled className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm">
                                                    <option value="">Select</option>
                                                    {/* Add city options here */}
                                                </select>
                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-400">ZIP / Postal code</label>
                                                <input type="text" className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" id="pcode" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                        <button className="bg-gray-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={() => updateProfile()}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function changeProfileImage() {
    // Implement the function to change profile image
}

function removeProfileImage() {
    // Implement the function to remove profile image
}

function updateProfile() {
    // Implement the function to update profile
}

function loadDistricts() {
    // Implement the function to load districts based on selected province
}

function loadCities() {
    // Implement the function to load cities based on selected district
}
