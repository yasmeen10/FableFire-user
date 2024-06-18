import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

export default function SuggestionSwiper({ suggestionItems }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">You may also like:</h2>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {suggestionItems.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          suggestionItems.map((suggestion) => (
            <SwiperSlide key={suggestion._id}>
              <Card item={suggestion} suggestionItems={[]} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
