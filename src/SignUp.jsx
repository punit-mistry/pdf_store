import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./Supabase";
import img1 from "./assets/2.svg";
const SignUp = () => {
  const nav = useNavigate();
  const [FormData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...FormData,
      userName: value,
      email: value,
      password: value,
    });
  };

  const HandleSubmit = async () => {
    console.log("Submit", FormData);

    const { data, error } = await supabase
      .from("PdfChat")
      .insert([FormData])
      .select();

    if (data) {
      nav("/");
    } else {
      alert(error.message);
    }
  };
  return (
    <div className="flex flex-row-reverse justify-center items-center gap-10 h-screen w-full p-10">
      <div className="border-2 hover:border-black rounded-lg shadow-2xl p-5 flex flex-col gap-10 w-1/2 h-2/3 justify-center items-center">
        <span className="text-5xl font-bold">SignUp </span>
        <input
          type="text"
          placeholder="Enter your username"
          className="border-2 rounded-lg p-2 w-96"
          onChange={HandleChange}
        />
        <input
          type="text"
          placeholder="Enter your email"
          className="border-2 rounded-lg p-2 w-96"
          onChange={HandleChange}
        />
        <input
          type="text"
          className="border-2 rounded-lg p-2 w-96"
          placeholder="Enter your password"
          onChange={HandleChange}
        />
        <button
          onClick={HandleSubmit}
          className="hover:bg-black hover:text-white w-32 h-10 font-bold transition-all"
        >
          SignUp
        </button>
        <span className="hover:underline hover:font-bold transition-all">
          <Link to="/">Already have the Account ?</Link>
        </span>
      </div>
      <div className="w-1/2 p-10">
        <img src={img1} />
      </div>
    </div>
  );
};

export default SignUp;
