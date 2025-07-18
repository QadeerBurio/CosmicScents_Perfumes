const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
 async postSignup(req, res) {
  let { name, email, password, cPassword, userRole } = req.body;
  let error = {};

  // Basic field checks
  if (!name || !email || !password || !cPassword || userRole === undefined) {
    error = {
      name: !name ? "Field must not be empty" : "",
      email: !email ? "Field must not be empty" : "",
      password: !password ? "Field must not be empty" : "",
      cPassword: !cPassword ? "Field must not be empty" : "",
      userRole: userRole === undefined ? "Select a role" : "",
    };
    return res.json({ error });
  }

  // Name length check
  if (name.length < 3 || name.length > 25) {
    error = { ...error, name: "Name must be 3-25 characters" };
    return res.json({ error });
  }

  // Email validation
  if (!validateEmail(email)) {
    error = { ...error, email: "Email is not valid" };
    return res.json({ error });
  }

  // Password length check
  if (password.length < 8 || password.length > 255) {
    error = { ...error, password: "Password must be at least 8 characters" };
    return res.json({ error });
  }

  // Role validation
  if (![0, 1].includes(userRole)) {
    error = { ...error, userRole: "Invalid role selected" };
    return res.json({ error });
  }

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      error = { ...error, email: "Email already exists" };
      return res.json({ error });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new userModel({
      name: toTitleCase(name),
      email,
      password: hashedPassword,
      userRole,
    });

    await newUser.save();
    return res.json({
      success: "Account created successfully. Please login.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error. Try again." });
  }
}


  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id, role: data.userRole },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();
module.exports = authController;
