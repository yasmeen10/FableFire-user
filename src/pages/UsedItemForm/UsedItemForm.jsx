import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, useFormik } from "formik";
import { phoneNumberRegex } from "../../constants/PhoneNumberRegex";
import axiosInstance from "../../../interceptor";
import ImageIcon from "../../assets/ImageIcon.png";
import { useAuth } from "../../context/AuthContext";
import { UsedItemContext } from "../../context/UsedItemContext";
import { toast } from "react-toastify";

export default function UsedItemForm() {
  const [itemTypes, setItemTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [usedItem, setUsedItem] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([ImageIcon]);
  const { authUser } = useAuth();
  const { handleAddNewUsedItem, handleEditUsedItem } =
    useContext(UsedItemContext);
  const { id } = useParams();
  const mood = id ? "edit" : "add";

  const [initialValues, setInitialValues] = useState({
    images: [],
    address: authUser?.address || "",
    email: authUser?.email || "",
    phoneNumber: authUser?.phoneNumber || "",
    message: "",
    title: "",
    price: 0,
    category: "",
    itemType: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string()
      .matches(phoneNumberRegex, "Invalid phone number")
      .required("Phone number is required"),
    message: Yup.string(),
    title: Yup.string().required("Title is required"),
    price: Yup.number(),
    category: Yup.string(),
    itemType: Yup.string().required("Item Type is required"),
    images: Yup.array().min(1, "At least one image is required"),
  });

  useEffect(() => {
    async function fetchItemTypes() {
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/admin/itemType"
      );
      setItemTypes(data.data);
    }
    async function fetchCategories() {
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/category"
      );
      setCategories(data.data.results);
    }
    async function fetchUsedItemsData() {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3005/api/v1/usedItem/${id}`
        );
        setUsedItem(response.data.data.usedItem);
        setInitialValues({
          images: response.data.data.usedItem.images || [],
          address: response.data.data.usedItem.address || "",
          email: response.data.data.usedItem.email || "",
          phoneNumber: response.data.data.usedItem.phoneNumber || "",
          message: response.data.data.usedItem.message || "",
          title: response.data.data.usedItem.title || "",
          price: response.data.data.usedItem.price || 0,
          category: response.data.data.usedItem.category._id || "",
          itemType: response.data.data.usedItem.itemType._id || "",
        });
        setImagePreviews(response.data.data.usedItem.images || [ImageIcon]);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
    fetchItemTypes();
    fetchCategories();
    if (mood === "edit") {
      fetchUsedItemsData();
    }
  }, [id, mood]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "images") {
          values[key].forEach((imageFile) => {
            formData.append("images", imageFile);
          });
        } else {
          formData.append(key, values[key]);
        }
      });
      if (mood === "add") {
        await handleAddNewUsedItem(formData);
      } else if (mood === "edit") {
        await handleEditUsedItem(id, values);
      }
    },
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    formik.setFieldValue("images", files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <>
      <Navbar />
      {!authUser &&
      categories.length === 0 &&
      itemTypes.length === 0 &&
      !usedItem ? (
        <div className="px-8 sm:px-8 lg:px-36 mt-9">
          <div className="skeleton h-8 w-48 rounded-md mt-6"></div>
          <div className="mt-11">
            <div className="w-full rounded-md h-8 mt-6"></div>
            <div className="flex items-center justify-between w-full mt-6">
              <div className="w-2/5 h-8 skeleton"></div>
              <div className="w-2/5 h-8 skeleton"></div>
            </div>
            <div className="w-full rounded-md h-10"></div>
            <div className="flex items-center justify-between w-full mt-6">
              <div className="w-2/5 h-8 skeleton"></div>
              <div className="w-2/5 h-8 skeleton"></div>
            </div>
            <div className="w-full rounded-md skeleton h-10 mt-6"></div>
            <div className="w-full rounded-md skeleton h-40 mt-6"></div>
          </div>
        </div>
      ) : (
        <div className="px-8 sm:px-8 lg:px-36 mt-9">
          <h1 className="font-medium text-textcolor2 text-2xl">
            {mood === "add" ? "Create New Post" : "Update Post"}
          </h1>
          <div>
            <Formik
              initialValues={formik.initialValues}
              validationSchema={formik.validationSchema}
              enableReinitialize={true}
              onSubmit={formik.handleSubmit}
            >
              <Form className="mt-11">
                <span className="font-medium text-textcolor2 text-xl block">
                  Personal Info
                </span>
                <div className="w-full">
                  <Field
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Email"
                    className="border border-landing rounded-lg w-full p-2 mt-6 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset placeholder:text-placeholder placeholder:text-base placeholder:font-medium"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-sm text-red-500 mt-2">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center justify-between">
                  <div style={{ width: "47%" }}>
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
                      <div className="text-sm text-red-500 mt-2">
                        {formik.errors.address}
                      </div>
                    ) : null}
                  </div>
                  <div style={{ width: "47%" }}>
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
                      <div className="text-sm text-red-500 mt-2">
                        {formik.errors.phoneNumber}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <Field
                    name="message"
                    as="textarea"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    placeholder="Message"
                    className="border border-landing rounded-lg w-full mt-6 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset placeholder:text-placeholder placeholder:text-base placeholder:font-medium"
                  />
                  {formik.touched.message && formik.errors.message ? (
                    <div className="text-sm text-red-500 mt-2">
                      {formik.errors.message}
                    </div>
                  ) : null}
                </div>
                <span className="font-medium text-textcolor2 text-xl block capitalize mt-6">
                  Item Info
                </span>
                <div className="flex items-center justify-between">
                  <div style={{ width: "47%" }}>
                    <Field
                      name="title"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                      placeholder="Title"
                      className="border border-landing rounded-lg w-full mt-6 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset placeholder:text-placeholder placeholder:text-base placeholder:font-medium"
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="text-sm text-red-500 mt-2">
                        {formik.errors.title}
                      </div>
                    ) : null}
                  </div>
                  <div style={{ width: "47%" }}>
                    <Field
                      name="price"
                      type="number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.price}
                      placeholder="Price"
                      className="border border-landing rounded-lg w-full mt-6 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset placeholder:text-placeholder placeholder:text-base placeholder:font-medium"
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <div className="text-sm text-red-500 mt-2">
                        {formik.errors.price}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div style={{ width: "47%" }}>
                    <Field
                      name="itemType"
                      as="select"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.itemType}
                      placeholder="Item Type"
                      className="border border-landing rounded-lg text-textcolor2 capitalize w-full mt-6 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset placeholder:text-placeholder placeholder:text-base placeholder:font-medium"
                    >
                      <option value="" className="text-placeholder">
                        Select
                      </option>
                      {itemTypes.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.itemType}
                        </option>
                      ))}
                    </Field>
                    {formik.touched.itemType && formik.errors.itemType ? (
                      <div className="text-sm text-red-500 mt-2">
                        {formik.errors.itemType}
                      </div>
                    ) : null}
                  </div>
                  <div style={{ width: "47%" }}>
                    <Field
                      name="category"
                      as="select"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.category}
                      placeholder="Category"
                      className="border border-landing rounded-lg w-full mt-6 capitalize text-textcolor2 p-2 focus:outline-none focus:ring-2 focus:ring-landing focus:ring-inset placeholder:text-placeholder placeholder:text-base placeholder:font-medium"
                    >
                      <option value="" className="text-placeholder">
                        Select
                      </option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                    </Field>
                    {formik.touched.category && formik.errors.category ? (
                      <div className="text-sm text-red-500 mt-2">
                        {formik.errors.category}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="block w-full p-6 mt-6 text-center border-[2px] border-button border-dashed rounded">
                  <div className="flex space-x-2 justify-center">
                    {imagePreviews.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`uploadImage-${index}`}
                        className="w-1/5"
                      />
                    ))}
                  </div>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    multiple={true}
                    onChange={handleImageChange}
                    onBlur={formik.handleBlur}
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className="mt-3 block md:w-[30%] lg:w-[15%] mx-auto bg-button text-white p-2 rounded cursor-pointer text-center"
                  >
                    {mood === "add" ? "Upload Images" : "Update Images"}
                  </label>
                  {formik.touched.images && formik.errors.images ? (
                    <div className="text-sm text-red-500 mt-2">
                      {formik.errors.images}
                    </div>
                  ) : null}
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="cursor-pointer py-2 px-14 rounded text-textcolor2 font-medium text-lg bg-slate-200">
                    <Link to="/blog">Cancel</Link>
                  </div>
                  <button
                    type="submit"
                    className="bg-button text-white font-medium text-lg py-2 px-14 rounded cursor-pointer"
                  >
                    {mood === "add" ? "Create Post" : "Update Post"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
