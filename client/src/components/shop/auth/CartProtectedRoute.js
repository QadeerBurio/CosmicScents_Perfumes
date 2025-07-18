import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { isAuthenticate } from "./fetchApi";

const CartProtectedRoute = () => {
  const location = useLocation();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (cart.length !== 0 && isAuthenticate()) {
    return <Outlet />;
  }

  return (
    <Navigate
      to="/"
      state={{ from: location }}
      replace
    />
  );
};

export default CartProtectedRoute;
