"use client";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

export default function UserProfilePage() {
  const [userDetailsObject, setUserDetailsObject] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    genders: [],
    userGenderId: null as string | null,
    addressLine1: null,
    addressLine2: null,
    userProvinceId: null,
    userDistrictId: null,
    userPostalCode: null,
    userCityId: null,
    provinces: [],
    password: "",
    joinedDate: "",
  });

  const [mobile, setMobile] = useState(userDetailsObject.mobile);
  const [lastName, setLastName] = useState(userDetailsObject.lastName);
  const [firstName, setFirstName] = useState(userDetailsObject.firstName);
  const [gender, setGender] = useState(userDetailsObject.userGenderId);
  const [line1, setLine1] = useState(userDetailsObject.addressLine1);
  const [line2, setLine2] = useState(userDetailsObject.addressLine2);
  const [province, setProvince] = useState(userDetailsObject.userProvinceId);
  const [district, setDistrict] = useState(userDetailsObject.userDistrictId);
  const [city, setCity] = useState(userDetailsObject.userCityId);
  const [postalCode, setPostalCode] = useState(userDetailsObject.userPostalCode);
  let [districts, setDistricts] = useState([]);
  let [cities, setCities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/LoadUserDetails", {
          method: "POST",
          headers: {
            credentials: "include",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.success) {
            setUserDetailsObject(data);
          } else {
            toast.error("Something Went Wrong");
          }
        } else {
          console.error("HTTP error:", response.status);
        }
      } catch (e) {
        console.error("Fetch error:", e);
        toast.error("Something Went Wrong");
      }
    };

    getData();
  }, []);

  let searchDistricts = async (provinceId: number) => {
    try {
      const response = await fetch("/api/GetDistricts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ provinceId: provinceId }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          setDistricts(data.districts);
        } else {
          toast.error("Something Went Wrong");
        }
      } else {
        console.error("HTTP error:", response.status);
      }
    } catch (e) {
      console.error("Fetch error:", e);
      toast.error("Something Went Wrong");
    }
  };

  let searchCities = async (districtId: number) => {
    try {
      const response = await fetch("/api/GetCities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ districtId: districtId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCities(data.cities);
        } else {
          toast.error("Something Went Wrong");
        }
      } else {
        console.error("HTTP error:", response.status);
      }
    } catch (e) {
      console.error("Fetch error:", e);
      toast.error("Something Went Wrong");
    }
  };

  let updateProfile = async () => {
  const sendData = {
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    gender: gender,
    line1: line1,
    line2: line2,
    province: province,
    district: district,
    city: city,
    postalCode: postalCode,
  }
  const validateInput = () => {
    if (!firstName) {
      toast.error("First name is required");
      return false;
    }
    if (!lastName) {
      toast.error("Last name is required");
      return false;
    }
    if (!mobile) {
      toast.error("Mobile number is required");
      return false;
    }
    if (!gender || gender === "Select") {
      toast.error("Gender is required");
      return false;
    }
    if (!line1) {
      toast.error("Address Line 1 is required");
      return false;
    }
    if (!province || province === "Select") {
      toast.error("Province is required");
      return false;
    }
    if (!district || district === "Select") {
      toast.error("District is required");
      return false;
    }
    if (!city || city === "Select") {
      toast.error("City is required");
      return false;
    }
    if (!postalCode) {
      toast.error("Postal code is required");
      return false;
    }
    return true;
  };
  
  const handleSubmit = async () => {
    if (!validateInput()) {
      return;
    }
  
    try {
      const response = await fetch("/api/UpdateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success(data.content);
        } else {
          toast.error(data.content);
        }
      } else {
        const errorText = await response.text();
        toast.error(`HTTP error: ${response.status} - ${errorText}`);
      }
    } catch (e) {
      console.error("Fetch error:", e);
      toast.error("Something went wrong. Please try again.");
    }
  };
  handleSubmit();
}
  return (
    <div>
      <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
        <div className="grid grid-cols-12 gap-x-5">
          {/* Sidebar can be included here */}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 col-span-8 md:mt-0 mt-10">
            <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
              <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-200 sm:text-3xl">
                  Profile Details
                </h1>
              </div>
     {/* Profile details section */}
<section aria-labelledby="profile-details-heading">
  <div className="sm:rounded-md sm:overflow-hidden">
    <div className="py-6 px-4 sm:p-6">
      <div className="mt-6 grid grid-cols-4 gap-6">
        <div className="col-span-4 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-400">
            First name
          </label>
          <input
            value={userDetailsObject.firstName}
            onChange={(e) => setUserDetailsObject({ ...userDetailsObject, firstName: e.target.value })}
            className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            type="text"
            id="fname"
          />
        </div>
        <div className="col-span-4 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-400">
            Last name
          </label>
          <input
            value={userDetailsObject.lastName}
            onChange={(e) => setUserDetailsObject({ ...userDetailsObject, lastName: e.target.value })}
            className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            type="text"
            id="lname"
          />
        </div>
        <div className="col-span-4 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-400">
            Mobile
          </label>
          <input
            value={userDetailsObject.mobile}
            onChange={(e) => setUserDetailsObject({ ...userDetailsObject, mobile: e.target.value })}
            className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            type="number"
            id="mobile"
          />
        </div>
        <div className="col-span-4 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-400">
            Email address
          </label>
          <input
            value={userDetailsObject.email}
            className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            type="email"
            id="email2"
            readOnly
          />
        </div>
        <div className="col-span-4 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-400">
            Gender
          </label>
          <select
            id="gender"
            value={userDetailsObject.userGenderId ?? ""}
            onChange={(e) => setUserDetailsObject({ ...userDetailsObject, userGenderId: e.target.value })}
            className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
          >
            <option>Select</option>
            {userDetailsObject.genders?.map(
              (gender: { id: number; genderName: string }) => (
                <option key={gender.id} value={gender.id}>
                  {gender.genderName}
                </option>
              )
            )}
          </select>
        </div>
        <div className="col-span-4 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-400">
            Password
          </label>
          <input
            value={userDetailsObject.password}
            readOnly
            type="password"
            className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
          />
        </div>
        <div className="col-span-4 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-400">
            Registered Date
          </label>
          <input
            value={userDetailsObject.joinedDate}
            type="text"
            className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            readOnly
          />
        </div>
      </div>
    </div>
  </div>
</section>

              {/* Address section */}
              <section aria-labelledby="address-details-heading">
                <div className=" sm:rounded-md sm:overflow-hidden">
                  <div className="py-6 px-4 sm:p-6">
                    <div>
                      <h2
                        id="address-details-heading"
                        className="text-lg leading-6 font-medium text-gray-300"
                      >
                        Address
                      </h2>
                    </div>
                    <div className="mt-6 grid grid-cols-4 gap-6">
                      <div className="col-span-4 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-400">
                          Address Line 1
                        </label>
                        <input
                          value={userDetailsObject.addressLine1 ?? ""} ref={line1ref}
                          type="text"
                          className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          id="line1"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-400">
                          Address Line 2
                        </label>
                        <input
                          value={userDetailsObject.addressLine2 ?? ""} ref={line2ref}
                          type="text"
                          className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          id="line2"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-400">
                          Province
                        </label>
                        <select
                          id="province"
                          onChange={(e) =>
                            searchDistricts(Number(e.target.value)) 
                          } ref={provinceRef}
                          className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        >
                          <option value="">Select</option>
                          {userDetailsObject.provinces?.map(
                            (province: {
                              provinceId: number;
                              provinceName: string;
                            }) => (
                              <option
                                key={province.provinceId}
                                value={province.provinceId}
                                selected={
                                  province.provinceId ===
                                  userDetailsObject.userProvinceId
                                }
                              >
                                {province.provinceName}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-400">
                          District
                        </label>
                        <select
                          id="district" ref={districtRef}
                          onChange={(e) => searchCities(Number(e.target.value))}
                          className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        >
                          <option value="">Select</option>
                          {districts?.map(
                            (district: {
                              districtId: number;
                              districtName: string;
                            }) => (
                              <option
                                key={district.districtId}
                                value={district.districtId}
                                selected={
                                  district.districtId ===
                                  userDetailsObject.userDistrictId
                                }
                              >
                                {district.districtName}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-400">
                          City
                        </label>
                        <select
                          id="city" ref={cityRef}
                          className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        >
                          <option value="">Select</option>
                          {cities?.map(
                            (city: { cityId: number; cityName: string }) => (
                              <option
                                key={city.cityId}
                                value={city.cityId}
                                selected={
                                  city.cityId === userDetailsObject.userCityId
                                }
                              >
                                {city.cityName}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-400">
                          ZIP / Postal code
                        </label>
                        <input
                          value={userDetailsObject.userPostalCode ?? ""}
                          type="text" ref={postalCoderef}
                          className="bg-[#2e3035] text-gray-400 border-none mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          id="pcode"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-right sm:px-6">
                    <button
                      className="bg-gray-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      onClick={() => updateProfile()}
                    >
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
