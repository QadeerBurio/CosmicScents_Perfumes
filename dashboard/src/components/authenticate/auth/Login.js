import React, { Fragment, useState } from "react";
import { loginReq } from "./fetchApi";
import { useSnackbar } from "notistack";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: true,
  });

  const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;

  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      const responseData = await loginReq({
        email: data.email,
        password: data.password,
      });

      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        enqueueSnackbar("Login Completed Successfully..!", { variant: "success" });
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Login</div>

      <form className="space-y-4">
        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">
            Email address<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({ ...data, email: e.target.value, error: false })
            }
            value={data.email}
            type="text"
            id="email"
            className={`px-4 py-2 focus:outline-none border ${
              data.error ? "border-red-500" : ""
            }`}
          />
          {data.error && alert(data.error)}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({ ...data, password: e.target.value, error: false })
            }
            value={data.password}
            type="password"
            id="password"
            className={`px-4 py-2 focus:outline-none border ${
              data.error ? "border-red-500" : ""
            }`}
          />
        </div>

        {/* Remember me & Link */}
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              className="px-4 py-2 focus:outline-none border mr-1"
            />
            <label htmlFor="rememberMe">
              Remember me<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
          <a className="block text-gray-600" href="/">
            Lost your password?
          </a>
        </div>

        {/* Submit */}
        <div
          onClick={formSubmit}
          style={{ background: "#303031" }}
          className="font-medium px-4 py-2 text-white text-center cursor-pointer"
        >
          Login
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
