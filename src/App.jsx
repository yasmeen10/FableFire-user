import Navbar from "./components/Navbar";
import About from "./pages/AboutUs/About";
import ContactUs from "./pages/ContactUs/ContactUs";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import Shop from "./pages/Shop/Shop";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import { ToastContainer } from "react-toastify";
import UserProfile from "./pages/profile/UserProfile";
import Home from "./pages/Home/Home";
import ProfileData from "./pages/profile/ProfileData";
import WishList from "./pages/profile/WishList";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import OrderProfile from "./pages/profile/OrderProfile";
import Blog from "./pages/Blog/Blog";
import UsedItemDetails from "./pages/UsedItemDetails/UsedItemDetails";
import UsedItemForm from "./pages/UsedItemForm/UsedItemForm";
import ProfileOrdersHistory from "./pages/profile/ProfileOrdersHistory";
import ProtectedRoute from "./utils/ProtectedRoute";
import RedirectToHome from "./utils/RedirectToHome";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events/Events";
import EventDetails from "./pages/EventDetails/EventDetails";
import Ticket from "./pages/Ticket/Ticket";
import TicketProfile from "./pages/profile/TicketProfile";
import PostsProfile from "./pages/profile/PostsProfile";

function App() {
  // const [darkMode, setDarkModez] = useState(false);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);

  return (
    <>
      <ToastContainer />

      <div>
        {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:categoryId" element={<Shop />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/usedItemDetails/:id" element={<UsedItemDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orderconfirmation" element={<OrderConfirmation />} />
            <Route path="/usedItem/create" element={<UsedItemForm />} />
            <Route path="/usedItem/:id" element={<UsedItemForm />} />
            <Route path="/ticket" element={<Ticket />} />

            <Route path="/profile" element={<UserProfile />}>
              <Route index element={<ProfileData />} />
              <Route path="wishList" element={<WishList />} />
              <Route path="orderProfile" element={<OrderProfile />} />
              <Route path="orderProfileHistory" element={<ProfileOrdersHistory />} />
              <Route path="ticket" element={<TicketProfile/>}/>
              <Route path="posts" element={<PostsProfile/>}/>
            </Route>
          </Route>

          <Route element={<RedirectToHome />}>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </BrowserRouter> */}
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
