import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../auth/fetchApi";
import LoginSignup from "../auth/LoginSignup";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && isAdmin()) {
      navigate("/admin/dashboard"); // Redirect to admin dashboard
    }
  }, [navigate]);

  return (
    <Fragment>
      {!isAdmin() && (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <LoginSignup />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Index;
