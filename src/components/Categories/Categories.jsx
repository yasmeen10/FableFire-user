import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../interceptor'; 

export default function Categories({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:3005/api/v1/category'); 
      if (response.data && Array.isArray(response.data.data)) {
        setCategories(response.data.data); 
      } else {
        console.error('error', response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveCategory(categoryId);
  };

  return (
    <header className="text-textcolor2 p-4 flex justify-center">
      <nav className="flex space-x-4 text-sm md:text-base">
        <button 
          onClick={() => handleCategoryClick('all')} 
          className={`transition duration-200 ${activeCategory === 'all' ? 'border-b-2 border-textcolor2' : 'hover:border-b-2 hover:border-textcolor2'}`}
        >
          All
        </button>
        {categories.map(category => (
          <button 
            key={category._id} 
            onClick={() => handleCategoryClick(category._id)} 
            className={`transition duration-200 ${activeCategory === category._id ? 'border-b-2 border-textcolor2' : 'hover:border-b-2 hover:border-textcolor2'}`}
          >
            {category.title}
          </button>
        ))}
      </nav>
    </header>
  );
}
