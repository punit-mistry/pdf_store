import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
// Import your custom CSS file for PDFList component

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFList = () => {
  const [pdfs, setPDFs] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/pdfs")
      .then((response) => {
        setPDFs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (pdfId) => {
    axios
      .delete(`http://localhost:5000/pdfs/${pdfId}`)
      .then((response) => {
        // Refresh the PDF list after successful deletion
        setPDFs((prevPDFs) => prevPDFs.filter((pdf) => pdf._id !== pdfId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col p-10">
      <span className="text-5xl font-extrabold">List of PDFs..</span>
      <br />
      <div className="all_pdf flex flex-col gap-10 w-full">
        {pdfs.map((pdf, key) => (
          <div className="bg-gray-500 ">
            <div>
              <div className="flex justify-between p-3">
                <div>
                  <span className="font-bold">{key}.</span> &nbsp;
                  <span className="uppercase hover:underline underline-offset-4 hover:font-bold transition-all">
                    <a
                      href={`http://localhost:5000/${pdf.path}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {pdf.name}
                    </a>
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(pdf._id)}
                  className="bg-red-600 w-20 font-bold text-white h-8 rounded-lg"
                >
                  Delete
                </button>
              </div>
              {open && (
                <div className="pdf-container ">
                  <Document
                    file={`http://localhost:5000/${pdf.path}`}
                    onLoadError={(error) => console.error(error)}
                  >
                    <Page
                      pageNumber={1}
                      className="pdf-page max-h-screen h-96"
                      width={150}
                      // If you want to control the height, you can set it here
                      height={200}
                    />
                  </Document>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFList;
