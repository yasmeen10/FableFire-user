import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import lan1 from "../../assets/lan1.jpg";
import lan2 from "../../assets/lan2.jpg";
import lan3 from "../../assets/lan3.jpg";
import book1 from "../../assets/book1.jpg";
import book2 from "../../assets/book2.jpg";
import book3 from "../../assets/book3.jpg";
import book4 from "../../assets/book4.jpg";
import book5 from "../../assets/book5.jpg";
import Auther from "../../assets/Oliver.jpg";
import female from "../../assets/Female.jpg";
import greek from "../../assets/greek.jpg";
import Shek from "../../assets/Shakes.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axiosInstance from "../../../interceptor";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
        <div className="w-full h-[400px] bg-[#D6CCC2]">
          <div className="flex ml-[790px] relative  ">
            <div>
              <img
                className="rounded-2xl h-56 mt-[90px] ml-[30px] absolute "
                src={lan1}
              />
            </div>
            <div>
              <img
                className="rounded-2xl h-56 mt-[90px] ml-[320px] absolute"
                src={lan3}
              />
            </div>
            <div>
              <img
                className="rounded-2xl h-64 mt-[75px] ml-[170px] absolute"
                src={lan2}
              />
            </div>
          </div>

          <div className="mt-[100px] ml-24">
            <p className="text-[40px] text-[#210F04] font-medium">
              New $ Trending
            </p>
            <hr className="w-20 h-1 my-3 bg-[#210F04] border-0"></hr>
            <p className="w-[400px] text-[#735F39]">
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
            className="h-32 w-32 p-4 m-10 bg-[#F6F6F7] cursor-pointer"
            onClick={() => handleCategoryClick(category._id)}
          >
            <img
              src={category.images[0]}
              alt={category.title}
              className="h-10 w-10 object-cover"
            />
            <p className="font-medium mt-4 text-[#210F04]">{category.title}</p>
            <p className="font-medium text-[#735F39]">Shop Now</p>
          </div>
        ))}
      </Carousel>
      </div>
    </div>

        <p className="text-[32px] font-medium text-center mt-24">
          Trending This Week
        </p>

        <div>
          <p className="text-[32px] font-medium ml-24">New Arrivals</p>

          <div className="flex justify-center gap-24">
            <div className={styles.wrapper}>
              <div className={styles.image}>
                <div className={styles.imggg}>
                  <img
                    className="rounded-md h-56 mt-[90px] ml-[30px] w-36 "
                    src={book1}
                  />
                </div>
                <div className={styles.content}>
                  <div className="grid grid-cols-2">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        className="mt-5"
                      >
                        <path
                          d="M14.6296 0C12.6444 0 10.9333 0.941467 10 2.50103C9.06667 0.941467 7.35556 0 5.37037 0C3.94659 0.00171153 2.58161 0.566836 1.57484 1.57142C0.568071 2.57599 0.00171526 3.93801 0 5.35869C0 8.00016 1.66667 10.7608 4.94444 13.5621C6.45794 14.8471 8.09204 15.9835 9.82407 16.9556C9.87812 16.9848 9.93858 17 10 17C10.0614 17 10.1219 16.9848 10.1759 16.9556C11.908 15.9835 13.5421 14.8471 15.0556 13.5621C18.3333 10.7608 20 8.00016 20 5.35869C19.9983 3.93801 19.4319 2.57599 18.4252 1.57142C17.4184 0.566836 16.0534 0.00171153 14.6296 0ZM10 16.2073C8.7037 15.4681 0.740741 10.7239 0.740741 5.35869C0.742211 4.13396 1.23045 2.95981 2.09835 2.09379C2.96626 1.22777 4.14297 0.740597 5.37037 0.73913C7.325 0.73913 8.96759 1.78408 9.65741 3.4656C9.68531 3.53338 9.73278 3.59135 9.79378 3.63215C9.85478 3.67296 9.92656 3.69474 10 3.69474C10.0734 3.69474 10.1452 3.67296 10.2062 3.63215C10.2672 3.59135 10.3147 3.53338 10.3426 3.4656C11.0324 1.78408 12.675 0.73913 14.6296 0.73913C15.857 0.740597 17.0337 1.22777 17.9016 2.09379C18.7696 2.95981 19.2578 4.13396 19.2593 5.35869C19.2593 10.7174 11.2963 15.4718 10 16.2073Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      className="ml-9"
                    >
                      <path
                        d="M5.308 18.616C4.886 18.616 4.53033 18.4713 4.241 18.182C3.95167 17.8927 3.80733 17.5373 3.808 17.116C3.80867 16.6947 3.953 16.339 4.241 16.049C4.53033 15.7603 4.886 15.616 5.308 15.616C5.73 15.616 6.08533 15.7603 6.374 16.049C6.66267 16.3377 6.80733 16.6933 6.808 17.116C6.80867 17.5387 6.664 17.894 6.374 18.182C6.084 18.47 5.72867 18.6147 5.308 18.616ZM14.692 18.616C14.2707 18.616 13.9153 18.4713 13.626 18.182C13.3367 17.8927 13.192 17.5373 13.192 17.116C13.192 16.6947 13.3367 16.339 13.626 16.049C13.9153 15.7603 14.2707 15.616 14.692 15.616C15.1133 15.616 15.469 15.7603 15.759 16.049C16.0477 16.3383 16.192 16.694 16.192 17.116C16.192 17.5373 16.0477 17.8927 15.759 18.182C15.4697 18.4713 15.114 18.616 14.692 18.616ZM3.881 3L6.55 8.616H13.185C13.3003 8.616 13.4027 8.587 13.492 8.529C13.582 8.471 13.659 8.391 13.723 8.289L16.339 3.539C16.4157 3.39767 16.422 3.27267 16.358 3.164C16.2933 3.05467 16.1843 3 16.031 3H3.881ZM3.392 2H16.412C16.846 2 17.1727 2.17733 17.392 2.532C17.612 2.886 17.6237 3.251 17.427 3.627L14.569 8.835C14.4243 9.07833 14.2363 9.26933 14.005 9.408C13.7737 9.54667 13.5193 9.616 13.242 9.616H6.1L4.885 11.846C4.78233 12 4.779 12.1667 4.875 12.346C4.971 12.5253 5.11533 12.6153 5.308 12.616H16.192V13.616H5.308C4.72467 13.616 4.28933 13.37 4.002 12.878C3.71467 12.386 3.70767 11.892 3.981 11.396L5.485 8.716L1.808 1H0V0H2.442L3.392 2Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-center w-[80px] ml-14 font-medium text-[#210F04]">
                  tokyo on foot
                </p>
                <p className="text-center w-[80px] ml-12 font-medium text-[#735F39]">
                  $ 14.46
                </p>
              </div>
            </div>

            <div className={styles.wrapper2}>
              <div className={styles.image2}>
                <div className={styles.imggg2}>
                  <img
                    className="rounded-md h-56 mt-[90px] ml-[30px]  "
                    src={book2}
                  />
                </div>
                <div className={styles.content2}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                    >
                      <path
                        d="M14.6296 0C12.6444 0 10.9333 0.941467 10 2.50103C9.06667 0.941467 7.35556 0 5.37037 0C3.94659 0.00171153 2.58161 0.566836 1.57484 1.57142C0.568071 2.57599 0.00171526 3.93801 0 5.35869C0 8.00016 1.66667 10.7608 4.94444 13.5621C6.45794 14.8471 8.09204 15.9835 9.82407 16.9556C9.87812 16.9848 9.93858 17 10 17C10.0614 17 10.1219 16.9848 10.1759 16.9556C11.908 15.9835 13.5421 14.8471 15.0556 13.5621C18.3333 10.7608 20 8.00016 20 5.35869C19.9983 3.93801 19.4319 2.57599 18.4252 1.57142C17.4184 0.566836 16.0534 0.00171153 14.6296 0ZM10 16.2073C8.7037 15.4681 0.740741 10.7239 0.740741 5.35869C0.742211 4.13396 1.23045 2.95981 2.09835 2.09379C2.96626 1.22777 4.14297 0.740597 5.37037 0.73913C7.325 0.73913 8.96759 1.78408 9.65741 3.4656C9.68531 3.53338 9.73278 3.59135 9.79378 3.63215C9.85478 3.67296 9.92656 3.69474 10 3.69474C10.0734 3.69474 10.1452 3.67296 10.2062 3.63215C10.2672 3.59135 10.3147 3.53338 10.3426 3.4656C11.0324 1.78408 12.675 0.73913 14.6296 0.73913C15.857 0.740597 17.0337 1.22777 17.9016 2.09379C18.7696 2.95981 19.2578 4.13396 19.2593 5.35869C19.2593 10.7174 11.2963 15.4718 10 16.2073Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        d="M5.308 18.616C4.886 18.616 4.53033 18.4713 4.241 18.182C3.95167 17.8927 3.80733 17.5373 3.808 17.116C3.80867 16.6947 3.953 16.339 4.241 16.049C4.53033 15.7603 4.886 15.616 5.308 15.616C5.73 15.616 6.08533 15.7603 6.374 16.049C6.66267 16.3377 6.80733 16.6933 6.808 17.116C6.80867 17.5387 6.664 17.894 6.374 18.182C6.084 18.47 5.72867 18.6147 5.308 18.616ZM14.692 18.616C14.2707 18.616 13.9153 18.4713 13.626 18.182C13.3367 17.8927 13.192 17.5373 13.192 17.116C13.192 16.6947 13.3367 16.339 13.626 16.049C13.9153 15.7603 14.2707 15.616 14.692 15.616C15.1133 15.616 15.469 15.7603 15.759 16.049C16.0477 16.3383 16.192 16.694 16.192 17.116C16.192 17.5373 16.0477 17.8927 15.759 18.182C15.4697 18.4713 15.114 18.616 14.692 18.616ZM3.881 3L6.55 8.616H13.185C13.3003 8.616 13.4027 8.587 13.492 8.529C13.582 8.471 13.659 8.391 13.723 8.289L16.339 3.539C16.4157 3.39767 16.422 3.27267 16.358 3.164C16.2933 3.05467 16.1843 3 16.031 3H3.881ZM3.392 2H16.412C16.846 2 17.1727 2.17733 17.392 2.532C17.612 2.886 17.6237 3.251 17.427 3.627L14.569 8.835C14.4243 9.07833 14.2363 9.26933 14.005 9.408C13.7737 9.54667 13.5193 9.616 13.242 9.616H6.1L4.885 11.846C4.78233 12 4.779 12.1667 4.875 12.346C4.971 12.5253 5.11533 12.6153 5.308 12.616H16.192V13.616H5.308C4.72467 13.616 4.28933 13.37 4.002 12.878C3.71467 12.386 3.70767 11.892 3.981 11.396L5.485 8.716L1.808 1H0V0H2.442L3.392 2Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-center w-[150px] ml-8 font-medium text-[#210F04]">
                  The Apothecary's House
                </p>
                <p className="text-center w-[80px] ml-[65px] font-medium text-[#735F39]">
                  $ 33.46
                </p>
              </div>
            </div>

            <div className={styles.wrapper3}>
              <div className={styles.image3}>
                <div className={styles.imggg3}>
                  <img
                    className="rounded-md h-56 mt-[90px] ml-[30px]  "
                    src={book3}
                  />
                </div>
                <div className={styles.content3}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                    >
                      <path
                        d="M14.6296 0C12.6444 0 10.9333 0.941467 10 2.50103C9.06667 0.941467 7.35556 0 5.37037 0C3.94659 0.00171153 2.58161 0.566836 1.57484 1.57142C0.568071 2.57599 0.00171526 3.93801 0 5.35869C0 8.00016 1.66667 10.7608 4.94444 13.5621C6.45794 14.8471 8.09204 15.9835 9.82407 16.9556C9.87812 16.9848 9.93858 17 10 17C10.0614 17 10.1219 16.9848 10.1759 16.9556C11.908 15.9835 13.5421 14.8471 15.0556 13.5621C18.3333 10.7608 20 8.00016 20 5.35869C19.9983 3.93801 19.4319 2.57599 18.4252 1.57142C17.4184 0.566836 16.0534 0.00171153 14.6296 0ZM10 16.2073C8.7037 15.4681 0.740741 10.7239 0.740741 5.35869C0.742211 4.13396 1.23045 2.95981 2.09835 2.09379C2.96626 1.22777 4.14297 0.740597 5.37037 0.73913C7.325 0.73913 8.96759 1.78408 9.65741 3.4656C9.68531 3.53338 9.73278 3.59135 9.79378 3.63215C9.85478 3.67296 9.92656 3.69474 10 3.69474C10.0734 3.69474 10.1452 3.67296 10.2062 3.63215C10.2672 3.59135 10.3147 3.53338 10.3426 3.4656C11.0324 1.78408 12.675 0.73913 14.6296 0.73913C15.857 0.740597 17.0337 1.22777 17.9016 2.09379C18.7696 2.95981 19.2578 4.13396 19.2593 5.35869C19.2593 10.7174 11.2963 15.4718 10 16.2073Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        d="M5.308 18.616C4.886 18.616 4.53033 18.4713 4.241 18.182C3.95167 17.8927 3.80733 17.5373 3.808 17.116C3.80867 16.6947 3.953 16.339 4.241 16.049C4.53033 15.7603 4.886 15.616 5.308 15.616C5.73 15.616 6.08533 15.7603 6.374 16.049C6.66267 16.3377 6.80733 16.6933 6.808 17.116C6.80867 17.5387 6.664 17.894 6.374 18.182C6.084 18.47 5.72867 18.6147 5.308 18.616ZM14.692 18.616C14.2707 18.616 13.9153 18.4713 13.626 18.182C13.3367 17.8927 13.192 17.5373 13.192 17.116C13.192 16.6947 13.3367 16.339 13.626 16.049C13.9153 15.7603 14.2707 15.616 14.692 15.616C15.1133 15.616 15.469 15.7603 15.759 16.049C16.0477 16.3383 16.192 16.694 16.192 17.116C16.192 17.5373 16.0477 17.8927 15.759 18.182C15.4697 18.4713 15.114 18.616 14.692 18.616ZM3.881 3L6.55 8.616H13.185C13.3003 8.616 13.4027 8.587 13.492 8.529C13.582 8.471 13.659 8.391 13.723 8.289L16.339 3.539C16.4157 3.39767 16.422 3.27267 16.358 3.164C16.2933 3.05467 16.1843 3 16.031 3H3.881ZM3.392 2H16.412C16.846 2 17.1727 2.17733 17.392 2.532C17.612 2.886 17.6237 3.251 17.427 3.627L14.569 8.835C14.4243 9.07833 14.2363 9.26933 14.005 9.408C13.7737 9.54667 13.5193 9.616 13.242 9.616H6.1L4.885 11.846C4.78233 12 4.779 12.1667 4.875 12.346C4.971 12.5253 5.11533 12.6153 5.308 12.616H16.192V13.616H5.308C4.72467 13.616 4.28933 13.37 4.002 12.878C3.71467 12.386 3.70767 11.892 3.981 11.396L5.485 8.716L1.808 1H0V0H2.442L3.392 2Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-center w-[150px] ml-8 font-medium text-[#210F04]">
                  The Outermost House
                </p>
                <p className="text-center w-[80px] ml-[65px] font-medium text-[#735F39]">
                  $ 43.46
                </p>
              </div>
            </div>

            <div className={styles.wrapper4}>
              <div className={styles.image4}>
                <div className={styles.imggg4}>
                  <img
                    className="rounded-md h-56 mt-[90px] ml-[30px]"
                    src={book4}
                  />
                </div>
                <div className={styles.content4}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                    >
                      <path
                        d="M14.6296 0C12.6444 0 10.9333 0.941467 10 2.50103C9.06667 0.941467 7.35556 0 5.37037 0C3.94659 0.00171153 2.58161 0.566836 1.57484 1.57142C0.568071 2.57599 0.00171526 3.93801 0 5.35869C0 8.00016 1.66667 10.7608 4.94444 13.5621C6.45794 14.8471 8.09204 15.9835 9.82407 16.9556C9.87812 16.9848 9.93858 17 10 17C10.0614 17 10.1219 16.9848 10.1759 16.9556C11.908 15.9835 13.5421 14.8471 15.0556 13.5621C18.3333 10.7608 20 8.00016 20 5.35869C19.9983 3.93801 19.4319 2.57599 18.4252 1.57142C17.4184 0.566836 16.0534 0.00171153 14.6296 0ZM10 16.2073C8.7037 15.4681 0.740741 10.7239 0.740741 5.35869C0.742211 4.13396 1.23045 2.95981 2.09835 2.09379C2.96626 1.22777 4.14297 0.740597 5.37037 0.73913C7.325 0.73913 8.96759 1.78408 9.65741 3.4656C9.68531 3.53338 9.73278 3.59135 9.79378 3.63215C9.85478 3.67296 9.92656 3.69474 10 3.69474C10.0734 3.69474 10.1452 3.67296 10.2062 3.63215C10.2672 3.59135 10.3147 3.53338 10.3426 3.4656C11.0324 1.78408 12.675 0.73913 14.6296 0.73913C15.857 0.740597 17.0337 1.22777 17.9016 2.09379C18.7696 2.95981 19.2578 4.13396 19.2593 5.35869C19.2593 10.7174 11.2963 15.4718 10 16.2073Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        d="M5.308 18.616C4.886 18.616 4.53033 18.4713 4.241 18.182C3.95167 17.8927 3.80733 17.5373 3.808 17.116C3.80867 16.6947 3.953 16.339 4.241 16.049C4.53033 15.7603 4.886 15.616 5.308 15.616C5.73 15.616 6.08533 15.7603 6.374 16.049C6.66267 16.3377 6.80733 16.6933 6.808 17.116C6.80867 17.5387 6.664 17.894 6.374 18.182C6.084 18.47 5.72867 18.6147 5.308 18.616ZM14.692 18.616C14.2707 18.616 13.9153 18.4713 13.626 18.182C13.3367 17.8927 13.192 17.5373 13.192 17.116C13.192 16.6947 13.3367 16.339 13.626 16.049C13.9153 15.7603 14.2707 15.616 14.692 15.616C15.1133 15.616 15.469 15.7603 15.759 16.049C16.0477 16.3383 16.192 16.694 16.192 17.116C16.192 17.5373 16.0477 17.8927 15.759 18.182C15.4697 18.4713 15.114 18.616 14.692 18.616ZM3.881 3L6.55 8.616H13.185C13.3003 8.616 13.4027 8.587 13.492 8.529C13.582 8.471 13.659 8.391 13.723 8.289L16.339 3.539C16.4157 3.39767 16.422 3.27267 16.358 3.164C16.2933 3.05467 16.1843 3 16.031 3H3.881ZM3.392 2H16.412C16.846 2 17.1727 2.17733 17.392 2.532C17.612 2.886 17.6237 3.251 17.427 3.627L14.569 8.835C14.4243 9.07833 14.2363 9.26933 14.005 9.408C13.7737 9.54667 13.5193 9.616 13.242 9.616H6.1L4.885 11.846C4.78233 12 4.779 12.1667 4.875 12.346C4.971 12.5253 5.11533 12.6153 5.308 12.616H16.192V13.616H5.308C4.72467 13.616 4.28933 13.37 4.002 12.878C3.71467 12.386 3.70767 11.892 3.981 11.396L5.485 8.716L1.808 1H0V0H2.442L3.392 2Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-center w-[150px] ml-8 font-medium text-[#210F04]">
                  Smoke Gets in Your Eyes
                </p>
                <p className="text-center w-[80px] ml-[65px] font-medium text-[#735F39]">
                  $ 22.46
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[400px] bg-[#D6CCC2] mt-[90px] flex  ">
          <div class=" w-6 flex items-center justify-center ml-10">
            <p className="  lg:-rotate-90 ml-[350px]  font-thin text-[#210F04] -rotate-90 whitespace-nowrap text-[24px] tracking-widest">
              Best Seller
            </p>
          </div>

          <div>
            <div>
              <img
                className="rounded-2xl h-64 ml-[200px] mt-[75px] absolute"
                src={Auther}
              />
            </div>

            <div>
              <img
                className="rounded-2xl h-48 mt-[160px] ml-[330px]  relative "
                src={book5}
              />
            </div>
          </div>

          <div className="mt-[130px] ml-14">
            <p className="text-[#210F04] text-[28px] font-light ">
              The Rise and Fall of the Dinosaurs
            </p>
            <p className="text-[#210F04] text-[20px] font-light italic mt-2">
              A New History of a Lost World
            </p>
            <p className="text-[#210F04] text-[18px] font-thin italic mt-2">
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

        <p className="ml-24 mt-24 text-[32px] font-medium ">Authors</p>

        <div className=" ml-40 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <div className="">
            <img className=" h-40 mt-[30px]  absolute" src={Shek} />
            <div className="box-content h-[126px] w-56 p-4 bg-black50 mt-8 relative ">
              <p className="text-white relative text-[26px] w-[50px] mt-7">
                Top Authors
              </p>
            </div>
          </div>

          <div>
            <img className=" h-40 mt-[30px] absolute  " src={female} />
            <div class="box-content h-[126px] w-56 p-4 mt-8 bg-black50 relative">
              <p className="text-placeholder relative font-medium text-[26px] w-[50px] mt-7">
                Top Authors
              </p>
            </div>
          </div>

          <div>
            <img className=" h-[160px] mt-[30px]  absolute" src={greek} />
            <div class="box-content h-[128px] w-[229px] p-4  mt-[30px] bg-black50 relative">
              <p className="text-white relative text-[26px] w-[50px] mt-7">
                Top Authors
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
