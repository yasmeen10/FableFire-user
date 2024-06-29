import { useContext } from "react";
import Stepper from "../../components/Stepper";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { OrderContext, OrderProvider } from "../../context/OrderContext";
import { useLocation } from "react-router-dom";
import CurrencyConverter from "../../components/CurrencyConverter";

export default function OrderConfirmation() {
  const { orderDetails } = useContext(OrderContext);
  const paymentMethod = localStorage.getItem("paymentMethod");

  if (!orderDetails.order) {
    <div className="className=px-4 mb-14 sm:px-8 lg:px-36"></div>;
  }
 
  return (
    <>
      <Navbar />
      <div className="px-4 mb-14 sm:px-8 lg:px-36 ">
        <Stepper />
        <h1 className=" my-10 text-textcolor2 font-medium text-center sm:text-left">
          Your Order Confirmed!
        </h1>
        {!orderDetails.order ? (
          <div className="border border-landing rounded-lg py-2 px-8">
            <div className="skeleton h-6 w-1/4 rounded-md mb-2"></div>
            <div className="skeleton h-6 w-1/2 rounded-md"></div>
          </div>
        ) : (
          <div className="border border-landing rounded-lg py-2 px-8">
            <h1 className="text-base font-medium text-textcolor2">
              Hello {orderDetails?.order?.firstName}.
            </h1>
            <p className="text-base font-light text-textcolor2">
              Your order has been confirmed and will be shipping within next two
              days
            </p>
          </div>
        )}

        <div className="overflow-hidden border border-landing rounded-lg mt-14">
          <table className="table-fixed  w-full">
            <tbody>
              <tr className="flex flex-col md:flex-row items-center">
                <td className="border-r border-r-landing py-3 w-full lg:w-1/4 text-center">
                  <span className="block text-xl font-semibold text-placeholder">
                    Order Date
                  </span>
                  {!orderDetails.order ? (
                    <span className="skeleton h-6 w-1/2 mx-auto mt-1 rounded-md block"></span>
                  ) : (
                    <span className="block text-xl font-normal text-textcolor2">
                      {orderDetails?.order?.dateOfOrder.split("T")[0]}
                    </span>
                  )}
                </td>
                <td className="border-r border-r-landing  py-3 w-full lg:w-1/4 text-center">
                  <span className="block text-xl font-semibold text-placeholder">
                    Payment
                  </span>
                  {!orderDetails.order ? (
                    <span className="skeleton h-6 w-1/2 mx-auto mt-1 rounded-md block"></span>
                  ) : (
                    <span className="block text-xl font-normal text-textcolor2">
                      {paymentMethod}
                    </span>
                  )}
                </td>
                <td className="border-r border-r-landing  py-3 w-full lg:w-1/4 text-center">
                  <span className="block text-xl font-semibold text-placeholder">
                    Shipping Address
                  </span>
                  {!orderDetails.order ? (
                    <span className="skeleton h-6 w-1/2 mx-auto mt-1 rounded-md block"></span>
                  ) : (
                    <span className="block text-xl font-normal text-textcolor2 capitalize">
                      {orderDetails?.order?.address}
                    </span>
                  )}
                </td>
                <td className=" py-3 w-full lg:w-1/4 text-center">
                  <span className="block text-xl font-semibold text-placeholder">
                    Total Price
                  </span>
                  {!orderDetails.order ? (
                    <span className="skeleton h-6 w-1/2 mx-auto mt-1 rounded-md block"></span>
                  ) : (
                    <CurrencyConverter price={orderDetails?.order?.totalPrice}>
                      {({ localPrice, currency }) => (
                        <span className="block text-xl font-normal text-textcolor2">
                          {localPrice} {currency}
                        </span>
                      )}
                    </CurrencyConverter>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {!orderDetails.order ? (
          <div className="flex items-center justify-between p-2 border-b border-b-landing">
            <div className="skeleton h-36 w-1/5 rounded-md"></div>
            <div className="flex items-center justify-between ml-2 w-4/5 rounded-md">
              <div className="skeleton h-6 w-full rounded-md"></div>
            </div>
          </div>
        ) : (
          orderDetails.orderItems.map((item) => (
            <div
              className="flex items-center p-2 border-b border-b-landing"
              key={item._id}
            >
              <div className="w-2/12 ">
                <img src={item.item.images[0]} />
              </div>
              <div className="flex  items-center justify-between w-10/12  px-14 ">
                <div className="">
                  <p className="text-base capitalize text-textcolor2">
                    {item.item.title}
                  </p>
                  <span className="text-base text-placeholder">
                    Quantity:${item?.quantity}
                  </span>
                </div>
                <CurrencyConverter price={item?.item?.price * item?.quantity}>
                  {({ localPrice, currency }) => (
                    <span className="text-textcolor2 font-medium text-base">
                      {localPrice} {currency}
                    </span>
                  )}
                </CurrencyConverter>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}
