import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import eventsImage from "../../assets/events.svg";
import axiosInstance from "../../../interceptor";
import LocationSVG from "../../components/SVG/LocationSVG";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import EventForm from "../../components/EventForm";
import { useAuth } from "../../context/AuthContext";
import { EventContext } from "../../context/EventContext";

export default function Events() {
  const [events, setEvents] = useState([]);
  const { authUser } = useAuth();
  const { userEvents, handleReverseTicket } = useContext(EventContext);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await axiosInstance.get(
        "http://localhost:3005/api/v1/event/"
      );
      setEvents(data.data.results);
    }
    fetchEvents();
  }, []);

  const handleGetNowClick = (eventId) => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      handleReverseTicket(eventId);
    }
  };

  const isEventRegistered = (eventId) => {
    return userEvents.some((userEvent) => userEvent.event._id === eventId);
  };

  return (
    <>
      <Navbar />
      <div>
        <img src={eventsImage} alt="Events" />
      </div>
      <div>
        <div className="px-4 sm:px-8 lg:px-36 mt-9">
          <div className="mt-20 my-14">
            <h1 className="text-textcolor2 font-medium text-4xl text-center mb-2">
              Events
            </h1>
            <p className="capitalize text-placeholder font-medium text-sm text-center w-96 mx-auto">
              Today, what started as a small conference has turned into the
              unmissable rendez-vous for product people.
            </p>
          </div>
          {events.length === 0 ? (
            <div>
              <div className="border border-gray1 rounded-lg flex gap-3 flex-col md:flex-row items-center p-4 mb-9">
                <div className="w-1/2 skeleton h-16"></div>
                <div className="w-1/2 skeleton h-16"></div>
              </div>
              <div className="border border-gray1 rounded-lg flex gap-3 flex-col md:flex-row items-center p-4 mb-9">
                <div className="w-1/2 skeleton h-16"></div>
                <div className="w-1/2 skeleton h-16"></div>
              </div>
              <div className="border border-gray1 rounded-lg flex gap-3 flex-col md:flex-row items-center p-4 mb-9">
                <div className="w-1/2 skeleton h-16"></div>
                <div className="w-1/2 skeleton h-16"></div>
              </div>
              <div className="border border-gray1 rounded-lg flex gap-3 flex-col md:flex-row items-center p-4 mb-9">
                <div className="w-1/2 skeleton h-16"></div>
                <div className="w-1/2 skeleton h-16"></div>
              </div>
            </div>
          ) : (
            events.map((event) => (
              <div
                className="border border-gray1 rounded-lg grid grid-cols-3 gap-10 p-5 mb-9"
                key={event._id}
              >
                <Link
                  to={`/events/${event._id}`}
                  className="col-span-2 flex items-center"
                >
                  <img
                    src={event.images[0]}
                    alt={event.name}
                    className="w-28 h-28 object-cover border border-transparent rounded-lg mr-4"
                  />
                  <div className="flex items-center justify-between w-3/4">
                    <div>
                      <h1 className="text-textcolor2 font-medium text-base capitalize">
                        {event.name}
                      </h1>
                      <p className="font-normal text-placeholder text-sm my-1 capitalize">
                        {event.description}
                      </p>
                    </div>
                    <span className="text-placeholder text-sm">
                      {event.date.split("T")[0]}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <LocationSVG />
                      <p className="text-textcolor2 font-medium text-sm capitalize">
                        {event.location}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-end items-center w-full ">
                  {isLoggedIn &&
                  (!authUser.address || !authUser.phoneNumber) ? (
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
                      className="border border-transparent rounded-lg bg-button text-white font-medium text-base py-2 px-7 w-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={
                        isEventRegistered(event._id) || event.numOfTickets === 0
                      }
                    >
                      Get Now
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
