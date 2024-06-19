import React, { useState, useEffect } from "react";
import axiosInstance from "../../../interceptor";
import Categories from "../../components/Categories";
import { Navigate, useNavigate } from "react-router-dom";

export default function CategoriesPage({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3005/api/v1/category"
      );
      if (response.data && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      } else {
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveCategory(categoryId);
    navigate(`/shop/${categoryId}`);
  };

  return (
    <Categories
      categories={categories}
      activeCategory={activeCategory}
      handleCategoryClick={handleCategoryClick}
    />
  );
}
