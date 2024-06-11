// Categories.jsx
import React from 'react';

export default function Categories({ categories = [], activeCategory, handleCategoryClick }) {
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
