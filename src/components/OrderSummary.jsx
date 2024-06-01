export default function OrderSummary() {
  return (
    <div className="border rounded-lg border-landing text-textcolor2 font-medium  flex flex-col p-10 h-fit">
      <h1>Order Summary</h1>
      <div className="text-base flex items-center justify-between border-b border-b-gray2 py-3 mt-5">
        <span>The Rise and Fall of the Dinosaurs</span>
        <span>$321</span>
      </div>
      <div className="text-base py-3 flex items-center justify-between">
        <span>Total</span>
        <span>$321</span>
      </div>
      <button className="bg-button border border-transparent rounded mt-5 py-3 font-medium text-white text-base transition-all hover:bg-transparent hover:border-button hover:text-button ">
        Proceed to checkout
      </button>
    </div>
  );
}
