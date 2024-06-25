import React, { useState, useEffect } from "react";
import axiosInstance from "../../../interceptor";
import Categories from "../../components/Categories";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CategoriesPage({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const categoryIdFromUrl = location.pathname.split("/").pop();
  const [activeCategory, setActiveCategory] = useState(categoryIdFromUrl === "shop" ? "all" : categoryIdFromUrl);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const categoryToSet = categoryIdFromUrl === "shop" ? "all" : categoryIdFromUrl || "all";
    setActiveCategory(categoryToSet);
    setSelectedCategory(categoryToSet);
  }, [categoryIdFromUrl, setSelectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3005/api/v1/category");
      if (response.data && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      } else {
        toast.error("Something went wrong, please try again");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setSelectedCategory(categoryId);
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
