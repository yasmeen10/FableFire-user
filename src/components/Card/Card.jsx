import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Card({ _id, images, title, price }) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isCartFilled, setIsCartFilled] = useState(false);

  useEffect(() => {
    const heartState = localStorage.getItem(`heartClicked-${_id}`);
    if (heartState) {
      setIsHeartFilled(JSON.parse(heartState));
    }
    const cartState = localStorage.getItem(`cartFilled-${_id}`);
    if (cartState) {
      setIsCartFilled(JSON.parse(cartState));
    }
  }, [_id]);

  useEffect(() => {
    localStorage.setItem(`heartClicked-${_id}`, JSON.stringify(isHeartFilled));
  }, [isHeartFilled, _id]);

  useEffect(() => {
    localStorage.setItem(`cartFilled-${_id}`, JSON.stringify(isCartFilled));
  }, [isCartFilled, _id]);

  const toggleHeartIcon = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const toggleCartIcon = () => {
    setIsCartFilled(!isCartFilled);
  };

  return (
    <div className="flex items-center justify-center p-2 relative">
      <div className="bg-white rounded-lg  flex-col w-40 overflow-hidden">
        <div className="relative">
          <img className="w-60 h-60 rounded-t-lg object-cover transition-transform duration-300 transform hover:scale-105" src={images[0]} alt={title} />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
            <div className="flex items-center justify-center">
              <div className={`rounded-full bg-black p-2 mr-2 cursor-pointer`} onClick={toggleCartIcon}>
                <i className={`fas fa-cart-shopping ${isCartFilled ? 'text-button' : 'text-white'}`}></i>
              </div>
              <div className={`rounded-full bg-black p-2 cursor-pointer`} onClick={toggleHeartIcon}>
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
                <p className="text-sm font-medium" style={{ color: "#A68877" }}>{price +"$"}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
