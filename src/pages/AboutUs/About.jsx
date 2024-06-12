import React from "react";
import styles from "./About.module.css";
import AboutUs from "../../assets/aboutAs.jpg";
import sohila from "../../assets/sohila.jpeg";
import yasmeen from "../../assets/yasmeen.jpeg";
import Mariam from "../../assets/mariam.jpeg";
import Me from "../../assets/me.jpeg";
import areej from "../../assets/areej.jpeg";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <>
      <Navbar/>
      <div className="relative">
        <img className="h-32 w-full lg:w-full lg:h-72 md:w-full md:h-[188px] sm:w-full sm:h-[150px]" src={AboutUs} />

        <div className="absolute ml-6 top-[61%] lg:top-[63%] md:top-[63%] lg:right-[78%] md:right-[75%] sm:right-[70%]">
          <h1 className="text-[26px] lg:text-[58px] md:text-[40px] sm:text-[40px] w-[140px] text-[#A68877]">Who</h1>
          <h1 className="text-[26px] lg:text-[58px] md:text-[40px] sm:text-[40px] w-[200px] text-[#A68877]">We Are</h1>
        </div>
      </div>

      <h1 className="text-center mt-[40px] text-[30px] lg:text-[48px] md:text-[48px] lg:mt-[130px] md:mt-[100px] sm:mt-[70px]  text-[#210F04]">
        Our Mission
      </h1>
      <p className="text-center w-[390px] ml-1 text-[#735F39] lg:w-[600px] md:w-[600px] text-[#16px] lg:mt-[20px] lg:ml-[31%] md:mt-[10px] md:ml-[17%] sm:mt-[10px] sm:ml-[11%]">
        our mission is to transform the way people discover, purchase, and enjoy
        books. We are passionate about books and the endless worlds they open
        up. Our goal is to provide a seamless and enjoyable shopping experience
        for book lovers everywhere, whether you're looking for the latest
        bestseller, a timeless classic, or a hidden gem.
      </p>
      <h1 className="text-center mt-[40px] text-[30px] lg:text-[48px] md:text-[48px] lg:mt-[130px] md:mt-[100px] sm:mt-[70px]  text-[#210F04]">Our Team</h1>
      <p className="text-center w-[380px] ml-2 text-[#735F39] lg:w-[600px] md:w-[600px] text-[#16px] lg:mt-[20px] lg:ml-[31%] md:mt-[10px] md:ml-[17%] sm:mt-[10px] sm:ml-[11%]">
        where we bring stories to life! Our mission is to create a seamless and
        delightful online shopping experience for book lovers everywhere. Our
        diverse team is passionate about books and technology, combining our
        talents to build a platform that caters to all your reading needs.
      </p>

      <ul className=" ml-[70px] lg:flex lg:ml-[300px] md:flex md:ml-[50px] grid sm:grid-cols-2 sm:ml-[20px]">
        <li className="">
        <div className=" max-w-sm rounded overflow-hidden shadow-lg w-[250px] lg:mt-[153px] md:mt-[153px] mt-[100px]">
          <img src={sohila} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-[#210F04]">
              Sohila elkaraly
            </div>
            <p class=" text-base text-[#735F39]"> team leader</p>
          </div>
        </div>
        </li>
        <li className="md:ml-[80px] lg:ml-[80px]">
        <div className="max-w-sm rounded overflow-hidden shadow-lg w-[250px] lg:mt-[153px] md:mt-[153px] mt-[100px] ">
          <img src={yasmeen} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-[#210F04]">
              Yassmen walid
            </div>
            <p className=" text-base text-[#735F39]"> team member</p>
          </div>
        </div>
        </li>
        <li className=" lg:ml-[80px] sm:ml-[220px] md:ml-[80px] ">
        <div className="max-w-sm rounded overflow-hidden shadow-lg w-[250px] md:mt-[153px] lg:mt-[153px] mt-[100px] ">
          <img src={Mariam} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-[#210F04]">
              Mariam elmesary
            </div>
            <p className=" text-base text-[#735F39]"> team member</p>
          </div>
        </div>
        </li>
      </ul>

      

      
<ul className="ml-[70px] lg:flex lg:ml-[460px] md:flex md:ml-[210px] grid sm:grid-cols-2 sm:ml-[20px]">
  <li>
        <div className="max-w-sm rounded overflow-hidden shadow-lg w-[250px] lg:mt-[56px] md:mt-[56px] mt-[100px]">
          <img src={Me} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-[#210F04]">Nadine hany</div>
            <p className=" text-base text-[#735F39]"> team member</p>
          </div>
        </div>
  </li>
  <li className="lg:ml-[80px] md:ml-[80px]">
        <div className="max-w-sm rounded overflow-hidden shadow-lg w-[250px] lg:mt-[56px] md:mt-[56px] mt-[100px]">
          <img src={areej} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-[#210F04]">
              Areej mahmoud
            </div>
            <p className=" text-base text-[#735F39]"> team member</p>
        </div>
      </div>
  </li>
</ul>
      <Footer />
    </>
  );
}
