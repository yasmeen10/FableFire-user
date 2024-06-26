import React from "react";

export default function TicketCard(props) {
  const { ticket } = props;
  return (
    <>
      <div className="grid grid-cols-3 w-3/4 mx-auto">
        <div
          style={{ backgroundColor: "#80937B" }}
          className="rounded-lg border-r border-dashed border-r-textcolor2"
        ></div>
        <div
          style={{ backgroundColor: "#80937B" }}
          className="rounded-lg flex justify-between items-center px-9 py-9 col-span-2"
        >
          <div>
            <h1 className="text-textcolor2 font-medium text-5xl capitalize">
              {ticket?.event?.name}
            </h1>
          </div>
          <div className="w-1/5">
            <div>
              <span className="text-base font-medium text-white block">
                Name
              </span>
              <span className="text-base font-medium text-textcolor2 block">
                {ticket?.user?.firstName}
              </span>
            </div>
            <div>
              <span className="text-base font-medium block text-white">
                Date
              </span>
              <span className="text-base font-medium block text-textcolor2">
                {ticket?.event?.date.split("T")[0]}
              </span>
            </div>
            <div>
              <span className="text-base font-medium block text-white">
                Location
              </span>
              <span className="text-base font-medium block text-textcolor2 capitalize">
                {ticket?.event?.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
