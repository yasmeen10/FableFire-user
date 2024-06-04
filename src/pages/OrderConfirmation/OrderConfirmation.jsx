import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Stepper from "../../components/Stepper";

export default function OrderConfirmation() {
  return (
    <>
    <Navbar/>
  
    <div className="px-4 mb-14 sm:px-8 lg:px-36 ">
      <Stepper />
      <h1 className=" my-10 text-textcolor2 font-medium text-center sm:text-left">
        Your Order Confirmed!
      </h1>
      <div className="border border-landing rounded-lg py-2 px-8">
        <h1 className="text-base font-medium text-textcolor2">
          Hello Yasmeen.
        </h1>
        <p className="text-base font-light text-textcolor2">
          Your order has been confirmed and will be shipping within next two
          days
        </p>
      </div>
      <div className="overflow-hidden border border-landing rounded-lg mt-14">
        <table className="table-fixed  w-full">
          <tbody>
            <tr className="flex flex-col md:flex-row items-center">
              <td className="border-r border-r-landing py-3 w-full lg:w-1/4 text-center">
                <span className="block text-xl font-semibold text-placeholder">
                  Order Date
                </span>
                <span className="block text-xl font-normal text-textcolor2">
                  12, Mar, 2024
                </span>
              </td>
              <td className="border-r border-r-landing  py-3 w-full lg:w-1/4 text-center">
                <span className="block text-xl font-semibold text-placeholder">
                  Payment
                </span>
                <span className="block text-xl font-normal text-textcolor2">
                  Cash
                </span>
              </td>
              <td className="border-r border-r-landing  py-3 w-full lg:w-1/4 text-center">
                <span className="block text-xl font-semibold text-placeholder">
                  Shipping Address
                </span>
                <span className="block text-xl font-normal text-textcolor2">
                  Cairo zamalik apt 205
                </span>
              </td>
              <td className=" py-3 w-full lg:w-1/4 text-center">
                <span className="block text-xl font-semibold text-placeholder">
                  Total Price
                </span>
                <span className="block text-xl font-normal text-textcolor2">
                  $331
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center p-2 border-b border-b-landing">
        <div>
          <img src={rectangle34} />
        </div>
        <div className="flex items-center justify-between w-10/12  px-14 ">
          <div className="">
            <p className="text-base">The Rise and Fall of the Dinosaurs </p>
            <span className="text-base text-placeholder">Quantity:1</span>
          </div>
          <span className="text-textcolor2 font-medium text-base">$321</span>
        </div>
      </div>
      <div className="flex items-center p-2 border-b border-b-landing">
        <div>
          <img src="" />
        </div>
        <div className="flex items-center justify-between w-10/12  px-14 ">
          <div className="">
            <p className="text-base">The Rise and Fall of the Dinosaurs </p>
            <span className="text-base text-placeholder">Quantity:1</span>
          </div>
          <span className="text-textcolor2 font-medium text-base">$321</span>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
