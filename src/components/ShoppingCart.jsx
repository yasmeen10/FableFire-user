import { useContext } from "react";
import CancelArrow from "./SVG/CancelArrow";
import { CartContext } from "../context/CartContext";

export default function ShoppingCart(props) {
  const { shoppingItem } = props;
  const { handleIncrementQuantity, handleDecrementQuantity, handleRemoveItem } =
    useContext(CartContext);

  return (
    <div>
      {shoppingItem.length === 0 ? (
        <div className="col-span-1 lg:col-span-2">
          <h1 className="text-textcolor2 font-medium text-center">
            Cart is Empty
          </h1>
        </div>
      ) : (
        <div className="text-textcolor2 text-base border-y border-y-landing font-medium flex items-center justify-between p-2">
          <div className="w-1/5">
            <img src={shoppingItem.item.images[0]} alt="Product" />
          </div>
          <div className="flex items-center justify-between ml-2 w-4/5">
            <p className="w-36">{shoppingItem.item.title}</p>
            <span>${shoppingItem.item.price}</span>
            <div className="w-20 border border-landing rounded-lg flex justify-around items-center">
              <button
                onClick={() => handleDecrementQuantity(shoppingItem._id)}
                disabled={shoppingItem.quantity <= 1}
                className={`${
                  shoppingItem.quantity <= 1 ? "text-gray1" : "text-textcolor2"
                }`}
              >
                -
              </button>
              <span>{shoppingItem.quantity}</span>
              <button
                onClick={() => handleIncrementQuantity(shoppingItem._id)}
                className="text-textcolor2"
              >
                +
              </button>
            </div>
            <span>${shoppingItem.item.price * shoppingItem.quantity}</span>
            <button
              onClick={() => {
                handleRemoveItem(shoppingItem._id);
              }}
            >
              <CancelArrow />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
