import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../interceptor";
import Card from "../../components/Card";
import Background from "../../components/Backgroud";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CategoriesPage from "../CategoriesPage/CategoriesPage";
import CardSkeleton from "../../components/CardSkeleton";

export default function Shop() {
  const [items, setItems] = useState([]);
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');

  useEffect(() => {
    setSelectedCategory(categoryId || "all");
  }, [categoryId]);

  useEffect(() => {
    fetchItems();
  }, [selectedCategory]);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3005/api/v1/item");
      if (response.data && Array.isArray(response.data.data)) {
        setItems(response.data.data);
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

  const filteredItems = selectedCategory === 'all' ? items : items.filter(item => item.category && item.category._id === selectedCategory);

  return (
    <>
      <Navbar />
      <div>
        <CategoriesPage setSelectedCategory={handleCategoryChange} />
        {selectedCategory === "all" && <Background />}
        <div className="relative z-10 mt-8">
          {selectedCategory === "all" && (
            <h2 className="text-xl font-bold text-textColor2-900 mx-px mb-4 px-28">
              New Arrivals
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-28">
            {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
              filteredItems.map((item) => <Card key={item._id} item={item} />)
            ) : (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
