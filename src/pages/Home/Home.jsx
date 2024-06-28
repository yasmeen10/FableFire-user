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
import SVG from "../../components/SVG/SVG";
import SVGG from "../../components/SVG/SVGG";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../interceptor";
import CardSkeleton from "../../components/CardSkeleton";
import { toast } from "react-toastify";
import WhyChooseUs from "../../components/WhyChooseUs";
import CategorySkeleton from "../../components/CategorySkeleton";
import SwiperComponent from "../../components/SwiperComponent";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/item"
        );

        setImages(data.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // const Images = [
  //   {

  //     url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fyc3xlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {

  //     url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //   },
  //   {

  //     url: "https://images.unsplash.com/photo-1517672651691-24622a91b550?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1189&q=80",
  //   },
  //   {
  //     url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {

  //     url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fyc3xlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {

  //     url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fyc3xlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {

  //     url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fyc3xlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  // ];

  useEffect(() => {
    async function fetchNewArrivals() {
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/item/newArrival"
      );
      setNewArrivals(data.data);
    }
    fetchNewArrivals();
    fetchCategories();
    fetchAuthor();
    fetchItemsDiscount();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3005/api/v1/category"
      );

      if (response.data && Array.isArray(response.data.data.results)) {
        setCategoryList(response.data.data.results);
      } else {
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchItemsDiscount = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3005/api/v1/item"
      );
      if (response.data && Array.isArray(response.data.data.results)) {
        const discountedItems = response.data.data.results.filter(
          (item) => item.discount > 0
        );
        setDiscount(discountedItems);
      } else {
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchAuthor = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3005/api/v1/author/mostPopularAuthor"
      );
      if (response.data && response.data.data && response.data.data.author) {
        setAuthor(response.data.data.author);
        setBook(response.data.data.Book);
      } else {
        console.log("Error:", response.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
            <Link to="/shop">
              <button
                type="submit"
                className=" mt-3 text-white bg-[#A68877] hover:bg-[#B99885] focus:ring-4 focus:outline-none font-medium rounded-md text-sm text-center w-[100px] h-[30px]"
              >
                Buy Now
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full">
          <p className="lg:ml-20 sm:ml-10 ml-8 text-[32px] font-medium my-8">Categories</p>
          <Carousel responsive={responsive}>
            {loading ? (
              <div className="flex flex-row">
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
              </div>
            ) : (
              <div className=" flex w-screen items-center m-4 px-12 ">
                {categoryList.map((category) => (
                  <div
                    key={category._id}
                    className="h-32 bg-[#F6F6F7] w-40 p-4 m-auto  cursor-pointer flex flex-col items-center justify-center"
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
              </div>
            )}
          </Carousel>
        </div>

        <div className="">
  <p className="lg:ml-20 sm:ml-10 ml-8 text-[32px] font-medium my-8">Amazing Discount</p>
  <div className="w-4/5 mx-auto">
    {discount && discount.length > 0 ? (
      <Carousel
        showDots={false}
        arrows={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        transitionDuration={200}
      >
        {discount.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </Carousel>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    )}
  </div>
</div>




        <p className="lg:ml-20 sm:ml-10 ml-8 text-[32px] font-medium my-8">
            Top Trending
          </p>
        {images.slice(0, 1).map((ll) => {
          return <SwiperComponent imageList={images.slice(5, 11)} />;
        })}
        <WhyChooseUs />
        <div>
          <p className="lg:ml-20 sm:ml-10 ml-8 text-[32px] font-medium my-8">New Arrivals</p>
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
      </div>
      <Footer />
    </> 
  );
}
