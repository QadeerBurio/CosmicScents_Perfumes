import React from "react";
import {
  Home,
  WishList,
  ProtectedRoute,
  CartProtectedRoute,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
  Shop,
  Aboutus,
  Contact,
} from "./shop";

import {
  UserProfile,
  UserOrders,
  SettingUser,
} from "./shop/dashboardUser";

import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/wish-list" element={<WishList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/products/category/:catId" element={<ProductByCategory />} />
      <Route path="/shops" element={<Shop />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/contact" element={<Contact/>}/>


      {/* Cart Protected Route */}
      <Route element={<CartProtectedRoute />}>
        <Route path="/checkout" element={<CheckoutPage />} />
        
      </Route>

      {/* User Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/orders" element={<UserOrders />} />
        <Route path="/user/setting" element={<SettingUser />} />
      <Route path="/contact" element={<Contact/>}/>

      </Route>

      {/* 404 Page */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
