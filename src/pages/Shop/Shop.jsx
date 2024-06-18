import React, { useState, useEffect } from "react";
import axiosInstance from "../../../interceptor";
import Card from "../../components/Card";
import Background from "../../components/Backgroud";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CategoriesPage from "../CategoriesPage/CategoriesPage";
import CardSkeleton from "../../components/CardSkeleton";

export default function Shop() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3005/api/v1/item"
      );
      if (response.data && Array.isArray(response.data.data.results)) {
        setItems(response.data.data.results);
      } else {
        console.error("Fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter(
          (item) => item.category && item.category._id === selectedCategory
        );
  return (
    <>
      <Navbar />
      <div>
        <CategoriesPage setSelectedCategory={handleCategoryChange} />
        <Background />
        <div className="relative z-10 mt-8">
          <h2 className="text-xl font-bold text-textColor2-900 mx-px mb-4 px-28">
            New Arrivals
          </h2>

          {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-28">
              {filteredItems.map((item) => (
                <Card key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-28">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
