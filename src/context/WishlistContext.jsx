import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [rendeList, setRendeerList] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3005/api/v1/wishList"
        );
        setWishlist(
          Array.isArray(response.data.data.wishList)
            ? response.data.data.wishList
            : []
        );
      } catch (error) {
        console.error(
          "Error fetching wishlist items:",
          error.response ? error.response.data : error.message
        );
      }
    };
    if (isLoggedIn) {
      fetchWishlist();
    }
  }, [rendeList]);

  const toggleWishlistItem = async (item) => {
    try {
      await axiosInstance.post("http://localhost:3005/api/v1/wishList/", {
        _id: item._id,
      });
      setRendeerList((prev) => !prev);
    } catch (error) {
      navigate("/signIn");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlistItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
