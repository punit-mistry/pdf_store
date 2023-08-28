import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "./assets/avatar.svg";
const Navbar = () => {
  const navigation = useNavigate();
  const changeRoute = () => {
    localStorage.clear();
    navigation("/");
  };
  const userName = localStorage.getItem("UserName");
  return (
    <div className="bg-black font-bold text-white flex justify-between p-5">
      <div className=" flex justify-center items-center gap-10">
        Chat with PDF
        <div className="text-center relative">
          <div className="group inline-block relative">
            <img
              src={img1}
              width={30}
              alt="User Avatar"
            />

            <div className="hidden group-hover:block rounded-lg shadow-2xl shadow-black bg-white text-black border-4 border-black border-t-yellow-400 p-2 absolute top-10  transform -translate-x-1/3">
              UserName:{userName}
            </div>
          </div>
        </div>
      </div>

      <div className="flex  gap-10">
        <Link to="/pdf">Upload </Link>
        <Link to="/pdfchat">Chat </Link>
        <div onClick={changeRoute}>LogOut</div>
      </div>
    </div>
  );
};

export default Navbar;
