import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { isAuthenticate, isAdmin } from "./fetchApi";

const AdminProtectedRoute = () => {
  const location = useLocation();

  if (isAuthenticate() && isAdmin()) {
    return <Outlet />;
  }

  return (
    <Navigate
      to="/user/profile"
      state={{ from: location }}
      replace
    />
  );
};

export default AdminProtectedRoute;
