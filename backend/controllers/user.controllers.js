import User from "../models/user.model.js";
import generateToken from "../utils/gernerate.js";

const registerUser = async (req, res) => {
  console.log("req.body:::", req.body);
  const { email, password, name } = req.body;

  //check if email already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  //create new user
  const user = await User.create({ email, password, name });
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

export { registerUser };
