import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../interceptor";
import EditSVG from "./../../components/SVG/EditSVG";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export default function Review() {
  const { id } = useParams();
  const [review, setReview] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await axiosInstance.get(
          `http://localhost:3005/api/v1/review/${id}`
        );
        setReview(data.Reviews);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    fetchReview();
  }, [review]);

  const formik = useFormik({
    initialValues: {
      review: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance.post(
          `http://localhost:3005/api/v1/review/${id}`,
          values
        );
        values.review = " ";
      } catch (error) {
        console.log("Error posting review:", error);
        toast.error(error.response.data.message);
      }
    },
  });
  const handleDelete = async (idReview) => {
    try {
      const { data } = await axiosInstance.delete(
        `http://localhost:3005/api/v1/review/${idReview}`
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="block">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4 bg-button max-w-full sm:w-96">
          <input
            type="text"
            name="review"
            placeholder="Write a review"
            className="rounded-full w-full border outline-none px-4 py-1 focus:border-button"
            onChange={formik.handleChange}
            value={formik.values.review}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-button text-white rounded-full px-4 py-1 mb-12"
        >
          Post Review
        </button>

        {review.map((rvw) => {
          return (
            <div key={rvw._id} className="flex mb-5">
              <img
                className="rounded-full object-cover bg-center w-12 h-12 mt-3"
                src={rvw.user.images[0]}
                alt=""
              />
              <div className="mx-3">
                <div className="flex">
                  <p className="font-medium">{rvw.user.firstName}</p>
                  <p className="text-slate-400 mx-3">
                    {rvw.dateOfReview.split("T")[0]}
                  </p>
                </div>
                <p className="text-wrap max-w-96 font-medium">{rvw.review}</p>
                {authUser && authUser._id == rvw.user._id && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-red-600 cursor-pointer"
                    onClick={() => handleDelete(rvw._id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
}
