import { useRef } from "react";
import OrderForm from "../../components/OrderForm";
import OrderSummary from "../../components/OrderSummary";
import Stepper from "../../components/Stepper";
import { FormContext } from "../../context/FormContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Checkout() {
  const formikRef = useRef(null);

  return (
    <>
   <Navbar/>
    <div className="px-4 sm:px-8 lg:px-36 ">
      <Stepper />
      <h1 className="my-10 text-textcolor2 font-medium text-center sm:text-left">
        Checkout
      </h1>
      <FormContext.Provider
        value={{ submitForm: () => formikRef.current?.submitForm() }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-9">
          <div className="col-span-1 lg:col-span-2">
            <OrderForm formikRef={formikRef} />
          </div>
          <OrderSummary
            button={"Checkout"}
            onClick={() => formikRef.current?.submitForm()}
          />
        </div>
      </FormContext.Provider>
    </div>
    <Footer/>
    </>
  );
}
