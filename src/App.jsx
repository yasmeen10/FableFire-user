import React, { useState, useEffect } from "react";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import { ToastContainer } from "react-toastify";
import UserProfile from "./pages/profile/UserProfile";
import Home from "./pages/Home/Home";
import ProfileData from "./pages/profile/ProfileData";
import WishList from "./pages/profile/WishList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <ToastContainer />

      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orderconfirmation" element={<OrderConfirmation />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>

    // <div
    //   className={`bg-sidebar text-textcolor1 dark:bg-gray-900 dark:text-gray-100 min-h-screen`}
    // >
    //   <header className="p-4 bg-landing dark:bg-gray-800">
    //     <h1 className="text-xl font-bold">App</h1>
    //     <button
    //       className="ml-auto bg-button text-white dark:bg-gray1 px-4 py-2 rounded"
    //       onClick={() => setDarkMode(!darkMode)}
    //     >
    //       Toggle Dark Mode
    //     </button>
    //   </header>
    // </div>
  );
}

export default App;
