import React, { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import DetailsSVG from "./SVG/DetailsSVG";
import { useNavigate } from "react-router-dom";
import OrderProfileSkeleton from "./OrderProfileSkeleton";
import OrderProfileSVG from "./SVG/OrderProfileSVG";

export default function OrderHistory() {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try{

        setIsLoading(true);
        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/order/"
        );
       
        
        setIsLoading(false)
        setOrder(data.data);
      
      }catch(error){
        console.log(error);
      }
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
  
  {order.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <OrderProfileSVG className="w-12 h-12 mb-4" />
          <h1 className="text-textcolor1 text-4xl text-center">
            User has No Order.
          </h1>
        </div>
      ) : (
        order.map((ord, index) => (
          <div
            key={index}
            className="relative m-auto w-8/12 overflow-x-auto shadow-md sm:rounded-lg mt-20"
          >
            <table className="w-8/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3  text-dark-textcolor1">
                    Date of Order : {ord?.order.dateOfOrder.split("T")[0]}
                  </th>
                  <th className="">
                    <p
                      className=" cursor-pointer text-textcolor1 "
                      title="Order Details"
                      onClick={() => showOrderDetails(ord?.order._id)}
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
                        src={ordData?.orderItem.item.images[0]}
                        alt=""
                      />
                    </th>
                    <td className="px-6 py-4">{ordData?.orderItem.item.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
       
    
    </>
  );
}
