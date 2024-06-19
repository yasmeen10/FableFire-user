
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";


export default function SignIn() {
  const { formik}=useAuth();


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
        <figure className="lg:block w-full lg:w-6/12 rounded-tl-2xl rounded-bl-2xl">
          <img
            src="/LoginProj.jpg"
            alt="Album"
            className="hidden lg:block w-full h-screen lg:rounded-tl-2xl lg:rounded-bl-2xl"
          />
        </figure>
      </div>
    </>
  );
}
