import axios from "axios";
import { replace, useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function SignUp() {
  const letters = /^[a-zA-Z\s'-]+$/;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "Name must be at least 3 letters")
      .max(20, "Too long!")
      .required("First name is required")
      .matches(letters, "Name Must be Letters"),
    lastName: Yup.string()
      .min(3, "Name must be at least 3 letters")
      .max(20, "Too long!")
      .required("Last name is required")
      .matches(letters, "Name Must be Letters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(emailPattern, "Email must be like example@gmail.com "),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(phonePattern, "Phone Number must be 11 number"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await axios.post(
          "http://localhost:3005/api/v1/user",
          values
        );

        if (data.status == 201) {
          toast.success("Sign Up Successfully");
          navigate("/signIn");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="card lg:card-side bg-white  w-full h-screen  m-auto flex flex-col lg:flex-row ">
        <figure className="lg:block w-full lg:w-6/12 rounded-tr-2xl rounded-br-2xl">
          <img
            src="/SignUpProj.jpg"
            alt="Album"
            className="hidden lg:block w-full h-screen lg:rounded-tr-2xl lg:rounded-br-2xl"
          />
        </figure>
        <div className=" p-2  border-collapse border border-[#A68877]   rounded-lg m-auto">
          <h2 className="font-semibold text-button text-center p-5 text-2xl">
            Sign Up
          </h2>
          <p className="text-center text-xs pb-5 font-medium">
            Already Have Account?{" "}
            <Link to="/signIn" className="text-button">
              Sign In
            </Link>
          </p>

          <form onSubmit={formik.handleSubmit} className="p-5 w-full">
            <div></div>
            <div className="pb-2 ">
              <label className="text-textcolor1" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className=" bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500">{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="pb-2">
              <label className="text-textcolor1" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className=" bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500"> {formik.errors.lastName}</div>
              ) : null}
            </div>
            <div className="pb-2">
              <label className="text-textcolor1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className=" bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500"> {formik.errors.email}</div>
              ) : null}
            </div>
            <div className="pb-2">
              <label className="text-textcolor1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className=" bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500"> {formik.errors.password}</div>
              ) : null}
            </div>

            <div className="pb-2">
              <label className="text-textcolor1" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className=" bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-500"> {formik.errors.address}</div>
              ) : null}
            </div>
            <div className="pb-3">
              <label className="text-textcolor1" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                className=" bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500"> {formik.errors.phoneNumber}</div>
              ) : null}
            </div>
            <div className="mt-5  h-11 m-auto bg-button text-center pt-2 w-full lg:w-64 rounded-lg">
              <button className="text-white" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
