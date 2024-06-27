import React from 'react';

export default function WhyChooseUs() {
  return (
    <div className="bg-[#FAF2F2] text-white py-16 px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-8 text-[#735F39]">
          Why Choose Us
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex flex-col items-start mb-8 lg:mb-0 lg:mr-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-button text-white flex items-center justify-center rounded-full mr-4">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-[#735F39]">Extensive Collection</h3>
                <p className="text-sm text-[#BFAE9F]">
                Explore a diverse range of books across various genres, including the latest releases and timeless classics.
                </p>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-button text-white flex items-center justify-center rounded-full mr-4">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-[#735F39]">Affordable Prices</h3>
                <p className="text-sm text-[#BFAE9F]">
                Discover great deals on both new and used books, making reading accessible and budget-friendly.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-button text-white flex items-center justify-center rounded-full mr-4">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-[#735F39]">Buyback Program</h3>
                <p className="text-sm text-[#BFAE9F]">
                Our buyback program allows you to sell your used books back to us,and earn money for new reads.
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              className="rounded-lg shadow-lg w-full lg:w-96 h-auto"
              src="https://cdn.pixabay.com/photo/2019/02/15/11/04/book-3998252_1280.jpg" 
              alt="Team working"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
