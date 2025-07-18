import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { isAuthenticate } from "./fetchApi";

const ProtectedRoute = () => {
  const location = useLocation();

  return isAuthenticate() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
