import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UnprotectedRoute from "./UnprotectedRoute";
import Auth from "../Pages/Auth";
import Dashboard from "../Pages/Dashboard";
import UploadImage from "../Pages/UploadImage";

function ApplicationNavigation() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload-image" element={<UploadImage />} />
        </Route>
        <Route element={<UnprotectedRoute />}>
          <Route path="/" element={<Auth isSignUp />} />
          <Route path="/signin" element={<Auth />} />
        </Route>
      </Routes>
    </>
  );
}

export default ApplicationNavigation;
