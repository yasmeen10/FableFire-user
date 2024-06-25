import React, { useState, useEffect } from "react";
import axiosInstance from "../../../interceptor";
import { useParams } from "react-router-dom";
import StarSVG from "../../components/SVG/StarSVG";

export default function Ratings() {
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch ratings data when the component mounts
    const fetchRatings = async () => {
      try {
        const {data} = await axiosInstance.get(`http://localhost:3005/api/v1/rating/${id}`);
        // console.log(data);
        setRatings(data);
      } catch (error) {
        console.error("Error fetching ratings data:", error);
      }
    };

    fetchRatings();
  }, [id]);

  return (
    <>
      <div>
        <p className="font-medium text-textcolor2">
          <span className="text-6xl ">{ratings.itemRate}</span> Out of{" "}
          <span className="text-6xl ">5</span>
        </p>
        <div className="flex m-3">
          <StarSVG /> <StarSVG /> <StarSVG /> <StarSVG /> <StarSVG />
        </div>
        <p className="text-lg">Based on 5 Ratings</p>
        {[5, 4, 3, 2, 1].map((rating, index) => (
          <div className="flex mt-3 justify-center items-center" key={index}>
            <span>{rating}</span>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-4 fill-current ${getStarColor(rating)}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <div className="w-80 bg-gray-200 rounded-full h-2 mx-3">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getStarColor(rating)}`}
                style={{ width: `${ratings[5 - rating]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const getStarColor = (rating) => {
  switch (rating) {
    case 5:
      return "text-green-800";
    case 4:
      return "text-green-700";
    case 3:
      return "text-yellow-700";
    case 2:
      return "text-orange-500";
    case 1:
      return "text-orange-800";
    default:
      return "";
  }
};
