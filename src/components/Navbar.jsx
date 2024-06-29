import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import fablefire from "../assets/FableFire-logo.png";
import HeartSVG from "./SVG/HeartSVG";
import CartSVG from "./SVG/CartSVG";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { authUser, isLoggedIn } = useAuth();
  const { shoppingItemData } = useContext(CartContext);
  const location = useLocation();
  

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  return (
    <div  >
      <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className=" flex items-center justify-around  mx-auto p-4 relative">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={fablefire} className="h-12" alt="Logo" />
          </a>
          <div className="flex space-x-2 items-center md:order-2">
            {isLoggedIn ? (
              <Link to="/profile" className="px-4 py-2 text-center">
                <div className="flex items-center justify-between gap-4 px-2">
                  <div>
                  <Link to="/profile/wishList">
                    <HeartSVG />
                  </Link>

                  </div>
                  <div className="relative">
                    <span className="block absolute bottom-5 left-3 border rounded-full px-2  bg-placeholder text-center">
                      {shoppingItemData?.length}
                    </span>
                    <Link to="/cart"  >
                      <CartSVG />
                    </Link>
                  </div>
                  <div>
                  <img
                    className="h-12 w-12 rounded-full inline"
                    src={authUser?.images[0]}
                    alt="userImage"
                  />
                  <span>{authUser?.firstName}</span>

                  </div>
                </div>
              </Link>
            ) : (
              <Link
                to="/signIn"
                type="button"
                className="text-white rounded-xl bg-[#A68877] hover:bg-[#B99885] text-sm px-4 py-2 text-center"
              >
                SIGN IN
              </Link>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={menuOpen}
              onClick={handleToggleMenu}
              style={{ zIndex: 1000 }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            {menuOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg md:hidden"
                id="navbar-sticky"
                style={{ zIndex: 1000 }}
              >
                <ul className="py-2">
                  <li>
                    <Link
                      to="/"
                      className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                        activeLink === "/" ? "text-[#BFAE9F]" : ""
                      }`}
                      aria-current="page"
                      onClick={() => handleSetActiveLink("/")}
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop"
                      className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                        activeLink === "/shop" ? "text-[#BFAE9F]" : ""
                      }`}
                      onClick={() => handleSetActiveLink("/shop")}
                    >
                      SHOP
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                        activeLink === "/blog" ? "text-[#BFAE9F]" : ""
                      }`}
                      onClick={() => handleSetActiveLink("/blog")}
                    >
                      BLOG
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/events"
                      className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                        activeLink === "/events" ? "text-[#BFAE9F]" : ""
                      }`}
                      onClick={() => handleSetActiveLink("/events")}
                    >
                      EVENTS
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                        activeLink === "/about" ? "text-[#BFAE9F]" : ""
                      }`}
                      onClick={() => handleSetActiveLink("/about")}
                    >
                      ABOUT
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                        activeLink === "/contact" ? "text-[#BFAE9F]" : ""
                      }`}
                      onClick={() => handleSetActiveLink("/contact")}
                    >
                      CONTACT US
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className={`font-normal block py-2 px-3 md:bg-transparent md:p-0 ${
                    location.pathname === "/" || activeLink === "/"
                      ? "text-[#BFAE9F]"
                      : "text-dark-textcolor2"
                  } md:dark:text-[#BFAE9F]`}
                  aria-current="page"
                  onClick={() => handleSetActiveLink("/")}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className={`font-normal block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                    location.pathname.includes("/shop") ||
                    activeLink === "/shop"
                      ? "text-[#BFAE9F]"
                      : "text-dark-textcolor2"
                  } md:dark:text-[#BFAE9F]`}
                  onClick={() => handleSetActiveLink("/shop")}
                >
                  SHOP
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`font-normal block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                    location.pathname === "/blog" || activeLink === "/blog"
                      ? "text-[#BFAE9F]"
                      : "text-dark-textcolor2"
                  } md:dark:text-[#BFAE9F]`}
                  onClick={() => handleSetActiveLink("/blog")}
                >
                  BLOG
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className={`font-normal block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                    location.pathname.includes("/events") ||
                    activeLink === "/events"
                      ? "text-[#BFAE9F]"
                      : "text-dark-textcolor2"
                  } md:dark:text-[#BFAE9F]`}
                  onClick={() => handleSetActiveLink("/events")}
                >
                  EVENTS
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`font-normal block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                    location.pathname === "/about" || activeLink === "/about"
                      ? "text-[#BFAE9F]"
                      : "text-dark-textcolor2"
                  } md:dark:text-[#BFAE9F]`}
                  onClick={() => handleSetActiveLink("/about")}
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`font-normal block py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                    location.pathname === "/contact" ||
                    activeLink === "/contact"
                      ? "text-[#BFAE9F]"
                      : "text-dark-textcolor2"
                  } md:dark:text-[#BFAE9F]`}
                  onClick={() => handleSetActiveLink("/contact")}
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
