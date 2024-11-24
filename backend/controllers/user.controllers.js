import asyncHandler from "../middlewares/asynchandler.js";
import User from "../models/user.model.js";
import generateToken from "../utils/gernerate.js";

const registerUser = async (req, res) => {
  console.log("req.body:::", req.body);
  const { email, password, name,isAdmin } = req.body;

  //check if email already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  //create new user
  const user = await User.create({ email, password, name,isAdmin });
  console.log("user:::", user);
  if (user) {
    generateToken(res, user._id);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

//login the user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("email, password::::", email, password);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({
      message: "Invalid email or password",
      success: false,
    });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.query._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("req:::", req.body);
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
