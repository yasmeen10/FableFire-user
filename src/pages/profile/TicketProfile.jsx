import React, { useContext } from "react";
import TicketCard from "../../components/TicketCard";
import { EventContext } from "../../context/EventContext";
import TicketEventSVG from "../../components/SVG/TicketEventSVG";

export default function TicketProfile() {
  const { userEvents } = useContext(EventContext);

  return (
    <>
      {userEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <TicketEventSVG className="mb-4" />
          <h1 className="text-textcolor1 text-4xl text-center">
            User has No Ticket.
          </h1>
        </div>
      ) : (
        userEvents.map((tick) => (
          <div key={tick._id} className="px-4 sm:px-8 lg:px-36 mt-9">
            <TicketCard ticket={tick} />
          </div>
        ))
      )}
    </>
  );
}
