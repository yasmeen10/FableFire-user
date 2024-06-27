import { useState } from "react";
import QRCode from "qrcode.react";

export default function QRCodeCard(props) {
  const { ticket } = props;
  const ticketData = {
    name: `${ticket?.event?.name}`,
    date: `${ticket?.event?.date.split("T")[0]}`,
    location: `${ticket?.event?.location}`,
  };
  const ticketString = JSON.stringify(ticketData);
  console.log(ticketString);
  return (
    <div className="py-5">
      <div className="bg-black w-36 mx-auto flex flex-col items-center justify-center rounded-lg pt-2">
        <QRCode
          value={ticketString}
          size={110} // Size of the QR code
          bgColor="#ffffff" // Background color
          fgColor="#000000" // Foreground color
          level="H" // Error correction level
        />
        <span className="text-white text-sm font-medium my-5">
          SCAN THE CODE
        </span>
      </div>
      <span className="text-white font-medium text-sm text-center block mt-2">
        See You There!
      </span>
    </div>
  );
}
