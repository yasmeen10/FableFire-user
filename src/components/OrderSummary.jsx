import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { OrderSummaryContext } from "../context/OrderSummaryContext";

export default function OrderSummary(props) {
  const { button, onClick, to } = props;
  const { shoppingItemData } = useContext(OrderSummaryContext);

  const totalAmount = useMemo(
    () =>
      shoppingItemData.reduce(
        (total, item) => total + item.item.price * item.quantity,
        0
      ),
    [shoppingItemData]
  );
  return (
    <div className="border rounded-lg border-landing text-textcolor2 font-medium  flex flex-col p-10 h-fit">
      <h1>Order Summary</h1>
      {shoppingItemData.map((shoppingItem) => (
        <div
          key={shoppingItem._id}
          className="text-base flex items-center justify-between border-b border-b-gray2 py-3 mt-5"
        >
          <span>{shoppingItem.item.title}</span>
          <span>${shoppingItem.item.price * shoppingItem.quantity}</span>
        </div>
      ))}

      <div className="text-base py-3 flex items-center justify-between">
        <span>Total</span>
        <span>${totalAmount}</span>
      </div>
      <button
        className="bg-button border border-transparent rounded mt-5 py-3 font-medium text-white text-base transition-all hover:bg-transparent hover:border-button hover:text-button "
        onClick={onClick}
      >
        <Link to={to}>{button}</Link>
      </button>
    </div>
  );
}
