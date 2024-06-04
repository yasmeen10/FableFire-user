import React, { useEffect, useState } from "react";
import axiosInstance from "../../../interceptor";
import Card from "../../components/Card/Card";

export default function WishList() {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/wishList/"
      );
      const wishListData = data.data.wishList;

      setWishList(wishListData);
    }
    fetchData();
  }, []);

  // const handleAddToCart = async(item)=>{
  // const items= await axiosInstance.post("http://localhost:3005/api/v1/shoppingItem",item);
  // console.log(items);
  // }
  return (
    <>
      <h2 className="font-semibold text-textcolor2 text-xl">WishList</h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {wishList.map((item) => {
          return (
           <Card key={item._id} {...item} />
          );
        })}
      </div>
    </>
  );
}
