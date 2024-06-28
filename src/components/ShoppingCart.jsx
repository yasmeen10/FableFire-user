import { useContext, useState } from "react";
import CancelArrow from "./SVG/CancelArrow";
import { CartContext } from "../context/CartContext";
import CurrencyConverter from "./CurrencyConverter";
import fallbackImage from "../../public/imgError.png";

export default function ShoppingCart(props) {
  const { shoppingItem } = props;
  const { handleIncrementQuantity, handleDecrementQuantity, handleRemoveItem } =
    useContext(CartContext);
  const calculateDiscountPrice = (price, discount) => {
    return price - (price * discount) / 100;
    const [imageState, setImageState] = useState({
      loading: true,
      error: false,
    });

    const handleImageLoad = () => {
      setImageState({ loading: false, error: false });
    };

    const handleImageError = () => {
      setImageState({ loading: false, error: true });
    };
    return (
      <div>
        {!shoppingItem ? (
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
          <div className="text-textcolor2 text-base border-y border-y-landing font-medium flex items-center justify-between p-2">
            {imageState.loading && (
              <div className="skeleton z-10 h-60 w-56 rounded-lg"></div>
            )}
            {!imageState.loading && imageState.error && (
              <img
                src={fallbackImage}
                alt="Fallback"
                className="rounded-lg shadow-md relative z-10 w-56 h-60"
              />
            )}
            {!imageState.error && (
              <div className="w-1/5">
                <img
                  src={shoppingItem?.item?.images[0]}
                  alt="Product"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ display: imageState.loading ? "none" : "block" }}
                />
              </div>
            )}
            <div className="flex items-center justify-between ml-2 w-4/5">
              <p className="w-36">{shoppingItem?.item?.title}</p>
              <CurrencyConverter
                price={calculateDiscountPrice(
                  shoppingItem?.item?.price,
                  shoppingItem?.item?.discount
                )}
              >
                {({ localPrice, currency }) => (
                  <span>
                    {localPrice} {currency}
                  </span>
                )}
              </CurrencyConverter>
              <div className="w-20 border border-landing rounded-lg flex justify-around items-center">
                <button
                  onClick={() => handleDecrementQuantity(shoppingItem?._id)}
                  disabled={shoppingItem?.quantity <= 1}
                  className={`${
                    shoppingItem?.quantity <= 1
                      ? "text-gray1"
                      : "text-textcolor2"
                  }`}
                >
                  -
                </button>
                <span>{shoppingItem?.quantity}</span>
                <button
                  onClick={() => handleIncrementQuantity(shoppingItem?._id)}
                  disabled={
                    shoppingItem?.quantity >= shoppingItem?.item?.countInStock
                  }
                  className={`${
                    shoppingItem &&
                    shoppingItem?.quantity >= shoppingItem?.item?.countInStock
                      ? "text-gray1"
                      : "text-textcolor2"
                  }`}
                >
                  +
                </button>
              </div>
              <CurrencyConverter
                price={
                  calculateDiscountPrice(
                    shoppingItem?.item?.price,
                    shoppingItem?.item?.discount
                  ) * shoppingItem?.quantity
                }
              >
                {({ localPrice, currency }) => (
                  <span>
                    {localPrice} {currency}
                  </span>
                )}
              </CurrencyConverter>
              <button
                onClick={() => {
                  handleRemoveItem(shoppingItem?._id);
                }}
              >
                <CancelArrow />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
}
