import axios from "axios";

// ✅ Check if user is authenticated
export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

// ✅ Check if user is an admin
export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

// ✅ Admin login request
export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    const res = await axios.post(`http://localhost:8000/api/signin`, data);
    const user = res.data?.user;
    if (user?.role !== 1) {
      return { error: "Access denied. Only admins can log in." };
    }
    return res.data;
  } catch (error) {
    console.log("Login error:", error);
    return { error: "Something went wrong while logging in." };
  }
};

// ✅ Admin signup request only
export const signupReq = async ({ name, email, password, cPassword }) => {
  const data = {
    name,
    email,
    password,
    cPassword,
    userRole: 1, // 👈 Force admin role
  };

  try {
    const res = await axios.post(`http://localhost:8000/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log("Signup error:", error);
    return { error: "Something went wrong while signing up." };
  }
};
