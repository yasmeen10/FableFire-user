import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Categories({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/v1/category');
      if (response.data && Array.isArray(response.data.data)) {
        setCategories(response.data.data); 
      } else {
        console.error('Fetched data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <header className="text-textcolor2 p-4 flex justify-center">
      <nav className="flex space-x-4 text-sm md:text-base">
        <button onClick={() => handleCategoryClick('all')} className="hover: transition duration-200 hover:border-b-2 hover:border-textcolor2">All</button>
        {categories.map(category => (
          <button key={category._id} onClick={() => handleCategoryClick(category.title)} className="hover: transition duration-200 hover:border-b-2 hover:border-textcolor2">{category.title}</button>
        ))}
      </nav>
    </header>
  );
}
