import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { EventContext } from "../../context/EventContext";
import axiosInstance from "../../../interceptor";
import TicketCard from "../../components/TicketCard";

export default function Ticket() {
  const { ticketId } = useContext(EventContext);
  console.log(ticketId);
  const [ticket, setTicket] = useState(null);
  useEffect(() => {
    async function fetchTicketData() {
      const { data } = await axiosInstance.get(
        `http://localhost:3005/api/v1/ticket/${ticketId}`
      );
      console.log(data.data);
      setTicket(data.data);
    }
    fetchTicketData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="px-8 lg:px-36 mt-9">
        <TicketCard ticket={ticket} />
      </div>
      <Footer />
    </>
  );
}
