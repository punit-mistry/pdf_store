import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
// Import your custom CSS file for PDFList component

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFList = () => {
  const [pdfs, setPDFs] = useState([]);

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
    <div>
      <h2>List of PDFs</h2>

      <ul className="all_pdf">
        {pdfs.map((pdf) => (
          <div>
            <li key={pdf._id}>
              <a
                href={`http://localhost:5000/${pdf.path}`}
                target="_blank"
                rel="noreferrer"
              >
                {pdf.name}
              </a>
              &nbsp;
              <button onClick={() => handleDelete(pdf._id)}>Delete</button>
              <div className="pdf-container">
                <Document
                  file={`http://localhost:5000/${pdf.path}`}
                  onLoadError={(error) => console.error(error)}
                >
                  <Page
                    pageNumber={1}
                    className="pdf-page"
                    width={150}
                    // If you want to control the height, you can set it here
                    // height={200}
                  />
                </Document>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PDFList;
