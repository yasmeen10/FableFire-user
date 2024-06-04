import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";

export default function SignIn() {
  // const {isLoggedIn}=useAuth();

  // const logIn=(e)=>{
  //   e.preventDefault();
  //   isLoggedIn(true)

  // }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(emailPattern, "Email must be like example@gmail.com"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await axios.post(
          "http://localhost:3005/api/v1/user/login",
          values
        );

        if (data.status == 200) {
          localStorage.setItem("token", data.data.token);
          toast.success("Sign In Successfully");
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="card lg:card-side bg-white  w-full h-screen  m-auto flex flex-col lg:flex-row ">
        <div className=" p-2  border-collapse border border-[#A68877]   rounded-lg m-auto">
          <h2 className="font-semibold text-button text-center p-5 text-2xl">
            Sign In
          </h2>
          <p className="text-center text-xs pb-5 font-medium">
            Don't Have Account?{" "}
            <Link to="/signUp" className="text-button">
              Sign Up
            </Link>
          </p>

          <form onSubmit={formik.handleSubmit} className="p-5 w-full">
            <div className="pb-3">
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
                className="bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500"> {formik.errors.email}</div>
              ) : null}
            </div>
            <div className="pb-3">
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
                className="bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500"> {formik.errors.password}</div>
              ) : null}
            </div>

            <div className="mt-5  h-11 m-auto bg-button text-center pt-2 w-full lg:w-64 rounded-lg">
              <button className="text-white" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
        <figure className="lg:block w-full lg:w-6/12 rounded-tr-2xl rounded-br-2xl">
          <img
            src="/LoginProj.jpg"
            alt="Album"
            className="hidden lg:block w-full h-screen lg:rounded-tr-2xl lg:rounded-br-2xl"
          />
        </figure>
      </div>
    </>
  );
}
