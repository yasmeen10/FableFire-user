import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../interceptor";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    async function fetchData(values){
        try {
            const data = await axios.post(
              "http://localhost:3005/api/v1/user/login",
              values
            );
    
            if (data.status == 200) {
                localStorage.setItem("token", data.data.token);
                setIsLoggedIn(true);
                toast.success("Sign In Successfully");
                navigate("/");
            }

            
            const respone= await axiosInstance.get(
                "http://localhost:3005/api/v1/user"
            );

            const userData =await respone.data.data;
            setAuthUser(userData);
          } catch (error) {
            toast.error(error.response.data.message);
          }
    }
    fetchData()
  })

  const value={
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  }
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}
