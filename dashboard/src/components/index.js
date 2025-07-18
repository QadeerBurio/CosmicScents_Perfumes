import React from "react";
import { LoginSignup, AdminProtectedRoute } from "./authenticate";

import { DashboardAdmin, Categories, Products, Orders, Messages } from "./admin";

import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      {/* Admin Protected Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/dashboard/categories" element={<Categories />} />
        <Route path="/admin/dashboard/products" element={<Products />} />
        <Route path="/admin/dashboard/orders" element={<Orders />} />
        <Route path="/admin/dashboard/messages" element={<Messages />} />
        

      </Route>
    </Routes>
  );
};

export default AppRoutes;
