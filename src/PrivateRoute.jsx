import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isLogged }) => {
  console.log("PrivateRoute: isLogged =", isLogged);

  if (isLogged) {
    console.log("PrivateRoute: Rendering element");
    return element;
  } else {
    console.log("PrivateRoute: Redirecting to /");
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
