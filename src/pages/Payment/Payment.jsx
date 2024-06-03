import OrderSummary from "../../components/OrderSummary";
import PaymentDetails from "../../components/PaymentDetails";
import Stepper from "../../components/Stepper";

export default function Payment() {
  return (
    <div className="px-4 sm:px-8 lg:px-36 ">
      <Stepper />
      <h1 className=" my-10 text-textcolor2 font-medium text-center sm:text-left">
        Shopping Cart
      </h1>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-9">
        <div className="col-span-1 lg:col-span-2">
          <PaymentDetails />
        </div>
        <OrderSummary />
      </div>
    </div>
  );
}
