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

  const handleAddToCart = async(item)=>{
  const items= await axiosInstance.post("http://localhost:3005/api/v1/shoppingItem",item);
  console.log(items);
  }
  return (
    <>
      <h2 className="font-semibold text-textcolor2 text-xl">WishList</h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {wishList.map((item) => {
          return (
            <div className="max-w-sm  bg-white rounded-lg mt-8">
              <a href="#">
                <img
                  className=" w-full object-cover rounded-t-lg"
                  src={item.images}
                  alt="image item"
                />
              </a>
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {item.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700">{item.price}</p>
                <button
                  onClick={()=>handleAddToCart(item._id)}

                  className="block text-white mt-3 bg-dark-button rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
