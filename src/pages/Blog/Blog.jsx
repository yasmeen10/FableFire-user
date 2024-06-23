import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Icon from "../../assets/createpost.svg";
import { useContext } from "react";
import UsedItemCard from "../../components/UsedItemCard";
import { UsedItemContext } from "../../context/UsedItemContext";
import UsedItemCardSkeleton from "../../components/UsedItemCardSkeleton";
import { Link } from "react-router-dom";

export default function Blog() {
  const { usedItems } = useContext(UsedItemContext);
  return (
    <>
      <Navbar />
      <div className="px-8 sm:px-8 lg:px-36 mt-9">
        <div className="grid grid-cols-2 mt-2">
          <h1 className="font-medium text-2xl text-textcolor2">UsedItems</h1>
          <Link to="/usedItem/create">
            <button className="bg-button flex items-center justify-between lg:w-48 w-44 ml-auto border border-transparent rounded py-1 px-7 font-medium text-white">
              <img src={Icon} alt="" className="w-1/5" />
              <span className="text-lg font-medium">Create Post</span>
            </button>
          </Link>
        </div>
        {usedItems.length === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3  gap-12 mt-7">
            <UsedItemCardSkeleton />
            <UsedItemCardSkeleton />
            <UsedItemCardSkeleton />
            <UsedItemCardSkeleton />
            <UsedItemCardSkeleton />
            <UsedItemCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3  gap-12 mt-7">
            {usedItems.map((item) => (
              <UsedItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
