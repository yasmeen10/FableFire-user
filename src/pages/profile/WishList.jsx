import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import { WishlistContext } from "../../context/WishlistContext";
import CardSkeleton from "../../components/CardSkeleton";
import axiosInstance from "../../../interceptor";
import FavouriteSVG from "../../components/SVG/FavouriteSVG.jsx";

export default function WishList() {
  const [isLoading, setIsLoading] = useState(false);
  const { wishlist } = useContext(WishlistContext);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/wishList/"
      );
      const wishListData = data.data.wishList;

      setIsLoading(false);
     
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-20">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="font-semibold text-textcolor2 text-xl py-4">WishList</h2>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <FavouriteSVG className="w-12 h-12 mb-4" />
          <h1 className="text-textcolor1 text-4xl text-center">
            No items in your wishlist.
          </h1>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {wishlist.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
