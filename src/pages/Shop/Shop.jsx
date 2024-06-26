import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../interceptor";
import Card from "../../components/Card";
import Background from "../../components/Backgroud";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CategoriesPage from "../CategoriesPage/CategoriesPage";
import CardSkeleton from "../../components/CardSkeleton";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function Shop() {
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(categoryId || "all");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [notFound, setNotFound] = useState(false); // Add notFound state

  useEffect(() => {
    setSelectedCategory(categoryId || "all");
  }, [categoryId]);

  useEffect(() => {
    if (searchQuery) {
      searchItems(searchQuery, currentPage);
    } else {
      fetchItems(selectedCategory, currentPage);
    }
  }, [currentPage, selectedCategory, searchQuery]);

  const limit = 5;

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setSearchQuery(values.search);
      setCurrentPage(1);
      resetForm();
    },
  });

  const fetchItems = async (category, page) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:3005/api/v1/item?category=${category}&page=${page}&limit=${limit}`
      );
      setItems(response.data.data.results);
      setPages(response.data.data.numOfPages);
      setNotFound(false); // Reset notFound state
    } catch (error) {
     
      toast.error("Error fetching items");
    }
  };

  const searchItems = async (key, page) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:3005/api/v1/item/search/${key}?page=${page}&limit=${limit}`
      );
      const data = response.data.data;
      const searchResults = data.itemsByTitle.length ? data.itemsByTitle : data.itemsByAuthor;
      setItems(searchResults);
      setPages(data.numOfPages);
      setNotFound(searchResults.length === 0); // Set notFound based on search results
    } catch (error) {
      if (error.response.status === 404) {
        setItems([]);
        setPages(1);
        setNotFound(true); // Set notFound state
        return;
      }
      toast.error("Error fetching search results");
    }
  };

  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSearchQuery(""); // Clear search query when category changes
  }, []);

  return (
    <>
      <Navbar />

      {/* Search */}
      <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto mt-4">
        <div className="flex">
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              name="search"
              value={formik.values.search}
              onChange={formik.handleChange}
              className="block p-2.5 w-full z-20 text-sm text-gray-900 border-b"
              placeholder="What are you looking for ... ?"
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      {/* Category filter */}
      <div>
        <CategoriesPage setSelectedCategory={handleCategoryChange} />
        {selectedCategory === "all" && <Background />}
        <div className="relative z-10 mt-8">
          {selectedCategory === "all" && (
            <h2 className="text-xl font-bold text-textColor2-900 mx-px mb-4 px-28">
              New Arrivals
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-28 mx-auto">
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item) => <Card key={item._id} item={item} />)
            ) : notFound ? (
              <p className="col-span-full text-center text-red-500">Item Not Found</p>
            ) : (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {pages}
            </span>
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-button rounded-s hover:bg-dark-button dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
            <button
              disabled={currentPage >= pages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-button border-0 border-s border-button rounded-e hover:bg-dark-button dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
