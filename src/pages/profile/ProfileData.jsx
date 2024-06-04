import React, { useEffect, useState } from "react";
import axiosInstance from "../../../interceptor";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import EditSVG from "../../components/SVG/EditSVG";

export default function ProfileData() {
  const [profile, setProfile] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axiosInstance.get(
          "http://localhost:3005/api/v1/user"
        );

        const profileData =await data.data;
        setProfile(profileData);
        setProfileImageUrl(profileData.images[0]);
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
      images: profile.images|| [],
    },
    onSubmit: async (values) => {
      try {
        
        const response = await axiosInstance.patch(
          "http://localhost:3005/api/v1/user",
         values,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
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
        console.log(error);
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
   
    formik.setFieldValue("images",["https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="] );
    setProfileImageUrl("https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=");
    
  };

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
         <EditSVG/>
        </div>
      </div>

      <div className="flex justify-start my-20 border rounded-xl px-8 py-4 items-center">
        <img
          className="w-16 h-16 rounded-full"
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
                src={profileImageUrl}
                alt=""
              />
              <div className="flex justify-center gap-2 mt-4">
                <label>
                 <EditSVG/>
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
                onClick={() => document.getElementById("my_modal_3").close()}
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
