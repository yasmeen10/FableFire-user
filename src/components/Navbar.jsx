import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import fablefire from "../assets/FableFire-logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../../interceptor";

export default function Navbar() {
  const newLocal = "https://flowbite.com/docs/images/logo.svg";

  let { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/user"
        );

        const userData = await data.data;
        setAuthUser(userData);
        authUser = await userData;
        console.log(authUser);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchData();
  }, []);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <nav class="bg-white dark:bg-gray-900 h-[80px] w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={fablefire} className="ml-16" />
          </a>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLoggedIn ? (
              <div>
                <Link to="/profile" className="px-4 py-2 text-center">
                  <img
                    className="h-12 w-12  rounded-full inline"
                    src={authUser.images[0]}
                    alt=""
                  />
                  <span>{authUser.firstName}</span>
                </Link>
                <Link to="/cart">
                  <i className="fas fa-cart-shopping text-button"></i>
                </Link>
              </div>
            ) : (
              <Link
                to="/signIn"
                type="button"
                onClick={logIn}
                class="text-white rounded-xl bg-[#A68877] hover:bg-[#B99885] w-28 mr-6 text-sm px-4 py-2 text-center "
              >
                SIGN IN
              </Link>
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  class="font-normal  block py-2 px-3 text-[#BFAE9F] md:bg-transparent md:text-[#BFAE9F] md:p-0 md:dark:text-[#BFAE9F]"
                  aria-current="page"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  class="font-normal   block py-2 px-3 text-dark-textcolor2 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-placeholder md:p-0 md:dark:hover:text-placeholder dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  SHOP
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  class="font-normal block py-2 px-3 text-dark-textcolor2 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-placeholder md:p-0 md:dark:hover:text-placeholder dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  class="font-normal block py-2 px-3 text-dark-textcolor2 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-placeholder md:p-0 md:dark:hover:text-placeholder dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
