"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MainSearchBar from "./MainSearchBar";
import {nav_category_mobile,nav_flyout_calisthenics,nav_flyout_skateboarding,nav_flyout_weight} from "@/app/components/Objects";
import NavFlyoutMenuComponent from "./NavFlyoutMenuComponent";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Nav() {
  const [mobileMenuButtonStatus, setMobileMenuButtonStatus] = useState(true);
  const [flyoutMenuWeightToggle,setFlyoutMenuWeightToggle] = useState(true);
  const [flyoutMenuCalisthenicsToggle,setFlyoutMenuCalisthenicsToggle] = useState(true);
  const [flyoutMenuSkateboardsToggle,setFlyoutMenuSkateboardsToggle] = useState(true);
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsDropDownClicked(false);
    }
  };

  useEffect(() => {
    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  interface Category {
    id: number;
    catImg: string;
    catName: string;
  }
  
  const [category, setCategories] = useState<Category[]>([]);
  const MobileMenuNav = () => {
    setMobileMenuButtonStatus(!mobileMenuButtonStatus);
  };
  const router = useRouter();
  

  const dropdownUserList = () => {
    setIsDropDownClicked(!isDropDownClicked);
  };
  const flyoutMenuWeightHoverToggleButton = () => {
    if(flyoutMenuCalisthenicsToggle === false){
      setFlyoutMenuCalisthenicsToggle(!flyoutMenuCalisthenicsToggle);
    }else  if(flyoutMenuSkateboardsToggle === false){
      setFlyoutMenuSkateboardsToggle(!flyoutMenuSkateboardsToggle);
    }
    setFlyoutMenuWeightToggle(!flyoutMenuWeightToggle);
  };
  const flyoutMenuCalisthenicsHoverToggleButton = () => {
    if(flyoutMenuSkateboardsToggle === false){
      setFlyoutMenuSkateboardsToggle(!flyoutMenuSkateboardsToggle);
    }else if(flyoutMenuWeightToggle === false){
      setFlyoutMenuWeightToggle(!flyoutMenuWeightToggle);
    }
    setFlyoutMenuCalisthenicsToggle(!flyoutMenuCalisthenicsToggle);
  };
  const flyoutMenuSkateboardsHoverToggleButton = () => {
    if(flyoutMenuWeightToggle === false){
      setFlyoutMenuWeightToggle(!flyoutMenuWeightToggle);
    }else  if(flyoutMenuCalisthenicsToggle === false){
      setFlyoutMenuCalisthenicsToggle(!flyoutMenuCalisthenicsToggle);
    }
    setFlyoutMenuSkateboardsToggle(!flyoutMenuSkateboardsToggle);
  };

  const {isLoggedIn,login,logout} = useAuthStore();

  const signOutSession = async () => {
    try{
      const response = await fetch('/api/Signout', {
           method: "POST",
           headers: {
               "credentials": "include"
           },
       });
   
       if (response.ok) {
         const data = await response.json();
   
           if(data.success==true){
           logout();
   }else{
             toast.error("Something Went Wrong");
           }
         } else {
           // Handle HTTP errors
           console.error('HTTP error:', response.status);
       }
   } catch (e: any) {
       // Handle fetch errors
       console.error('Fetch error:', e);
       toast.error("Something Went Wrong");
      }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/GetCategories', {
          method: "POST",
          headers: {
            "credentials": "include",
          },
        });
    
        if (response.ok) {
          const data = await response.json();
    
          if (data.success) {
            setCategories(data.categoryList);
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
  


 
  return (
    <div className="">
      {/* <!-- Mobile Menu start --> */}
      <div
        className={`${mobileMenuButtonStatus ? "hidden" : ""}`}
        id="MobileMenublack"
      >
        <div
          className="fixed inset-0  flex z-[90] lg:hidden "
          role="dialog"
          aria-modal="true"
        >

          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            aria-hidden="true"
          ></div>
          <div
            className={`relative max-w-xs ${
              mobileMenuButtonStatus ? "hidden" : ""
            } w-full bg-[#2a2b30] shadow-xl pb-12 flex flex-col overflow-y-auto`}
            id="MobileMenu"
          >
            <div className="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                className="-m-2 p-2  rounded-md inline-flex items-center justify-center text-gray-100"
                id="closeMobileMenuButton"
                onClick={MobileMenuNav}
              >
                {/* <!-- Heroicon name: outline/x --> */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* <!-- 'Women' tab panel, show/hide based on tab state. --> */}
            <div
              id="tabs-1-panel-1"
              className="px-4 py-6 space-y-12"
              aria-labelledby="tabs-1-tab-1"
              role="tabpanel"
              tabIndex={0}
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-10">
            {category.map((e) => (
                  <div className="group relative">
                  <img
                    src={"/images/"+e.catImg}
                    alt="Models sitting back to back, wearing Basic Tee in black and bone."
                    className="object-center aspect-w-1 aspect-h-1 rounded-md bg-gray-100 min-h-[5.5rem] min-w-[5.5rem] group-hover:opacity-75 object-cover"
                  />
                  <Link
                    href={"search?query=" + e.catName}
                    className="mt-6 block text-sm font-medium text-gray-100"
                  >
                    <span
                      className="absolute z-10 inset-0"
                      aria-hidden="true"
                    >
                      {e.catName}
                    </span>
                  </Link>
                  <p aria-hidden="true" className="mt-1 text-sm text-gray-100">
                    Shop now
                  </p>
                </div>
              ))}
              </div>
            </div>
            {/* // <?php require_once "./guis/partials/nav_profile.php" ?> */}
          </div>
        </div>
      </div>

      {/* // <!-- Main Nav Bar start --> */}
      <div className="relative z-50 bg-[#242529] text-gray-100 shadow-md shadow-[#141516]">
        <div
          aria-label="Top"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="">
            <div className="h-16 flex items-center">
              {/* <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. --> */}
              <button
                type="button"
                className="bg-[#242529] p-2 rounded-md text-gray-100 lg:hidden"
                onClick={MobileMenuNav}
              >
                {/* <!-- Heroicon name: outline/menu --> */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* <!-- Logo --> */}
              <Link
                href={"/home"}
                className="ml-4 tracking-[1px] text-2xl font-thin flex lg:ml-0"
              >
                BeFit
              </Link>
              {/* <!-- Flyout menus --> */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  <div className="hidden lg:flex-1 lg:block lg:self-stretch">
                    <div className="h-full flex space-x-8">
                    <NavFlyoutMenuComponent title="Weight Training" useStateVariable={flyoutMenuWeightToggle} toggleFunction={flyoutMenuWeightHoverToggleButton} object={nav_flyout_weight}/>
                    <NavFlyoutMenuComponent title="Calisthenics" useStateVariable={flyoutMenuCalisthenicsToggle} toggleFunction={flyoutMenuCalisthenicsHoverToggleButton} object={nav_flyout_calisthenics}/>
                    <NavFlyoutMenuComponent title="Skateboarding" useStateVariable={flyoutMenuSkateboardsToggle} toggleFunction={flyoutMenuSkateboardsHoverToggleButton} object={nav_flyout_skateboarding}/>
                    </div>
                  </div>
                </div>
              </div>
              <MainSearchBar />
              <Link href={"/advancedSearch"} className="bg-gray-500 hover:bg-gray-400 text-black py-1 px-2 rounded-md">Advanced Search</Link>
              <div className="ml-auto flex items-center">
                  {/* signed In drop down start */}
{isLoggedIn ? (
<>
                {/* <!-- Dropdown menu --> */}
                <div
        ref={dropdownRef}
        id="dropdownAvatar"
        className={`${
          isDropDownClicked ? '' : 'hidden'
        } z-30 bg-[#242529] relative divide-y divide-gray-100 mt-[14rem] rounded-lg shadow w-44`}
      >
        <ul className="py-2 text-sm" aria-labelledby="dropdownUserAvatarButton">
          <Link href="/userProfile">
            <li className="flex items-center hover:bg-[#35353d]">
              <svg
                className="text-gray-100 group-hover:text-gray-100 flex-shrink-0 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="block px-4 py-2">Profile</p>
            </li>
          </Link>
          <Link href="/myProduct">
            <li className="flex items-center hover:bg-[#35353d]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dropbox text-gray-100 ml-2 group-hover:text-gray-100 flex-shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M8.01 4.555 4.005 7.11 8.01 9.665 4.005 12.22 0 9.651l4.005-2.555L0 4.555 4.005 2zm-4.026 8.487 4.006-2.555 4.005 2.555-4.005 2.555zm4.026-3.39 4.005-2.556L8.01 4.555 11.995 2 16 4.555 11.995 7.11 16 9.665l-4.005 2.555z" />
              </svg>
              <p className="block px-4 py-2">My Products</p>
            </li>
          </Link>
          <Link href={"/"} onClick={() => {signOutSession()}} className="cursor-pointer">
            <li className="flex items-center hover:bg-[#35353d]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                className="text-gray-100 ml-2 group-hover:text-gray-100 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              <p className="block px-4 py-2 text-sm">Sign out</p>
            </li>
          </Link>
        </ul>
      </div>

      <button
        ref={buttonRef}
        id="dropdownUserAvatarButton"
        onClick={dropdownUserList}
        className="relative text-sm bg-[#242529] rounded-full md:block hidden md:me-0 focus:ring-1 focus:ring-gray-300"
        type="button"
      >
        <img
          draggable="false"
          className="grayscale border-2 border-gray-500 object-center object-cover w-10 h-10 rounded-full"
          src="/images/new_user.png"
        />
      </button>
</>
): (
<p>
<Link href={"signin"}>Signin</Link> | <Link href={"/signup"}>Sign Up</Link>
</p>
)}
           

                
                {/* <?php }} else { ?> */}
                {/* <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              <Link href={"/signin"} className="text-sm font-medium  hover:text-white text-gray-300">Sign in</Link>
              <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
              <Link href={"/signup"} className="text-sm font-medium  hover:text-white text-gray-300">Create account</Link>
            </div> */}
                {/* <?php } ?> */}
                {/* <!-- Cart --> */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    href={"/cart"}
                    className="group -m-2 p-2 flex items-center"
                  >
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-gray-100 group-hover:text-gray-100"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    {/* <?php 
              try {
                if (isset($_SESSION["user"]) && $_SESSION["user"]) {

                  $cartNumber_rs = Database::search("SELECT  COUNT(user_email) FROM cart WHERE user_email='" . $_SESSION["user"]["email"] . "'");
                  $cartNumber = $cartNumber_rs->fetch_assoc();
                  ?>
                  <span className="-ms-3 -mt-4 <?php if ($cartNumber["COUNT(user_email)"] > 0) {
                    ?>bg-red-500/90<?php } ?> font-bold w-[1.1rem] text-center h-[1.1rem] rounded-full text-sm  text-[#1a1b1d]">
                    <?php
                    if ($cartNumber["COUNT(user_email)"] > 0) {
                      echo ($cartNumber["COUNT(user_email)"]);
                    }
                    ?> 
                  </span>
                </Link>
              {/* <?php } else { ?> */}
                    <span className="-ms-3 -mt-4 w-[1.1rem] text-center h-[1.1rem] rounded-full text-sm  text-white"></span>
                  </Link>
                  {/* // <?php } } catch (\Throwable $th) { } ?> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
