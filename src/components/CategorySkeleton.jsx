import React from "react";

export default function CategorySkeleton() {
  return (
      <div className="h-32 w-32 p-4 m-10 bg-[#F6F6F7] flex flex-col items-center justify-center animate-pulse">
        <div className="h-10 w-10 bg-gray-300 "></div>
        <div className="h-4 w-16 bg-gray-300 mt-4"></div>
        <div className="h-4 w-16 bg-gray-300 mt-2"></div>
      </div>
  );
}
