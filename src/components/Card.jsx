import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import CurrencyConverter from "./CurrencyConverter";
import fallbackImage from "../../public/imgError.png";

export default function Card(props) {
  const { item } = props;
  const { handleRemoveItem, handleAddToCart, shoppingItemData } =
    useContext(CartContext);
  const { wishlist, toggleWishlistItem } = useContext(WishlistContext);

  const [isCartFilled, setIsCartFilled] = useState(false);
  const [imageState, setImageState] = useState({ loading: true, error: false });

  const handleImageLoad = () => {
    setImageState({ loading: false, error: false });
  };

  const handleImageError = () => {
    setImageState({ loading: false, error: true });
  };
  useEffect(() => {
    if (item?._id) {
      const index = shoppingItemData.findIndex(
        (cartItem) => cartItem.item && cartItem.item._id === item._id
      );
      setIsCartFilled(index !== -1);
    }
  }, [shoppingItemData, item?._id]);

  const handleToggleCartIcon = async () => {
    if (isCartFilled) {
      const index = shoppingItemData.findIndex(
        (cartItem) => cartItem.item && cartItem.item._id === item._id
      );
      if (index !== -1) {
        setIsCartFilled(false);
        await handleRemoveItem(shoppingItemData[index]._id);
      }
    } else {
      await handleAddToCart(item);
      setIsCartFilled(true);
    }
  };

  const isHeartFilled = wishlist.some(
    (wishListItem) => wishListItem._id === item._id
  );

  const toggleHeartIcon = async () => {
    await toggleWishlistItem(item);
  };

  if (!item || !item._id) {
    return (
      <div className="text-center text-red-500">
        Item data is missing or invalid.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg flex-col w-40 overflow-hidden">
      <div className="relative">
        {imageState.loading && (
          <div className="skeleton z-10 w-60 h-60 rounded-lg"></div>
        )}
        {!imageState.loading && imageState.error && (
          <img
            src={fallbackImage}
            alt="Fallback"
            className="rounded-lg shadow-md relative z-10 w-60 h-60"
          />
        )}
        {!imageState.error && (
          <img
            className="w-60 h-60 rounded-t-lg object-cover transition-transform duration-300 transform hover:scale-105"
            src={item.images[0]}
            alt={item.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageState.loading ? "none" : "block" }}
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
          <div className="flex items-center justify-center">
            <button
              className={`rounded-full bg-black p-2 mr-2 ${
                item.countInStock === 0
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : "cursor-pointer"
              }`}
              onClick={item.countInStock > 0 ? handleToggleCartIcon : undefined}
              disabled={item.countInStock === 0}
            >
              <i
                className={`fas fa-cart-shopping ${
                  item.countInStock === 0
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : ""
                } ${isCartFilled ? "text-button" : "text-white"}`}
              ></i>
            </button>

            <div
              className="rounded-full bg-black p-2 cursor-pointer"
              onClick={toggleHeartIcon}
            >
              <i
                className={`${
                  isHeartFilled ? "fas text-red-500" : "fas text-white"
                } fa-heart`}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-2">
        <Link to={`/item/${item._id}`}>
          <h5 className="text-lg font-bold textColor2 text-center">
            {item.title}
          </h5>
          <CurrencyConverter price={item.price}>
            {({ localPrice, currency }) => (
              <div className="flex items-center justify-center mt-2.5">
                {item.discount > 0 ? (
                  <>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#A68877" }}
                    >
                      {localPrice} {currency}
                    </span>
                    <p className="text-sm font-medium ml-2 text-red-500">
                      {`${(
                        localPrice -
                        localPrice * (item.discount / 100)
                      ).toFixed(2)} ${currency}`}
                    </p>
                  </>
                ) : (
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#A68877" }}
                  >
                    {localPrice} {currency}
                  </span>
                )}
              </div>
            )}
          </CurrencyConverter>

          {item.discount > 0 && (
            <div className="text-center text-green-500 font-bold">
              {item.discount}% OFF
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}
