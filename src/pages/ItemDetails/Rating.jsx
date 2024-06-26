import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../interceptor";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function Ratings() {
  const [ratings, setRatings] = useState({ itemRate: 0 });
  const { id } = useParams();

  const ratingChanged = useCallback(async (newRating) => {
    console.log(newRating);
    try {
      const response = await axiosInstance.post(`http://localhost:3005/api/v1/rating/${id}`, { rate: newRating });
      console.log(response.data);
      setRatings((prevRatings) => ({
        ...prevRatings,
        itemRate: newRating,
      }));
    } catch (error) {
      console.error("Error posting new rating:", error);
    }
  }, [id]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { data } = await axiosInstance.get(`http://localhost:3005/api/v1/rating/${id}`);
        setRatings(data);
      } catch (error) {
        console.error("Error fetching ratings data:", error);
      }
    };

    fetchRatings();
  }, [ratings]);

  return (
    <div>
      <p className="font-medium text-textcolor2">
        <span className="text-6xl">{Number(ratings.itemRate).toFixed(1)}</span> Out of{" "}
        <span className="text-6xl">5</span>
      </p>
      <div className="flex m-3">
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
      <p className="text-lg">Put Your Rate</p>
    </div>
  );
}
