import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../interceptor';
import Categories from '../../components/Categories/Categories';
import Card from '../../components/Card/Card';
import Background from '../../components/Backgroud/Backgroud';

export default function Shop() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:3005/api/v1/item');
      if (response.data && Array.isArray(response.data.data)) {
        setItems(response.data.data);
      } else {
        console.error('Fetched data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredItems = selectedCategory === 'all' ? items : items.filter(item => item.category._id === selectedCategory);

  return (
    <div>
      <Categories setSelectedCategory={handleCategoryChange} />
      <Background />
      <div className="relative z-10 mt-8">
        <h2 className="text-xl font-bold text-textColor2-900 mx-px mb-4 px-28">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-28">
          {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card key={item._id} {...item} />
            ))
          ) : (
            <p>No items available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
