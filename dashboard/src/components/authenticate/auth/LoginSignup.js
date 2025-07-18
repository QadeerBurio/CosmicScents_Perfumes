import React, { Fragment, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const LoginSignup = () => {
  const [login, setLogin] = useState(true);
  const [loginValue, setLoginValue] = useState("Create an account");

  const changeLoginSignup = () => {
    setLogin(!login);
    setLoginValue(login ? "Login" : "Create an account");
  };

  return (
    <Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white w-full max-w-xl p-6 rounded shadow-md space-y-6">
          {login ? <Login /> : <Signup />}
          <div className="flex items-center space-x-2">
            <span className="border-b border-gray-400 w-full" />
            <span className="font-medium text-gray-600">or</span>
            <span className="border-b border-gray-400 w-full" />
          </div>
          <div
            onClick={changeLoginSignup}
            className="px-4 py-2 text-center font-medium text-gray-700 border border-gray-700 cursor-pointer"
          >
            {loginValue}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignup;
