import React, { useContext, useState } from "react";
import DoubleArrow from "./SVG/DoubleArrow";
import EditSVG from "./SVG/EditSVG";
import TrashSVG from "./SVG/TrashSVG";
import { UsedItemContext } from "../context/UsedItemContext";
import { Link } from "react-router-dom";
import CurrencyConverter from "./CurrencyConverter";
import fallbackImage from "../../public/imgError.png";

export default function UsedItemCard(props) {
  const { currUserUsedItems, handleRemoveUsedItem } =
    useContext(UsedItemContext);
  const { item } = props;
  let isOwned = false;

  const [imageState, setImageState] = useState({ loading: true, error: false });

  const handleImageLoad = () => {
    setImageState({ loading: false, error: false });
  };

  const handleImageError = () => {
    setImageState({ loading: false, error: true });
  };

  const isItemInArray = (item, array) => {
    return array.some((arrayItem) => arrayItem?._id === item?._id);
  };
  const isCurrentUserItem = isItemInArray(item, currUserUsedItems);

  if (isCurrentUserItem) {
    isOwned = true;
  }

  return (
    <div className="w-full h-full border border-gray1 rounded-lg p-3 relative">
      {item?.images && (
        <div>
          <div className="relative">
            {imageState.loading && (
              <div className="skeleton z-10 h-64 w-full rounded-lg"></div>
            )}
            {!imageState.loading && imageState.error && (
              <img
                src={fallbackImage}
                alt="Fallback"
                className="rounded-lg shadow-md relative z-10 w-full h-64"
              />
            )}
            {!imageState.error && (
              <img
                src={item?.images[0]}
                className="w-full h-64 object-fill border rounded-lg"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: imageState.loading ? "none" : "block" }}
              />
            )}
            {isOwned && (
              <div className="absolute left-0 top-0 w-full h-full border rounded-lg bg-black bg-opacity-65 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <ul className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-5">
                  <li className="cursor-pointer rounded-full bg-black flex items-center justify-center p-2">
                    <Link to={`/usedItem/${item._id}`}>
                      <EditSVG color="text-white" />
                    </Link>
                  </li>
                  <li
                    className="cursor-pointer rounded-full bg-black flex items-center justify-center p-2"
                    onClick={() => handleRemoveUsedItem(item)}
                  >
                    <TrashSVG color="text-white" />
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link to={`/usedItemDetails/${item._id}`}>
            <div className="my-10">
              <div className="flex items-center justify-between my-1">
                <span className="block font-medium w-3/4 text-base text-textcolor2 capitalize ">
                  {item?.title}
                </span>
                {
                  <CurrencyConverter price={item.price}>
                    {({ localPrice, currency }) => (
                      <span className="block font-medium text-base text-textcolor2 capitalize">
                        {localPrice} {currency}
                      </span>
                    )}
                  </CurrencyConverter>
                }
              </div>
              <div className="flex items-center justify-between my-1">
                <span className="block font-medium text-base text-textcolor2 capitalize">
                  {item?.user?.firstName}
                </span>
                <span className="block font-medium text-base text-textcolor2">
                  {item?.phoneNumber}
                </span>
              </div>
              <span className="block font-medium text-base text-textcolor2">
                {item?.email}
              </span>
            </div>
          </Link>
          <Link to={`/usedItemDetails/${item._id}`}>
            <button className="absolute bottom-2 left-3/4 flex items-center justify-center cursor-pointer">
              <span className="font-medium text-textcolor2 underline">
                Info
              </span>
              <DoubleArrow />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
