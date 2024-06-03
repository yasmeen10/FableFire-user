import React, { useEffect, useState } from "react";
import axiosInstance from "../../../interceptor";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function ProfileData() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/user"
        );

        const profileData = data.data;
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      password: profile.password || "",
      address: profile.address || "",
      phoneNumber: profile.phoneNumber || "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.patch(
          "http://localhost:3005/api/v1/user",
          values
        );
        toast.success("Profile Edited Successfully");

        // to make data show after update
        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/user"
        );

        const profileData = data.data;
        setProfile(profileData);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-textcolor2 text-xl">My Profile</h2>
        <div className="flex items-center w-24 h-10 bg-light-button px-5 rounded-lg text-white py-2">
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Edit
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-start my-20 border rounded-xl px-8 py-4 items-center">
        <img
          className="w-16 h-16 rounded-full"
          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
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
            <p className="inline-flex font-medium text-button">Phone Number: </p>
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
                className="w-24 h-24 rounded-full"
                src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                alt=""
              />
              <div className="flex justify-center gap-2 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-button"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-button"
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
                  <label className="block text-sm font-medium">First Name</label>
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
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    className="bg-transparent border-b border-gray-400 w-full focus:outline-none"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
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
                  <label className="block text-sm font-medium">Phone Number</label>
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
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
