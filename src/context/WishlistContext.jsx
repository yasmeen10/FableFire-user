import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { isLoggedIn } = useAuth();
  const [rendeList, setRendeerList] = useState(false);

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
        if (error.response.status == 401) {
          console.log(error.response.data.message);
          return;
        }
        toast.error(error.response.data.message);
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
      console.log(error);
      toast.error("Something Went Wrong Please try again");
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
