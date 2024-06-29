import React, { useContext, useState } from "react";
import EmailSVG from "./SVG/EmailSVG";
import PhoneSVG from "./SVG/PhoneSVG";
import EditSVG from "./SVG/EditSVG";
import TrashSVG from "./SVG/TrashSVG";
import { UsedItemContext } from "../context/UsedItemContext";
import { Link, useNavigate } from "react-router-dom";
import fallbackImage from "../../public/imgError.png";

export default function UsedItemData(props) {
  const { currUserUsedItems, handleRemoveUsedItem } =
    useContext(UsedItemContext);
  const { usedItem } = props;
  const navigate = useNavigate();
  const [imageState, setImageState] = useState({ loading: true, error: false });

  const handleImageLoad = () => {
    setImageState({ loading: false, error: false });
  };

  const handleImageError = () => {
    setImageState({ loading: false, error: true });
  };

  let isOwned = false;

  const isItemInArray = (usedItem, array) => {
    return array.some((arrayItem) => arrayItem._id === usedItem._id);
  };
  const isCurrentUserItem = isItemInArray(usedItem, currUserUsedItems);

  if (isCurrentUserItem) {
    isOwned = true;
  }

  const handleRemove = (item) => {
    handleRemoveUsedItem(item);
    navigate("/blog");
  };

  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 border border-transparent rounded-lg relative">
          <div>
            {imageState.loading && (
              <div className="skeleton z-10 h-96 w-full rounded-lg"></div>
            )}
            {!imageState.loading && imageState.error && (
              <img
                src={fallbackImage}
                alt="Fallback"
                className="rounded-lg shadow-md relative z-10 w-full h-96"
              />
            )}
            {!imageState.error && (
              <img
                src={usedItem?.images[0]}
                alt=""
                className="h-96 object-cover w-full rounded-lg"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: imageState.loading ? "none" : "block" }}
              />
            )}
          </div>
          <div className="absolute left-0 bottom-0 w-full px-9 py-3 text-white bg-black bg-opacity-20 backdrop-blur-2xl border border-transparent rounded-b-lg">
            <div className="flex justify-between items-center">
              <h1 className="font-medium text-xl capitalize">
                {usedItem?.title}
              </h1>
              <span className="font-medium text-xl">{usedItem?.price}$</span>
            </div>
            <p className="font-normal text-base my-4">
              {usedItem?.description}
            </p>
            <span className="font-medium text-base">
              {usedItem?.dateOfOrder.split("T")[0]}
            </span>
          </div>
        </div>
        <div>
          <div className="bg-landing border border-transparent rounded-lg p-5">
            <div className="flex gap-4">
              <div>
                <img
                  src={usedItem?.user.images[0]}
                  className="w-24 h-24 rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="capitalize font-medium text-base text-textcolor2">
                  {usedItem?.user.firstName}
                </span>
                <span className="capitalize font-medium text-textcolor1 text-sm">
                  {usedItem?.address}
                </span>
              </div>
            </div>
            <p className="capitalize text-textcolor1 font-medium text-base mt-3">
              {usedItem?.message}
            </p>
            {isOwned && (
              <div className="flex items-center justify-end gap-4 mt-3">
                <button>
                  <Link to={`/usedItem/${usedItem._id}`}>
                    <EditSVG color="text-textcolor2" />
                  </Link>
                </button>
                <button onClick={() => handleRemove(usedItem)}>
                  <TrashSVG color="text-textcolor2" />
                </button>
              </div>
            )}
          </div>
          <div className="bg-landing border border-transparent rounded-lg p-5 mt-9">
            <div className="flex gap-10 mb-5">
              <EmailSVG />
              <span className="text-textcolor2 font-medium text-base">
                {usedItem?.email}
              </span>
            </div>
            <div className="flex gap-10 ">
              <PhoneSVG />
              <span className="text-textcolor2 font-medium text-base">
                {usedItem?.phoneNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
