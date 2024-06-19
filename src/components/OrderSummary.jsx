import { useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";

export default function OrderSummary(props) {
  const { button, onClick, to } = props;
  const { shoppingItemData } = useContext(CartContext);
  const { orderDetails } = useContext(OrderContext);
  const location = useLocation();
  let itemsToDisplay;

  if (location.pathname === "/cart" || location.pathname === "/checkout") {
    itemsToDisplay = shoppingItemData;
  } else {
    itemsToDisplay = orderDetails?.orderItems;
  }

  if (!itemsToDisplay && shoppingItemData.length === 0) {
    return (
      <div className="border rounded-lg border-landing flex flex-col p-10 h-fit">
        <h1>Order Summary</h1>
        <div className="flex items-center justify-between border-b border-b-gray2 py-3 mt-5">
          <div className="skeleton w-3/5 h-6 rounded-md"></div>
          <div className="skeleton w-4/12 h-6 rounded-md"></div>
        </div>
        <div className="py-3 flex items-center justify-between">
          <div className="skeleton w-3/5 h-6 rounded-md"></div>
          <div className="skeleton w-4/12 h-6 rounded-md"></div>
        </div>
        <button className="bg-button border border-transparent rounded mt-5 py-3 font-medium text-white text-base transition-all opacity-50 cursor-not-allowed">
          {button}
        </button>
      </div>
    );
  }

  const totalAmount = useMemo(
    () =>
      itemsToDisplay?.reduce(
        (total, item) => total + item.item.price * item.quantity,
        0
      ),
    [itemsToDisplay]
  );

  return (
    <div className="border rounded-lg border-landing text-textcolor2 font-medium flex flex-col p-10 h-fit">
      <h1>Order Summary</h1>
      {itemsToDisplay?.map((item) => (
        <div
          key={item._id}
          className="text-base flex items-center justify-between border-b border-b-gray2 py-3 mt-5 capitalize"
        >
          <span>{item?.item?.title}</span>
          <span>${item?.item?.price * item?.quantity}</span>
        </div>
      ))}

      <div className="text-base py-3 flex items-center justify-between">
        <span>Total</span>
        <span>${totalAmount}</span>
      </div>
      <button
        className={`bg-button border border-transparent rounded mt-5 py-3 font-medium text-white text-base transition-all ${
          shoppingItemData.length === 0 && location.pathname === "/cart"
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-transparent hover:border-button hover:text-button"
        }`}
        onClick={onClick}
        disabled={
          shoppingItemData.length === 0 && location.pathname === "/cart"
        }
      >
        <Link
          to={to}
          className={`${
            shoppingItemData.length === 0 && location.pathname === "/cart"
              ? "pointer-events-none"
              : ""
          } w-full h-full flex justify-center items-center`}
        >
          {button}
        </Link>
      </button>
    </div>
  );
}
