import React, { Fragment, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

import { logout } from "./Action";
import { LayoutContext } from "../index";

const Navber = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, dispatch } = useContext(LayoutContext);

  const navberToggleOpen = () =>
    dispatch({ type: "hamburgerToggle", payload: !data.navberHamburger });

  const loginModalOpen = () =>
    dispatch({ type: "loginSignupModalToggle", payload: !data.loginSignupModal });

  const cartModalOpen = () =>
    dispatch({ type: "cartModalToggle", payload: !data.cartModal });

  return (
    <Fragment>
      <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-white">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-3 items-center">
          
          {/* Left: Brand (Always on left) */}
          <div className="flex items-center space-x-2">
            {/* Hamburger for mobile */}
            <div className="lg:hidden">
              <svg
                onClick={navberToggleOpen}
                className="w-8 h-8 cursor-pointer text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>

            {/* Hayroo Logo */}
            <span
              onClick={() => navigate("/")}
              className="font-bold uppercase text-gray-800 text-2xl cursor-pointer"
              style={{ letterSpacing: "0.10rem" }}
            >
              CosmicScents
            </span>
          </div>

          {/* Center: Links (Visible only on lg) */}
          <div className="hidden lg:flex justify-center space-x-6">
            {["Home", "Shops", "About", "Contact"].map((label, i) => (
              <span
                key={i}
                onClick={() => navigate(["/", "/shops", "/aboutus", "/contact"][i])}
                className="hover:bg-gray-200 px-4 py-2 rounded-lg font-light tracking-widest hover:text-gray-800 text-gray-600 cursor-pointer"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Right: Icons */}
          <div className="flex justify-end items-center space-x-2">
            {/* Wishlist */}
            <div
              onClick={() => navigate("/wish-list")}
              className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer"
              title="Wishlist"
            >
              <svg
                className={`${location.pathname === "/wish-list" ? "fill-current text-gray-800" : ""} w-8 h-8 text-gray-600`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>

            {/* User or Login */}
            {localStorage.getItem("jwt") ? (
              <div className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative" title="Account">
                <svg
                  className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded shadow-lg text-gray-700 w-48">
                  {[
                    { label: "My Orders", path: "/user/orders" },
                    { label: "My Account", path: "/user/profile" },
                    { label: "My Wishlist", path: "/wish-list" },
                    { label: "Settings", path: "/user/setting" }
                  ].map((item, i) => (
                    <span
                      key={i}
                      onClick={() => navigate(item.path)}
                      className="flex items-center space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                    >
                      <span>{item.label}</span>
                    </span>
                  ))}
                  <span
                    onClick={() => logout()}
                    className="flex items-center space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                  >
                    <span>Logout</span>
                  </span>
                </div>
              </div>
            ) : (
              <div
                onClick={loginModalOpen}
                className="cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-lg"
                title="Login"
              >
                <svg
                  className="w-8 h-8 text-gray-600 hover:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
            )}

            {/* Cart */}
            <div
              onClick={cartModalOpen}
              className="hover:bg-gray-200 px-2 py-2 rounded-lg relative cursor-pointer"
              title="Cart"
            >
              <svg
                className="w-8 h-8 text-gray-600 hover:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-0 ml-6 mt-1 bg-yellow-700 rounded px-1 text-white text-xs font-semibold">
                {data.cartProduct ? data.cartProduct.length : 0}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Links */}
        {data.navberHamburger && (
          <div className="px-4 py-2 lg:hidden">
            <div className="flex flex-col text-gray-600">
              {["Shop", "Blog", "Contact us"].map((label, i) => (
                <span
                  key={i}
                  onClick={() => navigate(["/", "/blog", "/contact-us"][i])}
                  className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </nav>
    </Fragment>
  );
};

export default Navber;
