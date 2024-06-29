import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../interceptor";
import UsedItemData from "../../components/UsedItemData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UsedItemCard from "../../components/UsedItemCard";
import UsedItemCardSkeleton from "../../components/UsedItemCardSkeleton";

export default function UsedItemDetails() {
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
  const [usedItem, setUsedItem] = useState(null);
  const [suggestionUsedItems, setSuggestionUsedItems] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function fetchUsedItemsData() {
      try {
        const { data } = await axiosInstance.get(
          `http://localhost:3005/api/v1/usedItem/${id}`
        );
        setUsedItem(data.data.usedItem);
        setSuggestionUsedItems(data.data.suggestionUsedItems);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fetchUsedItemsData();
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="px-8 lg:px-36 py-14">
        {!usedItem ? (
          <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 border border-transparent rounded-lg skeleton">
              <div className="skeleton h-96 w-full rounded-lg"></div>
            </div>
            <div>
              <div className="skeleton h-36 w-full rounded-lg"></div>
              <div className="skeleton h-36 w-full rounded-lg mt-9"></div>
            </div>
          </div>
        ) : (
          <UsedItemData usedItem={usedItem} />
        )}
        <div className="mt-16">
          <h1 className="capitalize text-textcolor2 text-2xl font-medium mb-8">
            you may also like
          </h1>
          {suggestionUsedItems.length === 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3  gap-12 mt-7">
              <UsedItemCardSkeleton />
              <UsedItemCardSkeleton />
              <UsedItemCardSkeleton />
            </div>
          ) : (
            <div>
              <Carousel showDots={false} arrows={true} responsive={responsive}>
                {suggestionUsedItems.map((item) => (
                  <div key={item._id} className="h-full w-11/12">
                    <UsedItemCard item={item} />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
