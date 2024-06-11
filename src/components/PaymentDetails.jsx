import { useContext, useEffect, useImperativeHandle, useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik, useFormik } from "formik";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../interceptor";

export default function PaymentDetails(props) {
  const { formikRef } = props;
  const [initialValues, setInitialValues] = useState({ paymentMethod: "" });
  const { orderDetails } = useContext(OrderContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      paymentMethod: Yup.string().required("Payment method is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (values.paymentMethod == "cash") {
          const response = await axiosInstance.patch(
            `http://localhost:3005/api/v1/order/${orderDetails.order._id}`,
            {
              status: "Accepted",
            }
          );
          if (response.status === 200) {
            navigate("/orderconfirmation", {
              state: { paymentMethod: "Cash" },
            });
          }
        } else {
          const response = await axiosInstance.post(
            "http://localhost:3005/api/v1/stripe/create-checkout-session",
            {
              orderId: orderDetails.order._id,
            }
          );
          if (response.status === 200) {
            navigate("/orderconfirmation", {
              state: { paymentMethod: "VISA" },
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useImperativeHandle(formikRef, () => ({
    submitForm: formik.submitForm,
  }));

  return (
    <div>
      <div className="shippingDetails border border-landing rounded-lg">
        <div className="border-b border-b-landing">
          <h1 className="my-2 ml-6 text-sm">Shipping Details</h1>
        </div>
        {!orderDetails.order ? (
          <div className="my-2 mx-6">
            <div className="flex items-center justify-between mt-2">
              <div className="skeleton h-6 w-1/4 rounded-md"></div>
              <div className="skeleton h-6 w-1/4 rounded-md"></div>
            </div>
            <div className="skeleton h-6 w-1/2 rounded-md mt-2"></div>
            <div className="skeleton h-6 w-1/2 rounded-md mt-2"></div>
            <div className="skeleton h-6 w-1/2 rounded-md mt-2"></div>
          </div>
        ) : (
          <div className="my-2 mx-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium capitalize">
                {orderDetails?.order?.firstName}
              </span>
              <span className="text-sm font-medium">
                {orderDetails?.order?.email}
              </span>
            </div>
            <span className="block text-sm font-medium capitalize">
              {orderDetails?.order?.country}
            </span>
            <span className="block text-sm font-medium capitalize">
              {orderDetails?.order?.city}
            </span>
            <span className="block text-sm font-medium capitalize">
              {orderDetails?.order?.address}
            </span>
          </div>
        )}
      </div>
      <div className="mt-10">
        <h1 className="text-base">Choose payment method</h1>
        <div className="border border-landing rounded-lg px-9 py-4 mt-2">
          <Formik
            initialValues={formik.initialValues}
            validationSchema={formik.validationSchema}
            enableReinitialize={true}
          >
            <Form>
              <div role="group" aria-labelledby="my-radio-group">
                <label className="block text-textcolor2">
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    className="mr-1"
                    onChange={formik.handleChange}
                    checked={formik.values.paymentMethod === "cash"}
                  />
                  Cash
                </label>
                <label className="block text-textcolor2">
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="visa"
                    className="mr-1"
                    onChange={formik.handleChange}
                    checked={formik.values.paymentMethod === "visa"}
                  />
                  VISA
                </label>
                {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.paymentMethod}
                  </div>
                ) : null}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
