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
    <div className="bg-yellow-400 h-52 flex  flex-col gap-10 justify-center items-center font-bold">
      <div className="text-3xl font-extrabold">Upload Your PDF's</div>
      <div>
        <input
          type="file"
          onChange={handleChange}
        />
        <button
          onClick={handleUpload}
          className="bg-black w-52 text-white h-10 rounded-lg hover:bg-[#252525] transition-all "
        >
          Upload PDF
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
