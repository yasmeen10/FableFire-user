import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import HomeSVG from "../../components/SVG/Home.SVG";
import WishListSVG from "../../components/SVG/WishListSVG";
import OrderSVG from "../../components/SVG/OrderSVG";
import LogOutSVG from "../../components/SVG/LogOutSVG";
import { useAuth } from "../../context/AuthContext";

export default function UserProfile() {
  let { setAuthUser, authUser, setIsLoggedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState(false);
  const navigate = useNavigate();

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClick = (index) => {
    setClickedItem(index);
  };
  const handleLogOut = async () => {
    setIsLoggedIn(false);
    setAuthUser(null);
    await localStorage.removeItem("token");
    navigate("/");
  };

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
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
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
          <div className="h-full px-3 py-4 overflow-y-auto bg-sidebar">
            <Link to="/profile" className={`flex items-center ps-2.5 mb-5 pt-4 ${
                  clickedItem === 0
                    ? "bg-transparent"
                    : "bg-transparent"
                }`}   onClick={() => handleClick(0)}>
              <img
                src={authUser?.images[0]}
                className=" object-cover mx-2 h-12 w-12 rounded-full"
                alt="FableFire Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
               {authUser?.firstName + " " + authUser?.lastName}
              </span>
            </Link>
            <ul className="space-y-2 font-medium px-6 py-9">
              <li className="hover:bg-[#E3D5CA] hover:rounded-lg">
                <Link to="/" className="flex items-center p-2 text-placeholder">
                  <HomeSVG />
                  <span className="ms-3">Home</span>
                </Link>
              </li>

              <li
                className={`hover:bg-[#E3D5CA] hover:rounded-lg ${
                  clickedItem === 1
                    ? "bg-[#E3D5CA] rounded-lg"
                    : "bg-transparent"
                }`}
                onClick={() => handleClick(1)}
              >
                <Link
                  to="wishList"
                  className="flex items-center p-2 text-placeholder"
                >
                  <WishListSVG />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    WishList
                  </span>
                </Link>
              </li>

              <li
                className={`hover:bg-[#E3D5CA] hover:rounded-lg ${
                  clickedItem === 2
                    ? "bg-[#E3D5CA] rounded-lg"
                    : "bg-transparent"
                }`}
                onClick={() => handleClick(2)}
              >
                <Link
                  to="orderProfileHistory"
                  className="flex items-center p-2 text-placeholder"
                >
                  <OrderSVG />
                  <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                </Link>
              </li>

              <li className="hover:bg-[#E3D5CA] hover:rounded-lg active:bg-[#E3D5CA] active:rounded-lg">
                <Link className="flex items-center p-2 text-placeholder">
                  <LogOutSVG />
                  <span
                    className="flex-1 ms-3 whitespace-nowrap"
                    onClick={handleLogOut}
                  >
                    LogOut
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <div className="px-14 py-6 sm:ml-64 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
