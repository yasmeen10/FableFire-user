import React from "react";
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
      <div className="relative ">
        <img className="h-32 w-full lg:w-full lg:h-72 md:w-full md:h-[188px] sm:w-full sm:h-[150px]" src={AboutUs} />
        <div className="absolute ml-6 top-[61%] lg:top-[63%] md:top-[63%] lg:right-[78%] md:right-[75%] sm:right-[70%]">
          <h1 className="text-[26px] lg:text-[58px] md:text-[40px] sm:text-[40px] w-[140px] text-[#A68877]">Who</h1>
          <h1 className="text-[26px] lg:text-[58px] md:text-[40px] sm:text-[40px] w-[200px] text-[#A68877]">We Are</h1>
        </div>
      </div>

      <h1 className="text-center mt-10 text-3xl lg:text-5xl md:text-4xl sm:text-3xl text-[#210F04]">Our Mission</h1>
      <p className="text-center mx-auto w-11/12 md:w-3/4 lg:w-1/2 text-[#735F39] mt-4 text-lg">
        Our mission is to transform the way people discover, purchase, and enjoy books. We are passionate about books and the endless worlds they open up. Our goal is to provide a seamless and enjoyable shopping experience for book lovers everywhere, whether you're looking for the latest bestseller, a timeless classic, or a hidden gem.
      </p>

      <h1 className="text-center mt-10 text-3xl lg:text-5xl md:text-4xl sm:text-3xl text-[#210F04]">Our Team</h1>
      <p className="text-center mx-auto w-11/12 md:w-3/4 lg:w-1/2 text-[#735F39] mt-4 text-lg">
        Our mission is to create a seamless and delightful online shopping experience for book lovers everywhere. Our diverse team is passionate about books and technology, combining our talents to build a platform that caters to all your reading needs.
      </p>

      <ul className="flex flex-wrap justify-center gap-8 mt-10">
        <li className="max-w-xs">
          <div className="rounded overflow-hidden shadow-lg">
            <img src={sohila} alt="Sohila Elkaraly" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-[#210F04]">Sohila Elkaraly</div>
              <p className="text-base text-[#735F39]">Team Leader</p>
            </div>
          </div>
        </li>
        <li className="max-w-xs">
          <div className="rounded overflow-hidden shadow-lg">
            <img src={yasmeen} alt="Yasmeen Walid" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-[#210F04]">Yasmeen Walid</div>
              <p className="text-base text-[#735F39]">Team Member</p>
            </div>
          </div>
        </li>
        <li className="max-w-xs">
          <div className="rounded overflow-hidden shadow-lg">
            <img src={Mariam} alt="Mariam Elmesary" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-[#210F04]">Mariam Elmesary</div>
              <p className="text-base text-[#735F39]">Team Member</p>
            </div>
          </div>
        </li>
        <li className="max-w-xs">
          <div className="rounded overflow-hidden shadow-lg">
            <img src={Me} alt="Nadine Hany" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-[#210F04]">Nadine Hany</div>
              <p className="text-base text-[#735F39]">Team Member</p>
            </div>
          </div>
        </li>
        <li className="max-w-xs">
          <div className="rounded overflow-hidden shadow-lg">
            <img src={areej} alt="Areej Mahmoud" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-[#210F04]">Areej Mahmoud</div>
              <p className="text-base text-[#735F39]">Team Member</p>
            </div>
          </div>
        </li>
      </ul>

      <Footer />
    </>
  );
}
