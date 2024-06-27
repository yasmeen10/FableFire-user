import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UsedItemContext = createContext();

export const UsedItemProvider = ({ children }) => {
  const [usedItems, setUsedItems] = useState([]);
  const [currUserUsedItems, setCurrUserUsedItems] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsedItemsData() {
      try {
        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/usedItem"
        );
        setUsedItems(data.data.results);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }

    async function getCurrentUserUsedItems() {
      try {
        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/usedItem/user"
        );
        setCurrUserUsedItems(data.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }

    fetchUsedItemsData();
    if (isLoggedIn) {
      getCurrentUserUsedItems();
    }
  }, [isLoggedIn, setUsedItems]);

  const handleRemoveUsedItem = async (item) => {
    try {
      const filteredItems = usedItems.filter((i) => i._id !== item._id);
      setUsedItems(filteredItems);
      const response = await axiosInstance.delete(
        `http://localhost:3005/api/v1/usedItem/${item._id}`
      );
      if (response.status === 200) {
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleAddNewUsedItem = async (item) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:3005/api/v1/usedItem/",
        item
      );
      const items = [...usedItems];
      items.unshift(response.data.data);
      setUsedItems(items);
      if (response.status === 200) {
        toast.success("Added Successfully");
        navigate("/blog");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleEditUsedItem = async (id, item) => {
    try {
      const response = await axiosInstance.patch(
        `http://localhost:3005/api/v1/usedItem/${id}`,
        item,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const items = [...usedItems];
      const index = usedItems.findIndex((i) => i._id === id);
      items[index] = { ...response.data.data };
      setCurrUserUsedItems;
      setUsedItems(items);
      if (response.status === 200) {
        toast.success("Updated Successfully");
        navigate("/blog");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <UsedItemContext.Provider
      value={{
        usedItems,
        currUserUsedItems,
        handleRemoveUsedItem,
        handleAddNewUsedItem,
        handleEditUsedItem,
      }}
    >
      {children}
    </UsedItemContext.Provider>
  );
};
