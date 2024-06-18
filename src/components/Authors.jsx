import React from 'react'
import { Link } from 'react-router-dom';
import female from "../assets/Female.jpg";
import greek from "../assets/greek.jpg";
import Shek from "../assets/Shakes.jpg";

export default function Authors() {
  return (
    <div>
      <div className="ml-[80px] lg:ml-40 md:ml-40 sm:ml-[33%] grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <Link to="/" className="relative block">
          <img className="h-40 mt-[30px] absolute" src={Shek} alt="Shek" />
          <div className="box-content h-[126px] w-56 p-4 bg-black50 mt-8 relative">
            <p className="text-white relative text-[26px] w-[50px] mt-7">Top Authors</p>
          </div>
        </Link>

        <Link to="/" className="relative block">
          <img className="h-40 mt-[30px] absolute" src={female} alt="Female" />
          <div className="box-content h-[126px] w-56 p-4 mt-8 bg-black50 relative">
            <p className="text-placeholder relative font-medium text-[26px] w-[50px] mt-7">Top Authors</p>
          </div>
        </Link>

        <Link to="/" className="relative block">
          <img className="h-[160px] mt-[30px] absolute" src={greek} alt="Greek" />
          <div className="box-content h-[128px] w-[229px] p-4 mt-[30px] bg-black50 relative">
            <p className="text-white relative text-[26px] w-[50px] mt-7">Top Authors</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
