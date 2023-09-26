import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "./assets/1.svg";
import { supabase } from "./Supabase";
const Login = () => {
  const navigate = useNavigate();
  const [Error, setError] = useState(false);
  const [FormData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const HandleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...FormData, userName: value, password: value });
  };

  const HandleSubmit = async () => {
    console.log("Submit", FormData);

    let { data: PdfChat, error } = await supabase
      .from("PdfChat")
      .select("*")
      .eq("userName", FormData.userName)
      .eq("password", FormData.password);

    console.log(PdfChat, error, PdfChat.length);

    if (PdfChat.length === 1) {
      localStorage.setItem("isLogged", true);
      localStorage.setItem("UserName", PdfChat[0].userName);
      navigate("/pdf");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-row-reverse justify-center items-center gap-10 h-screen w-full p-10">
      <div className="border-2 hover:border-black rounded-lg shadow-2xl p-5 flex flex-col gap-10 w-1/2 h-2/3 justify-center items-center">
        <span className="text-5xl font-bold">Login </span>
        <div>
          <label className="block mb-2 text-red-500">userName:123456789</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="border-2 rounded-lg p-2 w-96"
            onChange={HandleChange}
          />
        </div>
        <div>
          <label className="block mb-2 text-red-500">Password:123456789</label>
          <input
            type="text"
            className="border-2 rounded-lg p-2 w-96"
            placeholder="Enter your password"
            onChange={HandleChange}
          />
        </div>
        <button
          onClick={HandleSubmit}
          className="hover:bg-black hover:text-white w-32 h-10 font-bold transition-all"
        >
          Login
        </button>
        {Error && (
          <div className="bg-red-100 p-3 border-2 border-red-500 rounded-lg">
            {" "}
            Please Check your{" "}
            <span className="font-bold">Username/Password</span>{" "}
          </div>
        )}

        <span className="hover:underline hover:font-bold transition-all">
          <Link to="/signup">Don't have the Account new user?</Link>
        </span>
      </div>
      <div className="w-1/2 p-10">
        <img src={img1} />
      </div>
    </div>
  );
};

export default Login;
