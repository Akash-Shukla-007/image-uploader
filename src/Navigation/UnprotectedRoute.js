import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function UnprotectedRoute() {
  var token = sessionStorage.getItem("session");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Outlet />;
  }
}

export default UnprotectedRoute;
