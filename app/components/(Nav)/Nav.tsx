"use client";
import Link from "next/link";
import { useState } from "react";
import MainSearchBar from "./MainSearchBar";
import {nav_category_mobile,nav_flyout_calisthenics,nav_flyout_skateboarding,nav_flyout_weight} from "@/app/components/Objects";
import NavFlyoutMenuComponent from "./NavFlyoutMenuComponent";
import useAuthStore from "@/store/useAuthStore";

export default function Nav() {
  const [mobileMenuButtonStatus, setMobileMenuButtonStatus] = useState(true);
  const [isDropDownClicked, setIsDropDownClicked] = useState(true);
  const [flyoutMenuWeightToggle,setFlyoutMenuWeightToggle] = useState(true);
  const [flyoutMenuCalisthenicsToggle,setFlyoutMenuCalisthenicsToggle] = useState(true);
  const [flyoutMenuSkateboardsToggle,setFlyoutMenuSkateboardsToggle] = useState(true);
  const MobileMenuNav = () => {
    setMobileMenuButtonStatus(!mobileMenuButtonStatus);
  };

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
  const signOut = () => {};

  const {isLoggedIn,login,logout} = useAuthStore();
 
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
                {/* <?php $nav_category_mobile_rs = Database::search("SELECT * FROM `category` LIMIT 6");
for ($nav_cat=0; $nav_cat < $nav_category_mobile_rs->num_rows; $nav_cat++) { 
$nav_category_mobile = $nav_category_mobile_rs->fetch_assoc(); ?> */}
            {nav_category_mobile.map((e) => (
                  <div className="group relative">
                  <img
                    src={"category_images/"+e.cat_img}
                    alt="Models sitting back to back, wearing Basic Tee in black and bone."
                    className="object-center aspect-w-1 aspect-h-1 rounded-md bg-gray-100 min-h-[5.5rem] min-w-[5.5rem] group-hover:opacity-75 object-cover"
                  />
                  <Link
                    href={"search?query=" + e.cat_name}
                    className="mt-6 block text-sm font-medium text-gray-100"
                  >
                    <span
                      className="absolute z-10 inset-0"
                      aria-hidden="true"
                    >
                      {e.cat_name}
                    </span>
                  </Link>
                  <p aria-hidden="true" className="mt-1 text-sm text-gray-100">
                    Shop now
                  </p>
                </div>
              ))};

                {/* <?php } ?> */}
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
                href={"/"}
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
              <div className="ml-auto flex items-center">
                  {/* signed In drop down start */}
{isLoggedIn ? (
<>
<button
                  id="dropdownUserAvatarButton"
                  data-dropdown-toggle="dropdownAvatar"
                  className=" text-sm bg-[#242529] rounded-full md:block hidden md:me-0 focus:ring-1 focus:ring-gray-300"
                  type="button"
                >
                  <img
                    draggable="false"
                    className=" border-2 border-gray-500 object-center object-cover w-10 h-10 rounded-full"
                    src="/images/new_user.png"
                    alt=""
                  />
                </button>

                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdownAvatar"
                  className=" hidden z-30 bg-[#242529] divide-y  rounded-lg shadow w-44 "
                >
                  <ul
                    className="py-2 text-sm "
                    aria-labelledby="dropdownUserAvatarButton"
                  >
                    <Link href="/userProfile">
                      <li className=" flex items-center hover:bg-[#35353d] ">
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="block px-4 py-2 hover:bg-[#35353d] ">
                          Profile
                        </p>
                      </li>
                    </Link>

                    <Link href={"/myProducts"}>
                      <li className=" flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-dropbox  text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.01 4.555 4.005 7.11 8.01 9.665 4.005 12.22 0 9.651l4.005-2.555L0 4.555 4.005 2zm-4.026 8.487 4.006-2.555 4.005 2.555-4.005 2.555zm4.026-3.39 4.005-2.556L8.01 4.555 11.995 2 16 4.555 11.995 7.11 16 9.665l-4.005 2.555z" />
                        </svg>
                        <p className="block px-4 py-2 hover:bg-[#35353d] d">
                          My Products
                        </p>
                      </li>
                    </Link>
                    <Link href={"/wishlist"}>
                      <li className="  flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-dropbox  text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                        <p className="block px-4 py-2 ">Wishlist</p>
                      </li>
                    </Link>

                    <Link href={"/purchasedHistory"}>
                      <li className="flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-dropbox  text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z" />
                        </svg>
                        <p className="block px-4 py-2 ">Purchased History</p>
                      </li>
                    </Link>
                    {/* <?php if($sellingHistoryNav_rs->num_rows!==0){ ?> */}
                    <Link href={"/sellingHistory"}>
                      <li className="  flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-rocket  text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8c.828 0 1.5-.895 1.5-2S8.828 4 8 4s-1.5.895-1.5 2S7.172 8 8 8" />
                          <path d="M11.953 8.81c-.195-3.388-.968-5.507-1.777-6.819C9.707 1.233 9.23.751 8.857.454a3.5 3.5 0 0 0-.463-.315A2 2 0 0 0 8.25.064.55.55 0 0 0 8 0a.55.55 0 0 0-.266.073 2 2 0 0 0-.142.08 4 4 0 0 0-.459.33c-.37.308-.844.803-1.31 1.57-.805 1.322-1.577 3.433-1.774 6.756l-1.497 1.826-.004.005A2.5 2.5 0 0 0 2 12.202V15.5a.5.5 0 0 0 .9.3l1.125-1.5c.166-.222.42-.4.752-.57.214-.108.414-.192.625-.281l.198-.084c.7.428 1.55.635 2.4.635s1.7-.207 2.4-.635q.1.044.196.083c.213.09.413.174.627.282.332.17.586.348.752.57l1.125 1.5a.5.5 0 0 0 .9-.3v-3.298a2.5 2.5 0 0 0-.548-1.562zM12 10.445v.055c0 .866-.284 1.585-.75 2.14.146.064.292.13.425.199.39.197.8.46 1.1.86L13 14v-1.798a1.5 1.5 0 0 0-.327-.935zM4.75 12.64C4.284 12.085 4 11.366 4 10.5v-.054l-.673.82a1.5 1.5 0 0 0-.327.936V14l.225-.3c.3-.4.71-.664 1.1-.861.133-.068.279-.135.425-.199M8.009 1.073q.096.06.226.163c.284.226.683.621 1.09 1.28C10.137 3.836 11 6.237 11 10.5c0 .858-.374 1.48-.943 1.893C9.517 12.786 8.781 13 8 13s-1.517-.214-2.057-.607C5.373 11.979 5 11.358 5 10.5c0-4.182.86-6.586 1.677-7.928.409-.67.81-1.082 1.096-1.32q.136-.113.236-.18Z" />
                          <path d="M9.479 14.361c-.48.093-.98.139-1.479.139s-.999-.046-1.479-.139L7.6 15.8a.5.5 0 0 0 .8 0z" />
                        </svg>
                        <p className="block px-4 py-2 ">selling History</p>
                      </li>
                    </Link>
                    {/* <?php }

     $orderStatusNav_rs = Database::search("SELECT `invoice`.*,`product`.`user_email` AS `owner_email`,`invoice_has_products`.*,`product`.* FROM `invoice` 
     INNER JOIN `invoice_has_products` 
     ON `invoice`.`invoice_id`=`invoice_has_products`.`invoice_id` 
     INNER JOIN `product` 
     ON `invoice_has_products`.`product_id`=`product`.`id` 
     WHERE `product`.`user_email`=?", [$_SESSION["user"]["email"]]);

     if($orderStatusNav_rs->num_rows!==0){ ?> */}
                    <Link href={"/orderStatus"}>
                      <li className="flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          width="16"
                          height="16"
                          stroke="currentColor"
                          className="text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
                          />
                        </svg>
                        <p className="block px-4 py-2 ">Order Status</p>
                      </li>
                    </Link>
                    {/* <?php } ?> */}
                    <Link href={"/contactAdmin"}>
                      <li className="  flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-dropbox  text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                        </svg>
                        <p className="block px-4 py-2 ">Contact Admin</p>
                      </li>
                    </Link>
                    <button onClick={logout} className="cursor-pointer">
                      <li className="  flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          stroke="currentColor"
                          className=" text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                          />
                        </svg>
                        <p className="block px-4 py-2 ">Sign out</p>
                      </li>
                    </button>
                  </ul>
                </div>
             {/* signed In drop down end */}

                <button
                  id="dropdownUserAvatarButton"
                  onClick={dropdownUserList}
                  className=" text-sm bg-[#242529] rounded-full md:block hidden md:me-0 focus:ring-1 focus:ring-gray-300 "
                  type="button"
                >
                  <img
                    draggable="false"
                    className="grayscale border-2 border-gray-500 object-center object-cover w-10 h-10 rounded-full"
                    src="/images/new_user.png"
                  />
                </button>

                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdownAvatar"
                  className={` ${
                    isDropDownClicked ? "hidden" : ""
                  } z-30 bg-[#242529] divide-y divide-gray-100 mt-[14rem] rounded-lg shadow w-44 `}
                >
                  <ul
                    className="py-2 text-sm "
                    aria-labelledby="dropdownUserAvatarButton"
                  >
                    <Link href={"/userProfile"}>
                      <li className=" flex items-center hover:bg-[#35353d] ">
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="block px-4 py-2 hover:bg-[#35353d] ">
                          Profile
                        </p>
                      </li>
                    </Link>

                    <Link href={"/myProducts"}>
                      <li className=" flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-dropbox  text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.01 4.555 4.005 7.11 8.01 9.665 4.005 12.22 0 9.651l4.005-2.555L0 4.555 4.005 2zm-4.026 8.487 4.006-2.555 4.005 2.555-4.005 2.555zm4.026-3.39 4.005-2.556L8.01 4.555 11.995 2 16 4.555 11.995 7.11 16 9.665l-4.005 2.555z" />
                        </svg>
                        <p className="block px-4 py-2 hover:bg-[#35353d] d">
                          My Products
                        </p>
                      </li>
                    </Link>
                    <Link href={"/wishlist"}>
                      <li className="  flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-dropbox  text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                        <p className="block px-4 py-2 ">Wishlist</p>
                      </li>
                    </Link>

                    <Link href={"/purchasedHistory"}>
                      <li className="  flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-dropbox  text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z" />
                        </svg>
                        <p className="block px-4 py-2 ">Purchased History</p>
                      </li>
                    </Link>
                    {/* <?php  if($sellingHistoryNav_rs->num_rows!==0){ ?> */}
                    {/* <Link href={"/sellingHistory"}>
                    <li className="  flex items-center hover:bg-[#35353d] ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-rocket   text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0" viewBox="0 0 16 16">
  <path d="M8 8c.828 0 1.5-.895 1.5-2S8.828 4 8 4s-1.5.895-1.5 2S7.172 8 8 8"/>
  <path d="M11.953 8.81c-.195-3.388-.968-5.507-1.777-6.819C9.707 1.233 9.23.751 8.857.454a3.5 3.5 0 0 0-.463-.315A2 2 0 0 0 8.25.064.55.55 0 0 0 8 0a.55.55 0 0 0-.266.073 2 2 0 0 0-.142.08 4 4 0 0 0-.459.33c-.37.308-.844.803-1.31 1.57-.805 1.322-1.577 3.433-1.774 6.756l-1.497 1.826-.004.005A2.5 2.5 0 0 0 2 12.202V15.5a.5.5 0 0 0 .9.3l1.125-1.5c.166-.222.42-.4.752-.57.214-.108.414-.192.625-.281l.198-.084c.7.428 1.55.635 2.4.635s1.7-.207 2.4-.635q.1.044.196.083c.213.09.413.174.627.282.332.17.586.348.752.57l1.125 1.5a.5.5 0 0 0 .9-.3v-3.298a2.5 2.5 0 0 0-.548-1.562zM12 10.445v.055c0 .866-.284 1.585-.75 2.14.146.064.292.13.425.199.39.197.8.46 1.1.86L13 14v-1.798a1.5 1.5 0 0 0-.327-.935zM4.75 12.64C4.284 12.085 4 11.366 4 10.5v-.054l-.673.82a1.5 1.5 0 0 0-.327.936V14l.225-.3c.3-.4.71-.664 1.1-.861.133-.068.279-.135.425-.199M8.009 1.073q.096.06.226.163c.284.226.683.621 1.09 1.28C10.137 3.836 11 6.237 11 10.5c0 .858-.374 1.48-.943 1.893C9.517 12.786 8.781 13 8 13s-1.517-.214-2.057-.607C5.373 11.979 5 11.358 5 10.5c0-4.182.86-6.586 1.677-7.928.409-.67.81-1.082 1.096-1.32q.136-.113.236-.18Z"/>
  <path d="M9.479 14.361c-.48.093-.98.139-1.479.139s-.999-.046-1.479-.139L7.6 15.8a.5.5 0 0 0 .8 0z"/>
</svg>
                      <p className="block px-4 py-2 ">selling History</p>
                    </li>
                  </Link> */}
                    {/* <?php } ?> */}

                    <Link href={"/contactAdmin"}>
                      <li className="  flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-dropbox  text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                        </svg>
                        <p className="block px-4 py-2 ">Contact Admin</p>
                      </li>
                    </Link>
                    <button onClick={logout} className="cursor-pointer">
                      <li className="  flex items-center hover:bg-[#35353d] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          stroke="currentColor"
                          className=" text-gray-100  ml-2 group-hover:text-gray-100 flex-shrink-0"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                          />
                        </svg>
                        <p className="block px-4 py-2 text-sm ">Sign out</p>
                      </li>
                    </button>
                  </ul>
                </div>
</>
): (
<p>
<a href="signin">Signin</a> | <a href="/signup">Sign Up</a>
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
