import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Card from '../Card/Card';


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
        {suggestionItems.map(suggestion => (
          <SwiperSlide key={suggestion._id}>
            <Card
              _id={suggestion._id}
              images={suggestion.images}
              title={suggestion.title}
              price={suggestion.price}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
