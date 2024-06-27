import { Field, Formik, useFormik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { phoneNumberRegex } from "../constants/PhoneNumberRegex";
import axiosInstance from "../../interceptor";
import { toast } from "react-toastify";

export default function EventForm(props) {
  const { close } = props;
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    phoneNumber: "",
    address: "",
  });
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(phoneNumberRegex, "Invalid Phone Number")
      .required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axiosInstance.patch(
          "http://localhost:3005/api/v1/user",
          values
        );
        if (response.status === 200) {
          close();
        }
        console.log(response);
      } catch (error) {
        toast.error(error.response.data.message);
      }
      setLoading(false);
    },
  });

  return (
    <>
      <div className="bg-white border rounded-lg w-1/2 mx-auto p-8">
        <h1 className="capitalize text-textcolor2 text-center font-medium">
          Complete Your Data First
        </h1>
        <Formik
          onSubmit={formik.handleSubmit}
          initialValues={formik.initialValues}
          validationSchema={formik.validationSchema}
          enableReinitialize={true}
        >
          <Form>
            <Field
              name="phoneNumber"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              placeholder="Phone Number"
              className="border border-landing rounded-lg w-full mt-6 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset placeholder:text-placeholder placeholder:text-base placeholder:font-medium"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-sm text-red-500 mt-2 ml-2">
                {formik.errors.phoneNumber}
              </div>
            ) : null}
            <Field
              name="address"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              placeholder="Address"
              className="border border-landing rounded-lg w-full mt-6 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset placeholder:text-placeholder placeholder:text-base placeholder:font-medium"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-sm text-red-500 mt-2 ml-2">
                {formik.errors.address}
              </div>
            ) : null}
            <div className="mt-4 flex items-center justify-end">
              {loading ? (
                <button
                  type="submit"
                  className="bg-button text-white font-medium text-lg py-1 px-10 rounded cursor-pointer"
                >
                  <span className="loading loading-spinner">loading</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-button text-white font-medium text-lg py-1 px-10 rounded cursor-pointer"
                >
                  Save
                </button>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}
