import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { item } = props;
  const { handleRemoveItem, handleAddTocart, shoppingItemData } = useContext(CartContext);
  const { wishlist, toggleWishlistItem } = useContext(WishlistContext);

  const [isCartFilled, setIsCartFilled] = useState(false);

  useEffect(() => {

    const index = shoppingItemData.findIndex((cartItem) => cartItem.item && cartItem.item._id === item._id);
    if (index !== -1) {
      setIsCartFilled(true);
    }
  }, [shoppingItemData, item?._id]);

  const handletoggleCartIcon = async () => {
    try {
      if (!item || !item._id) {
        console.warn('Item is undefined or missing _id for toggling cart icon:', item);
        return;
      }

      if (isCartFilled) {
        const index = shoppingItemData.findIndex((cartItem) => cartItem.item && cartItem.item._id === item._id);
        if (index !== -1) {
          setIsCartFilled(false);
          await handleRemoveItem(shoppingItemData[index]._id);
        }
      } else {
        await handleAddTocart(item);
        setIsCartFilled(true);
      }
    } catch (error) {
      console.log("Error toggling cart icon:", error);
    }
  };

  const isHeartFilled = wishlist.some((wishListItem) => wishListItem._id === item._id);

  const toggleHeartIcon = async () => {
    await toggleWishlistItem(item);
  };

  if (!item || !item._id) {
    return <div className="text-center text-red-500">Item data is missing or invalid.</div>;
  }

  return (
      <div className="flex items-center justify-center p-2 relative">
        <div className="bg-white rounded-lg flex-col w-40 overflow-hidden">
          <div className="relative">
            <img
              className="w-60 h-60 rounded-t-lg object-cover transition-transform duration-300 transform hover:scale-105"
              src={item.images[0]}
              alt={item.title}
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
              <div className="flex items-center justify-center">
                <div
                  className="rounded-full bg-black p-2 mr-2 cursor-pointer"
                  onClick={handletoggleCartIcon}
                >
                  <i
                    className={`fas fa-cart-shopping ${isCartFilled ? "text-button" : "text-white"}`}
                  ></i>
                </div>
                <div
                  className="rounded-full bg-black p-2 cursor-pointer"
                  onClick={toggleHeartIcon}
                >
                  <i className={`${isHeartFilled ? "fas text-red-500" : "fas text-white"} fa-heart`}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-2">
            <Link to={`/item/${item._id}`}>
              <h5 className="text-lg font-bold textColor2 text-center">{item.title}</h5>
              <div className="flex items-center justify-center mt-2.5">
                <p className="text-sm font-medium" style={{ color: "#A68877" }}>
                  {item.price + "$"}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
}