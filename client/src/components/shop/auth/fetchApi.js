import axios from "axios";

// ✅ Check if user is logged in
export const isAuthenticate = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt"))
    : false;

// ✅ User login request
export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    const res = await axios.post("http://localhost:8000/api/signin", data);
    if (res.data.token) {
      localStorage.setItem("jwt", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error) {
    console.log("Login error:", error.response?.data || error.message);
    return { error: "Login failed. Please try again." };
  }
};

// ✅ Signup request (always user signup)
export const signupReq = async ({ name, email, password, cPassword }) => {
  const data = {
    name,
    email,
    password,
    cPassword,
    userRole: 0, // 👈 ensure backend sees this as user
  };
  try {
    const res = await axios.post("http://localhost:8000/api/signup", data);
    return res.data;
  } catch (error) {
    console.log("Signup error:", error.response?.data || error.message);
    return { error: "Something went wrong while signing up." };
  }
};

// ✅ Logout
export const logout = () => {
  localStorage.removeItem("jwt");
};
