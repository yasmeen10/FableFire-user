import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [shoppingItemData, setShoppingItemData] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchShoppingItemData() {
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/shoppingItem"
      );
      setShoppingItemData(data.data);
    }
    if (isLoggedIn) {
      fetchShoppingItemData();
    }
  }, [setShoppingItemData, isLoggedIn]);

  const handleIncrementQuantity = async (item) => {
    try {
      const items = [...shoppingItemData];
      const index = items.findIndex((i) => i._id === item);

      if (index !== -1) {
        const updatedItem = {
          ...items[index],
          quantity: items[index].quantity + 1,
        };
        items[index] = updatedItem;
        setShoppingItemData(items);

        const response = await axiosInstance.patch(
          `http://localhost:3005/api/v1/shoppingItem/${item}`,
          { quantity: updatedItem.quantity }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDecrementQuantity = async (item) => {
    try {
      const items = [...shoppingItemData];
      const index = items.findIndex((i) => i._id === item);

      if (index !== -1) {
        const updatedItem = {
          ...items[index],
          quantity: items[index].quantity - 1,
        };
        items[index] = updatedItem;
        setShoppingItemData(items);

        await axiosInstance.patch(
          `http://localhost:3005/api/v1/shoppingItem/${item}`,
          { quantity: updatedItem.quantity }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      const filteredItems = shoppingItemData.filter((i) => i._id !== item);
      setShoppingItemData(filteredItems);
      await axiosInstance.delete(
        `http://localhost:3005/api/v1/shoppingItem/${item}`
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAddTocart = async (item) => {
    try {
      await axiosInstance.post("http://localhost:3005/api/v1/shoppingItem/", {
        item: item._id,
      });
      const items = [...shoppingItemData];
      items.push(item);
      setShoppingItemData(items);
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/signIn");
        return;
      }
      toast.error(error.response.data.message);
    }
  };
  return (
    <CartContext.Provider
      value={{
        shoppingItemData,
        setShoppingItemData,
        handleIncrementQuantity,
        handleDecrementQuantity,
        handleRemoveItem,
        handleAddTocart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
