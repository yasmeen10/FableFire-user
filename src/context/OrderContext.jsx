import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { useAuth } from "./AuthContext";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const orderId = localStorage.getItem("orderId");
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3005/api/v1/order/${orderId}`
        );

        setOrderDetails(response.data.data);
      } catch (error) {
        console.log("Error fetching order details:", error);
      }
    }
    if (isLoggedIn) {
      fetchOrder();
    }
  }, []);

  return (
    <OrderContext.Provider value={{ orderDetails, setOrderDetails }}>
      {children}
    </OrderContext.Provider>
  );
};
