import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

export default function SuggestionSwiper({ suggestionItems }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
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
          <Carousel showDots={false} arrows={true} responsive={responsive}>
            {suggestionItems.map((item) => (
              <div key={item._id} className="h-full w-11/12">
                <Card item={item} suggestionItems={[]} />
              </div>
            ))}
          </Carousel>
        )}
      </Swiper>
    </div>
  );
}

// (
//   suggestionItems.map((suggestion) => (
//     <SwiperSlide key={suggestion._id}>
//       <Card item={suggestion} suggestionItems={[]} />
//     </SwiperSlide>
//   ))
// )
