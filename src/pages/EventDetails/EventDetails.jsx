import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import axiosInstance from "../../../interceptor";
import CountDown from "../../components/CountDown";
import LocationSVG from "../../components/SVG/LocationSVG";
import tickets from "../../assets/tickets.svg";
import person from "../../assets/person.svg";
import EventForm from "../../components/EventForm";
import { EventContext } from "../../context/EventContext";
import { useAuth } from "../../context/AuthContext";

export default function EventDetails() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const { authUser } = useAuth();
  const { handleReverseTicket, userEvents } = useContext(EventContext);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get(
        `http://localhost:3005/api/v1/event/${id}`
      );
      setEvent(data.data);
    }
    fetchData();
  }, [id]);

  const isEventRegistered = (eventId) => {
    return userEvents.some((userEvent) => userEvent.event._id === eventId);
  };

  const handleGetNowClick = (eventId) => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      handleReverseTicket(eventId);
    }
  };

  const isDatePassed = (date) => {
    const now = new Date();
    const targetDate = new Date(date);
    return targetDate < now;
  };

  return (
    <>
      <Navbar />
      {!event ? (
        <div className="px-4 sm:px-8 lg:px-36 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-14">
            <div className="col-span-2">
              <div className="skeleton rounded-md w-3/4 h-5"></div>
              <div className="skeleton rounded-md w-3/4 h-7 mt-4"></div>
              <div className="skeleton rounded-md w-full h-8 mt-4"></div>
            </div>
            <div className="skeleton rounded-md w-full h-64 md:h-full"></div>
          </div>
          <div className="skeleton rounded-md w-full h-32 mt-4"></div>
        </div>
      ) : (
        <div className="px-4 sm:px-8 lg:px-36 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-14">
            <div className="col-span-2">
              <div className="flex items-center">
                <h1 className="text-textcolor2 font-medium text-4xl capitalize">
                  Welcome To {event?.name}
                </h1>
                {isDatePassed(event?.date) ? (
                  <span className="block text-red-500 capitalize font-medium mt-2 ml-3">
                    closed
                  </span>
                ) : null}
              </div>
              <p className="text-base text-placeholder font-normal capitalize my-4">
                {event?.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <LocationSVG />
                  <span className="capitalize font-medium text-textcolor2 text-sm">
                    {event?.location}
                  </span>
                </div>
                <div className="flex items-center text-placeholder font-medium text-sm">
                  <img src={tickets} alt="" className="w-8" />
                  <div className="flex-col justify-center items-center ml-2">
                    <span className="block">Available Tickets</span>
                    <span className="block">{event?.numOfTickets}</span>
                  </div>
                </div>
                <div className="flex items-center  text-placeholder font-medium text-sm">
                  <img src={person} alt="" />
                  <div className="flex-col justify-center items-center ml-2">
                    <span className="block">NO. Persons</span>
                    <span className="block">{event?.users.length}</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/4">
                {isLoggedIn && (!authUser.address || !authUser.phoneNumber) ? (
                  <Popup
                    trigger={
                      <button className="border border-transparent rounded-lg bg-button text-white font-medium text-base py-2 px-7 w-full">
                        Get Now
                      </button>
                    }
                    modal
                    nested
                    contentStyle={{
                      width: "100%",
                      maxWidth: "100%",
                      height: "100%",
                      margin: "0",
                      padding: "0",
                      zIndex: "2",
                      paddingTop: "50px",
                      backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                  >
                    {(close) => <EventForm close={close} />}
                  </Popup>
                ) : (
                  <button
                    onClick={() => handleGetNowClick(event._id)}
                    className="border border-transparent rounded-lg bg-button text-white font-medium text-base py-2 px-7 mt-2 w-full disabled:opacity-50 disabledcursor-not-allowed"
                    disabled={
                      isEventRegistered(event._id) || event.numOfTickets === 0
                    }
                  >
                    Get Now
                  </button>
                )}
              </div>
            </div>
            <div className="order-first md:order-last">
              <img
                src={event?.images[0]}
                alt={event?.name}
                className="w-full object-cover h-64 md:h-full"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray2 rounded-lg px-4 md:px-14 py-8 drop-shadow-md mt-4">
            <p className="text-textcolor2 font-semibold text-2xl w-full md:w-36 mb-4 md:mb-0">
              Count <span className="text-placeholder">Every Second</span> Until
              The Event
            </p>
            <CountDown date={event?.date} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
