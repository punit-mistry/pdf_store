import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();

    formData.append("pdf", file);
    console.log(`Uploading`, formData);

    axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        location.reload();
        // Add code to handle successful upload
      })
      .catch((error) => {
        console.error(error);
        // Add code to handle upload error
      });
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleChange}
      />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
};

export default FileUpload;
