import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { phoneNumberRegex } from "../constants/PhoneNumberRegex";
import { useEffect, useImperativeHandle, useState } from "react";
import axiosInstance from "../../interceptor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OrderForm(props) {
  const navigate = useNavigate();
  const { formikRef } = props;
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/user/"
        );
        setInitialValues({
          firstName: data.data.firstName || "",
          lastName: data.data.lastName || "",
          city: data.data.city || "",
          country: data.data.country || "",
          address: data.data.address || "",
          email: data.data.email || "",
          phoneNumber: data.data.phoneNumber || "",
        });
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong Please try again");
      }
    }
    fetchUserData();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "Last Name must be at least 3")
        .required("First Name is required"),
      lastName: Yup.string()
        .min(3, "Last Name must be at least 3")
        .required("Last Name is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
      address: Yup.string()
        .min(3, "Address must be at least 3")
        .required("Address is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string().matches(
        phoneNumberRegex,
        "Phone number must be 11 digits "
      ),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(
          "http://localhost:3005/api/v1/order/",
          values
        );
        if (response.status === 200) {
          const order = response.data.data.order;
          localStorage.setItem("orderId", order._id);
          navigate("/payment");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong Please try again");
      }
    },
  });

  useImperativeHandle(formikRef, () => ({
    submitForm: formik.submitForm,
  }));

  return (
    <div>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={formik.validationSchema}
        enableReinitialize={true}
      >
        <Form className="mb-11">
          <div className=" flex justify-between items-center">
            <div className="" style={{ width: "49%" }}>
              <label
                htmlFor="firstName"
                className="text-textcolor2 font-medium text-base"
              >
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                className="border border-landing rounded-lg w-full mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-sm text-red-500 mt-2">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>
            <div className="" style={{ width: "49%" }}>
              <label
                htmlFor="lastName"
                className="text-textcolor2 font-medium text-base"
              >
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                className="border border-landing rounded-lg w-full mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-sm text-red-500 mt-2">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>
          </div>
          <div className=" flex justify-between items-center mt-4">
            <div style={{ width: "49%" }}>
              <label
                htmlFor="email"
                className="text-textcolor2 font-medium text-base"
              >
                E-mail
              </label>
              <Field
                name="city"
                type="text"
                className="border border-landing rounded-lg w-full mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset text-gray-400"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                disabled
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-sm text-red-500 mt-2">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div style={{ width: "49%" }}>
              <label
                htmlFor="phoneNumber"
                className="text-textcolor2 font-medium text-base"
              >
                Phone
              </label>
              <Field
                name="phoneNumber"
                type="text"
                className="border border-landing rounded-lg w-full mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-sm text-red-500 mt-2">
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </div>
          </div>
          <div className=" flex justify-between items-center mt-4">
            <div style={{ width: "49%" }}>
              <label
                htmlFor="city"
                className="text-textcolor2 font-medium text-base"
              >
                City
              </label>
              <Field
                name="city"
                type="text"
                className="border border-landing rounded-lg w-full mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="text-sm text-red-500 mt-2">
                  {formik.errors.city}
                </div>
              ) : null}
            </div>
            <div style={{ width: "49%" }}>
              <label
                htmlFor="country"
                className="text-textcolor2 font-medium text-base"
              >
                Country
              </label>
              <Field
                name="country"
                type="text"
                className="border border-landing rounded-lg w-full mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              />
              {formik.touched.country && formik.errors.country ? (
                <div className="text-sm text-red-500 mt-2">
                  {formik.errors.country}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="address"
              className="text-textcolor2 font-medium text-base"
            >
              Address
            </label>
            <Field
              name="address"
              type="text"
              className="border border-landing rounded-lg w-full mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-sm text-red-500 mt-2">
                {formik.errors.address}
              </div>
            ) : null}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
