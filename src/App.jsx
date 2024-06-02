import React, { useState, useEffect } from "react";
import Shop from "./pages/Shop/Shop";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
// import { Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);

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
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/shop" element={<Shop/>} />
        <Route path="/item/:id" element={<ItemDetails/>}/>
        
      </Routes>
    </BrowserRouter>
  </div>

  );
}

export default App;
