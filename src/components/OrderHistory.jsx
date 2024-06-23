import React, { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import DetailsSVG from "./SVG/DetailsSVG";
import { useNavigate } from "react-router-dom";
import OrderProfileSkeleton from "./OrderProfileSkeleton";

export default function OrderHistory() {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/order/"
      );
      const orderData = await data.data;
      setIsLoading(false)
      setOrder(orderData);
      console.log(data.data);
    }
    fetchData();
  }, []);

  const showOrderDetails = async (id) => {
    const { data } = await axiosInstance.get(
      `http://localhost:3005/api/v1/order/${id}`
    );
    localStorage.setItem("orderDetailsId", id);
    navigate("/profile/orderProfile");
  };

  if (isLoading) {
    return (
      <>
        <OrderProfileSkeleton />
        <OrderProfileSkeleton />
      </>
    );
  }
  return (
    <>
      {order.map((ord, index) => (
        <div
          key={index}
          className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20"
        >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3  text-dark-textcolor1">
                  Date of Order : {ord.order.dateOfOrder.split("T")[0]}
                </th>
                <th className="">
                  <p
                    className=" cursor-pointer text-textcolor1 "
                    title="Order Details"
                    onClick={() => showOrderDetails(ord.order._id)}
                  >
                    More Details {">>"}
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {ord.orderItems.map((ordData, itemIndex) => (
                <tr
                  key={itemIndex}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="h-44 w-44 inline px-3 object-cover"
                      src={ordData.orderItem.item.images[0]}
                      alt=""
                    />
                  </th>
                  <td className="px-6 py-4">{ordData.orderItem.item.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
