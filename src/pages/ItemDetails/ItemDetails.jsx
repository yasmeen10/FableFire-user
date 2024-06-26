import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axiosInstance from "../../../interceptor";
import SuggestionSwiper from "../../components/SuggestionSwiper";
import Review from "./Review";
import Rating from "./Rating";
import { toast } from "react-toastify";
import CurrencyConverter from "../../components/CurrencyConverter";
import ReactStars from "react-rating-stars-component";
import fallbackImage from "../../../public/imgError.png";
 
export default function ItemDetails() {
  const { handleRemoveItem, handleAddToCart, shoppingItemData } =
    useContext(CartContext);
  const { wishlist, toggleWishlistItem } = useContext(WishlistContext);
  const [isCartFilled, setIsCartFilled] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [suggestionItems, setSuggestionItems] = useState([]);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState(0); // Initializing ratings as a number
  const [imageState, setImageState] = useState({ loading: true, error: false });
 
  const handleImageLoad = () => {
    setImageState({ loading: false, error: false });
  };
 
  const handleImageError = () => {
    setImageState({ loading: false, error: true });
  };
  useEffect(() => {
    const index = shoppingItemData.findIndex(
      (cartItem) => cartItem.item && cartItem.item._id === item?._id
    );
 
    if (index !== -1) {
      setIsCartFilled(true);
    }
  }, [shoppingItemData, item]);
 
  const handletoggleCartIcon = async (item) => {
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
 
  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setError("Item ID is undefined");
        return;
      }
 
      try {
        const response = await axiosInstance.get(
          `http://localhost:3005/api/v1/item/${id}`
        );
        if (response.data && response.data.item) {
          setItem(response.data.item);
          setSuggestionItems(response.data.suggestionItems);
        } else {
          toast.error("Something Went Wrong Please try again");
          setError("Unexpected response format");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setError("Error fetching item. Please try again later.");
      }
    };
 
    fetchItem();
  }, [id]);
 
  useEffect(() => {
    if (wishlist.some((wishlistItem) => wishlistItem._id === id)) {
      setIsHeartClicked(true);
    } else {
      setIsHeartClicked(false);
    }
  }, [wishlist, id]);
 
  const handleHeartClick = () => {
    toggleWishlistItem(item);
    setIsHeartClicked(!isHeartClicked);
  };
 
  const fetchRatings = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(
        `http://localhost:3005/api/v1/rating/${id}`
      );
      setRatings(data.itemRate);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [id]);
 
  useEffect(() => {
    fetchRatings();
  }, [ratings]);
 
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-4xl bg-white">
          <button
            onClick={() => navigate("/shop")}
            className="textColor2 underline font-semibold mb-8"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            To Category
            <i className="fa-solid fa-arrow-left-long ml-2"></i>
          </button>
          {!item ? (
            <div className="flex flex-col md:flex-row">
              <div
                className="md:w-1/3 flex justify-center relative"
                style={{ marginRight: "40px" }}
              >
                <div className="skeleton h-96 w-96 rounded-lg relative"></div>
              </div>
              <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
                <div className="skeleton h-8 w-48 rounded-lg mb-6"></div>
                <div className="flex items-center justify-between mb-6">
                  <div className="skeleton h-8 w-48 rounded-lg"></div>
                  <div className="skeleton h-8 w-48 rounded-lg"></div>
                </div>
                <div className="skeleton h-8 w-48 rounded-lg mb-6"></div>
                <div className="flex items-center">
                  <div className="skeleton h-8 w-48 rounded-lg mr-4"></div>
                  <div className="skeleton h-8 w-48 rounded-lg"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              <div
                className="md:w-1/3 flex justify-center relative"
                style={{ marginRight: "40px" }}
              >
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mr-6"
                  style={{ background: "#E1DDDD" }}
                ></div>
                {imageState.loading && (
                  <div className="skeleton z-10 h-96 w-96 rounded-lg"></div>
                )}
                {!imageState.loading && imageState.error && (
                  <img
                    src={fallbackImage}
                    alt="Fallback"
                    className="rounded-lg shadow-md relative z-10 w-96 h-96"
                  />
                )}
                {!imageState.error && (
                  <img
                    src={item?.images[0]}
                    alt={item?.title}
                    className="rounded-lg shadow-md relative z-10 w-96 h-96"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ display: imageState.loading ? "none" : "block" }}
                  />
                )}
              </div>
              <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
                <div className="flex items-center justify-between mb-6">
                  <h1
                    className="text-[56px] mb-2 capitalize"
                    style={{ fontFamily: "Ropa Sans, sans-serif" }}
                  >
                    {item.title}
                  </h1>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-[24px] text-gray-900 font-bold capitalize"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    <span style={{ color: "#A68877" }}>By</span>{" "}
                    {item.authorId.name}
                  </h2>
 
                  <CurrencyConverter price={item.price}>
                    {({ localPrice, currency }) => (
                      <div className="flex items-center justify-center mt-2.5">
                        {item?.discount > 0 ? (
                          <>
                            <span className="text-sm font-medium line-through text-red-500">
                              {localPrice} {currency}
                            </span>
                            <p
                              className="text-sm font-medium ml-2"
                              style={{ color: "#A68877" }}
                            >
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
                </div>
                {item?.countInStock < 6 ? (
                  <div className="mb-6 text-base font-medium text-placeholder">
                    <span>Count In Stock:</span>
                    <span className="ml-1">{item?.countInStock}</span>
                  </div>
                ) : null}
 
                <p
                  className="textcolor2 mb-6 italic text-base capitalize"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  {item?.description}
                </p>
                <div className="flex items-center">
                  <i
                    className={`far fa-heart mr-4 text-button ${
                      isHeartClicked ? "fas fa-heart" : "far fa-heart"
                    }`}
                    style={{ fontSize: "25px", cursor: "pointer" }}
                    onClick={handleHeartClick}
                  ></i>
                  <button
                    onClick={() => handletoggleCartIcon(item)}
                    className={`${
                      item.countInStock === 0 &&
                      "opacity-50 cursor-not-allowed pointer-events-none"
                    } ${
                      isCartFilled
                        ? "bg-transparent text-button border-button"
                        : "bg-button text-white"
                    } px-6 py-2 border rounded-[4px] flex items-center transition-all hover:bg-transparent hover:border-button hover:text-button `}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="mt-4">
            <p className="font-medium m-2"> Customer Review & Rating</p>
            <div className="flex flex-col md:flex-row gap-4 ">
              <Rating />
              <hr className="md:rotate-90 md:mt-20 md:w-28 w-full h-px" />
              <Review />
            </div>
          </div>
          <SuggestionSwiper suggestionItems={suggestionItems} />
        </div>
      </div>
      <Footer />
    </>
  );
}