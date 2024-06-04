import React, { useEffect, useState } from "react";
import axiosInstance from "../../../interceptor";

export default function OrderProfile() {
    const [order,setOrder]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            const {data}= await axiosInstance.get("http://localhost:3005/api/v1/order/");
            const orderData=data.data.orderItems;
            setOrder(orderData);
            
        }
        fetchData()
    },[])
  return (
    <>
      <h2 className="font-semibold text-textcolor2 text-xl">Order Summary</h2>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-sidebar ">
              <th scope="col" class="px-6 py-3">
                Item
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                TotalPrice
              </th>
            </tr>
          </thead>
          <tbody>
            {
                order.map((item)=>{
                    return (
                   
                    <tr class="bg-white border-b text-black  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        <img className="h-44 w-44 inline px-3" src={item.item.images} alt="" />
                        {item.item.title}
                    </th>
                    <td class="px-6 py-4 ">{item.quantity}</td>
                    <td class="px-6 py-4">${item.item.price}</td>
                    <td class="px-6 py-4">${item.item.price * item.quantity}</td>
                  </tr>
                    );
                })
            }
           
          </tbody>
        </table>
      </div>
    </>
  );
}
