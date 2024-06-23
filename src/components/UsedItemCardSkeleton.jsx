import React from "react";

export default function UsedItemCardSkeleton() {
  return (
    <div className="w-full border border-gray1 rounded-lg p-3">
      <div className="bg-white rounded-lg flex-col  ">
        <div className="skeleton w-full h-64  rounded-lg"></div>
        <div className="flex flex-col p-1">
          <div className="skeleton h-6 w-full rounded-md m-1"></div>
          <div className="skeleton h-6 w-full rounded-md m-1"></div>
          <div className="skeleton h-6 w-full rounded-md m-1"></div>
          <div className="skeleton h-6 w-full rounded-md m-1"></div>
        </div>
      </div>
    </div>
  );
}
