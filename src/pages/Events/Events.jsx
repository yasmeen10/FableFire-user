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
import { toast } from "react-toastify";
import fallbackImage from "../../../public/imgError.png";

export default function Events() {
  const [events, setEvents] = useState([]);
  const { authUser } = useAuth();
  const { userEvents, handleReverseTicket } = useContext(EventContext);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [imageState, setImageState] = useState({ loading: true, error: false });

  const handleImageLoad = () => {
    setImageState({ loading: false, error: false });
  };

  const handleImageError = () => {
    setImageState({ loading: false, error: true });
  };
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
      toast.success("Your reservation has been completed successfully");
    }
  };

  const isEventRegistered = (eventId) => {
    return userEvents.some((userEvent) => userEvent.event._id === eventId);
  };

  return (
    <>
      <Navbar />
      <div className="relative">
        <img
          src={eventsImage}
          alt="Events"
          className="w-full h-60 object-cover"
        />
      </div>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-8 lg:px-36">
          <div className="text-center my-14">
            <h1 className="text-textcolor2 font-semibold text-4xl mb-4">
              Events
            </h1>
            <p className="text-placeholder font-medium text-sm max-w-lg mx-auto">
              Today, what started as a small conference has turned into the
              unmissable rendez-vous for product people.
            </p>
          </div>
          {events.length === 0 ? (
            <div>
              {Array(4)
                .fill()
                .map((_, index) => (
                  <div
                    className="border border-gray-300 rounded-lg flex gap-3 flex-col md:flex-row items-center p-4 mb-9 animate-pulse"
                    key={index}
                  >
                    <div className="w-1/2 h-16 bg-gray-300"></div>
                    <div className="w-1/2 h-16 bg-gray-300"></div>
                  </div>
                ))}
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="border border-gray-300 rounded-lg p-5 mb-9 bg-white shadow-sm hover:shadow-lg flex flex-col md:flex-row justify-between items-center transition-shadow duration-200"
              >
                <Link
                  to={`/events/${event._id}`}
                  className="flex flex-col md:flex-row items-center w-full md:w-3/4"
                >

                  <div className="flex-shrink-0">
                {imageState.loading && (
                    <div className="skeleton z-10 mr-4  w-28 h-28  rounded-lg"></div>
                  )}
                  {!imageState.loading && imageState.error && (
                    <img
                      src={fallbackImage}
                      alt="Fallback"
                      className="rounded-lg shadow-md relative z-10 w-28 h-28 "
                    />
                  )}
                  {!imageState.error && (
                    <img
                      src={event.images[0]}
                      alt={event.name}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      style={{ display: imageState.loading ? "none" : "block" }}
                      className="w-28 h-28 object-cover border border-transparent rounded-lg mr-4"
                    />
                  )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-textcolor2 font-semibold text-base capitalize mb-2">
                      {event?.name}
                    </h1>
                    <span className="text-placeholder text-sm mb-2 block">
                      {event?.date.split("T")[0]}

                    </span>
                    <div className="flex justify-center md:justify-start items-center">
                      <LocationSVG />
                      <p className="text-textcolor2 font-medium text-sm capitalize ml-2">
                        {event?.location}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center md:justify-end">
                  {isLoggedIn &&
                  (!authUser.address || !authUser.phoneNumber) ? (
                    <Popup
                      trigger={
                        <button className="border border-transparent rounded-lg bg-button text-white font-medium text-base py-2 px-7 w-full hover:bg-button-dark transition-colors duration-200">
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
                      className="border border-transparent rounded-lg bg-button text-white font-medium text-base py-2 px-7 w-full hover:bg-button-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
