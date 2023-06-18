import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  var token = sessionStorage.getItem("session");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
