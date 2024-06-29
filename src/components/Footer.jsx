import React from "react";
import styles from "./Footer.module.css";
import fablefire from "../assets/FableFire-logo.png";

export default function Footer() {
  return (
    <div>
      <div className="w-full lg:h-[250px] md:h-[420px] sm:h-[600px] bg-[#D6CCC2] mt-32 py-6">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 ml-[px]">
          <div>
            <img className="w-[174px] h-[53px] ml-24 " src={fablefire} />
            <p className="font-semibold ml-24 mt-9 text-[#210F04]">
              Subscribe Now
            </p>
            <div className="relative z-0 w-[200px] mb-5 group grid grid-cols-2">
              <svg
                className="w-6 h-6 text-[#210F04] dark:text-white mt-4 ml-24"
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
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="w-44 mt-2 mr-4 block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#210F04] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#BFAE9F] focus:outline-none focus:ring-0 focus:border-[##BFAE9F] peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_last_name"
                className="ml-32 mt-1 peer-focus:font-medium absolute text-sm text-[#BFAE9F]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#BFAE9F] peer-focus:dark:text-[#BFAE9F] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
              <button
                type="submit"
                className="ml-24 mt-3 text-white bg-[#A68877] hover:bg-[#B99885] focus:ring-4 focus:outline-none font-medium rounded-xl text-sm text-center w-[110px] h-[28px]"
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="ml-28 mt-3">
            <h1 className="text-[24px] font-medium text-[#210F04]">
              Information
            </h1>
            <ul className="mt-9 font-medium text-[#210F04]">
              <li>about us</li>
              <li>more search</li>
              <li>blog</li>
              <li>events</li>
            </ul>
          </div>

          <div className="ml-28 lg:ml-20 lg:mt-3 md:ml-0 md:mt-3 sm:ml-24 sm:mt-3">
            <h1 className="text-[24px] font-medium text-[#210F04]">
              Help Links
            </h1>
            <ul className="mt-9 font-medium text-[#210F04]">
              <li>services</li>
              <li>supports</li>
              <li>terms & condition</li>
              <li>privacy policy</li>
            </ul>
          </div>

          <div className="ml-28 lg:ml-9 lg:mt-3 md:ml-[100px] sm:ml-[110px]">
            <h1 className="text-[24px] font-medium text-[#210F04]">
              Our Services
            </h1>
            <ul className="mt-9 font-medium text-[#210F04]">
              <li>book list</li>
              <li>order</li>
              <li>return & exchange</li>
              <li>blog</li>
            </ul>
          </div>

          <div className="ml-28 lg:mt-3 lg:ml-0 md:ml-[110px] sm:ml-[90px] md:mt-[0] sm:mt-[40px]">
            <h1 className="text-[24px] font-medium text-[#210F04]">
              Contact Us
            </h1>
            <ul className="flex mt-9">
              <li>
                <svg
                  className="w-6 h-6 text-[#210F04] dark:text-white "
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
              <li className="ml-2 font-medium text-[#210F04]">
                youremailid.com
              </li>
            </ul>
            <ul className="flex mt-2">
              <li>
                <svg
                  className="w-6 h-6 text-[#210F04] dark:text-white "
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
              <li className="ml-1 font-medium text-[#210F04]">+24 33 54 129</li>
            </ul>
            <ul className="flex mt-2">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                >
                  <path d="M 24 3 C 12.413593 3 3 12.413593 3 24 C 3 34.518693 10.751318 43.250215 20.859375 44.767578 A 1.0001 1.0001 0 0 0 22.007812 43.777344 L 21.998047 29.257812 A 1.0001 1.0001 0 0 0 20.998047 28.257812 L 17.050781 28.257812 L 17.050781 25 L 21 25 A 1.0001 1.0001 0 0 0 22 24.001953 L 22.009766 20.548828 A 1.0001 1.0001 0 0 0 22.009766 20.546875 C 22.009766 17.813283 22.664153 16.021513 23.742188 14.900391 C 24.820221 13.779268 26.413546 13.212891 28.644531 13.212891 C 30.407432 13.212891 31.082344 13.318081 31.746094 13.398438 L 31.746094 16.048828 L 29.464844 16.048828 C 28.127305 16.048828 27.020734 16.798902 26.451172 17.792969 C 25.88161 18.787035 25.707031 19.968948 25.707031 21.169922 L 25.697266 23.996094 A 1.0001 1.0001 0 0 0 26.697266 25 L 31.521484 25 L 31.017578 28.257812 L 26.697266 28.257812 A 1.0001 1.0001 0 0 0 25.697266 29.257812 L 25.705078 39.820312 A 1.0001 1.0001 0 1 0 27.705078 39.818359 L 27.697266 30.257812 L 31.873047 30.257812 A 1.0001 1.0001 0 0 0 32.861328 29.410156 L 33.675781 24.152344 A 1.0001 1.0001 0 0 0 32.6875 23 L 27.701172 23 L 27.707031 21.173828 A 1.0001 1.0001 0 0 0 27.707031 21.169922 C 27.707031 20.186896 27.889312 19.307543 28.1875 18.787109 C 28.485688 18.266676 28.759382 18.048828 29.464844 18.048828 L 32.746094 18.048828 A 1.0001 1.0001 0 0 0 33.746094 17.048828 L 33.746094 12.460938 A 1.0001 1.0001 0 0 0 32.880859 11.46875 C 32.309569 11.39152 30.9987 11.212891 28.644531 11.212891 C 26.061517 11.212891 23.837247 11.915795 22.300781 13.513672 C 20.764316 15.111549 20.009766 17.488467 20.009766 20.546875 L 20.001953 23 L 16.050781 23 A 1.0001 1.0001 0 0 0 15.050781 24 L 15.050781 29.257812 A 1.0001 1.0001 0 0 0 16.050781 30.257812 L 20 30.257812 L 20.007812 42.507812 C 11.444474 40.66482 5 33.124885 5 24 C 5 13.494407 13.494407 5 24 5 C 34.505593 5 43 13.494407 43 24 C 43 33.632476 35.849872 41.573188 26.572266 42.828125 A 1.0001994 1.0001994 0 1 0 26.839844 44.810547 C 37.094237 43.423484 45 34.623524 45 24 C 45 12.413593 35.586407 3 24 3 z"></path>
                </svg>
              </li>
              <li className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                >
                  <path d="M 15 4 C 8.9365932 4 4 8.9365932 4 15 L 4 33 C 4 39.063407 8.9365932 44 15 44 L 33 44 C 39.063407 44 44 39.063407 44 33 L 44 15 C 44 8.9365932 39.063407 4 33 4 L 15 4 z M 15 6 L 33 6 C 37.982593 6 42 10.017407 42 15 L 42 33 C 42 37.982593 37.982593 42 33 42 L 15 42 C 10.017407 42 6 37.982593 6 33 L 6 15 C 6 10.017407 10.017407 6 15 6 z M 35 11 C 33.895 11 33 11.895 33 13 C 33 14.105 33.895 15 35 15 C 36.105 15 37 14.105 37 13 C 37 11.895 36.105 11 35 11 z M 24 14 C 18.488666 14 14 18.488666 14 24 C 14 29.511334 18.488666 34 24 34 C 29.511334 34 34 29.511334 34 24 C 34 18.488666 29.511334 14 24 14 z M 24 16 C 28.430666 16 32 19.569334 32 24 C 32 28.430666 28.430666 32 24 32 C 19.569334 32 16 28.430666 16 24 C 16 19.569334 19.569334 16 24 16 z"></path>
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
