import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import lan1 from "../../assets/lan1.jpg";
import lan2 from "../../assets/lan2.jpg";
import lan3 from "../../assets/lan3.jpg";
import book5 from "../../assets/book5.jpg";
import Auther from "../../assets/Oliver.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Authors from "../../components/Authors";
import KidsSVG from "../../components/SVG/KidsSVG";
import RomanceSVG from "../../components/SVG/RomanceSVG";
import HorrorSVG from "../../components/SVG/HorrorSVG";
import HealthySVG from "../../components/SVG/HealthySVG";
import ArtSVG from "../../components/SVG/ArtSVG";
import SVG from "../../components/SVG/SVG";
import SVGG from "../../components/SVG/SVGG";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../interceptor";
import CardSkeleton from "../../components/CardSkeleton";
import Trending from "../../components/Trending";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNewArrivals() {
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/item/newArrival"
      );
      console.log(data.data);
      setNewArrivals(data.data);
    }
    fetchNewArrivals();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3005/api/v1/category"
      );
      if (response.data && Array.isArray(response.data.data)) {
        setCategoryList(response.data.data);
      } else {
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop/${categoryId}`);
  };

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
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="h-[620px] lg:w-full md:w-full md:h-[505px] lg:h-[400px] bg-[#D6CCC2] ">
          <div className=" ml-8  lg:ml-[790px] md:p-5 lg:p-0 md:ml-[300px]">
            <div>
              <img
                className="h-[200px] mt-[100px] ml-[] absolute rounded-2xl lg:h-56 lg:mt-[90px] lg:ml-[30px] md:ml-[10px] md:mt-[15px] sm:h-[200px] sm:ml-[0px] sm:mt-[15px] lg:absolute "
                src={lan1}
              />
            </div>
            <div>
              <img
                className="h-[200px] ml-[210px] mt-[100px] absolute  rounded-2xl lg:h-56 lg:mt-[90px] lg:ml-[320px] md:ml-[200px] md:mt-[15px] sm:h-[200px] sm:mt-[15px] sm:ml-[220px] lg:absolute"
                src={lan3}
              />
            </div>
            <div>
              <img
                className="h-[240px] ml-[95px] mt-[80px] absolute  rounded-2xl lg:h-64 lg:mt-[75px] lg:ml-[170px] md:mt-[0px] md:ml-[95px] sm:h-[230px] sm:ml-[100px] lg:absolute"
                src={lan2}
              />
            </div>
          </div>

          <div className="absolute  mt-[85%] ml-9 lg:mt-[100px] lg:ml-24 md:ml-[35%] md:mt-[25%] sm:mt-[35%] sm:ml-[190px]">
            <p className="text-[40px] text-[#210F04] font-medium">
              New $ Trending
            </p>
            <hr className="w-20 h-1 my-3 bg-[#210F04] border-0"></hr>
            <p className="w-[300px] text-[#735F39]">
              Discover the latest in literary trends with an array of new and
              captivating books hitting the A.
            </p>
            <button
              type="submit"
              className=" mt-3 text-white bg-[#A68877] hover:bg-[#B99885] focus:ring-4 focus:outline-none font-medium rounded-md text-sm text-center w-[100px] h-[30px]"
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="mt-10 ml-24">
          <div className=" max-w-4xl">
            <p className="text-[32px] font-medium mb-4">Categories</p>
            <Carousel responsive={responsive}>
              {categoryList.map((category) => (
                <div
                  key={category._id}
                  className="h-32 w-32 p-4 m-10 bg-[#F6F6F7] cursor-pointer flex flex-col items-center justify-center"
                  onClick={() => handleCategoryClick(category._id)}
                >
                  <img
                    src={category.images[0]}
                    alt={category.title}
                    className="h-10 w-10 object-cover"
                  />
                  <p className="font-medium mt-4 text-[#210F04] capitalize">
                    {category.title}
                  </p>
                  <p className="font-medium text-[#735F39]">Shop Now</p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <Trending />
        <div>
          <p className="text-[32px] font-medium ml-24 mt-8">New Arrivals</p>
          {newArrivals.length === 0 ? (
            <div className=" lg:flex grid md:grid-cols-2 sm:grid-cols-1 md:ml-[150px] lg:ml-0 sm:ml-[35%] justify-center lg:gap-24 mt-5">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <div className=" lg:flex grid md:grid-cols-2 sm:grid-cols-1 md:ml-[150px] lg:ml-0 sm:ml-[35%] justify-center lg:gap-24 mt-5">
              {newArrivals.map((item) => (
                <Card key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>

        <div className="  md:w-full lg:w-full h-[530px] lg:h-[440px]  bg-[#D6CCC2] mt-[90px]  lg:mt-[90px]  md:flex lg:flex">
          <div className=" w-6 flex items-center justify-center  md:ml-10 lg:ml-10">
            <p className=" rotate-0 md:rotate-0  lg:-rotate-90 sm:mb-[300px] md:mb-[430px] md:ml-[400px] lg:mb-4 ml-[150px] lg:ml-[300px] font-thin text-[#210F04] whitespace-nowrap text-[24px] tracking-widest">
              Best Seller
            </p>
          </div>

          <div className="flex lg:mt-[0px] md:mt-[50px]">
            <div>
              <img
                className="  rounded-2xl h-64 ml-[30px] mt-[20px] absolute sm:h-[200px] lg:ml-[200px] lg:mt-[80px] md:mt-[80px] md:ml-[200px] lg:h-[250px] md:h-[250px]"
                src={Auther}
              />
            </div>

            <div className=" ">
              <div>
                <img
                  className="ml-[170px] mt-[100px]  rounded-2xl h-48 sm:mt-[150px] sm:ml-[300px] md:mt-[160px] md:ml-[330px] lg:mt-[160px] lg:ml-[330px]  relative sm: sm:h-[150px] lg:h-[200px] md:h-[200px]"
                  src={book5}
                />
              </div>
            </div>
          </div>

          <div className="ml-[30px] mt-[20px] lg:mt-[130px] md:mt-[200px] lg:ml-10 md:ml-10 sm:mt-[100px] sm:ml-[80px] sm:mr-8">
            <p className="text-[#210F04] lg:first-line:text-[28px] sm:text-[20px] font-light ">
              The Rise and Fall of the Dinosaurs
            </p>
            <p className="text-[#210F04] lg:text-[20px] sm:text-[16px] font-light italic mt-2">
              A New History of a Lost World
            </p>
            <p className="text-[#210F04] lg-text-[18px] sm:text-[16px] font-thin italic mt-2">
              by Steve Brusatte
            </p>
            <button
              type="submit"
              className="font-thin mt-2 text-white bg-[#A68877] hover:bg-[#B99885] focus:ring-4 focus:outline-none rounded-md text-sm text-center w-[130px] h-[30px]"
            >
              Veiw Details
            </button>
          </div>
        </div>

        <p className="ml-[50px] mt-24 text-[32px] font-medium ">Authors</p>
        <Authors />
      </div>
      <Footer />
    </>
  );
}
