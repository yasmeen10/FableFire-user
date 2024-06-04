import { useContext, useEffect } from "react";
import OrderSummary from "../../components/OrderSummary";
import ShoppingCart from "../../components/ShoppingCart";
import Stepper from "../../components/Stepper";
import axiosInstance from "../../../interceptor";
import { OrderSummaryContext } from "../../context/OrderSummaryContext";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Cart() {
  const { shoppingItemData, setShoppingItemData } =
    useContext(OrderSummaryContext);

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
    <Navbar/>
    <div className="px-4 sm:px-8 lg:px-36 ">
      <Stepper />
      <h1 className=" my-10 text-textcolor2 font-medium text-center sm:text-left">
        Shopping Cart
      </h1>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-9">
        {shoppingItemData.length === 0 ? (
          <h1>Cart is Empty</h1>
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
    <Footer/>
    </>
  );
}
