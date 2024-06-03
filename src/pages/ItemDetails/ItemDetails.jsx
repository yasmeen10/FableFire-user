import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function ItemDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setError('Item ID is undefined');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3005/api/v1/item/${id}`);
        if (response.data && response.data.item) { 
          setItem(response.data.item);
        } else {
          console.error('Fetched data is not as expected:', response.data);
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching item:', error);
        setError('Error fetching item. Please try again later.');
      }
    };

    fetchItem();
  }, [id]);

  useEffect(() => {
    const heartState = localStorage.getItem(`heartClicked-${id}`);
    if (heartState) {
      setIsHeartClicked(JSON.parse(heartState));
    }
  }, [id]);

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
    localStorage.setItem(`heartClicked-${id}`, JSON.stringify(!isHeartClicked));
  };

  if (error) return <div>{error}</div>;

  if (!item) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="w-full max-w-4xl bg-white">
        <button 
          onClick={() => navigate('/shop')}
          className="textColor2 underline mb-4 font-semibold mb-8"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          To Category
          <i className="fa-solid fa-arrow-left-long ml-2"></i>
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center relative" style={{ marginRight: "40px" }}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mr-6" style={{ background: "#E1DDDD" }}></div>
            <img
              src={item.images[0]}
              alt={item.title}
              className="rounded-lg shadow-md relative z-10 w-96 h-96"
            />
          </div>
          <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
            <h1 className="text-[56px] mb-2" style={{ fontFamily: "Ropa Sans, sans-serif" }}>
              {item.title}
            </h1>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] text-gray-900 font-bold" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                <span style={{ color: "#A68877" }}>By</span> {item.authorId.name}
              </h2>
              <div className="text-[20px] font-semibold" style={{ color: "#A68877" }}>
                {item.price+"$"}
              </div>
            </div>
            <p className="textcolor2 mb-6 italic text-base" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
              {item.description}
            </p>
            <div className="flex items-center">
              <i
                className={`far fa-heart mr-4 text-button ${isHeartClicked ? 'fas fa-heart' : 'far fa-heart'}`}
                style={{ fontSize: '25px', cursor: 'pointer' }}
                onClick={handleHeartClick}
              ></i>
              <button
                className="text-white px-6 py-2 rounded-[4px] flex items-center hover:bg-opacity-75"
                style={{ background: "#A68877" }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
