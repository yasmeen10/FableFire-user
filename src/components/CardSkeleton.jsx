import React from "react";

export default function CardSkeleton() {
  return (
    <div className="flex items-center justify-center p-2  ">
      <div className="bg-white rounded-lg flex-col w-40 ">
        <div className="skeleton w-full h-60 rounded-t-lg"></div>
        <div className="flex flex-col p-1">
          <div className="skeleton h-6 w-full rounded-md m-1"></div>
          <div className="skeleton h-6 w-full rounded-md m-1"></div>
        </div>
      </div>
    </div>
  );
}
