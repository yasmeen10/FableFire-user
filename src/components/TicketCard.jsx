import React, { useEffect, useRef } from "react";
import QRCodeCard from "./QRCodeCard";
import DownloadSVG from "./SVG/DownloadSVG";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

export default function TicketCard(props) {
  const { ticket } = props;
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    if (!input) {
    
      return;
    }
   
    html2canvas(input, {
      useCORS: true,
      ignoreElements: (element) => {
        const style = window.getComputedStyle(element);
        return style.backgroundColor.includes("oklch");
      },
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("ticket.pdf");
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      });
  };

  return (
    <>
      <div className="grid grid-cols-3 w-3/4 mx-auto" ref={pdfRef}>
        <div
          style={{ backgroundColor: "#80937B" }}
          className="rounded-lg border-r border-dashed border-r-textcolor2"
        >
          <QRCodeCard ticket={ticket} />
        </div>
        <div
          style={{ backgroundColor: "#80937B" }}
          className="rounded-lg px-9 col-span-2 py-5"
        >
          <div className="w-full flex items-end justify-end">
            <button href="Rext Icons.pdf" onClick={downloadPDF}>
              <DownloadSVG />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-textcolor2 font-medium text-3xl capitalize">
                {ticket?.event?.name}
              </h1>
            </div>
            <div className="flex flex-col">
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
                <span className="text-base font-medium block text-textcolor2 capitalize t">
                  {ticket?.event?.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
