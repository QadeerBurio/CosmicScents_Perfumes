import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom"; // ✅ React Router v6

const AdminNavber = () => {
  const navigate = useNavigate(); // ✅ Replaces useHistory

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishList");
    window.location.href = "/"; // Optional: use navigate("/") instead
  };

  return (
    <Fragment>
      <nav className="sticky z-10 flex items-center shadow-md justify-between px-4 py-4 md:px-8 top-0 w-full bg-white">
        {/* Large Screen Logo */}
        <div className="hidden lg:block lg:flex lg:items-center lg:space-x-4 mr-32">
          <svg
            className="w-8 h-8 cursor-pointer text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>

        <div className="hidden lg:block">
          <span
            onClick={() => navigate("/admin/dashboard")}
            style={{ letterSpacing: "0.70rem" }}
            className="flex items-left text-center font-bold uppercase text-gray-800 text-2xl cursor-pointer px-2 text-center"
          >
            AQ Buriro
          </span>
        </div>

        {/* Small Screen Logo */}
        <div className="lg:hidden flex items-center">
          <svg
            id="hamburgerBtn"
            className="lg:hidden w-8 h-8 cursor-pointer text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span
            onClick={() => navigate("/admin/dashboard")}
            style={{ letterSpacing: "0.10rem" }}
            className="flex items-left text-center font-bold uppercase text-gray-800 text-2xl cursor-pointer px-2 text-center"
          >
            AQ Buriro
          </span>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center">

          {/* Logout Dropdown */}
          <div className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative" title="Logout">
            <svg className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded">
              <li className="flex flex-col text-gray-700">
                
                
                <span
                  onClick={logout}
                  className="flex space-x-1 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </span>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default AdminNavber;
