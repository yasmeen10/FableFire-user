import rectangle34 from "../assets/Rectangle 34.svg";
import CancelArrow from "./SVG/CancelArrow";

export default function ShoppingCart() {
  return (
    <div className=" text-textcolor2 text-base border-y border-y-landing font-medium flex items-center justify-between p-2">
      <div>
        <img src={rectangle34} />
      </div>
      <div className="flex items-center justify-between  w-4/5">
        <p className="w-36">The Rise and Fall of the Dinosaurs </p>
        <span>$321</span>
        <div className="w-20  border border-landing rounded-lg flex justify-around items-center  ">
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
        <span>$321</span>
        <CancelArrow />
      </div>
    </div>
  );
}
