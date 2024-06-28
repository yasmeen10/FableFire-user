import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import axiosInstance from "../../../interceptor";
import { useAuth } from "../../context/AuthContext";
import UsedItemCard from "./../../components/UsedItemCard";
import UsedItemCardSkeleton from "./../../components/UsedItemCardSkeleton";
import PostSVG from "../../components/SVG/PostSVG";

export default function PostsProfile() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchPost() {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        `http://localhost:3005/api/v1/usedItem/user`
      );
      setPosts(data.data);
      setIsLoading(false)
    }
    fetchPost();
  }, []);

  {
    if (isLoading) {
      return (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-5">
            <UsedItemCardSkeleton />
            <UsedItemCardSkeleton />
            <UsedItemCardSkeleton />
            <UsedItemCardSkeleton />
          </div>
        </>
      );
    }
  }

  return (
    <>
        <div className="pt-4">
          <h2 className="font-semibold text-textcolor2 text-xl">Your Posts</h2>
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <PostSVG className=" mb-4" />
          <h1 className="text-textcolor1 text-4xl text-center">
            No Posts in your PostsList.
          </h1>
        </div>
      ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-5">
            {posts.map((post) => {
              return <UsedItemCard item={post} />;
            })}
          </div>
      )}
      </div>
    </>
  );
}
