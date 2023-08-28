import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import { PdfPage } from "./PdfPage";
import Chat from "./Chat";
const PrivateRoute = ({ element, isLogged, path }) => {
  return isLogged ? element : <Navigate to="/" />;
};

const App = () => {
  const isLogged = localStorage.getItem("isLogged") === "true";

  useEffect(() => {}, [Route]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/pdf"
          element={
            <PrivateRoute
              element={<PdfPage />}
              isLogged={isLogged}
            />
          }
        />
        <Route
          path="/pdfchat"
          element={
            <PrivateRoute
              element={<Chat />}
              isLogged={isLogged}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
