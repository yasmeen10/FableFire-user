import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import book5 from "../assets/book5.jpg";

export default function Trending() {
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };

  const handleBeforeChange = (oldIndex, newIndex) => {
    setActiveIndex(newIndex);
  };

  return (
    <div>
      <p className="text-[32px] font-medium text-center mt-32">
        Trending This Week
      </p>
      <div className="w-4/5 mx-auto">
        <Carousel
          infinite={true}
          autoPlay={false}
          showDots={true}
          arrows={true}
          responsive={responsive}
          beforeChange={handleBeforeChange}
        >
          <div
            className={`w-4/5 ${
              activeIndex === 0 ? "border border-blue-500" : ""
            }`}
          >
            <img src={book5} alt="Book 1" />
            <p className="legend">Legend 1</p>
          </div>
          <div
            className={`w-4/5 ${
              activeIndex === 1 ? "border border-blue-500" : ""
            }`}
          >
            <img src={book5} alt="Book 1" />
            <p className="legend">Legend 2</p>
          </div>
          <div
            className={`w-4/5 ${
              activeIndex === 2 ? "border border-blue-500" : ""
            }`}
          >
            <img src={book5} alt="Book 1" />
            <p className="legend">Legend 3</p>
          </div>
          <div
            className={`w-4/5 ${
              activeIndex === 3 ? "border border-blue-500" : ""
            }`}
          >
            <img src={book5} alt="Book 1" />
            <p className="legend">Legend 4</p>
          </div>
          <div
            className={`w-4/5 ${
              activeIndex === 4 ? "border border-blue-500" : ""
            }`}
          >
            <img src={book5} alt="Book 1" />
            <p className="legend">Legend 5</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
