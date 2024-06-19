import { useContext, useEffect } from "react";
import OrderSummary from "../../components/OrderSummary";
import ShoppingCart from "../../components/ShoppingCart";
import Stepper from "../../components/Stepper";
import axiosInstance from "../../../interceptor";
import { CartContext } from "../../context/CartContext";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Cart() {
  const { shoppingItemData, setShoppingItemData } = useContext(CartContext);

  useEffect(() => {
    async function fetchShoppingItemData() {
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/shoppingItem"
      );
      setShoppingItemData(data.data);
    }
    fetchShoppingItemData();
  }, [setShoppingItemData]);
  const handleClick = () => {};

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-8 lg:px-36 ">
        <Stepper />
        <h1 className=" my-10 text-textcolor2 font-medium text-center sm:text-left">
          Shopping Cart
        </h1>
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-9">
          {shoppingItemData.length === 0 ? (
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center justify-between p-2">
                <div className="skeleton h-36 w-1/5 rounded-md"></div>
                <div className="flex items-center justify-between ml-2 w-4/5 rounded-md">
                  <div className="skeleton h-6 w-48 rounded-md"></div>
                  <div className="skeleton h-6 w-40 rounded-md"></div>
                  <div className="skeleton h-6 w-20 rounded-md"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-1 lg:col-span-2">
              {shoppingItemData.map((shoppingItem) => (
                <ShoppingCart
                  key={shoppingItem._id}
                  shoppingItem={shoppingItem}
                />
              ))}
            </div>
          )}
          <OrderSummary
            onClick={handleClick}
            button={"Proceed to checkout"}
            to={"/checkout"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
