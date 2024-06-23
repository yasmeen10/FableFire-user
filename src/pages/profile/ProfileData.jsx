import React, { useEffect, useState } from "react";
import axiosInstance from "../../../interceptor";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import EditSVG from "../../components/SVG/EditSVG";
import PasswordSVG from "../../components/SVG/PasswordSVG";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";

export default function ProfileData() {
  const [profile, setProfile] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { setAuthUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/user"
        );

        const profileData = await data.data;
        setProfile(profileData);
        setAuthUser(profileData);
        setProfileImageUrl(profileData.images[0]);
      } catch (error) {
        toast.error("Something Went Wrong Please try again");
      }
    }
    fetchData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      address: profile.address || "",
      phoneNumber: profile.phoneNumber || "",
      images: profile.images || [],
    },
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.patch(
          "http://localhost:3005/api/v1/user",
          values,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Profile Edited Successfully");

        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/user"
        );

        const profileData = data.data;
        setProfile(profileData);
        setProfileImageUrl(profileData.images[0]);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  const formikPassword = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await axiosInstance.patch(
          "http://localhost:3005/api/v1/user/changePassword",
          values
        );
        toast.success("Password Edited Successfully");
        resetForm();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("images", file);
    setProfileImageUrl(URL.createObjectURL(file));
  };

  const handleImageReset = () => {
    formik.setFieldValue("images", [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSouls88ujOkH8eT0AKf0gU4wh8pY4249WYrWu9EVZwPsXgKvyIz0dH2roxugfxHvAhBfA&usqp=CAU",
    ]);
    setProfileImageUrl(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSouls88ujOkH8eT0AKf0gU4wh8pY4249WYrWu9EVZwPsXgKvyIz0dH2roxugfxHvAhBfA&usqp=CAU"
    );
  };

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-textcolor2 text-xl">My Profile</h2>
        <div className="flex">
          <button
            title="changePassword"
            className="mx-4"
            onClick={handleToggle}
          >
            <PasswordSVG />
          </button>
          <div className=" flex items-center w-24 h-10 bg-light-button px-5 rounded-lg text-white py-2">
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Edit
            </button>
            <EditSVG color="text-white" />
          </div>
        </div>
      </div>

      <div className="flex justify-start my-20 border rounded-xl px-8 py-4 items-center">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={profileImageUrl}
          alt="user's Image"
        />
        <p className="px-4 font-medium"> {profile.firstName}</p>
      </div>

      <div className="border rounded-xl px-8 py-4">
        <p className="font-medium">Personal Data</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
          <div>
            <p className="inline-flex font-medium text-button">First Name: </p>
            <span> {profile.firstName}</span>
          </div>
          <div>
            <p className="inline-flex font-medium text-button">Last Name: </p>
            <span> {profile.lastName}</span>
          </div>
          <div>
            <p className="inline-flex font-medium text-button">Address: </p>
            <span> {profile.address}</span>
          </div>
          <div>
            <p className="inline-flex font-medium text-button">
              Phone Number:{" "}
            </p>
            <span> {profile.phoneNumber}</span>
          </div>
          <div>
            <p className="inline-flex font-medium text-button">Email: </p>
            <span> {profile.email}</span>
          </div>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <div className="flex gap-10 items-start">
            <div className="flex-shrink-0">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={profileImageUrl}
                alt=""
              />
              <div className="flex justify-center gap-2 mt-4">
                <label>
                  <EditSVG color="text-textcolor2" />
                  <input
                    type="file"
                    name="images"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6  cursor-pointer"
                  onClick={handleImageReset}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit} className="flex-grow">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </button>
              <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    className="bg-transparent border-b border-gray-400 w-full focus:outline-none"
                    type="text"
                    name="firstName"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    className="bg-transparent border-b border-gray-400 w-full focus:outline-none"
                    type="text"
                    name="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <input
                    className="bg-transparent border-b border-gray-400 w-full focus:outline-none"
                    type="text"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    className="bg-transparent border-b border-gray-400 w-full focus:outline-none"
                    type="text"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-8 py-2 rounded-xl bg-button text-white mt-4"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {showModal && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-black50 transition-all"
        >
          <div className="p-4 w-full max-w-md m-auto my-28">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Change Password
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleToggle}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form
                  className="space-y-4"
                  onSubmit={formikPassword.handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="oldPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Old Password
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      id="oldPassword"
                      onChange={formikPassword.handleChange}
                      value={formikPassword.values.oldPassword}
                      className="bg-transparent border-b border-gray-400 w-full focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      onChange={formikPassword.handleChange}
                      value={formikPassword.values.newPassword}
                      className="bg-transparent border-b border-gray-400 w-full focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      onChange={formikPassword.handleChange}
                      value={formikPassword.values.confirmPassword}
                      className="bg-transparent border-b border-gray-400 w-full focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-2 rounded-xl bg-button text-white mt-4 "
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
