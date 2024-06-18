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
      <Navbar />
      <div className={styles.landing}>
        <img className="w-full h-72" src={AboutUs} />

        <div className={styles.landingText}>
          <h1 className={styles.landingPa}>Who</h1>
          <h1 className={styles.landingPara}>We Are</h1>
        </div>
      </div>

      <h1 className="text-center text-[48px] mt-[180px] text-[#210F04]">
        Our Mission
      </h1>
      <p className={styles.text}>
        our mission is to transform the way people discover, purchase, and enjoy
        books. We are passionate about books and the endless worlds they open
        up. Our goal is to provide a seamless and enjoyable shopping experience
        for book lovers everywhere, whether you're looking for the latest
        bestseller, a timeless classic, or a hidden gem.
      </p>
      <h1 className="mt-24 text-center text-[48px] text-[#210F04]">Our Team</h1>
      <p className={styles.textPar}>
        where we bring stories to life! Our mission is to create a seamless and
        delightful online shopping experience for book lovers everywhere. Our
        diverse team is passionate about books and technology, combining our
        talents to build a platform that caters to all your reading needs.
      </p>

      <ul className="flex ml-[230px]">
        <li className="">
          <div class=" max-w-sm rounded overflow-hidden shadow-lg w-[250px] mt-[153px] ">
            <img src={sohila} />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 text-[#210F04]">
                Sohila elkaraly
              </div>
              <p class=" text-base text-[#735F39]"> team leader</p>
            </div>
          </div>
        </li>
        <li className="ml-[80px]">
          <div class="max-w-sm rounded overflow-hidden shadow-lg w-[250px] mt-[153px] ">
            <img src={yasmeen} />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 text-[#210F04]">
                Yassmen walid
              </div>
              <p class=" text-base text-[#735F39]"> team member</p>
            </div>
          </div>
        </li>
        <li className="ml-[80px]">
          <div class="max-w-sm rounded overflow-hidden shadow-lg w-[250px] mt-[153px]">
            <img src={Mariam} />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 text-[#210F04]">
                Mariam elmesary
              </div>
              <p class=" text-base text-[#735F39]"> team member</p>
            </div>
          </div>
        </li>
      </ul>

      <ul className="flex ml-[400px]">
        <li>
          <div class="max-w-sm rounded overflow-hidden shadow-lg w-[250px] mt-[56px]">
            <img src={Me} />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 text-[#210F04]">
                Nadine hany
              </div>
              <p class=" text-base text-[#735F39]"> team member</p>
            </div>
          </div>
        </li>
        <li className="ml-[80px]">
          <div class="max-w-sm rounded overflow-hidden shadow-lg w-[250px] mt-[56px]">
            <img src={areej} />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 text-[#210F04]">
                Areej mahmoud
              </div>
              <p class=" text-base text-[#735F39]"> team member</p>
            </div>
          </div>
        </li>
      </ul>
      <Footer />
    </>
  );
}
