import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import { WishlistContext } from "../../context/WishlistContext"
import CardSkeleton from "../../components/CardSkeleton";
import axiosInstance from "../../../interceptor";

export default function WishList() {
  
  const [isLoading , setIsLoading] = useState(false);
  const { wishlist } = useContext(WishlistContext);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/wishList/"
      );
      const wishListData = data.data.wishList;

      setIsLoading(false)
      // setWishList(wishListData);
      console.log(wishlist);
    }
    fetchData();
  }, []);

  if(isLoading){
    return (
      <>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-20">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
      </>
    )
  }

  return (
    <>
      <h2 className="font-semibold text-textcolor2 text-xl pt-4">WishList</h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {wishlist.map((item) => {
          return <Card key={item._id} item={item} />;
        })}
      </div>
    </>
  );
}
