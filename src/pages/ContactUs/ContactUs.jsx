import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactUs() {
  return (
    <>
      <Navbar />
      <div>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:ml-[190px] md:ml-[190px] ml-2 ">
          <form className="max-w-sm mt-[88px]">
            <h1 className="text-[32px] text-[#210F04] font-semibold ">
              Contact Us
            </h1>
            <p className="w-[320px] text-[#735F39] mt-[15px]">
              feel free to contact us any time. we will get back to you as we
              can!
            </p>
            <div className="mb-5 mt-[25px]">
              <input
                type="name"
                id="name"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  dark:placeholder-[#735F39] "
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-[#735F39]  "
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="message"
                id="message"
                placeholder="Message"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:placeholder-[#735F39] "
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-[#A68877] hover:bg-[#B99885] focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center w-[385px]"
            >
              Send
            </button>
          </form>

          <div className="bg-[#D6CCC2] h-[350px] w-96 p-4 rounded-md mt-[100px]">
            <h1 className="text-[32px] text-[#210F04] font-semibold ml-7 mt-5">
              Info
            </h1>
            <ul className="flex ml-14">
              <li>
                <svg
                  className="w-6 h-6 text-[#210F04] dark:text-white mt-9"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
              </li>
              <li>
                <p className="mt-9 ml-10 text-[#210F04]">FableFire@gmail.com</p>
              </li>
            </ul>

            <ul className="flex ml-14">
              <li>
                <svg
                  className="w-6 h-6 text-[#210F04] dark:text-white mt-7"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                </svg>
              </li>
              <li>
                <p className="mt-7 ml-10 text-[#210F04]">+24 33 54 129</p>
              </li>
            </ul>

            <ul className="flex ml-14">
              <li>
                <svg
                  className="w-6 h-6 text-[#210F04] dark:text-white mt-7"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"
                  />
                </svg>
              </li>
              <li>
                <p className="mt-7 ml-10 text-[#210F04]">14 city center st.</p>
              </li>
            </ul>

            <ul className="flex ml-14">
              <li>
                <svg
                  className="w-6 h-6 text-[#210F04] dark:text-white mt-7"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </li>
              <li>
                <p className="mt-7 ml-10 text-[#210F04]">09:00 - 18:00</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
