import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { emailPattern } from "../constants/EmailRegex";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(emailPattern, "Email must be like example@gmail.com"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axiosInstance.post(
          "http://localhost:3005/api/v1/user/login",
          values
        );

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          setIsLoggedIn(true);
          fetchData();
          toast.success("Sign In Successfully");
          navigate("/");
         
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
      setLoading(false);
    },
  });

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3005/api/v1/user"
      );
      const userData = response.data.data;
      setIsLoggedIn(true);
      setAuthUser(userData);
    } catch (error) {
      if (error.response.status == 401) {
        console.log(error.response.data.message);
       
       return;
       
      }
      
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn, setAuthUser]);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    formik,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
