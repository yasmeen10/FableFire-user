import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../../interceptor";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  useEffect(() => {
    async function fetchOrder() {
      try {
        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/order/"
        );
        setOrderDetails(data.data);
      } catch (error) {
        console.log("Error fetching order details:", error);
      }
    }
    if (orderDetails.length === 0) {
      fetchOrder();
    }
  }, [orderDetails]);
  return (
    <OrderContext.Provider value={{ orderDetails, setOrderDetails }}>
      {children}
    </OrderContext.Provider>
  );
};
