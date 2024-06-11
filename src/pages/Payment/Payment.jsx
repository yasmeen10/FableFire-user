import { useContext, useRef } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import OrderSummary from "../../components/OrderSummary";
import PaymentDetails from "../../components/PaymentDetails";
import Stepper from "../../components/Stepper";
import { OrderProvider } from "../../context/OrderContext";

export default function Payment() {
  const formikRef = useRef(null);
  return (
    <OrderProvider>
      {/* <Navbar /> */}
      <div className="px-4 sm:px-8 lg:px-36 ">
        <Stepper />
        <h1 className=" my-10 text-textcolor2 font-medium text-center sm:text-left">
          Shopping Cart
        </h1>
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-9">
          <div className="col-span-1 lg:col-span-2">
            <PaymentDetails formikRef={formikRef} />
          </div>
          <OrderSummary
            button={"Submit"}
            onClick={() => formikRef.current?.submitForm()}
          />
        </div>
      </div>
      <Footer />
    </OrderProvider>
  );
}
