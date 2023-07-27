import React from "react";
import FileUpload from "./FIleupload";
import PDFList from "./PDFList";

const App = () => {
  return (
    <div>
      <h1>ALL PDF's</h1>
      <FileUpload />
      <PDFList />
    </div>
  );
};

export default App;
