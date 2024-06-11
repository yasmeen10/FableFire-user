import { CartContext } from "../../context/CartContext";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../interceptor";
import { data } from "autoprefixer";

export default function Card(props) {
  const { item } = props;
  const { handleRemoveItem, handleAddTocart, shoppingItemData } =
    useContext(CartContext);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isCartFilled, setIsCartFilled] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const heartState = localStorage.getItem(`heartClicked-${item._id}`);
    if (heartState) {
      setIsHeartFilled(JSON.parse(heartState));
    }

    fetchWishlist();
  }, [item._id]);

  useEffect(() => {
    localStorage.setItem(
      `heartClicked-${item._id}`,
      JSON.stringify(isHeartFilled)
    );
  }, [isHeartFilled, item._id]);

  useEffect(() => {
    const index = shoppingItemData.findIndex(
      (cartItem) => cartItem.item && cartItem.item._id === item._id
    );
    if (index !== -1) {
      setIsCartFilled(true);
    }
  }, [shoppingItemData]);

  const handletoggleCartIcon = async () => {
    try {
      if (isCartFilled) {
        const index = shoppingItemData.findIndex(
          (cartItem) => cartItem.item && cartItem.item._id === item._id
        );
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

  
// const handleAddToWishList =async (id)=>{
//   const {data}=await axiosInstance.post("http://localhost:3005/api/v1/wishList/",id);
//  console.log(data);
// }

  useEffect(() => {
    const isInWishlist = wishlist.some(
      (wishListItem) => wishListItem._id === item._id
    );
    setIsHeartFilled(isInWishlist);
  }, [item._id, wishlist]);

  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3005/api/v1/wishList"
      );
      setWishlist(response.data.data.wishList);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  const toggleHeartIcon = async (id) => {
    const newIsHeartFilled = !isHeartFilled;
    if(wishlist.includes(id)){
      
    }
    setIsHeartFilled(newIsHeartFilled);

    try {
      if (newIsHeartFilled) {
        await axiosInstance.post("http://localhost:3005/api/v1/wishList/", {
          itemId: item._id,
          title: item.title,
          price: item.price,
          images: item.images,
        });
      } else {
        const updatedWishlist = wishlist.filter(
          (wishListItem) => wishListItem._id !== item_id
        );
        setWishlist(updatedWishlist);
      }

      fetchWishlist();
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

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
                className={`rounded-full bg-black p-2 mr-2 cursor-pointer`}
                onClick={handletoggleCartIcon}
              >
                <i
                  className={`fas fa-cart-shopping ${
                    isCartFilled ? "text-button" : "text-white"
                  }`}
                ></i>
              </div>
              <div
                className={`rounded-full bg-black p-2 cursor-pointer`}
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
            <div className="flex items-center justify-center mt-2.5">
              <div className="ml-4">
                <p className="text-sm font-medium" style={{ color: "#A68877" }}>
                  {item.price + "$"}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
