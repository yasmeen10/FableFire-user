import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [userEvents, setUserEvents] = useState([]);
  const ticketId = localStorage.getItem("ticketId");
  const { isLoggedIn, authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/ticket/user"
      );
      console.log(data.data);
      setUserEvents(data.data);
    }
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, setUserEvents, ticketId]);

  const handleReverseTicket = async (eventId) => {
    console.log(eventId);
    const response = await axiosInstance.post(
      "http://localhost:3005/api/v1/ticket",
      { user: `${authUser._id}`, event: `${eventId}` }
    );
    if (response.status === 201) {
      navigate("/ticket");
      console.log(response.data.data._id);
      localStorage.setItem("ticketId", response.data.data._id);
    }
  };

  return (
    <EventContext.Provider
      value={{ userEvents, ticketId, handleReverseTicket }}
    >
      {children}
    </EventContext.Provider>
  );
};
