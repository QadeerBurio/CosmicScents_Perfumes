import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi"; // or adjust path as needed
import { useSnackbar } from "notistack";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: {},
    loading: false,
    success: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const alert = (msg, type) => (
    <div className={`text-sm text-${type}-500`}>{msg}</div>
  );

  const formSubmit = async () => {
    setData({ ...data, loading: true });

    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        loading: false,
        error: {
          cPassword: "Passwords don't match",
          password: "Passwords don't match",
        },
      });
    }

    try {
      const responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });

      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: {},
          success: responseData.success,
        });
        enqueueSnackbar("Account Created Successfully..!", { variant: "success" });
      }
    } catch (error) {
      console.log(error);
      setData({ ...data, loading: false });
    }
  };

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Register</div>
      <form className="space-y-4">
        {data.success && alert(data.success, "green")}

        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name">Name*</label>
          <input
            autoComplete="name"
            value={data.name}
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: { ...data.error, name: null },
                name: e.target.value,
              })
            }
            className={`px-4 py-2 border ${data.error.name ? "border-red-500" : ""}`}
          />
          {data.error.name && alert(data.error.name, "red")}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email*</label>
          <input
            autoComplete="email"
            value={data.email}
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: { ...data.error, email: null },
                email: e.target.value,
              })
            }
            className={`px-4 py-2 border ${data.error.email ? "border-red-500" : ""}`}
          />
          {data.error.email && alert(data.error.email, "red")}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            autoComplete="new-password"
            value={data.password}
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: { ...data.error, password: null },
                password: e.target.value,
              })
            }
            className={`px-4 py-2 border ${data.error.password ? "border-red-500" : ""}`}
          />
          {data.error.password && alert(data.error.password, "red")}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label htmlFor="cPassword">Confirm Password*</label>
          <input
            type="password"
            autoComplete="new-password"
            value={data.cPassword}
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: { ...data.error, cPassword: null },
                cPassword: e.target.value,
              })
            }
            className={`px-4 py-2 border ${data.error.cPassword ? "border-red-500" : ""}`}
          />
          {data.error.cPassword && alert(data.error.cPassword, "red")}
        </div>

        {/* Submit Button */}
        <div
          onClick={!data.loading ? formSubmit : null}
          className={`px-4 py-2 text-center text-white cursor-pointer ${
            data.loading ? "bg-gray-500" : "bg-black"
          }`}
        >
          {data.loading ? "Creating..." : "Create an account"}
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;
