import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../interceptor";

export const OrderSummaryContext = createContext();

export const OrderSummaryProvider = ({ children }) => {
  const [shoppingItemData, setShoppingItemData] = useState([]);

  useEffect(() => {
    async function fetchShoppingItemData() {
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/shoppingItem"
      );
      setShoppingItemData(data.data);
    }
    fetchShoppingItemData();
  }, []);

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
    }
  };

  const handleRemoveItem = async (item) => {
    const filteredItems = shoppingItemData.filter((i) => i._id !== item);
    setShoppingItemData(filteredItems);

    await axiosInstance.delete(
      `http://localhost:3005/api/v1/shoppingItem/${item}`
    );
  };

  return (
    <OrderSummaryContext.Provider
      value={{
        shoppingItemData,
        setShoppingItemData,
        handleIncrementQuantity,
        handleDecrementQuantity,
        handleRemoveItem,
      }}
    >
      {children}
    </OrderSummaryContext.Provider>
  );
};
