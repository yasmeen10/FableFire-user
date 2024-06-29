import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../interceptor";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function Ratings() {
  const [ratings, setRatings] = useState({ itemRate: 0 });
  const { id } = useParams();
  const navigate = useNavigate();

  const ratingChanged = useCallback(async (newRating) => {
  
    try {
      const response = await axiosInstance.post(`http://localhost:3005/api/v1/rating/${id}`, { rate: newRating });
     
      setRatings((prevRatings) => ({
        ...prevRatings,
        itemRate: newRating,
      }));
    } catch (error) {
      if(error.response.status === 401){
        navigate("/signIn");
        return;
      }
      toast.error(error.response.data.message);
    }
  }, [id]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { data } = await axiosInstance.get(`http://localhost:3005/api/v1/rating/${id}`);
        setRatings(data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchRatings();
  }, [ratings]);

  return (
    <div >
      <p className="font-medium text-textcolor2">
        <span className="text-6xl">{Number(ratings.itemRate).toFixed(1)}</span> Out of{" "}
        <span className="text-6xl">5</span>
      </p>
      <div className="flex ">
        <ReactStars
          count={5}
          value={Number(ratings.itemRate)}
          onChange={ratingChanged}
          size={24}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
      </div>
        <p className="text-lg text-button font-medium">Add Rating</p>
    </div>
  );
}
