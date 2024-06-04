import React, { useEffect, useState } from "react";
import axiosInstance from "../../../interceptor";

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
  return (
    <>
      <h2 className="font-semibold text-textcolor2 text-xl">WishList</h2>

      {wishList.map((item) => {
        return (
          <div className="w-56 max-w-sm bg-white rounded-lg mt-8" key={item.id}>
            <a href="#">
              <img
                className="h-56 px-5 rounded-t-lg"
                src="https://th.bing.com/th/id/OIG4.LgUj9FIjzUbdTSMn0mRg"
                alt="image item"
              />
            </a>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {item.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700">{item.price}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
