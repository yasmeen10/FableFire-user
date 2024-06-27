import React from "react";

import TicketCard from "../../components/TicketCard";
import { useContext } from "react";
import { EventContext } from "../../context/EventContext";

export default function TicketProfile() {
  const { userEvents } = useContext(EventContext);

  return (
    <>
      {userEvents.map((tick) => {
        return (
          <div key={tick._id} className="px-4 sm:px-8 lg:px-36 mt-9">
            <TicketCard ticket={tick} />
          </div>
        );
      })}
    </>
  );
}
