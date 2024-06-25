import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

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
        toast.error("Something Went Wrong Please try again");
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
