import React, { useState, useEffect } from "react";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import UserProfile from "./pages/profile/UserProfile";
import Home from "./pages/Home/Home";
import ProfileData from "./pages/profile/ProfileData";
import WishList from "./pages/profile/WishList";

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

    <>
    <ToastContainer />
    <BrowserRouter>
       {/* <UserProfile/> */}

       <div className="bg-red-950 text-white">
        <Link to="/signIn">Sign In</Link>
       </div>

       <Routes>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/" element={<Home/>}/>
       

        <Route path="/profile" element={<UserProfile/>}>
          <Route index  element={<ProfileData/>} />
          <Route path="wishList" element={<WishList/>} />
          
          
        </Route>
       </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
