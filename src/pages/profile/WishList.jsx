import React, { useContext } from "react";
import Card from "../../components/Card";
import { WishlistContext } from "../../context/WishlistContext"

export default function WishList() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <>
      <h2 className="font-semibold text-textcolor2 text-xl">WishList</h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {wishlist.map((item) => {
          return <Card key={item._id} item={item} />;
        })}
      </div>
    </>
  );
}
