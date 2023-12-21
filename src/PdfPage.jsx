import React from "react";
import FileUpload from "./FIleupload";
import PDFList from "./PDFList";
import Navbar from "./Navbar";
import Chat from "./Chat";
export const PdfPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-teal-100">
      <Navbar />
      {/* <div className="bg-yellow-400 h-52 ">
        <div className="text-center overflow-hidden">
          <div className="marquee">CHAT WITH PDF</div>
        </div>
      </div> */}
      <div className="flex">
        <div className="w-1/4 border-white p-1.5 border-2 ">
          <FileUpload />
          <PDFList />
        </div>
        <div className="w-full">
          <Chat />
        </div>
      </div>
    </div>
  );
};
