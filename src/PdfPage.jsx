import React from "react";
import FileUpload from "./FIleupload";
import PDFList from "./PDFList";
import Navbar from "./Navbar";
export const PdfPage = () => {
  return (
    <div>
      <Navbar />
      {/* <div className="bg-yellow-400 h-52 ">
        <div className="text-center overflow-hidden">
          <div className="marquee">CHAT WITH PDF</div>
        </div>
      </div> */}
      <FileUpload />
      <PDFList />
    </div>
  );
};
