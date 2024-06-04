import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../interceptor';

export default function Card({ _id, images, title, price }) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isCartFilled, setIsCartFilled] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const heartState = localStorage.getItem(`heartClicked-${_id}`);
    if (heartState) {
      setIsHeartFilled(JSON.parse(heartState));
    }
    const cartState = localStorage.getItem(`cartFilled-${_id}`);
    if (cartState) {
      setIsCartFilled(JSON.parse(cartState));
    }

    fetchWishlist();
  }, [_id]);

  useEffect(() => {
    localStorage.setItem(`heartClicked-${_id}`, JSON.stringify(isHeartFilled));
  }, [isHeartFilled, _id]);

  useEffect(() => {
    localStorage.setItem(`cartFilled-${_id}`, JSON.stringify(isCartFilled));
  }, [isCartFilled, _id]);

  useEffect(() => {
    const isInWishlist = wishlist.some(item => item._id === _id);
    setIsHeartFilled(isInWishlist);
  }, [_id, wishlist]);

  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:3005/api/v1/wishList');
      setWishlist(response.data.data.wishList);
      // console.log('Wishlist items:', response.data.data.wishList); 
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  const toggleHeartIcon = async () => {
  const newIsHeartFilled = !isHeartFilled;
  setIsHeartFilled(newIsHeartFilled);

  try {
    if (newIsHeartFilled) {
      await axiosInstance.post('http://localhost:3005/api/v1/wishList/', {
        _id,
        title,
        price,
        images,
      });
      console.log(`Added item with ID: ${_id} to wishlist`);
    } else {
      const updatedWishlist = wishlist.filter(item => item._id !== _id);
      setWishlist(updatedWishlist);
    }

    fetchWishlist(); 
  } catch (error) {
    console.error('Error updating wishlist:', error);
  }
};

  
  
  
  const toggleCartIcon = () => {
    setIsCartFilled(!isCartFilled);
  };

  return (
    <div className="flex items-center justify-center p-2 relative">
      <div className="bg-white rounded-lg flex-col w-40 overflow-hidden">
        <div className="relative">
          <img className="w-60 h-60 rounded-t-lg object-cover transition-transform duration-300 transform hover:scale-105" src={images[0]} alt={title} />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
            <div className="flex items-center justify-center">
              <div className="rounded-full bg-black p-2 mr-2 cursor-pointer" onClick={toggleCartIcon}>
                <i className={`fas fa-cart-shopping ${isCartFilled ? 'text-button' : 'text-white'}`}></i>
              </div>
              <div className="rounded-full bg-black p-2 cursor-pointer" onClick={toggleHeartIcon}>
                <i className={`${isHeartFilled ? 'fas text-red-500' : 'fas text-white'} fa-heart`}></i>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <Link to={`/item/${_id}`}>
            <h5 className="text-lg font-bold textColor2 text-center">{title}</h5>
            <div className="flex items-center justify-center mt-2.5">
              <div className="ml-4">
                <p className="text-sm font-medium" style={{ color: "#A68877" }}>{price + "$"}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
