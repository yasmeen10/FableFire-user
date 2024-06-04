import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import HomeSVG from "../../components/SVG/Home.SVG";
import WishListSVG from "../../components/SVG/WishListSVG";
import OrderSVG from "../../components/SVG/OrderSVG";
import LogOutSVG from "../../components/SVG/LogOutSVG";

export default function UserProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate=useNavigate();

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogOut=async ()=>{
    await localStorage.removeItem('token');
    navigate("/");
  }

  return (
    <>
      <div>
        <div className="flex justify-between ">
          <div></div>
          <button
            onClick={toggleSidebar}
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        </div>

        <aside
          id="logo-sidebar"
          className={` fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isSidebarOpen ? "" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div class="h-full px-3 py-4 overflow-y-auto bg-sidebar">
            <a class="flex items-center ps-2.5 mb-5">
              <img
                src="/icon.png"
                class="h-6 me-3 sm:h-7"
                alt="FableFire Logo"
              />
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                FableFire
              </span>
            </a>
            <ul class="space-y-2 font-medium px-6 py-9">
              <li className="hover:bg-[#E3D5CA] hover:rounded-lg">
                <Link to="/" class="flex items-center p-2 text-placeholder" >
                  <HomeSVG />
                  <span class="ms-3">Home</span>
                </Link>
              </li>

              <li className="hover:bg-[#E3D5CA] hover:rounded-lg ">
                <Link
                  to="wishList"
                  class="flex items-center p-2 text-placeholder"
                >
                  <WishListSVG />
                  <span class="flex-1 ms-3 whitespace-nowrap">WishList</span>
                </Link>
              </li>

              <li className="hover:bg-[#E3D5CA] hover:rounded-lg">
                <Link
                  to="orderProfile"
                  class="flex items-center p-2  text-placeholder"
                >
                  <OrderSVG />
                  <span class="flex-1 ms-3 whitespace-nowrap">Orders</span>
                </Link>
              </li>

              <li className="hover:bg-[#E3D5CA] hover:rounded-lg active:bg-[#E3D5CA] active:rounded-lg">
                <Link class="flex items-center p-2 text-placeholder">
                  <LogOutSVG />
                  <span class="flex-1 ms-3 whitespace-nowrap" onClick={handleLogOut}>LogOut</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <div class="px-14 py-6 sm:ml-64 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
